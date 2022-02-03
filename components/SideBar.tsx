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
import type { AppProps } from 'next/app'
import { useState } from 'react'

export default function SideBar() {

    const [option, setOption] = useState(true);
    const handleOption = () => {
        setOption(!option);
    }

    const DATA = [
        "Manu's Song",
        "Study Beats 📚",
        "Leer el nombre de las canciones",
        "lofi hip hop music - beats",
        "Chillhop Radio 👣",
        "Workout Music 2022 💡",
        "Sad 💔",
        "🧮",
        "T de Troye 👀",
        "Ariana bb 💓"
    ]

    return (
        <div className="h-screen w-52 bg-black text-gray-400 space-y-2 text-xs">

            <div className='p-6'>
                <img src="/spotify-white.png" className='w-28 object-contain' loading='lazy' alt="Logo Spotify" />
            </div>

            <div className="flex flex-col space-y-3 pl-5">
                <button onClick={handleOption} className={`flex items-center space-x-3 hover:text-white transition-all duration-300 ${!option && 'text-white'}`}>
                    {option ? <HomeIcon className="h-6 w-6" /> : <Home className="h-6 w-6" />}
                    <p className="font-extrabold">Inicio</p>
                </button>
                <button className="flex items-center space-x-3 hover:text-white transition-all duration-300">
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

            <div className='flex flex-col space-y-3 pl-5 pt-2 h-72 overflow-y-auto'>
                {DATA.map((item) => {
                    return (
                        <button className="flex items-center w-40 hover:text-white transition-all duration-300">
                            <p className=" font-normal truncate">{item}</p>
                        </button>
                    )
                })}
            </div>
            
            <div className="flex flex-col space-y-3 pl-5">
                <button className="flex items-center space-x-3 hover:text-white transition-all duration-300">
                    <ArrowCircleDownIcon className="h-5 w-5" />
                    <p className=" font-extrabold">Instalar app</p>
                </button>
            </div>
        </div>
    )
}
