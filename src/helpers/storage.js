export const setTokentoSessionStorage = (token) => {
  sessionStorage.setItem("token", token);
};

export const getTokenfromSessionStorage = () => {
  const token = sessionStorage.getItem("token");
  return token;
};

export const removeTokenfromSessionStorage = () => {
  sessionStorage.removeItem("token");
};
