/* eslint-disable react/prop-types */
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Categorize = ({ index, data }) => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="font-semibold">Question {index + 1}</div>
        <div className="font-medium">Categorize</div>
        <div className="font-medium">Points: {data?.points}</div>
      </div>

      {data?.imageUrl && (
        <div className="flex justify-center mt-3">
          <div className="w-[min(500px,100%)]">
            <img
              src={data?.imageUrl}
              className="w-full max-h-52 object-contain"
            />
          </div>
        </div>
      )}

      <DragDropContext onDragEnd={() => {}}>
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

        <Droppable droppableId={`categoryDrop${1}`}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-wrap items-stretch gap-3 justify-center mt-4"
            >
              {data?.categories?.map((category, i) => (
                <div
                  key={i}
                  className="text-center bg-neutral-200 w-36 min-h-[100px] rounded"
                >
                  <span className="font-bold text-lg">{category}</span>
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Categorize;
