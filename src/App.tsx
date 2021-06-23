import { BrowserRouter, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
          {/* exact faz com que seja exibido o component apenas quando a rota for exatamente '/'  */}
          <Route path='/' exact component={Home}/> 
          <Route path='/rooms/new' component={NewRoom}/>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
