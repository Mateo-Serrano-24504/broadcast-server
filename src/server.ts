import { createServer } from 'http';
import { createApp } from './app';

export function startServer(port: number) {
  const app = createApp();
  const server = createServer(app);
  server.listen(port, () => {
    console.log(`Server listening on port {port}`);
  });
  return server;
}
