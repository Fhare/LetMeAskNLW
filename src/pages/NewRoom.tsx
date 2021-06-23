import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import { database } from '../services/firebase';

import illustrationImg from '../assets/illustration.svg';
import logoImg from '../assets/logo.svg';

import '../styles/auth.scss';

export function NewRoom() {
  const { user } = useAuth();
  const [ newRoom, setNewRoom ] = useState('');

  const history = useHistory();

  async function handleCreateRoom(event: FormEvent) {
    // Faz o evento onSubmit não ter o comportamento padrão de mandar o usuário para a rota.
    event.preventDefault(); 

    // trim() remove os espaços entre as palavras.
    if (newRoom.trim() === '') {
      return;
    };

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    // key é id que foi inserido pelo próprio firebase.
    history.push(`/rooms/${firebaseRoom.key}`);   
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

          <h2>Crie uma nova sala</h2>
          
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text" 
              placeholder='Nome da sala'
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />

            <Button type='submit'>
              Criar sala
            </Button>
          </form>

          <p>
            Quer entrar em uma sala existente?

            {/* Link é um componente de react router dom que faz o papel da tag a do HTMl; */}
            <Link to='/'>Clique aqui</Link> 
          </p>
        </div>
      </main>
    </div>
  );
};