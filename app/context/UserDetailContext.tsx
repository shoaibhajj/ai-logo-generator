import { createContext } from "react";

interface IUser {
  name: string;
  credit: number;
  email: string;
}

interface IUserDetailContext {
  userDetail?: IUser;
  setUserDetail: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

export const UserDetailContext = createContext<IUserDetailContext>({
  userDetail: undefined,
  setUserDetail: () => {},
});
