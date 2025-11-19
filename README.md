Here’s the **perfect, ready-to-copy README.md** for your exact project after carefully checking your repository structure and code.

```markdown
# 🏠 Flat Rental – Full Stack Flat Rental Application

A complete flat/apartment rental platform where users can:
- Register & Login
- Post their flats for rent
- Browse, search, and filter available flats
- View flat details with multiple images
- Contact owners directly

Built with **React.js (Frontend)** + **Spring Boot (Java Backend)** + **MySQL**

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

## ✨ Features

- Full user authentication (JWT-based)
- Add, edit, delete, and view your own flats
- Upload multiple images per flat
- Advanced search & filters (location, price, BHK, furnished status)
- Responsive design (works perfectly on mobile & desktop)
- Secure & protected routes

## 🛠 Tech Stack

| Layer           | Technology                          |
|-----------------|-------------------------------------|
| Frontend        | React.js + React Router + Axios     |
| Backend         | Spring Boot 3 + Spring Security + JWT |
| Database        | MySQL                               |
| Authentication  | JWT (Bearer Token)                  |
| File Upload     | Stored in `uploads/` folder         |
| Build Tool      | Maven                               |

## 🚀 How to Run Locally (Step-by-Step)

### Prerequisites
- Java 17 or higher
- Node.js (v16+)
- MySQL 8.0+
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/nodk69/Flat-Rental-Full-Stack-Application.git
cd Flat-Rental-Full-Stack-Application
```

### 2. Backend Setup (Spring Boot)

```bash
cd backend
```

Edit `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/flatrentaldb
spring.datasource.username=root
spring.datasource.password=your_mysql_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT Secret (change this in production!)
app.jwtSecret=yourVeryStrongSecretKeyHere123!@#
app.jwtExpirationMs=86400000

# File upload path
file.upload-dir=./uploads
```

Create the database in MySQL:
```sql
CREATE DATABASE flatrentaldb;
```

Start the backend:
```bash
./mvnw spring-boot:run
```
 Backend runs on → **http://localhost:8080**

### Important Backend Endpoints (Live)

| Method | Endpoint                          | Description                  |
|--------|-----------------------------------|------------------------------|
| POST   | `/api/auth/signup`                | Register new user            |
| POST   | `/api/auth/signin`                | Login (returns JWT)          |
| GET    | `/api/flats`                      | Get all flats                |
| GET    | `/api/flats/{id}`                 | Get flat by ID               |
| POST   | `/api/flats`                      | Create new flat (protected)  |
| PUT    | `/api/flats/{id}`                 | Update flat (owner only)     |
| DELETE | `/api/flats/{id}`                 | Delete flat (owner only)     |
| GET    | `/api/flats/user/{userId}`       | Get flats by user            |

### 3. Frontend Setup (React)

Open a new terminal:
```bash
cd ../frontend
npm install
npm start
```

The app will open at → **http://localhost:3000**

(Your frontend already correctly points to `http://localhost:8080` – no changes needed)

### 4. Login Credentials (for testing)
You can register a new account or use any created user.

## 📸 Screenshots (Coming Soon)
(You can add them later in a `/screenshots` folder)

## 🤝 Contributing

Contributions are welcome!  
1. Fork the repo  
2. Create a branch (`git checkout -b feature/your-feature`)  
3. Commit your changes  
4. Push and open a Pull Request  

## 👨‍💻 Author

Made with ❤️ by [nodk69](https://github.com/nodk69)

---
⭐ **Star this repo if you like it!**  
Feel free to open issues for bugs or new features.

