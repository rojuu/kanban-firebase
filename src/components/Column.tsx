import { Draggable, Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import AddTask from "./AddTask";
import {
  Task as TaskData,
  Board as BoardData,
  Column as ColumnData,
} from "../model";

const Column = (props: {
  key: string;
  column: ColumnData;
  tasks: Array<TaskData>;
  index: number;
  board: BoardData;
  setBoard: (board: BoardData) => void;
}) => {
  const deleteColumn = (columnId: string, index: number) => {
    const columnTasks = props.board.columns[columnId].taskIds;
    const finalTasks = columnTasks.reduce((prev, cur) => {
      const { [cur]: oldTask, ...newTasks } = prev;
      return newTasks;
    }, props.board.tasks);
    const columns = props.board.columns;
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
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <h1 {...provided.dragHandleProps}>
            {props.column.title}
            <span // delete button
              onClick={() => deleteColumn(props.column.id, props.index)}
            >
              DELETE {/* <DeleteIcon /> */}
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
};

export default Column;
