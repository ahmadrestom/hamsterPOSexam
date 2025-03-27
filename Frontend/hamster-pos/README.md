# E-Commerce Application

## Project Overview
This is a fullsstack e-commerce application built using **Next.js** for the frontend and **Spring Boot** for the backend. The application provides **authentication, product and category management, and a shopping cart feature**.

## Architecture
- **Frontend**: Next.js, Tailwind CSS, Material-UI
- **Backend**: Spring Boot, H2(in memory), JWT Authentication
- **Database**: H2 for persisting data

## Features
-  **User authentication** (JWT-based login and registration)
-  **Product management** (CRUD operations)
-  **Category management** (CRUD operations)
-  **Shopping cart functionality**
-  **Role-based access** (Admin/User)
-  **Drag-and-drop product reordering**

---

## Setup and Installation

### Prerequisites
Ensure you have the following installed:
- 🔹 **Node.js**
- 🔹 **Java**
- 🔹 **Maven**

### Backend Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/ahmadrestom/hamsterPOSexam
   cd ecommerce-app/Backend
   ```
2. **Configure the database in `application.properties`:**
   ```properties
   spring.application.name=E-commerceBackend
   spring.datasource.driver-class-name=org.h2.Driver
   spring.datasource.username=sa
   spring.datasource.password=
   spring.h2.console.enabled=true
   spring.h2.console.path=/h2-console
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.h2.console.settings.web-allow-others=true
   spring.datasource.url=jdbc:h2:~/test;AUTO_SERVER=TRUE
   ```
3. **Build and run the backend:**
   mvn clean install
   mvn spring-boot:run
4. **The backend API will be available at:** `http://localhost:8080`

### Frontend Setup
1. **Navigate to the frontend directory:**
   git clone https://github.com/ahmadrestom/hamsterPOSexam
   cd Frontend/hamster-pos
2. **Install dependencies:**
   npm install
3. **Run the development server:**
   npm run dev
4. **Open:** `http://localhost:3000` in browser

---

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` → Register a new user
- `POST /api/v1/auth/login` → Login and obtain a JWT token

### API Secure and Permitted
- `api/v1` → permitted
- `api/v2` → authenticated

### Products
- `GET /api/v2/products/getAllProducts` → Fetch all products
- `POST /api/v2/products/createProduct` → Create a new product (give the request body)
- `PUT /api/v2/products/updateProduct/{id}` → Update product details
- `DELETE /api/v2/productsdeleteProduct/{id}` → Delete a product

### Categories
- `GET /api/v2/categories/getAllCategories` → Fetch all categories
- `POST /api/v2/categories/addCategory` → Create a new category
- `PUT /api/v2/categories/updateCategory/{id}` → Update category
- `DELETE /api/v2/categories/deleteCategory/{id}` → Delete a new category

---

## Notes and Assumptions
-  To register as an admin, you must have a specific code, this code is shared among the owner of the app and all the admins, and is found in the application.properties in the backend.
-  Users **must be authenticated** to access protected routes.
-  **Admin users** have full access to product and category management.
-  **Categories should not have duplicate names**.
-  A **product must be assigned** to an existing category.
-  JWT tokens **expire after a set time** (configurable in backend).

---

## Troubleshooting
-  **If CORS issues occur:** Check the Spring Boot CORS configuration.
-  **If frontend API calls fail:** Verify that the backend is running at `http://localhost:8080`.
