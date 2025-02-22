'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMemo, useState } from 'react';
import { Post } from './types';

export default function ListMessage() {
  const [postsList, setPostsList] = useState<Post[]>([]);
  const exampleSocket = useMemo(() => {
    return new WebSocket('ws://localhost:8080/');
  }, [])

  exampleSocket.onmessage = (ev) => {
    if (ev.data.size !== 0) {
      console.log(JSON.parse(ev.data))
      setPostsList(JSON.parse(ev.data));
    }
  };

  return (
    <div className='flex justify-center items-center flex-col gap-6 w-9/12'>
      <h3 className='scroll-m-20 text-3xl font-extrabold tracking-tight'>
        All Posts
      </h3>

      {postsList.map((post, index) => (
        <Card className='w-full' key={index}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
          </CardHeader>
          <CardContent>{post.text}</CardContent>
        </Card>
      ))}
    </div>
  );
}
