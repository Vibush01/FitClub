import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
     import { ToastContainer } from 'react-toastify';
     import 'react-toastify/dist/ReactToastify.css';
     import Navbar from './components/Navbar';
     import LandingPage from './pages/LandingPage';
     import Signup from './pages/Signup';
     import Login from './pages/Login';
     import Dashboard from './pages/Dashboard';

     function App() {
       return (
         <Router>
           <div className="flex flex-col min-h-screen">
             <Navbar />
             <main className="flex-grow">
               <Routes>
                 <Route path="/" element={<LandingPage />} />
                 <Route path="/signup" element={<Signup />} />
                 <Route path="/login" element={<Login />} />
                 <Route path="/dashboard" element={<Dashboard />} />
               </Routes>
             </main>
             <ToastContainer position="top-right" autoClose={3000} />
           </div>
         </Router>
       );
     }

     export default App;