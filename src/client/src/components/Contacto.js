import React, { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaWhatsapp, FaEnvelope, FaInstagram, FaTwitter } from 'react-icons/fa';
import '../App.css'

const Contacto = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setFormData({
        name: '',
        email: '',
        message: ''
        });
    };

  return (
    <Container className="mt-5 mx-auto" style={{width:'450px'}}>
        <Row>
            <h2 className='mx-auto mb-4'>¡Escribinos!</h2>
            <Col md={10} >
            <Form onSubmit={handleSubmit} >
                <Form.Group controlId="formName" className='mt-2'>
                <Form.Control
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                </Form.Group>

                <Form.Group controlId="formEmail" className='mt-2'>
                <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                </Form.Group>

                <Form.Group controlId="formMessage" className='mt-2'>
                <Form.Control
                    as="textarea"
                    name="message"
                    rows={5}
                    placeholder="Dejanos tu mensaje..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
                </Form.Group>

                <Button variant="primary" type="submit" className='contactBtn'>
                ENVIAR
                </Button>
            </Form>
            </Col>
            <Col md={2} className="d-flex flex-column align-items-center justify-content-around ">
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp size={40} className="mb-3" />
            </a>
            <a href="mailto:info@alojar.com" target="_blank" rel="noopener noreferrer">
              <FaEnvelope size={40} className="mb-3" />
            </a>
            <a href="https://www.instagram.com/alojar" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={40} className="mb-3" />
            </a>
            <a href="https://twitter.com/alojar" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={40} className="mb-3" />
            </a>
        </Col>
        </Row>
    </Container>
  )
}

export default Contacto