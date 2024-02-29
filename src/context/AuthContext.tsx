import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import useFetch from "../hooks/useFetch";

type UserInfo = {
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
  id: 0,
  name: "",
};

const KEY = "UserInfo";
function setStorage(auth: UserInfo) {
  localStorage.setItem(KEY, JSON.stringify(auth));
}

function getStorage() {
  const storedData = localStorage.getItem(KEY);
  if (storedData) {
    return JSON.parse(storedData);
  }
  setStorage(defualtUserInfo);
  return defualtUserInfo;
}

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
  setStorage(newer);
  return newer;
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [auth, dispatch] = useReducer(reducer, defualtUserInfo);

  const login = async (id: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const userInfo = await response.json();
    // const { data } = useFetch({
    //   url: `https://jsonplaceholder.typicode.com/users/${id}`,
    //   defaultData: defualtUserInfo,
    // });
    // console.log(data);
    dispatch({ type: "login", payload: { id, name: userInfo.username } });
  };

  const logout = () => dispatch({ type: "logout", payload: null });

  useEffect(() => {
    dispatch({ type: "setData", payload: getStorage() });
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
