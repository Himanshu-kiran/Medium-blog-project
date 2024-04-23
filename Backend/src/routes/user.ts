import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupInput, signinInput } from '@h_kiran/medium-common';

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	}
}>();

userRouter.post('/signup', async (c) => {
	const body = await c.req.json();
	const { success } = signupInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({
			msg: "I/P not correct."
		})
	}
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

	//inside try catch block
	try {
		//username String  @unique already check at db level
		const user = await prisma.user.create({
			data: {
				username: body.username,
				password: body.password,
				name: body.name
			}
		})
		const jwt = await sign({
			id: user.id
		}, c.env.JWT_SECRET)
		return c.text("Signed up!" + jwt)
	}
	catch (e) {
		console.log(e)
		c.status(411);
		return c.text("INvalllid")
	}
})

userRouter.post('/signin', async (c) => {
	const body = await c.req.json()
	const { success } = signinInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({
			msg: "I/P not correct."
		})
	}
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

	//inside try catch block
	try {
		//username String  @unique already check at db level
		const user = await prisma.user.findFirst({
			where: {
				username: body.username,
				password: body.password,
				name: body.name
			}
		})

		if (!user) {
			c.status(403);
			return c.json({
				message: "incorrect credential"
			})
		}
		const jwt = await sign({
			id: user.id
		}, c.env.JWT_SECRET)

		return c.text(jwt)
	}
	catch (e) {
		console.log(e)
		c.status(411);
		return c.text("INvalllid")
	}
})
