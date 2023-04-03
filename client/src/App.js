import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Home from './components/Home.js';
import Login from './components/Login.js';
import MenuBar from './components/Nav.js';
import DetailPage from './components/PostInfo.js';
import Register from './components/Signup.js';
import { AuthProvider } from './auth/auth';
import AuthRoute from './utils/AuthRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Routes>
            <Route path='/' element={<AuthRoute><Home /></AuthRoute>} />
            <Route path='/post/:postId' element={<AuthRoute><DetailPage /></AuthRoute>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
