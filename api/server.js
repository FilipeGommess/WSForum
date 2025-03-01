import { WebSocket, WebSocketServer } from 'ws';
import { MessageController } from './controllers/MessageController.js';
import mongoose from 'mongoose';
import 'dotenv/config'

const wss = new WebSocketServer({ port: 3000, host: '0.0.0.0' });

try {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log('Connected')
} catch (e) {
  console.error(e);
}
wss.on('connection', async (ws) => {
  const messagesList = await MessageController.listMessage();
  ws.send(JSON.stringify(messagesList));
  ws.on('message', async (data) => {
    await MessageController.createMessage(JSON.parse(data));
    const newmessagesList = await MessageController.listMessage();

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(newmessagesList));
      }
    });
  });
});
