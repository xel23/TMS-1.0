import { TaskProps } from '../../../components/Task/Task';

export const tasks: TaskProps[] = [
    {
        id: "615746f75cd55d7e19783373",
        summary: "1 summary",
        description: "1 description",
        author: {
            name: "user1",
            userId: "615361d274ac2760893f794b",
        },
        assignee: null,
        type: "Feature",
        priority: "Normal",
        subsystem: null,
        status: "Open",
        created: new Date("2021-10-01T17:33:14.624+00:00"),
        updated: null,
        verifiedBy: null,
    },
    {
        id: "615747225cd55d7e19783379",
        summary: "2 summary",
        description: "2 description",
        author: {
            name: "user1",
            userId: "615361d274ac2760893f794b",
        },
        assignee: null,
        type: "Bug",
        priority: "Normal",
        subsystem: null,
        status: "Open",
        created: new Date("2021-10-01T17:33:14.624+00:00"),
        updated: null,
        verifiedBy: null,
    },
];
