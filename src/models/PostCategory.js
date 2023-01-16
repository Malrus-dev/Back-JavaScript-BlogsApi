const PostCategoryModel = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    tableName: 'posts_categories',
    underscored: true,
  });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost,
      { foreingKey: 'postId', otherKey: 'categoryId', as: 'posts', through: 'posts_categories'});
    models.BlogPost.belongsToMany(models.Category,
        { foreingKey: 'categoryId', otherKey: 'postId', as: 'categories', through: 'posts_categories'});
  };

  return PostCategory;
};

module.exports = PostCategoryModel;