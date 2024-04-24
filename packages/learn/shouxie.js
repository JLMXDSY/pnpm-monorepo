// 手写防抖函数 触发后延迟ns执行，如果再次触发在ns之内，那么重新计时延迟ns执行 例：防止重复请求
function debounce(fn, delay = 300) {
  let time = null
  return function (...arg) {
    if (time) clearTimeout(time)
    time = setTimeout(() => {
      fn.apply(this, arg)
    }, delay)
  }
}
// const zx = setInterval(debounce((a, b, c) => {
//     console.log('执行防抖函数', a, b, c)
// }), 400, 1, 2, 3)

// 手写节流函数 在时间段ns内多次触发只执行一次  例：监听滚动
function throttle(fn, delay = 4000) {
  let flag = true
  return function (...arg) {
    console.log(flag, 'flag')
    if (!flag) return false
    flag = false
    fn.apply(this, arg)
    const time = setTimeout(() => {
      flag = true
      clearTimeout(time)
    }, delay)
  }
}

// const zx2 = setInterval(throttle((a, b, c) => {
//     console.log('执行节流函数', a, b, c)
// }), 400, 1, 2, 3)

// 节流第二种写法
function throttle2(fn, delay = 4000) {
  let firsttime = new Date().getTime()
  return function (...arg) {
    const othertime = new Date().getTime()
    if (othertime - firsttime >= delay) {
      firsttime = new Date().getTime()
      return fn.apply(this, arg)
    }
  }
}
// const zx3 = setInterval(throttle((a, b, c) => {
//     console.log('执行节流2函数', a, b, c)
// }), 400, 1, 2, 3)

// 手写深拷贝（简单版没有处理循环引用和各种边界问题）
function cloneDeep(value) {
  // 简单类型
  if (typeof value !== 'object' || value === null) return value
  // 如果是数组
  if (Array.isArray(value)) {
    return value.map(cloneDeep)
  }
  // 如果是对象
  const obj = {}
  const keys = Reflect.ownKeys(value)
  keys.forEach(key => {
    obj[key] = cloneDeep(value[key])
  })
  return obj
}

/**
 * 手写一个观察者模式
 * 主体
 *    目标
 *      维护一个观察者们的列表
 *      可以(新增 删除)观察者 需要提供一个订阅接口 一个取消订阅的接口
 *      可以通知所有的观察者们
 *    观察者
 *      接到通知后可以做一些事情
 * */

const subject = {
  observelist: [],
  humidity: 20, // 湿度
  temperature: 30, // 温度
  windLevel: 2, // 风力等级
}
subject.add = function (observe) {
  subject.observelist.push(observe)
}
subject.del = function (observe) {
  subject.observelist.filter(item => item !== observe)
}

subject.notify = function (...args) {
  subject.observelist.forEach(observe => {
    observe.update(...args)
  })
}
subject.stateChange = function (state) {
  for (const key in state) {
    if (Object.hasOwnProperty.call(state, key)) {
      if (state[key] !== subject[key]) {
        subject.notify(state, subject, key)
      }
    }
  }
}
//  因为观察者可以多个，所以观察者必须是一个构造函数的形势
function Observe(name) {
  this.name = name
}

Observe.prototype.update = function (state, subject, key) {
  console.log(`${this.name}收到通知,${key}从${subject[key]}变成了${state[key]}`)
}

// 用类的方式
class Subject {
  // 被观察者
  constructor() {
    this.observelist = []
    this.humidity = 20 // 湿度
    this.temperature = 30 // 温度
    this.windLevel = 2 // 风力等级
  }
  add(observe) {
    this.observelist.push(observe)
  }
  del(observe) {
    this.observelist.filter(item => item !== observe)
  }
  notify(...args) {
    this.observelist.forEach(observe => {
      observe.update(...args)
    })
  }
  stateChange(state) {
    for (const key in state) {
      if (Object.hasOwnProperty.call(state, key)) {
        if (state[key] !== this[key]) {
          this.notify(state, this, key)
        }
      }
    }
  }
}
class Observe2 {
  // 观察者
  constructor(name) {
    this.name = name
  }
  update(state, subject, key) {
    console.log(
      `${this.name}收到通知,${key}从${subject[key]}变成了${state[key]}`,
    )
  }
}

const subject2 = new Subject()
const nm1 = new Observe2('农民1')
const nm2 = new Observe2('农民2')
subject2.add(nm1)
subject2.add(nm2)
subject2.stateChange({ humidity: 30 })

/**
 * 手写一个发布订阅模式
 * 发布订阅最重要的思想就是要有一个信息中心，信息中心记录了订阅了什么，要执行的回调函数列表
 * 主体：信息中心
 *      提供订阅接口(信息中心收集订阅信息)
 *      提供发布接口（信息中心执行订阅回调）
 */

class Account {
  constructor() {
    this.subscribtionInfo = {} // 信息中心 {video:[fn,fn,fn],audio:[fn]}
  }
  // 订阅接口
  on(type, cb) {
    if (!this.subscribtionInfo[type]) {
      this.subscribtionInfo[type] = [cb]
    } else {
      this.subscribtionInfo[type].push(cb)
    }
  }
  // 发布接口
  publish(type, ...args) {
    if (this.subscribtionInfo[type]) {
      this.subscribtionInfo[type].forEach(fn => fn(...args))
    }
  }
  // 取消订阅
  off(type, cb) {
    if (!this.subscribtionInfo[type]) return
    if (!cb) return delete this.subscribtionInfo[type]
    this.subscribtionInfo[type] = this.subscribtionInfo[type].filter(
      item => item !== cb,
    )
    if (this.subscribtionInfo[type].length === 0)
      delete this.subscribtionInfo[type]
  }
  // 只订阅一次
  once(type, cb) {
    const fn = (...args) => {
      cb(...args)
      this.off(type, fn)
    }
    this.on(type, fn)
  }
}
const account = new Account()
account.on('小明', function (...args) {
  console.log(`通知小明你在我这里存的事件可以执行了+${args}`)
})
account.once('小红', function (...args) {
  console.log(`通知小红你在我这里存的事件可以执行了+${args}`)
})
account.publish('小明', 2, 3, 4)
account.publish('小明', 2, 3, 4)
account.publish('小红', 666)
account.publish('小红', 777)

// 把Adog的结构转换成
const Adog = [
  {
    value: 'A',
    children: [
      {
        value: 'A1',
        children: [
          {
            value: 'A1.1',
          },
        ],
      },
    ],
  },
  {
    value: 'B',
    children: [
      {
        value: 'B1',
        children: [
          {
            value: 'B1.1',
          },
          {
            value: 'B1.2',
          },
        ],
      },
      {
        value: 'B2',
        children: [
          {
            value: 'B2.1',
            children: [{ value: 'B2.1.1' }, { value: 'B2.1.2' }],
          },
          {
            value: 'B2.2',
          },
        ],
      },
    ],
  },
]

// [
//     { name1: 'A', name2: 'A1', name3: 'A1.1' },
//     { name1: 'B', name2: 'B1', name3: 'B1.1' },
//     { name1: 'B', name2: 'B1', name3: 'B1.2' },
//     { name1: 'B', name2: 'B2', name3: 'B2.1', name4: 'B2.1.1' },
//     { name1: 'B', name2: 'B2', name3: 'B2.1', name4: 'B2.1.2' },
//     { name1: 'B', name2: 'B2', name3: 'B2.2' },
// ];

function flatDog(arr, currentIndex = 1, path = {}) {
  const flatArr = []
  arr.map(item => {
    const newPath = { ...path, [`name${currentIndex}`]: item.value }
    if (item.children && item.children.length > 0) {
      const childrenFlat = flatDog(item.children, currentIndex + 1, newPath)
      flatArr.push(...childrenFlat)
    } else {
      flatArr.push(newPath)
    }
  })
  return flatArr
}

const newDog = flatDog(Adog)
console.log(newDog)

// 1*2*3 = 6
// 1*2*3*4 =  24
function factorial(x) {
  // 阶乘递归算法
  if (x <= 1) {
    return x
  } else {
    return x * factorial(x - 1)
  }
}
console.log(factorial(5))

/**
 * 斐波那契 1 1 2 3 5 8 13 21 34
 */
function fibonacci(x) {
  if (x <= 2) {
    return 1
  } else {
    return fibonacci(x - 1) + fibonacci(x - 2)
  }
}
console.log(fibonacci(8))

// const o = { a: 1, b: [1, 2, { c: true }], d: { e: 2, f: 3 }, g: null };fn(o) => 扁平化转换{ "a": 1, "b[0]": 1, "b[1]": 2, "b[2].c": true, "d.e": 2, ... }
const o = {
  a: 1,
  b: [1, 2, { c: true }],
  d: { e: 2, f: 3, j: [1, 2, { a: 1, b: 2 }] },
  g: null,
}

function TYPEOF(param) {
  return Object.prototype.toString.call(param).slice(8, -1)
}

function flatObject(object) {
  const obj = {}
  function f1(object, props = null) {
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        if (
          TYPEOF(object[key]) === 'Object' ||
          TYPEOF(object[key]) === 'Array'
        ) {
          f1(
            object[key],
            props
              ? TYPEOF(object) === 'Array'
                ? `${props}[${key}]`
                : `${props}.${key}`
              : key,
          )
        } else {
          if (props) {
            if (TYPEOF(object) === 'Array') {
              obj[`${props}[${key}]`] = object[key]
              console.log(obj, '000')
            } else {
              obj[`${props}.${key}`] = object[key]
              console.log(obj, '111')
            }
          } else {
            obj[key] = object[key]
            console.log(obj, '222')
          }
        }
      }
    }
    return obj
  }
  f1(object)
  return obj
}

console.log(flatObject(o))

const a = 1111
const b = 2222
constc = 3333
constd = 4444
