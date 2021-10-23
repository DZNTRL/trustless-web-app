import { IAppState } from "pro-web-common/dist/js/interfaces/state-manager/states/IApp"
import { IUserState } from "pro-web-common/dist/js/interfaces/state-manager/states/IUser"

export interface IAllState {
    App: IAppState
    User: IUserState
}