type Link = {
    linkTo: string;
    linkName: string;
}

export const LINKS_UNAUTHORIZED_USER: Link[] = [
    { linkTo: '/register', linkName: 'Register' },
    { linkTo: '/login', linkName: 'Login' }
];

export const LINKS_AUTHORIZED_USER: Link[] = [
    { linkTo: '/dashboard', linkName: 'Dashboard' },
    { linkTo: '/tasks', linkName: 'Task List' },
    { linkTo: '/archive', linkName: 'Archive' }
];
