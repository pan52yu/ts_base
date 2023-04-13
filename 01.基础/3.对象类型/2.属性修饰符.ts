// ------------------- 1、属性修饰符 -------------------
// ---------- 1.1、可选属性 ----------
// 添加 ? 表示可选属性
interface Person3 {
  name: string
  age?: number
}
const person3: Person3 = {
  name: "Tom",
}
const person4: Person3 = {
  name: "Tom",
  age: 25,
}

interface PaintOptions {
  xPos?: number
  yPos?: number
}

// 会存在 undefined 的情况
function paintShape(opts: PaintOptions) {
  let xPos = opts.xPos
  // (property) PaintOptions.xPos?: number | undefined
  let yPos = opts.yPos
  // (property) PaintOptions.yPos?: number | undefined
  console.log(xPos, yPos)
}

// 可以特殊处理 undefined 的情况
function paintShape2(opts: PaintOptions) {
  let xPos = opts.xPos === undefined ? 0 : opts.xPos
  // let xPos: number
  let yPos = opts.yPos === undefined ? 0 : opts.yPos
  // let yPos: number
  console.log(xPos, yPos)
}

// ---------- 1.2、只读属性 ----------
// readonly 属性（readonly Properties）
// 不可以直接修改，但是可以修改内部的某一项
// 或者通过别名的方式修改
interface SomeType {
  readonly prop: string
}

function doSomething(obj: SomeType) {
  // We can read from 'obj.prop'.
  console.log(`prop has the value '${obj.prop}'.`)

  // 无法为 "prop" 赋值，因为它是只读属性。
  obj.prop = "hello"
}

interface Home {
  readonly resident: { name: string; age: number }
}

function visitForBirthday(home: Home) {
  // 我们可以读取和更新 'home.resident' 的属性。
  console.log(`Happy birthday ${home.resident.name}!`)
  home.resident.age++
}

function evict(home: Home) {
  // 但是我们不能在 'Home' 上写入 'resident' 属性本身。
  home.resident = {
    // 无法为 "resident" 赋值，因为它是只读属性。
    name: "Victor the Evictor",
    age: 42,
  }
}

// 可以通过别名来修改
interface Person {
  name: string
  age: number
}

interface ReadonlyPerson {
  readonly name: string
  readonly age: number
}

let writablePerson: Person = {
  name: "Person McPersonface",
  age: 42,
}

// works
let readonlyPerson: ReadonlyPerson = writablePerson

console.log(readonlyPerson.age) // prints '42'
writablePerson.age++
console.log(readonlyPerson.age) // prints '43'

readonlyPerson = {
  name: "zs",
  age: 18,
}

// ---------- 1.3 索引签名 ----------
interface StringArray {
  [index: number]: string
}

const myArray: StringArray = ["Bob", "Fred"]
const secondItem = myArray[1] // const secondItem: string
// 这个索引签名表示当一个 StringArray 类型的值使用 number 类型的值进行索引的时候，会返回一个 string类型的值
// 一个索引签名的属性类型必须是 string 或者是 number

interface Animal {
  name: string
}

interface Dog extends Animal {
  breed: string
}

// Error: indexing with a numeric string might get you a completely separate type of Animal!
interface NotOkay {
  [x: number]: Animal
  // "number"索引类型“Animal”不能赋值给“string”索引类型“Dog”。
  [x: string]: Dog
}

// name 的类型并不匹配字符串索引的类型，所以类型检查器会给出报错
interface NumberDictionary {
  [index: string]: number

  length: number // ok
  name: string
  // Property 'name' of type 'string' is not assignable to 'string' index type 'number'.
}

// 如果一个索引签名是属性类型的联合，那各种类型的属性就可以接受了
interface NumberOrStringDictionary {
  [index: string]: number | string
  length: number // ok, length is a number
  name: string // ok, name is a string
}

interface test {
  name: string
  age: number
  friends: string[]
  [index: string]: any
}

// 也可以设置只读索引签名
interface ReadonlyStringArray {
  readonly [index: number]: string
}

const myArray2: ReadonlyStringArray = ["Alice", "Bob"]
myArray2[0] = "Mallory" // 类型“ReadonlyStringArray”中的索引签名仅允许读取
