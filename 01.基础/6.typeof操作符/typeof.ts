// --------------- typeof操作符 ---------------
let s = "hello"
let n: typeof s
// let n: string

// ts 内置的 ReturnType<T> 类型可以获取函数返回值的类型
type Predicate = (x: unknown) => boolean
type K = ReturnType<Predicate>
// type K = boolean

// 如果直接使用函数类型，会报错
function f() {
  return { x: 10, y: 3 }
}
type P = ReturnType<f>

// 'f' refers to a value, but is being used as a type here. Did you mean 'typeof f'?

// 使用 typeof 可以解决这个问题
type P2 = ReturnType<typeof f>
// type P2 = { x: number; y: number; }

// --------- 1.限制（Limitations） ---------
// TypeScript 有意的限制了可以使用 typeof 的表达式的种类。
// 在 TypeScript 中，只有对标识符（比如变量名）或者他们的属性使用 typeof 才是合法的

const msgbox = (message: string) => {
  return message
}
// Meant to use = ReturnType<typeof msgbox>
// let shouldContinue: typeof msgbox("Are you sure you want to continue?");
// ',' expected.
// typeof 只能对标识符和属性使用

// 正确写法
let shouldContinue2: ReturnType<typeof msgbox>
// let shouldContinue2: string

// --------- 2.对对象使用 typeof ---------
const person = { name: "kevin", age: "18" }
type Kevin = typeof person
// type Kevin = {
// 		name: string;
// 		age: string;
// }

// --------- 3.对函数使用 typeof ---------
function identity<Type>(arg: Type): Type {
  return arg
}

type result = typeof identity
// type result = <Type>(arg: Type) => Type

// --------- 4.对enum使用 typeof ---------

enum UserResponse {
  No = 0,
  Yes = 1,
}
console.log(UserResponse)
// [LOG]: {
//   "0": "No",
//   "1": "Yes",
//   "No": 0,
//   "Yes": 1
// }

// 如果我们对 UserResponse 使用 typeof
type result2 = typeof UserResponse

// ok
const a: result2 = {
  No: 2,
  Yes: 3,
}

// result 类型类似于：
// {
//	"No": number,
//  "YES": number
// }

type result3 = keyof typeof UserResponse
// type result3 = "No" | "Yes"

const b: result3 = "No"
