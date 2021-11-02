import { createContext } from "react"
import { IUser } from "pro-web-common/dist/js/interfaces/state-manager/actions/IUser"

export const UserActionsContext = createContext<IUser>(null)