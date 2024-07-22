export default function LoginForm(){
    return(
        <>
        <form action="/handleLogin" method='POST'>
            <label htmlFor="">Username</label>
            <input type="text" name="username"/>
            <br /><br />
            <label htmlFor="">Password</label>
            <input type="password" name="password"/>
            <br />
            <button>Enviar</button>
            </form>
        </>
    )
}

