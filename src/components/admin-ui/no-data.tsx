import { Button, Card } from "@radix-ui/themes"
import { BoxSelect, LucideBookOpenText, LucideBoxes, LucidePlus, LucideSquare, LucideSquareArrowOutUpLeft, } from "lucide-react"
import Link from "next/link"

export const NoDataFound = ({message = "No data found", createHref} : {
    message: string;
   createHref: string;
}) => {
    return <Card>
        <div className="flex flex-col justify-center items-center gap-5 py-20">
            <LucideBoxes className="size-16 text-gray-500" />
            <h1 className="text-lg font-bold">{message}</h1>
            <Link href={createHref}>
                <Button>
                    <LucidePlus className="size-4" />
                    Create new
                </Button>
            </Link>
        </div>
    </Card>
}