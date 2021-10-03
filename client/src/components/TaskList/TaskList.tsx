import React, {useContext} from 'react';

import Task, { TaskItem } from '../Task/Task';
import { DataContext } from '../../context';
import { deleteTask } from '../../requests';

interface TaskListProps {
    tasks: TaskItem[];
}

const TaskList: React.FunctionComponent<TaskListProps> = ({ tasks }) => {
    const { token } = useContext(DataContext);

    return (
        <>
            {tasks.map((task) => (
                <Task key={task._id} task={{...task}} deleteTask={(taskId) => deleteTask(taskId, token)} />
            ))}
        </>
    )
};

export default TaskList;
