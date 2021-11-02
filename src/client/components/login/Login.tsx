import React, { useState, ChangeEvent, useContext } from "react"
import { Form, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { UserActionsContext } from "../../contexts/userActions"

const Login: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState<string>("")
    const [challenge, setChallenge] = useState<string>("")
    const userActions = useContext(UserActionsContext)
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }
    const handleChallenge = (e: ChangeEvent<HTMLInputElement>) => {
        setChallenge(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(userActions.login(username, challenge))
    }

    return <Form onSubmit={handleSubmit}>
        <Form.Group>
            <label htmlFor="username">Username</label>
            <Form.Control name="username" onChange={handleNameChange} />
        </Form.Group>
        <Form.Group>
            <label htmlFor="challenge">Challenge</label>
            <Form.Control as="textarea" name="challenge" onChange={handleChallenge} />
        </Form.Group>
        <Button type="submit">Login</Button>

    </Form>
}

export default Login