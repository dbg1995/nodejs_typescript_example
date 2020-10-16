const ResponseMiddleware = (req, res) => {
  res.send({ data: res.data, error: null });
};

export default ResponseMiddleware;
