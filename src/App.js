import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
//
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import FormCadastroPessoa from './pages/FormCadastroPessoa';
import FormUpdatePessoa from './pages/FormUpdatePessoa';
import NovoAcesso from './pages/NovoAcesso';

//

function App() {
  return (
    <div className="App">
      <Toaster />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/novousuario" element={<FormCadastroPessoa />} />
        <Route path="/usuario/:userId" element={<FormUpdatePessoa />} />
        <Route path="/NovoAcesso/:userID" element={<NovoAcesso />} />
      </Routes>
    </div>
  );
}

export default App;
