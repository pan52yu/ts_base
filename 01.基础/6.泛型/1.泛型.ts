// ------------------ 泛型 ------------------
// https://ts.yayujs.com/handbook/Generics.html#%E6%B3%9B%E5%9E%8B-generics
function identity<Type>(arg: Type): Type {
  return arg
}
const output = identity<string>("myString")
// 类型参数推断
const output2 = identity("myString")

// 泛型的名称不一定要是 Type，但是最好是能够表达出它的意思
function identity2<T>(arg: T): T {
  return arg
}
const output3 = identity2("myString")

// --------- 1.泛型类 ---------
// 泛型类写法上类似于泛型接口。在类名后面，使用尖括号中 <> 包裹住类型参数列表
class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function (x, y) {
  return x + y
}

// 在这个例子中，并没有限制你只能使用 number 类型。我们也可以使用 string 甚至更复杂的类型
let stringNumeric = new GenericNumber<string>()
stringNumeric.zeroValue = ""
stringNumeric.add = function (x, y) {
  return x + y
}

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"))

// --------- 2.泛型约束（Generic Constraints） ---------

interface Lengthwise {
  length: number
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length) // Now we know it has a .length property, so no more error
  return arg
}

// 现在这个泛型函数被约束了，它不再适用于所有类型
loggingIdentity(3)
// 类型“number”的参数不能赋给类型“Lengthwise”的参数

// 可以传入符合约束类型的参数
loggingIdentity([1, 2, 3])

// 也可以传入符合约束条件的值
loggingIdentity({ length: 10, value: 3 })

// --------- 3.在泛型约束中使用类型参数 ---------
// 你可以声明一个类型参数，且它被另一个类型参数所约束
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key]
}

let x = { a: 1, b: 2, c: 3, d: 4 }

getProperty(x, "a")
getProperty(x, "m")
// 类型“"m"”的参数不能赋给类型“"a" | "b" | "c" | "d"”的参数

// --------- 4.在泛型里使用类类型 ---------
// 在 TypeScript 使用泛型创建工厂函数时，需要引用构造函数的类类型
function create<Type>(c: { new (): Type }): Type {
  return new c()
}

class BeeKeeper {
  hasMask: boolean = true
}

class ZooKeeper {
  nametag: string = "Mikle"
}

class Animal {
  numLegs: number = 4
}

class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper()
}

class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper()
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c()
}

createInstance(Lion).keeper.nametag
createInstance(Bee).keeper.hasMask
