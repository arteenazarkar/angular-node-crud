module.exports = (sequelize, Sequelize) => {
  var Product = sequelize.define("product",
    {
      productId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      productName: {
        type: Sequelize.STRING
      },

      categoryId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'category',
        //   key: 'categoryId'
        // },
      }
    }, {
    timestamps: false
  })

  return Product;
};
