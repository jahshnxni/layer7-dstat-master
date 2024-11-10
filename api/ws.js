// api/ws.js
import { WebSocketServer } from 'ws';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const wss = new WebSocketServer({ noServer: true });

    wss.on('connection', (ws) => {
      console.log('Client connected');

      // Mengirim data setiap detik (contoh data berupa random number)
      setInterval(() => {
        ws.send(Math.floor(Math.random() * 100));  // Mengirimkan data random untuk simulasi jumlah request
      }, 1000);

      ws.on('close', () => {
        console.log('Client disconnected');
      });
    });

    // Upgrade HTTP request menjadi WebSocket connection
    req.socket.on('upgrade', (req, socket, head) => {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      });
    });

    res.status(200).end();  // Menyelesaikan request HTTP
  } else {
    res.status(405).end();  // Method Not Allowed
  }
}
