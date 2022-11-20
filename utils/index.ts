import { Cookie } from "next-cookie";
interface ICookie {
  userId: number;
  nickname: string;
  avatar: string;
}

export const setCookie = (
  cookie: Cookie,
  { userId, nickname, avatar }: ICookie
) => {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const path = "/";

  cookie.set("userId", userId + "", {
    path,
    expires,
  });
  cookie.set("nickname", nickname, {
    path,
    expires,
  });
  cookie.set("avatar", avatar, {
    path,
    expires,
  });
};
