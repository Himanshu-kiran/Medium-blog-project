import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@h_kiran/medium-common";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>();
//adding middleware
blogRouter.use("/*", async function (c, next) {
    //extract the userid and pass it downto routers
    //decode can be done by anyone but verify only by secret

    const authHeader = c.req.header("authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            c.set("userId", user.id);
            await next();
        }
        else {
            c.status(403);
            return c.json({
                msg: "You are not logged in"
            })
        }
    } catch (e) {
        c.status(403);
        return c.json({
            message: "You are not loggedin/token may changed"
        })
    }
})

blogRouter.post('/', async (c) => {
    const body = await c.req.json()
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            msg: "I/P not correct."
        })
    }
    const authorId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId)
        }
    })

    return c.json({
        id: blog.id
    })
})

blogRouter.put('/', async (c) => {
    const body = await c.req.json()
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            msg: "I/P not correct."
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
            //ofcourse it shouldnot be changed  authorId: 1
        }
    })

    return c.json({
        id: blog.id
    })
    return c.text('signin route')
})

//Todo add: paginations
blogRouter.get('/bulk', async (c) => {
    const body = await c.req.json()
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs = await prisma.blog.findMany({
        select: {
            title: true,
            content: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });

    return c.json({
        blogs
    })
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
        })
        return c.json({
            blog
        })
    }
    catch (e) {
        c.status(411);
        return c.json({
            msg: "Error while fetching"
        })
    }
})

