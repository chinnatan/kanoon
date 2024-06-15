import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database";
import Product from "./Product";

interface StockHistoryInstance extends Model {
  id: number;
  product_id: number;
  quantity: number;
}

const StockHistory = sequelize.define<StockHistoryInstance>(
  "stock_history",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
    tableName: "stock_history",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default StockHistory;
