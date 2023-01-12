const BlogPostModel = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.STRING,
    published: DataTypes.STRING,
    updated: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'blog_posts',
    underscored: true,
  });

  return BlogPost;
};

module.exports = BlogPostModel;