'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import { Post } from './types';
import { useMemo, useState } from 'react';

export default function FormCreateMessage() {
  const postInitialValue = {
    title: '',
    text: '',
  };
  const [postValue, setPostValue] = useState<Post>(postInitialValue);

  const socket = useMemo(() => {
    const ws = new WebSocket('ws://localhost:8080/');
    ws.onopen = () => {};
    return ws;
  }, []);

  const onSetPostValue = (value: string, type: string) => {
    setPostValue((post) => ({ ...post, [type]: value }));
  };

  const onSubmit = () => {
    if (!postValue.title || !postValue.text) return
    socket.send(JSON.stringify(postValue));
    setPostValue(postInitialValue);
  };

  return (
    <div className='flex items-center flex-col w-96 gap-3'>
      <div className='w-full'>
        <Label>Title</Label>
        <Input
          value={postValue.title}
          onChange={(e) => onSetPostValue(e.target.value, 'title')}
        />
      </div>

      <div className='w-full'>
        <Label>Text</Label>

        <Textarea
          value={postValue.text}
          onChange={(e) => onSetPostValue(e.target.value, 'text')}
        />
      </div>

      <Button className='self-end' onClick={() => onSubmit()}>
        Send
      </Button>
    </div>
  );
}
