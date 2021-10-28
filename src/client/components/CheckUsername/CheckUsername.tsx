import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Input from "./Input"
import { IAllState } from "../../IAllState"


const CheckUsername: React.FunctionComponent = () => {
    const { isUnique, isLoading } = useSelector((state: IAllState) => {
        return {
            isUnique: state.User.usernameUnique,
            //@ts-ignore
            isLoading : state.App.loading
        }
    })
    const [state, setState] = useState<string>("0 ")
    useEffect(() => {
        const isUniqueHasValue = isUnique === null ? " " : isUnique === true ? "1" : "0"
        setState(`${isLoading ? "1" : "0"}${isUniqueHasValue}`)
        
    }, [isUnique, isLoading])
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