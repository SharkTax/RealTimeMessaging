
import { auth } from '../config/firebaseConfig'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

const provider = new GoogleAuthProvider()

let userInfo = {}

    const handleLogin =async ()=>{
        await signInWithPopup(auth, provider).then((result)=>{
            const credential = GoogleAuthProvider.credentialFromResult(result);
            userInfo = {
                token : credential.accessToken,
                userName : result.user.displayName,
                userEmail : result.user.email
            }

        }).catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            
            console.log(errorCode, errorMessage);
        })
    }

    const handleSignOut =async ()=>{
        await signOut(auth).then(()=>{
            userInfo = null
        })
    }


export  {handleLogin, handleSignOut , userInfo};
