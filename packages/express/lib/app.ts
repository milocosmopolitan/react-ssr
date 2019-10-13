import http from 'http';
import express from 'express';
import register from './register';
import { Config } from './config';

type Express = typeof express;

interface IReactSsrExpress extends Express {
  (config?: Config): express.Express;
}

const ctor = (config?: Config): express.Express => {
  const app: express.Express = express();

  function listen(port: number, hostname: string, backlog: number, callback?: (...args: any[]) => void): http.Server;
  function listen(port: number, hostname: string, callback?: (...args: any[]) => void): http.Server;
  function listen(port: number, callback?: (...args: any[]) => void): http.Server;
  function listen(callback?: (...args: any[]) => void): http.Server;
  function listen(path: string, callback?: (...args: any[]) => void): http.Server;
  function listen(handle: any, listeningListener?: () => void): http.Server;
  function listen(): http.Server {
    console.log('Optimizing performance...');

    const server = http.createServer(app);
    return server.listen.apply(server, arguments as any);
  }
  app.listen = listen;

  // app.listen = express.application.listen;

  register(app, Object.assign(new Config, config));

  return app;
};

const ReactSsrExpress: IReactSsrExpress = ctor as IReactSsrExpress;

ReactSsrExpress.prototype = express.prototype;

export {
  ReactSsrExpress,
};
