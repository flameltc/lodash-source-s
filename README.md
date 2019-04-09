* cloneDeep

```js
cloneDeep: value => {
    if (value === null || typeof value !== 'object') return value
    
    let ctor = value.constructor
    let obj

    switch (ctor) {
      case RegExp:
        obj = new ctor(value)
        break
      default:
        obj = new ctor()
    }

    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        obj[key] = this.cloneDeep(value[key])
      }
    }
  },
```

* memoize

```js
// 参数 resolver 是个 function, 用来计算 key
// 如果没有传入 key, 则用 memo 的第一个参数作为当做 key
memoize: (func, resolver = (...args) => args[0]) => {
    var memo = function (...args) {
      var cache = memo.cache
      var key = resolver(...args)
      if (cache.has(key)) return cache.get(key)
      else cache.set(key, func(...args))
    }

    memo.cache = new Map()
    return memo
  }
```

* call/apply

```js
// call
function call(func, context, ...args) {
  context = context == null ? window : context
  context.fn = func
  let result = context.fn(...args)
  delete context.fn
  return result
}
//apply
function apply(func, context, args) {
  context = context == null ? window : context
  args = args === void 0 ? [] : args
  context.fn = func
  let result = context.fn(...args)
  delete context.fn
  return result
}
```

* iteratee

  通过iteratee函数, 将传入的参数处理成一个函数,这使得我们在使用lodash的一些高阶函数时,传入的值并不局限于函数,传入的值会被iteratee进行处理,返回需要的函数.

