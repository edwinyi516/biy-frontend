import '../stylesheets/dashboard.css'

export default function Dashboard(props) {
    console.log(props.currentUser)
    // console.log(props.currentUser.email)
    // const email = props.currentUser.email
    // console.log("email is email", email)
    // const firstName = await props.currentUser.first_name
    // const lastName = await props.currentUser.last_name

    return (
        <>
            {
                localStorage.getItem("currentUser") !== undefined ? (
                    <div className="dashboard-body">
                        <div className="test-header">DASHBOARD</div>
                    </div>
                ) : (
                    null
                )
            }
        </>
    )
}