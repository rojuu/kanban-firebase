import { useEffect, useRef, useState, type FormEvent } from "react";
import { v4 as uuid } from "uuid";
import { type Board } from "../model";

function AddTask(props: {
  board: Board;
  columnId: string;
  setBoard: (board: Board) => void;
}) {
  const [showNewTaskButton, setShowNewTaskButton] = useState(true);
  const [value, setValue] = useState("");

  const addInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!showNewTaskButton) {
      addInput.current?.focus();
    }
  }, [showNewTaskButton]);

  const handleInputComplete = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowNewTaskButton(true);
    addNewTask(props.columnId, value);
    setValue("");
  };

  const addNewTask = (columnId: string, content: string) => {
    const newTaskId = uuid();
    const column = props.board.columns[columnId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.push(newTaskId);
    const newTask = {
      id: newTaskId,
      content,
    };
    props.setBoard({
      ...props.board,
      tasks: {
        ...props.board.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...props.board.columns,
        [columnId]: {
          ...props.board.columns[columnId],
          taskIds: newTaskIds,
        },
      },
    });
  };

  return (
    <div
      className="mt-2 rounded-md bg-gray-200 p-2"
      onClick={() => {
        setShowNewTaskButton(false);
      }}
    >
      {showNewTaskButton ? (
        <div className="font-light">ADD NEW TASK</div>
      ) : (
        <form onSubmit={handleInputComplete}>
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onBlur={() => {
              if (!showNewTaskButton) {
                setValue("");
                setShowNewTaskButton(true);
              }
            }}
            ref={addInput}
          />
        </form>
      )}
    </div>
  );
}

export default AddTask;
