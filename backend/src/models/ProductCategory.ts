import sequelize from "../config/database";
import { DataTypes, Model, Optional } from "sequelize";
import User from "./User";
import Product from "./Product";

interface ProductCategoryAttributes {
  id: number;
  uuid: string;
  name: string;
  active: boolean;
  userId: number;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ProductCategoryInput
  extends Optional<ProductCategoryAttributes, "id" | "uuid"> {}
export interface ProductCategoryOuput
  extends Required<ProductCategoryAttributes> {}

class ProductCategory
  extends Model<ProductCategoryAttributes, ProductCategoryInput>
  implements ProductCategoryAttributes
{
  public id!: number;
  public uuid!: string;
  public name!: string;
  public active!: boolean;
  public userId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

ProductCategory.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate: {
        notEmpty: true,
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
    modelName: "category",
    tableName: "product_categories",
  }
);

User.hasMany(ProductCategory, { foreignKey: "userId" });
ProductCategory.belongsTo(User, { foreignKey: "userId" });

export default ProductCategory;
