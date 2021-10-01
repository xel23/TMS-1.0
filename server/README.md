# API Schema
## Auth
### Registration
Endpoint: `/api/auth/register` \
Method: `POST` \
Body: 
```
{
    email: string,
    password: string,
    name: string
}
```
Response:
```
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
```
{
    email: string,
    password: string
}
```
Response:
```
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
```
{
    Autorization: [AuthToken]
}
```
Response:
```
{
    task: Task
}
```

### Get all tasks
Endpoint: `/api/tasks/` \
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
    tasks: [Task]
}
```

### Create task
Endpoint: `/api/tasks/` \
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
```
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
```
{
    Autorization: [AuthToken]
}
```
Body:
```
{
    role: string
}
```
Response:
```
{
    message: string
}
```
