import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import {debounce} from 'lodash'
import useSpotify from "../hooks/useSpotify"
import useSongInfo from '../hooks/useSongInfo'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import MicNoneIcon from '@mui/icons-material/MicNone';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import SpeakerIcon from '@mui/icons-material/Speaker';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';

export default function Player (){

    const spotifyAPI = useSpotify();
    const {data: session, status} = useSession();

    const [mouse, setMouse] = useState(false);
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50); 

    const songInfo = useSongInfo();
    const fetchCurrentSong = () => {
        if(!songInfo){
            spotifyAPI.getMyCurrentPlayingTrack().then(data => {
                setCurrentTrackId(data.body?.item?.id)
                spotifyAPI.getMyCurrentPlaybackState().then(data => {
                    setIsPlaying(data.body?.is_playing)
                })
            })
        }
    }
    
    const handlePlay = () => {
        spotifyAPI.getMyCurrentPlaybackState().then(data => {
            if(data.body.is_playing){
                spotifyAPI.pause();
                setIsPlaying(false);
            } else{
                spotifyAPI.play();
                setIsPlaying(true);
            }
        })
    }

    useEffect(() => {
        if(spotifyAPI.getAccessToken() && !currentTrackId){
            fetchCurrentSong();
            setVolume(50);
        }
        console.log(songInfo);
    }, [currentTrackId,spotifyAPI,session])
    
    useEffect(() => {
        if(volume > 0 && volume < 100){
            debounceAdjustVolume(volume)
        }
    },[volume])

    const msToTime = (duration) => {
        var seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),

            minutes = (minutes < 10) ? + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
            return minutes + " :" + seconds;
    }

    const debounceAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyAPI.setVolume(volume).catch(err => {});
        },500), []
    );

    return(
        <div className='bg-black p-4 flex items-center justify-between'>
            {/* Left */}
            <div className="flex items-center space-x-3 flex-[.20]">
                <img className="h-12 w-12" src={songInfo?.album.images?.[0].url} alt="Image Playing Track" />
                <div className="flex items-center space-x-4">
                    <div>
                        <p className='text-white truncate text-xs -mb-2 hover:underline cursor-pointer'>{songInfo?.name}</p>
                        <span className='text-[10px] truncate text-gray-400 hover:underline'>{songInfo?.artists?.[0]?.name}</span>
                    </div>
                    <FavoriteBorderIcon style={{fontSize: 15}} className=' w-4 text-gray-400 hover:text-white' />
                    <LaptopChromebookIcon style={{fontSize: 15}} className='w-4 text-gray-400 hover:text-white' />
                </div>
            </div>
            <div className="flex flex-col items-center space-y-3 flex-1">
                {/* Top Buttons */}
                <div className="flex items-center space-x-4">
                    <ShuffleIcon className='h-4 w-4 text-gray-400 hover:text-white' />
                    <SkipPreviousIcon className='h-7 w-7 text-gray-400 hover:text-white' />
                    <PlayArrowIcon className='h-8 w-8 p-1 text-black bg-gray-200 rounded-full' />
                    <SkipNextIcon className='h-7 w-7 text-gray-400 hover:text-white' />
                    <RepeatIcon className='h-4 w-4 text-gray-400 hover:text-white' />
                </div>
                {/* Reproducer Time */} 
                <div className="flex items-center space-x-2">
                    <p className="text-[9px] text-gray-400">0: 00</p>
                    <input onMouseEnter={() => setMouse(!mouse)} onChange={e => setVolume(Number(e.target.value))} onMouseLeave={() => setMouse(!mouse)} type="range" value={volume} min={0} max={100} className='w-[22rem] range_progress bg-black'/>
                    <p className="text-[9px] text-gray-400">{msToTime(songInfo?.duration_ms)}</p>
                </div>
            </div>
            <div className='flex items-center space-x-3'>
                <MicNoneIcon style={{fontSize: 18}} className='w-5 text-gray-400 hover:text-white' />
                {isPlaying?
                    <PlaylistAddCheckIcon onClick={handlePlay} style={{fontSize: 20}} className='w-5 text-gray-400 hover:text-white' />
                    :
                    <PauseIcon onClick={handlePlay} className='h-5 w-5 text-gray-400 hover:text-white' />
                }
                <SpeakerIcon style={{fontSize: 18}} className='w-5 text-gray-400 hover:text-white' />
                <VolumeDownIcon style={{fontSize: 17}} className='w-5 text-gray-400 hover:text-white' />
                <input onMouseEnter={() => setMouse(!mouse)} onChange={e => setVolume(Number(e.target.value))} onMouseLeave={() => setMouse(!mouse)} type="range" value={volume} min={0} max={100} className={`${mouse ? 'range_button' :  'range' }`} />
            </div>
        </div>
    )
}