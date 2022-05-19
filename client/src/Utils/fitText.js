export const fitText = (str) => {
  if (str.length < 15) return;
  else {
    return str.slice(0, 15) + "...";
  }
};
