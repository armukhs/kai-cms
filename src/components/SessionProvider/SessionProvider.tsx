import {
  useContext,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import { DefaultUser, SessionUser } from 'lib/session';
import useUser from 'lib/useUser';

interface ISessionContext {
  sessionUser: SessionUser;
  setSessionUser: Dispatch<SetStateAction<SessionUser>>;
}

const defaultValue: ISessionContext = {
  sessionUser: DefaultUser,
  setSessionUser: () => undefined,
};

// const SessionContext = createContext<SessionUser>(DefaultUser);
const SessionContext = createContext<ISessionContext>(defaultValue);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const { sessionUser: user } = useUser();
  const [sessionUser, setSessionUser] = useState(defaultValue.sessionUser);

  useEffect(() => {
    if (user) setSessionUser(user);
  }, [user]);

  return (
    <SessionContext.Provider value={{ sessionUser, setSessionUser }}>
      {children}
    </SessionContext.Provider>
  );
};

// export const useSession = () => useContext(SessionContext);
export default SessionContext;
