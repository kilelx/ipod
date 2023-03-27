/*

  - fixer problème texte + batterie sur mobile

  */

import { useRef, useState } from "react";
import Controls from "./components/Controls";
import Topbar from "./components/Topbar";
import DisplayTrack from "./components/DisplayTrack";
import ProgressBar from "./components/ProgressBar";
import VolumeBar from "./components/VolumeBar";
import { tracks } from "./data/tracks";

const App = () => {
  // States
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);

  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(50);
  const [isSettingVolume, setIsSettingVolume] = useState(false);

  // References
  const audioRef = useRef(null);

  const progressBarRef = useRef(null);
  const volumeRef = useRef(null);


  // Go to the next song
  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };


  return (
    <div className="app">
      <h1>1'000 songs in your pocket</h1>

      <div className="ipod">
        <div className="screen">
          <Topbar />

          <p className="nbTrack">
            {trackIndex + 1} of {tracks.length}
          </p>

          <DisplayTrack
            {
              ...{
                currentTrack,
                audioRef,
                setDuration,
                progressBarRef,
                handleNext
              }
            }
          />
          <ProgressBar
            {
              ...{
                progressBarRef,
                audioRef,
                timeProgress,
                duration,
                isSettingVolume
              }
            }
          />
          <VolumeBar
            {
              ...{
                audioRef,
                volume,
                volumeRef,
                isSettingVolume
              }
            }
          />
        </div>

        <Controls
          {
            ...{
              audioRef,
              progressBarRef,
              duration,
              setTimeProgress,
              tracks,
              trackIndex,
              setTrackIndex,
              setCurrentTrack,
              volume,
              setVolume,
              volumeRef,
              setIsSettingVolume,
              handleNext
            }
          }
        />
      </div>
    </div>
  );
};

export default App;