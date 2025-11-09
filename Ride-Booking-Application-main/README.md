Perfect 👍 — here’s a **professional and attractive README.md** content you can directly add to your **GitHub repository** for your **Online Ride Booking Application (Uber Clone)** developed during your **Teksoft Labs Internship**.

It’s clean, structured, and uses standard markdown styling for GitHub (with badges, emojis, and sections).

---

# 🚗 Online Ride Booking Application (Uber Clone)

This project was developed as part of my **Full Stack Development Internship** at **Teksoft Labs Private Limited** (5th July 2025 – 10th August 2025).
It is a full-stack web application that allows users to book rides in real time while enabling captains (drivers) to accept or reject ride requests — similar to Uber’s core functionality.

---

## 🧠 Overview

The **Online Ride Booking Application** aims to simulate a real-world ride-hailing system with features like authentication, Google login, ride matching, fare estimation, and live updates.
It was built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**, following **MVC architecture** and **RESTful API principles**.

---

## 🛠️ Tech Stack

### **Frontend:**

* React.js
* Tailwind CSS
* JavaScript (ES6+)
* Axios for API communication

### **Backend:**

* Node.js
* Express.js
* MongoDB with Mongoose ORM

### **Authentication:**

* JWT (JSON Web Token) for secure login sessions
* Google OAuth 2.0 for both User and Captain roles

### **Tools & Utilities:**

* Postman (API Testing)
* Git & GitHub (Version Control)
* Nodemon (Development)

---

## ⚙️ Features

### 👥 User Side

* Login and Signup with Google OAuth
* Book rides by setting pickup and destination points
* Get estimated fare dynamically
* View ride confirmation and driver details

### 🚖 Captain (Driver) Side

* Login and Signup with Google OAuth
* Receive ride requests from nearby users
* Accept or reject rides in real-time
* Update ride status (Started / Completed)

### 🌐 Common Features

* Secure role-based authentication using JWT
* RESTful API integration between frontend and backend
* Real-time updates on ride status
* Responsive and modern UI built with Tailwind CSS

---

## 🧩 Architecture

The project follows a clean **MVC (Model-View-Controller)** architecture:

```
Backend/
│
├── controllers/     # Business logic and route handling
├── models/          # MongoDB schemas (User, Captain, Ride)
├── routes/          # API route definitions
├── middleware/      # Auth and validation logic
├── config/          # Database connection and environment setup
└── server.js        # App entry point
```

Frontend structure:

```
Frontend/
│
├── src/
│   ├── components/  # Reusable UI components
│   ├── pages/       # User and Captain views
│   ├── assets/      # Images and icons
│   ├── context/     # State management (Auth, Ride)
│   └── App.js       # Main app configuration
```

---

## 🧪 API Endpoints

### **User Routes**

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| POST   | `/user/register` | Register a new user     |
| POST   | `/user/login`    | Login user & return JWT |
| GET    | `/user/profile`  | Get user details        |

### **Captain Routes**

| Method | Endpoint            | Description                    |
| ------ | ------------------- | ------------------------------ |
| POST   | `/caption/register` | Register new captain           |
| POST   | `/caption/login`    | Captain login & JWT generation |
| GET    | `/caption/profile`  | Get captain details            |

### **Ride Routes**

| Method | Endpoint       | Description          |
| ------ | -------------- | -------------------- |
| POST   | `/ride/book`   | Book a new ride      |
| POST   | `/ride/accept` | Captain accepts ride |
| POST   | `/ride/status` | Update ride status   |

---

## 🚀 How to Run Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/AmanLatya/Ride-Booking-Application.git
   cd Ride-Booking-Application
   ```

2. **Install dependencies**

   ```bash
   npm install
   cd frontend && npm install
   ```

3. **Setup environment variables**

   * Create a `.env` file in the root directory:

     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_USER_SECRET=your_user_secret
     JWT_CAPTION_SECRET=your_caption_secret
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     ```

4. **Run the project**

   ```bash
   npm run dev
   ```

---


## 🏁 Conclusion

This project allowed me to apply **real-world software engineering concepts**, including RESTful APIs, MVC design, database modeling, and frontend integration.
It strengthened my understanding of **client-server communication**, **project structuring**, and **full stack deployment**.

---

## 🧑‍💻 Author

**Aman Latya**
Final Year B.Tech Student | Full Stack Developer
📧 amanlatya23@gmail.com
🔗 www.linkedin.com/in/aman-latya-379a12253

---

