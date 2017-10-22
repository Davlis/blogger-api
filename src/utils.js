export function errorWrap(handler) {
    return function (...args) {
        handler(...args).catch(args[args.length - 1])
    }
}

export function assertOrThrow(statement, errorType, ...errorArgs) {
    if (!statement) {
        throw new errorType(...errorArgs)
    }
}

export function pick(object, properties) {
    let _object = null

    if (!object) {
        return object
    }

    if (properties && properties.split) {
        properties = properties.split(' ')
    }

    for (let [k, v] of Object.entries(object)) {
        if (properties.includes(k)) {
            _object.k = v
        }
    }

    return _object
}