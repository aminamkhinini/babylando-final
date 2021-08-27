import React, { useState, useEffect } from 'react'
// Bootstrap Components
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// Redux
import { useDispatch, useSelector } from 'react-redux'
// UI Components
import Message from '../components/Message'
import Loader from '../components/Loader'
// Redux Actions
import { getUserDetails, updateUserProfile } from '../actions/authAction'


const Profile = ({ history }) => {
    
     
    // State to hold email and password
    const user = useSelector(state => state.auth.userInfo?.user);

    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    // Get user details from Redux store
   const userDetails = useSelector((state) => state.userDetails)
    const { loading, error } = userDetails

    // Get user token from Redux store
    const userLogin = useSelector((state) => state. auth)
    const { userInfo } = userLogin

    // Get update status on user info
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

   

      useEffect(() => {
        // If there is NO user info then redirect to login page
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user) {
                dispatch(getUserDetails('profile'))
            
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, userInfo, dispatch, user])
    // Handler that logs in the user
    const submitHandler = (e) => {
        e.preventDefault()
        // Check if passwords are the same
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            // Dispatch update profile reducer
            dispatch(updateUserProfile({ id: user._id,name, email, password }))
        }
    }

    return (
                   <Col md={7}>
                <h3> Profil de l'utilisateur</h3>
                {error && <Message variant='danger'>{error}</Message>}
                {message && <Message variant='danger'>{message}</Message>}
                {success && (
                    <Message variant='success'>Profile acualisé avec succés</Message>
                )}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId='email'>
                        <Form.Label> Addresse Email</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='email@example.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Mot de Passe</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                        
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirmer Mot de Passe</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm password'
                           
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                     Actualiser
                    </Button>
                </Form>
            </Col>
            
      
    )
}

export default Profile