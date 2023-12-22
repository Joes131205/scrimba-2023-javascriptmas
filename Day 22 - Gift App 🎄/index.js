// README
// Have fun reading the code bro :) (Solution in line 163)
// Dom't expect much (expect alot of bug tho), at least its working :) /j

// Firebase Setup
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "gift-app-javascriptmas.firebaseapp.com",
  databaseURL:
    "https://gift-app-javascriptmas-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gift-app-javascriptmas",
  storageBucket: "gift-app-javascriptmas.appspot.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Get all inputs (AUTH)
const viewLoggedOut = document.getElementById("logged-out-view");
const viewLoggedIn = document.getElementById("logged-in-view");

const emailInputEl = document.getElementById("email-input");
const passwordInputEl = document.getElementById("password-input");

const signInButtonEl = document.getElementById("sign-in-btn");
const createAccountButtonEl = document.getElementById("create-account-btn");
const signInGoogleButtonEl = document.getElementById("sign-in-google");
const signOutButtonEl = document.getElementById("sign-out-btn");

const currentEmailEl = document.getElementById("current-email");

//Get all inputs (MAIN)
const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const peopleListEl = document.getElementById("people-list");

// Handle inputs
signInButtonEl.addEventListener("click", authSignInWithEmail);
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail);
signOutButtonEl.addEventListener("click", authSignOut);
signInGoogleButtonEl.addEventListener("click", authSignInWithGoogle);

// Handle Auth
let currUID;
onAuthStateChanged(auth, (user) => {
  if (user) {
    currUID = user.uid;
    currentEmailEl.textContent = `Email : ${user.email}`;
    showLoggedInView();
    loadData();
  } else {
    showLoggedOutView();
  }
});

function authCreateAccountWithEmail() {
  const email = emailInputEl.value;
  const password = passwordInputEl.value;

  emailInputEl.value = "";
  passwordInputEl.value = "";

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      sendEmailVerification(auth.currentUser).then(() => {});
      const user = userCredential.user;
      showLoggedInView();
      loadData();
    })
    .catch((error) => {
      console.error(error.message);
    });
}

function authSignInWithEmail() {
  const email = emailInputEl.value;
  const password = passwordInputEl.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      showLoggedInView();
      emailInputEl.value = "";
      passwordInputEl.value = "";
      loadData();
    })
    .catch((error) => {
      console.error(error.message);
    });
}

function authSignInWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      showLoggedInView();
      loadData();
      console.log("Signed in with Google");
    })
    .catch((error) => {
      console.error(error.message);
    });
}

function authSignOut() {
  signOut(auth)
    .then(() => {
      showLoggedOutView();
      clearPeopleListEl();
      clearInputFieldEl();
    })
    .catch((error) => {
      console.error(error.message);
    });
}

function showLoggedOutView() {
  hideElement(viewLoggedIn);
  showElement(viewLoggedOut);
}

function showLoggedInView() {
  hideElement(viewLoggedOut);
  showElement(viewLoggedIn);
}

function showElement(element) {
  element.style.display = "flex";
}

function hideElement(element) {
  element.style.display = "none";
}

// Main Code
let people = [];
async function loadData() {
  people = [];
  const postsRef = collection(db, "names");
  const q = query(postsRef, where("uid", "==", currUID));

  onSnapshot(
    q,
    (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const name = doc.data();
        const postId = doc.id;
        people.push({ body: name.body, id: postId });
      });
      renderList(people);
    },
    (error) => {
      console.error("Error fetching data:", error);
    }
  );
}
addButtonEl.addEventListener("click", async function () {
  let inputValue = inputFieldEl.value;
  if (inputValue) {
    try {
      const docRef = await addDoc(collection(db, "names"), {
        body: inputValue,
        uid: currUID,
      });
      loadData();
      clearInputFieldEl();
    } catch (error) {
      console.error(error.message);
    }
  }
});

function renderList(array) {
  clearPeopleListEl();

  for (let i = 0; i < array.length; i++) {
    let currentPerson = array[i];
    appendPersonToPeopleListEl(currentPerson);
  }
}

function clearPeopleListEl() {
  peopleListEl.innerHTML = "";
}

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function appendPersonToPeopleListEl(person) {
  let newEl = document.createElement("li");

  newEl.textContent = person.body;

  newEl.addEventListener("dblclick", async function () {
    let index = people.indexOf(person);
    const docRef = doc(collection(db, "names"), person.id);

    try {
      await deleteDoc(docRef);
      clearPeopleListEl();
      renderList(people);
      loadData();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  });
  peopleListEl.append(newEl);
}
