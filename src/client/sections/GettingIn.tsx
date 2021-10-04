import React from "react"
import { createServices } from "pro-web-app-cli-api-service"

const GettingIn: React.FunctionComponent = () => {
    const onClick = () => alert("hi")
    return <>
        <button onClick={onClick}>
            Getting In
        </button>
    </>
}

export default GettingIn