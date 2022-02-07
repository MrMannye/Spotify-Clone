import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'
import { playlistAtom } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import Songs from './Songs'


const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500"
]

export default function Center() {
    const { data: session } = useSession();
    const [color, setColor] = useState(null)
    const spotifyApi = useSpotify();
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistAtom)

    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [playlistId])

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body)
        }).catch(err => {
            console.log(err.message);
        })
        console.log(playlist)
    },[spotifyApi, playlistId])

    return (
        <div className={`text-white bg-gradient-to-b to-black ${color} w-full overflow-y-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-black`}>
            <header className={`flex items-center justify-between p-3 px-6 pl-7`}>
                <div className='flex space-x-4'>
                    <ChevronLeftIcon className='h-7 p-1 bg-gray-800 rounded-full cursor-pointer'/>
                    <ChevronRightIcon className='h-7 p-1 bg-gray-600 opacity-50 rounded-full cursor-pointer'/>
                </div>

                <div className='flex items-center space-x-6'>
                    <div className='flex items-center bg-gray-800 cursor-pointer hover:bg-black hover:scale-105 rounded-full space-x-2 p-2 px-8 border-[1px] border-white'>
                        <h2 className='text-[11px] tracking-widest text-gray-300 font-extrabold'>MEJORAR TU CUENTA</h2>
                    </div>
                    <div className='flex items-center bg-gray-800 cursor-pointer rounded-full space-x-2 p-[3px]'>
                        <img src={session?.user?.image} alt="Imagen Avatar" className='rounded-full w-6 h-6'/>
                        <h2 className='text-xs text-white font-extrabold'>{session?.user?.name}</h2>
                        <ChevronDownIcon className='h-5 w-5'/>
                    </div>
                </div>
            </header>

            <div className='p-3 px-6 mt-10 pl-7 flex items-center'>
                <img src={playlist?.images?.[0]?.url} alt="Image Playlist" className='w-44 h-44 shadow-2xl' />
                <div className='ml-6 flex flex-col items-start mt-8'>
                    <p className='text-[11px] font-bold -mb-3'>LISTA</p>
                    <h1 className='font-bold text-[80px]'>{playlist?.name}</h1>
                    <div className='flex items-center space-x-1 text-xs'>
                        <p className='font-semibold'>{playlist?.owner?.display_name} • </p>
                        <p className='text-gray-300'> {playlist?.tracks?.items.length} canciones, 4hr 20min </p>
                    </div>
                </div>
            </div>
            
            <Songs></Songs>

        </div>
    );
}
