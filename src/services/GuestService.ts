/* eslint-disable solid/reactivity */
import Api from './ApiService';

interface GuestProps {
  url: string;
  data?: any;
  success?: any;
  error?: any;
  headers?: any;
  params?: any;
  finally?: any;
}

const initService = async (props: GuestProps, method: string) => {
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
  get: async (props: GuestProps) => {
    await initService(props, 'get');
  },
  post: async (props: GuestProps) => {
    await initService(props, 'post');
  },
  put: async (props: GuestProps) => {
    await initService(props, 'put');
  },
  patch: async (props: GuestProps) => {
    await initService(props, 'patch');
  },
  delete: async (props: GuestProps) => {
    await initService(props, 'delete');
  }
};

export default GuestService;