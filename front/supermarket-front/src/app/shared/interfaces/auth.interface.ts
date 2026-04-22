import { UserInterface } from "./user-interface";

export interface AuthInterface {
    email: string;
    password: string;
}

export interface AuthResponseInterface {
    token: string;
    user: UserInterface;
}