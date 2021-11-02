import React, { useContext, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Tabs, Tab, Form, Button } from "react-bootstrap"
import { actions, StateManager } from "pro-web-app-cli-state-manager"
import { UserServiceContext } from "../contexts/userService"
import { UserActionsContext } from "../contexts/userActions"
import { IAllState } from "../IAllState"
import Challenge from "../components/challenge/Challenge"
import Login from "../components/login/Login"
import Create from "../pages/GettingIn/Create"

const GettingIn: React.FunctionComponent = () => {
    const userSvc = useContext(UserServiceContext)
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const { loading, challenge, createUsername, createUserPublicKey, username }  = useSelector((state: IAllState) => ({
        loading, challenge,
        createUsername: state.User.createUsername,
        createUserPublicKey: state.User.createUserPublicKey,
        username: state.User.username,
    }))

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     dispatch(StateManager.actions.user(userSvc).createUser(createUsername, createUserPublicKey))
    // }
    useEffect(() => {
        if(username === null) return setLoggedIn(false)
        console.log("setlogin", username)
        return setLoggedIn(true)
    }, [username])
    if(loggedIn) {
        return <h2>You need to logout before you can create an account or login</h2>
    }
    return <>
        <Challenge />
        <UserActionsContext.Provider value={actions.user(userSvc)}>
            <Tabs defaultActiveKey="login" className="mb3">
                <Tab eventKey="login" title="login">
                    <Login />
                </Tab>
                <Tab eventKey="create" title="create">
                    <Create />
                </Tab>
            </Tabs>
        </UserActionsContext.Provider>

    </>
}

export default GettingIn