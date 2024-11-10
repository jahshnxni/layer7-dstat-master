import { WebSocketServer } from 'ws';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const wss = new WebSocketServer({ noServer: true });

    wss.on('connection', (ws) => {
      console.log('Client connected');

      // Kirim data setiap detik
      setInterval(() => {
        ws.send(Math.floor(Math.random() * 100)); // Kirim data simulasi
      }, 1000);

      ws.on('close', () => {
        console.log('Client disconnected');
      });
    });

    // Upgrade request HTTP menjadi WebSocket
    req.socket.on('upgrade', (req, socket, head) => {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      });
    });

    res.status(200).end();  // Akhiri response
  } else {
    res.status(405).end();  // Method Not Allowed
  }
}
