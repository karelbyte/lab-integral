import { Notify } from 'quasar'

const noty = {
  positive: (message) => {
    Notify.create({
      message: message,
      progress: true,
      type: 'positive',
      color: 'positive',
      textColor: 'black',
      timeout: 1500,
      icon: 'fa fa-check-circle',
      position: 'bottom'
    })
  },
  negative: (message) => {
    Notify.create({
      message: message,
      progress: true,
      type: 'negative',
      color: 'negative',
      textColor: 'white',
      timeout: 1500,
      icon: 'fa fa-minus-circle',
      position: 'bottom'
    })
  },
  info: (message) => {
    Notify.create({
      message: message,
      progress: true,
      type: 'info',
      color: 'info',
      timeout: 1500,
      textColor: 'black',
      icon: 'fa fa-info-circle',
      position: 'bottom'
    })
  },
  warning: (message) => {
    Notify.create({
      message: message,
      progress: true,
      type: 'warning',
      color: 'warning',
      timeout: 1500,
      textColor: 'black',
      icon: 'fa fa-exclamation-triangle',
      position: 'bottom'
    })
  }
}

export default ({ Vue }) => {
  Vue.prototype.$noty = noty
}
