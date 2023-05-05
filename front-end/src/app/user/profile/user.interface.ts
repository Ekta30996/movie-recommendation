export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  isverified: boolean;
  isadmin: boolean;
  genrelist: [string];
  watchlist: [string];
  favoritelist: [string];
}

export interface UserToken {
  email: string;
  exp: Date;
  iat: Date;
  id: string;
  username: string;
}
