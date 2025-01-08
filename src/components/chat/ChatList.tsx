import { useEffect, useState } from 'react';

import { getChats } from '@/services/api';
import type { User } from '@/types/users.type';

interface Chat {
  id: number;
  messages: { sender: string; content: string; timestamp: Date };
  participants: User[];
}

export default function ChatList() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const data = await getChats(token);
          setChats(data);
        } else {
          setError('No token found');
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchChats();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="mx-auto mt-10 max-w-md">
      <h2 className="mb-5 text-2xl font-bold">Chats</h2>
      {chats.length > 0 ? (
        <ul>
          {chats.map((chat) => (
            <li key={chat.id} className="mb-2 rounded border p-2">
              {chat.participants
                .map((participant) => participant.firstName)
                .join(', ')}
            </li>
          ))}
        </ul>
      ) : (
        <p>No chats available.</p>
      )}
    </div>
  );
}
