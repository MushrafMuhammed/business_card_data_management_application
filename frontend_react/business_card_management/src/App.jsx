import './App.css'
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar/Navbar';
import FileUpload from './components/FileUpload/FileUpload';
import CardDetailsList from './components/CardDetailsList/CardDetailsList';
import AuthForm from './components/User/AuthForm';

function App() {

  return (
    <>
      <Navbar />  
    <Routes>     
        <Route path="/" element={<FileUpload/>} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/card-details" element={<CardDetailsList />} />
    </Routes> 
    </>
  )
}

export default App;

