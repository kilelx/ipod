import { useState } from "react";
import Topbar from "./Topbar";
import DisplayTrack from "./DisplayTrack";
import {tracks} from "../data/tracks"

const Screen = () => {

    const [currentTrack, setCurrentTrack] = useState(tracks[0])

    return (
    <div className="screen">
        <Topbar />
        <p className="nbTrack">{currentTrack.key + 1} of {tracks.length}</p>
        <DisplayTrack
            currentTrack={currentTrack}
        />
        {/* <ProgressBar /> */}
    </div>
    )
}

export default Screen;