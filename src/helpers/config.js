export function getEnv(env_vars) {
  if (Array.isArray(env_vars))
    return env_vars.map((variable) => process.env[`REACT_APP_${variable}`])
  else return process.env[`REACT_APP_${env_vars}`]
}
