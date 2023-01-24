import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { Draggable } from "react-beautiful-dnd";
import { type Board as BoardData, type Task as TaskData } from "../model";

function Task(props: {
  key: string;
  task: TaskData;
  index: number;
  columnId: string;
  board: BoardData;
  setBoard: (board: BoardData) => void;
}) {
  const deleteTask = (columnId: string, index: number, taskId: string) => {
    const column = props.board.columns[columnId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(index, 1);
    const { tasks } = props.board;
    const { [taskId]: oldTask, ...newTasks } = tasks;
    props.setBoard({
      ...props.board,
      tasks: {
        ...newTasks,
      },
      columns: {
        ...props.board.columns,
        [columnId]: {
          ...column,
          taskIds: newTaskIds,
        },
      },
    });
  };

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided) => (
        <div
          className="my-3 flex rounded-md border border-gray-100 bg-white p-1 py-3 pl-2"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {props.task.content}
          <span // delete
            className="ml-auto"
            onClick={() => {
              deleteTask(props.columnId, props.index, props.task.id);
            }}
          >
            <DeleteIcon className="ml-6" />
          </span>
        </div>
      )}
    </Draggable>
  );
}

export default Task;
