import React, { createContext, useContext, useEffect, useState } from 'react';
import Header from './Header'
import Conversation from './Conversation'

const Chat = () => {

  return (
    <div className='w-full h-full'>
        <div className='top-0 h-full'>
            <Header/>
            <Conversation/>
        </div>
    </div>
  )
}
export default Chat