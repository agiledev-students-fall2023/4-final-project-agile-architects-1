import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import { useAuthContext } from "./useAuthContext";

export const useEdit = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()

    const edit = async (userData) => {
        const { userId, email, username, zipcode, usrImg } = userData
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/user/editUser/${userId}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, username, zipcode, usrImg})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // update the auth context
            dispatch({type: "EDIT", payload: json})
            navigate('/profile')
            setIsLoading(false)
        }
    }
    return { edit, isLoading, error}
}