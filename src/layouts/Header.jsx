import React, { useEffect, useState } from 'react'
import { useMyContext } from '../App'


const Header = () => {
    const {handleClickLogin, userInformation, handleClickSignOut, salaAtual} = useMyContext();

    return (
        <div className='w-full bg-CorSecundaria flex flex-row justify-between
        h-[10vh] items-center custom-hadow px-4'>
            <h1 className='text-[1.5rem]'>{salaAtual}</h1>
            {
                userInformation != null 
                ? 
                (
                <div className='flex flex-row w-[30%] gap-3'>
                <h3 className='text-[1.5rem] w-[50%] bg-CorNeutra text-center 
                custom-hadow rounded-md
                '>{userInformation.userName}</h3>
                <h3
                onClick={handleClickSignOut}
                className='w-[50%] text-[1.5rem] bg-CorPrincipal text-CorNeutra
                rounded-md flex items-center justify-center custom-hadow cursor-pointer
                '>SignOut</h3>
                </div>) 
                
                : 
                
                (
                <h3
                onClick={handleClickLogin}
                className='text-[1.5rem] w-[10%] bg-CorNeutra text-center 
                custom-hadow rounded-md cursor-pointer
                '>Login</h3>)
            }
            
        </div>
    )
}

export default Header