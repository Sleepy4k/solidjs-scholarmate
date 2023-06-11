function checkCookie(key: string) {
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  const cookie = cookies.find((data) => data.startsWith(key));

  if (cookie) {
    return true;
  }
  
  return false;
}

function getCookie(key: string) {
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  const cookie = cookies.find((data) => data.startsWith(key));

  if (cookie) {
    return cookie.split("=")[1];
  }
  
  return null;
}

export { checkCookie, getCookie };