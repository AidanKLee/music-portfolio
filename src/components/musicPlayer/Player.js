import React, { useState } from "react";
import player from "../../assets/js/MusicPlayerTracks";

console.log(player.library)

export default function Player() {

    const [ play, setPlay ] = useState(false);

    return (
        <div className="bg-gray-900 text-white sm:max-w-screen-sm md:max-w-screen-md border-2 border-gray-700 rounded-lg overflow-hidden mx-auto">
            <div className="flex items-stretch">
                <div className="p-4">
                    <button className="block bg-orange-600 rounded-full duration-300 hover:bg-orange-400 active:scale-90">
                        {
                            play ? (
                                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" fill="currentColor"><path d="M555-200v-560h175v560H555Zm-325 0v-560h175v560H230Z"/></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" fill="currentColor"><path d="M320-203v-560l440 280-440 280Z"/></svg>
                            )
                        }
                    </button>
                </div>
                <div className="flex grow bg-gray-700 cursor-pointer">
                    <div className="h-1 bg-gray-500 w-full mt-auto rounded-r-md"></div>
                </div>
            </div>
            <div className="bg-gray-950">
                <div className="p-4">

                </div>
            </div>
        </div>
    )
}