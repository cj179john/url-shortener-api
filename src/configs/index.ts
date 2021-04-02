const defaultConfigs = {
  mongoUrl: process.env.MONGO_URL || 'localhost',
  mongoPort: parseInt(process.env.MONGO_PORT, 0) || 27017,
  mongoDB: process.env.MONGO_DB || 'urls',
};

export const testConfigs = {
  ...defaultConfigs,
  mongoDB: process.env.TEST_MONGO_DB || 'urls-test',
};

const configs = process.env.API_ENV === 'test' ? testConfigs : defaultConfigs;

export default configs;
