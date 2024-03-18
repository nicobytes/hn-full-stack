import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgres_url: process.env.POSTGRES_URL,
    hn_endpoint: process.env.HN_ENDPOINT,
  };
});
