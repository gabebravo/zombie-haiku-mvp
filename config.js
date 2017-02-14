module.exports = {
  PORT: process.env.PORT || 8080,
  MORGAN: process.env.MORGAN || 'dev',
  DATABASE_URL: process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://localhost:27017/testZombie'
};
