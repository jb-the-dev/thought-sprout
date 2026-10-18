import axios from "axios";

export default function Login() {
    const onSubmit = (event) => {
        event.preventDefault();
        console.log("event", event);
        const formData = new FormData(event.target)
        axios.post("/users/login", {
          email: formData.get('email'),
          password: formData.get('password')
        })
    }


    //TODO if logged in already, do not show login page; redirect to home page
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <label>
          Email
          <input type='email' name='email' placeholder='Email' />
        </label>
        <label>
          Password
          <input type='password' name='password' placeholder='Password' />
        </label>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}