export interface Task {
  id: string;
  content: string;
}

export type Tasks = Record<string, Task>;

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export type Columns = Record<string, Column>;

export interface Board {
  tasks: Tasks;
  columns: Columns;
  columnOrder: string[];
}
