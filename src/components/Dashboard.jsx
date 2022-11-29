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
    const [addActive, setAddActive] = useState(false)
    const [layout, setLayout] = useState(props.userLayout)
    const [moduleData, setModuleData] = useState(props.userModuleData)

    const [createNewEntrySubmitDisabled, setCreateNewEntrySubmitDisabled] = useState(true)

    const [categoryStateValue, setCategoryStateValue] = useState()
    const [transactionTypeStateValue, setTransactionTypeStateValue] = useState()
    const [createModuleSubmitButtonDisabled, setCreateModuleSubmitButtonDisabled] = useState(true)

    const [entryTypeStateValue, setEntryTypeStateValue] = useState()
    const [incomeOrExpenseRecurringStateValue, setIncomeOrExpenseRecurringStateValue] = useState(false)
    const [billRecurringStateValue, setBillRecurringStateValue] = useState(false)
    const [incomeOrExpenseFrequencyStateValue, setIncomeOrExpenseFrequencyStateValue] = useState("")
    const [incomeOrExpenseDateStateValue, setIncomeOrExpenseDateStateValue] = useState(null)
    const [incomeOrExpenseAmountStateValue, setIncomeOrExpenseAmountStateValue] = useState(0)
    const [billFrequencyStateValue, setBillFrequencyStateValue] = useState()
    const [billDateStateValue, setBillDateStateValue] = useState(null)
    const [goalNameStateValue, setGoalNameStateValue] = useState()
    const [goalAmountStateValue, setGoalAmountStateValue] = useState()

    const toggleMenuActive = () => {
        const menuCurrentState = menuActive
        setMenuActive(!menuCurrentState)
    }

    const toggleAddActive = () => {
        const addCurrentState = addActive
        setAddActive(!addCurrentState)
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

    const onAddItem = (e) => {
        e.preventDefault()
        const url = props.baseURL
        let nextNumber
        let moduleBody
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
                        return nextNumber = (parseInt(sortedArray[index]) + 1)
                    }
                }
            }
        }
        if (e.target.category.value === "transactions") {
            moduleBody = {
                user: props.currentUser.id,
                i_value: findNextNumber(),
                category: e.target.category.value,
                transactiontype: e.target.transactiontype.value,
                interval: e.target.interval.value,
                frequency: ""
            }
        } else if (e.target.category.value === "bills") {
            moduleBody = {
                user: props.currentUser.id,
                i_value: findNextNumber(),
                category: e.target.category.value,
                transactiontype: "",
                frequency: e.target.frequency.value,
                interval: ""
            }
        } else if (e.target.category.value === "goals") {
            moduleBody = {
                user: props.currentUser.id,
                i_value: findNextNumber(),
                category: e.target.category.value,
                transactiontype: "",
                frequency: "",
                interval: ""
            }
        }
        fetch(url + '/module/new', {
            method: 'POST',
            body: JSON.stringify(
                moduleBody
            ),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then((response) => {
            if (response.status === 201) {
                console.log('New module created')
                return
            }
        })
        .catch((err) => {
            console.log('Error => ', err)
        })
        setLayout((previousLayout) => [...previousLayout, {
            i: findNextNumber(),
            x: 0,
            y: Infinity, // puts it at the bottom
            w: 2,
            h: 2,
            minW: 2,
            minH: 2
        }])
        setModuleData((previousData) => [...previousData, 
            moduleBody
        ])
        closeGridItemModal()
    }

    const createElement = (e) => {
        const i = e.i
        let moduleI = ((e.i) - 1)
        const removeStyle = {
            position: "absolute",
            right: "2px",
            top: 0,
            cursor: "pointer"
            };
        if (moduleData[moduleI].category === "transactions") {
            return (
                <div key={i} data-grid={e}>
                    <div className="transactions-module-block">
                        <div className="transactions-module-title">
                            {moduleData[moduleI].transactiontype.charAt(0).toUpperCase() + moduleData[moduleI].transactiontype.slice(1)}
                        </div>
                        <div className="module-body transactions-module-body">
                            <div className="transactions-body-data">
                                <div className = "transactions-body-data-text">Text</div>
                                <div className = "transactions-body-data-details">Details</div>
                            </div>
                        </div>
                    </div>
                    <span className="material-symbols-rounded remove" style={removeStyle} onClick={() => removeItem(i)}>
                        close
                    </span>
                </div>
                
            )
        } else if (moduleData[moduleI].category === "bills") {
            return (
                <div key={i} data-grid={e}>
                    <div className="bills-module-block">
                        <div className="bills-module-title">Bills</div>
                        <div className="module-body bills-module-body">
                            <div className="bills-body-data">
                                <div className="bills-body-data-text">Text</div>
                                <div className="bills-body-data-details">Details</div>
                            </div>
                        </div>
                    </div>
                    <span className="material-symbols-rounded remove" style={removeStyle} onClick={() => removeItem(i)}>
                        close
                    </span>
                </div>
            )
        } else if (moduleData[moduleI].category === "goals") {
            return (
                <div key={i} data-grid={e}>
                    <div className="goals-module-block">
                        <div className="goals-module-title">Goals</div>
                        <div className="module-body goals-module-body">
                            <div className="goals-body-data">
                                <div className="goals-body-data-text">Text</div>
                                <div className="goals-body-data-details">Details</div>
                            </div>
                        </div>
                    </div>
                    <span className="material-symbols-rounded remove" style={removeStyle} onClick={() => removeItem(i)}>
                        close
                    </span>
                </div>
            )
        }
        // return (
        //     <div key={i} data-grid={e}>
        //         {
        //             <span className="text">{moduleData[moduleI].category}</span>
        //         }                
        //         <span className="material-symbols-rounded remove" style={removeStyle} onClick={() => removeItem(i)}>
        //             close
        //         </span>
        //     </div>
        // )
    }

    const removeItem = (i) => {
        const url = props.baseURL
        setLayout( _.reject(layout, { i: i }))
        fetch(url + '/module/delete', {
            method: 'DELETE',
            body: JSON.stringify({
                user: props.currentUser.id,
                i_value: i
             }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then((response) => {
            if (response.status === 200) {
                console.log('Module successfully deleted')
                return
            }
        })
        .catch((err) => {
            console.log('Error => ', err)
          })
    }

    const openGridItemModal = () => {
        document.querySelector("#create-grid-item-modal").style.display = "block"
        setAddActive(false)
    }

    const closeGridItemModal = () => {
        setCategoryStateValue()
        setTransactionTypeStateValue()
        setCreateModuleSubmitButtonDisabled(true)

        document.querySelector("#new-grid-item-form").reset()
        document.querySelector("#create-grid-item-modal").style.display = "none"
    }

    window.onclick = (e) => {
        let gridItemModal = document.querySelector("#create-grid-item-modal")
        let addEntryModal = document.querySelector("#new-entry-modal")
        if (e.target == gridItemModal) {
            closeGridItemModal()
        }
        if (e.target == addEntryModal) {
            closeNewEntryModal()
        }
    }

    const setCategoryValue = (e) => {
        setCategoryStateValue(e.target.value)
        setCreateModuleSubmitButtonDisabled(true)
        setTransactionTypeStateValue()
        if (e.target.value === "goals") {
            setCreateModuleSubmitButtonDisabled(false)
        }
    }

    const setTransactionTypeValue = (e) => {
        setTransactionTypeStateValue(e.target.value)
        if (document.getElementById("interval-dropdown")) {
            document.getElementById("interval-dropdown").selectedIndex = 0
        }
        setCreateModuleSubmitButtonDisabled(true)
    }

    const setFrequencyValue = () => {
        setCreateModuleSubmitButtonDisabled(false)
    }

    const setIntervalValue = () => {
        setCreateModuleSubmitButtonDisabled(false)
    }

    const openAddEntryModal = () => {
        document.querySelector("#new-entry-modal").style.display = "block"
        setAddActive(false)
    }

    const closeNewEntryModal = () => {
        setCreateNewEntrySubmitDisabled(true)
        setEntryTypeStateValue()
        setIncomeOrExpenseRecurringStateValue(false)
        setIncomeOrExpenseFrequencyStateValue("")
        setIncomeOrExpenseDateStateValue(null)
        setIncomeOrExpenseAmountStateValue("")
        setBillRecurringStateValue(false)
        
        setBillDateStateValue(null)

        document.querySelector("#new-entry-form").reset()
        document.querySelector("#new-entry-modal").style.display = "none"
    }

    const setEntryTypeValue = (e) => {
        setEntryTypeStateValue(e.target.value)
        setIncomeOrExpenseRecurringStateValue(false)
        setBillRecurringStateValue(false)
        setCreateNewEntrySubmitDisabled(true)
    }

    const setIncomeOrExpenseRecurringValue = (e) => {
        setIncomeOrExpenseRecurringStateValue(!incomeOrExpenseRecurringStateValue)
    }

    const setIncomeOrExpenseFrequencyValue = (e) => {
        setIncomeOrExpenseFrequencyStateValue(e.target.value)
        let frequency = document.getElementById("income-or-expense-frequency-dropdown")
        let date = document.getElementById("income-or-expense-date")
        let amount = document.getElementById("income-or-expense-amount")
        if (incomeOrExpenseRecurringStateValue === false) {
            if ((date === null) || (amount == null)) {
                setCreateNewEntrySubmitDisabled(true)
            }
            else {
                setCreateNewEntrySubmitDisabled(false)
            }
        } else if (incomeOrExpenseRecurringStateValue === true) {
            if ((frequency === "") || (date === null) || (amount === null)) {
                setCreateNewEntrySubmitDisabled(true)
            }
            else {
                setCreateNewEntrySubmitDisabled(false)
            }
        }
    }

    const setIncomeOrExpenseDateValue = (e) => {
        setIncomeOrExpenseDateStateValue(e.target.value)
        let frequency = document.getElementById("income-or-expense-frequency-dropdown")
        let date = document.getElementById("income-or-expense-date")
        let amount = document.getElementById("income-or-expense-amount")
        if (incomeOrExpenseRecurringStateValue === false) {
            if ((date === null) || (amount == null)) {
                setCreateNewEntrySubmitDisabled(true)
            }
            else {
                setCreateNewEntrySubmitDisabled(false)
            }
        } else if (incomeOrExpenseRecurringStateValue === true) {
            if ((frequency === "") || (date === null) || (amount === null)) {
                setCreateNewEntrySubmitDisabled(true)
            }
            else {
                setCreateNewEntrySubmitDisabled(false)
            }
        }
    }

    const setIncomeOrExpenseAmountValue = (e) => {
        setIncomeOrExpenseAmountStateValue(e.target.value)
        let frequency = document.getElementById("income-or-expense-frequency-dropdown")
        let date = document.getElementById("income-or-expense-date")
        let amount = document.getElementById("income-or-expense-amount")
        if (incomeOrExpenseRecurringStateValue === false) {
            if ((date === null) || (amount == null)) {
                setCreateNewEntrySubmitDisabled(true)
            }
            else {
                setCreateNewEntrySubmitDisabled(false)
            }
        } else if (incomeOrExpenseRecurringStateValue === true) {
            if ((frequency === "") || (date === null) || (amount === null)) {
                setCreateNewEntrySubmitDisabled(true)
            }
            else {
                setCreateNewEntrySubmitDisabled(false)
            }
        }
    }

    const setBillRecurringValue = () => {
        setBillRecurringStateValue(!billRecurringStateValue)
    }

    const setBillFrequencyValue = (e) => {
        setBillFrequencyStateValue(e.target.value)
    }

    const setBillDateValue = (e) => {
        setBillDateStateValue(e.target.value)
    }

    const setGoalNameValue = (e) => {
        setGoalNameStateValue(e.target.value)
    }

    const setGoalAmountValue = (e) => {
        setGoalAmountStateValue(e.target.value)
    }

    const createNewEntry = (e) => {
        e.preventDefault()
        const url = props.baseURL
        let entryType
        let entryBody
        if (e.target.entrytype.value === "income") {
            entryType = "income"
            entryBody = {
                user: props.currentUser.id,
                recurring: e.target.incomeorexpenserecurring.value,
                frequency: e.target.incomeorexpensefrequency.value,
                date: e.target.incomeorexpensedate.value,
                amount: e.target.incomeorexpenseamount.value
            }
        } else if (e.target.entrytype.value === "expense") {
            entryType = "expense"
            entryBody = {
                user: props.currentUser.id,
                recurring: e.target.incomeorexpenserecurring.value,
                frequency: e.target.incomeorexpensefrequency.value,
                date: e.target.incomeorexpensedate.value,
                amount: e.target.incomeorexpenseamount.value
            }
        }
        else if (e.target.category.value === "bill") {
            entryType = "bill"
            entryBody = {
                user: props.currentUser.id,
                paid: false,
                recurring: e.target.billrecurring.value,
                frequency: e.target.billfrequency.value,
                due_date: e.target.billdate.value
            }
        } else if (e.target.category.value === "goal") {
            entryType = "goal"
            entryBody = {
                user: props.currentUser.id,
                name: e.target.goalname.value,
                amount: e.target.goalamount.value,
                percentage_completed: 0
            }
        }
        fetch(url + '/' + entryType + '/new', {
            method: 'POST',
            body: JSON.stringify(
                entryBody
            ),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then((response) => {
            if (response.status === 201) {
                console.log('New ' + entryType + ' created')
                return
            }
        })
        .catch((err) => {
            console.log('Error => ', err)
          })
        closeNewEntryModal()
    }

    useEffect(() => {
        onLayoutChange(layout)
        console.log('new layout', layout)
        let viewportWidth = window.innerWidth
        let rowHeight = (document.querySelector(".dashboard-container").clientHeight - 30) / 12
        setViewWidth(viewportWidth - 50)
        setRowHeight(rowHeight)
        window.addEventListener('resize', handleResize)
        document.body.style.overflowY = "hidden"
        return () => {
            document.body.style.overflowY = "scroll"
        }
    }, [layout])

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
                <div id="add-button" onClick={toggleAddActive}>
                    <div id="plus-icon" className={addActive === true ? ("open") : null}>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div id="add-button-content" className={addActive === true ? ("open") : null}>
                    <div id="new-entry-link" className={addActive === true ? ("open") : null} onClick={openAddEntryModal}>new entry.</div>
                    <div id="new-module-link" className={addActive === true ? ("open") : null} onClick={openGridItemModal}>new module.</div>
                </div>
                <div className="add-button-background-fill" onClick={toggleAddActive} style={addActive === true ? ({display: "block"}) : ({display: "none"})}></div>
            </div>
            <div>                
                <div id="new-entry-modal" className="new-entry-modal-class">
                    <div className="new-entry-modal-content">
                        <span className="material-symbols-rounded close-new-entry-modal" onClick={closeNewEntryModal} style={{
                            position: "absolute",
                            right: "2px",
                            top: 0,
                            cursor: "pointer"
                        }}>
                            close
                        </span>
                        <div id="new-entry-text">New Entry</div>
                        <div className="new-entry-modal-dropdowns">
                            <form id="new-entry-form" className="new-entry-form" onSubmit={createNewEntry}>
                                <div className="new-entry-form-selections">
                                    <label htmlFor="entry-type-dropdown">Type:&nbsp;&nbsp;</label>
                                    <select id="entry-type-dropdown" name="entrytype" onChange={setEntryTypeValue}>
                                        <option value="" default defaultValue>Select one...</option>
                                        <option value="income">Income</option>
                                        <option value="expense">Expense</option>
                                        <option value="bill">Bill</option>
                                        <option value="goal">Goal</option>
                                    </select>
                                </div>
                                {
                                    ((entryTypeStateValue === "income") || (entryTypeStateValue === "expense")) ? (
                                        <div className="new-entry-form-selections">
                                            <label htmlFor="income-or-expense-recurring">Recurring?&nbsp;</label>
                                            <input id="income-or-expense-recurring" name="incomeorexpenserecurring" type="checkbox" onChange={setIncomeOrExpenseRecurringValue} checked={incomeOrExpenseRecurringStateValue}></input>
                                        </div>
                                    ) : null
                                }
                                {
                                    incomeOrExpenseRecurringStateValue === true ? (
                                        <div className="new-entry-form-selections">
                                            <label htmlFor="income-or-expense-frequency-dropdown">Frequency:&nbsp;&nbsp;</label>
                                        <select id="income-or-expense-frequency-dropdown" name="incomeorexpensefrequency" onChange={setIncomeOrExpenseFrequencyValue}>
                                            <option value="" default defaultValue>Select one...</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="biweekly">Biweekly</option>
                                            <option value="monthly">Monthly</option>
                                            <option value="annually">Annually</option>
                                        </select>
                                        </div>
                                    ): null
                                }
                                {
                                    ((entryTypeStateValue === "income") || (entryTypeStateValue === "expense")) ? (
                                        <>
                                            <div className="new-entry-form-selections">
                                                <label htmlFor="income-or-expense-date">
                                                    {incomeOrExpenseRecurringStateValue === true ? (
                                                        "Starting date:"
                                                    ) : "Date:"}</label>
                                                <input id="income-or-expense-date" name="incomeorexpensedate" type="date" onChange={setIncomeOrExpenseDateValue}></input>
                                            </div>
                                            <div className="new-entry-form-selections">
                                                <label htmlFor="income-or-expense-amount">Amount (in dollars):</label>
                                                <input id="income-or-expense-amount" name="incomeorexpenseamount" type="number" onChange={setIncomeOrExpenseAmountValue}></input>
                                            </div>
                                        </>
                                    ) : null
                                }
                                {
                                    (entryTypeStateValue === "bill") ? (
                                        <div className="new-entry-form-selections">
                                            <label htmlFor="bill-recurring">Recurring?&nbsp;</label>
                                            <input id="bill-recurring" name="billrecurring" type="checkbox" onChange={setBillRecurringValue} checked={billRecurringStateValue}></input>
                                        </div>
                                    ) : null
                                }
                                {
                                    billRecurringStateValue === true ? (
                                        <div className="new-entry-form-selections">
                                            <label htmlFor="bill-frequency-dropdown">Frequency:&nbsp;&nbsp;</label>
                                        <select id="bill-frequency-dropdown" name="billfrequency" onChange={setBillFrequencyValue} value={billFrequencyStateValue}>
                                            <option value="" default defaultValue>Select one...</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="biweekly">Biweekly</option>
                                            <option value="monthly">Monthly</option>
                                            <option value="annually">Annually</option>
                                        </select>
                                        </div>
                                    ): null
                                }
                                {
                                    (entryTypeStateValue === "bill") ? (
                                        <>
                                            <div className="new-entry-form-selections">
                                                <label htmlFor="bill-date">
                                                    {billRecurringStateValue === true ? (
                                                        "Starting date:"
                                                    ) : "Date:"}</label>
                                                <input id="bill-date" name="billdate" type="date" onChange={setBillDateValue}></input>
                                            </div>
                                        </>
                                    ) : null
                                }
                                {
                                    (entryTypeStateValue === "goal") ? (
                                        <>
                                            <div className="new-entry-form-selections">
                                                <label htmlFor="goal-name">Name:&nbsp;&nbsp;</label>
                                                <input id="goal-name" name="goalname" type="text" onChange={setGoalNameValue} value={goalNameStateValue}></input>
                                            </div>
                                            <div className="new-entry-form-selections">
                                                <label htmlFor="goal-amount">Amount (in dollars):</label>
                                                <input id="goal-amount" name="goalamount" type="number" onChange={setGoalAmountValue} value={goalAmountStateValue}></input>
                                            </div>
                                        </>
                                    ) : null
                                }
                            </form>
                        </div>
                        <div className="new-entry-modal-buttons">
                            <button id="new-entry-close-button" onClick={closeNewEntryModal}>Close</button>
                            <button id="create-new-entry-button" type="submit" form="new-entry-form">Create new entry</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>                
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
                        <div id="create-new-grid-item-text">Create new module</div>
                        <div className="create-grid-item-modal-dropdowns">
                            <form id="new-grid-item-form" className="new-grid-item-form" onSubmit={onAddItem}>
                                <div className="new-grid-item-form-selections">
                                    <label htmlFor="category-dropdown">Category:&nbsp;&nbsp;</label>
                                    <select id="category-dropdown" name="category" onChange={setCategoryValue}>
                                        <option value="" default defaultValue>Select one...</option>
                                        <option value="transactions">Transactions</option>
                                        <option value="bills">Bills</option>
                                        <option value="goals">Goals</option>
                                    </select>
                                </div>
                                {
                                    categoryStateValue === "transactions" ? (
                                        <div className="new-grid-item-form-selections">
                                            <label htmlFor="transaction-type-dropdown">Transaction type:&nbsp;&nbsp;</label>
                                            <select id="transaction-type-dropdown" name="transactiontype" onChange={setTransactionTypeValue}>
                                                <option value="" defaultValue>Select one...</option>
                                                <option value="income" >Income</option>
                                                <option value="expenses" >Expenses</option>
                                            </select>
                                        </div>
                                    ) : null
                                }
                                {
                                    categoryStateValue === "bills" ? (
                                        <div className="new-grid-item-form-selections">
                                            <label htmlFor="frequency-dropdown">Frequency:&nbsp;&nbsp;</label>
                                            <select id="frequency-dropdown" name="frequency" onChange={setFrequencyValue}>
                                                <option value="" defaultValue>Select one...</option>
                                                <option value="weekly" >Weekly</option>
                                                <option value="monthly" >Monthly</option>
                                                <option value="annual" >Annual</option>
                                            </select>
                                        </div>
                                    ) : null
                                }
                                {
                                    (transactionTypeStateValue === "income" || transactionTypeStateValue === "expenses") && categoryStateValue === "transactions" ? (
                                        <div className="new-grid-item-form-selections">
                                            <label htmlFor="interval-dropdown">Interval:&nbsp;&nbsp;</label>
                                            <select id="interval-dropdown" name="interval" onChange={setIntervalValue}>
                                                <option value="" defaultValue>Select one...</option>
                                                <option value="week" >Week</option>
                                                <option value="month" >Month</option>
                                                <option value="year" >Year</option>
                                                <option value="all" >View all</option>
                                            </select>
                                        </div>
                                    ) : null
                                }
                            </form>
                        </div>
                        <div className="create-grid-item-modal-buttons">
                            <button id="create-grid-item-close-button" onClick={closeGridItemModal}>Close</button>
                            <button id="create-grid-item-button" type="submit" form="new-grid-item-form" disabled={createModuleSubmitButtonDisabled}>Create module</button>
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