import { createConnection, Connection } from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '160902',
  database: 'api',
};

export async function connectDatabase(): Promise<Connection> {
  try {
    const connection = await createConnection(dbConfig);
    console.log('Kết nối thành công!!!');
    return connection;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}

