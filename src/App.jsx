import React, { createContext, useContext, useEffect, useState } from 'react';
import './App.css'
import {db} from "./config/firebaseConfig"
import { collection, getDocs, doc, setDoc, addDoc, getDoc, onSnapshot } from 'firebase/firestore'
import Chat from './layouts/Chat'
import ListChat from './layouts/ListChat'
import { handleLogin, handleSignOut, userInfo } from './layouts/information';


const MyContext = createContext()

function App() {
    const [salas, setSalas] = useState([])
    const [userInformation, setUserInformation] = useState(null)
    const [salaAtual, setSalaAtual] = useState("")


  async function handleClickSignOut (){
    const signOut = await handleSignOut().then(()=>{
      setSalaAtual(null)
      setUserInformation(userInfo)

    })

    
  }

  async function handleClickLogin () {
    const login = await handleLogin().then((user)=>{
        setUserInformation(userInfo)
        console.log(salaAtual);
    })
};



  return (
    
      <div className='flex flex-row'>
        <MyContext.Provider value={{handleClickLogin, userInformation,
          setUserInformation, handleClickSignOut, salas, setSalas, salaAtual
          , setSalaAtual }}>
          <div className='w-[30%]'>
            <ListChat/>
          </div>
          <div className='w-full'>
            <Chat/>
          </div>
        </MyContext.Provider>
      </div>
  )
}

export const useMyContext = () => useContext(MyContext)
export default App
