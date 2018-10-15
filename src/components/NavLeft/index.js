import React from 'react';
import { Menu, Icon } from 'antd';
import menuConfig from '../../config/menuConfig'; 
import './index.less';
import { NavLink } from 'react-router-dom';
const SubMenu =  Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class NavLeft extends React.Component {
    
    // constructor(props) {
    //     super(props);
    //     this.state = {

    //     }
    // }

    componentWillMount() {
        console.log('component will mount')
        const menuTreeNode = this.renderMenu(menuConfig)
        this.setState({
            menuTreeNode
        })
    }

    // to render navigation list
    renderMenu = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={item.key} >
                        { this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
                        <NavLink to={item.key}>{item.title}</NavLink>
                   </Menu.Item>
        })
 
    }
    
    render () {
         
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1>Hengli MS</h1>
                </div>
                <Menu 
                    theme="dark" 
                >
                    {this.renderMenu(menuConfig)}   
                </Menu>
            </div>
        )
    }
}