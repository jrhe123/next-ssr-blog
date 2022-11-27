export type ArticleFormInput = {
  id?: number;
  title: string;
  content: string;
  tagIds: number[];
};

export type CommentFormInput = {
  articleId: number;
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
  comments?: Comment[];
  tags: Tag[];
};

export type Tag = {
  id: number;
  title: string;
  icon: string;
  follow_count: number;
  article_count: number;
  users: User[];
  articles: Article[];
};

export type Comment = {
  id: number;
  content: string;
  create_time: Date;
  update_time: Date;
  user: User;
  article: Article;
};

export type APIResponse<T> = {
  code: number;
  message?: string;
  data?: T;
};
