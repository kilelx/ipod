const Topbar = () => {
    return (
        <div className="topbar">
            <i className="fa-sharp fa-solid fa-play"></i>
            <p>Now Playing</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 10.59"
                transform="translate(29 -9) scale(.25 .25)"
            >
                <g
                >
                  <path d="m22.97,10.06v-3.97h1.58v-1.85h-1.58V.53H.45v9.53h22.53m.45.53H0V0h23.42v3.71h1.58v2.91h-1.58v3.97Z"/>
                  <rect x="1.24" y="1.37" width="4.69" height="7.95"/>
                  <rect x="7.01" y="1.37" width="4.69" height="7.95"/>
                  <rect x="12.78" y="1.37" width="4.69" height="7.95"/>
                </g>
            </svg>
        </div>
    )
}

export default Topbar;