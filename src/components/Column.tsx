import DeleteIcon from "@mui/icons-material/Delete";
import { Draggable, Droppable } from "react-beautiful-dnd";
import {
  type Board as BoardData,
  type Column as ColumnData,
  type Task as TaskData,
} from "../model";
import AddTask from "./AddTask";
import Task from "./Task";

function Column(props: {
  key: string;
  column: ColumnData;
  tasks: TaskData[];
  index: number;
  board: BoardData;
  setBoard: (board: BoardData) => void;
}) {
  const deleteColumn = (columnId: string, index: number) => {
    const columnTasks = props.board.columns[columnId].taskIds;
    const finalTasks = columnTasks.reduce((prev, cur) => {
      const { [cur]: oldTask, ...newTasks } = prev;
      return newTasks;
    }, props.board.tasks);
    const { columns } = props.board;
    const { [columnId]: oldColumn, ...newColumns } = columns;
    const newColumnOrder = Array.from(props.board.columnOrder);
    newColumnOrder.splice(index, 1);
    props.setBoard({
      tasks: {
        ...finalTasks,
      },
      columns: {
        ...newColumns,
      },
      columnOrder: newColumnOrder,
    });
  };

  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <div
          className="m-2 flex flex-col justify-start rounded-md border border-gray-300 bg-gray-50 p-6 pt-3 shadow-sm shadow-slate-600"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <h1
            className="mt-0 mb-2 flex items-start text-lg font-medium"
            {...provided.dragHandleProps}
          >
            {props.column.title}
            <span
              className="ml-auto"
              onClick={() => {
                deleteColumn(props.column.id, props.index);
              }}
            >
              <DeleteIcon />
            </span>
          </h1>
          <Droppable droppableId={props.column.id} type="task">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {props.tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    columnId={props.column.id}
                    board={props.board}
                    setBoard={props.setBoard}
                  />
                ))}
                {provided.placeholder}
                <AddTask
                  board={props.board}
                  setBoard={props.setBoard}
                  columnId={props.column.id}
                />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
