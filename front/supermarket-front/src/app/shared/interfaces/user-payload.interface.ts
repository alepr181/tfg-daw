export interface UserPayloadCreateInterface {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    account_status: 'active' | 'inactive';
}

export interface UserPayloadUpdateInterface {
    id: number;
    name: string;
    email: string;
    password?: string; // Sólo se lee en caso de actualizar la contraseña.
    role: 'admin' | 'user';
    account_status: 'active' | 'inactive';
}