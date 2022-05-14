const app = require('../app');
const config = require('config');
const mongoose = require('mongoose');
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

mongoose.connect(
  `mongodb://${config.get('database.user')}:${config.get(
    'database.password'
  )}@${config.get('database.host')}:${config.get('database.port')}/${config.get(
    'database.dbName'
  )}`,
  (err, _) => {
    if (err) {
      console.log('Error to connect with database... ', err);
    } else {
      io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('new-message', (conversation) => {
          console.log(conversation);
          io.emit(`listen-conversation-${conversation._id}`);
          io.emit(
            `listen-conversation-list-user-${conversation.userOneId._id}`
          );
          io.emit(
            `listen-conversation-list-user-${conversation.userTwoId._id}`
          );
        });
      });

      server.listen(config.get('app.port') || 3001, () => {
        console.log(`API: ${config.get('name')}`);
        console.log(`Author: ${config.get('author')}`);
        console.log(`API runs in port: ${config.get('app.port') || 3001}`);
      });
    }
  }
);
