//Definição do formato de uma avaliação
export function criarAvaliacao(nota, comentario) {
  return {
    nota,
    comentario,
    data: new Date()
  };
}