import React, { useEffect } from 'react'
import { auth, db } from '../config/firebaseConfig';
import {addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc} from "firebase/firestore";
const path = collection(db, "salas")
import { useMyContext } from '../App'

 const ListChat = () => {
  const {salas, setSalas, setSalaAtual, userInformation} = useMyContext();

  async function getm(){

    const docData = query(path)
    const take = await getDocs(docData)
    let salasArr = []
    take.forEach((doc)=>{
      salasArr.push(doc.id)
    })
    setSalas(salasArr);

  }

  function salaAtt(doc){
    setSalaAtual(doc);
  }

console.log(userInformation);

  useEffect(()=>{
    getm()
  }, [])

  return (
    <div className='h-[100vh] bg-CorSecundaria'>
        <div className='h-[100vh] flex flex-col items-center pt-[10vh]'>
            <div className='h-[90%] w-full gap-3 flex flex-col items-center overflow-auto'> 

            {/*Nome das salas */}
            {
              userInformation &&
              salas.map((doc, index)=>{
                return(
                <div key={index}
                  className='w-[90%] h-[6%] text-[1.5rem] flex items-center 
                  bg-CorNeutra cursor-pointer px-3 text-ellipsis custom-hadow
                  '
                  onClick={()=>salaAtt(doc)}
                  > <p className='w-full whitespace-nowrap overflow-hidden text-ellipsis'>
                      {doc}</p>
                </div>
                )
              })
            }

            </div>

            <div className=' w-[90%] h-[8%] flex
            items-center font-Oswald text-[2rem]
            '>
                {/* Nome do usuario no firebase */}
                <p>{userInformation && userInformation.userName}</p></div>
        </div>
    </div>
  )
}

export default ListChat