# JavaScript核心技术开发解密
> 2018年出版

本书比较有趣的地方：内存空间，VO，AO，let/const提升问题的理解。
比较干活的地方：闭包，this指向，函数式编程，用代码说的很透彻。模块化开发，用实战去说明了，但我没仔细看。

## 1. 三种基础数据结构
栈： 规定代码执行顺序。JS中的函数调用栈（call stack）。存取方式为先进后出。
> JS作为一门高级程序语言，并没有像其他语言那样区分栈区和堆区。可以简单粗暴的认为，JS中所有数据都存放在堆内存中。

堆：一种树状结构。存取方式类似于 从书架上取书。

队列： 事件循环(Event Loop)。存取方式为先进先出。

## 2. 内存空间

> JS有垃圾自动回收机制。

函数运行时，会创建一个执行环境，这个执行环境叫执行上下文(Execution Context)。
在执行上下文中，会创建一个**变量对象**(Variable Object, VO)。基本数据类型保存在VO中。VO在栈内存中。

引用数据类型保存在堆内存中。

JS垃圾回收主要依赖于“引用”。当一块内存空间中的数据能够被访问时，垃圾回收器认为“该数据能够被获得”。不能够被获得的数据，就会被打上标记，并回收内存空间。这种方式叫做“标记-清除算法”。

这个算法会设置一个全局对象，并定期的从全局对象开始查找，垃圾回收器会找到所有可以获得与不能够被获得的数据。

## 3. 执行上下文

执行上下文：当前代码的运行环境
分类： 全局环境，函数环境，eval环境

函数执行过程中遇到return 能直接终止可执行代码的执行，因此会直接将当前上下文弹出栈。

**函数执行时才会创建执行上下文**

一个执行上下文的生命周期大致可以分为两个阶段：创建阶段和执行阶段
- 创建阶段：在这个阶段，执行上下文会分别创建变量对象，确认作用域链，以及确定this指向。
- 执行阶段：开始执行代码。这个时候会完成变量赋值、函数引用，以及执行其他可执行代码。

## 4. 变量对象VO

变量对象的创建，依次经过如下过程：
1. 在Chrome浏览器中，变量对象会首先获得函数的参数变量及值。在Firefox浏览器中，是直接将参数对象arguments保存在变量对象中。
2. 依次获取当前上下文中所有的函数声明，也就是使用function关键字声明的函数。在变量对象中会以函数名建立一个属性，属性值为指向该函数所在的内存地址引用。如果函数名的属性已经存在，那么该属性的值会被新的引用覆盖。
3. 依次获取当前上下文中的变量声明，也就是使用var关键字声明的变量。每找到一个变量声明，就在变量对象中就以变量名建立一个属性，属性值为undefined。如果该变量名的属性已存在，为了防止同名的函数被修改为undefined，则会直接跳过，原属性值不会被修改。

> ES6 let const 在上下文的执行阶段开始执行的。

在变量对象的创建过程中，函数声明的执行优先级会比变量声明的优先级更高一些，而且同名的函数会覆盖函数与变量，但是同名的变量并不会覆盖函数。

在上下文的执行阶段，同名的函数会被变量重新赋值。

在函数调用栈中，如果当前执行上下文处于函数调用栈的栈顶，则意味着当前上下文处于激活状态，此时变量对象称之为活动对象(AO, Activation Object)。

var声明的变量在遇到同名的属性时，会跳过而不是覆盖。

全局上下文的变量对象不能变成活动对象。

## 5. 作用域和作用域链

作用域：规定变量与函数可访问范围的一套规则。


理解作用域链至关重要，但更多的知识需要结合闭包来理解。


## 6. 闭包(Closures)

组成：执行上下文，在该执行上下文中创建的函数。

闭包的本质：在函数外部保持了内部变量的引用。


## 7. this

如果当前执行上下文处于函数调用栈的栈顶，那么这个时候变量对象会变成活动对象，同时this的指向确认。 

## 8. 函数与函数式编程

函数形式 四种：函数声明，函数表达式，匿名函数，自执行函数

纯函数：相同的输入总会得到相同的输出，并且不会产生任何副作用。

纯函数好处：可移植性，可缓存性

高阶函数：接受一个函数作为参数的函数

模拟new
```javascript
function New(func) {
    let res = {};

    if (func.prototype !== null) {
        res.__proto__ = func.prototype;
    }

    let ret = func.apply(res, Array.prototype.slice.call(arguments, 1));

    if ((typeof ret === "object" || typeof ret === "function") &&
        ret !== null) {
            return ret;
    }

    return res;
}
```

高阶函数使用思路：封装公共逻辑

柯里化：一个函数接收函数A作为参数，运行后能够返回一个新的函数，并且这个新的函数能够处理函数A的剩余参数。

柯里化核心：函数参数的自由度提高。但把简单问题复杂化了。

```javascript
function createCurry(func, arity, args) {
    var arity = arity || func.length;
    var args = args || [];

    var wrapper = function() {
        let _args = [].slice.call(arguments);
        [].push.apply(args, _args);

        if (_args.length < arity) {
            arity -= _args.length;
            return createCurry(func, arity, args);
        }

        return func.apply(func, args);
    }

    return wrapper;
}
```

柯里化具有更高的自由度，但同时柯里化通用式中调用了arguments对象，使用了递归和闭包，因此柯里化的自由度是以牺牲了一定的性能为代价交换的。只有在情况变复杂时，才是柯里化大显身手的时候。


无限参数的柯里化

```javascript
function add() {
    var _args = [].slice.call(arguments);

    var adder = function () {
        var _adder = function () {
            _args.push(...arguments);
            return _adder;
        }
        _adder.toString = function () {
            return _args.reduce(function (a, b) {
                return a + b;
            });
        }

        return _adder;
    }

    return adder(..._args);
}
```

代码组合：

```javascript
function compose(...args) {
    var arity = args.length -1;
    var tag = false;

    if (typeof args[arity] === "function") {
        tag = true;
    }

    if (arity > 1) {
        var param = args.pop(args[arity]);
        arity--;
        var newParam = args[arity].call(args[arity], param);
        args.pop(args[arity]);
        args.push(newParam);

        return compose(...args);
    } else if (arity === 1) {
        if (!tag) {
            return args[0].bind(null, args[1]);
        } else {
            return args[0].call(null, args[1]);
        }
    }
}
```

## 9. 面向对象

new创建实例经历的过程  P111页

常用in来判断当前页面所处的环境是否在移动端

```javascript
// 特性检测，只有移动端环境才支持touchstart事件
var isMobile = "ontouchstart" in document;
```

Function同时是Function.prototype的构造函数和实例。

Object.getOwnPropertyDescriptor()方法读取某一个属性的特性值。


## 10. ES6与模块化

let、const 具备块作用域，没有变量提升

通过let/const声明变量时，其实提升操作仍然存在，但是并不会给这个变量赋值为undefined。也就是说，虽然声明提前了，但是该变量并没有任何引用，所以当进行如下操作时，会报referenceError，即引用错误。

```javascript
console.log(a); // ReferenceError: a is not defined
let a = 20;
```

由于不会默认赋值为undefined，加上let/const存在自己的作用域，因此会出现一个叫做暂时性死区的现象。

箭头函数只能替换函数表达式。
箭头函数中的this，就是声明函数时所处上下文中的this，他不会被其它方式改变。
箭头函数没有arguments对象。

解构的重点：取值

回调地狱： P176页

.then(resolve, reject)

.catch等价于 .then(null, reject);

async是Promise的一个语法糖
await后面的函数运行后必须返回一个Promise对象才能实现同步效果。
在Promise中，是通过catch的方式来捕获异常的，而使用async则使用try/catch捕获异常。
如果有多个await函数，那么只返回第一个捕获到的异常。

import引入的模块都会自动执行一次。

一个模块中只允许出现一次export default命令，不过可以同时拥有多个export与一个export default。

模块化开发实战  可以尝试看一下，不过我就翻了翻，没看。


