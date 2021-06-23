import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { database } from '../services/firebase';

import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';

import illustrationImg from '../assets/illustration.svg';
import logoImg from '../assets/logo.svg';
import googleLogoIcon from '../assets/google-icon.svg'

import '../styles/auth.scss'

export function Home() {
  const [ roomCode, setRoomCode ] = useState('');

  const history = useHistory();

  // Trás toda informação passada para as nossas rotas usando o TestContext;
  const { user, singInWithGoogle } = useAuth(); 

  async function handleCreateRoom() {
    // Se o usuário não estiver autenticado, chame a autenticação. Caso contrário redireciona ele para a página de criação;

    if (!user) { 
      await singInWithGoogle();
    }

     // Faz o usuário ser redirecionado para a rota passada como parâmetro;

    history.push('/rooms/new');
  };

  // Stop in 32 minutes and 16 seconds

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    };

    // .get() retorna todos os dados vindos de database
    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    // Checa se a sala existe
    if (!roomRef.exists()) {
      alert('Room does not exist.');
      return;
    };

    history.push(`rooms/${roomCode}`);
  };

  return (
    <div id='page-auth'>
      <aside>
        <img src={illustrationImg} alt="illustration img"/>
        <strong>Crie salas Q&amp;A ao vivo</strong>
        <p>Tire dúvidas das sua audiência em tempo real</p>
      </aside>
      
      <main>
        <div className='main-content'>
          <img src={logoImg} alt="letmeask"/>

          <button
            // Após clicar navegue para a rota passada em history.push();
            onClick={handleCreateRoom} 
            className='create-room'
          >
            <img src={googleLogoIcon} alt="Google icon"/>
            Crie uma sala com o Google
          </button>

          <div className='separator'>Ou entre em uma sala</div>

          <form onSubmit={handleJoinRoom}>
            <input 
              type="text" 
              placeholder='Digite o código da sala'
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />

            <Button type='submit'>
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};