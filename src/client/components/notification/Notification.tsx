import React from "react"
import { Toast, ToastContainer} from "react-bootstrap"
import { useSelector } from "react-redux"
import { IAllState } from "../../IAllState"

const Notifications: React.FunctionComponent = () => {
    const notification = useSelector((state: IAllState) => state.App.notification)
    if(notification === null) return <></>
    return <ToastContainer position="bottom-end">
    <Toast bg={notification.type}>
      <Toast.Header>
        <i className="fa fa-check"></i>
        <small className="text-muted">just now</small>
      </Toast.Header>
      <Toast.Body>{notification.message}</Toast.Body>
    </Toast>
  </ToastContainer>
}

export default Notifications
