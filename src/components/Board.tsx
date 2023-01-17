import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { Board as BoardData } from "../model";
import AddColumn from "./AddColumn";
import Column from "./Column";
import Logout from "./Logout";

const Board = () => {
  const initialData: BoardData = {
    tasks: {
      "1": {
        id: "1",
        content: "Make pasta",
      },
      "2": {
        id: "2",
        content: "Make bread",
      },
      "3": {
        id: "3",
        content: "Boil water",
      },
    },
    columns: {
      "1": {
        id: "1",
        title: "Todo",
        taskIds: ["1", "2"],
      },
      "2": {
        id: "2",
        title: "Doing",
        taskIds: ["3"],
      },
      "3": {
        id: "3",
        title: "Done",
        taskIds: [],
      },
    },
    columnOrder: ["1", "2", "3"],
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
    if (!destination) {
      return;
    }
    if (
      destination.droppableId !== source.droppableId ||
      destination.index !== source.index
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
    <DragDropContext onDragEnd={onDragEnd}>
      <Logout />
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {board.columnOrder.map((columnId, index) => {
              const column = board.columns[columnId];
              const tasks = column.taskIds.map((taskId) => board.tasks[taskId]);
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
  );
};

export default Board;
