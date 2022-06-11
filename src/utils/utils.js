import { useToast } from "vue-toastification"
import { ref } from "vue"
export const toast = useToast()
export const src = ref(null)
export function onFileChange(event) {
  if (event.target.files && event.target.files[0]) {
    src.value = window.URL.createObjectURL(event.target.files[0])
    window.URL.revokeObjectURL(event.target.files[0]) // free memory
  } else {
    src.value = null
  }
}
export function pickFile(idInput) {
  const file_input = document.getElementById(idInput)
  file_input.click()
  file_input.addEventListener("change", onFileChange)
}
