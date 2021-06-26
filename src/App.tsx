import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/adminRoom';

import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>

        {/* Switch faz com que se uma rota for satisfeita ele pare de procurar as outras rotas */}
        {/* Com isso diminuindo bugs na aplicação. De ter duas rotas sendo exibidas em tela */}
        <Switch>

          {/* exact faz com que seja exibido o component apenas quando a rota for exatamente '/'  */}
          <Route path='/' exact component={Home}/> 
          <Route path='/rooms/new' component={NewRoom}/>
          <Route path='/rooms/:id' component={Room}/>
          <Route path='/admin/rooms/:id' component={AdminRoom}/>

        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
