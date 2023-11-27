import sequelize from "../config/database";
import { DataTypes, Model, Optional } from "sequelize";
import ProductCategory from "./ProductCategory";
import User from "./User";

interface ProductAttributes {
  id: number;
  uuid: string;
  plu: string;
  name: string;
  categoryId: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ProductAttributesInput
  extends Optional<ProductAttributes, "id" | "uuid"> {}
export interface ProductAttributesOuput extends Required<ProductAttributes> {}

class Product
  extends Model<ProductAttributes, ProductAttributesInput>
  implements ProductAttributes
{
  public id!: number;
  public uuid!: string;
  public plu!: string;
  public name!: string;
  public categoryId!: number;
  public userId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    plu: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 25],
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      references: {
        model: ProductCategory,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    sequelize,
    modelName: "Product",
    tableName: "products",
  }
);

User.hasMany(Product, { foreignKey: "userId" });
Product.belongsTo(User, { foreignKey: "userId" });

ProductCategory.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(ProductCategory, { foreignKey: "categoryId" });

export default Product;
