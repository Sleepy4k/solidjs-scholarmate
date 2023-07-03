import { createContext, createSignal } from 'solid-js';

export interface IAuthContext {
  user: any;
  token: any;
  student: any;
  loading: any;
  // eslint-disable-next-line no-unused-vars
  updateData: (type: string, data: any) => void;
}

export const Context = createContext<IAuthContext>();

export function Provider(props: any) {
  const [user, setUser] = createSignal<object>(null);
  const [token, setToken] = createSignal<string>(null);
  const [student, setStudent] = createSignal<object>(null);
  const [loading, setLoading] = createSignal<boolean>(false);

  const updateData = (type: string, data: any) => {
    type = type.toLowerCase();

    if (type === 'user') {
      setUser(data);
    } else if (type === 'token') {
      setToken(data);
    } else if (type === 'student') {
      setStudent(data);
    } else if (type === 'loading') {
      setLoading(data);
    } else {
      console.error('Invalid type');
    }
  };

  return (
    <Context.Provider
      value={{
        user,
        token,
        student,
        loading,
        updateData
      }}
    >
      {props.children}
    </Context.Provider>
  ); 
}