import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string | undefined;
}

const config: Config = {
  port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV,
};

export default config;
