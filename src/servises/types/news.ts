export interface INews {
  by: string;
  id: number;
  kids: number[];
  score: number;
  time: string | number;
  title: string;
  url: string;
}

export interface IComments {
  by: string;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: number | string;
  children: IComments[];
}

export interface ICommentsArr {
  parent: number;
  comments: IComments[];
}
