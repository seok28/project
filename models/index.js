const Sequelize = require('sequelize');
const User = require('./user');
const Post = require('./post');
const Map = require('./map');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Post = Post;
db.Map  = Map;

User.init(sequelize);
Post.init(sequelize);
Map.init (sequelize);

User.associate(db);
Post.associate(db);
Map.associate(db);

module.exports = db;