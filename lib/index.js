export function getPokemonId(url) {
  return url.match(/\/(pokemon)\/(\d+)/)[2]
}

export function nameNicer(str) {
  return str.replace(/\-/g,' ')
}
