import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database";
import User from "./User";

interface OrderInstance extends Model {
  id: number;
  user_id: number;
  total_price: number;
}

const Order = sequelize.define<OrderInstance>(
  "orders",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "orders",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Order;
