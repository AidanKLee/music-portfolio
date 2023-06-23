import React, { useEffect, useRef, useState } from "react";
import player from "../../assets/js/MusicPlayerTracks";

console.log(player.library)
player.initialise();

export default function Player() {

    const [ playing, setPlaying ] = useState(false);
    const [ playerMousePos, setPlayerMousePos ] = useState(0);
    const [ trackList, setTrackList ] = useState(player.library.getTracks());
    const [ duration, setDuration ] = useState('0:00');
    const [ currentTime, setCurrentTime ] = useState('0:00');
    const [ trackPlayed, setTrackPlayed ] = useState(0);

    useEffect(() => {
        player.audio.addEventListener('play', e => {
            if (player.audioContext.state === 'suspended') {
                player.audioContext.resume();
            }
            setPlaying(true);
        });

        player.audio.addEventListener('pause', e => setPlaying(false));

        player.audio.addEventListener('loadedmetadata', e => {
            setDuration(player.getFormattedTimeString(player.audio.duration));
        });

        player.audio.addEventListener('timeupdate', e => {
            setCurrentTime(player.getFormattedTimeString(player.audio.currentTime));
            setTrackPlayed((player.audio.currentTime / player.audio.duration) * 100);
        })
    }, [])

    function handleMouseLeave(e) {
        setPlayerMousePos(0);
    }

    function handleMouseMove(e) {
        const leftPos = e.currentTarget.getBoundingClientRect().left;
        const mousePos = e.pageX;
        const pixelPos = mousePos - leftPos + 1;

        setPlayerMousePos(pixelPos);
    }

    function handleNextClick(e) {
        const nextTrack = player.getNextTrack();
        player.playTrackById(nextTrack.id);
    }

    function handlePrevClick(e) {
        const prevTrack = player.getPrevTrack();
        player.playTrackById(prevTrack.id);
    }

    function handleProgressClick(e) {
        const leftPos = e.currentTarget.getBoundingClientRect().left;
        const mousePos = e.pageX;
        const elementWidth = e.currentTarget.getBoundingClientRect().width;
        const pixelPos = mousePos - leftPos + 1;
        const percent = pixelPos / elementWidth;
        const time = player.audio.duration * percent;

        player.audio.currentTime = time;
    }

    function handleTrackClick(e) {
        e.stopPropagation();

        const trackId = e.currentTarget.dataset.id;

        player.playTrackById(trackId);

        player.audio.addEventListener('durationchange', e => {
            setDuration(player.getFormattedTimeString(player.audio.duration));
        });
    }

    function togglePlay(e) {
        if (player.audio.paused) {
            player.audio.play();
        } else {
            player.audio.pause();
        }
    }

    return (
        <div className="bg-gray-900 text-white sm:max-w-screen-sm md:max-w-screen-md border-2 border-gray-700 rounded-lg overflow-hidden mx-auto">
            <div className="flex items-stretch">
                <div className="flex items-center gap-2 p-4">
                    <button
                        className="block bg-orange-600 rounded-full duration-300 hover:bg-orange-400 active:scale-90"
                        onClick={handlePrevClick}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="M220-240v-480h60v480h-60Zm520 0L394-480l346-240v480Z"/></svg>
                    </button>
                    <button 
                        className="block bg-orange-600 rounded-full duration-300 hover:bg-orange-400 active:scale-90" 
                        onClick={togglePlay}
                        >
                        {
                            playing ? (
                                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" fill="currentColor"><path d="M555-200v-560h175v560H555Zm-325 0v-560h175v560H230Z"/></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" fill="currentColor"><path d="M320-203v-560l440 280-440 280Z"/></svg>
                            )
                        }
                    </button>
                    <button
                        className="block bg-orange-600 rounded-full duration-300 hover:bg-orange-400 active:scale-90"
                        onClick={handleNextClick}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="M680-240v-480h60v480h-60Zm-460 0v-480l346 240-346 240Z"/></svg>
                    </button>
                </div>
                <button
                    className="relative flex grow bg-gray-700 cursor-pointer" 
                    onMouseMove={handleMouseMove} 
                    onMouseLeave={handleMouseLeave}
                    onClick={handleProgressClick}
                    >
                    <div className="absolute text-xs top-0 right-0 m-1">{currentTime} / {duration} </div>
                    <div className="absolute top-0 left-0 h-full bg-white opacity-10" style={{ width: `${trackPlayed}%` }}></div>
                    <div className="absolute top-0 left-0 h-full bg-white opacity-10" style={{ width: `${playerMousePos}px` }}></div>
                    <div className="h-1 bg-gray-600 w-full mt-auto rounded-r-md"></div>
                </button>
            </div>
            <div className="tracklist bg-gray-950 max-h-[440px] overflow-y-auto">
                <div>
                    {
                        trackList.map((track, i) => {
                            return (
                                <button 
                                    className={(player.playing.id === track.id ? 'bg-gray-800 ' : '') + "flex justify-between items-center w-full p-1 border-b border-slate-900 overflow-hidden hover:bg-gray-900"} 
                                    key={track.id} 
                                    onClick={handleTrackClick}
                                    data-id={track.id}
                                    >
                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                        <img className="h-10 w-10" src={track.artwork} alt={track.album.name} />
                                        <p className="font-bold text-slate-500">{i + 1}</p>
                                        <p className="shrink text-left text-xs whitespace-nowrap overflow-hidden text-ellipsis">{track.name}</p>
                                    </div>
                                    <p className="text-xs text-slate-500 hidden sm:block">{track.album.name}</p>
                                </button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}