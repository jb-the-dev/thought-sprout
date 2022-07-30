function User (props) {
    return (
        <div className="User">
            <p>Name: {props.user.firstName} {props.user.lastName}</p>
            <p>Email: {props.user.email}</p>
        </div>
    )
}

export default User