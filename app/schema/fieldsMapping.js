module.exports = {
    orders: {
        MySql : [
            'orderId', 'customerId', 'total', 'orderStatus'
        ],
        LinkingEntity : "orderId",
        Rethink : [
            'id', 'shipping_firstname', 'shipping_lastname', 'shipping_address_1',
            'shipping_address_2', 'shipping_city', 'shipping_postcode', 'shipping_country',
            'comment', 'created_at', 'updated_at'
        ]
    }
}