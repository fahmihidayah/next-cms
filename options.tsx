import { NextAdminOptions } from "@premieroctet/next-admin";
// import DatePicker from "./components/DatePicker";
import EditorForm from "./src/modules/posts/components/editor";
import { UserHiddenInput } from "@/modules/posts/components/user-hidden-input";
import { User } from "@prisma/client";
import { Package, Package2 } from "lucide-react";

export const options: NextAdminOptions = {
    basePath: "/admin",
    title: "⚡️ My Admin",

    // pages: {
    //     "post/new" : {
    //         title: "New Post",
    //     }
    // },

    // pages: {
    //     "/posts/create": {
    //         title: "Posts",
    //         icon: "PencilIcon",
            
    //     },
    // },
    model: {
        Category: {
            icon: "TagIcon",
            list: {
                display: ["id", "name",],
                search: ["name"],
            },
            edit: {
                fields: {
                    posts: {
                        disabled: true
                    },
                },
            },
        },
        Post: {
            toString: (post) => `${post.title}`,
            title: "Post",

            list: {
                display: ["id", "title", "createdAt", "updatedAt"],
                search: ["title"],
            },

            edit: {
                styles: {
                    
                },

                fields: {
                    content: {
                        input: <EditorForm />,
                        format: "richtext-html",
                    },
                    author: {
                        optionFormatter: (author : any) => {
                            return `${author.name} ${author.id}`;
                        },
                        input: <UserHiddenInput />,

                    },
                    categories: {
                        relationOptionFormatter: (category) => {
                            return `${category.name} Cat.${category.id}`;
                        },
                        display: "select",
                        relationshipSearchField: "category",
                    },
                    tags: {
                        display: "select",
                        relationshipSearchField: "tag",
                    },
                    comments: {
                        disabled: true,
                    }
                },
            }
        },
    },
    defaultColorScheme: "dark",
};