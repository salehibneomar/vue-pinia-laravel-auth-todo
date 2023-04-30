import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast'
  },
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true
})

export const ErrorToast = (message) => {
  Toast.fire({
    icon: 'error',
    title: `${message}`
  })
}

export const WarningToast = (message) => {
  Toast.fire({
    icon: 'warning',
    title: `${message}`
  })
}

export const SuccessToast = (message) => {
  Toast.fire({
    icon: 'success',
    title: `${message}`
  })
}

export const InfoToast = (message) => {
  Toast.fire({
    icon: 'info',
    title: `${message}`
  })
}

export default Toast
