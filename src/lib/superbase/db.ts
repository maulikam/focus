import {drizzle} from 'drizzle-orm/postgres-js';
import {postgres} from 'postgres';

import * as dotenv from 'dotenv'
import * schema from '../../../migrations/schema';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

dotenv.config({path:'.env'});

if (!process.env.DATABASE_URL) {
    console.log('no database URL!')
}

const client = postgres(process.env.DATABASE_URL as String, {max:1});
const db = drizzle(client, {schema});
const migrateDb = async () => {
    try {

        console.log('Migrating client ');
        await migrate(db, {migrationsFolder:'migrations'});
        console.log('Migrating cleint migrated');
    } catch (error) {

        console.log('Error migrating client');
        
    }
    
};
migrateDb();
export default db;