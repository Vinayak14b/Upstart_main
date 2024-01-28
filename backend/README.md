# 21_Crawlers_backend

This is backend application for Upstart created using Node.Js

## Tools used :
- Express
- Jsonwebtoken for Authentication and Authorization
- MongoDB Database
- Bcryptjs for passwords protection

## API Reference
#### Main URl 
```http
  https://crawler-backend.vercel.app/
```

#### Login Endpoint

```http
  POST /api/auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | *Required* |
| `password` | `string` | *Required* |


#### ForgotPassword :

```http
  PUT /api/auth/forgotPassword
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | *Required* |
| `password` | `string` | *Required* |
| `confirmPassword` | `string` | *Required* |


### Create Startup User :

```http
  POST /auth/createStartupUser
```

```
header details => Authentication : <Token>
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | *Required* |
| `phone` | `string` | *Required* |
| `city` | `string` | *Required* |
| `email` | `string` | *Required* |
| `password` | `string` | *Required* |
| `userType` | `string` | *Required* |

### Fetch Applications :

```http
  GET /api/fetchApplications
```

```
header details => Authentication : <Token>
```

### Send Application :
```http
  POST /api/sendApplication
```

```
header details => Authentication : <Token>
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | *Required* |
| `email` | `string` | *Required* |
| `contact` | `string` | *Required* |
| `city` | `string` | *Required* |
| `state` | `string` | *Required* |
| `startupName` | `string` | *Required* |
| `problemSolving` | `string` | *Required* |
| `startupDesc` | `string` | *Required* |
| `approvalStatus` | `string` | *Not Required* |

### Send Fund Application :
```http
  POST /api/sendFundApplication
```

```
header details => Authentication : <Token>
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | *Required* |
| `phone` | `string` | *Required* |
| `contact` | `string` | *Required* |
| `startupName` | `string` | *Required* |
| `fundsRequired` | `string` | *Required* |
| `reason` | `string` | *Required* |

### Update ApprovalStatus :
```http
  PUT /api/updateApprovalStatus
```

```
header details => Authentication : <Token>
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | *Required* |
| `approvalStatus` | `string` | *Required* |

### Find FundRequest :
```http
  POST /api/findFundRequest
```

```
header details => Authentication : <Token>
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | *Required* |

### Find User :
```http
  POST /api/findUser
```

```
header details => Authentication : <Token>
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | *Required* |