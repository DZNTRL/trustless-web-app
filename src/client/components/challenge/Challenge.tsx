import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { IAllState } from "../../IAllState"
import ChallengeModal from "./ChallengeModal"

const Challenge: React.FunctionComponent = () => {
    const challenge = useSelector((state: IAllState) => state.User.challenge)
    const [currentChallenge, setCurrentChallenge] = useState<string | null>(null)
    const [showModal, setShowModal] = useState<boolean>(false)
    const close = () => setShowModal(false)
    useEffect(() => {
        if(currentChallenge !== challenge) {
            setCurrentChallenge(challenge)
        }
    }, [challenge])
    useEffect(() => {
        if(currentChallenge && !showModal) {
            setShowModal(true)
        }
        if(!currentChallenge && showModal) {
            setShowModal(false)
        }
    }, [currentChallenge])
    
    if(showModal) {
        return <ChallengeModal show={showModal} close={close}></ChallengeModal>
    }
    return <></>

}

export default Challenge