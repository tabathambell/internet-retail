const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product",
        id: "id"
      }
      // REFERENCES THE PRODUCT MODEL'S ID
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tag",
        id: "id"
      }
      // REFERENCES THE TAG MODEL'S ID
    },
  }, 
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
