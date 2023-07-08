/* eslint-disable solid/reactivity */
import { mergeProps } from 'solid-js';
import { mainApi, exportApi, authApi } from './ApiService';
import { Println, convertErrorResponseData } from '@utils';

interface IGuestProps {
  url: string;
  server?: string;
  name?: string;
  data?: any;
  success?: any;
  error?: any;
  headers?: any;
  params?: any;
  finally?: any;
}

const initService = async (_props: IGuestProps, method: string) => {
  const props = mergeProps({
    server: 'main',
    name: 'Server',
    headers: {}
  }, _props);

  const requestOption = {
    headers: {
      ...props.headers
    },
    params: props.params
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

const GuestService = {
  get: async (props: IGuestProps) => {
    await initService(props, 'get');
  },
  post: async (props: IGuestProps) => {
    await initService(props, 'post');
  },
  put: async (props: IGuestProps) => {
    await initService(props, 'put');
  },
  patch: async (props: IGuestProps) => {
    await initService(props, 'patch');
  },
  delete: async (props: IGuestProps) => {
    await initService(props, 'delete');
  }
};

export default GuestService;