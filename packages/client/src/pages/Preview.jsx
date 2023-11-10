import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Categorize from "../components/client-questions/Categorize.jsx";

import { axiosOpen } from "../utils/axios.js";

const Preview = () => {
  const { formId } = useParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState(true);
  const { data } = useQuery({
    queryKey: ["form", formId],
    queryFn: async () => {
      const { data } = await axiosOpen.get(`/forms/${formId}`);
      setQuery(false);
      return data?.data;
    },
    enabled: query,
  });

  return (
    <section className="p-10 pt-7 max-w-screen-xl mx-auto">
      <div className="flex justify-between items-end border-b border-solid border-b-neutral-300 p-1">
        <h2 className="font-extrabold text-2xl">Form Preview</h2>
        <div>
          <button
            className="bg-neutral-800 hover:bg-neutral-700 text-white py-2 px-4 rounded-lg font-bold"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>

      <div className="mt-3">
        <div className="font-bold text-3xl text-center underline">
          {data?.formName}
        </div>
        <div className="h-56 mt-2">
          <img
            src={data?.headerImage}
            alt="headerImage"
            className="w-full h-full rounded-md object-contain"
          />
        </div>

        <hr className="mt-2 border-neutral-300" />

        <div className="mt-2">
          {data?.questions?.map((question, index) => (
            <div
              key={question._id}
              className="max-w-4xl mx-auto bg-white rounded-xl mt-2 p-3 shadow-md"
            >
              {question?.type === "categorize" ? (
                <Categorize index={index} data={question} />
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Preview;
