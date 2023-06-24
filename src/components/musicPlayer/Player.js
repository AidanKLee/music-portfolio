import React, { useEffect, useMemo, useState } from "react";
import player from "../../assets/js/MusicPlayerTracks";

player.initialise();

export default function Player() {

    const [ playing, setPlaying ] = useState(false);
    const [ playerMousePos, setPlayerMousePos ] = useState(0);
    const [ trackListName, setTrackListName ] = useState('All Tracks');
    const [ trackList, setTrackList ] = useState(player.library.getTracks());
    const [ duration, setDuration ] = useState('0:00');
    const [ currentTime, setCurrentTime ] = useState('0:00');
    const [ trackPlayed, setTrackPlayed ] = useState(0);
    const [ repeat, setRepeat ] = useState(false);
    const [ shuffle, setShuffle ] = useState(false);
    const [ menu, setMenu ] = useState(false);

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
        });

        player.audio.addEventListener('durationchange', e => {
            setDuration(player.getFormattedTimeString(player.audio.duration));
        });
    }, [])

    useEffect(() => {
        player.audio.addEventListener('ended', handleTrackEnded);

        return () => player.audio.removeEventListener('ended', handleTrackEnded);
    }, [repeat, shuffle])

    function handleAlbumClick(e) {
        const albumId = e.target.dataset.id;
        const albumName = e.target.dataset.name;

        setTrackList(player.library.getAlbumTracksById(albumId));
        setTrackListName(albumName);
    }

    function handleAllTracksClick() {
        player.selectAllTracks();

        setTrackList(player.trackList);
        setTrackListName('All Tracks');
    }

    function handleMenuClick(e) {
        setMenu(!menu);
    }

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

        if (playing) {
            player.playTrackById(nextTrack.id);
        } else {
            player.selectTrack(nextTrack);
        }
    }

    function handlePlaylistClick(e) {
        const playlistId = e.target.dataset.id;
        const playlistName = e.target.dataset.name;

        setTrackList(player.library.getPlaylistTracksById(playlistId));
        setTrackListName(playlistName);
    }

    function handlePrevClick(e) {
        const prevTrack = player.getPrevTrack();

        if (player.audio.currentTime < 1) {
            if (playing) {
                player.playTrackById(prevTrack.id);
            } else {
                player.selectTrack(prevTrack);
            }
        } else {
            player.audio.currentTime = 0;
        }
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

    function handleRepeatClick(e) {
        if (repeat === 'all') {
            setRepeat('one');
        } else if (repeat === 'one') {
            setRepeat(false);
        } else {
            setRepeat('all');
        }
    }

    function handleShuffleClick(e) {
        if (shuffle) {
            setShuffle(false);
            player.unshuffleTrackList();
        } else {
            setShuffle(true);
            player.shuffleTrackList();
        }

        if (isCurrentTrackList) {
            setTrackList(player.trackList);
        }
    }

    function handleTrackClick(e) {
        const trackId = e.currentTarget.dataset.id;

        if (!isCurrentTrackList) {
            player.trackList = trackList;

            if (shuffle) {
                player.playTrackById(trackId);
                player.shuffleTrackList();
                
                return;
            }
        }

        player.playTrackById(trackId);
    }

    function handleTrackEnded(e) {
        const nextTrack = player.getNextTrack();

        if (repeat === 'one') {
            player.audio.play();
        } else if (repeat === 'all') {
            player.playTrackById(nextTrack.id);
        } else {
            if (nextTrack !== player.trackList[0]) {
                player.playTrackById(nextTrack.id);
            } else {
                player.selectTrack(nextTrack);
            }
        }
    }

    const isCurrentTrackList = useMemo(() => {
        if (trackList.length !== player.trackList.length) {
            return false;
        }

        const displayedTrackList = [...trackList].sort((a,b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
        const playerTrackList = [...player.trackList].sort((a,b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);

        for (let i = 0; i < displayedTrackList.length; i ++) {
            if (displayedTrackList[i] !== playerTrackList[i]) {
                return false;
            }
        }

        return true;
    }, [trackList, player.trackList])

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
                <div className="grow relative">
                    <button
                        className="relative flex bg-gray-700 cursor-pointer w-full h-full" 
                        onMouseMove={handleMouseMove} 
                        onMouseLeave={handleMouseLeave}
                        onClick={handleProgressClick}
                        >
                        <canvas className="absolute top-0 left-0 h-full w-full"></canvas>
                        <div className="absolute text-xs top-0 right-0 m-1">{currentTime} / {duration} </div>
                        <div className="absolute top-0 left-0 h-full bg-white opacity-10" style={{ width: `${trackPlayed}%` }}></div>
                        <div className="absolute top-0 left-0 h-full bg-white opacity-10" style={{ width: `${playerMousePos}px` }}></div>
                        <div className="h-1 bg-gray-600 w-full mt-auto rounded-r-md"></div>
                    </button>
                    <div className="absolute bottom-2 right-1 flex gap-1">
                        <button onClick={handleRepeatClick} className="p-2 bg-white bg-opacity-10 rounded-full duration-300 hover:bg-opacity-20">
                            {
                                repeat === 'all' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" className="text-amber-500" fill="currentColor"><path d="M280-80 120-240l160-160 42 44-86 86h464v-160h60v220H236l86 86-42 44Zm-80-450v-220h524l-86-86 42-44 160 160-160 160-42-44 86-86H260v160h-60Z"/></svg>
                                ) : repeat === 'one' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" className="text-amber-500" fill="currentColor"><path d="M280-80 120-240l160-160 42 44-86 86h464v-160h60v220H236l86 86-42 44Zm186-282v-189h-56v-49h105v238h-49ZM200-530v-220h524l-86-86 42-44 160 160-160 160-42-44 86-86H260v160h-60Z"/></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" className="text-gray-400" fill="currentColor"><path d="M280-80 120-240l160-160 42 44-86 86h464v-160h60v220H236l86 86-42 44Zm-80-450v-220h524l-86-86 42-44 160 160-160 160-42-44 86-86H260v160h-60Z"/></svg>
                                )
                            }
                        </button>
                        <button onClick={handleShuffleClick} className="p-2 bg-white bg-opacity-10 rounded-full duration-300 hover:bg-opacity-20">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" className={shuffle ? "text-amber-500" : "text-gray-400"} fill="currentColor"><path d="M581-150v-60h125L522-393l42-43 186 184v-127h60v229H581Zm-389 0-42-43 558-558H581v-60h229v229h-60v-126L192-150Zm203-374L150-768l43-43 245 244-43 43Z"/></svg>
                        </button>
                        <button onClick={handleMenuClick} className="p-2 bg-white bg-opacity-10 rounded-full duration-300 hover:bg-opacity-20">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" className={menu ? "text-amber-500" : "text-gray-400"} fill="currentColor"><path d="M120-240v-60h520v60H120Zm678-52L609-481l188-188 43 43-145 145 146 146-43 43ZM120-452v-60h400v60H120Zm0-208v-60h520v60H120Z"/></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="relative">
                <div className="tracklist bg-gray-950 h-[440px] overflow-y-auto">
                    <div>
                        {
                            trackList.map((track, i) => {
                                return (
                                    <button 
                                        className={(player.playing.id === track.id && isCurrentTrackList ? 'bg-gray-800 ' : '') + "flex justify-between items-center w-full p-1 border-b border-slate-900 overflow-hidden hover:bg-gray-900"} 
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
                <div className={`absolute right-0 top-0 bg-gray-900 h-full w-full duration-300 overflow-hidden ${menu ? 'max-w-xs' : 'max-w-0'}`}>
                    <button onClick={handleAllTracksClick} className={ (trackListName === 'All Tracks' ? 'text-amber-500 ' : '') + "font-bold text-sm m-4 mb-0"}>All Tracks</button>
                    <h2 className="font-bold text-sm p-4 pb-2">Albums</h2>
                    {
                        player.library.getAlbums().map(album => {
                            return (
                                <button 
                                    onClick={handleAlbumClick} 
                                    key={album.id} className={(trackListName === album.name ? 'text-amber-500 ' : '') + "block text-left text-xs px-4 whitespace-nowrap overflow-hidden text-ellipsis mb-1"} 
                                    data-id={album.id}
                                    data-name={album.name}
                                    >
                                    {album.name}
                                </button>
                            )
                        })
                    }
                    <h2 className="font-bold text-sm p-4 pb-2">Playlists</h2>
                    {
                        player.library.getPlaylists().map(playlist => {
                            return (
                                <button 
                                    onClick={handlePlaylistClick} 
                                    key={playlist.id} 
                                    className={(trackListName === playlist.name ? 'text-amber-500 ' : '') + "block text-left text-xs px-4 whitespace-nowrap overflow-hidden text-ellipsis mb-1"} 
                                    data-id={playlist.id}
                                    data-name={playlist.name}
                                    >
                                    {playlist.name}
                                </button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}