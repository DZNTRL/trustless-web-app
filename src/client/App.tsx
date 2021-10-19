import React, { useContext } from "react"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { StateManager } from "pro-web-app-cli-state-manager"
import { UserServiceContext } from "./contexts/userService"
import { Services } from "pro-web-app-cli-api-service"
import { BaseUrl} from "./contexts/baseUrl"
import GettingIn from "./sections/GettingIn"

const reducers = combineReducers(StateManager.reducers)
const middleware = applyMiddleware(thunk)
var store = createStore(reducers, middleware)

console.log("store", store)

const App:React.FunctionComponent = (props) => {
    return <BaseUrl.Provider value="">
            <UserServiceContext.Provider value={ new Services.User("") }>
                <Provider store={store}>
                    { props.children }
                </Provider>
            </UserServiceContext.Provider>
        </BaseUrl.Provider>
}

export default App