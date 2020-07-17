import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { Empty } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function giphyCard(props) {
    const { content, emptyData, url } = props;
    
    return (
        <Container>
            <Row>
                <InfiniteScroll className='row' dataLength={content.length/9} next={() => props.fetchAPI(url)} hasMore={true}
                    loader={
                        <div className={"col-lg-12 text-center"} style={{display: (emptyData === false ? 'block': 'none')}}>
                            Loading....
                        </div>}
                         >
                    {
                        content.length > 0 ? (
                            content.map((ele, i) => {
                                return (
                                    <Col xs={6} md={4} key={i}>
                                        <Card style={{ width: '17rem', height: '17rem' }}>
                                            <Card.Img variant="top" src={ele.images.downsized.url} style={{ width: `268px`, height: `200px` }} />
                                            <Card.Body>
                                                <Card.Title>{ele.title}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })) : <div className='emptyLoad'>
                                {emptyData === false ? <Spinner animation="border" /> : <Empty />}
                            </div>
                    }
                </InfiniteScroll>


            </Row>
        </Container>

    )
}
