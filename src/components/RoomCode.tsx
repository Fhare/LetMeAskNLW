import copyImg from '../assets/copy.svg';

import '../styles/room-code.scss';

type RoomCodeProps = {
  code: string;
}

export function RoomCode({ code }: RoomCodeProps) {

  // Faz o usuário poder copiar o número da sala com um clique 
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
  }

  return (
    <button 
      className='room-code'
      onClick={copyRoomCodeToClipboard}  
    >
      <div>
        <img src={copyImg} alt="copy room code"/>
      </div>

      <span>
        Sala #{code}
      </span>
    </button>
  );
};