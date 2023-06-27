/* eslint-disable solid/reactivity */
import Api from './ApiService';

interface IGuestProps {
  url: string;
  data?: any;
  success?: any;
  error?: any;
  headers?: any;
  params?: any;
  finally?: any;
}

const initService = async (props: IGuestProps, method: string) => {
  const requestOption = {
    headers: props.headers,
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