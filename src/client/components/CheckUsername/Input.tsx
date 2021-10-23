import React, { useContext, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Form } from "react-bootstrap"
import { StateManager } from "pro-web-app-cli-state-manager"
import { IAllState } from "../../IAllState"
import { UserServiceContext } from "../../contexts/userService"

const Input: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const isUnique = useSelector((state: IAllState) => {
        return state.User.usernameUnique
    })
    const userServiceContext = useContext(UserServiceContext)
    const handleChange = (val) => {
        if(val.length < 3) return
        dispatch(StateManager.actions.user(userServiceContext).checkUsername(val))
    }
    return <Form.Group>
        <label htmlFor="username">Username</label>
        <Form.Control name="username" onChange={e => handleChange(e.target.value)} />
    </Form.Group>
}

export default Input