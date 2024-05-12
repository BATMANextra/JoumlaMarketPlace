import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import ProtectedPage from './components/ProtectedPage';
import Spinner from './components/Spinner';
import Profile from './pages/profile';
function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <BrowserRouter>
      <div className="App">
        {loading && <Spinner />}

        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <ProtectedPage />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
