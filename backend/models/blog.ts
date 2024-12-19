// // backend/src/models/blog.ts
// import { Model, DataTypes, Sequelize } from 'sequelize';
// import { User } from './user';

// export class Blog extends Model {
//   public id!: number;
//   public title!: string;
//   public content!: string;
//   public userId!: number;
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;
// }

// export const initBlogModel = (sequelize: Sequelize) => {
//   Blog.init(
//     {
//       title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       content: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//       },
//       userId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//     },
//     {
//       sequelize,
//       modelName: 'Blog',
//     }
//   );

//   Blog.belongsTo(User, { foreignKey: 'userId', as: 'user' });
// };
import { Model, DataTypes, Sequelize } from 'sequelize';

export class Blog extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define association method
  static associate(models: any) {
    Blog.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

export default function initBlogModel(sequelize: Sequelize) {
  Blog.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Blog',
    }
  );

  return Blog;
}