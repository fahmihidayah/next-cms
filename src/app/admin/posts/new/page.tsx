import { getMainLayoutProps } from "@premieroctet/next-admin/dist/utils/props";
import { options } from "../../../../../options";
import prisma  from "../../../../lib/prisma";
import { MainLayout } from "@premieroctet/next-admin";

const ListPost = async () => {
    const mainLayoutProps = getMainLayoutProps({
        options,
        isAppDir: true,
      });
    
      const totalUsers = await prisma.user.count();
      const totalPosts = await prisma.post.count();
      const totalCategories = await prisma.category.count();
    
      const stats = [
        { name: "Total Users", stat: totalUsers },
        { name: "Total Posts", stat: totalPosts },
        { name: "Total Categories", stat: totalCategories },
      ];
    return <MainLayout
    {...mainLayoutProps}
    user={{
      data: {
        name: "John Doe",
      },
      logoutUrl: "/",
    }}
  >
    <p>Test</p>
  </MainLayout>
}

export default ListPost;