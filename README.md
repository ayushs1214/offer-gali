# Deal Aggregator API

A RESTful API for aggregating and managing deals across multiple retailers.

## Setup

1. Clone the repository
    ```bash
   git clone 
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `JWT_SECRET`: Secret key for JWT token generation

## API Endpoints

### Authentication

#### Register User
- **POST** `/api/users/register`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```
- **Response:** User object with auth token

#### Login
- **POST** `/api/users/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:** User object with session token

#### Get User Profile
- **GET** `/api/users/profile`
- **Auth:** Required
- **Response:** User profile data

### Retailers

#### Get All Retailers
- **GET** `/api/retailers`
- **Auth:** Required
- **Response:** Array of retailers

#### Get Retailer by ID
- **GET** `/api/retailers/:id`
- **Auth:** Required
- **Response:** Retailer object with associated deals

### Deals

#### Get All Deals
- **GET** `/api/deals`
- **Auth:** Required
- **Response:** Array of deals with retailer information

#### Get Deal by ID
- **GET** `/api/deals/:id`
- **Auth:** Required
- **Response:** Deal object with retailer details

### Notifications

#### Get User Notifications
- **GET** `/api/notifications`
- **Auth:** Required
- **Response:** Array of user's notifications with deal information

#### Mark Notification as Read
- **PATCH** `/api/notifications/:id/read`
- **Auth:** Required
- **Response:** Updated notification object

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Response Formats

### Success Response
```json
{
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "error": "Error message"
}
```

## Development

- Run tests: `npm test`
- Start development server: `npm run dev`
- Start production server: `npm start`

## Database Schema

### Users/Profiles
- `id`: UUID (Primary Key)
- `email`: Text (Unique)
- `name`: Text
- `created_at`: Timestamp

### Retailers
- `id`: UUID (Primary Key)
- `name`: Text
- `website`: Text
- `created_at`: Timestamp

### Deals
- `id`: UUID (Primary Key)
- `retailer_id`: UUID (Foreign Key)
- `title`: Text
- `description`: Text
- `price`: Numeric
- `original_price`: Numeric
- `url`: Text
- `expires_at`: Timestamp
- `created_at`: Timestamp

### Notifications
- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key)
- `deal_id`: UUID (Foreign Key)
- `type`: Text
- `read`: Boolean
- `created_at`: Timestamp#   o f f e r - g a l i 
 
 
