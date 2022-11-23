import '../../node_modules/react-grid-layout/css/styles.css'
import '../../node_modules/react-resizable/css/styles.css'
import '../stylesheets/dashboard.css'
import React, { useState, useEffect } from 'react' 
import GridLayout from 'react-grid-layout'

export default function Dashboard(props) {
    const [viewWidth, setViewWidth] = useState()
    const [rowHeight, setRowHeight] = useState()
    // const [maxRows, setMaxRows] = useState()

    const layout = [
        { i: "1", x: 0, y: 0, w: 1, h: 2 },
        { i: "2", x: 1, y: 0, w: 2, h: 5, minW: 3, minH: 5 },
        { i: "3", x: 4, y: 0, w: 1, h: 2 }
    ];

    useEffect(() => {
        let width = window.innerWidth - 25
        let rowHeight = (document.querySelector(".dashboard-container").clientHeight - 25) / 12
        // let maxRows = 8
        setViewWidth(width)
        setRowHeight(rowHeight)
        // setMaxRows(maxRows)
        document.body.style.overflowY = "hidden"
        return () => {
            document.body.style.overflowY = "scroll"
        }
    }, [])

    return (
        <>
            
            <div className="dashboard-body">
                <div className="dashboard-container">
                    <GridLayout
                        className="layout"
                        layout={layout}
                        cols={12}
                        margin={[25, 25]}
                        rowHeight={rowHeight}
                        // maxRows={maxRows}
                        width={viewWidth}
                    >
                        <div key="1" id="hellogridblock">
                            <div>Hello</div>
                        </div>
                        <div key="2" id="morecontentblock">
                        </div>
                        <div key="3">Even more</div>
                    </GridLayout>
                </div>
            </div>
        </>
    )
}