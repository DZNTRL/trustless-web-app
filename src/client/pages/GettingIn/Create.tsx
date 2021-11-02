import React, { useContext, useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import CheckUsername from "../../components/CheckUsername/CheckUsername"
import PublicKey from "../../components/PublicKey"
import { UserActionsContext } from "../../contexts/userActions"
import { IAllState } from "../../IAllState"

const Create: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const userActions = useContext(UserActionsContext)
    const [loggedIn, setLoggedIn] = useState<boolean>(false)

    const { loading, challenge, createUsername, createUserPublicKey, username }  = useSelector((state: IAllState) => ({
        loading, challenge,
        createUsername: state.User.createUsername,
        createUserPublicKey: state.User.createUserPublicKey,
        username: state.User.username,
    }))

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(userActions.createUser(createUsername, createUserPublicKey))
    }
    useEffect(() => {
        if(username === null) return setLoggedIn(false)
        console.log("setlogin", username)
        return setLoggedIn(true)
    }, [username])

    return <Form onSubmit={handleSubmit}>
        <CheckUsername />
        <PublicKey />
        <Button disabled={!(createUsername && createUserPublicKey)} type="submit">Create</Button>
    </Form>

}

export default Create