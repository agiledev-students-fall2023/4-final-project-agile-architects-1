import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/user/login`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save the user to local storage
            console.log(json)
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch({type: "LOGIN", payload: json})
            navigate('/')
            setIsLoading(false)

        }
    }
    return { login, isLoading, error}
}