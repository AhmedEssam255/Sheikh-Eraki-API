import { createClient } from 'redis';

const redisClient = createClient({
  username: 'default',
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: 'macrosafe-balance-outdoor-25372.db.redis.io',
    port: 19450,
  },
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

redisClient.on('connect', () => console.log('Redis Client Connected'));

const connectCache = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    return redisClient;
  } catch (error) {
    error.status = error.status || 500;
    error.message = error.message || 'Redis connection error';
    throw error;
  }
};

export { connectCache, redisClient };
