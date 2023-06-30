/* eslint-disable solid/reactivity */
import Api from './ApiService';

interface IAuthProps {
  url: string;
  token: string;
  data?: any;
  success?: any;
  error?: any;
  headers?: any;
  params?: any;
  finally?: any;
}

const initService = async (props: IAuthProps, method: string) => {
  const requestOption = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${props.token}`,
      ...props.headers
    },
    params: props.params
  };

  try {
    let response: any;

    if (method === 'get' || method === 'delete') {
      response = await Api[method](props.url, requestOption);
    } else {
      response = await Api[method](props.url, props.data, requestOption);
    }

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