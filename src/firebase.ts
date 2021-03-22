import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCvK4PGZMODF-o3JRqXuGcB2bwDacwVpxU",
  authDomain: "richform-7b503.firebaseapp.com",
  projectId: "richform-7b503",
  storageBucket: "richform-7b503.appspot.com",
  messagingSenderId: "12164980399",
  appId: "1:12164980399:web:2b9ca0d25a83a5af34fe5a",
  measurementId: "G-8RTCMCDMLS",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

const uploadFile = (file: File, getURL: (url: string) => void): void => {
  if (file) {
    const uploadTask = storage.ref(`/images/${file?.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then((firebaseURL) => {
          getURL(firebaseURL);
        });
    });
  }
};
export { storage, uploadFile, firebase as default };
