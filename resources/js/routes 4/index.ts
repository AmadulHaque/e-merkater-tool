import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../wayfinder'
/**
* @see \Osiset\ShopifyApp\Http\Controllers\WebhookController::webhook
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/WebhookController.php:23
* @route '/webhook/{type}'
*/
export const webhook = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhook.url(args, options),
    method: 'post',
})

webhook.definition = {
    methods: ["post"],
    url: '/webhook/{type}',
} satisfies RouteDefinition<["post"]>

/**
* @see \Osiset\ShopifyApp\Http\Controllers\WebhookController::webhook
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/WebhookController.php:23
* @route '/webhook/{type}'
*/
webhook.url = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { type: args }
    }

    if (Array.isArray(args)) {
        args = {
            type: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        type: args.type,
    }

    return webhook.definition.url
            .replace('{type}', parsedArgs.type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Osiset\ShopifyApp\Http\Controllers\WebhookController::webhook
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/WebhookController.php:23
* @route '/webhook/{type}'
*/
webhook.post = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhook.url(args, options),
    method: 'post',
})

/**
* @see \Osiset\ShopifyApp\Http\Controllers\WebhookController::webhook
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/WebhookController.php:23
* @route '/webhook/{type}'
*/
const webhookForm = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: webhook.url(args, options),
    method: 'post',
})

/**
* @see \Osiset\ShopifyApp\Http\Controllers\WebhookController::webhook
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/WebhookController.php:23
* @route '/webhook/{type}'
*/
webhookForm.post = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: webhook.url(args, options),
    method: 'post',
})

webhook.form = webhookForm

/**
* @see routes/web.php:13
* @route '/'
*/
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:13
* @route '/'
*/
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see routes/web.php:13
* @route '/'
*/
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

/**
* @see routes/web.php:13
* @route '/'
*/
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

/**
* @see routes/web.php:13
* @route '/'
*/
const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see routes/web.php:13
* @route '/'
*/
homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see routes/web.php:13
* @route '/'
*/
homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

home.form = homeForm

/**
* @see \Osiset\ShopifyApp\Http\Controllers\AuthController::authenticate
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/AuthController.php:30
* @route '/authenticate'
*/
export const authenticate = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: authenticate.url(options),
    method: 'get',
})

authenticate.definition = {
    methods: ["get","post","head"],
    url: '/authenticate',
} satisfies RouteDefinition<["get","post","head"]>

/**
* @see \Osiset\ShopifyApp\Http\Controllers\AuthController::authenticate
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/AuthController.php:30
* @route '/authenticate'
*/
authenticate.url = (options?: RouteQueryOptions) => {
    return authenticate.definition.url + queryParams(options)
}

/**
* @see \Osiset\ShopifyApp\Http\Controllers\AuthController::authenticate
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/AuthController.php:30
* @route '/authenticate'
*/
authenticate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: authenticate.url(options),
    method: 'get',
})

/**
* @see \Osiset\ShopifyApp\Http\Controllers\AuthController::authenticate
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/AuthController.php:30
* @route '/authenticate'
*/
authenticate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: authenticate.url(options),
    method: 'post',
})

/**
* @see \Osiset\ShopifyApp\Http\Controllers\AuthController::authenticate
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/AuthController.php:30
* @route '/authenticate'
*/
authenticate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: authenticate.url(options),
    method: 'head',
})

/**
* @see \Osiset\ShopifyApp\Http\Controllers\AuthController::authenticate
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/AuthController.php:30
* @route '/authenticate'
*/
const authenticateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: authenticate.url(options),
    method: 'get',
})

/**
* @see \Osiset\ShopifyApp\Http\Controllers\AuthController::authenticate
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/AuthController.php:30
* @route '/authenticate'
*/
authenticateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: authenticate.url(options),
    method: 'get',
})

/**
* @see \Osiset\ShopifyApp\Http\Controllers\AuthController::authenticate
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/AuthController.php:30
* @route '/authenticate'
*/
authenticateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: authenticate.url(options),
    method: 'post',
})

/**
* @see \Osiset\ShopifyApp\Http\Controllers\AuthController::authenticate
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/AuthController.php:30
* @route '/authenticate'
*/
authenticateForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: authenticate.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

authenticate.form = authenticateForm

/**
* @see \Osiset\ShopifyApp\Http\Controllers\BillingController::billing
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/BillingController.php:40
* @route '/billing/{plan?}'
*/
export const billing = (args?: { plan?: string | number } | [plan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: billing.url(args, options),
    method: 'get',
})

billing.definition = {
    methods: ["get","head"],
    url: '/billing/{plan?}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Osiset\ShopifyApp\Http\Controllers\BillingController::billing
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/BillingController.php:40
* @route '/billing/{plan?}'
*/
billing.url = (args?: { plan?: string | number } | [plan: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return billing.definition.url
            .replace('{plan?}', parsedArgs.plan?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Osiset\ShopifyApp\Http\Controllers\BillingController::billing
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/BillingController.php:40
* @route '/billing/{plan?}'
*/
billing.get = (args?: { plan?: string | number } | [plan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: billing.url(args, options),
    method: 'get',
})

/**
* @see \Osiset\ShopifyApp\Http\Controllers\BillingController::billing
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/BillingController.php:40
* @route '/billing/{plan?}'
*/
billing.head = (args?: { plan?: string | number } | [plan: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: billing.url(args, options),
    method: 'head',
})

/**
* @see \Osiset\ShopifyApp\Http\Controllers\BillingController::billing
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/BillingController.php:40
* @route '/billing/{plan?}'
*/
const billingForm = (args?: { plan?: string | number } | [plan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: billing.url(args, options),
    method: 'get',
})

/**
* @see \Osiset\ShopifyApp\Http\Controllers\BillingController::billing
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/BillingController.php:40
* @route '/billing/{plan?}'
*/
billingForm.get = (args?: { plan?: string | number } | [plan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: billing.url(args, options),
    method: 'get',
})

/**
* @see \Osiset\ShopifyApp\Http\Controllers\BillingController::billing
* @see vendor/kyon147/laravel-shopify/src/Http/Controllers/BillingController.php:40
* @route '/billing/{plan?}'
*/
billingForm.head = (args?: { plan?: string | number } | [plan: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: billing.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

billing.form = billingForm

/**
* @see \Laravel\Telescope\Http\Controllers\HomeController::telescope
* @see vendor/laravel/telescope/src/Http/Controllers/HomeController.php:15
* @route '/telescope/{view?}'
*/
export const telescope = (args?: { view?: string | number } | [view: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: telescope.url(args, options),
    method: 'get',
})

telescope.definition = {
    methods: ["get","head"],
    url: '/telescope/{view?}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Telescope\Http\Controllers\HomeController::telescope
* @see vendor/laravel/telescope/src/Http/Controllers/HomeController.php:15
* @route '/telescope/{view?}'
*/
telescope.url = (args?: { view?: string | number } | [view: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { view: args }
    }

    if (Array.isArray(args)) {
        args = {
            view: args[0],
        }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
        "view",
    ])

    const parsedArgs = {
        view: args?.view,
    }

    return telescope.definition.url
            .replace('{view?}', parsedArgs.view?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Laravel\Telescope\Http\Controllers\HomeController::telescope
* @see vendor/laravel/telescope/src/Http/Controllers/HomeController.php:15
* @route '/telescope/{view?}'
*/
telescope.get = (args?: { view?: string | number } | [view: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: telescope.url(args, options),
    method: 'get',
})

/**
* @see \Laravel\Telescope\Http\Controllers\HomeController::telescope
* @see vendor/laravel/telescope/src/Http/Controllers/HomeController.php:15
* @route '/telescope/{view?}'
*/
telescope.head = (args?: { view?: string | number } | [view: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: telescope.url(args, options),
    method: 'head',
})

/**
* @see \Laravel\Telescope\Http\Controllers\HomeController::telescope
* @see vendor/laravel/telescope/src/Http/Controllers/HomeController.php:15
* @route '/telescope/{view?}'
*/
const telescopeForm = (args?: { view?: string | number } | [view: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: telescope.url(args, options),
    method: 'get',
})

/**
* @see \Laravel\Telescope\Http\Controllers\HomeController::telescope
* @see vendor/laravel/telescope/src/Http/Controllers/HomeController.php:15
* @route '/telescope/{view?}'
*/
telescopeForm.get = (args?: { view?: string | number } | [view: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: telescope.url(args, options),
    method: 'get',
})

/**
* @see \Laravel\Telescope\Http\Controllers\HomeController::telescope
* @see vendor/laravel/telescope/src/Http/Controllers/HomeController.php:15
* @route '/telescope/{view?}'
*/
telescopeForm.head = (args?: { view?: string | number } | [view: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: telescope.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

telescope.form = telescopeForm
