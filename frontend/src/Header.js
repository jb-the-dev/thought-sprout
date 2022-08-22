import { Link } from "react-router-dom";


export default function Header() {
    return (
    <div className="jumbotron" style={{ justifyContent: "space-between" }}>
        <h1 className="display-4">Welcome to ThoughtSprout!</h1>
        <Link to="/">Home</Link> | <Link to="/garden">Garden</Link>
    </div>
    )
}