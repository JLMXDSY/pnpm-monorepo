# 数据类型

## boolean

```ts
let bool:boolean = true
// 赋给 bool 的值也可以是一个计算之后结果是布尔值的表达式
let bool:boolean = !!0
```
## number

```ts
let num:number = 123
num = 0b1111011 // 二进制 123
num = 0o173 // 八进制 123
num = 0x7b // 十六进制 123

```
## string

```ts
let str:string='wangjing'
```
另外还又一个和字符串相关的类型：字面量字符串类型
当把一个变量指定为一个字符串字面量类型的时候，就不能赋值为其他字符串值了

```ts
let str:'wangjing'
str = 'lihe' // error 不能将类型lihe分配给类型wangjing
```

## null 和 undefined

null 和 undefined 默认可以赋值给任意类型的值
当你在tsconfig中的complierOptions里设置了"strickNullChecks":true 时，undefined和null将只能赋值给他们自身和void类型

```ts
let u:undefined = undefined
let n:null = null
```
## 数组

在typescript中有两种定义数组的方式

第一种是推荐写法，number是指数组中元素的类型

```ts
let list1:number[] = [1,2,'3'] 
let list2:Array<number> = [1,2,3]
let list3:[number,string][] = [[1,'2'],[2,'3']]
```

## object

当我们希望一个变量和函数的参数的类型是一个对象，使用这个类型

```ts
let obj:object
obj = {name:'wangjing'}
obj = 123 // error 不能将类型123分配给类型object
console.log(obj.name) // error 类型object上不存在属性name
```

##  symbol




## 元组
数组的拓展：已知数组中元素数量和每一个元素类型的数组

```ts
let tuple:[number,string,boolean]
tuple = [1,'2',false]
tuple[0].split(":"); // error 类型“number”上不存在属性“split”
tuple = [1, '2', false,"b"]; // error 不能将类型“[number, string, boolean,string]”分配给类型“[number,string,boolean]”。 属性“length”的类型不兼容。
```

## enum枚举

```ts
// typescript 会默认从0开始给枚举属性添加编号
enum Roles {
  SUPER_ADMIN,
  ADMIN,
  USER
}
// 我们也可以修改枚举属性默认值从1开始,也可以都自定义一个值
enum Roles{
  SUPER_ADMIN=1,
  ADMIN,
  USER
}
Roles.SUPER_ADMIN //1
Roles[1] //SUPER_ADMIn

// 字符串枚举值要求每个字段的值都必须是字符串字面量，或者是该枚举值中另一个字符串枚举成员
// 字符串枚举不能使用常量或者计算值或其他枚举中的成员
enum Message {
  Error = "error message",
  ServerError = Error,
  ClientError = Error
}
```

## Any类型

我们有时候并不知道一个值是什么类型，就可以用Any类型，赋予任何类型值都可以

但是通常不用any类型，更安全的做法是用unknown

```ts
let arr:any[] = [1,'a',true]
```

## void类型

表示什么类型都不是，例如当一个函数没有返回值可以用

void类型只能赋值undefind和null

```ts
const consoleText = function(text:string):void{
  console.log(text)
}
const consoleText = (text:string):void =>{
  console.log(text)
}
```

## never类型

表示不存在值的类型，比如函数抛出错误异常和死循环

```ts
// 注意：上面的consoleText是没有写返回值，所以是void类型，而infiniteFunc是死循环，根本不会返回值，所以是never类型
const infiniteFunc = (): never => {
  while (true) {}
};
const errorFunc = (message: string): never => {
  throw new Error(message);
};
```

## unknown类型

表示一个未知的类型，它和any的区别是：都是任何类型的值都可以赋值，但是unknown的值不可以随便操作

```ts
let anything:any
anything.value;
anything.length;
any类型做这些操作都是可以的，但unknown是不可以的
```

####  (1) 任何类型的值都可以赋值给 unknown 类型：

```js
let value1: unknown;
value1 = "a";
value1 = 123;
```

#### (2) 如果没有类型断言或基于控制流的类型细化时 unknown 不可以赋值给其它类型，此时它只能赋值给 unknown 和 any 类型：

```js
let value2: unknown;
let value3: string = value2; // error 不能将类型“unknown”分配给类型“string”
value1 = value2;
```

#### (3) 如果没有类型断言或基于控制流的类型细化，则不能在它上面进行任何操作：

```js
let value4: unknown;
value4 += 1; // error 对象的类型为 "unknown"
```

#### (4) unknown 与任何其它类型组成的交叉类型，最后都等于其它类型：

```js
type type1 = unknown & string; // type1 => string
type type2 = number & unknown; // type2 => number
type type3 = unknown & unknown; // type3 => unknown
type type4 = unknown & string[]; // type4 => string[]
```

#### (5) unknown 与任何其它类型组成的联合类型，都等于 unknown 类型，但只有any例外，unknown与any组成的联合类型等于any)：

```js
type type5 = string | unknown; // type5 => unknown
type type6 = any | unknown; // type6 => any
type type7 = number[] | unknown; // type7 => unknown
```

#### (6) never 类型是 unknown 的子类型：

```js
type type8 = never extends unknown ? true : false; // type8 => true
```

#### (7) keyof unknown 等于类型 never：

```js
type type9 = keyof unknown; // type9 => never
```

#### (8) 只能对 unknown 进行等或不等操作，不能进行其它操作：

```js
value1 === value2;
value1 !== value2;
value1 += value2; // error
```

#### (9) unknown 类型的值不能访问其属性、作为函数调用和作为类创建实例：

```js
let value5: unknown;
value5.age; // error
value5(); // error
new value5(); // error
```

#### (10) 使用映射类型时如果遍历的是 unknown 类型，则不会映射任何属性：

```js
type Types<T> = { [P in keyof T]: number };
type type10 = Types<any>; // type10 => { [x: string]: number }
type type11 = Types<unknown>; // type11 => {}
```

我们在实际使用中，如果有类型无法确定的情况，要尽量避免使用 any，因为 any 会丢失类型信息，一旦一个类型被指定为 any，那么在它上面进行任何操作都是合法的，所以会有意想不到的情况发生。因此如果遇到无法确定类型的情况，要先考虑使用 unknown。

# 为函数和函数参数定义类型

## 为函数参数和返回值定义类型

如果省略参数的类型，TypeScript 会默认这个参数是 any 类型；

如果省略返回值的类型，

​	如果函数无返回值，那么 TypeScript 会默认函数返回值是 void 类型；

​	如果函数有返回值，那么 TypeScript 会根据我们定义的逻辑推断出返回类型。

```ts
// 简单的
function add(arg1: number, arg2: number): number {
  return x + y;
}
// 或者
const add = (arg1: number, arg2: number): number => {
  return x + y;
};
```

## 用函数类型定义函数

```ts
// 定义一个函数类型
let add = (x:number,y:number)=>number
add = (arg1:number,arg2:number):number => arg1 + arg2;
```

## 使用接口定义函数

```ts
interface Add {
  (x:number,y:number):number
}
let add:Add = (arg1:number,arg2:number):number => arg1 + arg2;
```

## 使用类型别名定义函数类型

使用`type`关键字可以为原始值、联合类型、元组以及任何我们定义的类型起一个别名。下面定义了 Add 这个别名后，`Add`就成为了一个和`(x: number, y: number) => number`一致的类型定义

```ts
type Add = (x:number,y:number)=>number
let add:Add = (arg1:number,arg2:number):number=>arg1+arg2
```

## 参数

```ts
// 可选参数
let add = (x:number,y?:number)=>number //可选参数必须位于必选参数后
// 默认参数
let add = (x:number=5,y:number)=>number // 默认参数位置随意，不指定类型，typescript会根据默认值自动推算类型
// 剩余参数
let add = (arg1:number,...args:number[]):any=>{
  
}
```

## 函数重载

在其他一些强类型语言中，函数重载是指定义几个函数名相同，但参数个数或类型不同的函数，在调用时传入不同的参数，编译器会自动调用适合的函数。

但是 JavaScript 作为一个动态语言是没有函数重载的，只能我们自己在函数体内通过判断参数的个数、类型来指定不同的处理逻辑。

TypeScript中的重载不同于强类型语言的重载，只是为了针对不同参数个数和类型，推断返回值类型。

```ts
// js
const handleData = value => {
  if (typeof value === "string") {
    return value.split("");
  } else {
    return value
      .toString()
      .split("")
      .join("_");
  }
};

// ts
function handleData(x: string): string[]; // 这个是重载的一部分，指定当参数类型为string时，返回值为string类型的元素构成的数组
function handleData(x: number): string; // 这个也是重载的一部分，指定当参数类型为number时，返回值类型为string
function handleData(x: any): any { // 这个就是重载的内容了，他是实体函数，不算做重载的部分
  if (typeof x === "string") {
    return x.split("");
  } else {
    return x
      .toString()
      .split("")
      .join("_");
  }
}
handleData("abc").join("_");
handleData(123).join("_"); // error 类型"string"上不存在属性"join"
handleData(false); // error 类型"boolean"的参数不能赋给类型"number"的参数。虽然有any但是不可以
```



# 泛型

## 泛型定义

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

```ts
// 我们用any类型的时候有时是不安全的
// 下面这个函数返回的数组的每一项都是any类型
const getArray = (value: any, times: number = 5): any[] => {
  return new Array(times).fill(value);
};
// 当我们使用的时候
getArray([1],2).forEach(item=>{ // [[1],[1]] 返回的数组每一项是数组，所以读length不会有问题
  console.log(item.length)
})
getArray(1,2).forEach(item=>{ // [1,1] 返回的数组每一项是数字，读length是不可以的，但是any不会报错
  console.log(item.length)
})

所以我们用泛型来看下
const getArray = <T>(value:T,times:number=5):T[]=>{
  return new Array(times).fill(value);
}
getArray<number[]>([1],2).forEach(item=>{ 
  console.log(item.length)
})
getArray<number>(1,2).forEach(item=>{ 
  console.log(item.length) // 类型“number”上不存在属性“length”
})
```



## 泛型变量

当处理泛型涉及到泛型的变量时，泛型变量所做的操作和读取的方法必须时所有类型变量公用的才可以，因为泛型可能是任何类型

```ts
const getLength = <T>(params:T):number=>{
  return params.length // Property 'length' does not exist on type 'T'
}
```



## 用泛型定义函数类型

```ts
// 使用函数类型
const getArray:<T,U>(arg:T,time:U)=>(T|U)[] = (arg,time) =>{
  return [arg,time]
}
// 使用类型别名
type GetArray = <T,U>(arg:T,time:U)=>(T|U)[];
const getArray:GetArray = (arg,time)=>{
  return [arg,time]
}
// 使用接口定义
interface GetArray {
  <T,U>(arg:T,time:U):(T|U)[]
}
const getArray:GetArray = (arg,time)=>{
  return [arg,time]
}

// 把泛型变量提升到接口的最外层
interface GetArray<T> {
  (arg: T, times: number): T[];
  tag: T;
}
const getArray: GetArray<number> = <T>(arg: T, times: number): T[] => { 
  //Property 'tag' is missing in type '<T>(arg: T, times: number) => T[]' but required in type 'GetArray<number>'
  return new Array(times).fill(arg);  
};
```



## 给泛型来点约束(^-^)

泛型变量的操作需要时任意类型都有的操作，因为泛型可以是任意类型

但是我们的逻辑通常是针对特定类型的，例如我们要让泛型变量都要有length属性

```ts
// 用接口约束
interface WithLength {
  length:number
}
const getLength = <T extends WithLength>(param:T):number=>{
  return param.length
}
// 用索引类型keyof 约束 K必须是T键之一
const getProp = <T ,K extends keyof T>(obj:T,prop:K)=>{
  return obj[prop]
}
const object1 = {a:1,b:2}
getProp<object>(object1,'c') //Argument of type '"c"' is not assignable to parameter of type '"a" | "b"'.
```

# 类型断言

类型断言就是告诉TypeScript 不要帮我们进行类型检查，而是交给我们自己来

```ts
// 例如如下的函数就会报错
const getLength = (target: string | number): number => {
  if (target.length) { // 类型"string | number"上不存在属性"length"
    return target.length; // 类型"number"上不存在属性"length"
  } else {
    return target.toString().length;
  }
};
//使用类型断言
const getLength = (target: string | number): number => {
  if((target as string).length){
    return (target as string).length
  }else{
    return target.toString().length;
  }
}
```



# 接口

使用接口定义任意类型

```ts
// 可选参数和多余属性检查和只读属性
interface AnyObj {
  color?:string // 可选参数
  type:string
  readonly price?:number
}
const obj:AnyObj = {type:'wanju',size:18} //'size' does not exist in type 'AnyObj'.
obj.price = 3 //Cannot assign to 'price' because it is a read-only property
// 接口定义函数类型
interface FunctionType {
  (num1:number,num2:number):number
}
```

## 避免多余类型检查

### 使用类型断言

```ts
interface Vegetables {
  color?: string;
  type: string;
}
const getVegetables = ({ color, type }: Vegetables) => {
  return `A ${color ? color + " " : ""}${type}`;
};
getVegetables({
  type: "tomato",
  size: 12,
  price: 1.2
} as Vegetables);
```

### 添加索引签名

更好的方式是添加字符串索引签名

```ts
interface Vegetables {
  color: string;
  type: string;
  [prop: string]: any;
}
const getVegetables = ({ color, type }: Vegetables) => {
  return `A ${color ? color + " " : ""}${type}`;
};
getVegetables({
  color: "red",
  type: "tomato",
  size: 12,
  price: 1.2
});
```

### 使用类型兼容

如果一个变量A要复制给另一个变量B，那么A至少要有和B相同的属性，多了没事

```ts
interface Vegetables {
  type: string;
}
const getVegetables = ({ type }: Vegetables) => {
  return `A ${type}`;
};

const option = { type: "tomato", size: 12 }; // 类型兼容
getVegetables(option);
```

## 索引类型

使用接口描述索引的类型和通过索引得到的值的类型

```ts
interface RoleDic {
  [id: number]: string; //定义索引的类型是number 值的类型是string
}
// 这里有的点需要注意：
// 你可以设置索引类型为 number。但是这样如果你将属性名设置为字符串类型，则会报错；
// 但是如果你设置索引类型为字符串类型，那么即便你的属性名设置的是数值类型，也没问题。
// 因为 JS 在访问属性值的时候，如果属性名是数值类型，会先将数值类型转为字符串，然后再去访问
```

## 继承接口

```ts
interface Vegetables {
  color: string;
}
interface Food {
  type: string;
}
interface Tomato extends Food, Vegetables {
  radius: number;
}

const tomato: Tomato = {
  type: "vegetables",
  color: "red",
  radius: 1.2
}; 
```

## 混合类型接口

js中函数也是对象，可以给函数增加一些属性

```ts
// 例如 实现一个计数器     *a++和++a 区别是先赋值后自增和先自增后赋值*
const count = 0
const countUp = ()=>count++
//这样做创建了全局变量，更优的做法用闭包
const countUp = ()=>{
  const count = 0
  return ()=>{
    return ++count
  }
}()
//还可以这样
const countUp = ()=>{
  return ++countUp.count
}
countUp.count = 0
```

```ts
// 用混合接口实现上面的
interface Counter {
  (): void; // 这里定义Counter这个结构必须包含一个函数，函数的要求是无参数，返回值为void，即无返回值
  count: number; // 而且这个结构还必须包含一个名为count、值的类型为number类型的属性
}
const getCounter = (): Counter => { // 这里定义一个函数用来返回这个计数器
  const c = () => { // 定义一个函数，逻辑和前面例子的一样
    c.count++;
  };
  c.count = 0; // 再给这个函数添加一个count属性初始值为0
  return c; // 最后返回这个函数对象
};
```

# 映射类型

基于一个类型创建一个新类型

```ts
// 基础语法
[P in keyof T]:T[P]
in 遍历后面的keys    T[P]读取每一个key附上对应类型
ts内置了几种映射类型 比如 Partial、Readonly、Pick、Record
它们的定义如下
type Readonly<T> = { readonly [P in keyof T]:T[P] }
type Partial<T> = { [P in keyof T]?:T[P] }
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
type Record<K extends keyof any, T> = { [P in K]: T };
```

- 例 Partial

  ```ts
  interface IUser {
    name: string
    age: number
    department: string
  }
  type optional = Partial<IUser>
  // 经过 Partial 类型转化后得到
  type optional = {
      name?: string | undefined;
      age?: number | undefined;
      department?: string | undefined;
  }
  ```

  

- 例 Pick

  ```ts
  interface Info {
    name: string;
    age: number;
    address: string;
  }
  const info: Info = {
    name: "lison",
    age: 18,
    address: "beijing"
  };
  function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> { // 这里我们定义一个pick函数，用来返回一个对象中指定字段的值组成的对象
    let res = {} as Pick<T, K>;
    keys.forEach(key => {
      res[key] = obj[key];
    });
    return res;
  }
  const nameAndAddress = pick(info, ["name", "address"]); // { name: 'lison', address: 'beijing' }
  ```

- 例 Record 它适用于将一个对象中的每一个属性转换为其他值的场景

  ```ts
  function mapObject<K extends string | number, T, U>(
    obj: Record<K, T>,
    f: (x: T) => U
  ): Record<K, U> {
    let res = {} as Record<K, U>;
    for (const key in obj) {
      res[key] = f(obj[key]);
    }
    return res;
  }
  
  const names = { 0: "hello", 1: "world", 2: "bye" };
  const lengths = mapObject(names, s => s.length); // { 0: 5, 1: 5, 2: 3 }
  ```

  

# 条件类型

语法

```ts
T extends U ? X : Y   //如果T是U的子集那么是X类型，否则是Y类型
```

