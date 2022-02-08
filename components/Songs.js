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
    const changeDate = (data) => {
        let date = new Date();
        return date.toUTCString(data)
    }

    return (
    <div className='px-8 py-4 mt-4 text-gray-400'>
        <div className='flex items-center space-x-8'>
            {
                mode ? <PauseIcon className='bg-green-500 hover:scale-105 w-12 h-12 hover:bg-green-600 rounded-full p-2 text-black' onClick={handleChange}></PauseIcon> : <PlayArrowIcon className='bg-green-500 hover:scale-105 hover:bg-green-600 w-12 h-12 rounded-full p-2 text-black' onClick={handleChange}></PlayArrowIcon>
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
                <AccessTimeIcon className='h-4 w-4'></AccessTimeIcon>
            </div>
        </div>

        <div className='px-2 mt-4'>
            {playlist?.tracks.items.map((item, i) => {
                return(
                    <div className='flex py-2 group my-0 px-4 items-center my-4 justify-between hover:bg-gray-300 hover:bg-opacity-10'>
                        <div className='flex items-center space-x-3'>
                            <div className='relative -mr-2'>
                                <PlayArrowIcon className='relative opacity-0 group-hover:opacity-100 right-1 w-5 -ml-1 mr-1 text-white'/>
                                <p className='absolute group-hover:opacity-0 top-1 left-0 -ml-1 mr-1 text-sm'>{i + 1}</p>
                            </div>
                            
                            <img src={item.track?.album?.images[0].url} alt="Image Music" className='h-8 w-8' />
                            <div className='flex flex-col justify-center'>
                                <p className='text-white text-sm truncate w-36'>{item.track?.name}</p>
                                <span className='text-xs group-hover:text-white'>{item.track?.album?.artists?.[0].name}</span>
                            </div>
                        </div>

                        <div className='flex items-center justify-between flex-[.86] text-xs'>
                            <span className='w-36 truncate'>{item.track?.album?.name}</span>
                            <span className='-ml-36'>{(item.track?.album?.release_date)}</span>
                            <span>3:19</span>
                        </div>

                    </div>
                )
            })}
        </div>

    </div>
    );
}

export default Songs;
