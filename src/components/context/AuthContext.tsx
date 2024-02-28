import {
  PropsWithChildren,
  Reducer,
  createContext,
  useContext,
  useReducer,
} from "react";

type Auth = {
  id: number;
  login: (id: number) => void;
  logout: () => void;
};

type Action = { type: "login"; payload: Auth } | { type: "logout" };

const KEY = "userId";
function setStorage(id: number) {
  localStorage.setItem(KEY, JSON.stringify(id));
}

function getStorage() {
  const storedData = localStorage.getItem(KEY);
  if (storedData) {
    return JSON.parse(storedData);
  }
  setStorage(0);
  return { id: null };
}

const AuthContext = createContext<Auth>({
  id: 0,
  login: () => {},
  logout: () => {},
});

const reducer: Reducer<Number, Action> = (state, action) => {
  let newer;
  switch (action.type) {
    case "login":
      newer = { ...state, id: action.payload };
      break;
    case "logout":
      newer = { ...state, id: null };
      break;
    default:
      return state;

      setStorage(newer);
      return newer;
  }
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [auth, dispatch] = useReducer(reducer, id: 0);

  const login = (id: Number) => dispatch({ type: "login", payload: id });
  const logout = () => dispatch({ type: "logout" });

  return (
    <AuthContext.Provider value={{ id, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = useContext(AuthContext);
