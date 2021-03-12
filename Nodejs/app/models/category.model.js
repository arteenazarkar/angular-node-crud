module.exports = (sequelize, Sequelize) => {
  var Category = sequelize.define("category",
    {
      categoryId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,


      },
      categoryName: {
        type: Sequelize.STRING
      },

    }, {
    timestamps: false
  })
  return Category;
};

