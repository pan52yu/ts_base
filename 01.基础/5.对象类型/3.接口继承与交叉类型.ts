// ------------------- 1.属性继承（Extending Types） -------------------
interface BasicAddress {
  name?: string
  street: string
  city: string
  country: string
  postalCode: string
}

interface AddressWithUnit extends BasicAddress {
  unit: string
}

// 也可以继承多个接口
interface Colorful {
  color: string
}

interface Circle {
  radius: number
}

interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
}

// ------------------- 2.交叉类型 -------------------
// 交叉类型的符号是 &
interface Colorful2 {
  color: string
}
interface Circle2 {
  radius: number
}

type ColorfulCircle2 = Colorful2 & Circle2
// 新类型 ColorfulCircle2 有两个属性 color 和 radius

function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`)
  console.log(`Radius was ${circle.radius}`)
}

// okay
draw({ color: "blue", radius: 42 })

// oops
draw({ color: "red", raidus: 42 })
// 类型“{ color: string; raidus: number; }”的参数不能赋给类型“Colorful & Circle”的参数。
// 对象文字只能指定已知属性，但“raidus”不存在于类型“Colorful & Circle”中。是否要写“radius”？

// ------------------- 3.接口继承与交叉类型（Interfaces vs Intersections） -------------------
// 这两种方式在合并类型上看起来很相似，但实际上还是有很大的不同。最原则性的不同就是在于冲突怎么处理，这也是你决定选择那种方式的主要原因。

interface Colorful {
  color: string
}

interface ColorfulSub extends Colorful {
  color: number
}
// 接口“ColorfulSub”不能同时扩展类型“Colorful”和“Colorful”。
// 属性”color“的类型不兼容。
// 不能将类型“number”分配给类型“string”。

// 不会报错
interface Colorful2 {
  color: string
}

type ColorfulSub2 = Colorful2 & {
  color: number
}
// 取的是 string & number 的交集，也就是 never
// const color: ColorfulSub2 = 123
// const color2: ColorfulSub2 = "red"
// 都会报错
