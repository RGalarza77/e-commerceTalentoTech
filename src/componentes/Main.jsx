import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import imagen from '../assets/imagen-main.png';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';



function Main() {

    return (
        <main style={{ padding: "20px" }}>
            {/* Helmet ayuda a posicionar mejor la pag para el CEO, permitiendo poner mas <meta> y <title>*/}
            <Helmet>
                <title>Pagina Principal| E-commerce</title>
                <meta name="description" content="Pagina principa de nuertro e-commerce." />
            </Helmet>
            <Container className=" text-center  mt-3">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Image src={imagen} alt='logo e-commerce talentoTech' fluid />
                        <h1 className="text-center mt-5 fw-bold">¡Bienvenido a E-commerce Talento Tech!</h1>
                        <p className='text-center mb-4 font-monospace'>Este es un espacio creado para practicar y aprender sobre el diseño de e-commerce.
                            Aquí se aplicó los conceptos de diseño web, desarrollo frontend y lógica de ecommerce adquiridos durante
                            el curso de React de Talento Tech.
                            <p className='mt-2'>¡Te invito a que explores todos nuestros productos!</p>
                        </p>
                        <Link to={"/productos"}><Button variant="dark" className="mt-3">Explorar productos</Button></Link>

                    </Col>
                </Row>

            </Container>
        </main>
    );
}

export default Main;