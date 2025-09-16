const API_KEY = "TDDzhDODyoReuPqCZS9HgvwOO6TcOjEd";
const API_SECRET = "dnlFEA11jmfsGCUM";
const AUTH_URL = "https://test.api.amadeus.com/v1/security/oauth2/token";
const FLIGHT_URL = "https://test.api.amadeus.com/v2/shopping/flight-offers";

// Principais aeroportos do mundo
const WORLD_AIRPORTS = [
  // Brasil
  { code: "GRU", city: "São Paulo", country: "Brasil", name: "Guarulhos" },
  { code: "CGH", city: "São Paulo", country: "Brasil", name: "Congonhas" },
  { code: "GIG", city: "Rio de Janeiro", country: "Brasil", name: "Galeão" },
  { code: "SDU", city: "Rio de Janeiro", country: "Brasil", name: "Santos Dumont" },
  { code: "BSB", city: "Brasília", country: "Brasil", name: "Brasília" },
  { code: "CNF", city: "Belo Horizonte", country: "Brasil", name: "Confins" },
  { code: "POA", city: "Porto Alegre", country: "Brasil", name: "Salgado Filho" },
  { code: "REC", city: "Recife", country: "Brasil", name: "Recife" },
  { code: "SSA", city: "Salvador", country: "Brasil", name: "Salvador" },
  { code: "FOR", city: "Fortaleza", country: "Brasil", name: "Fortaleza" },
  { code: "CWB", city: "Curitiba", country: "Brasil", name: "Afonso Pena" },
  { code: "FLN", city: "Florianópolis", country: "Brasil", name: "Florianópolis" },
  { code: "MAO", city: "Manaus", country: "Brasil", name: "Manaus" },
  { code: "BEL", city: "Belém", country: "Brasil", name: "Belém" },
  
  // América do Norte
  { code: "JFK", city: "Nova York", country: "EUA", name: "John F. Kennedy" },
  { code: "LGA", city: "Nova York", country: "EUA", name: "LaGuardia" },
  { code: "LAX", city: "Los Angeles", country: "EUA", name: "Los Angeles Intl" },
  { code: "MIA", city: "Miami", country: "EUA", name: "Miami Intl" },
  { code: "ORD", city: "Chicago", country: "EUA", name: "O'Hare" },
  { code: "ATL", city: "Atlanta", country: "EUA", name: "Hartsfield-Jackson" },
  { code: "YYZ", city: "Toronto", country: "Canadá", name: "Pearson" },
  { code: "YVR", city: "Vancouver", country: "Canadá", name: "Vancouver Intl" },
  
  // Europa
  { code: "LHR", city: "Londres", country: "Reino Unido", name: "Heathrow" },
  { code: "LGW", city: "Londres", country: "Reino Unido", name: "Gatwick" },
  { code: "CDG", city: "Paris", country: "França", name: "Charles de Gaulle" },
  { code: "ORY", city: "Paris", country: "França", name: "Orly" },
  { code: "MAD", city: "Madrid", country: "Espanha", name: "Madrid-Barajas" },
  { code: "BCN", city: "Barcelona", country: "Espanha", name: "Barcelona-El Prat" },
  { code: "FCO", city: "Roma", country: "Itália", name: "Fiumicino" },
  { code: "MXP", city: "Milão", country: "Itália", name: "Malpensa" },
  { code: "AMS", city: "Amsterdam", country: "Holanda", name: "Schiphol" },
  { code: "FRA", city: "Frankfurt", country: "Alemanha", name: "Frankfurt am Main" },
  { code: "MUC", city: "Munique", country: "Alemanha", name: "Munich" },
  { code: "HAM", city: "Hamburgo", country: "Alemanha", name: "Hamburg" },
  { code: "BER", city: "Berlim", country: "Alemanha", name: "Brandenburg" },
  { code: "ZUR", city: "Zurique", country: "Suíça", name: "Zurich" },
  { code: "LIS", city: "Lisboa", country: "Portugal", name: "Portela" },
  { code: "OPO", city: "Porto", country: "Portugal", name: "Francisco Sá Carneiro" },
  { code: "VIE", city: "Viena", country: "Áustria", name: "Vienna International" },
  { code: "CPH", city: "Copenhague", country: "Dinamarca", name: "Copenhagen" },
  { code: "ARN", city: "Estocolmo", country: "Suécia", name: "Arlanda" },
  { code: "OSL", city: "Oslo", country: "Noruega", name: "Gardermoen" },
  
  // Ásia
  { code: "NRT", city: "Tóquio", country: "Japão", name: "Narita" },
  { code: "ICN", city: "Seul", country: "Coreia do Sul", name: "Incheon" },
  { code: "PEK", city: "Pequim", country: "China", name: "Capital Intl" },
  { code: "SIN", city: "Singapura", country: "Singapura", name: "Changi" },
  { code: "DXB", city: "Dubai", country: "EAU", name: "Dubai Intl" },
  
  // América Latina
  { code: "EZE", city: "Buenos Aires", country: "Argentina", name: "Ezeiza" },
  { code: "SCL", city: "Santiago", country: "Chile", name: "Comodoro Arturo" },
  { code: "LIM", city: "Lima", country: "Peru", name: "Jorge Chávez" },
  { code: "BOG", city: "Bogotá", country: "Colômbia", name: "El Dorado" },
  { code: "PTY", city: "Cidade do Panamá", country: "Panamá", name: "Tocumen" }
];

// Rotas populares para buscar ofertas
const POPULAR_ROUTES = [
  ["GRU", "GIG"], ["GRU", "BSB"], ["GRU", "CNF"],
  ["GIG", "SSA"], ["BSB", "REC"], ["CNF", "FOR"]
];

// Mapeamento de regiões para aeroportos
const REGION_AIRPORTS = {
  "São Paulo": ["GRU", "CGH"],
  "Rio de Janeiro": ["GIG", "SDU"],
  "Brasília": ["BSB"],
  "Belo Horizonte": ["CNF"],
  "Porto Alegre": ["POA"],
  "Recife": ["REC"],
  "Salvador": ["SSA"],
  "Fortaleza": ["FOR"],
  "Curitiba": ["CWB"],
  "Florianópolis": ["FLN"]
};

let accessToken = null;
let tokenExpiry = null;

// Cache de voos
let flightsCache = [];

// Localização do usuário
let userLocation = null;

// Cache de ofertas pré-carregadas
let preloadedOffers = [];
let offersLoaded = false;
let offerPreloader = null;

// Obter token
async function getAccessToken() {
  if (accessToken && tokenExpiry && new Date() < tokenExpiry) {
    return accessToken;
  }

  try {
    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: API_KEY,
        client_secret: API_SECRET
      })
    });
    
    const data = await response.json();
    accessToken = data.access_token;
    tokenExpiry = new Date(Date.now() + (data.expires_in - 60) * 1000);
    return accessToken;
  } catch (error) {
    console.error("Erro ao obter token:", error);
    throw error;
  }
}

// Buscar voos
async function searchFlights(origin, destination, departureDate) {
  const token = await getAccessToken();
  const url = `${FLIGHT_URL}?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=1&max=5&currencyCode=BRL`;

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) return [];
    
    const data = await response.json();
    
    // Filtrar apenas voos que realmente chegam no destino correto
    const filteredFlights = (data.data || []).filter(flight => {
      const segments = flight.itineraries[0].segments;
      const finalDestination = segments[segments.length - 1].arrival.iataCode;
      return finalDestination === destination;
    });
    
    return filteredFlights;
  } catch (error) {
    console.error(`Erro ${origin}-${destination}:`, error);
    return [];
  }
}

// Calcular cor do preço
function getPriceColor(price, minPrice, maxPrice) {
  if (minPrice === maxPrice) return "#3b82f6";
  const ratio = (price - minPrice) / (maxPrice - minPrice);
  const hue = 220 - (ratio * 220);
  return `hsl(${hue}, 70%, 50%)`;
}

// Formatar data
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: 'short'
  });
}

// Formatar hora
function formatTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

// Obter localização do usuário usando API gratuita confiável
async function getUserLocation() {
  try {
    console.log('🌍 Detectando localização...');
    
    // Usar ipapi.co que é gratuita e confiável
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    console.log('📍 Dados de localização:', data);
    
    if (data.city && data.country_name) {
      const location = findNearestAirport(data.city, data.country_name);
      console.log('✅ Aeroporto mais próximo:', location);
      return location;
    }
    
    // Fallback para HTML5 Geolocation
    if (navigator.geolocation) {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            console.log('📡 Usando GPS do navegador...');
            const location = await getCityFromCoordinates(position.coords.latitude, position.coords.longitude);
            resolve(location);
          },
          (error) => {
            console.log('❌ GPS negado ou indisponível:', error.message);
            resolve(null);
          },
          { timeout: 10000, enableHighAccuracy: false }
        );
      });
    }
    
    return null;
  } catch (error) {
    console.error('❌ Erro ao obter localização:', error);
    return null;
  }
}

// Obter cidade através de coordenadas (geocoding reverso)
async function getCityFromCoordinates(lat, lon) {
  try {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`);
    const data = await response.json();
    
    console.log('🗺️ Geocoding reverso:', data);
    
    const detectedCity = data.city || data.locality;
    const detectedCountry = data.countryName;
    
    return findNearestAirport(detectedCity, detectedCountry);
  } catch (error) {
    console.error('❌ Erro no geocoding:', error);
    return null;
  }
}

// Encontrar aeroporto mais próximo
function findNearestAirport(detectedCity, detectedCountry) {
  console.log('🔍 Procurando aeroporto para:', detectedCity, detectedCountry);
  
  if (!detectedCity || !detectedCountry) return null;
  
  const cityLower = detectedCity.toLowerCase();
  const countryLower = detectedCountry.toLowerCase();
  
  // Busca direta por cidade
  let match = WORLD_AIRPORTS.find(airport => 
    airport.city.toLowerCase() === cityLower || 
    cityLower.includes(airport.city.toLowerCase())
  );
  
  if (match) {
    console.log('Aeroporto encontrado por cidade:', match);
    return match.city;
  }
  
  // Busca por país para cidades próximas
  const countryAirports = WORLD_AIRPORTS.filter(airport => 
    airport.country.toLowerCase().includes(countryLower) ||
    countryLower.includes(airport.country.toLowerCase())
  );
  
  if (countryAirports.length > 0) {
    console.log('Aeroportos do país:', countryAirports);
    
    // Se temos coordenadas, encontrar o mais próximo
    if (lat && lon && countryAirports.length > 1) {
      // Para simplicidade, usar o primeiro aeroporto do país
      // Em um app real, calcularíamos distância geográfica
      return countryAirports[0].city;
    }
    
    return countryAirports[0].city;
  }
  
  // Mapeamentos especiais para regiões metropolitanas brasileiras
  const regionMapping = {
    'campinas': 'São Paulo',
    'santos': 'São Paulo', 
    'guarulhos': 'São Paulo',
    'osasco': 'São Paulo',
    'niterói': 'Rio de Janeiro',
    'nova iguaçu': 'Rio de Janeiro',
    'duque de caxias': 'Rio de Janeiro',
    'contagem': 'Belo Horizonte',
    'betim': 'Belo Horizonte',
    'canoas': 'Porto Alegre',
    'gravataí': 'Porto Alegre',
    'são josé dos pinhais': 'Curitiba',
    'pinhais': 'Curitiba'
  };
  
  for (const [region, city] of Object.entries(regionMapping)) {
    if (cityLower.includes(region)) {
      return city;
    }
  }
  
  console.log('❌ Nenhum aeroporto específico encontrado');
  return null;
}

// Gerar rotas baseadas na localização do usuário (apenas para Rio e São Paulo)
function generateUserRoutes(userCity) {
  const userAirports = REGION_AIRPORTS[userCity] || ['GRU'];
  const routes = [];
  
  // Destinos fixos: Rio e São Paulo
  const targetCities = ['Rio de Janeiro', 'São Paulo'];
  
  for (const originCode of userAirports) {
    for (const targetCity of targetCities) {
      if (targetCity === userCity) continue; // Não buscar da mesma cidade
      const destCodes = REGION_AIRPORTS[targetCity] || [];
      for (const destCode of destCodes) {
        routes.push([originCode, destCode]);
      }
    }
  }
  
  // Se não temos rotas (usuário está em SP ou RJ), usar rotas padrão
  if (routes.length === 0) {
    routes.push(['GRU', 'GIG'], ['GIG', 'GRU'], ['CGH', 'SDU']);
  }
  
  return routes;
}


// Busca personalizada
async function searchCustomFlights() {
  console.log('🔍 Iniciando busca personalizada...');
  
  const originInput = document.getElementById('origem');
  const destInput = document.getElementById('destino');
  const dateInput = document.getElementById('data-partida');
  
  const origin = originInput.dataset.selectedCode || originInput.value.toUpperCase().substring(0, 3);
  const destination = destInput.dataset.selectedCode || destInput.value.toUpperCase().substring(0, 3);
  const date = dateInput.value;

  console.log('Dados da busca:', { origin, destination, date });

  if (!origin || !destination || !date) {
    alert('Por favor, preencha todos os campos (origem, destino e data)');
    return;
  }

  if (origin === destination) {
    alert('Origem e destino devem ser diferentes');
    return;
  }

  const loadingEl = document.getElementById('loading');
  const tableEl = document.getElementById('flights-table');
  const tbodyEl = document.getElementById('flights-tbody');
  const offersEl = document.getElementById('offers-section');
  const legendEl = document.getElementById('price-legend');
  
  loadingEl.style.display = 'flex';
  tableEl.style.display = 'none';
  offersEl.style.display = 'none';
  legendEl.style.display = 'none';
  tbodyEl.innerHTML = '';

  console.log(`🛫 Buscando voos de ${origin} para ${destination} em ${date}...`);
  
  const flights = await searchFlights(origin, destination, date);

  console.log(`✈️ ${flights.length} voos encontrados`);

  if (flights.length === 0) {
    tbodyEl.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #666;">Nenhum voo encontrado para esta rota</td></tr>';
    loadingEl.style.display = 'none';
    tableEl.style.display = 'block';
    return;
  }

  // Adicionar informações de cidade
  flights.forEach(flight => {
    const originAirport = WORLD_AIRPORTS.find(a => a.code === origin);
    const destAirport = WORLD_AIRPORTS.find(a => a.code === destination);
    flight.originCity = originAirport?.city || origin;
    flight.destCity = destAirport?.city || destination;
  });

  // Ordenar por preço
  flights.sort((a, b) => parseFloat(a.price.total) - parseFloat(b.price.total));

  // Calcular range de preços
  const prices = flights.map(f => parseFloat(f.price.total));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // Renderizar em formato de tabela para busca personalizada também
  // Limpar tabela
  tbodyEl.innerHTML = '';
  
  flights.forEach(flight => {
    const segment = flight.itineraries[0].segments[0];
    const price = parseFloat(flight.price.total);
    const color = getPriceColor(price, minPrice, maxPrice);
    const ratio = (price - minPrice) / (maxPrice - minPrice);
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="route-cell">${flight.originCity} → ${flight.destCity}</td>
      <td>${formatDate(segment.departure.at)}</td>
      <td>${segment.carrierCode} ${segment.number || ''}</td>
      <td>${segment.carrierCode}</td>
      <td>${formatTime(segment.departure.at)}</td>
      <td>${formatTime(segment.arrival.at)}</td>
      <td class="price-cell">
        <span style="background: ${color}; color: white; padding: 2px 8px; border-radius: 10px; font-size: 10px; margin-right: 8px;">
          ${ratio < 0.3 ? 'OFERTA' : ratio < 0.7 ? 'BOM' : 'ALTO'}
        </span>
        R$ ${price.toFixed(0)}
      </td>
    `;
    tbodyEl.appendChild(row);
  });

  loadingEl.style.display = 'none';
  tableEl.style.display = 'block';
  legendEl.style.display = 'flex';
}

// Autocomplete global
function setupAutocomplete(inputId, listId) {
  const input = document.getElementById(inputId);
  const list = document.getElementById(listId);

  if (!input || !list) {
    console.error('Elementos de autocomplete não encontrados:', inputId, listId);
    return;
  }

  console.log('Configurando autocomplete para:', inputId);

  input.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase().trim();
    list.innerHTML = '';
    
    console.log('Digitando:', value);
    
    if (value.length < 2) {
      list.style.display = 'none';
      return;
    }

    const matches = WORLD_AIRPORTS.filter(airport => 
      airport.code.toLowerCase().includes(value) ||
      airport.city.toLowerCase().includes(value) ||
      airport.name.toLowerCase().includes(value) ||
      airport.country.toLowerCase().includes(value)
    ).slice(0, 8);

    console.log('Matches encontrados:', matches.length);

    if (matches.length > 0) {
      list.style.display = 'block';
      matches.forEach(airport => {
        const item = document.createElement('div');
        item.className = 'autocomplete-item';
        item.innerHTML = `<strong>${airport.code}</strong> - ${airport.city}, ${airport.country}<br><small>${airport.name}</small>`;
        item.addEventListener('click', () => {
          input.value = `${airport.code} - ${airport.city}, ${airport.country}`;
          input.dataset.selectedCode = airport.code;
          input.dataset.userSelected = 'true'; // Marcar como seleção manual do usuário
          list.style.display = 'none';
          console.log('Aeroporto selecionado pelo usuário:', airport);
        });
        list.appendChild(item);
      });
    } else {
      list.style.display = 'none';
    }
  });

  // Fechar ao clicar fora
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.autocomplete-wrapper')) {
      list.style.display = 'none';
    }
  });
}

// Carregar ofertas estáticas imediatamente
function loadStaticOffers() {
  console.log('Carregando ofertas estáticas...');
  
  const loadingEl = document.getElementById('initial-loading');
  const offersEl = document.getElementById('offers-section');
  const tbodyEl = document.getElementById('offers-tbody');
  
  // Carregar ofertas estáticas
  const offersData = getStaticOffers();
  
  if (!offersData || !offersData.offers || offersData.offers.length === 0) {
    console.log('Nenhuma oferta estática encontrada');
    return;
  }
  
  console.log(`${offersData.offers.length} ofertas estáticas carregadas`);
  
  // Simular loading de 1 segundo
  setTimeout(() => {
    renderOffers(offersData, loadingEl, offersEl, tbodyEl);
  }, 1000);
}

// Carregar ofertas dinâmicas em background
async function loadDynamicOffers() {
  try {
    console.log('🔄 Carregando ofertas dinâmicas em background...');
    
    if (!offerPreloader) {
      offerPreloader = new OfferPreloader();
    }
    
    const offersData = await offerPreloader.loadOffers();
    
    if (!offersData || !offersData.offers || offersData.offers.length === 0) {
      console.log('❌ Nenhuma oferta dinâmica encontrada, mantendo estáticas');
      return;
    }
    
    console.log(`${offersData.offers.length} ofertas dinâmicas carregadas, atualizando interface...`);
    
    const loadingEl = document.getElementById('initial-loading');
    const offersEl = document.getElementById('offers-section');
    const tbodyEl = document.getElementById('offers-tbody');
    
    renderOffers(offersData, loadingEl, offersEl, tbodyEl);
    
  } catch (error) {
    console.error('Erro ao carregar ofertas dinâmicas:', error);
    console.log('Mantendo ofertas estáticas');
  }
}

// Função para renderizar ofertas (reutilizável)
function renderOffers(offersData, loadingEl, offersEl, tbodyEl) {
  // Calcular range de preços para cores
  const prices = offersData.offers.map(offer => parseFloat(offer.price.total));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  
  // Renderizar ofertas na tabela (máximo 10)
  tbodyEl.innerHTML = '';
  offersData.offers.slice(0, 10).forEach(offer => {
    const segment = offer.itineraries[0].segments[0];
    const price = parseFloat(offer.price.total);
    const color = getPriceColor(price, minPrice, maxPrice);
    const ratio = (price - minPrice) / (maxPrice - minPrice);
    
    const originAirport = WORLD_AIRPORTS.find(a => a.code === segment.departure.iataCode);
    const destAirport = WORLD_AIRPORTS.find(a => a.code === segment.arrival.iataCode);
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="route-cell">${originAirport?.city || segment.departure.iataCode} → ${destAirport?.city || segment.arrival.iataCode}</td>
      <td>${formatDate(segment.departure.at)}</td>
      <td>${segment.carrierCode}</td>
      <td>${formatTime(segment.departure.at)}</td>
      <td>
        <span class="offer-price-badge" style="background-color: ${color};">
          ${ratio < 0.3 ? 'OFERTA' : ratio < 0.7 ? 'BOM' : 'ALTO'}
        </span>
        R$ ${price.toFixed(0)}
      </td>
    `;
    
    // Ao clicar, preencher formulário de busca
    row.addEventListener('click', () => {
      const origemInput = document.getElementById('origem');
      const destinoInput = document.getElementById('destino');
      const dataInput = document.getElementById('data-partida');
      
      if (originAirport) {
        origemInput.value = `${segment.departure.iataCode} - ${originAirport.city}, ${originAirport.country}`;
        origemInput.dataset.selectedCode = segment.departure.iataCode;
      }
      
      if (destAirport) {
        destinoInput.value = `${segment.arrival.iataCode} - ${destAirport.city}, ${destAirport.country}`;
        destinoInput.dataset.selectedCode = segment.arrival.iataCode;
      }
      
      dataInput.value = offer.searchDate;
      
      // Fazer scroll para o formulário
      document.querySelector('.main-search').scrollIntoView({ behavior: 'smooth' });
    });
    
    tbodyEl.appendChild(row);
  });
  
  // Mostrar seção de ofertas e esconder loading
  loadingEl.style.display = 'none';
  offersEl.style.display = 'block';
  
  console.log('Ofertas exibidas com sucesso');
}

// Atualizar ofertas baseadas na origem selecionada
function updateOffersBasedOnOrigin(originCode) {
  console.log('Filtrando ofertas para origem:', originCode);
  
  // Filtrar ofertas estáticas que partem da origem selecionada
  const staticOffers = getStaticOffers();
  const filteredOffers = staticOffers.offers.filter(offer => 
    offer.itineraries[0].segments[0].departure.iataCode === originCode
  );
  
  if (filteredOffers.length > 0) {
    const offersEl = document.getElementById('offers-section');
    const tbodyEl = document.getElementById('offers-tbody');
    
    // Não mostrar loading, apenas atualizar tabela existente
    if (offersEl.style.display !== 'none') {
      const filteredData = {
        ...staticOffers,
        offers: filteredOffers
      };
      
      // Apenas re-renderizar a tabela sem loading
      const prices = filteredData.offers.map(offer => parseFloat(offer.price.total));
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      
      tbodyEl.innerHTML = '';
      filteredData.offers.slice(0, 10).forEach(offer => {
        const segment = offer.itineraries[0].segments[0];
        const price = parseFloat(offer.price.total);
        const color = getPriceColor(price, minPrice, maxPrice);
        const ratio = (price - minPrice) / (maxPrice - minPrice);
        
        const originAirport = WORLD_AIRPORTS.find(a => a.code === segment.departure.iataCode);
        const destAirport = WORLD_AIRPORTS.find(a => a.code === segment.arrival.iataCode);
        
        const row = document.createElement('tr');
        row.innerHTML = `
          <td class="route-cell">${originAirport?.city || segment.departure.iataCode} → ${destAirport?.city || segment.arrival.iataCode}</td>
          <td>${formatDate(segment.departure.at)}</td>
          <td>${segment.carrierCode}</td>
          <td>${formatTime(segment.departure.at)}</td>
          <td>
            <span class="offer-price-badge" style="background-color: ${color};">
              ${ratio < 0.3 ? 'OFERTA' : ratio < 0.7 ? 'BOM' : 'ALTO'}
            </span>
            R$ ${price.toFixed(0)}
          </td>
        `;
        
        row.addEventListener('click', () => {
          const origemInput = document.getElementById('origem');
          const destinoInput = document.getElementById('destino');
          const dataInput = document.getElementById('data-partida');
          
          if (destAirport) {
            destinoInput.value = `${segment.arrival.iataCode} - ${destAirport.city}, ${destAirport.country}`;
            destinoInput.dataset.selectedCode = segment.arrival.iataCode;
          }
          
          dataInput.value = offer.searchDate;
          document.querySelector('.main-search').scrollIntoView({ behavior: 'smooth' });
        });
        
        tbodyEl.appendChild(row);
      });
      
      console.log(`Tabela atualizada com ${filteredOffers.length} ofertas de ${originCode}`);
    }
  } else {
    console.log('Nenhuma oferta encontrada para esta origem, mantendo ofertas originais');
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM carregado, inicializando...');
  
  // Setup autocomplete
  setupAutocomplete('origem', 'origem-autocomplete');
  setupAutocomplete('destino', 'destino-autocomplete');
  
  // Botão de busca
  const searchBtn = document.getElementById('search-btn');
  if (searchBtn) {
    console.log('✅ Botão de busca encontrado, adicionando event listener');
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('🔍 Botão de busca clicado!');
      searchCustomFlights();
    });
  } else {
    console.error('❌ Botão de busca não encontrado!');
  }
  
  // Enter para buscar
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') searchCustomFlights();
    });
  });

  // Data padrão para hoje
  const dateInput = document.getElementById('data-partida');
  if (dateInput) {
    dateInput.valueAsDate = new Date();
  }
  
  // Desabilitado: geolocalização automática causava mudanças indesejadas
  // getUserLocation().then(location => {
  //   if (location) {
  //     console.log('Localização detectada:', location, '(não preenchendo automaticamente)');
  //   }
  // });

  // Monitorar seleção específica no autocomplete para atualizar ofertas
  const origemInput = document.getElementById('origem');
  if (origemInput) {
    // Apenas quando o usuário seleciona do autocomplete, não quando digita
    let lastSelectedCode = null;
    
    const checkOriginChange = () => {
      const currentCode = origemInput.dataset.selectedCode;
      const userSelected = origemInput.dataset.userSelected;
      
      // Só atualizar ofertas se foi seleção manual do usuário E é diferente da anterior
      if (currentCode && userSelected === 'true' && currentCode !== lastSelectedCode) {
        console.log('Atualizando ofertas para origem selecionada pelo usuário:', currentCode);
        updateOffersBasedOnOrigin(currentCode);
        lastSelectedCode = currentCode;
      }
    };
    
    // Verificar mudanças periodicamente apenas se há código selecionado
    setInterval(checkOriginChange, 500);
  }

  // Carregar ofertas estáticas imediatamente
  loadStaticOffers();
  
  // Não carregar ofertas dinâmicas automaticamente para evitar mudanças
  // setTimeout(() => {
  //   loadDynamicOffers();
  // }, 4000);
});