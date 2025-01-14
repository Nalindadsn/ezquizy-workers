import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import { AttachmentForm } from "../../_component/attachment-form";
import { Pencil } from "lucide-react";
// import DeleteF from "../[i_id]/_component/delete";
import Delete from "./delete";
export default async function Language({
  id,
  e_id,
  items,
}: {
  id?: any;
  e_id?: any;
  items?: any;
}) {
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return items && items.length > 0 ? (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <Link href={`/dashboard/users/${id}/proficiency`}>
              Sub Accounts
            </Link>{" "}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ overflowX: "scroll" }} className="w-full ">
            <table className="w-full rtl:text-right">
              <thead className="text-xs text-white uppercase bg-indigo-600 ">
                <tr>
                  <th scope="col" className="px-6 py-3 text-nowrap text-left">
                    Org Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left w-full">
                    Description
                  </th>

                  <th className="text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item: any) => {
                  return (
                    <>
                      <tr
                        key={item.id}
                        className={`${
                          e_id == item.id
                            ? "bg-yellow-200 hover:bg-yellow-200"
                            : "bg-white hover:bg-gray-50"
                        } border-indigo-200  border-b dark:bg-indigo-800 dark:border-indigo-700  dark:hover:bg-indigo-600`}
                      >
                        <th
                          scope="row"
                          className="flex items-center px-6 py-4 whitespace-nowrap "
                        >
                          <div className="ps-3 ">
                            <div className="font-normal  text-left">
                              <span className="text-xs text-gray-500">
                                {item?.id}
                              </span>
                              <br />
                              <Link
                                key={item.id}
                                href={`/org/${item.id}`}
                                className=""
                              >
                                {item.name}
                              </Link>
                            </div>
                          </div>
                        </th>

                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                            {item.description}
                          </div>
                        </td>

                        <td className=" ">
                          <div className="flex">
                            <Button size="sm" className="mr-2" asChild>
                              <Link href={`/org/${item.id}`}>
                                <Pencil className="w-3 h-3 -mt-1 mr-1" /> EDIT
                              </Link>
                            </Button>

                            <Delete todo={item.id} u_id={id} />
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  ) : null;
}
