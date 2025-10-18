import db from "../config/connectdb.js";
import { DataTypes } from "sequelize";

const CategoryModel = db.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    modelName: "Category",
    tableName: "categories",
    timestamps: true,
  }
);
export default CategoryModel;
