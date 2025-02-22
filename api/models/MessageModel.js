import mongoose, { Model, Schema } from 'mongoose';

const messageSchema = new Schema({
  title: String,
  text: String,
  createdAt: Date,
})

export const MessageModel = mongoose.model('Message', messageSchema)