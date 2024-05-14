import { Server } from "./server";
import { env } from '../config/env';

(() => {
  main()
})();

async function main(){
  const PORT = env.PORT || 3001;
  const server = new Server(PORT);
  await server.start();
}