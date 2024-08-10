// Firebase initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

  // My web app's Firebase configuration
const firebaseConfig =
  {
    apiKey: "AIzaSyB5_jT54SCi46WC-T-xlPzG-nWvQxSe8-s",
    authDomain: "final-project-8c2e6.firebaseapp.com",
    projectId: "final-project-8c2e6",
    storageBucket: "final-project-8c2e6.appspot.com",
    messagingSenderId: "1012119391177",
    appId: "1:1012119391177:web:8290da106aa4128ec37618"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const loginbtn = document.getElementById("login-btn");
loginbtn.addEventListener("click", () =>
  {
  
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById('msg');
  
  if (!validate_password(password))
    {
      msg.innerHTML = `Invalid password.`;
      passwordInput.focus();
      return;
    }
  if (!(validate_email(email)))
      {
        msg.innerHTML = `Invalid email.`;
        emailInput.focus();
        return;
      }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) =>
    {
      const user = userCredential.user;
      const userRef = ref(database, 'users/' + user.uid);

      get(userRef)
        .then((snapshot) =>
        {
          if (snapshot.exists())
          {
            const userData = snapshot.val();
            const username = userData.name;
            msg.innerHTML = `Welcome back, ${username}`;
            window.location.href = "account.html";
          } else
            {
              alert("User data not found.");
            }
        })
        .catch((error) => {
          var error_message = error.message;
          console.log(error_message);
          return;
        });
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
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

const reset = document.getElementById('reset');
reset.addEventListener('click', function(e)
  {
    e.preventDefault();
    
    const email = document.getElementById("email").value;
    const msg = document.getElementById('msg');
    
    sendPasswordResetEmail(auth, email)
      .then(() =>
      {
        msg.innerHTML = `email sent`;
      })
      .catch((error) =>
      {
        msg.innerHTML = `please enter email and reclick`;
      })
  }
)

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
      } else
        {
        }
  });
}
checkUserLoggedIn();