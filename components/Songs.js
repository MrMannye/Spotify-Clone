import React, { useState } from 'react';
import { DotsHorizontalIcon } from '@heroicons/react/outline'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useRecoilValue } from 'recoil';
import { playlistAtom } from '../atoms/playlistAtom';
import Song from './Song'

function Songs() {

    const [mode, setMode] = useState(false);
    const playlist = useRecoilValue(playlistAtom);

    const handleChange = () => {
        setMode(!mode);
    }
    
    return (
        <div className='px-8 mr-4 py-4 mt-4 text-gray-400'>
            <div className='flex items-center space-x-8'>
                {
                    mode ? <PauseIcon style={{fontSize: 48}} className='bg-green-500  hover:scale-105 hover:bg-green-600 rounded-full p-2 text-black' onClick={handleChange}></PauseIcon> : <PlayArrowIcon style={{fontSize: 48}} className='bg-green-500 hover:scale-105 hover:bg-green-600 rounded-full p-2 text-black' onClick={handleChange}></PlayArrowIcon>
                }
                <DotsHorizontalIcon className='h-6 w-6 cursor-pointer text-gray-400'></DotsHorizontalIcon>
            </div>
            <div className='grid grid-cols-2 text-xs px-8 pr-10 border-b-[1px] border-gray-300 mt-8 border-opacity-30'>
                <div className='pb-2 flex items-center space-x-3'>
                    <p>#</p>
                    <p>TÍTULO</p>
                </div>
                <div className='flex justify-between -ml-20 items-center space-x-10 pb-2'>
                    <p className='w-36'>ÁLBUM</p>
                    <p className='w-28 truncate'>FECHA INCORPORACION</p>
                    <AccessTimeIcon className='h-4 w-4'></AccessTimeIcon>
                </div>
            </div>

            <div className='mt-4'>
                {playlist?.tracks.items.map((item, i) => {
                    return (
                        <Song item={item} order={i}></Song>
                    )
                })}
            </div>

        </div>
    );
}

export default Songs;
