import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import DeleteForm from "../components/toast/DeleteForm.jsx";

import { axiosOpen } from "../utils/axios";

const Forms = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["forms"],
    queryFn: async () => {
      const params = {
        page_no: 1,
        page_size: 10,
      };

      const { data } = await axiosOpen.get("/forms", { params });

      setSearchParams({
        page_no: params.page_no,
        page_size: params.page_size,
        total_data: data?.total_data,
      });

      return data.data;
    },
    enabled: false,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (formIdx) => axiosOpen.delete(`/forms/${formIdx}`),
    onSuccess: () => refetch(),
  });

  useEffect(() => {
    refetch();
  }, [refetch, searchParams]);

  const deleteForm = (formIdx) =>
    toast(
      <DeleteForm
        deleteFn={() =>
          toast.promise(async () => await mutateAsync(formIdx), {
            pending: "Deleting Form",
            success: "Form Deleted",
            error: "Form Deletion Failed",
          })
        }
        text="Delete Form?"
        isPending={isPending}
      />
    );

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
                    <button
                      className="px-2 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white me-1"
                      title="copy url"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${location.host}/form/${form._id}`
                        );
                        toast.success("URL copied!");
                      }}
                    >
                      URL
                    </button>

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

                    <button
                      className="px-2 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white"
                      onClick={() => deleteForm(form._id)}
                    >
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
      <div className="mt-4 flex flex-wrap justify-between items-center">
        <div>
          {`Showing ${
            1 +
            (Number(searchParams.get("page_no")) - 1) *
              Number(searchParams.get("page_size"))
          } to ${
            Number(
              searchParams.get("total_data") <
                Number(searchParams.get("page_size"))
            )
              ? searchParams.get("total_data")
              : Number(searchParams.get("page_no")) *
                Number(searchParams.get("page_size"))
          } of ${searchParams.get("total_data")?.toString()}`}
        </div>

        <div className="flex">
          <button
            className="py-1 px-2 bg-neutral-300 disabled:opacity-80 rounded-s-md border-e border-solid border-neutral-400"
            disabled={searchParams.get("page_no") === "1"}
          >
            Previous
          </button>
          {searchParams.get("page_no") !== "1" && (
            <button className="py-1 px-2 bg-neutral-300 border-e border-solid border-neutral-400">
              {Number(searchParams.get("page_no")) - 1}
            </button>
          )}
          <div className="py-1 px-2 bg-neutral-300 border-e border-solid border-neutral-400">
            {searchParams.get("page_no")}
          </div>
          {Math.ceil(
            Number(searchParams.get("total_data")) /
              Number(searchParams.get("page_size"))
          ) !== Number(searchParams.get("page_no")) && (
            <button className="py-1 px-2 bg-neutral-300 border-e border-solid border-neutral-400">
              {Number(searchParams.get("page_no")) + 1}
            </button>
          )}
          <button
            className="py-1 px-2 bg-neutral-300 disabled:opacity-80 rounded-e-md"
            disabled={
              Math.ceil(
                Number(searchParams.get("total_data")) /
                  Number(searchParams.get("page_size"))
              ) === Number(searchParams.get("page_no"))
            }
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Forms;
