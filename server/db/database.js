/**
 * This file defines our database schema.  You can instantiate a new DB or reset your existing DB
 * with the command sequelize.sync({ force: true });
 */

const config = require('../config');

const Sequelize = require('sequelize');

/**
 * Instantiates sequelize object configured for either Production or Dev
 * @param (String) 'prod' uses configured PROD settings, 'test' uses in memory sqlite
 * @returns (Sequelize)
 */
const _InjectDBConfig = (config) => {
  let sequelize;
  if (config.env === 'prod') {
    sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
      dialect: 'postgres',
      quoteIdentifiers: false, // quoteIdentifiers is a Postgres only option
      port: config.dbPort,
      host: config.dbHost,
      logging: config.env,
    });
  } else if (config.env === 'test') {
    sequelize = new Sequelize('opendoor', 'opendoor', null, { dialect: 'sqlite', storage: ':memory',
      force: true, logging: config.logging });
  } else {
    throw Error('Unsupported SQL config.');
  }

  const User = require('../models/User')(sequelize);

  const Group = require('../models/Group')(sequelize);

  const Event = require('../models/Event')(sequelize);

  User.belongsToMany(Group, { through: 'rel_user_group' });
  Group.belongsToMany(User, { through: 'rel_user_group' });

  User.belongsToMany(Event, { through: 'rel_user_event' });
  Event.belongsToMany(User, { through: 'rel_user_event' });

  Group.belongsToMany(Event, { through: 'rel_group_event' });
  Event.belongsToMany(Group, { through: 'rel_group_event' });

  Event.belongsTo(User, { as: 'hostUser' });

  return {
    User,
    Group,
    Event,
    sequelize,
    Sequelize,
  };
};

module.exports = { db: _InjectDBConfig({ env: 'prod', logging: false }),
    _InjectDBConfig };