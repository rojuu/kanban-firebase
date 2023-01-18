import { useState, useEffect, useRef, FormEvent } from "react";
import { v4 as uuid } from "uuid";
import { Board } from "../model";

const AddColumn = (props: {
  board: Board;
  setBoard: (board: Board) => void;
}) => {
  const [showNewColumnButton, setShowNewColumnButton] = useState(true);
  const [value, setValue] = useState("");

  const addInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!showNewColumnButton) {
      addInput.current?.focus();
    }
  }, [showNewColumnButton]);

  const handleInputComplete = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowNewColumnButton(true);
    addNewColumn(value);
    setValue("");
  };

  const addNewColumn = (title: string) => {
    const newColumnOrder = Array.from(props.board.columnOrder);
    const newColumnId = uuid();
    newColumnOrder.push(newColumnId);
    const newColumn = {
      id: newColumnId,
      title: title,
      taskIds: [],
    };
    props.setBoard({
      ...props.board,
      columns: {
        ...props.board.columns,
        [newColumnId]: newColumn,
      },
      columnOrder: newColumnOrder,
    });
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 shadow-sm shadow-slate-600 border border-gray-300 p-5 rounded-md m-2 h-8">
      {showNewColumnButton ? (
        <div
          className="font-light"
          onClick={() => setShowNewColumnButton(false)}
        >
          NEW COLUMN
        </div>
      ) : (
        <form onSubmit={handleInputComplete}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => {
              if (!showNewColumnButton) {
                setValue("");
                setShowNewColumnButton(true);
              }
            }}
            ref={addInput}
          />
        </form>
      )}
    </div>
  );
};

export default AddColumn;
