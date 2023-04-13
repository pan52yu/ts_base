// ------------------ 泛型 ------------------
// https://ts.yayujs.com/handbook/Generics.html#%E6%B3%9B%E5%9E%8B-generics
function identity<Type>(arg: Type): Type {
  return arg
}
const output = identity<string>("myString")
// 类型参数推断
const output2 = identity("myString")
