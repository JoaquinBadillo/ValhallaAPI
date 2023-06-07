import * as dotenv from 'dotenv';
import pgPromise from 'pg-promise';

dotenv.config();

const pgp = pgPromise({});
export const db = pgp(process.env.DATABASE_URL);