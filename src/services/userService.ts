import { UserModel } from "../models/user.model.js";


export class UserService {
  // Obtener todos los usuarios
  async getAll() {
	return await UserModel.findAll();
  }	

  // Obtener un usuario por ID
  async getById(id: string) {
	return await UserModel.findByPk(id);
  }
  
  // Crear un nuevo usuario
  async create(userData: any) {
	return await UserModel.create(userData);
  }

  // Actualizar un usuario existente
  async update(id: string, userData: any) {
	const user = await UserModel.findByPk(id);
	if (user) {
	  return await user.update(userData);
	}
	return null;
  }
  
  // Eliminar un usuario	
  async delete(id: string) {
	const user = await UserModel.findByPk(id);
	if (user) {
	  await user.destroy();
	  return true;
	}
	return false;
  }
}