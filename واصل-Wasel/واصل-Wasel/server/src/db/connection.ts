import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let dbInstance: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export const getDb = async () => {
  if (dbInstance) return dbInstance;

  dbInstance = await open({
    filename: path.join(__dirname, '../../../database.sqlite'),
    driver: sqlite3.Database
  });

  console.log('✅ Connected to SQLite database');
  
  // Enable foreign keys
  await dbInstance.run('PRAGMA foreign_keys = ON;');
  
  return dbInstance;
};

// Utility function to make querying easier across the app
export const query = async (text: string, params: any[] = []) => {
  const db = await getDb();
  
  // Basic query translation from Postgres ($1) to SQLite (?)
  let sqliteText = text;
  for (let i = 1; i <= 20; i++) {
    sqliteText = sqliteText.replace(`$${i}`, '?');
  }

  // Determine if it's a SELECT or an Action (INSERT/UPDATE/DELETE)
  const isSelect = sqliteText.trim().toUpperCase().startsWith('SELECT') || 
                   sqliteText.trim().toUpperCase().startsWith('PRAGMA');

  try {
    if (isSelect) {
      const rows = await db.all(sqliteText, params);
      return { rows, rowCount: rows.length };
    } else {
      // For INSERT ... RETURNING we need to run it as all() if RETURNING is present
      if (sqliteText.toUpperCase().includes('RETURNING')) {
         const rows = await db.all(sqliteText, params);
         return { rows, rowCount: rows.length };
      }
      
      const result = await db.run(sqliteText, params);
      return { 
        rows: [], 
        rowCount: result.changes || 0,
        lastID: result.lastID 
      };
    }
  } catch (error) {
    console.error('Database query error:', error);
    console.error('Query:', sqliteText);
    console.error('Params:', params);
    throw error;
  }
};
