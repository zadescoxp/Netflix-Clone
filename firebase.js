import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDZcddvCUnM3BCzcvZYfXQP0aDcG_B5Zts",
  authDomain: "netflix-clone-5b648.firebaseapp.com",
  projectId: "netflix-clone-5b648",
  storageBucket: "netflix-clone-5b648.appspot.com",
  messagingSenderId: "173578132606",
  appId: "1:173578132606:web:d99601a763b2d5e5348c2f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      })
    }
    catch(error){
      toast.error(error.code.split("/")[1].split("-").join(" "))
    }
}

const login = async (email ,password) => {
  try{
    await signInWithEmailAndPassword(auth, email , password);
  }
  catch(error) {
    toast.error(error.code.split("/")[1].split("-").join(" "))
  }
}

const signout = () => {
  signOut(auth);
}

export {auth, db, signup, login, signout}