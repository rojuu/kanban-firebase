import { initializeApp } from "firebase/app";
import { EmailAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { auth as authUI } from "firebaseui";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);

const ui = new authUI.AuthUI(auth);
ui.start("#firebaseui-auth-container", {
  signInOptions: [EmailAuthProvider.PROVIDER_ID],
});
