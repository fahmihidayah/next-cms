
import Image from "next/image";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-5 p-10">
      <div className="flex items-center justify-start">
        <div className="mr-10 flex w-2/3 flex-col gap-2">
          <h3 className="text-gray-800">Next Admin</h3>
          <h4 className="text-gray-600">
            Next Admin is a tool for creating a dashboard for your Next.js
            application.
          </h4>
          <h3 className="text-gray-600">
            You can use it to manage your database using{" "}
            <a
              href="https://prisma.io"
              className="text-blue-500 hover:underline"
            >
              Prisma ORM
            </a>{" "}
            and provide a simple admin interface for your users.
          </h3>
        </div>
      </div>
      <div className="flex items-center justify-start pt-10">
        <div className="mr-10 flex w-1/2 flex-col gap-2">
          <Image
            src="/assets/model.png"
            width={700}
            height={700}
            alt="schema image"
            className="rounded-md shadow-2xl"
          />
        </div>
        <div className="mr-10 flex w-1/2 flex-col gap-2">
          <h3 className="text-4xl font-bold text-gray-800">
            Demonstration
          </h3>
          <h3 className="text-gray-600">
            This dashboard is a demonstration of the capabilities of Next Admin.
          </h3>
          <h3 className="text-gray-600">
            You can find different examples of relation management, search, and
            more. This demo is using the schema below.
          </h3>
        </div>
      </div>
      <div className="flex items-center justify-start pt-10">
        <div className="mr-10 flex w-1/2 flex-col gap-2">
          <h3 className="text-4xl font-bold text-gray-800">
            Customizable
          </h3>
          <h3 className="text-gray-600">
            You can easily customize the dashboard to suit your needs. Even this
            page is customizable.
          </h3>
          <h3 className="text-gray-600">
            Every part of the CRUD is customizable. You can choose which fields
            to display, which fields to edit, and more.
          </h3>
        </div>
        <div className="mr-10 flex w-1/2 flex-col gap-2">
          <Image
            src="/assets/code.png"
            width={500}
            height={500}
            alt="code image"
            className="rounded-md shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;