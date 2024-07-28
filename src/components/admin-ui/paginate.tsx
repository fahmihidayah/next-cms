import Link from "next/link";

export const PaginateComponent = ({ total, page }: { total: number, page: number }) => {
    return (
        <div className="flex flex-row">
            {
                page > 1 ? <Link href={
                    `?page=${page - 1}`
                }>
                    <button className="border border-gray-200 rounded-md p-1 w-12 ml-2">Prev</button>
                </Link> : null
            }
            {
                Array.from(Array(Math.ceil(total / 10)).keys()).map((index) => {
                    return (
                        <Link href={
                            `?page=${index + 1}`
                        }>
                            <button key={index} className={`border border-gray-200 rounded-md p-1 w-12 ml-2 ${page === index + 1 ? 'bg-primary text-primary-foreground' : ''}`}>{index + 1}</button>
                        </Link>
                    );
                })
            }
            {
                page < Math.ceil(total / 10) ? <Link href={
                    `?page=${page + 1}`
                }>
                    <button className="border border-gray-200 rounded-md p-1 w-12 ml-2">Next</button>
                </Link> : null
            }
        </div>
    );
}