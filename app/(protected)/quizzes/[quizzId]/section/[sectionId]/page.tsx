import { fetchById } from "../../../actions/list";

export const dynamic = "force-dynamic";

async function getData() {
  const data: any = [];
  return data;
}

const page = async ({ params, searchParams }: any) => {
  const questions = await getData();
  const userId = "6717bf00391027592347633a";

  const items: any = await fetchById(
    (
      await params
    )?.quizzId,
    (
      await params
    )?.sectionId,
    userId
  );

  return <div className="">{JSON.stringify(items)}</div>;
};

export default page;
