import { createSelector } from 'reselect';

import { RootState } from './store';

type ICatalogReducer = {
    otServerIP: string,
    orders: any[],
    defaultPrinter: string,

    categories: any[],
    products: any[],
}

export const selectProductsByCategoryId = createSelector<ICatalogReducer, any, any, any>(
    [
        (catalogReducer, categoryUuid) => catalogReducer.products,
        (catalogReducer, categoryUuid) => categoryUuid
    ],
    (products, categoryUuid)  => products.filter(todo => todo.category && todo.category.uuid === categoryUuid),
)
