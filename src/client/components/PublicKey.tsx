import React from "react"
import { Form } from "react-bootstrap"

const PublicKey: React.FunctionComponent = () => {
    return <Form.Group className="mb-3" controlId="publicKey">
        <label htmlFor="publicKey">Public Key</label>
        <Form.Control name="publikKey" type="textarea" />
    </Form.Group>
}

export default PublicKey