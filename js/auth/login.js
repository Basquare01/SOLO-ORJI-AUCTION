document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Safely parse admin and users
  const admin = JSON.parse(localStorage.getItem("admin") || "null");
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // Admin login (only if admin exists)
  if (admin && email === admin.email && password === admin.password) {
    localStorage.setItem("currentUser", JSON.stringify({
      email: admin.email,
      role: "admin"
    }));
    window.location.href = "admin.html";
    return;
  }

  // User login
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify({
      id: user.id,
      email: user.email,
      role: "user"
    }));
    showToast("Login successful");
    setTimeout(function() { window.location.href = "marketplace.html"; }, 1200);
  } else {
    showToast("Invalid login credentials", "error");
  }
});
