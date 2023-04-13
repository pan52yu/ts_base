// 函数
// 1.函数类型表达式 (Function type expression)
function getters(fn: (a: string) => void) {
  fn("hello")
}
function printToConsole(s: string) {
  console.log(s)
}
getters(printToConsole)

// 也可以使用类型别名
type Getters = (a: string) => void
function getters2(fn: Getters) {
  fn("hello")
}

// 2.调用签名 (Call signature)
type DescribableFunction = {
  description: string
  (a: number): boolean
}

function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6))
}
// 注意这个语法跟函数类型表达式稍有不同，在参数列表和返回的类型之间用的是 : 而不是 =>。

// 3.构造签名 (Construct signature)
// 构造签名用于描述 new 表达式和构造函数。构造签名会定义一个 new 调用的类型。
type SomeConstructor = {
  new (s: string): SomeObject
}
type SomeObject = {
  someProperty: string
}
function fn(ctor: SomeConstructor) {
  return new ctor("hello")
}
// 一些对象，比如 Date 对象，可以直接调用，也可以使用 new 操作符调用，而你可以将调用签名和构造签名合并在一起
interface CallOrConstruct {
  new (s: string): Date
  (n?: number): number
}

// 4.泛型函数 (Generic function)
// 你可以使用泛型来定义函数的类型
function identity<T>(arg: T[]): T | undefined {
  return arg[0]
}

const s = identity(["hello"])
// s: string | undefined
const n = identity([1, 2, 3])
// n: number | undefined
const u = identity([])
// u: undefined

// 4.1 推断 (Inference)
function map<Input, Output>(array: Input[], fn: (input: Input) => Output): Output[] {
  return array.map(fn)
}
map(["1", "2", "3"], (n) => parseInt(n))
// function map<string, number>(array: string[], fn: (input: string) => number): number[]
// 自动推断出了 Input 和 Output 的类型

// 4.2 泛型约束 (Generic constraints)
// 你可以使用 extends 关键字来指定泛型的约束
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a
  } else {
    return b
  }
}
longest("alice", "bob")
longest([1], [2, 3])
// longest(10, 100)
// 类型“number”的参数不能赋给类型“{ length: number; }”的参数。

// 4.3 泛型约束实战（Working with Constrained Values）
function minimumLength<Type extends { length: number }>(obj: Type, minimum: number): Type {
  if (obj.length >= minimum) {
    return obj
  } else {
    return { length: minimum }
    // 不能将类型“{ length: number; }”分配给类型“Type”。
    // "{ length: number; }" 可赋给 "Type" 类型的约束，但可以使用约束 "{ length: number; }" 的其他子类型实例化 "Type"。
  }
}

// 'arr' gets value { length: 6 }
const arr = minimumLength([1, 2, 3], 6)
// and crashes here because arrays have
// a 'slice' method, but not the returned object!
console.log(arr.slice(0))

// 4.4 声明类型参数 （Specifying Type Arguments）
// TypeScript 通常能自动推断泛型调用中传入的类型参数，但也并不能总是推断出
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2)
}
// combine([1, 2, 3], ["hello"])
// 不能将类型“string[]”分配给类型“number[]”。
// 如果执意要这么做，可以手动指定 Type 参数
combine<number | string>([1, 2, 3], ["hello"])

// 4.5 写一个好的泛型函数的一些建议
// 4.5.1 类型参数下移（Push Type Parameters Down）
function firstElement1<Type>(arr: Type[]) {
  return arr[0]
}

function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0]
}

// a: number (good)
const a = firstElement1([1, 2, 3])
// b: any (bad)
const b = firstElement2([1, 2, 3])
// Rule: 如果可能的话，直接使用类型参数而不是约束它

// 4.5.2 使用更少的类型参数 (Use Fewer Type Parameters)
// good
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func)
}

// bad
function filter2<Type, Func extends (arg: Type) => boolean>(arr: Type[], func: Func): Type[] {
  return arr.filter(func)
}
// Rule: 尽可能用更少的类型参数来描述函数

// 4.5.3 类型参数应该出现两次 （Type Parameters Should Appear Twice）
// bad
function greet<Str extends string>(s: Str) {
  console.log("Hello, " + s)
}

greet("world")

// good
function greet2(s: string) {
  console.log("Hello, " + s)
}
// Rule: 如果一个类型参数仅仅出现在一个地方，强烈建议你重新考虑是否真的需要它
