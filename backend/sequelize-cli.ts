import { Sequelize } from 'sequelize';
import config from './config/config';

// Set up Sequelize instance with TypeScript
const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: config.development.dialect,
});

export default sequelize;
