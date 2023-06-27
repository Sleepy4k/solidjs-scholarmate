/* eslint-disable solid/reactivity */
import Api from './ApiService';
import { getCookie } from '@utils';

interface IAuthProps {
  url: string;
  data?: any;
  success?: any;
  error?: any;
  headers?: any;
  params?: any;
  finally?: any;
}

const token = getCookie('scholarmate_auth_token');

const initService = async (props: IAuthProps, method: string) => {
  const requestOption = {
    headers: {
      Authorization: `Bearer ${token}`,
      ...props.headers
    },
    params: props.params
  };

  try {
    const response = await Api[method](props.url, requestOption);

    if (props.success) {
      props.success(response);
    }
  } catch (error) {
    if (props.error) {
      props.error(error);
    }
  } finally {
    if (props.finally) {
      props.finally();
    }
  }
};

const AuthService = {
  get: async (props: IAuthProps) => {
    await initService(props, 'get');
  },
  post: async (props: IAuthProps) => {
    await initService(props, 'post');
  },
  put: async (props: IAuthProps) => {
    await initService(props, 'put');
  },
  patch: async (props: IAuthProps) => {
    await initService(props, 'patch');
  },
  delete: async (props: IAuthProps) => {
    await initService(props, 'delete');
  }
};

export default AuthService;