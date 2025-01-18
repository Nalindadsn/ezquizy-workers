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

  // const data ={
  //   title: `GCE Advanced Level - Science for Technology 2023(2024)`,
  // country : "LK"
  // examination : Term Test
  // grade : 13
  // year : 2019
  // medium : Sinhala
  // slug: gce-advanced-level-science-for-technology-2023-2024
  // section: Part 1
  // type: MCQ
  // description:
  // imageUrl: /images/cpp.png
  // category: [name: "advanced-level" , subCategory :{name: "economics" }]
  // keywords: ["nextjs14", "nextjs15", "crud", "server action", "nextjs form", ""]
  // createdAt: "2024/11/27"

  // questions: {}
  // }
  return (
    <>
      {" "}
      ---
      <br /># article-{items?.id}.md <br />
      title: {items?.name}
      <br />
      country : "LK"
      <br />
      examination : Term Test
      <br />
      grade : 13
      <br />
      year : 2019
      <br />
      medium : Sinhala
      <br />
      slug: gce-advanced-level-science-for-technology-2023-2024
      <br />
      section: Part 1<br />
      type: MCQ
      <br />
      description: <br />
      imageUrl: /images/cpp.png
      <br />
      category:{` [name: "advanced-level" , subCategory :{name: "economics" }]`}
      <br />
      keywords: ["nextjs14", "nextjs15", "crud", "server action", "nextjs form",
      ""]
      <br />
      questions:
      <pre className="">{JSON.stringify(items, null, 2)}</pre>
    </>
  );
};

export default page;
