import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { Link } from 'react-router-dom'

// Create order action
import { createOrder } from '../actions/orderAction'

import { ORDER_CREATE_RESET } from '../actions/types'
import { USER_DETAILS_RESET } from '../actions/types'

import CheckoutSteps from '../components/CheckoutSteps'

const PlaceOrder = ({ history }) => {
    const dispatch = useDispatch()

    // Get items from the cart
    const cart = useSelector((state) => state.cart)

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    // Calculate prices
    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )

    // Calculate shipping prices
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10)

    // Calculate tax
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))

    // Total price
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2)

    const orderCreate = useSelector((state) => state.createOrder)
    const { order, success, error } = orderCreate

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
            dispatch({ type: USER_DETAILS_RESET })
        }
        // eslint-disable-next-line
    }, [history, success])

    const placeOrderHandler = () => {
        console.log('Placed order')
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            })
        )
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <div>
            <Row>
                <Col md={7}>
                    <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h5>Expédition</h5>
                            <p>
                                <strong>Addresse: </strong>
                                {cart.shippingAddress.address},{' '}
                                {cart.shippingAddress.city}{' '}
                                {cart.shippingAddress.postalCode},{' '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h5>Methode de Payment </h5>
                            <p>
                            <strong>Methode: </strong>
                            {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h5>Commander des articles</h5>
                            {cart.cartItems.length < 0 ? (
                                <Message>Votre carte est vide</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={4}>
                                                    <Image
                                                        src={item.images}
                                                        alt={item.title}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link
                                                        to={`/product/${item.product}`}
                                                    >
                                                       <h5>{item.title} </h5> 
                                                    </Link>
                                                </Col>
                                                <Col md={5}>
                                                    {item.qty} x  {item.price}DT{' '}
                                                    = {item.qty * item.price}DT
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                    </Card>
                </Col>
                <Col md={5}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h5>Résumé de la commande</h5>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Col><strong>Articles :</strong> {cart.itemsPrice}DT</Col>  
                               
                            </ListGroup.Item>
                               
                            <ListGroup.Item>
                           <Col><strong> Expédition:</strong> {cart.shippingPrice}DT</Col>
                             
                           </ListGroup.Item>
                               
                           <ListGroup.Item>
                           <Col><strong>Taxe: </strong>{cart.taxPrice}DT</Col>
                               
                           
                           </ListGroup.Item>
                                  
                            <ListGroup.Item>
                               <Col><strong> Total:</strong>{cart.totalPrice}DT</Col>
                              
                               </ListGroup.Item>
                           
                            
                           
                            
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Passer à la commande
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
        </div>
    )
}

export default PlaceOrder