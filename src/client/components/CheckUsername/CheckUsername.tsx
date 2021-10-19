import React, { useState, useEffect } from "react"
import Input from "./Input"

const CheckUsername: React.FunctionComponent<{isLoading: boolean, result: boolean}> = ({isLoading, result}) => {
    const _isLoading = () => isLoading ? "1" : "0"
    const _hasResult = () => result !== null
    const _result = () => result ? "1" : "0"
    const resultStatus = () => !_hasResult() ? " " :  _result()
    const getState = () => `${_isLoading()}${(resultStatus())}`
    useEffect(() => {
        setState(getState())
    }, [isLoading, result])
    const [state, setState] = useState<string>(getState())
    switch(state) {
        case "0 ":
            return <><Input /> test</>
        case "00":
            return <><Input /> try again</>
        case "01":
            return <><Input /> good!</>
        case "10":
            return <><Input /> loading</>
        }

}

export default CheckUsername