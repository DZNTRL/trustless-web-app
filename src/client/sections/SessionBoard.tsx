import React, { useState } from "react"

const SessionBoard: React.FunctionComponent = () => {
    const [clicked, setClicked] = useState<number>(0)
    const onClick = () => { 
        setClicked(clicked + 1)
    }
    return <>
        <button onClick={onClick}>
            Click
        </button>
    </>
}

export default SessionBoard