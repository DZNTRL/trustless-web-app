import { createContext } from "react"
import { IApp } from "pro-web-common/dist/js/interfaces/state-manager/actions/IApp"

export const AppActionsContext = createContext<IApp>(null)