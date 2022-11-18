export const consoleLog = msg => console.log(msg)

export default (_context, inject) => {
  inject('log', consoleLog)
}
