import React from "react"
import { Provider } from "react-redux"
import { StateManager } from "pro-web-app-cli-state-manager"
import { UserServiceContext } from "./contexts/userService"
import { AppActionsContext } from "./contexts/appActions"
import { Services } from "pro-web-app-cli-api-service"
import { BaseUrl} from "./contexts/baseUrl"
import Notification from "./components/notification/Notification"

const App:React.FunctionComponent = (props) => {
    return <BaseUrl.Provider value="">
            <UserServiceContext.Provider value={ new Services.User("") }>
                <Provider store={StateManager.store}>
                    <AppActionsContext.Provider value={StateManager.actions.app}>
                        <Notification />
                    </AppActionsContext.Provider>
                    { props.children }
                </Provider>
            </UserServiceContext.Provider>
        </BaseUrl.Provider>
}

export default App