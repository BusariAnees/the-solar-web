Online Shop Website

This is a fully functional online shop website built with the MERN stack technologies and other modern tools for a secure, user-friendly e-commerce experience. The project includes features like user authentication, product management, secure payments with Stripe, and image management with Multer.

![Homepage of website](./assets/)


Features

	•	Product Management: Add, update, and delete products from the catalog.
	•	Secure Authentication: User registration and login functionality with encrypted passwords using bcrypt.
	•	Image Upload: Handles image uploads and storage using Multer.
	•	Shopping Cart: Add and update items in a cart.
	•	Secure Payments: Integrated Stripe for processing payments.
	•	CSRF Protection: Secures forms with csurf middleware to prevent Cross-Site Request Forgery attacks.
	•	Session Management: Uses Express Sessions for maintaining user sessions.
	•	Database: Uses MongoDB for storing user data, product information, and orders.

Technologies Used

Frontend:

	•	HTML: Structure of the website.
	•	CSS: Styling for a modern, responsive user interface.
	•	JavaScript: Adds interactivity, including dynamic updates for cart and checkout pages.

Backend:

	•	Node.js: Backend runtime for building the server-side logic.
	•	Express.js: Web framework for routing and middleware.
	•	Multer: Middleware for handling multipart/form-data for image uploads.
	•	Stripe API: Handles secure payment processing.
	•	Bcrypt: Password hashing for secure user authentication.
	•	csurf: Middleware for CSRF protection.
	•	Express Sessions: Manages user sessions.

Database:

	•	MongoDB: A NoSQL database for storing and managing product, user, and order data.

Setup Instructions

1. Clone the Repository

git clone https://github.com/your-username/online-shop.git
cd online-shop

2. Install Dependencies

npm install

3. Set Up Environment Variables

Create a .env file in the root directory and add the following:

MONGODB_URI=your-mongodb-connection-string
SESSION_SECRET=your-session-secret
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLIC_KEY=your-stripe-public-key

4. Run the Application

npm start

5. Access the Application

The application will run on http://localhost:3000.

Key Functionalities

1. User Authentication

	•	Registration and login with hashed passwords using bcrypt.
	•	Sessions managed with Express Sessions.

2. Product Management

	•	Add, update, and delete products via an admin panel.
	•	Images uploaded with Multer.

3. Shopping Cart and Checkout

	•	Users can add products to the cart, update quantities, and proceed to checkout.
	•	Secure payment processing with Stripe API.

4. CSRF Protection

	•	Forms secured with csurf to prevent CSRF attacks.

Stripe Integration

Stripe API is used to process payments securely:

	1.	Add your Stripe Secret Key and Public Key to the .env file.
	2.	On checkout, the Stripe API processes payments and confirms orders.
