import { useToast } from "vue-toastification"
import router from "@/router"
import { ref } from "vue"
import { gsap } from "gsap"

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
export function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    duration: 2,
    x: 0,
    delay: el.dataset.index * 0.25,
    onComplete: done,
  })
}
export function onLeave(el, done) {
  gsap.to(el, {
    opacity: 0,
    duration: 2,
    x: -50,
    delay: el.dataset.index * 0.25,
    onComplete: done,
  })
}
export function onLeaveTop(el, done) {
  gsap.to(el, {

    duration: 1,
    height: 0,
    delay: el.dataset.index * 0.25,
    onComplete: done,
  })
}
export function onBeforeEnter(el, done) {
  gsap.to(el, {
    opacity: 0,
    x: -20,
    delay: el.dataset.index * 0.25,
    onComplete: done,
  })
}
export async function goto(to = null, data = null) {
  if (data != null) {
    console.log(`${data}`)
    await router.push({ name: to, params: { id: data } })
  } else if (to == null) {
    console.log(`Data is ${data}`)
    await router.back()
  } else {
    await router.push({ name: to })
  }
}
