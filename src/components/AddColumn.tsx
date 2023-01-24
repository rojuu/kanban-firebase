import { useEffect, useRef, useState, type FormEvent } from "react";
import { v4 as uuid } from "uuid";
import { type Board } from "../model";

function AddColumn(props: { board: Board; setBoard: (board: Board) => void }) {
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
      title,
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
    <div className="m-2 flex h-8 items-center justify-center rounded-md border border-gray-300 bg-gray-50 p-5 shadow-sm shadow-slate-600">
      {showNewColumnButton ? (
        <div
          className="font-light"
          onClick={() => {
            setShowNewColumnButton(false);
          }}
        >
          NEW COLUMN
        </div>
      ) : (
        <form onSubmit={handleInputComplete}>
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
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
}

export default AddColumn;
