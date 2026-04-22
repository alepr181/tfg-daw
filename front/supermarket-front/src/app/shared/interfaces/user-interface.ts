export interface UserInterface {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  account_status: 'active' | 'inactive'; // o string si no lo tienes cerrado
}