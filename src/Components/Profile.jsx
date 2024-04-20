import { useContext, useState } from "react"
import UserContext from "../Context/Usercontext"

export default function Profile() {
    const { user } = useContext(UserContext)


    if (!user) return <div> please login..!!</div>
    
    return <div>Welcome {user.firstname} {user.lastname}</div>

}