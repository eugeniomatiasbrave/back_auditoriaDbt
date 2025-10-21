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

export interface IMedication {
  id: number;
  name: string;
  presentation: string;
  potency: string;
  drug: string;
  laboratory: string;
  coverage: number;
  units: number;
  troquel: string;
  categoryId: number;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
