import React from 'react';
import { Card, Form, Select } from 'antd';
import axios from './../../axios';
import './detail.less';

export default class OrderDetail extends React.Component {
    
    state = {}

    componentDidMount() {
        let orderId = this.props.match.params.orderId;
        if (orderId) {
            this.getDetailInfo(orderId);
        }
    }

    getDetailInfo = (orderId) => {
        axios.ajax({
            url: '/order/detail',
            data: {
                params: {
                    orderId: orderId
                }
            }
        }).then((res) => {
            if (res.code === '0') {
                this.setState({
                    orderInfo: res.result
                })
                this.renderMap(res.result);
            }
        })
    }

    renderMap = (result) => {
        this.map = new window.BMap.Map('orderDetailMap');
        this.map.centerAndZoom('北京', 11); 
        // draw map control 
        this.addMapControl();
        // Draw user route
        this.drawBikeRoute(result.position_list);
        // call service area function
        this.drawServiceArea(result.area);
    }
    
    // addMapControl
    addMapControl = () => {
        let map = this.map;
        map.addControl(new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
        map.addControl(new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}));

    }

    // draw the user travelling route
    drawBikeRoute = (positionList) => {
        let map = this.map;
        let startPoint = '';
        let endPoint = '';
        if (positionList.length > 0) {
            let first = positionList[0];
            let last = positionList[positionList.length - 1];
            startPoint = new window.BMap.Point(first.lon, first.lat);
            let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36,42), {
                imageSize: new window.BMap.Size(36,42),
                anchor: new window.BMap.Size(36,42)
            })

            let startMarker = new window.BMap.Marker(startPoint, {icon: startIcon})
            this.map.addOverlay(startMarker);

            endPoint = new window.BMap.Point(last.lon, last.lat);
            let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36,42), {
                imageSize: new window.BMap.Size(36,42),
                anchor: new window.BMap.Size(36,42)
            })

            let endMarker = new window.BMap.Marker(endPoint, {icon: endIcon})
            this.map.addOverlay(endMarker);

            // connect routes
            let trackPoint = [];
            for (let i = 0; i < positionList.length; i++) {
                let point = positionList[i];
                trackPoint.push(new window.BMap.Point(point.lon, point.lat))
            }

            let polyline = new window.BMap.Polyline(trackPoint, {
                strokeColor: '#1869AD',
                strokeWeight: 3,
                strokeOpacity: 1
            })

            this.map.addOverlay(polyline);
            this.map.centerAndZoom(endPoint, 11);

        }
    }

    // Draw Service area
    drawServiceArea = (position_list) => {

        let trackPoint = [];
        for (let i = 0; i < position_list.length; i++) {
            let point = position_list[i];
            trackPoint.push(new window.BMap.Point(point.lon, point.lat))
        }

         
         let polygon = new window.BMap.Polygon(trackPoint, {
            strokeColor: '#CE0000',
            strokeWeight: 4,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity: 0.4,
        })
        this.map.addOverlay(polygon) 
    }

    render() {
        const info = this.state.orderInfo || {};
        return (
            <div>
                <Card>
                    <div id="orderDetailMap" className="order-map"></div>
                    <div className="detail-items">
                        <div className="item-title">
                            Basic Info
                        </div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">Bike Mode</div>
                                <div className="detail-form-content">{info.mode === 1 ? 'Service area' : 'parking spot' }</div>
                            </li>
                            <li>
                                <div className="detail-form-left">Order Number</div>
                                <div className="detail-form-content">{info.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">Bike Number</div>
                                <div className="detail-form-content">{info.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">Username</div>
                                <div className="detail-form-content">{info.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">Contact</div>
                                <div className="detail-form-content">{info.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">
                            Tracking
                        </div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">Start point</div>
                                <div className="detail-form-content">{info.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">End point</div>
                                <div className="detail-form-content">{info.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">Distance</div>
                                <div className="detail-form-content">{info.distance/1600} miles</div>
                            </li>
                            
                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
}