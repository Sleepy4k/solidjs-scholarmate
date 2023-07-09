import { IUserData, IStudentData } from '@types';
import { getStorage, setStorage, setAndDeleteStorage } from '@utils';
import { createContext, createSignal, onCleanup, onMount } from 'solid-js';

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
  const [token, setToken] = createSignal<string>('');
  const [user, setUser] = createSignal<IUserData>(null);
  const [loading, setLoading] = createSignal<boolean>(false);
  const [student, setStudent] = createSignal<IStudentData>(null);

  const updateData = async (type: string, data: any) => {
    type = type.toLowerCase();

    if (type === 'user') {
      setUser(data);
      setAndDeleteStorage('user', data);
    } else if (type === 'token') {
      setToken(data);
      setAndDeleteStorage('token', data);
    } else if (type === 'student') {
      setStudent(data);
      setAndDeleteStorage('student', data);
    } else if (type === 'loading') {
      setLoading(data);
    } else {
      console.error('Invalid type');
    }
  };

  const handleBeforeUnload = async () => {
    const tokenStorage = getStorage('token');
    const userStorage = getStorage('user');
    const studentStorage = getStorage('student');

    if (!tokenStorage) {
      setStorage('token', token());
    } else {
      await setAndDeleteStorage('token', token());
    }

    if (!userStorage) {
      setStorage('user', user());
    } else {
      await setAndDeleteStorage('user', user());
    }

    if (!studentStorage) {
      setStorage('student', student());
    } else {
      await setAndDeleteStorage('student', student());
    }
  };

  const handleLoad = () => {
    const tokenStorage = getStorage('token');
    const userStorage = getStorage('user');
    const studentStorage = getStorage('student');

    if (tokenStorage) {
      setToken(tokenStorage);
    }

    if (userStorage) {
      setUser(userStorage);
    }

    if (studentStorage) {
      setStudent(studentStorage);
    }
  };

  onCleanup(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
    window.removeEventListener('load', handleLoad);
  });

  onMount(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', handleLoad);
  });

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