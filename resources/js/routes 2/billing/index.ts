import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../wayfinder'
/**
* @see \Osiset\ShopifyApp\Http\Controllers\BillingController::process
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/BillingController.php:79
* @route '/billing/process/{plan?}'
*/
export const process = (args?: { plan?: string | number } | [plan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: process.url(args, options),
    method: 'get',
})

process.definition = {
    methods: ["get","head"],
    url: '/billing/process/{plan?}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Osiset\ShopifyApp\Http\Controllers\BillingController::process
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/BillingController.php:79
* @route '/billing/process/{plan?}'
*/
process.url = (args?: { plan?: string | number } | [plan: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { plan: args }
    }

    if (Array.isArray(args)) {
        args = {
            plan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
        "plan",
    ])

    const parsedArgs = {
        plan: args?.plan,
    }

    return process.definition.url
            .replace('{plan?}', parsedArgs.plan?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Osiset\ShopifyApp\Http\Controllers\BillingController::process
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/BillingController.php:79
* @route '/billing/process/{plan?}'
*/
process.get = (args?: { plan?: string | number } | [plan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: process.url(args, options),
    method: 'get',
})

/**
* @see \Osiset\ShopifyApp\Http\Controllers\BillingController::process
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/BillingController.php:79
* @route '/billing/process/{plan?}'
*/
process.head = (args?: { plan?: string | number } | [plan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: process.url(args, options),
    method: 'head',
})

/**
* @see \Osiset\ShopifyApp\Http\Controllers\BillingController::process
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/BillingController.php:79
* @route '/billing/process/{plan?}'
*/
const processForm = (args?: { plan?: string | number } | [plan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: process.url(args, options),
    method: 'get',
})

/**
* @see \Osiset\ShopifyApp\Http\Controllers\BillingController::process
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/BillingController.php:79
* @route '/billing/process/{plan?}'
*/
processForm.get = (args?: { plan?: string | number } | [plan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: process.url(args, options),
    method: 'get',
})

/**
* @see \Osiset\ShopifyApp\Http\Controllers\BillingController::process
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/BillingController.php:79
* @route '/billing/process/{plan?}'
*/
processForm.head = (args?: { plan?: string | number } | [plan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: process.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

process.form = processForm

/**
* @see \Osiset\ShopifyApp\Http\Controllers\BillingController::usage_charge
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/BillingController.php:135
* @route '/billing/usage-charge'
*/
export const usage_charge = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: usage_charge.url(options),
    method: 'get',
})

usage_charge.definition = {
    methods: ["get","post","head"],
    url: '/billing/usage-charge',
} satisfies RouteDefinition<["get","post","head"]>

/**
* @see \Osiset\ShopifyApp\Http\Controllers\BillingController::usage_charge
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/BillingController.php:135
* @route '/billing/usage-charge'
*/
usage_charge.url = (options?: RouteQueryOptions) => {
    return usage_charge.definition.url + queryParams(options)
}

/**
* @see \Osiset\ShopifyApp\Http\Controllers\BillingController::usage_charge
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/BillingController.php:135
* @route '/billing/usage-charge'
*/
usage_charge.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: usage_charge.url(options),
    method: 'get',
})

/**
* @see \Osiset\ShopifyApp\Http\Controllers\BillingController::usage_charge
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/BillingController.php:135
* @route '/billing/usage-charge'
*/
usage_charge.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: usage_charge.url(options),
    method: 'post',
})

/**
* @see \Osiset\ShopifyApp\Http\Controllers\BillingController::usage_charge
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/BillingController.php:135
* @route '/billing/usage-charge'
*/
usage_charge.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: usage_charge.url(options),
    method: 'head',
})

/**
* @see \Osiset\ShopifyApp\Http\Controllers\BillingController::usage_charge
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/BillingController.php:135
* @route '/billing/usage-charge'
*/
const usage_chargeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: usage_charge.url(options),
    method: 'get',
})

/**
* @see \Osiset\ShopifyApp\Http\Controllers\BillingController::usage_charge
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/BillingController.php:135
* @route '/billing/usage-charge'
*/
usage_chargeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: usage_charge.url(options),
    method: 'get',
})

/**
* @see \Osiset\ShopifyApp\Http\Controllers\BillingController::usage_charge
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/BillingController.php:135
* @route '/billing/usage-charge'
*/
usage_chargeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: usage_charge.url(options),
    method: 'post',
})

/**
* @see \Osiset\ShopifyApp\Http\Controllers\BillingController::usage_charge
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/BillingController.php:135
* @route '/billing/usage-charge'
*/
usage_chargeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: usage_charge.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

usage_charge.form = usage_chargeForm

const billing = {
    process: Object.assign(process, process),
    usage_charge: Object.assign(usage_charge, usage_charge),
}

export default billing