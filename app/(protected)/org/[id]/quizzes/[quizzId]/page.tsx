import React, { Suspense } from "react";
import { fetchById } from "../actions/list";

import { DrawerSec } from "./Drawer";
async function page({ params, searchParams }: any) {
  const items: any = await fetchById(await params?.quizzId);
  const sp = await searchParams;
  const filterById = items.quizzesSection.filter(
    (i: any) => i?.id == sp?.section
  );
  // const quOnlyArr: any = []
  // items?.quizzesSection.map((i: any) => i.questions.map((x: any) => quOnlyArr.push(x)))

  return (
    <div>
      <Suspense fallback="Loading...">
        <DrawerSec
          orgId={await params?.id}
          quizzId={await params?.quizzId}
          sectionParamsId={sp?.section}
          items={items}
          data={filterById}
        />
      </Suspense>
    </div>
  );
}

export default page;
