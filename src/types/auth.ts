export type Role = 'admin' | 'user';

export interface User {
    id: number;
    name: string;
    username: string;
    role: Role;
}