import jwt from "jsonwebtoken";
import config from "config";

export default function authUser(req: any, res: any, next: any) {
  //get the token from the header if present
  const token = req.headers["x-access-token"] || req.headers["authorization"];

  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send("Access denied, No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("privateKey"));
    req.user = decoded;
    next();
  } catch (error) {
    //if invalid token
    res.status(400).send("Invalid token.");
  }
};
