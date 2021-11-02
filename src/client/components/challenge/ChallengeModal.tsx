import React, { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useSelector } from "react-redux"
import { IAllState } from "../../IAllState"

const ChallengeModal: React.FunctionComponent<{close: () => void, show: boolean}> = ({close, show}) => {
    const challenge = useSelector((state: IAllState) => state.User.challenge)
    const [copied, setCopied] = useState<boolean>(false)
    const handleCopy = () =>  { 
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 3000)
    }
    return <Modal show={show} onHide={close}>
        <Modal.Dialog>
        <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <pre>
                {challenge}
            </pre>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={close}>Close</Button>
            <CopyToClipboard text={challenge} onCopy={handleCopy}>
                <Button variant="primary">Copy</Button>
            </CopyToClipboard>
        </Modal.Footer>
    </Modal.Dialog></Modal>
}

export default ChallengeModal