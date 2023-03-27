const Topbar = () => {
    return (
        <div className="topbar">
            <i className="fa-sharp fa-solid fa-play"></i>
            <p>Now Playing</p>
            <img src="./assets/battery.png" alt="Battery icon" className="battery--icon" />
        </div>
    )
}

export default Topbar;