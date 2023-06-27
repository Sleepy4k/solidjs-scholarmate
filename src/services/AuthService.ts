/* eslint-disable solid/reactivity */
import Api from './ApiService';
import { getCookie } from '@utils';

interface authProps {
  url: string;
  data?: any;
  success?: any;
  error?: any;
  headers?: any;
  params?: any;
  finally?: any;
}

const token = getCookie('scholarmate_auth_token');

const initService = async (props: authProps, method: string) => {
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
  get: async (props: authProps) => {
    await initService(props, 'get');
  },
  post: async (props: authProps) => {
    await initService(props, 'post');
  },
  put: async (props: authProps) => {
    await initService(props, 'put');
  },
  patch: async (props: authProps) => {
    await initService(props, 'patch');
  },
  delete: async (props: authProps) => {
    await initService(props, 'delete');
  }
};

export default AuthService;