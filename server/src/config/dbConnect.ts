import dotenv from 'dotenv';
import { ConnectOptions } from 'mongoose';

dotenv.config({ path: '.env' });

const mongoOpts: ConnectOptions = {

};

const mongoConfig = {
    url: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    configs: mongoOpts
}

export default mongoConfig;