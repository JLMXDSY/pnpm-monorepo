// 把一个数组旋转k步
const arr = [1, 2, 3, 4, 5, 6]
/**
 * @param arr
 * @param k
 * 思路
 *  第一种:翻转几次就遍历把数组尾取出来放到数组头几次
 *  第二种:翻转几次就把数组尾部剪掉几个然后合并到数组头部
 */
// 第一种
export function rotate1(arr: number[], k: number) {
  const step = Math.abs(k % arr.length)
  for (let i = 0; i < step; i++) {
    const a = arr.pop()
    a && arr.unshift(a)
  }
  return arr
}
const res1 = rotate1(arr, 100000)
console.time()
console.log(res1, '----111')
console.timeEnd()
// 第二种
const arr2 = [1, 2, 3, 4, 5, 6]
export function rotate2(arr: number[], k: number) {
  if (!k) return arr
  const step = Math.abs(k % arr.length)
  const part1 = arr.splice(-step)
  return part1.concat(arr)
}
const res2 = rotate2(arr2, 100000)
console.time()
console.log(res2, '----222')
console.timeEnd()
