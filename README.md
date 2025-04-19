LOG IN

Email:Admin
password:password

i have just created the requirement in frontend to connect with the backend need some more time.

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing jewellery products with image uploads, categories, purchase dates, and secure user authentication using JWT. Built with Vite, Bootstrap, MUI, and Multer.

 Features
 User Authentication (Register/Login) with JWT

Add, Edit, View, and Delete Jewellery Products

Image Upload and Local Storage (Multer)

 Product Details:

Product Name

Price

Category (with Autocomplete)

Purchase Date (Date Picker)

Image Upload

Product List View with Sorting & Filtering

Responsive, Modern UI using Bootstrap + MUI

RESTful API built with Express.js and MongoDB



Frontend:
React.js (Vite)

Bootstrap

MUI (Material-UI)

Axios

React Router DOM

JWT Decode

Backend:
Node.js

Express.js

MongoDB (with Mongoose)

Multer (Image Upload)

JSON Web Tokens (JWT)

bcrypt (Password Hashing)

CORS


Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/jewellery-product-management.git
cd jewellery-product-management

Backend Setup
bash
Copy
Edit
cd server
npm install
Create a .env file:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Start the server:

bash
Copy
Edit
npm run dev

🖥️ Frontend Setup
bash
Copy
Edit
cd client
npm install
npm run dev

Auth
POST /api/auth/register — Register User

POST /api/auth/login — Login User

Products
GET /api/products — Get All Products

GET /api/products/:id — Get Product by ID

POST /api/products — Add New Product

PUT /api/products/:id — Update Product

DELETE /api/products/:id — Delete Product


Future Improvements
Cloud image storage integration (e.g., Cloudinary)

Advanced product filtering and searching

Role-based access control (Admin/User)

Pagination for large product lists

Product reviews and ratings

