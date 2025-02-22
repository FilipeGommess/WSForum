'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import { Message } from './types';
import { useState } from 'react';
import { useWebSocket } from '@/context/WebSocketContext';
import { toast, ToastContainer } from 'react-toastify';

const messageInitialValue = {
  title: '',
  text: '',
};

export default function FormCreateMessage() {
  const ws = useWebSocket();
  const [messageValue, setMessageValue] = useState<Message>(messageInitialValue);

  const onSetMessageValue = (value: string, type: string) => {
    setMessageValue((message) => ({ ...message, [type]: value }));
  };

  const onSubmit = () => {
    if (!messageValue.title || !messageValue.text) {
      toast.error("Please fill in all fields");
      return
    };

    ws.send(JSON.stringify(messageValue));
    setMessageValue(messageInitialValue);
  };

  return (
    <div className='flex items-center flex-col w-96 gap-3'>
      <div className='w-full'>
        <Label>Title</Label>
        <Input
          value={messageValue.title}
          onChange={(e) => onSetMessageValue(e.target.value, 'title')}
        />
      </div>

      <div className='w-full'>
        <Label>Text</Label>

        <Textarea
          value={messageValue.text}
          onChange={(e) => onSetMessageValue(e.target.value, 'text')}
        />
      </div>

      <Button className='self-end' onClick={() => onSubmit()}>
        Send
      </Button>

      <ToastContainer />
    </div>
  );
}
