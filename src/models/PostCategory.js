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
      { foreignKey: 'categoryId', otherKey: 'postId', as: 'posts', through: PostCategory});
    models.BlogPost.belongsToMany(models.Category,
      { foreignKey: 'postId', otherKey: 'categoryId', as: 'categories', through: PostCategory});
  };

  return PostCategory;
};

module.exports = PostCategoryModel;