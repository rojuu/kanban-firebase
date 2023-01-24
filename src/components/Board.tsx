import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  type DropResult,
  type ResponderProvided,
} from "react-beautiful-dnd";
import { type Board as BoardData } from "../model";
import AddColumn from "./AddColumn";
import Column from "./Column";
import Logout from "./Logout";

function Board() {
  const initialData: BoardData = {
    tasks: {
      "task-1": {
        id: "task-1",
        content: "Make pasta",
      },
      "task-2": {
        id: "task-2",
        content: "Make bread",
      },
      "task-3": {
        id: "task-3",
        content: "Boil water",
      },
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "Todo",
        taskIds: ["task-1", "task-2"],
      },
      "column-2": {
        id: "column-2",
        title: "Doing",
        taskIds: ["task-3"],
      },
      "column-3": {
        id: "column-3",
        title: "Done",
        taskIds: [],
      },
    },
    columnOrder: ["column-1", "column-2", "column-3"],
  };
  const [board, setBoard] = useState(initialData);

  // useEffect(() => {
  //   fetchBoard(props.token).then((data) => setBoard(data));
  // }, [props.token]);

  // useEffect(() => {
  //   saveBoard(board, props.token);
  // }, [board, props.token]);

  const onDragEnd = (result: DropResult, _: ResponderProvided): void => {
    const { destination, source, draggableId, type } = result;
    if (destination == null) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    switch (type) {
      case "column": {
        const newColumnOrder = Array.from(board.columnOrder);
        newColumnOrder.splice(source.index, 1);
        newColumnOrder.splice(destination.index, 0, draggableId);
        setBoard({
          ...board,
          columnOrder: newColumnOrder,
        });
        break;
      }
      case "task": {
        const start = board.columns[source.droppableId];
        const finish = board.columns[destination.droppableId];

        if (start === finish) {
          const newTaskIds = Array.from(start.taskIds);
          newTaskIds.splice(source.index, 1);
          newTaskIds.splice(destination.index, 0, draggableId);

          const newColumn = {
            ...start,
            taskIds: newTaskIds,
          };

          setBoard({
            ...board,
            columns: {
              ...board.columns,
              [newColumn.id]: newColumn,
            },
          });
        } else {
          const newStartTaskIds = Array.from(start.taskIds);
          newStartTaskIds.splice(source.index, 1);

          const newFinishTaskIds = Array.from(finish.taskIds);
          newFinishTaskIds.splice(destination.index, 0, draggableId);

          const newStartColumn = {
            ...start,
            taskIds: newStartTaskIds,
          };
          const newFinishColumn = {
            ...finish,
            taskIds: newFinishTaskIds,
          };
          setBoard({
            ...board,
            columns: {
              ...board.columns,
              [newStartColumn.id]: newStartColumn,
              [newFinishColumn.id]: newFinishColumn,
            },
          });
        }
        break;
      }
      default:
        break;
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex items-center bg-gray-700">
          <span className="p-4 text-2xl font-medium text-gray-100">Kanban</span>
          <Logout className="mr-2 ml-auto rounded-md bg-gray-100 p-1 px-2" />
        </div>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              className="flex"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {board.columnOrder.map((columnId, index) => {
                const column = board.columns[columnId];
                const tasks = column.taskIds.map(
                  (taskId) => board.tasks[taskId]
                );
                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    index={index}
                    board={board}
                    setBoard={setBoard}
                  />
                );
              })}
              {provided.placeholder}
              <AddColumn board={board} setBoard={setBoard} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Board;
