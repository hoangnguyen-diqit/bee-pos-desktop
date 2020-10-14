import { createSelector } from 'reselect';

type ICatalogReducer = {
    otServerIP: string,
    orders: any[],
    defaultPrinter: string,

    categories: any[],
    products: any[],
    productPrices: any[],
}

export const selectProductsByCategoryId = createSelector<ICatalogReducer, any, any, any>(
    [
        (catalogReducer) => catalogReducer.products,
    ],
    (products) => products
)

export const selectPriceByProductId = createSelector<ICatalogReducer, any, any, any>(
    [
        (catalogReducer) => catalogReducer.productPrices,
    ],
    (prices) => prices,
)
