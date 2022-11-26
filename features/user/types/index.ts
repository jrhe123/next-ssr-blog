export type VerifyCodeFormInput = {
  to: string;
};

export type SigninFormInput = {
  phone: string;
  verify: string;
  identity_type: string;
};

export type User = {
  userId: number;
  nickname: string;
  avatar: string;
};

export type APIResponse<T> = {
  code: number;
  message?: string;
  data?: T;
};
