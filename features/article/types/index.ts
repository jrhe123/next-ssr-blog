export type ArticleFormInput = {
  title: string;
  content: string;
};

export type Article = {
  id: number;
  title: string;
  content: string;
  views: number;
  create_time: Date;
  update_time: Date;
  is_delete: boolean;
};

export type APIResponse<T> = {
  code: number;
  msg?: string;
  data?: T;
};
