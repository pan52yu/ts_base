// ------------- 1.类型收窄 -------------
// 如果参数 padding 是一个数字，我们就在 input 前面添加同等数量的空格，而如果 padding 是一个字符串，我们就直接添加到 input 前面。
const padLeft = (input: string, padding: string | number) => {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + input
  }
  return padding + input
}
// TypeScript 的类型检查器会考虑到这些类型保护和赋值语句，而这个将类型推导为更精确类型的过程，我们称之为收窄 (narrowing)

// 1.1 typeof 类型保护（type guards）

function printAll(strs: string | string[] | null) {
  if (typeof strs === "object") {
    for (const s of strs) {
      // Object is possibly 'null'.
      console.log(s)
    }
  } else if (typeof strs === "string") {
    console.log(strs)
  } else {
    // do nothing
  }
}

// 1.2 真值收窄 (Truthiness narrowing）
// 在 JavaScript 中，我们可以在条件语句中使用任何表达式，比如 && 、||、! 等，举个例子，像 if 语句就不需要条件的结果总是 boolean 类型
function printAll2(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s)
    }
  } else if (typeof strs === "string") {
    console.log(strs)
  }
}

function multiplyAll(values: number[] | undefined, factor: number): number[] | undefined {
  if (!values) {
    // 收窄成 undefined
    return values
    // (parameter) values: undefined
  } else {
    // 收窄成 number[]
    return values.map((x) => x * factor)
    // (parameter) values: number[]
  }
}

// 1.3 等值收窄 (Equality narrowing)
// Typescript 也会使用 switch 语句和等值检查比如 === !== == != 去收窄类型。
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // 判断为 true 的时候，x 和 y 的类型都会收窄为 string
    x.toLocaleUpperCase()
    y.toLocaleLowerCase()
  } else {
    console.log(x, y)
  }
}

function printAll3(strs: string | string[] | null) {
  if (strs !== null) {
    if (typeof strs === "object") {
      for (const iterator of strs) {
        console.log(iterator)
      }
    } else if (typeof strs === "string") {
      console.log(strs)
    }
  }
}

// 1.4 in 操作符收窄
// JavaScript中的 in 操作符可以用来检查属性是否存在于一个对象中
type Fish = { swim: () => void }
type Bird = { fly: () => void }

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim()
    // (parameter) animal: Fish
  }

  return animal.fly()
  // (parameter) animal: Bird
}

// 而如果有可选属性，比如一个人类既可以 swim 也可以 fly (借助装备)，也能正确的显示出来
type Human = { swim?: () => void; fly?: () => void }
function move2(animal: Fish | Bird | Human) {
  if ("swim" in animal) {
    animal // (parameter) animal: Fish | Human
  } else {
    animal // (parameter) animal: Bird | Human
  }
}

// 1.5 instanceof 操作符收窄
// instanceof 也是一种类型保护，TypeScript 也可以通过识别 instanceof 正确的类型收窄
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString())
  } else {
    console.log(x.toUpperCase())
  }
}

// 1.6 赋值语句（Assignments）
// TypeScript 会在赋值语句中收窄类型
let x = Math.random() < 0.5 ? 10 : "hello world"
x = "hello ts"
console.log(x)
// x: string
x = 100
console.log(x)
// x: number

// 1.7 控制流分析 (Control flow analysis)
function example2() {
  let x: string | number | boolean
  x = Math.random() < 0.5
  console.log(x)
  // x: boolean
  if (Math.random() < 0.5) {
    x = "hello"
    console.log(x)
    // x: string
  } else {
    x = 100
    console.log(x)
    // x: number
  }
  return x
  // x: string | number
}
// 这种基于可达性(reachability) 的代码分析就叫做控制流分析(control flow analysis)。

// 1.8 类型判断式(type predicates)
// https://ts.yayujs.com/handbook/Narrowing.html#%E7%B1%BB%E5%9E%8B%E5%88%A4%E6%96%AD%E5%BC%8F-type-predicates
// 看着比较模糊，先跳过

// 1.9 可辨别联合 (Discriminated unions)
interface Square {
  kind: "square" // 可辨别属性
  size: number
}
interface Circle {
  kind: "circle" // 可辨别属性
  radius: number
}
type Shape = Square | Circle

function area(s: Shape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size
    // (parameter) s: Square
    case "circle":
      return Math.PI * s.radius ** 2
    // (parameter) s: Circle
  }
}
// 当联合类型中的每个类型，都包含了一个共同的字面量类型的属性，TypeScript 就会认为这是一个可辨别联合（discriminated union），然后可以将具体成员的类型进行收窄。
// 在这个例子中，kind 就是这个公共的属性（作为 Shape 的可辨别(discriminant) 属性 ）。

// never 类型
// never 类型表示的是那些永不存在的值的类型。 例如，never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型；变量也可能是 never 类型，当它们被永不为真的类型保护所约束时。

// 1.10 穷尽性检查 (Exhaustiveness checking)
interface Triangle {
  kind: "triangle"
  sideLength: number
}
type Shape2 = Square | Circle | Triangle
function area2(s: Shape2) {
  switch (s.kind) {
    case "square":
      return s.size * s.size
    // (parameter) s: Square
    case "circle":
      return Math.PI * s.radius ** 2
    // (parameter) s: Circle
    default:
      const _exhaustiveCheck: never = s
      // 不能将类型“Triangle”分配给类型“never”。
      return _exhaustiveCheck
  }
}

// 因为 TypeScript 的收窄特性，执行到 default 的时候，类型被收窄为 Triangle，但因为任何类型都不能赋值给 never 类型，这就会产生一个编译错误。
// 通过这种方式，你就可以确保 getArea 函数总是穷尽了所有 shape 的可能性
