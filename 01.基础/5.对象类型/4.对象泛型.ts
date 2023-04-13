// ----------------- 泛型对象类型（Generic Object Types） -----------------

interface Box<Type> {
  contents: Type
}

let boxA: Box<string> = { contents: "hello" }
boxA.contents
// (property) Box<string>.contents: string

let boxB: Box<number> = { contents: 123 }
boxB.contents
// (property) Box<number>.contents: number

// -------- 1.Array 类型（The Array Type） --------
// Array 类型是一个泛型，它接受一个类型参数，然后返回一个数组类型
function doSomething(value: Array<string>) {
  // ...
}
function doSomething2(value: string[]) {
  // ...
}
let myArray: string[] = ["hello", "world"]

// either of these work!
doSomething(myArray)
doSomething(new Array("hello", "world"))
doSomething2(myArray)

// 类似于上面的 Box 类型，Array 本身就是一个泛型
// interface Array<Type> {
//   /**
//    * Gets or sets the length of the array.
//    */
//   length: number

//   /**
//    * Removes the last element from an array and returns it.
//    */
//   pop(): Type | undefined

//   /**
//    * Appends new elements to an array, and returns the new length of the array.
//    */
//   push(...items: Type[]): number

//   // ...
// }

// -------- 2.ReadonlyArray 类型（The ReadonlyArray Type） --------
// 只读数组类型

// ReadonlyArray 类型是一个泛型，它接受一个类型参数，然后返回一个只读数组类型
function doStuff(values: ReadonlyArray<string>) {
  // 我们可以从 'values' 读取...
  const copy = values.slice()
  console.log(`The first value is ${values[0]}`)

  // ...但是我们不能改变 'values'。
  values.push("hello!")
  // 类型“readonly string[]”上不存在属性“push”。
}

const roArray: ReadonlyArray<string> = ["red", "green", "blue"]

// 简写方式 readonly Type[]
function doStuff2(values: readonly string[]) {
  // We can read from 'values'...
  const copy = values.slice()
  console.log(`The first value is ${values[0]}`)

  // ...but we can't mutate 'values'.
  values.push("hello!")
  // Property 'push' does not exist on type 'readonly string[]'.
}

// Arrays 和 ReadonlyArray 并不能双向的赋值
let x: readonly string[] = []
let y: string[] = []

x = y // ok
y = x
// 类型”readonly string[]“ 为 “readonly”，不能分配给可变类型”string[]“。

// -------- 3.元组类型（Tuple Types） --------
// 元组类型是另外一种 Array 类型，当你明确知道数组包含多少个元素，并且每个位置元素的类型都明确知道的时候，就适合使用元组类型
type StringNumberPair = [string, number]

let pair: StringNumberPair = ["hello", 123]
const pair2: StringNumberPair = ["hello", "123"]
// 类型和顺序都要匹配

const pairTest = pair[2]
// 超出元组的范围，会报错

// 可选元素
type Either2dOr3d = [number, number, number?]

function setCoordinate(coord: Either2dOr3d) {
  const [x, y, z] = coord
  // const z: number | undefined

  console.log(x, y, z, `${coord.length}`)
  // (property) length: 2 | 3
}

// 剩余元素
type StringNumberBooleans = [string, number, ...boolean[]]

const values: StringNumberBooleans = ["hello", 123, true, false, true]

function doStuff3(values: StringNumberBooleans) {
  const [str, num, ...booleans] = values
  // const booleans: boolean[]
  console.log(values.length)
  // length: number
}

// -------- 4.readonly 元组类型（readonly Tuple Types） --------
// 只读元组类型
function doSomething3(pair: readonly [string, number]) {
  // ...
}

function doSomething4(pair: readonly [string, number]) {
  pair[0] = "hello!"
  // 无法为“0”赋值，因为它是只读属性。
}

// 如果我们给一个数组字面量 const 断言，也会被推断为 readonly 元组类型
let point = [3, 4] as const

function distanceFromOrigin([x, y]: [number, number]) {
  return Math.sqrt(x ** 2 + y ** 2)
}

distanceFromOrigin(point)
// 类型“readonly [3, 4]”的参数不能赋给类型“[number, number]”的参数。
// 类型 "readonly [3, 4]" 为 "readonly"，不能分配给可变类型 "[number, number]"
