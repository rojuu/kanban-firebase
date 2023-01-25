import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useContext, useEffect, useMemo, useState } from "react";
import {
  DragDropContext,
  Droppable,
  type DropResult,
  type ResponderProvided,
} from "react-beautiful-dnd";
import { AuthContext } from "../contexts/Auth";
import { db } from "../firebase";
import { type Board as BoardData, type Task as TaskData } from "../model";
import AddColumn from "./AddColumn";
import Column from "./Column";
import Logout from "./Logout";

function Board() {
  const user = useContext(AuthContext);
  const emptyBoard = useMemo<BoardData>(() => {
    return {
      tasks: {},
      columns: {},
      columnOrder: [],
    };
  }, []);
  const [boardFetched, setBoardFetched] = useState(false);
  const [board, setBoard] = useState(emptyBoard);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const boardsRef = collection(db, "boards");
        const boardDoc = await getDoc(doc(boardsRef, user.uid));
        if (boardDoc.exists()) {
          setBoard({ ...(boardDoc.data() as BoardData) });
        } else {
          setBoard(emptyBoard);
        }
        setBoardFetched(true);
      } catch (e) {
        setErrorMessage(`Fetching data failed: ${e}`);
      }
    };
    fetchData();
  }, [emptyBoard, user]);

  useEffect(() => {
    if (!boardFetched) return;
    if (!user) return;
    const storeData = async () => {
      try {
        const boardsRef = collection(db, "boards");
        await setDoc(doc(boardsRef, user.uid), board);
      } catch (error) {
        setErrorMessage(`Storing data failed: ${error}`);
      }
    };
    storeData();
  }, [board, boardFetched, user]);

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

  if (errorMessage !== "") {
    return <div className="text-red-600">{`ERROR: ${errorMessage}`}</div>;
  }

  if (!boardFetched) {
    return <div>Fetching data...</div>;
  }

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
                const tasks: Array<TaskData> = column.taskIds.map(
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
