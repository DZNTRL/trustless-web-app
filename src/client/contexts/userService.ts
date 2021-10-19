import { createContext } from "react"
import { IUser } from "pro-web-common/dist/js/interfaces/service/IUser"

export const UserServiceContext = createContext<IUser>(null)