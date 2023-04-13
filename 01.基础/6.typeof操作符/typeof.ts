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
