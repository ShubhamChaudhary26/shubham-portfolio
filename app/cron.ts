import cron from 'node-cron';
import { exec } from 'child_process';

cron.schedule('0 6 * * *', () => {
  exec('npx ts-node scripts/fetchBlogs.ts', (err, stdout) => {
    if (err) console.error(err);
    console.log(stdout);
  });
});
