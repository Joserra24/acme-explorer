import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';

export const firebaseConfig = {
  apiKey: 'XXX',
  authDomain: 'XXX',
  projectId: 'XXX',
  storageBucket: 'XXX',
  messagingSenderId: 'XXX',
  appId: 'XXX'
};

export const firebaseApp: FirebaseApp =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
