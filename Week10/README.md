# PostGres SQL
--- 
### Data Types and Check Constrains
- SERIAL PRiMARY KEY
- NOT NULL
- UNIQUE
- TEXT
- INTEGER
- BOOLEAN
DATE yyyy-mm-dd

## How to connect 

```
import { Client } from 'pg';

export async function getClient() {
    const client = new Client("URL**************");
    await client.connect();
    return client;
}
```
## Creating Table
```
CREATE TABLE EMPLOYEE (
  empId INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  dept TEXT NOT NULL
);
```