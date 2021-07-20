import Input from "../components/gui/input";
import { editAccount } from "../services/account.service";

export default function Account ({session}) {

    var username = "";
    var email =  "";
    var password = "";

    var streamTitle = "";

    const edit = async () => {
        const fields = {};
        let modified = false;

        if (username != "") {
            fields.username = username;
            modified = true;
        }

        if (email != "") {
            fields.email = email;
            modified = true;
        }

        if (password != "") {
            fields.password = password;
            modified = true;
        }

        if (streamTitle != "") {
            fields.streamTitle = streamTitle;
            modified = true;
        }

        if (modified) {
            const res = await editAccount(fields);
            if (res.success) {
                alert("Changes saved");
                session.set({
                    ...session.get(),
                    ...res.user
                });
            } else {
                alert("Error saving user: " + res.message);
            }
        }
    }

    return (
        <div className="centered">
            <h2>Your profile</h2>
            <Input onChange={ (e) => {username = e.target.value;} }  label="Username" type="text" placeholder={session.get().username}/>
            <Input onChange={ (e) => {email = e.target.value;} } label="Email" type="email" placeholder={session.get().email}/>
            <Input onChange={ (e) => {password = e.target.value;} }  label="Password" type="password" placeholder={session.get().password}/>
            
            <h2>Stream info</h2>
            <Input onChange={ (e) => {streamTitle = e.target.value;} }  label="Stream title" type="text" placeholder={session.get().streamTitle}/>

            <code>Stream Key: { session.get().key }</code>
            <br/> { /* Lol, delete this. */}
            <button onClick={() => { edit() }}>Save</button>
        </div>
    )
}