type Link = {
    linkTo: string;
    linkName: string;
}

export const LINKS_UNAUTHORIZED_USER: Link[] = [
    { linkTo: '/register', linkName: 'Register' },
    { linkTo: '/login', linkName: 'Login' }
];

export const LINKS_AUTHORIZED_USER: Link[] = [
    { linkTo: '/profile', linkName: 'User Profile' },
    { linkTo: '/tasks', linkName: 'Task List' },
];

export const LINKS_ADMIN_USER: Link[] = [
    { linkTo: '/management', linkName: 'User Management' }
];
