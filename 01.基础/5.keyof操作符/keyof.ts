// ----------------- keyof操作符 -----------------
// keyof操作符用于获取某个类型的所有键，返回值是联合类型
// 对一个对象类型使用 keyof 操作符，会返回该对象属性名组成的一个字符串或者数字字面量的联合
type Point = { x: number; y: number }
type P = keyof Point
// type P = keyof Point
// P 等于 "x" | "y"

type Arrayish = { [n: number]: unknown }
type A = keyof Arrayish
// type A = number

type Mapish = { [k: string]: boolean }
type M = keyof Mapish
// type M = string | number
// M 是 string | number，这是因为 JavaScript 对象的属性名会被强制转为一个字符串，所以 obj[0] 和 obj["0"] 是一样的

// ---------- 1.数字字面量联合类型 ----------
const NumericObject = {
  [1]: "冴羽一号",
  [2]: "冴羽二号",
  [3]: "冴羽三号",
  [4]: "冴羽四号",
}

type result = keyof typeof NumericObject
// type result = 1 | 2 | 3 | 4

// typeof NumbericObject 的结果为：
// {
//   1: string;
//   2: string;
//   3: string;
// }
// 所以最终的结果为：
// type result = 1 | 2 | 3

// ---------- 2.Symbol ----------
const sym1 = Symbol()
const sym2 = Symbol()
const sym3 = Symbol()

const symbolToNumberMap = {
  [sym1]: 1,
  [sym2]: 2,
  [sym3]: 3,
}

type KS = keyof typeof symbolToNumberMap
// type KS = typeof sym1 | typeof sym2 | typeof sym3

// 我们在泛型中像下面的例子中使用，会如此报错
function useKey<T, K extends keyof T>(o: T, k: K) {
  var name: string = k
  // 不能将类型“string | number | symbol”分配给类型“string”。⏎ 不能将类型“number”分配给类型“string”
}

// 如果你确定你的键是字符串，你可以使用 Extract 来从联合类型中提取出某种类型
// Extract 从联合类型中提取出某种类型
function useKey2<T, K extends Extract<keyof T, string>>(o: T, k: K) {
  var name: string = k // OK
}

// 如果你要处理所有的属性名，你可以这样写
function useKey3<T, K extends keyof T>(o: T, k: K) {
  var name: string | number | symbol = k
}

// ---------- 3.类和接口 ----------
// ---- 对类使用 keyof ----
// 例子一
class Person3 {
  name: "冴羽"
}

type result2 = keyof Person3
// type result2 = "name"

// 例子二
class Person4 {
  [1]: string = "冴羽"
}

type result3 = keyof Person4
// type result3 = 1

// ---- 对接口使用 keyof ----
interface Person5 {
  name: "冴羽"
}

type result4 = keyof Person5
// type result4 = "name"
