export type ArticleFormInput = {
  title: string;
  content: string;
};

type User = {
  id: number;
  nickname: string;
  avatar: string;
  job: string;
  introduce: string;
};

export type Article = {
  id: number;
  title: string;
  content: string;
  views: number;
  create_time: Date;
  update_time: Date;
  is_delete: number;
  user: User;
};

export type APIResponse<T> = {
  code: number;
  msg?: string;
  data?: T;
};
