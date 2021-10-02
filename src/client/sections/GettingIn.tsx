import React from "react"

const GettingIn: React.FunctionComponent = () => {
    const onClick = () => alert("hi")
    return <>
        <button onClick={onClick}>
            Getting In
        </button>
    </>
}

export default GettingIn