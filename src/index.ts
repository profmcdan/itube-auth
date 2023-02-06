import app from './app';
import { appEnv } from './config';

app.listen(appEnv.port, () => {
  console.log(`Auth service up on http://localhost:${appEnv.port}`);
});
