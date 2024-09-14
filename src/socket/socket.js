const socket = require("socket.io");
const { logger } = require("../middlewares/logger.middleware");
const MessageManager = require("../controllers/message.controller");
const Message = new MessageManager();

class SocketProductManager {
  constructor(httpServer) {
    this.io = socket(httpServer);
    this.initSocketEvents();
  }
  async initSocketEvents() {
    this.io.on("connection", async (socket) => {
      logger.info("Usuario conectado");
      socket.on("mensaje", async (info) => {
        await Message.createMessage(info);
        this.io.emit("chat", await Message.getMessages());
      });
      socket.on("clearchat", async () => {
        await Message.deleteAllMessages();
      });
    });
  }
}

module.exports = SocketProductManager;
