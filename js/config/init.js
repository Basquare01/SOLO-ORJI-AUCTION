// js/config/init.js
(function() {
  // Initialize default data on first load
  
  // CREATE DEFAULT ADMIN
  if (!localStorage.getItem("admin")) {
    localStorage.setItem("admin", JSON.stringify({
      id: "ADMIN_001",
      name: "System Admin",
      email: "admin@auction.com",
      password: "admin123",
      role: "admin"
    }));
  }

  // INITIALIZE EMPTY USERS ARRAY
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]));
  }

  // INITIALIZE EMPTY AUCTIONS
  if (!localStorage.getItem("auctions")) {
    localStorage.setItem("auctions", JSON.stringify([]));
  }

  // INITIALIZE EMPTY SESSION
  if (!localStorage.getItem("currentUser")) {
    localStorage.setItem("currentUser", JSON.stringify(null));
  }
})();
