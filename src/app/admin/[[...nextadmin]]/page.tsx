import {
    deleteItem,
    searchResource,
    submitFormAction,
  } from "@/actions/nextadmin";
  import {options} from "../../../../options";
  import prisma  from "../../../lib/prisma";
  import schema from "../../../../prisma/json-schema/json-schema.json";
  import { NextAdmin } from "@premieroctet/next-admin";
  import { getPropsFromParams } from "@premieroctet/next-admin/dist/appRouter";
  import { Metadata, Viewport } from "next";
  
  export const viewport: Viewport = {
    initialScale: 1,
    width: "device-width",
  };
  
  export const metadata: Metadata = {
    icons: "/assets/logo.svg",
  };
  
  export default async function AdminPage({
    params,
    searchParams,
  }: {
    params: { [key: string]: string[] | string };
    searchParams: { [key: string]: string | string[] | undefined } | undefined;
  }) {
    const props = await getPropsFromParams({
      params: params.nextadmin as string[],
      
      searchParams,
      options,
      prisma,
      schema,
      action: submitFormAction,
      deleteAction: deleteItem,
      
      searchPaginatedResourceAction: searchResource,
    });
  
    return (
      <NextAdmin
        {...props}
        locale={params.locale as string}
        user={{
          data: {
            name: "John Doe",
          },
          logoutUrl: "/",
        }}
      />
    );
  }