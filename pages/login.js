import React from 'react';
import { getProviders, signIn} from 'next-auth/react'

function Login({providers}) {
    return (
        <div className='bg-black h-screen flex flex-col items-center justify-center'>
            <img className='w-60 mb-6' src="https://marcas-logos.net/wp-content/uploads/2019/11/Spotify-logo.png" alt="Logo Spotify" />
            {console.log(Object.values(providers))}
            {Object.values(providers).map((provider) => (
                <div key={provider.id}>
                    <button 
                        className='text-black bg-green-400 p-2 rounded-md font-medium px-3 hover:bg-green-600 hover:text-white transition-all duration-300'
                        onClick={() => signIn(provider.id, {callbackUrl: "/"})}
                    >
                        Login with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Login;

export async function getServerSideProps(){
    const providers = await getProviders();
    return {
        props: {
            providers,
        }
    }
}
