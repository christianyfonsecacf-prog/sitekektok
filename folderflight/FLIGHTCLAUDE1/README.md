# ✈️ Flight Claude - Sistema de Busca de Passagens

Um buscador de passagens aéreas com **ofertas pré-carregadas** e busca global.

## 🚀 Funcionalidades

### ⚡ Carregamento Instantâneo
- **Ofertas em destaque** aparecem automaticamente ao abrir o site
- **Cache inteligente** de 6 horas no localStorage 
- **Rotas populares** brasileiras pré-carregadas

### 🌍 Busca Global
- **Autocomplete** com aeroportos do mundo inteiro
- **Geolocalização** automática (opcional)
- **Filtros inteligentes** garantem destino correto

### 📱 Design Minimalista
- **Estética japonesa** clean e elegante
- **Cores gradiente** indicam preços (azul=barato, vermelho=caro)
- **Interface responsiva** funciona em todos os dispositivos

## 🏗️ Estrutura do Projeto

```
FLIGHTCLAUDE1/
├── index.html              # Interface principal
├── script.js               # Lógica principal + busca personalizada
├── style.css               # Design minimalista japonês
└── offers/
    ├── preload-offers.js   # Sistema de ofertas pré-carregadas
    └── routes.js           # Rotas populares do Brasil
```

## ⚙️ Como Funciona

### 1. **Ao carregar o site**
- Mostra "Carregando ofertas..."
- Verifica cache local (localStorage)
- Se cache válido → exibe ofertas instantaneamente
- Se cache expirado → busca novas ofertas via API

### 2. **Sistema de Cache**
- **Duração**: 6 horas
- **Storage**: localStorage do navegador
- **Fallback**: Busca em tempo real se cache falhar

### 3. **Ofertas Inteligentes** 
- **Rotas**: 8 mais populares do Brasil
- **Período**: Próximos 5 dias
- **Ordenação**: Por preço (mais baratas primeiro)
- **Limite**: 20 melhores ofertas

### 4. **Interação com Ofertas**
- **Clique na oferta** → preenche formulário automaticamente
- **Scroll suave** para o formulário de busca
- **Busca personalizada** com dados preenchidos

## 🎯 Rotas Pré-carregadas

- ✈️ São Paulo ↔ Rio de Janeiro
- ✈️ São Paulo ↔ Brasília  
- ✈️ São Paulo → Recife
- ✈️ São Paulo → Salvador
- ✈️ Rio de Janeiro → Salvador
- ✈️ São Paulo → Fortaleza

## 🔧 APIs Utilizadas

- **Amadeus Flight Search API** - Dados de voos em tempo real
- **IPGeolocation.io** - Detecção automática de localização
- **BigDataCloud Geocoding** - Conversão coordenadas → cidade

## 🎨 Características do Design

- **Paleta**: Neutros com acentos em azul/vermelho
- **Tipografia**: System fonts (-apple-system, Helvetica Neue)
- **Espaçamento**: Generoso, inspirado no design japonês
- **Animações**: Suaves e funcionais
- **Cards**: Hover effects com elevação

## 💡 Benefícios

✅ **Performance**: Ofertas aparecem instantaneamente  
✅ **Economia**: Mostra sempre as passagens mais baratas  
✅ **UX**: Interface limpa e intuitiva  
✅ **Confiabilidade**: Cache local + fallback para API  
✅ **Global**: Busca voos para qualquer lugar do mundo

## 🚀 Ideal para Portfólio

- Demonstra skills de **API integration**
- **Cache strategies** e **performance optimization**
- **Modern JavaScript** (async/await, ES6+)
- **Responsive design** e **UX thinking**
- **Error handling** robusto