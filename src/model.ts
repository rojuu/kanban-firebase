export interface Task {
  id: string;
  content: string;
}

export interface Tasks {
  [index: string]: Task;
}

export interface Column {
  id: string;
  title: string;
  taskIds: Array<string>;
}

export interface Columns {
  [index: string]: Column;
}

export interface Board {
  tasks: Tasks;
  columns: Columns;
  columnOrder: Array<string>;
}
