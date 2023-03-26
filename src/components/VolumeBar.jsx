const VolumeBar = ({ audioRef, volume, volumeRef, isSettingVolume }) => {
  const handleProgressChange = () => {
    audioRef.current.volume = volumeRef.current.value;
  };

  const styles = {
    display: isSettingVolume ? "d-flex" : "d-none",
  };

  return (
    <div className={styles.display + " progress volume"}>
      <input
        className="volume--bar"
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={handleProgressChange}
        ref={volumeRef}
      />
      <span className="volume">{volume}</span>
    </div>
  );
};

export default VolumeBar;