import { PostTable } from '@/modules/posts/components/table';
import prisma from '../../../../lib/prisma';
import { NoDataFound } from '@/components/admin-ui/no-data';
import { PostRepository } from '@/data/post/repository';
type Props = {
    params: {
        slug: string;
    }
    searchParams: {
        q: string;
        page: string;
    }
}

export default async function Page({ params, searchParams }: Props) {
    const posts = await PostRepository.findByQuery({
        q: (searchParams.q ?? ''),
        limit: 10,
        page: +(searchParams.page ?? "1") 
    });

    return (
        <>
            {posts.data.length === 0 ? <NoDataFound createHref='posts/create' message='No data found' /> : <PostTable paginatedData={posts}></PostTable>}
        </>
    );
}