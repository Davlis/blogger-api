export function errorWrap(handler) {
    return function (...args) {
        handler(...args).catch(args[args.length - 1])
    }
}