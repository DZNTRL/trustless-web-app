import React, { ChangeEvent, useContext } from "react"
import { Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { actions } from "pro-web-app-cli-state-manager"
import { UserActionsContext } from "../contexts/userActions"
import { AppActionsContext } from "../contexts/appActions"
import { Validators } from "pro-web-common/dist/js/validators"
import { Notifications } from "pro-web-common/dist/js/enums/state-manager/Notifications"
const PublicKey: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const userActions = useContext(UserActionsContext)
    const appActions = useContext(AppActionsContext)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(userActions.setCreateUserPublicKey(e.target.value))
        // Validators.publicKey.validate(e.target.value)
        //     .then(validateResult => {
        //         console.log("validate=",validateResult)
        //         if(true) {
        //         } else {
        //             //@ts-ignore
        //             dispatch(appActions.setNotification(Notifications.warning, validateResult.join("")))
        //         }
        //     })
    }
    return <Form.Group className="mb-3" controlId="publicKey">
        <label htmlFor="publicKey">Public Key</label>
        <Form.Control name="publicKey" as="textarea" onChange={handleChange} />
    </Form.Group>
}

export default PublicKey