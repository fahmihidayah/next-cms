import { PostTable } from '@/modules/posts/components/table';
import prisma from '../../../../lib/prisma';
type Props = {
    params: {
        slug: string;
    }
    searchParams: {
        q: string;
        offset: string;
    }
}

export default async function Page({ params, searchParams }: Props) {
    const posts = await prisma.post.findMany({
        
    });
   
    return (
        <PostTable data={posts}></PostTable>
    );
}