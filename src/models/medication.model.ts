// ODM sequelize model definition for Medication
import db from "../config/connectdb.js";
import { DataTypes } from "sequelize";
import CategoryModel from "./category.model.js";

const MedicationModel = db.define(
  "Medication",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    presentation: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    potency: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    drug: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    laboratory: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    coverage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    units: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    troquel: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CategoryModel,
        key: "id",
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    modelName: "Medication",
    tableName: "medications",
    timestamps: true,
  }
);
export default MedicationModel;
