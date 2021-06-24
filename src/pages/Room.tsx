import { useState, useEffect, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import { RoomCode } from '../components/RoomCode';
import { Button } from '../components/Button';

import { database } from '../services/firebase';

import logoImg from '../assets/logo.svg';

import '../styles/rooms.scss';

type RoomParams = {
  id: string;
}

type FirebaseQuestion = Record<string, {
  author: {
    name: string;
    avatar: string;
  },
  content: string;
  isHighlighted: boolean,
  isAnswer: boolean
}>

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  },
  content: string;
  isHighlighted: boolean,
  isAnswer: boolean
}

export function Room() {

  // Hook useParams é usado para resgatar valores dos parametros passados na URl.
  const [ newQuestion, setNewQuestion ] = useState('');
  const [ title, setTitle ] = useState();
  const [ questions, setQuestions ] = useState<Question[]>([]);

  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  // useEffect para buscar as perguntas salvas do FIREBASE.
  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    // Regras do firebase para sempre ficar escutando um evento com o .once()
    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestion = databaseRoom.questions ?? {};

      // Converte as questions vindas do firebase de object para array.
      const parsedQuestions = Object.entries(firebaseQuestions).map(([ key, value ]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswer: value.isAnswer
        }
      });

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId]); // Toda vez que o código da sala roomId mudar o useEffect é carregado novamente.

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    };

    if (!user) {
      throw new Error('You must be logged in.');
    };

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false
    };

    // Adiciona o objeto pergunta em uma nova ramificação do banco de dados chamado "questions".
    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
  };

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask"/>
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea 
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          ></textarea>

          <div className="form-footer">
            { user ? (
              <div className='form-info'>
                {/* <img src={user.avatar} alt={user.name} /> */}
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça seu login.</button></span>
            )}
            
            <Button type='submit' disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>

        {JSON.stringify(questions)}
      </main>
    </div>
  );
};  