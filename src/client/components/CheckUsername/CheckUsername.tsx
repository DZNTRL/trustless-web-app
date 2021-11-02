import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Input from "./Input"
import { IAllState } from "../../IAllState"
import { LoadingStates } from "pro-web-common/dist/js/enums/state-manager/LoadingStates"


const CheckUsername: React.FunctionComponent = () => {
    const { isUnique, isLoading } = useSelector((state: IAllState) => {
        console.log(state)
        return {
            isUnique: state.User.usernameUnique,
            //@ts-ignore
            isLoading : state.App.loading === LoadingStates.loading
        }
    })
    const [state, setState] = useState<string>("0 ")
    useEffect(() => {
        const isUniqueHasValue = isUnique === null ? " " : isUnique === true ? "1" : "0"
        setState(`${isLoading ? "1" : "0"}${isUniqueHasValue}`)
        console.log(`"${isLoading ? "1" : "0"}${isUniqueHasValue}"`)

    }, [isUnique, isLoading])
    switch(state) {
        case "0 ":
        case "1 ":
            return <><Input /></>
        case "00":
            return <><Input /> try again</>
        case "01":
        case "11":
            return <><Input /> good!</>
        case "10":
            return <><Input /> loading</>
        default:
            return <h3>This should not be here</h3>

        }

}

export default CheckUsername