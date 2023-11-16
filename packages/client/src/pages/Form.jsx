import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Categorize from "../components/client-questions/Categorize.jsx";
import Cloze from "../components/client-questions/Cloze.jsx";
import Comprehension from "../components/client-questions/Comprehension.jsx";

import { axiosOpen } from "../utils/axios.js";

const Form = () => {
  const { formId } = useParams();

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
    <div className="bg-neutral-100 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="pt-10 pb-20 px-3">
          <div className="max-w-4xl mx-auto bg-white rounded-xl mt-2 p-3 shadow-md">
            <div className="font-bold text-3xl text-center underline">
              {data?.formName}
            </div>

            {data?.headerImage && (
              <div className="h-56 mt-2">
                <img
                  src={data?.headerImage}
                  alt="headerImage"
                  className="w-full h-full rounded-md object-contain"
                />
              </div>
            )}
          </div>

          <div className="mt-2">
            {data?.questions?.map((question, index) => (
              <div
                key={question._id}
                className="max-w-4xl mx-auto bg-white rounded-xl mt-2 p-3 shadow-md"
              >
                {question?.type === "categorize" ? (
                  <Categorize index={index} data={question} />
                ) : question?.type === "cloze" ? (
                  <Cloze index={index} data={question} />
                ) : question?.type === "comprehension" ? (
                  <Comprehension index={index} data={question} />
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>

          <div className="mt-3 max-w-4xl mx-auto">
            <button className="bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-800 text-white w-full px-2 py-2 font-extrabold rounded-xl shadow-md">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
