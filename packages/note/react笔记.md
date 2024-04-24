## 来先说说类

### 说类就得说说构造函数

```js
		function Point(x,y){
        this.x = x;
        this.y = y;
    }
    Point.prototype.add = function(){
        return this.x+this.y;
    }
    var p =new Point(2,3);
```
### 类其实是构造函数的语法糖，本质一样
```js
    class Point {
        constructor(x,y){
            this.x = x;
            this.y = y;
        }
        add(){
            return this.x+this.y;
        }
    }
    var p = new Point(2,3);
```
#### 类的方法也可以用prototype添加
```js
    Object.assign(Point.prototype,{
        toString()
    })
    // prototype对象的constructor属性，直接指向“类”的本身，这与 ES5 的行为是一致的。
    Point.prototype.constructor ===Point //true
    // 类的内部定义的方法是不可枚举的 而ES5中原型除了constructor不可枚举，其他方法都是可枚举的
    Object.keys(Point.prototype) // [toString]
    Object.getOwnpPropertyName(Point.prototype) //[constructor,add,toString]
```
#### 类的constructor
```js
    // constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加
    // constructor默认返回实例对象（即this），但是可以修改
    class Foo {
        constructor() {
            return Object.create(null);
        }
    }

    new Foo() instanceof Foo  //false

    // 类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行
react中如果不初始化state或不绑定成员函数的this环境，就不需要为组件实现构造函数
```
#### 类和实例的属性
```js
    // 实例的属性除非显示定义在本身，要不然其他属性都属于类

    // 与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
    class CustomHTMLElement {
        constructor(element) {
            this.element = element;
        }

        get html() {
            return this.element.innerHTML;
        }

        set html(value) {
            this.element.innerHTML = value;
        }
    }
    // 存值函数和取值函数是设置在html属性的 Descriptor 对象上的。
    var descriptor = Object.getOwnPropertyDescriptor(
    CustomHTMLElement.prototype, "html"
    );

    "get" in descriptor  // true
    "set" in descriptor  // true
```
#### 类的表达式方式
```js
    // 注意：这个类的名字是Me，但是Me只在 Class 的内部可用，指代当前类。在 Class 外部，这个类只能用MyClass引用。
    const MyClass = class Me {

    }
    let inst = new MyClass();
    inst.getClassName() // Me
    Me.name // ReferenceError: Me is not defined
    // 当然也可以直接省略Me
    const MyClass = class {

    }
    //采用表达式方式的类可以写出立即执行的类
    let person = new class {

        constructor(name){
            this.name = name;
        }
        sayName(){
            console.log(this.name);
        }
    }('张三')
    person.sayName(); //张三

    // 类的name可以返回紧跟在class属性后面的 类名
    class Point {}
    Point.name // "Point"
```
#### 类的静态方法
```js
    // 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”
    // 静态方法bar调用了this.baz，这里的this指的是Foo类，而不是Foo的实例，等同于调用Foo.baz。另外，从这个例子还可以看出，静态方法可以与非静态方法重名。
    class Foo {

        static bar() {
            this.baz();
        }
        static baz() {
            console.log('hello');
        }
        baz() {
            console.log('world');
        }
    }
    Foo.bar() // hello
    // 父类的静态方法可以被子类继承
    class Bar extends Foo {

    }
    Bar.baz() //hello
    // 静态方法也可以从super上调用
    class Bar extends Foo {
        static classMethod() {
            return super.baz();
        }
    }
    Bar.classMethod() //hello
```
#### 类的继承

##### super关键字

我们知道，`this`关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字`super`，指向当前对象的原型对象

```js
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
// super在这里表示父类的构造函数，用来新建父类的this对象
// 这里注意：super虽然代表了父类Point的构造函数，但是返回的是子类ColorPoint的实例，即super内部的this指的是ColorPoint的实例，因此super()在这里相当于
Point.prototype.constructor.call(this);
//子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象
```

super既可以当作函数使用也能当作对象使用

```js
// super作为对象时，在普通方法中指向父类的原型对象；在静态方法中，指向父类
class A {
  constructor(){
    this.o = 3;
  }
  p() {
    console.log(this.x); 
    return 2;
  }
}
// A.prototype.o = 3
class B extends A {
  constructor() {
    super();
    this.x =2;
    console.log(super.o);// 由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。但是可以给A添加A.prototype.o = 3;super就可以取到
  }
  m(){
    super.p();
  }
  static n(){
    super.p(); //在子类的静态方法中通过super调用父类的方法时，this指向子类不是子类实例
  }
}
B.x=3;
B.n(); //3

let b = new B();
b.m() //2 ES6 规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。实际上是super.p().call(this),在constructor中调用一样。
```



## 用脚手架搭建一个 react 项目

<!-- npx 可以不用全局安装create-react-app脚手架而是暂时下载构建完项目把临时文件删除 -->

npx create-react-app my-react-app

<!-- 暴漏配置项 -->

yarn eject

## react 方法

- React.createElement() 【Bable 将 JSX 编译成了 React.createElement()的调用】

```js
const element = React.createElement(
  "h1",
  { className: "greeting" },
  "Hello, world!"
);
```

- ReactDom.render() 【渲染一个 React 元素到一个 root DOM 节点】

```js
// React DOM 会将元素及其子元素与之前版本逐一对比, 并只对有必要更新的 DOM 进行更新
// 下面的例子只有H2中的内容会重新渲染
const element = (
  <div>
    <h1>Hello, world!</h1>
    <h2>It is {new Date().toLocaleTimeString()}.</h2>
  </div>
);
ReactDom.render(element, document.getElementById("root"));
```

## jsx

```js
// jsx中掐嵌入表达式
function formatName(user) {
  return user.firstName + " " + user.lastName;
}

const user = {
  firstName: "Harper",
  lastName: "Perez",
};

function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
// jsx指定属性值（字面量和表达式两种方式）属性名采用camelCase(小驼峰命名)法

const element = <div tabIndex="0"></div>;
const imgElement = <img src={user.src}></img>;
```

###  [**State 与 Props 区别**]('https://www.cnblogs.com/husfBK/p/11540379.html')
props 是组件对外的接口，state 是组件对内的接口。组件内可以引用其他组件，组件之间的引用形成了一个树状结构（组件树），如果下层组件需要使用上层组件的数据或方法，上层组件就可以通过下层组件的props属性进行传递，因此props是组件对外的接口。组件除了使用上层组件传递的数据外，自身也可能需要维护管理数据，这就是组件对内的接口state。根据对外接口props 和对内接口state，组件计算出对应界面的UI。

## 组件和属性 props

- 组件类型 【react 组件采用 PascalCase(帕斯卡拼写法：也称大驼峰)】

```js
// 函数组件
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
// 类组件
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
因为props是组件的对外接口，那么就应该明确组件的接口规范，比如：
	1.接受什么类型的数据
  2.没有传的时候初始值是什么
// 组件的默认props和propTypes都是设置在类上的，可以用类. 也可以用静态属性
  //propTypes不应该在生产环境中出现，可以用babel-react-optimize来实现
class A extends React.Component {
  constructor(props){
    super(props);
  }
  static defaultProps = {
    a:0
  }
}
A.defaultProps = {
  a:0,
}
A.propTypes = {
  a:propTypes.number.isRequired,
}
```
## 组件的状态 state 私 有的只能往下传递的数据
查看index.js中的tick组件
只能通过this.setDate({})设置值
因为 this.props 和 this.state 可能会异步更新，所以**你不要依赖他们的值**来更新下一个状态。
使用setState()接受一个函数而不是对象可以实现同步

```js
// 错误
this.setState({
  counter: this.state.counter + this.props.increment,
});
//正确 函数的参数即为 state 的前一个状态以及 props
this.setState((prevState, prevProps) => ({
  counter: prevState.counter + prevProps.increment
}));
// 在状态更新成功后会执行回调函数
this.setState({
  data:3
},()=>{
  console.log(this.state.data) //3
})
```
## 事件处理
- react中事件命名使用小驼峰
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。
- 在 React 中另一个不同点是你不能通过返回 false 的方式阻止默认行为。你必须显式的使用 preventDefault
- React中绑定事件都是通过onXxxx的方式，以区分普通html事件
```js
// 函数组件的事件
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }
  function alearttext(){
    alert('1')
  }
  return (
    <div>
    	<a href="#" onClick={handleClick}>
      	Click me
    	</a>
     <a href="#" onclick="alearttext()">
        Click me
      </a> 
    </div>
  );
}
// 类组件的事件
	// 第一种方式
class ActionLink extends Component(){
  constructor(props){
    super(props)
  }
  handleClick(msg,e){
    console.log('this is a hanshu')
  }
  render(){
    return (
      // 箭头函数的事件参数必须显示传递,这种回调函数的方式，每次渲染组件都会创建不同的匿名函数，当这个函数作为prop传给子组件
      // 可能会引发额外的重新渲染
      <div onClick={(e)=>{this.hanleClick('haha',e)}}></div>
    )
  }
}
	// 第二种方式
class ActionLink extends Component(){
  constructor(props){
    super(props)
  }
  handleClick = (msg,e)=>{
    console.log('this is a hanshu')
  }
  render(){
    return (
      <div onClick={this.hanleClick}></div>
			// 这种方式传参数可以这样，事件对象不用显示传，最后一个参数是事件对象
			<div onClick={this.hanleClick.bind(this,msg)}></div>
    )
  }
}
	// 第三种方式
class ActionLink extends Component(){
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(msg,e){
    console.log('this is a hanshu')
  }
  render(){
    return (
      <div onClick={this.hanleClick}></div>
    )
  }
}
```






### react生命周期

![NATXy4.png](https://s1.ax1x.com/2020/06/17/NATXy4.png)

- 周期函数

  ```js
  	UNSAFE_componentWillMount(){
      console.log('componentWillMount2:')
    }
    UNSAFE_componentWillReceiveProps(nextProps){
      console.log('componentWillReceiveProps2:',nextProps)
    }
    shouldComponentUpdate(nextProps,nextState){
      console.log('shouldComponentUpdate2:',nextState.counter,this.state.counter)
      return (nextProps.caption !== this.props.caption) ||
             (nextState.count !== this.state.count);
    }
    UNSAFE_componentWillUpdate(){
      console.log('componentWillUpdate2:')
    }
    componentDidCatch(error,info){
      console.log('componentDidCatch2:',error,info)
    }
    componentDidMount(){
      console.log('componentDidMount2:')
    }
    componentDidUpdate(){
      console.log('componentDidUpdate2:')
    }
  ```

  

- 挂载

  ```js
  constructor()
  UNSAFE_componentWillMount()   16.x后   static getDerivedStateFromProps()
  render()
  componentDidMount()
  把组件以及所有子组件的willMount、render都走一下，然后生成虚拟DOM，最后再一起挂载到真实DOM节点上，以最少次数更新真实DOM，提高性能；
  ```

- 更新

  ```js
  UNSAFE_componentWillReceiveProps   16.x后   static getDerivedStateFromProps()
  shouldComponentUpdate()
  UNSAFE_componentWillUpdate()
  render()
  16.x后  getSnapshotBeforeUpdate()
  componentDidUpdate()
  
  组件更新时，父组件和子组件也是在render后，一起更新真实DOM，所以DidUpdate会在所有子组件render以后执行
  
  shouldComponent 必须要有一个布尔型返回值，否则报错。（这个函数可以优化性能减少不必要的渲染，但是只在你觉得需要的时候，因为这个函数本身会增加性能消耗，而且容易出现一些不易测试的bug）在react.Component中的默认实现是简单返回true。
  
  当父组件更新时，会触发子组件的willReceiveProps,传一个本次的props值，可以和上一次的props（this.props)做对比，选择要不要进行this.setState({});
  ```

- 卸载

  ```js
  componentWillUnmount()
  ```

- 错误处理

  ```js
  static getDerivedStateFromError()
  componentDidCatch()
  我们可以写一个错误组件包裹任意组件，当内部组件出错误的时候，可以用componentDidCatch捕获错误，得到一个error和info。
  ```



### react路由 （路由导航、导航守卫、路由传参数）

this.props.history.push({pathname:'',state:{}})

// 这里state是默认参数，使用state，刷新页面，state存储数据不会丢失，但是使用其他自定义键刷新页面数据会丢失。

react组件（组件状态、组件传参数、class组件和hooks组件、事件）

react高阶组件

react状态管理

### react组件的render函数

- render函数应该是一个纯函数，完全根据state和props决定返回结果，不产生任何副作用



