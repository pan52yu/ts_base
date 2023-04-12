// -------------- 1. 基础数据类型 --------------
// 字符串类型
const str: string = 'hello world';

// 数字类型
const num: number = 123;

// 布尔类型
const bool: boolean = true;

// -------------- 2. 数组类型 --------------
// 数组中的元素类型必须一致
const arr: number[] = [1, 2, 3];
// 也可以使用泛型
const arr2: Array<number> = [1, 2, 3];
// 元组类型
const arr4: [number, string] = [1, '2'];
// 只读数组
const arr5: readonly number[] = [1, 2, 3];
// arr5[0] = 2; // 无法分配到 "0"，因为它是只读属性。

// -------------- 3. any类型 --------------
let any: any = 1
any = "123"
any = [1, 2, 3]
any = {
    value: "123"
}

// -------------- 4. 函数类型 --------------
// 求和函数
const sum = (num1: number, num2: number): number => {
    return num1 + num2
}
console.log(sum(2, 3))

// -------------- 5. 对象类型 --------------
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

// -------------- 6. 联合类型 --------------
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

// -------------- 7. 类型别名 --------------
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

// -------------- 8. 接口 --------------
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

// -------------- 9.类型断言 --------------
// 类型断言（Type Assertion）可以用来手动指定一个值的类型
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
// 或者
const myCanvas2 = <HTMLCanvasElement>document.getElementById("main_canvas");

// 谨记：因为类型断言会在编译的时候被移除，所以运行时并不会有类型断言的检查，即使类型断言是错误的，也不会有异常或者 null 产生。

// const test = "123" as number
// 将‘ string’类型转换为‘ number’类型可能是一个错误，因为这两种类型都不会与另一种类型充分重叠。如果这是有意为之，那么首先将表达式转换为“未知”。

// -------------- 10. 字面量类型 --------------
// 字面量类型用来约束取值只能是某几个值中的一个
type myType2 = "success" | "error"
const type4: myType2 = "success"

// const type5: myType2 = "fail" // 类型“"fail"”的参数不能赋给类型“myType2”的参数。
// declare 是 TypeScript 中的一个关键字，用来定义一些在当前环境下不存在的类型。
declare function handleRequest(url: string, method: "GET" | "POST"): void;

const req = {url: "https://example.com", method: "GET"} as const;
handleRequest(req.url, req.method);

// Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.

// -------------- 11. null 和 undefined --------------
// 在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型：
let u: undefined = undefined;
let n: null = null;
// strictNullChecks 严格的空检查
// 默认情况下，null 和 undefined 是所有类型的子类型。 就是说你可以把 null 和 undefined 赋值给 number 类型的变量。
// 当你指定了 --strictNullChecks 标记，null 和 undefined 只能赋值给 void 和它们各自。
// 这能避免很多常见的问题。 也许在某处你想传入一个 string 或 null 或 undefined，你可以使用联合类型 string | null | undefined。
// 但是通常我们会写成 string | undefined，因为我们通常不会传入一个 null。
// 另一个例子是当你想传入一个 string 或 undefined，你可以写成 string | undefined，但是通常我们会写成 string?，可选参数会添加 | undefined。

// -------------- 12. 非空断言 --------------
// 非空断言操作符 ! 可以用来告诉编译器变量不为空，即可忽略编译器的空检查
let myName = "123" as string | null;
let myNameLength = myName!.length;
// 但是，如果 myName 是 null，那么 myName!.length 会报错，因为此时 myName 为 null，而 null 是没有 length 属性的。
// 所以，非空断言操作符 ! 只能用在确定变量不为空的情况下。

// -------------- 13. 枚举 --------------
// 枚举是 TypeScript 添加的新特性，用于描述一个值可能是多个常量中的一个。
// 不同于大部分的 TypeScript 特性，这并不是一个类型层面的增量，而是会添加到语言和运行时。
// 因为如此，你应该了解下这个特性。但是可以等一等再用，除非你确定要使用它。
// 你可以在枚举类型 (opens new window)页面了解更多的信息
// 枚举类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红色、绿色、蓝色等。
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat}

console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true
console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true
// 上面代码中，Days[0]的值是"Sun"，Days["Sun"]的值是0，两者是可以互相转换的。

// 但是，如果不是用上面的写法，而是手动赋值，就不行了。
enum Days2 {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat}

console.log(Days2["Sun"] === 7); // true
console.log(Days2["Mon"] === 1); // true
console.log(Days2["Tue"] === 2); // true
console.log(Days2["Sat"] === 6); // true
console.log(Days2[7] === "Sun"); // true
console.log(Days2[1] === "Mon"); // true
console.log(Days2[2] === "Tue"); // true
console.log(Days2[6] === "Sat"); // true
// 上面代码中，手动将 Sun 的值设为 7，结果 Days[7]的值为"Sun"，而不是"Sun"。
// 所以，如果手动赋值，必须保证后面的值与前面的值不重复。

// 如果不想手动赋值，可以让编译器为我们计算出后面的值。
enum Days3 {Sun = 7, Mon, Tue, Wed, Thu, Fri, Sat = "S"}

console.log(Days3["Sun"] === 7); // true
console.log(Days3["Mon"] === 8); // true
console.log(Days3["Tue"] === 9); // true
console.log(Days3["Sat"] === "S"); // true
console.log(Days3[7] === "Sun"); // true
console.log(Days3[8] === "Mon"); // true
console.log(Days3[9] === "Tue"); // true
console.log(Days3["S"] === "Sat"); // true
// 上面代码中，我们将 Sat 的值设为字符串"S"，结果 Days["S"]的值为"Sat"，而不是"S"。

// -------------- 14. 不常见的类型 --------------
// bigInt
// BigInt 是一种内置对象，它提供了一种方法来表示大于 253 - 1 的整数。

// symbol
// Symbol 是一种基本数据类型，就像 Number 和 String 一样。