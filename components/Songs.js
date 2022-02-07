import React, { useState } from 'react';
import {DotsHorizontalIcon} from '@heroicons/react/outline'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useRecoilValue } from 'recoil';
import { playlistAtom } from '../atoms/playlistAtom';

function Songs() {

    const [mode, setMode] = useState(false);
    const [counter, setCounter] = useState(1);
    const playlist = useRecoilValue(playlistAtom);

    const handleChange= () => {
        setMode(!mode);
    }

    return (
    <div className='px-8 py-4 mt-4 text-gray-400'>
        <div className='flex items-center space-x-8'>
            {
                mode ? <PauseIcon className='bg-green-500 w-12 h-12 rounded-full p-2 text-black' onClick={handleChange}></PauseIcon> : <PlayArrowIcon className='bg-green-500 w-12 h-12 rounded-full p-2 text-black' onClick={handleChange}></PlayArrowIcon>
            }           
            <DotsHorizontalIcon className='h-6 w-6 cursor-pointer text-gray-400'></DotsHorizontalIcon>
        </div>
        <div className='flex justify-between items-center text-xs px-6 border-b-[1px] border-gray-300 mt-8 border-opacity-30'>
            <div className='pb-2 flex items-center space-x-3'>
                <p>#</p>
                <p>TÍTULO</p>
            </div>
            <div className='flex flex-[.66] justify-between items-center space-x-10 pb-2'>
                <p className=''>ÁLBUM</p>
                <p className='w-28 truncate'>FECHA INCORPORACION</p>
                <AccessTimeIcon className='h-5 w-5'></AccessTimeIcon>
            </div>
        </div>

        <div className='px-6 mt-4'>
            {playlist?.tracks.items.map((item, i) => {
                return(
                    <div className='flex my-4'>
                        <div className='flex items-center space-x-3'>
                            <p>{i + 1}</p>
                            <img src={item.track?.album?.images[0].url} alt="Image Music" className='h-8 w-8' />
                            <div>
                                <p className='text-white text-sm'>{item.track?.name}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>

    </div>
    );
}

export default Songs;
