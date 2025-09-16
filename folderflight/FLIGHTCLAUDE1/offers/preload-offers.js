// Sistema de pré-carregamento de ofertas
class OfferPreloader {
  constructor() {
    this.apiKey = "TDDzhDODyoReuPqCZS9HgvwOO6TcOjEd";
    this.apiSecret = "dnlFEA11jmfsGCUM";
    this.authUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";
    this.flightUrl = "https://test.api.amadeus.com/v2/shopping/flight-offers";
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  // Obter token de acesso
  async getAccessToken() {
    if (this.accessToken && this.tokenExpiry && new Date() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await fetch(this.authUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: this.apiKey,
          client_secret: this.apiSecret
        })
      });
      
      const data = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiry = new Date(Date.now() + (data.expires_in - 60) * 1000);
      return this.accessToken;
    } catch (error) {
      console.error("Erro ao obter token:", error);
      throw error;
    }
  }

  // Buscar voos para uma rota específica
  async searchRoute(origin, destination, date) {
    const token = await this.getAccessToken();
    const url = `${this.flightUrl}?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${date}&adults=1&max=3&currencyCode=BRL`;

    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) return [];
      
      const data = await response.json();
      return (data.data || []).map(flight => ({
        ...flight,
        route: `${origin}-${destination}`,
        searchDate: date,
        cachedAt: new Date().toISOString()
      }));
    } catch (error) {
      console.error(`Erro ao buscar ${origin}-${destination}:`, error);
      return [];
    }
  }

  // Gerar ofertas para os próximos dias
  async generateDailyOffers() {
    console.log('🔄 Gerando ofertas diárias...');
    
    const routes = [
      { from: "GRU", to: "GIG" },
      { from: "GIG", to: "GRU" },
      { from: "GRU", to: "BSB" },
      { from: "BSB", to: "GRU" },
      { from: "GRU", to: "REC" },
      { from: "GRU", to: "SSA" },
      { from: "GIG", to: "SSA" },
      { from: "GRU", to: "FOR" }
    ];

    const allOffers = [];
    const today = new Date();

    // Buscar ofertas para próximos 5 dias
    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      for (const route of routes) {
        try {
          const flights = await this.searchRoute(route.from, route.to, dateStr);
          allOffers.push(...flights);
          
          // Delay entre requests para não sobrecarregar API
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch (error) {
          console.error(`Erro na rota ${route.from}-${route.to}:`, error);
        }
      }
    }

    // Ordenar por preço e pegar as 20 melhores ofertas
    const bestOffers = allOffers
      .filter(offer => offer.price && offer.price.total)
      .sort((a, b) => parseFloat(a.price.total) - parseFloat(b.price.total))
      .slice(0, 20);

    const offersData = {
      generated: new Date().toISOString(),
      expires: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6h
      total: bestOffers.length,
      offers: bestOffers
    };

    console.log(`✅ ${bestOffers.length} ofertas geradas`);
    return offersData;
  }

  // Salvar ofertas no localStorage
  saveToLocalStorage(offers) {
    try {
      localStorage.setItem('flightOffers', JSON.stringify(offers));
      localStorage.setItem('offersExpiry', offers.expires);
      console.log('💾 Ofertas salvas no localStorage');
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
  }

  // Carregar ofertas do localStorage
  loadFromLocalStorage() {
    try {
      const offers = localStorage.getItem('flightOffers');
      const expiry = localStorage.getItem('offersExpiry');
      
      if (offers && expiry && new Date() < new Date(expiry)) {
        console.log('📱 Ofertas carregadas do cache local');
        return JSON.parse(offers);
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao carregar do localStorage:', error);
      return null;
    }
  }

  // Processo principal de carregamento
  async loadOffers() {
    // Tentar carregar do cache primeiro
    const cachedOffers = this.loadFromLocalStorage();
    if (cachedOffers) {
      return cachedOffers;
    }

    // Se não tem cache, gerar novas ofertas
    console.log('🚀 Gerando novas ofertas...');
    const freshOffers = await this.generateDailyOffers();
    this.saveToLocalStorage(freshOffers);
    return freshOffers;
  }
}

// Export para uso no browser
if (typeof window !== 'undefined') {
  window.OfferPreloader = OfferPreloader;
}