
function validNumbers (e) {
  let key = e.key
  const allowed = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'ArrowLeft', 'ArrowLeft', 'Delete', 'Tab']
  if (!allowed.includes(key)) e.preventDefault()
}

function validIntNumbers (e) {
  let key = e.key
  const allowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'ArrowLeft', 'ArrowLeft', 'Delete', 'Tab']
  if (!allowed.includes(key)) e.preventDefault()
}

export default async ({ Vue }) => {
  Vue.directive('only-numbers', {
    bind: function (el) {
      el.addEventListener('keypress', validNumbers)
    }
  })
  Vue.directive('only-int-numbers', {
    bind: function (el) {
      el.addEventListener('keypress', validIntNumbers)
    }
  })
}
