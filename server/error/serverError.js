const serverError = (info) => {
  return `${info}: Server was not able to process the request`;
};
module.exports = { serverError };
