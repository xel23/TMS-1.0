# API Schema
## Auth
### Registration
Endpoint: `/api/auth/register` \
Method: `POST` \
Body: 
```json
{
    email: string,
    password: string,
    name: string
}
```
Response:
```json
{
    accessToken: string, 
    userId: string, 
    name: string, 
    role: Role, 
    message: string
}
```

### Login
Endpoint: `/api/auth/login` \
Method: `POST` \
Body:
```json
{
    email: string,
    password: string
}
```
Response:
```json
{
    accessToken: string,
    userId: string,
    name: string,
    role: Role
}
```

## Task
### Get task
Endpoint: `/api/tasks/:taskId` \
Method: `GET` \
Headers:
```json
{
    Autorization: [AuthToken]
}
```
Response:
```json
{
    task: Task
}
```

### Get all tasks
Endpoint: `/api/tasks/` \
Method: `GET` \
Headers:
```json
{
    Autorization: [AuthToken]
}
```
Response:
```json
{
    tasks: [Task]
}
```

### Create task
Endpoint: `/api/tasks/` \
Method: `POST` \
Headers:
```json
{
    Autorization: [AuthToken]
}
```
Body:
```json
{
    summary: string,
    description: string | null,
    assignee: string | null,
    type: string,
    priority: string,
    subsystem: string | null,
    status: string
}
```
Response:
```json
{
    summary: string,
    description: string | null,
    author: {
        userId: string,
        name: string
    },
    assignee: string | null,
    type: string,
    priority: string,
    subsystem: string | null,
    status: string,
    created: Date,
    updated: Date | null,
    verifiedBy: string | null
}
```


## User
### Grant role
Endpoint: `/api/users/:userId/grant-role` \
Method: `POST` \
Headers:
```json
{
    Autorization: [AuthToken]
}
```
Body:
```json
{
    role: string
}
```
Response:
```json
{
    message: string
}
```
