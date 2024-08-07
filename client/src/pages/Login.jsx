import { useState } from "react"


const Login = () => {
    const [error, setError] = useState(false)
    const handleLogin = (e) => {
        e.preventDefault();
    }
    return (
        <div className='login'>
            <form onSubmit={handleLogin}>
                <input type='email' placeholder='email' />
                <input type='password' placeholder='password' />
                <button type='submit'>Login</button>
                {error && <span>Incorrect email or password</span>}
            </form>
        </div>

    )
}

export default Login