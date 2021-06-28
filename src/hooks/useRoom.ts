// Toda vez que uma lógica for compartilhada por mais componentes, é a hora de criar um hook.

import { useState, useEffect } from 'react';

import { useAuth } from '../hooks/useAuth';

import { database } from '../services/firebase';

type QuestionProps = {
  id: string;
  author: {
    name: string;
    avatar: string;
  },
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
  likeCount: number;
  likeId: string | undefined;
}

type FirebaseQuestion = Record<string, {
  author: {
    name: string;
    avatar: string;
  },
  content: string;
  isHighlighted: boolean,
  isAnswered: boolean
  likes: Record<string, {
    authorId: string;
  }>
}>

export function useRoom(roomId: string) {

  const { user } = useAuth();
  const [ questions, setQuestions ] = useState<QuestionProps[]>([]);
  const [ title, setTitle ] = useState();

   // useEffect para buscar as perguntas salvas do FIREBASE.
   useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    // Regras do firebase para sempre ficar escutando um evento com o .once()
    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestion = databaseRoom.questions ?? {};

      // Converte as questions vindas do firebase de object para array.
      // Para que a função map() possa ser usada.
      const parsedQuestions = Object.entries(firebaseQuestions).map(([ key, value ]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length, // Pega os números de likes
          likeId: Object.entries(value.likes ?? {}).find(([ key, like ]) => like.authorId === user?.id)?.[0],
        }
      });

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });

    return () => {
      roomRef.off('value'); // Remove todos os listeners com o valor 'value'
    }
  }, [roomId, user?.id]); // Toda vez que o código da sala roomId mudar o useEffect é carregado novamente.

  return { questions, title }
};