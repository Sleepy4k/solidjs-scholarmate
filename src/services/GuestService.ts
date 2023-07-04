/* eslint-disable solid/reactivity */
import Api from './ApiService';
import { mergeProps } from 'solid-js';
import { Println, convertErrorResponseData } from '@utils';

interface IGuestProps {
  url: string;
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
    name: 'Server',
    headers: {}
  }, _props);

  const requestOption = {
    headers: {
      'Content-Type': 'application/json',
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
    } else {
      const res = response.data;

      Println(props.name, res.message, 'success');
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