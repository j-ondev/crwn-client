export function getEnv(env_vars) {
  return env_vars.map(
    (variable) => process.env[`REACT_APP_${variable}`]
  )
}