import { PostRepository } from "@/data/post/repository";
import { PostForm } from "@/modules/posts/components/form";
import { notFound } from "next/navigation";

type Props = {
    searchParams : {

    },
    params : {
        id : string;
    }
}

const EditPostPage = async ({params, searchParams} : Props) => {
    const post = await PostRepository.findById(Number(params.id));
    if(!post) {
        notFound();
    }
    return <PostForm post={post} />;
}

export default EditPostPage;