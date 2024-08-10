// Firebase initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, ref, update, get } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const firebaseConfig = 
{
  apiKey: "AIzaSyB5_jT54SCi46WC-T-xlPzG-nWvQxSe8-s",
  authDomain: "final-project-8c2e6.firebaseapp.com",
  databaseURL: "https://final-project-8c2e6-default-rtdb.firebaseio.com",
  projectId: "final-project-8c2e6",
  storageBucket: "final-project-8c2e6.appspot.com",
  messagingSenderId: "1012119391177",
  appId: "1:1012119391177:web:8290da106aa4128ec37618"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const registerbtn = document.getElementById("register-btn");
registerbtn.addEventListener("click", () =>
  {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("msg");

    if (!validate_email(email))
    {
      msg.innerHTML = `Email must be valid.`;
      emailInput.focus();
      return;
    }
    if (!validate_password(password))
      {
        msg.innerHTML = `Password must be at least 6 characters.`;
        passwordInput.focus();
        return;
      }
    if (!validate_name(name))
    {
      msg.innerHTML = `Please enter your name`;
      nameInput.focus();
      return;
    }
    msg.innerHTML = `processing...`;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) =>
      {
        const user = userCredential.user;
        const database_ref = ref(database, 'users/' + user.uid);
        const user_data =
          {
            email: email,
            name: name
          };
        
        return update(database_ref, user_data);
      })
      .then(() =>
      {
         msg.innerHTML = `Welcome, ${name}`;
        window.location.href = "account.html";
      })
      .catch((error) =>
      {
        console.error("Error registering user:", error);
      });
  });

function validate_email(email)
{
  const rgx = /^[^@]+@\w+(\.\w+)+\w$/;
  return rgx.test(email);
}

function validate_password(pass)
{
  return pass.length >= 6;
}

function validate_name(field)
{
  return field && field.trim().length > 0;
}

function checkUserLoggedIn()
{
  onAuthStateChanged(auth, (user) =>
  {
      if (user)
      {
          const userRef = ref(database, 'users/' + user.uid);
          get(userRef).then((snapshot) =>
          {
              if (snapshot.exists())
              {
                window.location.href = "account.html";
              } else
                {
                    console.log("No user data found");
                }
          }).catch((error) =>
              {
                  console.error("Error fetching user data:", error);
              });
      } 
  });
}
checkUserLoggedIn();