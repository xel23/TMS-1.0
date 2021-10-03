import React from 'react';

import Task, { TaskProps } from '../Task/Task';

interface TaskListProps {
    tasks: TaskProps[];
}

const TaskList: React.FunctionComponent<TaskListProps> = ({ tasks }) => {
    return (
        <>
            {tasks.map((task) => (
                <Task key={task._id} {...task} />
            ))}
        </>
    )
};

export default TaskList;
