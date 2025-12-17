// Data migration script - Import existing JSON contributions into PostgreSQL
// Now uses separate tables for Zomato and GitHub

import { query, testConnection, closePool } from './db.js';
import { saveContribution } from './contributionService.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrateContributions() {
  console.log('🔄 Starting data migration from JSON to PostgreSQL...');
  
  // Test connection
  const connected = await testConnection();
  if (!connected) {
    console.error('❌ Cannot connect to database. Please check DATABASE_URL.');
    process.exit(1);
  }

  try {
    const dataDir = path.join(__dirname, '../data');
    let totalMigrated = 0;
    let totalErrors = 0;

    // Migrate Zomato contributions
    const zomatoFile = path.join(dataDir, 'zomato', 'contributions.json');
    if (fs.existsSync(zomatoFile)) {
      console.log('📦 Migrating Zomato contributions to zomato_contributions table...');
      const zomatoContributions = JSON.parse(fs.readFileSync(zomatoFile, 'utf8'));
      
      for (const contribution of zomatoContributions) {
        try {
          await saveContribution(contribution);
          totalMigrated++;
          if (totalMigrated % 10 === 0) {
            console.log(`  ✅ Migrated ${totalMigrated} contributions...`);
          }
        } catch (error) {
          console.error(`  ❌ Error migrating contribution ${contribution.id}:`, error.message);
          totalErrors++;
        }
      }
      console.log(`✅ Zomato: Migrated ${zomatoContributions.length} contributions`);
    }

    // Migrate GitHub contributions
    const githubFile = path.join(dataDir, 'github', 'contributions.json');
    if (fs.existsSync(githubFile)) {
      console.log('📦 Migrating GitHub contributions to github_contributions table...');
      const githubContributions = JSON.parse(fs.readFileSync(githubFile, 'utf8'));
      
      for (const contribution of githubContributions) {
        try {
          await saveContribution(contribution);
          totalMigrated++;
          if (totalMigrated % 10 === 0) {
            console.log(`  ✅ Migrated ${totalMigrated} contributions...`);
          }
        } catch (error) {
          console.error(`  ❌ Error migrating contribution ${contribution.id}:`, error.message);
          totalErrors++;
        }
      }
      console.log(`✅ GitHub: Migrated ${githubContributions.length} contributions`);
    }

    // Skip legacy contributions.json (empty or not needed)

    console.log('\n✅ Migration completed!');
    console.log(`   Total migrated: ${totalMigrated}`);
    console.log(`   Total errors: ${totalErrors}`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await closePool();
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateContributions();
}

export { migrateContributions };
