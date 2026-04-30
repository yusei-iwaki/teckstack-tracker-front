export type Note = {
  id: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
};

export type PagedNote = {
  content: Array<Note>;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
};
