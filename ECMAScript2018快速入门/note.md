# 1. 变量与常量

## JS最佳实践： 所有变量声明放在代码头部

## var声明变量会挂载在window上，而let不会

## 建议：放弃var，使用let定义变量，使用const定义常量

## 激进想法：全部使用const

# 2. 表达式和运算符

## 克隆数组 ```let [...clone] = array```

## 幂运算符 ** ```2**3 ===  8```

# 3. 字符串

## 

# 4. 数字和符号

## 符号Symbol作用：创建对象的私有成员

## ```isNaN() VS Number.isNaN()```

全局方法**isNaN()**更靠谱。```Number.isNaN()```不会进行数据转换，单纯判断是否是```NaN```。

```javascript
isNaN('2a'); // true
Number.isNaN('2a'); // false
```

## JS将数字写成浮点数形式并不意味着 数字以浮点数形式进行存储。

```javascript
Number.isInteger(2.0); // true
```

## 安全整型

安全整数： ***[ -(2^53 - 1), 2^53 - 1 ]***

```Number.isSafeInteger()```可验证是否为安全整数。

## 执行一次Symbol()，就会创建一个```唯一```的符号值

```Symbol.for()```创建的符号值可以共享。原因：全局符号注册表

```Symbol.keyFor()```可以返回某个恭喜那个符号值的键值。

![Symbol.for()](http://a1.qpic.cn/psc?/V50vddMl0YvJ9c0IGUY913J7mG1rVs8G/bqQfVz5yrrGYSXMvKr.cqc4JFOf**Niyc3Z*SURSSGOXKCyf3H82Oqcf*yAHJ9VTJG85FzgEZhun6VpLMqbciKKtALz47U35*wxstDr3XvI!/c&ek=1&kp=1&pt=0&bo=MgE9AQAAAAADFz0!&tl=1&vuin=741183972&tm=1599267600&sce=60-2-2&rf=0-0)

## ```Symbol.hasInstance```：判断某个对象是否为某个构造器的实例

同```instanceof``` 效果一样。

![Symbol.hasInstance](http://a1.qpic.cn/psc?/V50vddMl0YvJ9c0IGUY913J7mG1rVs8G/bqQfVz5yrrGYSXMvKr.cqQzp4Hk1wE9PCYnKKInZUat9SLZyOT5wpiVrhi2ahQ9**Sc0TSGaOg5pybLPUE32i9tppXVNAjCNLWP4ict*SEw!/c&ek=1&kp=1&pt=0&bo=TAPmAQAAAAADF5o!&tl=1&vuin=741183972&tm=1599271200&sce=60-2-2&rf=0-0)









