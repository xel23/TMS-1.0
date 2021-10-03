import React from 'react';

import Task, { TaskItem } from '../Task/Task';

interface TaskListProps {
    tasks: TaskItem[];
    deleteTask: (taskId: string) => void;
}

const TaskList: React.FunctionComponent<TaskListProps> = ({ tasks, deleteTask }) => {
    return (
        <>
            {tasks.map((task) => (
                <Task key={task._id} task={{...task}} deleteTask={(taskId) => deleteTask(taskId)} />
            ))}
        </>
    )
};

export default TaskList;
