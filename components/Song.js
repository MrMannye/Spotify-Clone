import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { DotsHorizontalIcon } from '@heroicons/react/outline'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function Song({item, order}) {

    const spotifyAPI = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setisPlaying] = useRecoilState(isPlayingState);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const playSong = () => {
        setCurrentTrackId(item.track.id)
        setisPlaying(true);
        spotifyAPI.play({
            uris:[item.track.uri],
        })
    }

    const changeDate = (data) => {
        let date = new Date(data);
        let formatted_date = date.getDate() + " " + months[date.getMonth()].toLowerCase() + " " + date.getFullYear()
        return formatted_date
    }
    const msToTime = (duration) => {
        var seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),

            minutes = (minutes < 10) ? + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
            return minutes + " :" + seconds;
    }

    return (
        <div onClick={playSong} className='grid grid-cols-2 py-2 group px-4 items-center justify-between hover:bg-gray-300 hover:bg-opacity-10'>
            <div className='flex items-center space-x-3'>
                <div className='relative -mr-2'>
                    <PlayArrowIcon className='relative opacity-0 group-hover:opacity-100 right-1 w-5 -ml-1 mr-1 text-white' />
                    <p className='absolute group-hover:opacity-0 top-1 left-0 -ml-1 mr-1 text-sm'>{order + 1}</p>
                </div>

                <img src={item.track?.album?.images[0].url} alt="Image Music" className='h-8 w-8' />
                <div className='flex flex-col justify-center'>
                    <p className='text-white text-sm truncate w-36'>{item.track?.name}</p>
                    <span className='text-xs group-hover:text-white'>{item.track?.album?.artists?.[0].name}</span>
                </div>
            </div>

            <div className='flex items-center justify-between text-xs -ml-20'>
                <span className='w-36 text-sm truncate group-hover:text-white hover:underline cursor-pointer'>{item.track?.album?.name}</span>
                <span className='-ml-4'>{changeDate(item.added_at)}</span>
                <div className='flex items-center space-x-3'>
                    <FavoriteBorderIcon style={{fontSize: 15}} className='cursor-pointer hover:text-white mt-1 text-gray-400 opacity-0 group-hover:opacity-100' />
                    <span>{msToTime(item.track?.duration_ms)}</span>
                    <DotsHorizontalIcon style={{fontSize: 15}} className='cursor-pointer w-4 hover:text-white text-gray-400 opacity-0 group-hover:opacity-100'></DotsHorizontalIcon>
                </div>
            </div>

        </div>
    )
}

export default Song