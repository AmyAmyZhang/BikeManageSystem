import React from 'react';
import { Card, Carousel} from 'antd';

export default class Carousels extends React.Component {

    render() {
        return (
            <div>
                <Card title="Text Carousel" className="card-wrap">
                    <Carousel autoplay effect="fade">
                        <div><h3>Ant motion banner - React</h3></div>
                        <div><h3>Ant motion banner - Vue</h3></div>
                        <div><h3>Ant motion banner - Angular</h3></div>
                    </Carousel>
                </Card>
                <Card title="Image Carousel" className="slider-wrap">
                    <Carousel autoplay effect="fade">
                        <div>
                            <img src="/carousel-img/carousel-1.jpg" alt="" />   
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-2.jpg" alt="" />
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-3.jpg" alt="" />
                        </div>
                    </Carousel>
                </Card>
            </div>
        )

    }
}