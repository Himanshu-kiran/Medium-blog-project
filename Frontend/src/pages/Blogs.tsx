import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs} = useBlogs();
    if (loading) {
        return <div>
            loading...
        </div>
    }

    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className=" max-w-xl">
                <BlogCard
                    authorName={"Himanshu Kiran"}
                    title={"How an ugly single pay can make almost $5000 a month without any knowledge of any skills."}
                    content={"Content of blog is How an ugly single pay can make almost $5000 a month without any knowledge of any skills. "}
                    publishedDate={"2nd Feb 2024"}
                />
                <BlogCard
                    authorName={"Himanshu Kiran"}
                    title={"How an ugly single pay can make almost $5000 a month without any knowledge of any skills."}
                    content={"Content of blog is How an ugly single pay can make almost $5000 a month without any knowledge of any skills. "}
                    publishedDate={"2nd Feb 2024"}
                />
                <BlogCard
                    authorName={"Himanshu Kiran"}
                    title={"How an ugly single pay can make almost $5000 a month without any knowledge of any skills."}
                    content={"Content of blog is How an ugly single pay can make almost $5000 a month without any knowledge of any skills. "}
                    publishedDate={"2nd Feb 2024"}
                />
            </div>
        </div>
    </div>
}