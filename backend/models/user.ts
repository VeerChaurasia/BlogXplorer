// // backend/src/models/user.ts
// import { Model, DataTypes, Sequelize } from 'sequelize';
// import { Blog } from './blog';

// export class User extends Model {
//   public id!: number;
//   public name!: string;
//   public email!: string;
//   public password!: string;
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;
// }

// export const initUserModel = (sequelize: Sequelize) => {
//   User.init(
//     {
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//       },
//       password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//     },
//     {
//       sequelize,
//       modelName: 'User',
//     }
//   );

//   User.hasMany(Blog, { foreignKey: 'userId', as: 'blogs' });
// };
import { Model, DataTypes, Sequelize } from 'sequelize';

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define association method
  static associate(models: any) {
    User.hasMany(models.Blog, { foreignKey: 'userId', as: 'blogs' });
  }
}

export default function initUserModel(sequelize: Sequelize) {
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
}