# Authentication Connection Test Guide

## Prerequisites
1. Backend server running on port 5000 (or update API_BASE_URL in api.js)
2. Frontend running on port 5173 (or your Vite default)
3. MongoDB connected to backend

## Test Steps

### 1. Test Registration
1. Open browser to frontend
2. Click "Login / SignUp" in navbar
3. Switch to "Sign up" mode
4. Fill in the form:
   - **Name**: Test User
   - **Username**: testuser123
   - **Email**: test@example.com
   - **Password**: password123
   - **Confirm Password**: password123
   - **Admin Code**: (leave empty or use your admin code)
5. Click "Create Account"
6. **Expected Result**: Success message, redirected to homepage, user info shown in navbar

### 2. Test Login
1. Click "Login / SignUp" in navbar
2. Switch to "Sign in" mode
3. Fill in the form:
   - **Username**: testuser123 (use the username you registered with)
   - **Password**: password123
4. Click "Sign In"
5. **Expected Result**: Success message, redirected to homepage, user info shown in navbar

### 3. Test Admin Registration
1. Follow registration steps but include admin code
2. **Expected Result**: User should be marked as admin in navbar

### 4. Test Logout
1. Click logout button in navbar
2. **Expected Result**: User logged out, login button visible again

### 5. Test Error Handling
1. Try logging in with wrong credentials
2. Try registering with existing username
3. **Expected Result**: Error messages displayed properly

## Backend API Endpoints Being Used

### POST /auth/register
**Request Body:**
```json
{
  "name": "Test User",
  "username": "testuser123",
  "email": "test@example.com",
  "password": "password123",
  "adminKey": "optional_admin_code"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "Test User",
    "username": "testuser123",
    "email": "test@example.com",
    "isAdmin": false
  },
  "token": "jwt_token_here",
  "message": "User registered successfully"
}
```

### POST /auth/login
**Request Body:**
```json
{
  "username": "testuser123",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "Test User",
    "username": "testuser123",
    "email": "test@example.com",
    "isAdmin": false
  },
  "token": "jwt_token_here",
  "message": "User Logged In Successfully"
}
```

## Troubleshooting

### Common Issues:

1. **CORS Error**: Make sure backend has CORS enabled
2. **Port Mismatch**: Update API_BASE_URL in api.js if backend runs on different port
3. **MongoDB Connection**: Ensure backend can connect to MongoDB
4. **Environment Variables**: Check that SECRET_KEY and MASTER_ADMIN_CODE are set in backend

### Debug Steps:
1. Check browser console for errors
2. Check backend console for errors
3. Verify API endpoints are accessible via Postman/curl
4. Check network tab in browser dev tools for request/response details 