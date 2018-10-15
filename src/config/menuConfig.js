const menuConfig = [
    {
        title: 'Main Page',
        key: '/admin/home'
    },
    {
        title: 'UI',
        key: '/admin/ui',
        children: [ 
            {
                title: 'Button', 
                key: '/admin/ui/buttons',
            },
            {
                title: 'Modal',
                key: '/admin/ui/modals',
            },
            {
                title: 'Loading',
                key: '/admin/ui/loadings',
            },
            {
                title: 'Notification',
                key: '/admin/ui/notification',
            },
            {
                title: 'Global Message',
                key: '/admin/ui/messages',
            },
            {
                title: 'Tab Page',
                key: '/admin/ui/tabs',
            },
            {
                title: 'Gallery',
                key: '/admin/ui/gallery',
            },
            {
                title: 'Carousel',
                key: '/admin/ui/carousel',
            }
        ]
    },
    {
        title: 'Form',
        key: '/admin/form',
        children: [
            {
                title: 'Login',
                key: '/admin/form/login',
            },
            {
                title: 'Register',
                key: '/admin/form/reg',
            }
        ]
    },
    {
        title: 'Table',
        key: '/admin/table',
        children: [
            {
                title: 'Basic Forms',
                key: '/admin/table/basic',
            },
            {
                title: 'Advanced Forms',
                key: '/admin/table/high',
            }
        ]
    },
    {
        title: 'Rich Text',
        key: '/admin/rich'
    },
    {
        title: 'City Management',
        key: '/admin/city'
    },
    {
        title: 'Order',
        key: '/admin/order',
        btnList: [
            {
                title: 'Order detail',
                key: 'detail'
            },
            {
                title: 'Order Finished',
                key: 'finish'
            }
        ]
    },
    {
        title: 'Employee Management',
        key: '/admin/user'
    },
    {
        title: 'Bike Map',
        key: '/bikeMap'
    },
    {
        title: 'Charts',
        key: '/admin/charts',
        children: [
            {
                title: 'Bar Chart',
                key: '/charts/bar'
            },
            {
                title: 'Pie Chart',
                key: '/charts/pie'
            },
            {
                title: 'Line Chart',
                key: '/charts/line'
            },
        ]
    },
    {
        title: 'Permission Setting',
        key: '/admin/permission'
    },
];
export default menuConfig;