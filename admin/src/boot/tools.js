// export const ApiUrl = 'http://lab.jet/api'
export const ApiUrl = '/api'

export const onview = function (pro, v) {
  for (let property in v) {
    v[property] = property === pro
  }
}

function dec2hex (dec) {
  return ('0' + dec.toString(16)).substr(-2)
}

export const dateToUS = function (dt, separator = '-') {
  let m = dt.getMonth() < 9 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1
  let d = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate()
  return dt.getFullYear() + separator + m + separator + d
}

export const generateId = function (len) {
  let arr = new Uint8Array((len || 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}
