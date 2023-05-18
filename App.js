import NavegadorComponent from './componentes/NavegadorComponent';
import { ModoProvider } from './contextos/ModoContext';

const App = () => {

  return (
    <ModoProvider>
      <NavegadorComponent />
    </ModoProvider>
  )
}

export default App;