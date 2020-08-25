export function parseProductPrice(product, quantity = 1) {
    if (product) {
        if (Array.isArray(product.prices) && product.prices.length > 0) {
            return product.prices[0].price;
        }
    }
    return 0;
}
