import React from "react";

import List from "./_components/list";

// import { fetchUserById } from '@/db/queries/users'
// import UserCard from '../_component/user-card'
import { list } from "./actions/list";
interface PostsEditProps {
  params: {
    id: string;
  };
}

async function page({ params }: any) {
  const { id } = params;
  console.log(id);
  // const post:any = await fetchUserById(id)
  const items: any = await list();
  return (
    <>
      <div>
        <h1 className="text-indigo-600 ml-2 font-bold mb-4 text-3xl">
          Sub Accounts
        </h1>
        <div>
          <div className="mt-4">
            <List id={id} items={items} />
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
