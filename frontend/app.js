
document.addEventListener("DOMContentLoaded", function () {
  const formContainer = document.querySelector(".form-container");
  const particlesContainer = document.querySelector(".particles");
  const titleElement = document.querySelector("h2");
  const toggleButton = document.querySelector(".toggle-form");
  const submitButton = document.querySelector(".submit-btn");
  const confirmPasswordGroup = document.querySelector(".confirm-password");
  const forgotPasswordLink = document.querySelector(".forgot-password");

  let isLogin = true;

  // Create particles
  for (let i = 0; i < 200; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random position
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.left = `${Math.random() * 100}%`;

    // Random movement
    const tx =
      (Math.random() > 0.5 ? "" : "-") + (20 + Math.random() * 30) + "px";
    const ty =
      (Math.random() > 0.5 ? "" : "-") + (20 + Math.random() * 30) + "px";
    particle.style.setProperty("--tx", tx);
    particle.style.setProperty("--ty", ty);

    // Animation
    particle.style.animation = `moveParticle ${
      3 + Math.random() * 4
    }s linear infinite`;
    particle.style.animationDelay = `${Math.random() * 2}s`;

    particlesContainer.appendChild(particle);
  }

  // Form toggle functionality
  toggleButton.addEventListener("click", function () {
    isLogin = !isLogin;

    if (isLogin) {
      titleElement.textContent = "Sign In";
      toggleButton.textContent = "Need an account? Sign Up";
      submitButton.textContent = "Login";
      confirmPasswordGroup.style.display = "none";
      forgotPasswordLink.style.display = "block";
      confirmPasswordInput.required = false; // Adjust this line as needed
    } else {
      titleElement.textContent = "Sign Up";
      toggleButton.textContent = "Already have an account? Sign In";
      submitButton.textContent = "Create Account";
      confirmPasswordGroup.style.display = "block";
      forgotPasswordLink.style.display = "none";
      confirmPasswordInput.required = true; // Adjust this line as needed
    }
  });

  // Ensure labels behave correctly
  const inputs = document.querySelectorAll(".input-group input");
  inputs.forEach((input) => {
    // Set initial placeholder to empty to allow CSS to work
    input.placeholder = "";

    // Handle autofill
    input.addEventListener("animationstart", function (e) {
      if (e.animationName === "onAutoFillStart") {
        this.classList.add("auto-filled");
      }
    });
  });

  // Form submission
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    // Add your form submission logic here
    isLogin ? signin() : Signup();
  });
});

const baseUrl = "http://localhost:3004";
function signin() {
  // Get the username and password values
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Create the data object
  const data = {
    username,
    password,
  };

  // Make the POST request to the sign-in API
  fetch(`${baseUrl}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        // Save the JWT token in a cookie
        const token = data.token; // Assuming the token is returned in the `token` field
        document.cookie = `token=${token}; path=/; max-age=86400`; // Store for 1 day (86400 seconds)

        // Optionally redirect the user or show a success message
        alert("Sign in successful!");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function Signup() {
  // Add your sign-up logic here
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  // const confirmPassword = document.getElementById('confirm-password').value;
  const data = {
    username,
    password,
    // confirmPassword
  };
  fetch(`${baseUrl}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
let socket = io("http://localhost:3005/");
socket.on("connection", () => {
  console.log("connected");
});