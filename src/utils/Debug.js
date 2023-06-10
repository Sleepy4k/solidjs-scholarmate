const Println = (title, message, type = "success") => {
  if (type === "error") {
    console.error(`[${title}] ${message}`);
  } else if (type === "warning") {
    console.warn(`[${title}] ${message}`);
  } else if (type === "info") {
    console.info(`[${title}] ${message}`);
  } else {
    console.log(`[${title}] ${message}`);
  }
}

export default Println;