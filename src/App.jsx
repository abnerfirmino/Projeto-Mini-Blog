import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';

import { UserDashboard } from './pages/UserDashboard';
import { CreatePost } from './pages/CreatePost';

// hooks
import { useEffect, useState } from 'react';
import { AuthContextProvider } from './context/AuthContext';
import { useAuthentication } from './hooks/useAuthentication';

// imports do firebase
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  // estados da app
  const [user, setUser] = useState(undefined);
  const {auth} = useAuthentication();

  const loadingUser = user === undefined;

  // monitorando a autenticação
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  // carrega se não tiver usuário
  if (loadingUser) {
    return (<p>Carregando...</p>);
  }

  return (
    <div className="App">
      <AuthContextProvider value={{ user }}>
        <BrowserRouter>
        <NavBar />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path='/register' element={!user ? <Register /> : <Navigate to="/" />} />
              <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to='/login' />} />
              <Route path='/dashboard' element={user ? <UserDashboard /> : <Navigate to='/login' />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );

}

export default App;
