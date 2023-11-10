import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { axiosOpen } from "../utils/axios";

const Forms = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["forms"],
    queryFn: async () => {
      const params = {
        page_no: 1,
        page_size: 10,
      };

      const { data } = await axiosOpen.get("/forms", { params });

      return data.data;
    },
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <section className="p-10 pt-7 max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center border-b border-solid border-b-neutral-300 p-1">
        <h2 className="font-extrabold text-2xl">Forms</h2>
        <Link to="/forms/add-new-form">
          <button className="bg-neutral-800 hover:bg-neutral-700 text-white py-2 px-4 rounded-lg font-bold">
            Add New
          </button>
        </Link>
      </div>
      <div className="mt-4">
        <table className="table-auto bg-white border-collapse border border-slate-300 w-full">
          <thead>
            <tr>
              <th className="py-4 px-4 border border-slate-300 text-left">#</th>
              <th className="py-4 px-4 border border-slate-300 text-left">
                Form Name
              </th>
              <th className="py-4 px-4 border border-slate-300 text-left">
                Created On
              </th>
              <th className="py-4 px-4 border border-slate-300 text-left">
                Respondants
              </th>
              <th className="py-4 px-4 border border-slate-300 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-4 px-4 text-center font-extrabold"
                >
                  Loading...
                </td>
              </tr>
            ) : data?.length ? (
              data?.map((form, index) => (
                <tr key={form._id}>
                  <td className="font-bold py-4 px-4 border border-slate-300 text-left">
                    {index + 1}
                  </td>
                  <td className="font-bold py-4 px-4 border border-slate-300 text-left">
                    {form?.formName}
                  </td>
                  <td className="font-bold py-4 px-4 border border-slate-300 text-left">
                    {form?.createdAt &&
                      new Date(form?.createdAt).toLocaleString("en-IN", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "numeric",
                        hour12: true,
                      })}
                  </td>
                  <td className="font-bold py-4 px-4 border border-slate-300 text-left">
                    <Link to={`/forms/responses/${form._id}`}>
                      <button className="px-2 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white">
                        View
                      </button>
                    </Link>
                  </td>
                  <td className="font-bold py-4 px-4 border border-slate-300 text-left">
                    <Link to={`/forms/preview/${form._id}`} className="me-1">
                      <button className="px-2 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white">
                        Preview
                      </button>
                    </Link>

                    <Link to={`/forms/edit-form/${form._id}`} className="me-1">
                      <button className="px-2 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white">
                        Edit
                      </button>
                    </Link>

                    <button className="px-2 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-4 px-4 text-center font-extrabold"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Forms;
