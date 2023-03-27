import { useEffect, useState, useRef, useCallback } from "react";
import { CSSTransition } from "react-transition-group";

const Controls = ({
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
}) => {
  // Is the song playing?
  const [isPlaying, setIsPlaying] = useState(false);

  // Is the song wheel hovered?
  const [isHovered, setIsHovered] = useState(false);

  // Refereneces
  const playAnimationRef = useRef(null);
  const centralButtonRef = useRef(null);

  // Play / pause
  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Go to the prev song
  const handlePrev = () => {
    if (trackIndex === 0) {
      let lastTrackIndex = tracks.length - 1;
      setTrackIndex(lastTrackIndex);
      setCurrentTrack(tracks[lastTrackIndex]);
    } else {
        setTrackIndex((prev) => prev - 1);
        setCurrentTrack(tracks[trackIndex - 1]);
    }
};

  // Setting the volume
  const handleWheel = (e) => {

    setIsSettingVolume(true);

    // Set the current volume
    if (e.deltaY > 0) {
      volume > 0 ? setVolume((prev) => prev - 1) : setVolume(0);
    } else {
      volume < 100 ? setVolume((prev) => prev + 1) : setVolume(100);
    }
    volumeRef.current.style.setProperty("--volume-progress", `${volume}%`);
  };

  // Display mouseAnimation on hover
  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const handleMouseOverCenter = (e) => {
      e.stopPropagation();
  }

  // Click on the central button
  const handleMouseDownCenter = () => {
    centralButtonRef.current.classList.add("pressed");
    console.log("I told you it was useless ;)");
  }

  const handleMouseUpCenter = () => {
    centralButtonRef.current.classList.remove("pressed");
  }

  // Animation on progress bar
  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  // Play
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  // Setting volume
  useEffect(() => {

    const hideVolume = setTimeout(() => {
      setIsSettingVolume(false);
    }, 1000);

    if (audioRef) {
      audioRef.current.volume = volume / 100;
    }

    return function() {
      clearTimeout(hideVolume);
    }
  }, [volume, audioRef]);

  return (
    <div className="controls">
      {/* Prev button */}
      <div className="prev" onClick={handlePrev}>
        <i className="fa-sharp fa-solid fa-play"></i>
        <i className="fa-sharp fa-solid fa-play"></i>
      </div>

      {/* Next button */}
      <div className="next" onClick={handleNext}>
        <i className="fa-sharp fa-solid fa-play"></i>
        <i className="fa-sharp fa-solid fa-play"></i>
      </div>

      {/* Play / Pause */}
      <div className="play" onClick={togglePlay}>
        <i className="fa-sharp fa-solid fa-play"></i>
        <i className="fa-sharp fa-solid fa-pause"></i>
      </div>

      {/* Sound button */}
      <div
        className="btn--rolling"
        onWheel={(e) => handleWheel(e)}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {/* Center and useless button */}
        <div
          className="btn--center"
          ref={centralButtonRef}
          onMouseDown={(e) => handleMouseDownCenter(e)}
          onTouchStart={(e) => handleMouseDownCenter(e)}
          onMouseUp={(e) => handleMouseUpCenter(e)}
          onTouchEnd={(e) => handleMouseUpCenter(e)}
          onMouseOver={(e) => handleMouseOverCenter(e)}
          title="Useless button"
        ></div>

      </div>

      {/* Menu */}
      <svg viewBox="-150 5 350 350">
        <path id="curve" d="m-2,35 c16,-4 32,-5 48,0" />
        <text className="menu">
          <textPath xlinkHref="#curve">menu</textPath>
        </text>
      </svg>

      {/* Mouse animation */}
          <CSSTransition
            in={isHovered}
            timeout={200}
            classNames="mouse--animation"
            unmountOnExit
          >
            <svg
              className="mouse--animation"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 54 81"
            >
              <path d="m22,5c-9.39,0-17,7.61-17,17v37c0,9.39,7.61,17,17,17h10c9.39,0,17-7.61,17-17h0V22c0-9.39-7.61-17-17-17h-10m0-5h10c12.15,0,22,9.85,22,22v37c0,12.15-9.85,22-22,22h-10c-12.15,0-22-9.85-22-22V22C0,9.85,9.85,0,22,0Z" />
              <path
                id="wheel"
                d="m27.5,17c1.93,0,3.5,1.57,3.5,3.5h0v6c0,1.93-1.57,3.5-3.5,3.5s-3.5-1.57-3.5-3.5v-6c0-1.93,1.57-3.5,3.5-3.5Z"
              />
            </svg>
          </CSSTransition>
    </div>
  );
};

export default Controls;
