# Authentication System Setup

## Overview
This project now has a complete authentication system that connects the React frontend to the Node.js backend.

## Files Created/Modified

### 1. API Service (`src/services/api.js`)
- Handles all HTTP requests to the backend
- Manages authentication tokens
- Provides methods for login, register, and user profile

### 2. Authentication Context (`src/context/AuthContext.jsx`)
- Manages global authentication state
- Provides login, register, and logout functions
- Handles token storage and user data

### 3. Updated Components
- **Login.jsx**: Now handles form submission to backend
- **Navbar.jsx**: Shows user info when logged in, logout button
- **App.jsx**: Wrapped with AuthProvider

## Backend Endpoints Used

### Authentication Routes (`/auth`)
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### User Routes (`/user`)
- `GET /user/profile` - Get user profile (protected)

## How to Use

### 1. Start the Backend
```bash
cd backend
npm start
```

### 2. Start the Frontend
```bash
cd frontend
npm run dev
```

### 3. Update API Base URL
In `src/services/api.js`, update the `API_BASE_URL` to match your backend port:
```javascript
const API_BASE_URL = 'http://localhost:5000'; // Change port if needed
```

## Features

### Login
- Email/Password authentication
- Form validation
- Error handling
- Loading states
- Automatic redirect after successful login

### Registration
- Full name, username, email, password
- Admin code support (optional)
- Password confirmation
- Form validation
- Error handling

### User Interface
- Shows user name and admin status in navbar
- Logout functionality
- Responsive design
- Loading indicators

### Security
- JWT token storage in localStorage
- Automatic token inclusion in API requests
- Token verification on app start

## Environment Variables (Backend)
Make sure your backend has these environment variables:
```env
PORT=5000
SECRET_KEY=your_jwt_secret_key
MASTER_ADMIN_CODE=your_admin_code
MONGODB_URI=your_mongodb_connection_string
```

## Testing the System

1. **Register a new user:**
   - Click "Login / SignUp" in navbar
   - Switch to "Sign up" mode
   - Fill in all required fields
   - Submit the form

2. **Login with existing user:**
   - Use email as username
   - Enter password
   - Submit the form

3. **Admin Registration:**
   - During registration, enter the admin code
   - User will be marked as admin

4. **Logout:**
   - Click the logout button in navbar
   - User will be logged out and redirected

## Error Handling
- Form validation errors
- Backend API errors
- Network errors
- Token expiration handling

## Next Steps
- Add protected routes
- Implement password reset
- Add email verification
- Enhance admin features
- Add user profile management 