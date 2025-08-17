const { execSync } = require('child_process');

console.log('🔄 Deploying database schema to Neon...');

try {
  // Generate Prisma client
  console.log('📦 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  // Push schema to database
  console.log('🚀 Pushing schema to database...');
  execSync('npx prisma db push --force-reset', { stdio: 'inherit' });

  console.log('✅ Database deployment completed successfully!');
} catch (error) {
  console.error('❌ Database deployment failed:', error.message);
  process.exit(1);
}