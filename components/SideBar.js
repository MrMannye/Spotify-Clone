import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    ArrowCircleDownIcon
} from '@heroicons/react/outline'
import {
    HomeIcon as Home,
    SearchIcon as Search,
    LibraryIcon as Library,
    HeartIcon
} from '@heroicons/react/solid'
import { useState, useEffect } from 'react'
import {useSession, signOut} from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'

export default function SideBar() {

    const spotifyApi = useSpotify();
    const {data: session, status} = useSession();
    const [playlist, setPlaylist] = useState([]);
    const [option, setOption] = useState(true);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylist(data.body.items)
            })
        }
    },[session, spotifyApi])

    console.log(playlistId);
    const handleOption = () => {
        setOption(!option);
    }


    return (
        <div className="w-64 bg-black text-gray-400 space-y-2 text-xs h-screen">

            <div className='p-6'>
                <img src="/spotify-white.png" className='w-28 object-contain' loading='lazy' alt="Logo Spotify" />
            </div>

            <div className="flex flex-col space-y-3 pl-5">
                <button onClick={handleOption} className={`flex items-center space-x-3 hover:text-white transition-all duration-300 ${!option && 'text-white'}`}>
                    {option ? <HomeIcon className="h-6 w-6" /> : <Home className="h-6 w-6" />}
                    <p className="font-extrabold">Inicio</p>
                </button>
                <button onClick={() => signOut({callbackUrl: "/login"})} className="flex items-center space-x-3 hover:text-white transition-all duration-300">
                    <SearchIcon className="h-6 w-6" />
                    <p className="font-extrabold">Buscar</p>
                </button>
                <button className="flex items-center space-x-3 hover:text-white transition-all duration-300">
                    <LibraryIcon className="h-6 w-6" />
                    <p className="font-extrabold">Tu biblioteca</p>
                </button>
            </div>

            <div className="flex flex-col space-y-3 pl-5 pt-6">
                <button className="flex items-center space-x-3 hover:text-white transition-all duration-300">
                    <PlusCircleIcon className="h-6 w-6" />
                    <p className=" font-extrabold">Crear lista</p>
                </button>
                <button className="flex items-center space-x-3 hover:text-white transition-all duration-300">
                    <HeartIcon className="h-6 w-6" />
                    <p className="font-extrabold truncate w-28">Canciones que te gustan</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900 mr-6' />
            </div>

            <div className='flex flex-col space-y-3 pl-5 h-60 pt-2 overflow-y-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-black'>
                {playlist.map((item) => {
                    return (
                        <button key={item.id} onClick={() => setPlaylistId(item.id)} className="flex items-center w-40 hover:text-white transition-all duration-300">
                            <p className=" font-normal truncate">{item.name}</p>
                        </button>
                    )
                })}
            </div>
            
            <div className="flex flex-col space-y-3 pl-4 p-2">
                <button className="flex items-center space-x-3 hover:text-white transition-all duration-300">
                    <ArrowCircleDownIcon className="h-5 w-5" />
                    <p className=" font-bold">Instalar app</p>
                </button>
            </div>
        </div>
    )
}
