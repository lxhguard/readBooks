# 编写可维护的JavaScript

> 代码风格只关心代码的呈现，而编程实践则关心编码的结果。
> 编程实践是和设计模式相关的。

# 一、编程风格

## 1.结尾使用分号
## 2.单行80个字符
## 3.逗号作为前一行的行尾，避免ASI自动补分号
## 4.每个流程控制语句之前添加空行
## 5.变量命名为小驼峰且为名词，常量命名为大写字母和下划线且为名词，函数命名为大驼峰且前缀为动词，构造函数为大驼峰

函数和方法命名如下：

    | 动词        | 含义    |  
    | --------   | -----:   | 
    | can        | 函数返回一个Boolean      |  
    | has        | 函数返回一个Boolean      |  
    | is         | 函数返回一个Boolean      |  
    | get        | 函数返回一个非布尔值      |  
    | set        | 函数用来保存一个值        |  
## 6. Google的JS风格使用单引号括住字符串。推荐使用双引号括住字符串，单引号括住字符。
## 7.null初始化的变量，后续可能被赋值为一个对象。用null作为对象的占位符。
## 8.undefined表示这个变量等待被赋值。
## 9.使用直接量创建对象和数组，而不是new Object()和new Array()
## 10.添加注释远足：需要让代码变得更清晰
## 11.块语句不管包含单行代码还是多行代码，都应该使用花括号，不可以省略。
## 12.块语句间隔，推荐如下
```javascript
if (condition) {
    doSomething();
}
```
## 13. for-in 使用hasOwnProperty()来为for-in循环过滤出实例属性。
## 14.推荐将立即执行函数，使用一对圆括号包裹起来。
## 15.相等比较。一个值是对象，另一个不是，则调用对象的valueOf()方法，再调用toString()方法。最好使用=== 和 !== 。
## 16.禁止使用原始包装类型。

# 二、编程实践

目标：对一个组建对修改不会经常性地影响其他部分。

## 1.操作CSS的className
## 2.避免使用全局变量。全局对象表示了脚本的最外层上下文。
> JS的初始执行环境是由多种多样的全局变量所定义的，这些全局变量在脚本环境创建之初就已经存在了。
> 在浏览器中，window对戏那个往往重载并等同于全局对象，因此任何在全局作用域中声明的变量和函数都是window对象的属性。
## 3.任何来自函数外部的数据都应当以参数形式传进来。
## 4.模块演变：YUI模块，AMD，
> 基于单全局变量的扩充方法是使用模块。模块是一种通用的功能片段，它并没有创建新的全局变量或者命名空间。相反，所有的这些代码都存放于一个表示执行一个任务或者发布一个接口的单函数中。
> YUI.add(模块名称，工厂方法，依赖列表)
> define(模块名称，依赖列表，工厂方法)
> 区别：AMD中每一个依赖都会对应到独立的参数传入工厂方法里。
> AMD兼容的模块加载器有 dojo 和 RequireJS
## 5. 零全局变量  立即执行函数来模拟
## 6.事件处理：隔离应用逻辑，不要分发事件对象
## 7.instanceof严重限制：一个浏览器帧(iframe A)里的一个对象被传入到另一个帧(iframe B)中，两个帧中都定义了构造函数Person，如果来自帧A的对象是帧A的Person的实例，则
```javascript
// true
personA instanceof frameAPerson
// false
personA instanceof frameBPerson
```
![js对iframe内外（父子）页面进行操作](http://caibaojian.com/js-get-iframe.html)
## 8. 检测函数最好使用typeof，它可以跨帧。typeof检测函数的限制：在IE8和更早版本的IE中，使用typeof检测DOM节点中的函数都返回"object"，而不是"function"。
> DOM有明确定义：如果对象成员存在则意味着它是一个方法，开发者往往通过in运算符来检测DOM的方法。
## 9. 检测数组。每个帧(iframe)都有自己的Array构造函数。鸭式辩型。
## 10.Object.prototype.toString.call()识别内置对象十分有用，但是不要用于自定义对象。
> Array.isArray()可以检测跨帧(iframe)传递的值。
```javascript
function isArray(value) {
    if (typeof Array.isArray === "function") {
        return Array.isArray(value);
    } else {
        return Object.prototype.toString.call(value) === "[Object Array]";
    }
}
```
## 11. 判断属性是否存在的最好的方法是使用in运算符。
> in运算符仅仅会判断属性是否存在，而不会去读属性的值。
> 如果实例对象的属性存在或者继承自对象的原型，in运算符都会返回true。
> 如果你只想检查实例对象的某个属性是否存在，则使用hasOwnProperty()方法。
> PS：在IE8和更早版本的IE中，DOM对象并非继承自Object，因此不包含hasOwnProperty方法。
## 12.如果try块中包含了一个return语句，实际上它必须等到finally块中的代码执行后才能返回。
## 13.ECMA-262指出了7种错误类型。推荐方案：创建自己的错误类型，让它继承自Error。这样子就能区分自己抛出的错误和浏览器错误。
## 14.
## 15.
## 16.
## 17.
## 18.



