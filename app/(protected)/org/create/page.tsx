import Add from "../_components/add";

export default async function PostsEdit({ params }: any) {
  const { id } = await params;
  console.log(id);
  return (
    <main className="flex min-h-screen flex-col items-start ">
      <div className="w-full "></div>
    </main>
  );
}
