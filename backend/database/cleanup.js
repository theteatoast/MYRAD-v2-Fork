// Cleanup script to remove old unified schema tables
import { query, testConnection, closePool } from './db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function cleanupOldTables() {
  console.log('🧹 Cleaning up old unified schema tables...');
  
  // Test connection
  const connected = await testConnection();
  if (!connected) {
    console.error('❌ Cannot connect to database. Please check DATABASE_URL.');
    process.exit(1);
  }

  try {
    // Drop old tables directly (in reverse dependency order)
    const tablesToDrop = [
      'contribution_categories',
      'contribution_brands',
      'contribution_sellable_data',
      'contribution_analytics',
      'contributions'
    ];
    
    for (const tableName of tablesToDrop) {
      try {
        await query(`DROP TABLE IF EXISTS ${tableName} CASCADE;`);
        console.log(`✅ Dropped table: ${tableName}`);
      } catch (error) {
        if (error.message.includes('does not exist')) {
          console.log(`ℹ️  Table already dropped: ${tableName}`);
        } else {
          console.error(`❌ Error dropping ${tableName}: ${error.message}`);
        }
      }
    }
    
    // Verify old tables are gone
    console.log('\n🔍 Verifying cleanup...');
    const result = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('contributions', 'contribution_analytics', 'contribution_sellable_data', 'contribution_brands', 'contribution_categories')
    `);
    
    if (result.rows.length === 0) {
      console.log('✅ All old tables successfully removed!');
    } else {
      console.log('⚠️  Some old tables still exist:', result.rows.map(r => r.table_name).join(', '));
    }
    
    // Verify new tables exist
    console.log('\n🔍 Verifying new tables exist...');
    const newTables = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('zomato_contributions', 'github_contributions')
    `);
    
    if (newTables.rows.length === 2) {
      console.log('✅ New tables confirmed: zomato_contributions, github_contributions');
    } else {
      console.log('⚠️  New tables:', newTables.rows.map(r => r.table_name).join(', '));
    }
    
    console.log('\n✅ Cleanup completed!');
  } catch (error) {
    console.error('❌ Cleanup failed:', error);
    process.exit(1);
  } finally {
    await closePool();
  }
}

// Run if called directly
const isMainModule = import.meta.url === `file://${process.argv[1]}` || import.meta.url.includes(process.argv[1]);
if (isMainModule) {
  cleanupOldTables().catch(err => {
    console.error('Cleanup failed:', err);
    process.exit(1);
  });
}

export { cleanupOldTables };

