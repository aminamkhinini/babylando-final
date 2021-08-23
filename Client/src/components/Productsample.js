import React,{useState}from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card,Row,Col } from 'react-bootstrap'






export default function Productsample() {
    
    const [product, setProduct ] = useState([ 
      {
        
       title:'chicco biberon',
      price:17.6,
      images:'http://localhost:5000/uploads/1628756798772-CHICCO BIBERON EN PLASTIQUE.jpg',
      },
      {
        title:'Chicco Lite Way',
       price:640,
       images:'http://localhost:5000/uploads/1628493909143-poussette.jpg',
       },
       {
        
        title:'3 couleurs',
       price:17,
       images:'http://localhost:5000/uploads/1628493698792-jeux pate.jpg',
       },
    
    ]
    );
    return (
        <div> 
          <Row classname="row"> 
           {product.map(product=>(
             <Col key={product ? product._id :"id"} sm={12} md={6} lg={4} xl={3} className="col">
          <Card className='my-3 p-3 rounded card1'>
        <Link to={`/ProductScreen/${product? product._id: "id"}`} className="link">
                <Card.Img src={product && product.images} variant='top' className="img"/>
            </Link>
            <Card.Body>
            <Link to={`/ProductScreen/${product? product._id: "id"}`} className="link">
                    <Card.Title  className="title">
                        <strong> <h5> {product && product.title}</h5></strong>
                    </Card.Title>
                </Link>
                <Card.Text as='h5'className="price">{product && product.price}DT</Card.Text>
              
            </Card.Body>
        </Card>
        </Col>
           ))}
</Row>

</div>)}