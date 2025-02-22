import { MessageModel } from '../models/MessageModel.js';

export class MessageController {
  static async createMessage(data) {
    if (!data.title || !data.description) return;

    const model = new MessageModel({...data, createdAt: new Date()});
    await model.save();
  }

  static async listMessage() {
    console.log('requisitei')
    return MessageModel.find({}).sort('createdAt').exec()
  }
}
