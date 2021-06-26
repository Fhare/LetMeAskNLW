import { ButtonHTMLAttributes } from 'react'; // Adiciona para o nosso botão todas os atributos que um botão HTML pode receber;

import '../styles/button.scss';

// Extend o nosso ButtonProps para todas os atributos HTML do button;
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean; // ? diz que é opcional.
}

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <button 
      className={`button ${isOutlined ? 'outlined' : ''}`}
      { ...props } 
    />
  );
};