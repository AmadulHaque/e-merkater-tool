import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \Osiset\ShopifyApp\Http\Controllers\AuthController::token
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/AuthController.php:91
* @route '/authenticate/token'
*/
export const token = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: token.url(options),
    method: 'get',
})

token.definition = {
    methods: ["get","head"],
    url: '/authenticate/token',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Osiset\ShopifyApp\Http\Controllers\AuthController::token
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/AuthController.php:91
* @route '/authenticate/token'
*/
token.url = (options?: RouteQueryOptions) => {
    return token.definition.url + queryParams(options)
}

/**
* @see \Osiset\ShopifyApp\Http\Controllers\AuthController::token
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/AuthController.php:91
* @route '/authenticate/token'
*/
token.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: token.url(options),
    method: 'get',
})

/**
* @see \Osiset\ShopifyApp\Http\Controllers\AuthController::token
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/AuthController.php:91
* @route '/authenticate/token'
*/
token.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: token.url(options),
    method: 'head',
})

/**
* @see \Osiset\ShopifyApp\Http\Controllers\AuthController::token
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/AuthController.php:91
* @route '/authenticate/token'
*/
const tokenForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: token.url(options),
    method: 'get',
})

/**
* @see \Osiset\ShopifyApp\Http\Controllers\AuthController::token
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/AuthController.php:91
* @route '/authenticate/token'
*/
tokenForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: token.url(options),
    method: 'get',
})

/**
* @see \Osiset\ShopifyApp\Http\Controllers\AuthController::token
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/AuthController.php:91
* @route '/authenticate/token'
*/
tokenForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: token.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

token.form = tokenForm

const authenticate = {
    token: Object.assign(token, token),
}

export default authenticate