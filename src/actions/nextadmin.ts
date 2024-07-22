// actions/nextadmin.ts
"use server";
import { ActionParams, ModelName } from "@premieroctet/next-admin";
import { SearchPaginatedResourceParams, deleteResourceItems, searchPaginatedResource, submitForm } from "@premieroctet/next-admin/dist/actions";
import prisma  from "../lib/prisma";
import { options } from "../../options";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/auth-options";
 
export const submitFormAction = async (
  params: ActionParams,
  formData: FormData
) => {
  const session  = await getServerSession();
  console.log('session', session);
  if(params.params?.[0] === 'posts') {
    if(params.params?.[1] === 'new') {
      // const user = await prisma.user.findUnique({
      //   where: {
      //     email: session?.user?.email as string
      //   }
      // });
      // console.log('submit user ', user);
      // formData.append('author', user);
      return submitForm({ ...params, options, prisma }, formData);
    }
  }
  return submitForm({ ...params, options, prisma }, formData);
};

export const deleteItem = async (
    model: ModelName,
    ids: string[] | number[]
  ) => {
    return deleteResourceItems(prisma, model, ids);
  };
  
  export const searchResource = async (
    actionParams: ActionParams,
    params: SearchPaginatedResourceParams
  ) => {
    return searchPaginatedResource({ ...actionParams, options, prisma }, params);
  };

  export const searchPaginateAction = async (
    actionParams: ActionParams,
    params: SearchPaginatedResourceParams
  ) => {
    return searchPaginatedResource({ ...actionParams, options, prisma }, params);
  }