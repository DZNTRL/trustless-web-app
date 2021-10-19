import React from "react"
import CheckUsername from "../pages/Checkusername"

const GettingIn: React.FunctionComponent = () => {
    const onClick = () => alert("hi")
    return <>
        <CheckUsername />
    </>
}

export default GettingIn