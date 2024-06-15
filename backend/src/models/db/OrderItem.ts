import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database";
import User from "./User";
import Order from "./Order";
import Product from "./Product";

interface OrderItemInstance extends Model {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}

const OrderItem = sequelize.define<OrderItemInstance>(
  "order_items",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Order,
        key: "id",
      },
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
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
    tableName: "order_items",
    timestamps: false,
  }
);

export default OrderItem;
