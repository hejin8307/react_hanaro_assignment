import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { getStorage, removeStorage, setStorage } from "../utils/localStorage";

export type UserInfo = {
  id: number | null;
  name: string | null;
};

type Auth = {
  auth: UserInfo;
  login: (id: number) => void;
  logout: () => void;
};

type Action =
  | { type: "setData"; payload: UserInfo }
  | { type: "login"; payload: UserInfo }
  | { type: "logout"; payload: null };

const defualtUserInfo: UserInfo = {
  id: null,
  name: null,
};

const AuthContext = createContext<Auth>({
  auth: defualtUserInfo,
  login: () => {},
  logout: () => {},
});

const reducer = (state: UserInfo, { type, payload }: Action) => {
  let newer: UserInfo;
  switch (type) {
    case "setData":
      newer = { ...payload };
      break;
    case "login":
      newer = { ...state, id: payload!.id, name: payload!.name };
      break;
    case "logout":
      newer = { ...state, id: null, name: null };
      break;
    default:
      return state;
  }
  setStorage("UserInfo", newer);
  return newer;
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [auth, dispatch] = useReducer(reducer, defualtUserInfo);

  const login = async (id: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const userInfo = await response.json();
    dispatch({ type: "login", payload: { id, name: userInfo.username } });
  };

  const logout = () => {
    removeStorage("AlbumId");
    dispatch({ type: "logout", payload: null });
  };

  useEffect(() => {
    const storedData = getStorage<UserInfo>("UserInfo");
    if (storedData) dispatch({ type: "setData", payload: storedData });
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
