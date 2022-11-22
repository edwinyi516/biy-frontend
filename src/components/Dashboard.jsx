import '../stylesheets/dashboard.css'

export default function Dashboard(props) {
    // console.log(props.currentUser.email)
    // const email = props.currentUser.email
    // console.log("email is email", email)
    // const firstName = await props.currentUser.first_name
    // const lastName = await props.currentUser.last_name

    return (
        <>
            {
                props.currentUser ? (
                    <div className="dashboard-body">
                        <div className="test-header">Hello {props.currentUser.first_name}</div>
                        <div>Your email address is {props.currentUser.email}</div>
                        <div onClick={props.logout}>logout</div>
                    </div>
                ) : (
                    <div>LOADING</div>
                )
            }
        </>
    )
}