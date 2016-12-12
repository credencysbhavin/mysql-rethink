/**
 * Orders Entity fields
 */
var type = thinky.type;
module.exports = thinky.createModel('Orders', {
    id: type.string(),
    shipping_firstname: type.string(),
    shipping_lastname: type.string(),
    shipping_address_1: type.string(),
    shipping_address_2: type.string(),
    shipping_city: type.string(),
    shipping_postcode: type.string(),
    shipping_country: type.string(),
    comment: type.string(),
    created_at: type.date(),
    updated_at: type.date(),
    orderId :type.string()
});