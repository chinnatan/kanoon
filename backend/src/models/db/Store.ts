import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database";

interface StoreInstance extends Model {
  id: number;
  name: string;
}

const Store = sequelize.define<StoreInstance>(
  "stores",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "stores",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Store;
