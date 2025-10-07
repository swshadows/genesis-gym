type ConfigData = {
  name: string
  phone: string
  cref: string
  address: string
  socialLink: string
}

const LS_KEY = 'genesis-gym-config'

export function saveConfig(config: ConfigData) {
  localStorage.setItem(LS_KEY, JSON.stringify(config))
}

export function getConfig(): ConfigData | null {
  const data = localStorage.getItem(LS_KEY)
  if (!data) return null

  return JSON.parse(data)
}
