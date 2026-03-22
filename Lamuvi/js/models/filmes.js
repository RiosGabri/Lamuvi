//Definição do formato de um filme
export function novofilme(titulo, descricao) {
  return {
    id: Date.now(),
    titulo,
    descricao,
    avaliacoes: []
  };
}