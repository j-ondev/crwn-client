export function getEnv(env_vars: string[]): string[]
export function getEnv(env_vars: string): string
export function getEnv(env_vars: string | string[]): string | string[] {
  if (typeof env_vars === 'string')
    return process.env[`REACT_APP_${env_vars}`] || ''

  return env_vars.map((variable) => process.env[`REACT_APP_${variable}`] || '')
}
