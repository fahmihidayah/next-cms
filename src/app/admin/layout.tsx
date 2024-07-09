export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (<div className="flex flex-row absolute">
        <div className="fixed w-32 md:w-64 h-full flex flex-row gap-4">
            <div className="flex flex-col flex-1">
                <div className="p-2 hover:bg-slate-400 rounded-md hover:text-white text-black">
                    <a href="/admin/posts" className="block">Posts</a>
                </div>
                <div className="p-2 hover:bg-slate-400 rounded-md hover:text-white text-black">
                    <a href="/admin/tags" className="block">Tags</a>
                </div>
            </div>

            <div className="h-full w-[2px] bg-slate-300"></div>

        </div>

        <div className="ms-32 md:ms-64">
            {
                children
            }
        </div>
    </div>);
}