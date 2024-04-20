import React, { useContext, useState } from "react"
import UserContext from "../Context/Usercontext"

export default function Login() {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')

    const { setUser } = useContext(UserContext)

    function Handlesubmit(e) {
        e.preventDefault()
        setUser({ firstname, lastname })
        setFirstname('')
        setLastname('')
    }


    return (
        <div>
            <input type="text" placeholder="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}></input><br></br>
            <input type="text" placeholder="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}></input><br></br>
            <button onClick={Handlesubmit}>login</button>
        </div>
    )
}