import { UserInterface } from "./user-interface";

export interface AuthInterface {
    email: string;
    password: string;
}

export interface AuthResponseInterface {
    token: string;
    user: UserInterface;
}

export interface TwoFactorRequiredResponseInterface {
    message: string;
    requires_2fa: true;
    email: string;
}

export interface TwoFactorVerifyInterface {
    email: string;
    code: string;
}

export type LoginResponseInterface =
    | AuthResponseInterface
    | TwoFactorRequiredResponseInterface;