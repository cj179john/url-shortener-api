export default () => {
  const defaultConfigs = {
    database: {
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 27017,
      db: process.env.DATABASE_DB || 'urls',
    },
  };

  const testConfigs = {
    ...defaultConfigs,
    database: {
      ...defaultConfigs.database,
      db: process.env.TEST_MONGO_DB || 'urls-test',
    },
  };

  return process.env.API_ENV === 'test' ? testConfigs : defaultConfigs;
};
