#API Schema
## Auth
### Registration
Endpoint: `/api/auth/register` \
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
    role: [userRole], 
    message: [responseMessage]
}
```
