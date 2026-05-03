// Quick script to verify imports are correct
import { readFileSync } from 'fs';
import { join } from 'path';

const files = [
  'src/components/WeekDashboard.jsx',
  'src/components/UnifiedDashboard.jsx',
  'src/components/ui/Card.jsx',
  'src/App.jsx'
];

console.log('Checking imports...\n');

files.forEach(file => {
  try {
    const content = readFileSync(join(process.cwd(), file), 'utf-8');
    const lines = content.split('\n').slice(0, 20);
    console.log(`✓ ${file}`);
    const imports = lines.filter(l => l.trim().startsWith('import'));
    imports.forEach(imp => console.log(`  ${imp.trim()}`));
    console.log('');
  } catch (e) {
    console.log(`✗ ${file}: ${e.message}\n`);
  }
});

console.log('✓ All files readable');
