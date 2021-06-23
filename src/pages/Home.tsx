import { useHistory } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';

import illustrationImg from '../assets/illustration.svg';
import logoImg from '../assets/logo.svg';
import googleLogoIcon from '../assets/google-icon.svg'

import '../styles/auth.scss'

export function Home() {
  const history = useHistory();
  const { user, singInWithGoogle } = useAuth(); // Trás toda informação passada para as nossas rotas usando o TestContext;

  async function handleCreateRoom() {
    if (!user) { // Se o usuário não estiver autenticado, chame a autenticação. Caso contrário redireciona ele para a página de criação;
      await singInWithGoogle();
    }

    history.push('/rooms/new'); // Faz o usuário ser redirecionado para a rota passada como parâmetro;
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
            onClick={handleCreateRoom} // Após clicar navegue para a rota passada em history.push();
            className='create-room'
          >
            <img src={googleLogoIcon} alt="Google icon"/>
            Crie uma sala com o Google
          </button>

          <div className='separator'>Ou entre em uma sala</div>

          <form>
            <input 
              type="text" 
              placeholder='Digite o código da sala'
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