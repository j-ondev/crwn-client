export function getEnv(name) {
  return process.env[`REACT_APP_${name}`]
}