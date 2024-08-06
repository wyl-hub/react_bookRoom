export function removeEmptStr(obj) {
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'string') {
      obj[key] = obj[key].trim()
    }
  })

  return obj
}