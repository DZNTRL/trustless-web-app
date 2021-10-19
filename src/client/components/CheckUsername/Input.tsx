import React, { useContext, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { StateManager } from "pro-web-app-cli-state-manager"
import { IAllState } from "../../IAllState"
import { UserServiceContext } from "../../contexts/userService"

const Input: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const isUnique = useSelector((state: IAllState) => {
        return state.user.usernameUnique
    })
    const userServiceContext = useContext(UserServiceContext)
    const handleChange = (val) => {
        if(val.length < 3) return
        dispatch(StateManager.actions.user(userServiceContext).checkUsername(val))
    }
    return <input onChange={e => handleChange(e.target.value)} />
}

export default Input