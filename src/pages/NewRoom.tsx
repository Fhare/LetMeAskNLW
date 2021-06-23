import { Link } from 'react-router-dom';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../assets/illustration.svg';
import logoImg from '../assets/logo.svg';

import '../styles/auth.scss';

export function NewRoom() {
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
          
          <form>
            <input 
              type="text" 
              placeholder='Nome da sala'
            />

            <Button type='submit'>
              Criar sala
            </Button>
          </form>

          <p>
            Quer entrar em uma sala existente?
            <Link to='/'>Clique aqui</Link> {/* Link é um componente de react router dom que faz o papel da tag a do HTMl; */}
          </p>
        </div>
      </main>
    </div>
  );
};