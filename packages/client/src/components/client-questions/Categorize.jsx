/* eslint-disable react/prop-types */
const Categorize = ({ index, data }) => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="font-semibold">Question {index + 1}</div>
        <div className="font-medium">Categorize</div>
        <div className="font-medium">Points: {data?.points}</div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1 justify-center">
        {data?.itemsWithBelongsTo?.map((option) => (
          <div
            key={option?._id}
            className="bg-neutral-400 text-white px-4 py-2 rounded-md"
          >
            {option?.item}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-stretch gap-3 justify-center mt-4">
        {data?.categories?.map((category, i) => (
          <div
            key={i}
            className="text-center bg-neutral-200 w-36 min-h-[100px] rounded"
          >
            <span className="font-bold text-lg">{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorize;
