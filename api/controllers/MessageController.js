import { MessageModel } from '../models/MessageModel.js';

export class MessageController {
  static async createMessage(data) {
    if (!data.title || !data.text) return;

    const model = new MessageModel({ ...data, createdAt: new Date() });
    await model.save();
  }

  static async listMessage() {
    return MessageModel.find({}).sort({'createdAt' : -1}).exec();
  }
}
