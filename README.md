TripSphere – Travel & Expense Management System

A full-stack corporate travel and expense management platform built using Angular and Spring Boot. The system streamlines travel requests, approvals, expense tracking, and policy management with secure role-based access control.

🚀 Features
Authentication & Security
JWT-based authentication
Role-based authorization
Auto logout on token expiration
Secure REST APIs with Spring Security
Travel Request Management
Create travel requests
Save drafts
Submit requests for approval
Track request status
Manager/Admin approval workflow
Expense Management
Expense claim submission
Budget tracking
Expense policy validation
Policy Management
Editable travel policies
Expense rule configuration
Policy violation monitoring
Dashboard & Reporting
Role-specific dashboard
Travel analytics
Request summaries
Approval insights
🛠️ Tech Stack
Frontend
Angular
TypeScript
Angular Material
Bootstrap
Backend
Java
Spring Boot
Spring Security
JWT Authentication
REST APIs
Database
MySQL
Tools
Git & GitHub
Postman
Maven
IntelliJ IDEA
VS Code
📂 Project Structure
TripSphere/
│
├── tripsphere_frontend/
│   ├── src/
│   ├── app/
│   └── angular.json
│
├── tripsphere_backend/
│   ├── src/main/java/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── entity/
│   └── security/
│
└── README.md
🔐 User Roles
Role	Access
Employee	Create & manage travel requests
Manager	Approve employee requests
Finance	Expense verification
Admin	Full system access
⚙️ Setup Instructions
Clone Repository
git clone https://github.com/yourusername/tripsphere.git
Backend Setup
Navigate to backend
cd tripsphere_backend
Configure MySQL

Update:

application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/tripsphere
spring.datasource.username=root
spring.datasource.password=yourpassword
Run Backend
mvn spring-boot:run

Backend runs on:

http://localhost:8080
Frontend Setup
Navigate to frontend
cd tripsphere_frontend
Install dependencies
npm install
Run Angular App
ng serve

Frontend runs on:

http://localhost:4200
🔑 Authentication

The application uses JWT authentication.

Example login response:

{
  "token": "JWT_TOKEN",
  "user": {
    "name": "Employee User",
    "role": "EMPLOYEE"
  }
}

JWT token is automatically attached using Angular HTTP Interceptors.

📡 API Endpoints
Authentication
Method	Endpoint
POST	/auth/login
POST	/auth/register
Travel Requests
Method	Endpoint
GET	/travel-requests
POST	/travel-requests
PUT	/travel-requests/{id}
DELETE	/travel-requests/{id}
📸 Screenshots

Add application screenshots here.

Example:

![Dashboard](screenshots/dashboard.png)
🌟 Future Enhancements
Email notifications
File upload for receipts
Docker deployment
Microservices architecture
Audit logs
Export reports to PDF/Excel
