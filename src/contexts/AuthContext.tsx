// Boa prática. Criar um arquivo separado para cada funcionalidade. Dando responsabilidade 
// Para cada parte do código. Estude!

import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
  id: string;
  name: string | null;
  avatar: string | null;
}

type AuthContextType = {
  user: User | undefined;
  singInWithGoogle: () => Promise<void>; // Uma função sem parametro e sem retorno. Usado para representar uma função para props do typescript
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType); // Cria um contexto para poder compartilhar informações entre componentes React;

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [ user, setUser ] = useState<User>();

  // Guarda as informações na aplicação mesmo que o usuário atualize a página ou sai e entra para o app;

  useEffect(() => {
    // Sempre que usar o useEffect você precisa parar de escutar o evento onAuthStateChanged
    // Boas práticas;

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;
  
        // if (!displayName || photoURL) { // Se não tiver nome e nem foto de usuário retorne um erro;
        //   throw new Error('Missing information from Google account.');
        // }

        setUser({ // Faz user valer essas novas informações agora;
          id: uid,
          name: displayName,
          avatar: photoURL
        })
    }})

    // Faz o evento parar de ser ouvido;

    return () => {
      unsubscribe();
    }
  }, []);

  // Logando um usuário com o Google;

  async function singInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider(); // Faz a conexão com a autenticação do Google;
    const result = await auth.signInWithPopup(provider)

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || photoURL) { // Se não tiver nome e nem foto de usuário retorne um erro;
        throw new Error('Missing information from Google account.');
      }

      setUser({ // Faz user valer essas novas informações agora;
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  };

  return (
    <>
      {/*  Value é a prop que irá receber o valur que irá ser passado para as rotas
          Com value={{ user }} faz com que todos as telas inceridas em AuthContext sejam compartilhadas;*/}

      <AuthContext.Provider value={{ user, singInWithGoogle }}>
        { children }
      </AuthContext.Provider>
    </>
  );
};