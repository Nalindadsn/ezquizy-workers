import { Suspense } from "react";

// import prismadb from "@/lib/prismadb"

import { GetPokemons } from "./_actions";
import CardList from "./_components/card-list";
import Pagination from "./_components/pagination";
import SearchPokemon from "./_components/search";
import SkeletonCardList from "./_components/skeleton";

export default async function Home({
  searchParams,
  params,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
    type?: any;
  };
  params: any;
}) {
  const search = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 20;
  const type = searchParams?.type;
  const offset = (currentPage - 1) * limit;
  const { id } = params;
  const { data, totalPages }: any = await GetPokemons({
    offset,
    limit,
    search,
    type,
  });

  return (
    <>
      <h1 className="text-indigo-600 ml-2 font-bold mb-4 text-3xl">
        All Quizzes -
      </h1>
      <div className=" md:flex w-full mb-5">
        <div className="  w-full  w-full">
          <SearchPokemon />
        </div>
        <div className="  flex justify-end">
          <div className="mr-1">
            <Pagination totalPages={totalPages} />
          </div>

          {/* <RegisterForm orgId={id}/> */}
        </div>
      </div>

      <Suspense key={search + currentPage} fallback={<SkeletonCardList />}>
        <CardList data={data} />
      </Suspense>
    </>
  );
}
