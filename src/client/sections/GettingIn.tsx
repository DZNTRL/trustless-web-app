import React, { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Tabs, Tab, Form, Button } from "react-bootstrap"
import { StateManager } from "pro-web-app-cli-state-manager"
import CheckUsername from "../pages/Checkusername"
import PublicKey from "../components/PublicKey"
import { UserServiceContext } from "../contexts/userService"
import { IAllState } from "../IAllState"

const GettingIn: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const userSvc = useContext(UserServiceContext)
    const { loading, challenge }  = useSelector((state: IAllState) => ({loading, challenge}))
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(StateManager.actions.user(userSvc).createUser())
    }
    return <>
        <Tabs defaultActiveKey="login" className="mb3">
            <Tab eventKey="login" title="login">
                <h1>Login</h1>
            </Tab>
            <Tab eventKey="create" title="create">
                <Form onSubmit={handleSubmit}>
                    <CheckUsername />
                    <PublicKey />
                    <Button type="submit">Create</Button>
                </Form>
            </Tab>
        </Tabs>
    </>
}

export default GettingIn