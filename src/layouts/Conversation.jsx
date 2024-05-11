import React, { useEffect, useRef, useState } from 'react'
import { auth, db } from '../config/firebaseConfig';
import {addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc} from "firebase/firestore";
import { useMyContext } from '../App'

const Conversation = () => {
    const {userInformation, salaAtual, salas} = useMyContext()
    const [messages, setMessages] = useState([])
    const path = collection(db, `salas/${salaAtual ? salaAtual : salas[0]}/Menssagens`)
    const [inputMessage, setInputMessage] = useState("")

    const inpRef = useRef(null)

    async function getMessages(){
        const docData = query(path)
        const docsFromMessages = await getDocs(docData)
        let updateMessage = []
        docsFromMessages.forEach((doc)=>{
            updateMessage.push(doc.data())
        })

        updateMessage.sort((a, b) => (a.dateTime.seconds - b.dateTime.seconds))
        setMessages(updateMessage)
        
    }
    
    useEffect(()=>{

        if(userInformation){
            async function takeMessages(){
                await getMessages()
            }
    
            takeMessages()
        }else{
            return
        }

        console.log(messages);

    },[salaAtual])

    useEffect(()=>{
        const auto = onSnapshot(path, (doc)=>{
            let messagesUpdate = [];
            doc.forEach((doc)=>{
                messagesUpdate.push({...doc.data()})
            })
            messagesUpdate.sort((a, b) => (a.dateTime.seconds - b.dateTime.seconds))
            setMessages(messagesUpdate)
            console.log(messages);
        })

        return ()=>auto()
    }, [salaAtual])


//o botao enviar trigga esse evento
    const handleAddMessage = async ()=>{
        
        await addDoc(path, {
            message: inputMessage,
            dateTime: new Date(),
            user: userInformation.userName,
            email: userInformation.userEmail
        }, {merge: false})
        inpRef.current.value = ""
    }



    return (
    <div className='h-[90vh] w-full bg-CorPrincipal p-6'>

        <div className='h-[90%] w-ful flex flex-col gap-[16px]
        p-4 overflow-auto
        '>

        {
            userInformation === null ? 
            <h1 className='text-center text-5xl h-full flex justify-center items-center'>Faca login</h1> 
            :

                messages.map((data, index) => {
                    const hourServer  = new Date(data.dateTime.seconds * 1000 + data.dateTime.seconds / 1000000).getHours();
                    const minuts = new Date(data.dateTime.seconds * 1000 + data.dateTime.seconds / 1000000).getMinutes();
                        
                    if (data.user === userInformation.userName) {
                            return (
                                <div key={index} className='w-[100%] flex'>
                                    <span className='w-[60%]'></span>
                                    <div className='w-[40%] bg-CorNeutra rounded-md min-h-[2rem] p-2 pb-[15px] flex flex-col relative custom-hadow'>
                                        <p className='text-CorTexto'>{data.message}</p>
                                        <span className='text-[.8rem] absolute right-[.5rem] bottom-[3px]'>{hourServer}:{minuts}</span>
                                    </div>
                                </div>
                            );
                        } else if(data.user !== userInformation.userName){
                            return (
                                <div key={index} className='w-[100%] flex'>
                                    <div className='w-[40%] bg-CorNeutra rounded-md relative min-h-[2rem] p-2 pb-[15px] flex flex-col custom-hadow'>
                                        <p className='text-CorTexto'>{data.message}</p>
                                        <span className='text-[.8rem] absolute right-[.5rem] bottom-[3px]'>{hourServer}:{minuts}</span>
                                    </div>
                                    <span className='w-[60%]'></span>
                                </div>
                            );
                        }
                    })
        }
            
        </div>

        <div className=' flex justify-center items-center h-[10%]
        gap-4
        '>
            <input
            onChange={(e)=>{setInputMessage(e.target.value)}}
            ref={inpRef}
            disabled = {userInformation ? false : true}
            className={`w-[80%] h-[80%] ${userInformation ? "bg-CorNeutra" : "bg-slate-500"} rounded-md
            px-[.5rem] custom-hadow text-CorTexto
            ' type="text" placeholder='Digite sua menssagem`} />
            <button
            disabled = {!userInformation || inputMessage === ""}
            onClick={handleAddMessage}

            className={`${userInformation ? "bg-CorIntermediaria" : "bg-slate-500"} w-[20%] h-[80%] font-Oswald
            rounded-md text-[1.6rem] custom-hadow`}
            >
                
                
            Enviar</button>
        </div>
        
    </div>
  )
}

export default Conversation