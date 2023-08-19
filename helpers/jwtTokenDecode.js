const jwtDecode = require("jwt-decode");
exports.jwtTokenDecode = (authorization) => {
  const token = authorization.split(" ")[1];
  const payload = jwtDecode(token);
  return payload ?? {};
};
