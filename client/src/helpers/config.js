export const postConfig = {
  headers: {
    "Content-type": "application/json",
  },
};
export const authConfig = (token) => {
  return {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};
