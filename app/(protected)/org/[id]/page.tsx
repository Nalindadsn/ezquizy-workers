// import { fetchUserById } from "@/db/queries/users";
// import UserCard from "../../_component/user-card";

import List from "../_components/list";
import { list } from "../actions/list";
import { fetchById } from "./db/queries/fetch";
// import { fetchById } from "./db/queries/fetch";
// import { fetchAttachments } from "./db/queries/fetchAttachment";

export default async function PostsEdit({ params }: any) {
  // const { i_id } = params;
  const { id } = await params;

  const post = await fetchById(id);

  // const user:any = await fetchUserById(id)
  // const attachments:any = await fetchAttachments(i_id)

  return (
    <main className="flex min-h-screen flex-col items-start ">
      <h1 className="text-indigo-600 ml-2 font-bold mb-4 text-3xl flex justify-between w-full">
        {post?.name}{" "}
      </h1>
      <div className="w-full ">
        <List />
      </div>
    </main>
  );
}
