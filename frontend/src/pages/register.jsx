import Input from "../components/gui/input";
import { register } from "../services/auth.service";

export default function Register ({session}) {

    var username = "";
    var email = "";
    var password = "";
    var confirmPassword = "";

    const tryRegister = async () => {
        if (password != confirmPassword) {
            alert("Password don't match.")
        } else {
            const result = await register(username, email, password);
            if (result.success) {
                alert("Registered as " + username);
            } else {
                alert(result.message);
            }
        }
    }

    return (
        <div className="centered">
            <h2>Register</h2>
            <Input onChange={ (e) => {username = e.target.value;} }  label="Username" type="text"/>
            <Input onChange={ (e) => {email = e.target.value;} } label="Email" type="email"/>
            <Input onChange={ (e) => {password = e.target.value;} }  label="Password" type="password"/>
            <Input onChange={ (e) => {confirmPassword = e.target.value;} }  label="Confirm password" type="password"/>
            <button onClick={() => { tryRegister() }}>Register</button>
        </div>
    )
}