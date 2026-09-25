import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'

let database: ReturnType<typeof drizzle> | undefined

export function getDatabase() {
  if (database) return database

  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required to connect to PostgreSQL.')
  }

  database = drizzle(postgres(databaseUrl))
  return database
}
