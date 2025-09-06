import { Injectable, OnModuleInit } from '@nestjs/common';
import * as path from 'path';
import spawn from 'cross-spawn';
import * as fs from 'fs';
import * as process from 'process';

@Injectable()
export class ServiceLauncherService implements OnModuleInit {
  onModuleInit() {
    this.startService('basket', 'Basket');
    this.startService('order', 'Order');
    this.startService('payment', 'Payment');
    //this.startService('products', 'Products');
    this.startService('users', "Users");
  }

  private startService(relativePath: string, name: string) {
    const pidFile = path.resolve(__dirname, `../../pids/${name}.pid`);
    fs.mkdirSync(path.dirname(pidFile), { recursive: true });

    // Nếu đã có PID cũ thì kill
    if (fs.existsSync(pidFile)) {
      const oldPid = parseInt(fs.readFileSync(pidFile, 'utf8'));
      if (!isNaN(oldPid)) {
        try {
          process.kill(oldPid); // kill process cũ
          console.log(`Killed old ${name} process (PID: ${oldPid})`);
        } catch (err) {
          console.log(`Old ${name} process not found or already dead.`);
        }
      }
    }

    const rootPath = path.resolve(__dirname, '../../');
    const child = spawn('npm', ['run', 'start', '--prefix', relativePath], {
      cwd: rootPath,
      stdio: 'inherit',
      shell: true,
    });

    child.on('error', (err) => {
      console.error(`${name} failed to start:`, err);
    });

    child.on('exit', (code) => {
      console.log(`${name} exited with code ${code}`);
    });
  }
}