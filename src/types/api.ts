

export interface IUser {
  id: number; // Opcional porque se autogenera
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}