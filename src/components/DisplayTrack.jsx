const DisplayTrack = ({ currentTrack, audioRef, setDuration, progressBarRef, handleNext }) => {

  const onLoadedMetaData = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  }

  return (
    <div className="infos">
      <p>{currentTrack.title}</p>
      <p>{currentTrack.author}</p>
      <p>{currentTrack.album}</p>
      <audio
        src={currentTrack.src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetaData}
        onEnded={handleNext}
      />
    </div>
  );
};

export default DisplayTrack;
