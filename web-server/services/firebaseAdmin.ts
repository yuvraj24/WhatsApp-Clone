import {
  applicationDefault,
  getApp,
  getApps,
  initializeApp,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const projectId = process.env.FIREBASE_PROJECT_ID;

function getFirebaseApp() {
  if (!projectId) {
    throw new Error("FIREBASE_PROJECT_ID must be configured before using authentication.");
  }

  return getApps().length
    ? getApp()
    : initializeApp({
        credential: applicationDefault(),
        projectId,
      });
}

export async function verifyPhoneIdToken(token: string) {
  const decodedToken = await getAuth(getFirebaseApp()).verifyIdToken(token);
  if (
    !decodedToken.phone_number ||
    decodedToken.firebase.sign_in_provider !== "phone"
  ) {
    throw new Error("A verified Firebase phone-auth token is required.");
  }
  return decodedToken;
}
