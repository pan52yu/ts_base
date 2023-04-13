// -------------- 1.函数类型表达式 (Function type expression) --------------
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

// -------------- 2.调用签名 (Call signature) --------------
type DescribableFunction = {
  description: string
  (a: number): boolean
}

function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6))
}
// 注意这个语法跟函数类型表达式稍有不同，在参数列表和返回的类型之间用的是 : 而不是 =>。

// -------------- 3.构造签名 (Construct signature) --------------
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

// -------------- 4.可选参数 (Optional parameters) --------------
// 可以使用 ? 来标记可选参数
function fn2(x: number, y?: number) {
  return y ? x + y : x
}
fn2(1, 2)
fn2(1)
// 都是ok的
// 注意，可选参数必须跟在必须参数后面

// -------------- 5.函数重载 (Function overloads) --------------
// https://ts.yayujs.com/handbook/MoreOnFunctions.html#%E5%87%BD%E6%95%B0%E9%87%8D%E8%BD%BD-function-overloads
function makeDate(timestamp: number): Date
function makeDate(m: number, d: number, y: number): Date
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d)
  } else {
    return new Date(mOrTimestamp)
  }
}
const d1 = makeDate(12345678)
const d2 = makeDate(5, 5, 5)
const d3 = makeDate(1, 3)
// 没有需要 2 参数的重载，但存在需要 1 或 3 参数的重载。

// 在这个例子中，我们写了两个函数重载，一个接受一个参数，另外一个接受三个参数。前面两个函数签名被称为重载签名 (overload signatures)。

// 然后，我们写了一个兼容签名的函数实现，我们称之为实现签名 (implementation signature) ，但这个签名不能被直接调用。
// 尽管我们在函数声明中，在一个必须参数后，声明了两个可选参数，它依然不能被传入两个参数进行调用。
// -------- 5.1重载签名和实现签名（Overload Signatures and the Implementation Signature） --------
function fn3(x: string): void
function fn3() {
  // ...
}
// Expected to be able to call with zero arguments
fn3()
// 应有 1 个参数，但获得 0 个。

// 实现签名对外界来说是不可见的。当写一个重载函数的时候，你应该总是需要来两个或者更多的签名在实现签名之上。

// 实现签名应和重载签名匹配，但是实现签名可以有更少的参数，也可以有不同的参数类型。

// -------- 5.2写一个好的函数重载的一些建议 --------
function len(s: string): number
function len(arr: any[]): number
function len(x: any) {
  return x.length
}
len("") // OK
len([0]) // OK
len(Math.random() > 0.5 ? "hello" : [0])
// 没有与此调用匹配的重载。
// 第 1 个重载(共 2 个)，“(s: string): number”，出现以下错误。
// 类型“"hello" | number[]”的参数不能赋给类型“string”的参数。
// 不能将类型“number[]”分配给类型“string”。
// 第 2 个重载(共 2 个)，“(arr: any[]): number”，出现以下错误。
// 类型“"hello" | number[]”的参数不能赋给类型“any[]”的参数。
// 不能将类型“string”分配给类型“any[]”。

// 重载的函数在调用的时候，会根据传入的参数类型，来决定使用哪个重载签名。
// 但是，当使用联合类型的时候，只有一个签名，所以只有一个类型检查。

function len2(x: any[] | string) {
  return x.length
}
// 建议: 尽可能的使用联合类型替代重载

// -------------- 6.在函数中声明 this --------------
// 不清楚
interface DB {
  filterUsers(filter: (this: User) => boolean): User[]
}
function getDB(): DB {
  return {
    filterUsers(filter) {
      return []
    },
  }
}
interface User {
  admin: boolean
}
const db = getDB()
const admins = db.filterUsers(function (this: User) {
  return this.admin
})

// -------------- 7.其他需要知道的类型（Other Types to Know About） --------------
// -------- 7.1void --------
// The inferred return type is void
// void 类型表示没有任何类型。当一个函数没有返回值时，你通常会见到其返回值类型是 void
function noop() {
  return
}

// -------- 7.2object --------
// 这个特殊的类型 object 可以表示任何不是原始类型（primitive）的值 (string、number、bigint、boolean、symbol、null、undefined)。
// object 不同于空对象类型 { }，也不同于全局类型 Object。很有可能你也用不到 Object

// -------- 7.3unknown --------
function f1(a: any) {
  a.b() // OK
}
function f2(a: unknown) {
  a.b()
  // Object is of type 'unknown'.
}
// unknown 类型是 any 类型的安全版本。unknown 类型的值只能被赋值给 any 类型和 unknown 类型本身。

// -------- 7.4never --------
// never 类型表示的是那些永不存在的值的类型。
// 例如，never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。
function fn4(x: string | number) {
  if (typeof x === "string") {
    // do something
  } else if (typeof x === "number") {
    // do something else
  } else {
    x // has type 'never'!
  }
}

// -------- 7.5Function --------
// Function 类型的值总是可以被调用，结果会返回 any 类型
function doSomething2(f: Function) {
  f(1, 2, 3)
}
// 如果你准备接受一个黑盒的函数，但是又不打算调用它，() => void 会更安全一些。

// -------------- 8.剩余参数（Rest Parameters and Arguments） ----------------
// parameters 与 arguments
// arguments 和 parameters 都可以表示函数的参数，由于本节内容做了具体的区分，
// 所以我们定义 parameters 表示我们定义函数时设置的名字即 形参，arguments 表示我们实际传入函数的参数即 实参

// -------- 8.1剩余参数（Rest Parameters） --------
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x)
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4)
// 在 TypeScript 中，剩余参数的类型会被隐式设置为 any[] 而不是 any，如果你要设置具体的类型，必须是 Array<T> 或者 T[]的形式，再或者就是元组类型（tuple type）

// -------- 8.2剩余参数（Rest Arguments） --------
const args = [8, 5] as const
const angle = Math.atan2(...args)

// -------------- 9.参数解构（Parameter Destructuring） --------------
type ABC = { a: number; b: number; c: number }
function sum({ a, b, c }: ABC) {
  console.log(a + b + c)
}

// -------------- 10.函数的可赋值性 （Assignability of Functions） --------------
// https://ts.yayujs.com/handbook/MoreOnFunctions.html#%E5%87%BD%E6%95%B0%E7%9A%84%E5%8F%AF%E8%B5%8B%E5%80%BC%E6%80%A7-assignability-of-functions
// 返回 void
