import { ButtonHTMLAttributes } from 'react'; // Adiciona para o nosso botão todas os atributos que um botão HTML pode receber;

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> // Extend o nosso ButtonProps para todas os atributos HTML do button;

export function Button(props: ButtonProps) {
  return (
    <button className='button' { ...props } />
  );
};