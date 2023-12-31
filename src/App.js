import './App.css';
import {BrowserRouter,Routes,Route, Navigate, useNavigate} from 'react-router-dom'
import Login from './Pages/Login';
import MainLayout from './Component/MainLayout';
import Home from './Pages/Home';
import { useEffect, useState } from 'react';
import AddRecette from './Pages/AddRecette';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { createUser, createUserFromGoogle } from './features/auth/authSlice';
import ListRecette from './Pages/RecetteList';
import { getAllRecettes } from './features/recette/recetteSlice';
import SingleRecette from './Component/SignleRecette';
import { OpenRoute } from './Component/Routes/openRoute';
import WhishList from './Component/WhishList';
import DarkMode from './Component/DarkMode';
import MainLayout1 from './Component/MainLayout1';
import {base_url } from './utils/baseUrl'
import Register from './Component/Register';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { PrivateRoute } from './routers/privateRoute';

function App() {

 console.log(base_url)
  const dispatch = useDispatch()

const userstate  = useSelector(state=>state?.auth?.user)

  const [user,setUser] =useState(null)
  useEffect(()=>{
if(userstate)
 { dispatch(getAllRecettes())}
 
  },[dispatch,userstate])
  const userStates = useSelector(state=>state?.auth)
 

//  useEffect(()=>{
    
//   dispatch(createUserFromGoogle())
     
    
//  },[dispatch])
// useEffect(()=>{
//   const getUser = async()=>{
//     try{
//   const url = `http://localhost:5000/api/auth/login/success`;
  
//   const response = await axios.get(url,{withCredentials:true})
//   console.log(response)
//    setUser(response.data.user)

//   console.log(user)  
//   }catch(err){
//   console.log(err)
//     }
//    }
//    getUser()

// },[])
// useEffect(()=>{
//   console.log(user)
// if(user){
//   dispatch(createUserFromGoogle({firstname:user?.name?.familyName,lastname:user?.name?.givenName, email:user?.emails[0]?.value,googleId:user?.id,pic:user?.photos[0]?.value}))
// }
// },[user,dispatch])
const toogleState = useSelector(state=>state?.toogle?.darkMode)
useEffect(()=>{
 if(toogleState){
  document.body.style.color='black'
 }
},[toogleState])
const [isScreenSmall, setIsScreenSmall] = useState(false);

useEffect(() => {
  const handleResize = () => {
    const isSmall = window.matchMedia("(max-width: 600px)").matches;
    setIsScreenSmall(isSmall);
  };

  // Ajoute un écouteur d'événement pour détecter les changements de taille d'écran
  window.addEventListener("resize", handleResize);

  // Vérifie la taille de l'écran au chargement initial de la page
  handleResize();
  console.log(isScreenSmall)
  // Nettoie l'écouteur d'événement lorsque le composant est démonté
  return () => {
    window.removeEventListener("resize", handleResize);
  };

}, [isScreenSmall]);

// const userState = useSelector(state=>state?.auth?.user)


// useEffect(()=>{
//   if(user){
   
      
//         dispatch(createUser({fullname:user?.displayName, email:user?.emails[0]?.value,googleId:user?.id,secret:user?.provider,pic:user?.photos[0]?.value}))
       
    
//   }
// },[dispatch])


console.log({STORAGE:JSON.parse(localStorage.getItem('customer'))});

  return (
    <BrowserRouter>
  
       <Routes>
            <Route path='/' element={< Login user={user}  />} />
            <Route path='/register' element={<Register/>} />
            <Route path='/myrecette' element={<PrivateRoute><MainLayout1 user={user} isScreenSmall={isScreenSmall} /></PrivateRoute>}>
          
                <Route index  element={<Home user={user}  /> } />
                <Route path='add-recette' element={  <AddRecette/>  } />
                <Route  path='recette-list' element={ <ListRecette  isScreenSmall={isScreenSmall} />} /> 
                <Route  path='recette-details/:id' element={<SingleRecette  isScreenSmall={isScreenSmall}/>} />
                <Route  path='update/:id' element={<AddRecette/>} />
                <Route path='wishList' element={<WhishList/>} />
                
            </Route> 
            
       </Routes>
       {/* {userstate && <DarkMode/> } */}
       <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
