// Rotas mais populares do Brasil para pré-carregamento
const POPULAR_BRAZIL_ROUTES = [
  // Top rotas domésticas
  { from: "GRU", to: "GIG", name: "São Paulo → Rio" },
  { from: "GIG", to: "GRU", name: "Rio → São Paulo" },
  { from: "GRU", to: "BSB", name: "São Paulo → Brasília" },
  { from: "BSB", to: "GRU", name: "Brasília → São Paulo" },
  { from: "GRU", to: "REC", name: "São Paulo → Recife" },
  { from: "GRU", to: "SSA", name: "São Paulo → Salvador" },
  { from: "GIG", to: "SSA", name: "Rio → Salvador" },
  { from: "GRU", to: "FOR", name: "São Paulo → Fortaleza" },
  { from: "CNF", to: "GRU", name: "Belo Horizonte → São Paulo" },
  { from: "POA", to: "GRU", name: "Porto Alegre → São Paulo" }
];

if (typeof module !== 'undefined') {
  module.exports = { POPULAR_BRAZIL_ROUTES };
}