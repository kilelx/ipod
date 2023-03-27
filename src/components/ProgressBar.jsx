const ProgressBar = ({progressBarRef, audioRef, timeProgress, duration, isSettingVolume}) => {

    const handleProgressChange = () => {
        audioRef.current.currentTime = progressBarRef.current.value;
    }

    const styles = {
        display : !isSettingVolume ? "d-flex" : "d-none"
    }

    // Reformats from seconds to minutes:seconds
    const formatTime = (time) => {

        if (time && !isNaN(time)) {
              const minutes = Math.floor(time / 60);
              const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
              const seconds = Math.floor(time % 60);
              const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

              return `${formatMinutes}:${formatSeconds}`;
            }
            return '00:00';
        };

    return (
        <div
            className={ styles.display + " progress progress--bar"}
            ref={progressBarRef}
        >
            <span className="time current">{formatTime(timeProgress)}</span>
            <input
                // className="progress--bar"
                type="range"
                onChange={handleProgressChange}
                defaultValue="0"
            />
            <span className="time">{formatTime(duration)}</span>
        </div>
    )
}

export default ProgressBar;