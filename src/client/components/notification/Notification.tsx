import React, { useContext } from "react"
import { Toast, ToastContainer, Button} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { IAllState } from "../../IAllState"
import { AppActionsContext } from "../../contexts/appActions"

const Notifications: React.FunctionComponent = () => {
    const notification = useSelector((state: IAllState) => state.App.notification)
    const dispatch = useDispatch()
    const appActions = useContext(AppActionsContext)
    const handleClose = () => {
      dispatch(appActions.clearNotification())
    }
    if(notification === null) return <></>
    return <ToastContainer position="bottom-end">
    <Toast bg={notification.type}>
      <Toast.Header>
        <Button size="sm" onClick={handleClose}><i className="fa fa-check"></i></Button>
        <small className="text-muted">just now</small>
      </Toast.Header>
      <Toast.Body>{notification.message}</Toast.Body>
    </Toast>
  </ToastContainer>
}

export default Notifications
