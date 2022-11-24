import '../../node_modules/react-grid-layout/css/styles.css'
import '../../node_modules/react-resizable/css/styles.css'
import '../stylesheets/dashboard.css'
import logoshort from '../assets/images/navbar-logo-short-white.png'
import React, { useState, useEffect } from 'react' 
import GridLayout from 'react-grid-layout'
import _ from 'lodash'

export default function Dashboard(props) {
    const [viewWidth, setViewWidth] = useState()
    const [rowHeight, setRowHeight] = useState()
    const [menuActive, setMenuActive] = useState(false)
    const [layoutLength, setLayoutLength] = useState()
    const [layout, setLayout] = useState(props.userLayout)

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

    const onLayoutChange = () => {
        setLayout(layout)
    }

    const onAddItem = () => {
        setLayout((layout) => [...layout, {
            i: layoutLength + 1,
            x: 0,
            y: 0, // puts it at the bottom
            w: 2,
            h: 2,
            minW: 2,
            minH: 2
        }])
    }

    const createElement = (e) => {
        const removeStyle = {
            position: "absolute",
            right: "2px",
            top: 0,
            cursor: "pointer"
          };
        const i = e.i
        return (
            <div key={i} data-grid={e}>
                {
                    <span className="text">{i}</span>
                }                
                <span className="material-symbols-rounded remove" style={removeStyle} onClick={() => removeItem(i)}>
                    close
                </span>
            </div>
        )
    }

    const removeItem = (i) => {
        setLayout( _.reject(layout, { i: i }))
    }

    useEffect(() => {
        setLayoutLength(layout.length)
        let viewportWidth = window.innerWidth
        let rowHeight = (document.querySelector(".dashboard-container").clientHeight - 30) / 12
        setViewWidth(viewportWidth - 50)
        setRowHeight(rowHeight)
        window.addEventListener('resize', handleResize)
        document.body.style.overflowY = "hidden"
        return () => {
            document.body.style.overflowY = "scroll"
        }
    }, [layout.length])

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
                    <div className="menu-top">
                        <img id="menu-logo-short" className={menuActive === true ? ("open") : null} src={logoshort} alt="logo" />
                        <div id="menu-user-name" className={menuActive === true ? ("open") : null}>Hi, {props.currentUser.first_name}!</div>
                    </div>
                    <div className="menu-bottom">
                        <div id="menu-settings-link" className={menuActive === true ? ("open") : null}>settings.</div>
                        <div id="menu-logout" className={menuActive === true ? ("open") : null} onClick={props.logout}>logout.</div>
                    </div>
                </div>
            </div>
            <div>
                <div className="add-button" onClick={onAddItem}>
                    <div id="plus-icon">
                        <span></span>
                        <span></span>
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
                        {_.map(layout, e => createElement(e))}
                    </GridLayout>
                </div>
            </div>
        </>
    )
}