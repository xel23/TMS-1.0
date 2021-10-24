# Getting start
## Start server
1. run `npm run server`

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
### Task entity
```
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
    updatedBy: {
        userId: string,
        name: string
    },
    verifiedBy: string | null
```

### Get task
Endpoint: `/api/tasks/:taskId` \
Method: `GET` \
Headers:
```
{
    Authorization: [AuthToken]
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
    Authorization: [AuthToken]
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
    Authorization: [AuthToken]
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
    task: Task
}
```

### Delete task
Endpoint: `/api/tasks/:id` \
Method: `DELETE` \
Headers:
```
{
    Authorization: [AuthToken]
}
```
Response:
```
{
    task: Task
}
```

### Update task
Endpoint: `/api/tasks/:id` \
Method: `POST` \
Headers:
```
{
    Authorization: [AuthToken]
}
```
Body:
```
{
    summary: string | null,
    description: string | null,
    assignee: string | null,
    type: string | null,
    priority: string | null,
    subsystem: string | null,
    status: string | null,
    verifiedBy: string | null
}
```
Response:
```
{
    task: Task
}
```


## User
### Grant role
Endpoint: `/api/users/:userId/grant-role` \
Method: `POST` \
Headers:
```
{
    Authorization: [AuthToken]
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

## Comments
### Comment entity
```
{
    taskId: string,
    text: string,
    author: string,
    created: Date,
    edited: boolean | null
}
```

### Get task comments
Endpoint: `/api/comments/:taskId` \
Method: `GET` \
Headers:
```
{
    Authorization: [AuthToken]
}
```
Response:
```
{
    comments: [Comment]
}
```

### Create comment
Endpoint: `/api/comments/` \
Method: `POST` \
Headers:
```
{
    Authorization: [AuthToken]
}
```
Body:
```
{
    taskId: string,
    text: string
}
```
Response:
```
{
    Comment
}
```

### Update comment
Endpoint: `/api/comments/:id` \
Method: `POST` \
Headers:
```
{
    Authorization: [AuthToken]
}
```
Body:
```
{
    text: string
}
```
Response:
```
{
    Comment
}
```

### Delete comment
Endpoint: `/api/comments/:id` \
Method: `DELETE` \
Headers:
```
{
    Authorization: [AuthToken]
}
```
Response:
```
{
    Comment
}
```

## History
### History entity
```
{
    taskId: string,
    author: string,
    timestamp: Date,
    added: [AddedEntity],
    removed: [RemovedEntity]
}
```

### Added/Removed entity
```
{
    category: string,
    value: Status | Priority | Assignee | Type | Description | Summary | Subsystem | VerifiedBy
}
```

### Get history for task
Endpoint: `/api/history/:taskId` \
Method: `GET` \
Headers:
```
{
    Authorization: [AuthToken]
}
```
Response:
```
{
    History
}
```
