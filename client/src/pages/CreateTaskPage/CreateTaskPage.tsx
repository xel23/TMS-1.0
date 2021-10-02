import React from 'react';

import CreateTask from '../../components/CreateTask/CreateTask';

const CreateTaskPage: React.FunctionComponent = () => {
    return <CreateTask
        createTask={(summary, description, assignee, type, priority, subsystem, status) => console.log(summary, description, assignee, type, priority, subsystem, status)}
    />;
};

export default CreateTaskPage;
