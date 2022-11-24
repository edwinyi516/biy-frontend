import '../../node_modules/react-grid-layout/css/styles.css'
import '../../node_modules/react-resizable/css/styles.css'
import '../stylesheets/dashboard.css'
import React, { useState, useEffect } from 'react' 
import GridLayout from 'react-grid-layout'

export default function Dashboard(props) {
    const [viewWidth, setViewWidth] = useState()
    const [rowHeight, setRowHeight] = useState()
    const [menuActive, setMenuActive] = useState(false)

    const layout = [
        { i: "1", x: 0, y: 0, w: 12, h: 2 },
        { i: "2", x: 0, y: 0, w: 3, h: 7, minW: 3, minH: 5 },
        { i: "3", x: 3, y: 0, w: 9, h: 7 }
    ];

    const onLayoutChange = () => {

    }

    const toggleMenuActive = () => {
        const menuCurrentState = menuActive
        setMenuActive(!menuCurrentState)
    }

    const handleResize = () => {
        let viewportWidth = window.innerWidth
        let rowHeight = (document.querySelector(".dashboard-container").clientHeight - 50) / 12
        setViewWidth(viewportWidth - 50)
        setRowHeight(rowHeight)
    }

    useEffect(() => {
        let viewportWidth = window.innerWidth
        let rowHeight = (document.querySelector(".dashboard-container").clientHeight - 30) / 12
        setViewWidth(viewportWidth - 50)
        setRowHeight(rowHeight)
        window.addEventListener('resize', handleResize)
        document.body.style.overflowY = "hidden"
        return () => {
            document.body.style.overflowY = "scroll"
        }
    }, [])

    return (
        <>
            <div>
                <div className="menu-button" onClick={toggleMenuActive}>
                    <div id="menu-icon" className={menuActive === true ? ("open") : null}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                    </div>
                </div>
                <div id="menu-content" className={menuActive === true ? ("open") : null}>
                    <div className="menu-user-name">Hi, {props.currentUser.first_name}!</div>
                    <div className="menu-bottom">
                        <div id="menu-settings-link" className={menuActive === true ? ("open") : null}>settings.</div>
                        <div id="menu-logout" className={menuActive === true ? ("open") : null} onClick={props.logout}>logout.</div>
                    </div>
                </div>
            </div>
            <div className="dashboard-body">
                <div className="dashboard-container">
                    <GridLayout
                        className="layout"
                        layout={layout}
                        cols={12}
                        margin={[25, 25]}
                        rowHeight={rowHeight}
                        width={viewWidth}
                        onLayoutChange={onLayoutChange}
                    >
                        <div key="1">
                            <div>

                            </div>
                        </div>
                        <div key="2">
                        </div>
                        <div key="3"></div>
                    </GridLayout>
                </div>
            </div>
        </>
    )
}