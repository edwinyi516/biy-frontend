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
    const [layout, setLayout] = useState(props.userLayout)
    const [gridItemModalActive, setGridItemModalActive] = useState(false)

    const [categoryDropdownValue, setCategoryDropdownValue] = useState()

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

    const onLayoutChange = (layout) => {
        const url = props.baseURL + '/layout/update'
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify({
                layout_data: layout
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then((response) => {
            if (response.status === 201) {
                console.log('Update successful')
                return
            }
        })
        .catch((err) => {
            console.log('Error => ', err)
          })
        setLayout(layout)
    }

    const onAddItem = () => {
        let nextNumber
        const iOfLayout = layout.map(element => element.i)
        const sortedArray = iOfLayout.sort((a, b) => {
            return a - b
        })
        const findNextNumber = () => {
            if ((sortedArray.length === 0) || (parseInt(sortedArray[0]) !== 1)) {
                return nextNumber = 1
            }
            else {
                for (let index = 0; index < sortedArray.length; index++) {
                    if ((parseInt(sortedArray[index]) + 1) !== (parseInt(sortedArray[index + 1]))) {
                        nextNumber = (parseInt(sortedArray[index]) + 1)
                        return nextNumber
                    }
                }
            }
        }
        setLayout((layout) => [...layout, {
            i: findNextNumber(),
            x: 0,
            y: Infinity, // puts it at the bottom
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

    const openGridItemModal = () => {
        setGridItemModalActive(true)
        document.querySelector("#create-grid-item-modal").style.display = "block"
    }

    const closeGridItemModal = () => {
        setCategoryDropdownValue("")

        document.querySelector("#new-grid-item-form").reset()
        setGridItemModalActive(false)
        document.querySelector("#create-grid-item-modal").style.display = "none"
        
    }

    window.onclick = (e) => {
        let modal = document.querySelector("#create-grid-item-modal")
        if (e.target == modal) {
            modal.style.display = "none"
        }
    }

    const setDropdownValue = (e) => {
        if (e.target = document.querySelector("#category-dropdown")) {
            setCategoryDropdownValue(e.target.value)
        }
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
                    <div className="menu-top">
                        <img id="menu-logo-short" className={menuActive === true ? ("open") : null} src={logoshort} alt="logo" />
                        <div id="menu-user-name" className={menuActive === true ? ("open") : null}>Hi, {props.currentUser.first_name}!</div>
                    </div>
                    <div className="menu-bottom">
                        <div id="menu-settings-link" className={menuActive === true ? ("open") : null}>settings.</div>
                        <div id="menu-logout" className={menuActive === true ? ("open") : null} onClick={props.logout}>logout.</div>
                    </div>
                </div>
                <div className="menu-background-fill" onClick={toggleMenuActive} style={menuActive === true ? ({display: "block"}) : ({display: "none"})}></div>
            </div>
            <div>
                <div className="add-button" onClick={openGridItemModal}>
                    <div id="plus-icon">
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div id="create-grid-item-modal" className="create-grid-item-modal-class">
                    <div className="create-grid-item-modal-content">
                        <span className="material-symbols-rounded close-create-grid-item-modal" onClick={closeGridItemModal} style={{
                            position: "absolute",
                            right: "2px",
                            top: 0,
                            cursor: "pointer"
                        }}>
                            close
                        </span>
                        <div id="create-new-grid-item-text">Choose new module content</div>
                        <div className="create-grid-item-modal-dropdowns">
                            <form id="new-grid-item-form" className="new-grid-item-form">
                                <div className="new-grid-item-form-selections">
                                    <label for="category-dropdown">Category:&nbsp;&nbsp;</label>
                                    <select id="category-dropdown" name="category-dropdown" onChange={setDropdownValue}>
                                        <option value="" default selected>Select one...</option>                                        
                                        <option value="transactions">Transactions</option>
                                        <option value="bills">Bills</option>
                                        <option value="goals">Goals</option>
                                    </select>
                                </div>
                                {
                                    categoryDropdownValue === "transactions" ? (
                                        <div className="new-grid-item-form-selections">
                                            <label for="transaction-type-dropdown">Type:&nbsp;&nbsp;</label>
                                            <select id="transaction-type-dropdown" name="transaction-type-dropdown">
                                                <option value="" selected>Select one...</option>
                                                <option value="income" >Income</option>
                                                <option value="expense" >Expense</option>
                                            </select>
                                        </div>
                                    ) : null
                                }
                                {
                                    categoryDropdownValue === "bills" ? (
                                        <div className="new-grid-item-form-selections">
                                            <label for="bills-dropdown">Frequency:&nbsp;&nbsp;</label>
                                            <select id="bills-dropdown" name="bills-dropdown">
                                                <option value="" selected>Select one...</option>
                                                <option value="monthly" >Monthly</option>
                                                <option value="annual" >Annual</option>
                                            </select>
                                        </div>
                                    ) : null
                                }
                            </form>
                        </div>
                        <div className="create-grid-item-modal-buttons">
                            <button id="create-grid-item-close-button" onClick={closeGridItemModal}>Close</button>
                            <button id="create-grid-item-button" onClick={() => {onAddItem(); closeGridItemModal();}}>Create New Item</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dashboard-body">
                <div className="dashboard-container">
                    <GridLayout
                        className="layout"
                        layout={layout}
                        cols={10}
                        margin={[35, 35]}
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