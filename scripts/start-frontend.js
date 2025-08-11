import detect from 'detect-port';
import { spawn } from 'child_process';

(async () => {
  const defaultPort = 3000;
  const port = await detect(defaultPort);

  if (port !== defaultPort) {
    console.log(`⚠ Port ${defaultPort} in use. Starting on port ${port} instead...`);
  } else {
    console.log(`✅ Starting frontend on port ${port}`);
  }

  spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', 
    ['--prefix', 'test-case-generator-frontend', 'run', 'start'], 
    {
      env: { ...process.env, PORT: port },
      stdio: 'inherit',
      shell: true
    }
  );
})();
