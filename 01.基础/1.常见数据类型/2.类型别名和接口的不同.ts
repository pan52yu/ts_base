// 类型别名和接口的不同
// 两者最关键的差别在于类型别名本身无法添加新的属性，而接口是可以扩展的
interface IPoint {
    x: number,
    y: number
}

// 1. 接口可以再已经存在的接口上进行添加新的属性
interface IPoint2 {
    x: number
}

interface IPoint2 {
    y: number
}

const point3: IPoint2 = {
    x: 1,
    y: 2
}

// Type 创建后无法再次修改
type IPoint3 = {
    x: number
}

// type IPoint3 = {
//     y: number
// }
// TS2300: Duplicate identifier 'IPoint3'.

// 2. 接口可以继承
interface IPoint4 extends IPoint {
    z: number
}

const point5: IPoint4 = {
    x: 1,
    y: 2,
    z: 3
}
// Type 通过交集扩展类型
type IPoint5 = IPoint & {
    z: number
}

const point6: IPoint5 = {
    x: 1,
    y: 2,
    z: 3
}

// 3. 接口可以定义函数类型
interface ISum {
    (num1: number, num2: number): number
}

const sum2: ISum = (num1, num2) => {
    return num1 + num2
}

// 4. 接口可以定义可索引的类型
interface IObj {
    [index: number]: string

}

const obj4: IObj = ["1", "2"]

// 5. 接口可以定义类类型
interface IAnimal {
    name: string,

    eat(str: string): void
}

class Dog implements IAnimal {
    name: string

    constructor(name: string) {
        this.name = name
    }

    eat() {
        console.log(`${this.name} is eating`)
    }
}
