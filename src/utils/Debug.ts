import toast from 'solid-toast';

const Println = (title: string, message: string, type: string) => {
  if (import.meta.env.VITE_DEV === "local") {
    switch (type) {
      case "error":
        console.error(`[${title}] ${message}`);
        break;
      case "warn":
        console.warn(`[${title}] ${message}`);
        break;
      case "info":
        console.info(`[${title}] ${message}`);
        break;
      default:
        console.log(`[${title}] ${message}`);
        break;
    }
  } else {
    switch (type) {
      case "error":
        toast.error(`[${title}] ${message}`);
        break;
      case "warn":
        toast.error(`[${title}] ${message}`);
        break;
      case "info":
        toast(`[${title}] ${message}`);
        break;
      default:
        toast.success(`[${title}] ${message}`);
        break;
    }
  }
}

export default Println;