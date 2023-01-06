export function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    // Escolhendo elemento aleatório
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [array[i], array[j]] = [array[j], array[i]];
  }
  // Retornando array com aleatoriedade
  return array;
}
