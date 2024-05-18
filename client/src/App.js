import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import ProtectedPage from './components/ProtectedPage';
import Spinner from './components/Spinner';
import Profile from './pages/profile';
import Admin from './pages/Admin';
import ProductInfo from './pages/ProductInfo';

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
            <Route path="/product/:id" element={<ProductInfo />} />
            
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
