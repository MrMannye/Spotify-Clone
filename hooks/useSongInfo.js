import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify"

function useSongInfo() {
    const spotifyAPI = useSpotify();

    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [songInfo, setSongInfo] = useState(null);

    useEffect(() => {
        const fethcSong = async () => {
            if(currentTrackId){
                const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentTrackId}`,{
                    headers: {
                        Authorization: `Bearer ${spotifyAPI.getAccessToken()}`
                    }
                }).then(res => res.json());
                setSongInfo(trackInfo);
            }
        }
        fethcSong();
    },[currentTrackId, spotifyAPI])

    return songInfo
}

export default useSongInfo