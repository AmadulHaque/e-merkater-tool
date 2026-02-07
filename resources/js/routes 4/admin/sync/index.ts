import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\SyncController::products
* @see app/Http/Controllers/Admin/SyncController.php:14
* @route '/admin/sync/products'
*/
export const products = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: products.url(options),
    method: 'post',
})

products.definition = {
    methods: ["post"],
    url: '/admin/sync/products',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SyncController::products
* @see app/Http/Controllers/Admin/SyncController.php:14
* @route '/admin/sync/products'
*/
products.url = (options?: RouteQueryOptions) => {
    return products.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SyncController::products
* @see app/Http/Controllers/Admin/SyncController.php:14
* @route '/admin/sync/products'
*/
products.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: products.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SyncController::products
* @see app/Http/Controllers/Admin/SyncController.php:14
* @route '/admin/sync/products'
*/
const productsForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: products.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SyncController::products
* @see app/Http/Controllers/Admin/SyncController.php:14
* @route '/admin/sync/products'
*/
productsForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: products.url(options),
    method: 'post',
})

products.form = productsForm

/**
* @see \App\Http\Controllers\Admin\SyncController::orders
* @see app/Http/Controllers/Admin/SyncController.php:25
* @route '/admin/sync/orders'
*/
export const orders = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: orders.url(options),
    method: 'post',
})

orders.definition = {
    methods: ["post"],
    url: '/admin/sync/orders',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SyncController::orders
* @see app/Http/Controllers/Admin/SyncController.php:25
* @route '/admin/sync/orders'
*/
orders.url = (options?: RouteQueryOptions) => {
    return orders.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SyncController::orders
* @see app/Http/Controllers/Admin/SyncController.php:25
* @route '/admin/sync/orders'
*/
orders.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: orders.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SyncController::orders
* @see app/Http/Controllers/Admin/SyncController.php:25
* @route '/admin/sync/orders'
*/
const ordersForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: orders.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SyncController::orders
* @see app/Http/Controllers/Admin/SyncController.php:25
* @route '/admin/sync/orders'
*/
ordersForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: orders.url(options),
    method: 'post',
})

orders.form = ordersForm

const sync = {
    products: Object.assign(products, products),
    orders: Object.assign(orders, orders),
}

export default sync