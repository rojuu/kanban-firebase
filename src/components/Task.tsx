import { Draggable } from "react-beautiful-dnd";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { Task as TaskData, Board as BoardData } from "../model";

const Task = (props: {
  key: string;
  task: TaskData;
  index: number;
  columnId: string;
  board: BoardData;
  setBoard: (board: BoardData) => void;
}) => {
  const deleteTask = (columnId: string, index: number, taskId: string) => {
    const column = props.board.columns[columnId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(index, 1);
    const tasks = props.board.tasks;
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
          className="flex bg-white rounded-sm my-3 p-1 pl-2 py-3"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {props.task.content}
          <span // delete
            className="ml-auto"
            onClick={() =>
              deleteTask(props.columnId, props.index, props.task.id)
            }
          >
            <DeleteIcon className="ml-6" />
          </span>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
