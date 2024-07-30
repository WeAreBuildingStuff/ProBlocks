'use client';

import { useState } from 'react';
import { Input } from '@repo/ui/src/components/input';
import { Button } from '@repo/ui/src/components/button';
import getGeminiResponse from '../../utils/getGeminiResponse';

export default function Page(): JSX.Element {
  const [message, setMessage] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  return (
    <main className='w-screen flex-1 flex flex-col items-center bg-neutral-100 p-24'>
      <div className='flex flex-col items-center space-y-4'>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Enter your message'
        />
        <Button
          onClick={async () => {
            const response = await getGeminiResponse(message);
            setResponse(response);
          }}
        >
          Send
        </Button>
        {response && <div className='text-lg'> {response} </div>}
      </div>
    </main>
  );
}
