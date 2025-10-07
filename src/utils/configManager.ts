const LS_KEY = 'genesis-gym-config'

export function saveConfig(config: unknown) {
  localStorage.setItem(LS_KEY, JSON.stringify(config))
}

export function getConfig() {
  return JSON.parse(localStorage.getItem(LS_KEY) || '{}')
}
