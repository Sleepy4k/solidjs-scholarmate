import toast from 'solid-toast';
import { APP_ENV } from '@consts';

const Println = (title: string, message: string, type: string) => {
  const isDev = APP_ENV === 'development';

  if (isDev) {
    switch (type) {
    case 'error':
      console.error(`[${title}] ${message}`);
      toast.error(`[${title}] ${message}`);
      break;
    case 'warn':
      console.warn(`[${title}] ${message}`);
      toast.error(`[${title}] ${message}`);
      break;
    case 'success':
      console.info(`[${title}] ${message}`);
      toast.success(`[${title}] ${message}`);
      break;
    default:
      console.log(`[${title}] ${message}`);
      toast(`[${title}] ${message}`);
      break;
    }
  } else {
    switch (type) {
    case 'error':
      toast.error(`[${title}] ${message}`);
      break;
    case 'warn':
      toast.error(`[${title}] ${message}`);
      break;
    case 'success':
      toast.success(`[${title}] ${message}`);
      break;
    default:
      toast(`[${title}] ${message}`);
      break;
    }
  }
};

export default Println;