interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <div className="p-4 border-b border-slate-200  pb-4">
        <div className="flex items-center">
            <Avatar name={authorName} />
            <div className="pl-2">
                <div className="text-sm font-semibold">{authorName}</div>
            </div>
            <div className="flex justify-center flex-col pl-2">
                <Circle />
            </div>
            <div className="flex justify-center flex-col pl-2 font-extralight text-slate-500 text-sm">
                {publishedDate}
            </div>
        </div>
        <div className="text-xl font-semibold">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0, 100) + "..."}
        </div>
        <div className="text-slate-500 text-sm pt-4">
            {`${Math.ceil(content.length / 100)}minute(s)read`}
        </div>
    </div>
}

export function Avatar({ name, size = 4 }: { name: string, size?: number }) {
    return <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className="text-xs font-extralight text-gray-600 dark:text-gray-300">
            {name[0]}
        </span>
    </div>
}

function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500"></div>
}
