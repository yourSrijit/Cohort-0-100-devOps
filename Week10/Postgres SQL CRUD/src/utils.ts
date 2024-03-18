import { Client } from 'pg';

export async function getClient() {
    const client = new Client("postgres://bcgohfiu:SsnuORPYEb9OAkwd4PnY-sX03yP0ELzi@kesavan.db.elephantsql.com/bcgohfiu");
    await client.connect();
    return client;
}