# API Schema
## Auth
### Registration
Endpoint: `/api/auth/register` \
Method: `POST` \
Body: 
```
{
    email: [userEmail],
    password: [userPassword],
    name: [userName]
}
```
Response:
```
{
    accessToken: [token], 
    userId: [userId], 
    name: [userName], 
    role: [userRole], 
    message: [responseMessage]
}
```

### Login
Endpoint: `/api/auth/login` \
Method: `POST` \
Body:
```
{
    email: [userEmail],
    password: [userPassword]
}
```
Response:
```
{
    accessToken: [token],
    userId: [userId],
    name: [userName],
    role: [userRole]
}
```

## Task
### Get task
Endpoint: `/api/task/:taskId` \
Method: `GET` \
Headers:
```
{
    Autorization: [AuthToken]
}
```
Response:
```
{
    [Task]
}
```


## User
### Grant role
Endpoint: `/api/user/:userId/grant-role` \
Method: `POST` \
Headers:
```
{
    Autorization: [AuthToken]
}
```
Body:
```
{
    role: [roleName]
}
```
Response:
```
{
    message: [responseMessage]
}
```
