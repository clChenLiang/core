/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import { loadRemote } from '@module-federation/runtime';
import node_local_remote from 'node_local_remote/test';
console.log(loadRemote);
import('node_remote/test').then((m) => {
  console.log('\x1b[32m%s\x1b[0m', m.default || m);
  //eslint-disable-next-line
});
console.log('\x1b[32m%s\x1b[0m', node_local_remote);

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', async (req, res) => {
  res.send({
    message: 'Welcome to node-host!',
    remotes: {
      node_remote: await remoteMsg,
      node_local_remote,
    },
  });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
