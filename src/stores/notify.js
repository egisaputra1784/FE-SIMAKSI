import { reactive } from "vue"

export const notifyState = reactive({
  show: false,
  message: "",
  type: "success"
})

export function showNotify(message, type = "success") {

  notifyState.message = message
  notifyState.type = type
  notifyState.show = true

  setTimeout(() => {
    notifyState.show = false
  }, 2500)
}