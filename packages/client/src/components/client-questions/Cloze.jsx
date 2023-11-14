/* eslint-disable react/prop-types */
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Cloze = ({ index, data }) => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="font-semibold">Question {index + 1}</div>
        <div className="font-medium">Cloze</div>
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
        <Droppable droppableId={`cloze${1}`} direction="horizontal">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <div className="mt-3 font-bold">
                {data?.sentence?.replace(/<u>.*?<\/u>/g, "___________________")}
              </div>

              <div className="mt-3 flex flex-wrap gap-1">
                {data?.options?.map((opt, index) => (
                  <Draggable
                    key={index}
                    index={index}
                    draggableId={`draggable-${index}`}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="bg-neutral-400 text-white px-4 py-2 rounded-md">
                          {opt}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Cloze;
