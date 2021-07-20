import Input from "../components/gui/input";
import { login } from "../services/auth.service";

export default function Login ({session}) {

    var username = "";
    var password = "";

    const tryLogin = async () => {
        const result = await login(username, password);
        if (result.success) {
            alert("Logged as " + result.user.username);
            session.set(result.user);
        } else {
            alert("Error: " + result.error);
        }
    }

    return (
        <div className="centered">
            <h2>Login</h2>
            <Input onChange={ (e) => {username = e.target.value;} } label="Username" type="text"/>
            <Input onChange={ (e) => {password = e.target.value;} }  label="Password" type="password"/>
            <button onClick={() => { tryLogin() }}>Login</button>
        </div>
    )
}