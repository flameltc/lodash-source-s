var flameltc = {
  isFloat: num => num % 2 !== 0,
  chunk: function (array, num) {
    let arr = [],
      k = 0
    for (let i = 0; i < array.length; i += num) {
      arr[k] = array.slice(i, i + num)
      k++
    }
    return arr
  },

  compact: function (array) {
    let res = []
    for (let i = 0; i < array.length; i++) {
      if (array[i]) {
        res.push(array[i])
      }
    }
    return res
  },

  difference: function (array, ...value) {
    let res = []
    let val = value[0]
    for (let i = 1; i < value.length; i++) {
      val = val.concat(value[i])
    }
    for (let k = 0; k < array.length; k++) {
      if (!val.includes(array[k])) {
        res.push(array[k])
      }
    }
    return res
  },

  differenceWith: function (array, values, comp) {
    return array.filter(el =>
      values.every(item =>
        !comp(el, item)
      ))
  },

  differenceBy: function (array, ...values) {
    var f = flameltc.identity
    if (typeof values[values.length - 1] !== 'object'){
      f = flameltc.iteratee(values.pop())
    }
    var differBy = values.reduce((acc, arr) => {
      acc.push(arr.map(x => f(x)))
      return acc
    }, [])
    return array.filter(item => !differBy.some(arr => arr.includes(f(item))))
  },

  drop: ((array, val = 1) => {
    return val > array.length ? [] : array.slice(val, array.length)
  }),

  dropRight: ((array, val = 1) => {
    return array.length <= val ? [] : array.slice(0, array.length - val)
  }),

  dropRightWhile: function (array, predicate = flameltc.identity) {
    var f = flameltc.iteratee(predicate)
    var index = -1
    for (var i = array.length - 1; i >= 0; i--){
      if (!f(array[i])) {
        index = i
        break
      }
    }
    return array.slice(0, index + 1)
  },

  fill: ((array, value, start = 0, end = array.length) => {
    for (let i = start; i < end; i++) {
      array[i] = value
    }
    return array
  }),

  findIndex: function (array, predicate = flameltc.identity, fromIndex = 0) {
    predicate = flameltc.iteratee(predicate)
    for (let i = fromIndex; i < array.length; i++) {
      if (predicate(array[i])) {
        return i
      }
    }
    return -1
  },

  fromPairs: function (pairs) {
    return pairs.reduce((res, item) => {
      res[item[0]] = item[1]
      return res
    }, {})
  },

  negate: function (func) {
    return function (...args) {
      return !func(...args)
    }
  },

  once:function (func) {
    
  },

  head: array => {
    return array[0]
  },

  indexOf: function (array, value, number = 0) {
    var isExist = false
    for (let i = number; i < array.length; i++) {
      if (array[i] === value) {
        return i
        isExist = true
      }
    }
    if (isExist === false) {
      return -1
    }
  },

  remove: function (array, predicate) {
    return array.reduce((result, item, index, array) => {
      if (!predicate(item, index, array)) {
        result.push(item)
      }
      return result
    }, [])
  },

  slice: function (array, start = 0, end = array.length) {
    return array.reduce((result, item, index) => {
      if (index >= start && index < end) {
        result.push(item)
      }
      return result
    }, [])
  },

  initial: function (array) {
    return array.slice(0, array.length - 1)
  },

  intersection: function (...arrays) {
    return arguments[0].reduce((result, it) => {
      var count = 1
      for (var i = 1; i < arguments.length; i++) {
        if (arguments[i].includes(it)) {
          count++
        }
      }
      if (count === arguments.length) {
        result.push(it)
      }
      return result
    }, [])
  },

  intersectionWith: function (array1, array2, comp) {
    return array1.reduce((result, it) => {
      for (var i = 0; i < array2.length; i++) {
        if (comp(array2[i], it)) {
          result.push(it)
          break
        }
      }
      return result
    }, [])
  },

  intersectionBy: function (...args) {
    var iteratee = flameltc.identity
    //isArray
    if (Object.prototype.toString.call(args[args.length - 1]) !== '[object Array]') {
      iteratee = args.pop()
    }
    var f = flameltc.iteratee(iteratee)

    return args.reduce((acc, cur) => acc.filter(item => cur.map(x => f(x)).indexOf(f(item)) !== -1))
  },

  join: function (array, separator = ',') {
    var str = ''
    for (var i of array) {
      if (i === array[array.length - 1]) {
        str += "" + i
      } else {
        str += "" + i + separator
      }
    }
    return str
  },

  last: function (array) {
    return array[array.length - 1]
  },

  lastIndexOf: function (array, value, fromIndex = array.length - 1) {
    var isExist = false
    for (let i = fromIndex; i >= 0; i--) {
      if (array[i] === value) {
        return i
        isExist = true
      }
    }
    if (isExist === false) {
      return -1
    }
  },

  nth: function (array, n = 0) {
    if (n < 0) {
      n = array.length + n
    }
    return array[n]
  },

  flatten: function (ary) {
    return [].concat(...ary)
  },

  flattenDeep: function (ary) {
    return ary.reduce((result, item) => {
      if (!Array.isArray(item)) {
        result.push(item)
      } else {
        var tmp = this.flattenDeep(item)
        result = [...result, ...tmp]
      }
      return result
    }, [])
  },

  flattenDepth: function (ary, depth = 1) {
    if (depth == 0) {
      return ary.slice()
    }
    return ary.reduce((result, it) => {
      if (!Array.isArray(it)) {
        result.push(it)
      } else {
        var tmp = this.flattenDepth(it, depth - 1)
        result = [...result, ...tmp]
      }
      return result
    }, [])
  },

  isEqual: function (value, other) {

  },

  pull: function (array, ...values) {
    return flameltc.pullAllBy(array, values)
  },

  pullAll: function (array, values) {
    return this.pull(array, ...values)
  },

  pullAllWith: function (array, values, comp) {
    values.forEach(item => {
      array.map((it, idx) => {
        if (comp(it, item)) {
          array.splice(idx, 1)
        }
      })
    })
    return array
  },

  pullAllBy: (array, values, iteratee = flameltc.identity) => {
    iteratee = flameltc.iteratee(iteratee)
    return values.reduce((acc, cur) => acc.filter(item => iteratee(item) !== iteratee(cur)), array)
  },

  pullAt: (array, indexes) => {
    var c = -1
    return indexes.map(idx => {
      c++
      return array.splice(idx - c, 1)[0]
    })
  },

  after: function (n, func) {
    var c = 0
    return function (...args) {
      c++
      if (c >= n) {
        return func(...args)
      }
    }
  },

  before: function (n, func) {
    var c = 0
    return function (...args) {
      c++
      if (c < n) {
        return func(...args)
      }
    }
  },
  
  ary: function (func, n = func.length) {
    return function (...args) {
      return func(...args.slice(0, n))
    }
  },

  flip: function (func) {
    return function (...args) {
      return func.apply(this, args.reverse())
    }
  },

  defer: function (func, ...args) {
    return setTimeout(func, 1,...args);
  },

  unary: function (func) {
    return function (value) {
      return func(value)
    }
  },

  delay:function (func,wait,...args) {
    return setTimeout(func, wait,...args);
  },

  flip: function (func) {
    return function (...args) {
      return func(...args.reverse())
    }
  },
  
  once:function (func) {
    return flameltc.before(2,func)
  },

  overArgs:function (func,transforms) {
    return function (...args) {
      const index=-1
      while(++index<transforms.length){
        args[index]=trans
      }
    }
  },

  spread: function (func) {
    return function (ary) {
      return func.apply(null, ary)
    }
  },

  reverse: function (array) {
    for (var i = 0; i < array.length / 2; i++) {
      var tmp = array[i]
      array[i] = array[array.length - i - 1]
      array[array.length - i - 1] = tmp
    }
    return array
  },

  sortedIndex: function (array, value) {
    var right = array.length - 1
    var left = 0
    var mid = Math.floor((right + left) / 2)
    while (right - left > 1) {
      if (value <= array[mid]) {
        right = mid
      } else {
        left = mid
      }
      mid = Math.floor((right + left) / 2)
    }
    if (array[mid] < value) {
      mid++
    }
    return mid
  },

  sortedLastIndex: function (array, value) {
    var right = array.length - 1
    var left = 0
    var mid = Math.floor((right + left) / 2)
    if (value >= array[right]) {
      return right + 1
    }
    while (right - left > 1) {
      if (value >= array[mid]) {
        left = mid
      } else {
        right = mid
      }
      mid = Math.floor((right + left) / 2)
    }
    if (array[mid] <= value) {
      mid++
    }
    return mid
  },

  sortedIndexOf: function (array, value) {
    var left = 0
    var right = array.length
    var mid = Math.floor((left + right) / 2)
    while (right - left > 1) {
      if (array[mid] >= value) {
        right = mid
      } else {
        left = mid
      }
      if (array[left] == value) {
        return left
      }
      mid = Math.floor((left + right) / 2)
    }
    if (array[mid] < value) {
      mid++
    }
    if (array[mid] !== value) {
      return -1
    }
    return mid
  },

  sortedLastIndexOf: function (array, value) {
    var left = 0
    var right = array.length
    var mid = Math.floor((left + right) / 2)
    while (right - left > 1) {
      if (array[mid] <= value) {
        left = mid
      } else {
        right = mid
      }
      if (array[right] == value) {
        return right
      }
      mid = Math.floor((left + right) / 2)
    }
    if (array[mid] < value) {
      mid++
    }
    if (array[mid] !== value) {
      return -1
    }
    return mid
  },

  sortedIndexBy: (array, value, iteratee = flameltc.identity) => {
    iteratee = flameltc.iteratee(iteratee)
    array = array.map(item => iteratee(item))
    value = iteratee(value)
    let left = 0
    let right = array.length
    let mid = Math.floor((left + right) / 2)

    while (right - left > 1) {
      if (array[mid] >= value) right = mid
      else left = mid
      mid = Math.floor((left + right) / 2)
    }

    if (array[mid] < value) mid++
    return mid
  },

  sortedLastIndexBy: (array, value, iteratee = flameltc.identity) => {
    iteratee = flameltc.iteratee(iteratee)
    array = array.map(item => iteratee(item))
    value = iteratee(value)
    let left = 0
    let right = array.length
    let mid = Math.floor((left + right) / 2)

    while (right - left > 1) {
      if (array[mid] <= value) left = mid
      else right = mid
      mid = Math.floor((left + right) / 2)
    }

    if (array[mid] <= value) mid++
    return mid
  },

  uniq: function (array) {
    return Array.from(new Set(array))
  },

  uniqWith: function (array, comp) {
    return array.reduce((res, item) => {
      for (var it2 of res) {
        if (comp(item, it2)) {
          return res
        }
      }
      res.push(item)
      return res
    }, [])
  },

  uniqBy: function (array, iteratee = flameltc.identity) {
    let iteratee = flameltc.iteratee(iteratee)
    let set = new Set()

    return array.filter(item => {
      let el = iteratee(item)
      if (!set.has(el)) {
        set.add(el)
        return true
      } else return false
    })
  },

  sortedUniq: function (array) {
    if (array.length == 0) {
      return []
    }
    var result = []
    result[0] = array[0]
    for (var it of array) {
      if (it > result[result.length - 1]) {
        result.push(it)
      }
    }
    return result
  },

  sortedUniqBy: function (array, iteratee) {
    if (array.length == 0) {
      return []
    }
    var result = []
    result[0] = array[0]
    for (var it of array) {
      if (iteratee(it) > iteratee(result[result.length - 1])) {
        result.push(it)
      }
    }
    return result
  },

  tail: function name(array) {
    return array.slice(1, array.length)
  },

  take: function (array, n = 1) {
    return array.slice(0, n)
  },

  takeWhile: (array, predicate = flameltc.identity) => {
    predicate = flameltc.iteratee(predicate)
    for (var i = 0; i < array.length; i++) {
      if(!predicate(array[i])) return flameltc.take(array, i)
    }
    return []
  },

  takeRight: function (array, n = 1) {
    if (n >= array.length) {
      n = array.length
    }
    return array.slice(array.length - n, array.length)
  },

  takeRightWhile: (array, predicate = flameltc.identity) => {
    predicate = flameltc.iteratee(predicate)
    for (let i = array.length - 1; i >= 0; i--) {
      if(!predicate(array[i])) return flameltc.takeRight(array, array.length - 1 - i)
    }
    return []
  },

  union: function (...ary) {
    var result = []
    result = result.concat(...ary)
    return this.uniq(result)
  },

  unionBy: (...arrays) => {
    let iteratee = arrays.pop()
    return flameltc.uniqBy([].concat(...arrays), iteratee)
  },

  unionWith: function (array1, array2, comp) {
    array = array1.concat(array2)
    return flameltc.uniqWith(array, comp)
  },

  zip: function (...array) {
    return this.unzip(array)
  },

  zipObject: function (props = [], value = []) {
    var obj = {}
    for (var i = 0; i < props.length; i++) {
      obj[props[i]] = value[i]
    }
    return obj
  },

  zipObjectDeep: function (props = [], values = []) {
    let res = {}

    props.forEach((item, index) => {
      let paths = item.split('.')
      helper(paths, 0, res, values[index])
    })
    return res

    function helper(paths, index, obj, val) {
      let path = paths[index]

      // 终止条件
      if (index === paths.length - 1) return obj[path] = val
      
      // 处理数组/对象情况
      if (path.indexOf('[') !== -1) {
        var left = path.indexOf('[')
        var right = path.indexOf(']')
        var i = path.slice(right - 1, right)
        path = path.slice(0, left)
        if (!obj[path]) obj[path] = []
        obj[path][i] = {}
        return helper(paths, index + 1, obj[path][i], val)
      } else {
        if (!obj[path]) obj[path] = {}
        return helper(paths, index + 1, obj[path], val)
      }
    }
  },

  zipWith: function (...args) {
    var predicate = this.iteratee(args.pop())
    return this.zip(...args).reduce((res, cur) => {
      res.push(predicate(...cur))
      return res
    }, [])

  },

  unzip: function (array) {
    var result = [],
      max = 0
    for (var it of array) {
      max = Math.max(max, it.length)
    }
    for (var i = 0; i < max; i++) {
      result[i] = []
      for (var j = 0; j < array.length; j++) {
        result[i].push(array[j][i])
      }
    }
    return result
  },

  unzipWith: function (array, iteratee = flameltc.identity) {
    var result = [],
      max = 0
    for (var it of array) {
      max = Math.max(max, it.length)
    }
    for (var i = 0; i < max; i++) {
      result[i] = []
      var sum = 0
      for (var j = 0; j < array.length; j++) {
        if (array[j][i] == undefined) {
          sum = sum
        } else {
          sum += array[j][i]
        }
      }
      result[i] = sum
    }
    return result
  },

  without: function (array, ...values) {
    return array.reduce((result, it) => {
      if (!values.includes(it)) {
        result.push(it)
      }
      return result
    }, [])
  },

  xor: function (...arrays) {
    var arr = [].concat(...arrays)
    return arr.filter(item => {
      return arr.indexOf(item) == arr.lastIndexOf(item)
    })
  },

  xorBy: function (...args) {
    var predicate = this.identity
    if (typeof (args[args.length - 1]) == 'function' || typeof (args[args.length - 1]) == 'string') {
      predicate = this.iteratee(args.pop())
    }
    var ary = [].concat(...args)
    var ary2 = ary.map(item => predicate(item))
    return ary.filter(item => {
      return ary2.indexOf(predicate(item)) == ary2.lastIndexOf(predicate(item))
    })
  },

  xorWith: function (...args) {
    let comparator = args.pop()
    let arr = [].concat(...args)
    let res = []
    for (let i = 0; i < arr.length; i++){
      let tag = false
      for (var j = 0; j < arr.length; j++){
        if(i !== j && comparator(arr[i], arr[j])) tag = true
      }
      if(!tag) res.push(arr[i])
    }
  },

  concat: function (array, ...values) {
    return array.concat(...values)
  },

  countBy: function (col, iteratee = this.identity) {
    predicate = this.iteratee(iteratee)
    return col.reduce((res, item) => {
      var key = predicate(item)
      if (res[key]) {
        res[key]++
      } else {
        res[key] = 1
      }
      return res
    }, {})
  },

  every: function (col, predicate = _.identity) {
    pre = this.iteratee(predicate)
    for (var item of col) {
      if (!pre(item)) {
        return false
      }
    }
    return true
  },

  filter: function (collection, predicate = this.identity) {
    var pre = this.iteratee(predicate)
    return collection.reduce((result, item, index, collection) => {
      if (pre(item, index, collection)) {
        result.push(item)
      }
      return result
    }, [])
  },

  map: function (collection, iter = flameltc.identity) {
    if (!Array.isArray(collection)) {
      collection = Object.values(collection)
    }
    if (typeof (iter) == 'function') {
      return collection.reduce((result, item) => {
        result.push(iter(item))
        return result
      }, [])
    } else {
      return collection.reduce((result, item) => {
        if (item[iter]) {
          result.push(item[iter])
        }
        return result
      }, [])
    }
  },

  reduce: function (collection, iteratee = flameltc.identity, accumulator) {
    collection = Object.entries(collection)
    acc = collection[0][1]
    let f = flameltc.iteratee(iteratee)
    let i = 1
    if (accumulator !== undefined) {
      acc = accumulator
      i = 0
    }
    for (; i < collection.length; i++){
      acc = f(acc, collection[i][1], collection[i][0])
    }
    return acc
  },

  sample: function (collection) {
    let arr = Object.entries(collection)
    let ran = arr[~~(Math.random() * arr.length)]
    if (flameltc.isArray(collection)) return ran[0]
    else return {[ran[0]]: ran[1]}
  },

  find: function (col, predicate = this.identity, fromIndex = 0) {
    var iter = this.iteratee(predicate)
    var res = col.filter(item =>
      iter(item)
    )
    return res[fromIndex]
  },

  findLast: function (col, predicate = this.identity, fromIndex = col.length - 1) {
    var iter = this.iteratee(predicate)
    var res = col.filter(item =>
      iter(item)
    )
    return res[res.length - 1]
  },

  flatMap: function (col, iteratee = this.identity) {
    return col.reduce((res, item) => {
      res = res.concat(iteratee(item))
      return res
    }, [])
  },

  forEach: function (col, iteratee = this.identity) {
    if (Array.isArray(col)) {
      for (var value of col) {
        iteratee(value)
      }
    } else {
      for (var key in col) {
        iteratee(col[key], key)
      }
    }
  },

  includes: function (col, value, fromIndex = 0) {
    if (Array.isArray(col)) {
      for (let i = fromIndex; i < col.length; i++) {
        if (col[i] == value) {
          return true
        }
      }
      return false
    } else if (typeof (a) == 'string') {
      if (!col.indexOf(value)) {
        return false
      }
      return true
    } else {
      for (var key in col) {
        if (col[key] == value) {
          return true
        }
      }
      return false
    }
  },



  add: (augend, addend) => augend + addend,

  ceil: (number, precision = 0) => {
    return Math.ceil(number * (10 ** precision)) / 10 ** precision
  },

  divide: (dividend, divisor) => dividend / divisor,

  floor: (number, precision = 0) => {
    return Math.floor(number * (10 ** precision)) / 10 ** precision
  },

  max: function (array) {
    return this.maxBy(array, it => it)
  },

  maxBy: function (array, iteratee = this.identity) {
    var iter = this.iteratee(iteratee)
    if (array.length == 0) {
      return undefined
    }
    return array.reduce((pre, it) => {
      return pre = iter(pre) > iter(it) ? pre : it
    })
  },

  mean: function (array) {
    return this.sum(array) / array.length
  },

  meanBy: function (array, iteratee = this.identity) {
    return this.sumBy(array, iteratee) / array.length
  },

  min: function (array) {
    return this.minBy(array, it => it)
  },

  minBy: function (array, iteratee = this.identity) {
    var iter = this.iteratee(iteratee)
    if (array.length == 0) {
      return undefined
    }
    return array.reduce((pre, it) => {
      return pre = iter(pre) < iter(it) ? pre : it
    })
  },

  multiply: (multiplier, multiplicand) => multiplier * multiplicand,

  round: function (number, precision = 0) {
    return Math.round(number * (10 ** precision)) / 10 ** precision
  },

  subtract: function (minuend, subtrahend) {
    return minuend - subtrahend
  },

  sumBy: function (ary, iteratee = flameltc.identity) {
    var result = 0
    if (typeof (iteratee) == 'function') {
      for (var i = 0; i < ary.length; i++) {
        result += iteratee(ary[i])
      }
    }
    if (typeof (iteratee) == 'string') {
      for (var i = 0; i < ary.length; i++) {
        result += ary[i][iteratee]
      }
    }
    return result
  },

  sum: function (ary) {
    return this.sumBy(ary, item => item)
  },

  clamp: function (number, lower, upper) {
    if (number <= lower) {
      num = lower
    } else if (number >= upper) {
      number = upper
    }
    return number
  },

  eq: (value, other) => {
    value === other || (value !== value && other !== other)
  },

  isArguments: function (value) {
    return Object.prototype.toString.call(value) === '[object Arguments]'
  },

  isArray: function (value) {
    return Object.prototype.toString.call(value) === "[object Array]"
  },

  isArrayBuffer: function (value) {
    return Object.prototype.toString.call(value) === '[object ArrayBuffer]'
  },

  isArrayLike: function (value) {
    return !flameltc.isNil(value) && value.hasOwnProperty('length') && typeof value !== 'function'
  },

  isBoolean: function (value) {
    return Object.prototype.toString.call(value) === '[object Boolean]'
  },

  isDate: value => {
    return Object.prototype.toString.call(value) === '[object Date]'
  },

  isElement: value => {
    return value !== null && typeof value === 'object' && value.nodeType === 1
  },

  isNumber: function (value) {
    return Object.prototype.toString.call(value) === '[object Number]'
  },

  isEmpty: function (value) {
    return flameltc.isNil(value) || Object.values(value).length === 0
  },

  isError: function (value) {
    return value instanceof Error === true
  },

  isObject: value => {
    return value !== null && typeof value === 'object' || typeof value === 'function'
  },

  isRegExp: function (value) {
    return Object.prototype.toString.call(value) === '[object RegExp]'
  },

  isSet: function (value) {
    return Object.prototype.toString.call(value) === '[object Set]'
  },

  isString: function (value) {
    return Object.prototype.toString.call(value) === '[object String]'
  },

  isWeakMap: function (value) {
    return Object.prototype.toString.call(value) === '[object WeakMap]'
  },

  isWeakSet: function (value) {
    return Object.prototype.toString.call(value) === '[object WeakSet]'
  },

  isNative: value => value.toString().includes('[native code]'),

  isSymbol: function (value) {
    return typeof value === 'symbol'
  },

  isUndefined: function (value) {
    return typeof value === 'undefined'
  },


  isFinite: function (value) {
    return Number.isFinite(value)
  },

  isEqual: function (value, other) {
    if (value === other) return true
    if (value !== value && other !== other) return true
    if (Object.prototype.toString.call(value) !== Object.prototype.toString.call(other)) return false
    
    if (flameltc.isObject(value)) {
      let val = Object.keys(value)
      let oth = Object.keys(other)

      if (val.length !== oth.length) return false
      for (let key of val) {
        if(!flameltc.isEqual(value[key], other[key])) return false
      }
      return true
    }
    return false
  },

  isFunction: value => {
    return typeof value === 'function'
  },

  ifNil: value => {
    return value === null || value === undefined
  },
  
  

  inRange: function (number, start = 0, end) {
    if ((number > start && number < end) || (number < start && number > end)) {
      return true
    }
    return false
  },



  identity: function (value) {
    return value
  },

  matches: function (source) {
    return function (obj) {
      for (var key in source) {
        if (source[key] !== obj[key])
          return false
      }
      return true
    }
  },

  iteratee: function (iter) {
    if (typeof (iter) === 'function') {
      return iter
    }
    if (typeof (iter) === 'string') {
      return flameltc.property(iter)
    }
    if (Object.prototype.toString.call(iter) === '[object Object]'){
      return flameltc.matches(iter)
    }
    if (flameltc.isArray(iter)) {
      // !!! 只写了数组 length === 2 的情况
      return obj => flameltc.isEqual(obj[iter[0]], iter[1])
    }
    // isRegExp
    // /(?<=\/).*?(?=\/)/
    if (flameltc.isRegExp(iter)) {
      return str => iter.exec(str)
    }
  },

  property: function (propName) {
    return function (obj) {
      return obj[propName]
    }
  },
}