import { verifyPhoneIdToken } from "../services/firebaseAdmin";

export default async function authUser(req: any, res: any, next: any) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send("A Firebase ID token is required.");
  }

  try {
    const decodedToken = await verifyPhoneIdToken(
      authorization.slice("Bearer ".length)
    );
    req.user = {
      id: decodedToken.uid,
      phoneNumber: decodedToken.phone_number,
    };
    next();
  } catch (error) {
    return res.status(401).send("The Firebase ID token is invalid.");
  }
}
