/* eslint-disable solid/reactivity */
import { mergeProps } from 'solid-js';
import { mainApi, exportApi, authApi } from './ApiService';
import { Println, convertErrorResponseData } from '@utils';

interface IAuthProps {
  url: string;
  server?: string;
  token: string;
  name?: string;
  data?: any;
  success?: any;
  error?: any;
  headers?: any;
  params?: any;
  finally?: any;
}

const initService = async (_props: IAuthProps, method: string) => {
  const props = mergeProps({
    server: 'main',
    name: 'Server',
    headers: {}
  }, _props);

  const requestOption = {
    headers: {
      Authorization: `Bearer ${props.token}`,
      ...props.headers
    },
    params: props.params,
    responseType: props.server === 'export' ? 'blob' : 'json'
  };

  let Api: any;

  switch (props.server) {
  case 'main':
    Api = mainApi;
    break;
  case 'export':
    Api = exportApi;
    break;
  case 'auth':
    Api = authApi;
    break;
  default:
    Api = mainApi;
    break;
  }

  try {
    let response: any;

    if (method === 'get' || method === 'delete') {
      response = await Api[method](props.url, requestOption);
    } else {
      response = await Api[method](props.url, props.data, requestOption);
    }

    if (props.success) {
      props.success(response);
    } else {
      if (props.server === 'export') {
        const type = response.headers['content-type'];
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(';')[0];
        const blob = new Blob([response.data], { type: type });
        const link = document.createElement('a');

        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
      } else {
        const res = response.data;

        Println(props.name, res.message, 'success');
      }
    }
  } catch (error) {
    if (props.error) {
      props.error(error);
    } else {
      if (error.response) {
        const res = error.response.data;

        if (res.data && res.data.length > 0) {
          const errors = convertErrorResponseData(res.data[0]);

          for (let index = 0; index < errors.length; index++) {
            Println(props.name, errors[index], 'error');
          }
        } else {
          Println(props.name, res.message, 'error');
        }
      } else {
        Println(props.name, error.message, 'error');
      }
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