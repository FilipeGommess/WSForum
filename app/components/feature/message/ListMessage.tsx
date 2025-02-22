'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { Message } from './types';
import { useWebSocket } from '@/context/WebSocketContext';

export default function ListMessage() {
  const ws = useWebSocket();
  const [messagesList, setMessagesList] = useState<Message[]>([]);

  ws.onmessage = (ev) => {
    if (ev.data.size !== 0) {
      setMessagesList(JSON.parse(ev.data));
    }
  };

  return (
    <div className='flex justify-center items-center flex-col gap-6 w-9/12'>
      <h3 className='scroll-m-20 text-3xl font-extrabold tracking-tight'>
        All Messages
      </h3>

      {messagesList.map((message, index) => (
        <Card className='w-full' key={index}>
          <CardHeader>
            <CardTitle>{message.title}</CardTitle>
          </CardHeader>
          <CardContent>{message.text}</CardContent>
        </Card>
      ))}
    </div>
  );
}
