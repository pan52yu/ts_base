// 1. 基础数据类型 --------------
// 字符串类型
const str: string = 'hello world';

// 数字类型
const num: number = 123;

// 布尔类型
const bool: boolean = true;

// 2. 数组类型 --------------
// 数组中的元素类型必须一致
const arr: number[] = [1, 2, 3];
// 也可以使用泛型
const arr2: Array<number> = [1, 2, 3];
// 元组类型
const arr4: [number, string] = [1, '2'];
// 只读数组
const arr5: readonly number[] = [1, 2, 3];
// arr5[0] = 2; // 无法分配到 "0"，因为它是只读属性。

// 3. any类型 --------------
let any: any = 1
any = "123"
any = [1, 2, 3]
any = {
    value: "123"
}

// 4. 函数类型 --------------
// 求和函数
const sum = (num1: number, num2: number): number => {
    return num1 + num2
}
console.log(sum(2, 3))

// 5. 对象类型 --------------
// 对象中的属性类型必须一致
const obj: { name: string, age: number } = {
    name: "zs",
    age: 18
}
// 可选属性
const obj2: { name: string, age?: number } = {
    name: "zs"
}
// 只读属性
const obj3: { readonly name: string, age?: number } = {
    name: "zs"
}
// obj3.name = "ls" // 无法分配给“ name”，因为它是只读属性。

// 6. 联合类型 --------------
// 联合类型表示取值可以为多种类型中的一种
const union: string | number = 1
const union2: string | number = "1"
// const union3: string | number = true // 类型“boolean”的参数不能赋给类型“string | number”的参数。
const pointId = (id: string | number) => {
    if (typeof id === "string") {
        console.log(id.toUpperCase())
    } else {
        console.log(id)
    }
}

// 7. 类型别名 --------------
// 类型别名用来给一个类型起个新名字
type myType = 1 | 2 | 3 | 4 | 5
const type: myType = 1
const type2: myType = 2
// const type3: myType = 6 // 类型“6”的参数不能赋给类型“myType”的参数。
type Point = {
    x: number,
    y: number
}
const point: Point = {
    x: 1,
    y: 2
}

// 8. 接口 --------------
// 接口用来定义对象的类型
interface IPoint {
    x: number,
    y: number
}

const point2: IPoint = {
    x: 1,
    y: 2
}

// 可选属性
interface IPoint2 {
    x: number,
    y: number,
    z?: number
}

const point3: IPoint2 = {
    x: 1,
    y: 2
}
