import '../stylesheets/dashboard.css'
import React, { useEffect } from 'react' 
import GridLayout from 'react-grid-layout'

export default function Dashboard(props) {

    const layout = [
        { i: "1", x: 0, y: 0, w: 1, h: 2, static: true },
        { i: "2", x: 1, y: 0, w: 1, h: 2, minW: 1, maxW: 12, minH: 1, maxH: 12 },
        { i: "3", x: 4, y: 0, w: 1, h: 2 }
      ];

    useEffect(() => {
        const dashboardBody = document.querySelector("body")
        dashboardBody.style.backgroundColor = "white"
    })

    return (
        <>
            <GridLayout
                className="layout"
                layout={layout}
                cols={12}
                rowHeight={30}
                width={1200}
            >
                <div key="1">Content</div>
                <div key="2">More content</div>
                <div key="3">Even more</div>
            </GridLayout>
        </>
    )
}