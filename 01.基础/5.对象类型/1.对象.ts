// ------------------- 对象类型 -------------------
// 匿名定义
function greet(person: { name: string; age: number }) {
  return "Hello " + person.name
}
// 接口定义
interface Person {
  name: string
  age: number
}
function greet2(person: Person) {
  return "Hello " + person.name
}
// 类型别名
type Person2 = {
  name: string
  age: number
}
function greet3(person: Person2) {
  return "Hello " + person.name
}
