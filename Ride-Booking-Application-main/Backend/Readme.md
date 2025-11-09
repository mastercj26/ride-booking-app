# User API Documentation

## Endpoints

- `POST /users/register` — Register a new user
- `POST /users/login` — Login with email and password
- `GET /users/profile` — Get the authenticated user's profile
- `POST /users/logout` — Logout the current user

---

## User Registration

### Endpoint

`POST /users/register`

### Description

Registers a new user. Validates input, hashes the password, and returns a JWT token on success.

---

### Request Body

Send as JSON:

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `fullName.firstName`: **required**, string, min 3 chars
- `fullName.lastName`: optional, string, min 3 chars if provided
- `email`: **required**, valid email, min 5 chars
- `password`: **required**, string, min 6 chars

---

### Responses

#### Success

- **201 Created**
- Body:
  ```json
  {
    "token": "<jwt_token>",
    "user": {
      "_id": "<user_id>",
      "fullName": {
        "firstName": "<first_name>",
        "lastName": "<last_name>"
      },
      "email": "<email>",
      "password": "<hashed_password>",
      "socketID": null,
      "__v": 0
    }
  }
  ```

#### Validation Error

- **400 Bad Request**
- Body:
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```

#### Missing Fields

- **400 Bad Request**
- Body:
  ```json
  {
    "message": "All Fields required"
  }
  ```

---

### Example Request

```sh
curl -X POST http://localhost:2000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": { "firstName": "John", "lastName": "Doe" },
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```

### Example Response

#### /users/register

**Status:** 201 Created

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "665f1e2b7c1a2b0012a34567",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "$2b$10$abcdefg1234567890hijklmnopqrs",
    "socketID": null,
    "__v": 0
  }
}
```

---

## User Login

### Endpoint

`POST /users/login`

### Description

Authenticates a user using email and password. Returns a JWT token and user data on success.

---

### Request Body

Send as JSON:

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `email`: **required**, valid email
- `password`: **required**, string, min 6 chars

---

### Responses

#### Success

- **200 OK**
- Body:
  ```json
  {
    "token": "<jwt_token>",
    "user": {
      "_id": "<user_id>",
      "fullName": {
        "firstName": "<first_name>",
        "lastName": "<last_name>"
      },
      "email": "<email>",
      "password": "<hashed_password>",
      "socketID": null,
      "__v": 0
    }
  }
  ```

#### Validation Error

- **400 Bad Request**
- Body:
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```

#### Invalid Credentials

- **401 Unauthorized**
- Body:
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

---

### Example Request

```sh
curl -X POST http://localhost:2000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```

### Example Response

#### /users/login

**Status:** 200 OK

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "665f1e2b7c1a2b0012a34567",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "$2b$10$abcdefg1234567890hijklmnopqrs",
    "socketID": null,
    "__v": 0
  }
}
```

---

## Get User Profile

### Endpoint

`GET /users/profile`

### Description

Returns the authenticated user's profile information. Requires a valid JWT token in the `Authorization` header or as a cookie.

---

### Headers

- `Authorization: Bearer <jwt_token>` (if not using cookies)

---

### Responses

#### Success

- **200 OK**
- Body:
  ```json
  {
    "user": {
      "_id": "<user_id>",
      "fullName": {
        "firstName": "<first_name>",
        "lastName": "<last_name>"
      },
      "email": "<email>",
      "socketID": null,
      "__v": 0
    }
  }
  ```

#### Unauthorized

- **401 Unauthorized**
- Body:
  ```json
  {
    "message": "Unauthorized: No token provided"
  }
  ```

---

### Example Request

```sh
curl -X GET http://localhost:2000/users/profile \
  -H "Authorization: Bearer <jwt_token>"
```

---

## User Logout

### Endpoint

`GET /users/logout`

### Description

Logs out the current user by invalidating the JWT token (adds it to a blacklist). Requires authentication.

---

### Headers

- `Authorization: Bearer <jwt_token>` (if not using cookies)

---

### Responses

#### Success

- **200 OK**
- Body:
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

#### Unauthorized

- **401 Unauthorized**
- Body:
  ```json
  {
    "message": "Unauthorized: No token provided"
  }
  ```

---

### Example Request

```sh
curl -X POST http://localhost:2000/users/logout \
  -H "Authorization: Bearer <jwt_token>"
```


# Caption API Documentation

### Endpoint

- `POST /caption/register` — Register a new caption

### Description

Registers a new caption (driver) with vehicle details. Validates input, hashes the password, and returns a JWT token on success.

---

### Request Body

Send as JSON:

```json
{
  "fullName": {
    "firstName": "Alice",
    "lastName": "Smith"
  },
  "email": "alice.smith@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "vehicleNumber": "AB12CD3456",
    "vehicleType": "car"
  }
}
```

#### Field Requirements

- `fullName.firstName`: **required**, string, min 3 chars
- `fullName.lastName`: optional, string, min 3 chars if provided
- `email`: **required**, valid email, min 5 chars
- `password`: **required**, string, min 6 chars
- `vehicle.color`: **required**, string, min 3 chars
- `vehicle.vehicleNumber`: **required**, string, min 10 chars
- `vehicle.vehicleType`: **required**, one of `"car"`, `"bike"`, `"bus"`

---

### Responses

#### Success

- **201 Created**
- Body:
  ```json
  {
    "token": "<jwt_token>",
    "caption": {
      "_id": "<caption_id>",
      "fullName": {
        "firstName": "Alice",
        "lastName": "Smith"
      },
      "email": "alice.smith@example.com",
      "password": "<hashed_password>",
      "socketID": null,
      "status": "inactive",
      "vehicle": {
        "color": "Red",
        "vehicleNumber": "AB12CD3456",
        "vehicleType": "car"
      },
      "location": {
        "latitude": null,
        "longitude": null
      },
      "__v": 0
    }
  }
  ```

#### Validation Error

- **400 Bad Request**
- Body:
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```

#### Email Already Exists

- **400 Bad Request**
- Body:
  ```json
  {
    "message": "Caption already exists"
  }
  ```

---

### Example Request

```sh
curl -X POST http://localhost:2000/caption/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": { "firstName": "Alice", "lastName": "Smith" },
    "email": "alice.smith@example.com",
    "password": "yourpassword",
    "vehicle": {
      "color": "Red",
      "vehicleNumber": "AB12CD3456",
      "vehicleType": "car"
    }
  }'
```

### Example Success Response

**Status:** 201 Created

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "caption": {
    "_id": "665f1e2b7c1a2b0012a34567",
    "fullName": {
      "firstName": "Alice",
      "lastName": "Smith"
    },
    "email": "alice.smith@example.com",
    "password": "$2b$10$abcdefg1234567890hijklmnopqrs",
    "socketID": null,
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "vehicleNumber": "AB12CD3456",
      "vehicleType": "car"
    },
    "location": {
      "latitude": null,
      "longitude": null
    },
    "__v": 0
  }
}