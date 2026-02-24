import { ref } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const inc = () => count.value++
  const dec = () => count.value--
  return { count, inc, dec }
}

export function useMagic() {
  const magic = ref('✨')
  return { magic }
}
