// Ofertas estáticas para carregamento imediato
// Atualize estes dados manualmente com ofertas reais periodicamente

const STATIC_OFFERS = {
  generated: "2024-12-19T10:00:00.000Z",
  expires: "2024-12-19T22:00:00.000Z",
  total: 12,
  offers: [
    {
      price: { total: "289.90", currency: "BRL" },
      itineraries: [
        {
          segments: [
            {
              departure: { iataCode: "GRU", at: "2024-12-20T08:30:00" },
              arrival: { iataCode: "GIG", at: "2024-12-20T09:45:00" },
              carrierCode: "G3",
              number: "1234"
            }
          ]
        }
      ],
      searchDate: "2024-12-20"
    },
    {
      price: { total: "319.50", currency: "BRL" },
      itineraries: [
        {
          segments: [
            {
              departure: { iataCode: "GIG", at: "2024-12-20T14:15:00" },
              arrival: { iataCode: "GRU", at: "2024-12-20T15:30:00" },
              carrierCode: "AD",
              number: "2156"
            }
          ]
        }
      ],
      searchDate: "2024-12-20"
    },
    {
      price: { total: "398.00", currency: "BRL" },
      itineraries: [
        {
          segments: [
            {
              departure: { iataCode: "GRU", at: "2024-12-21T07:20:00" },
              arrival: { iataCode: "BSB", at: "2024-12-21T09:10:00" },
              carrierCode: "G3",
              number: "1876"
            }
          ]
        }
      ],
      searchDate: "2024-12-21"
    },
    {
      price: { total: "445.90", currency: "BRL" },
      itineraries: [
        {
          segments: [
            {
              departure: { iataCode: "BSB", at: "2024-12-21T16:40:00" },
              arrival: { iataCode: "GRU", at: "2024-12-21T18:25:00" },
              carrierCode: "LA",
              number: "3254"
            }
          ]
        }
      ],
      searchDate: "2024-12-21"
    },
    {
      price: { total: "489.00", currency: "BRL" },
      itineraries: [
        {
          segments: [
            {
              departure: { iataCode: "GRU", at: "2024-12-22T11:30:00" },
              arrival: { iataCode: "REC", at: "2024-12-22T15:15:00" },
              carrierCode: "G3",
              number: "1598"
            }
          ]
        }
      ],
      searchDate: "2024-12-22"
    },
    {
      price: { total: "512.40", currency: "BRL" },
      itineraries: [
        {
          segments: [
            {
              departure: { iataCode: "GRU", at: "2024-12-23T06:45:00" },
              arrival: { iataCode: "SSA", at: "2024-12-23T09:20:00" },
              carrierCode: "AD",
              number: "4123"
            }
          ]
        }
      ],
      searchDate: "2024-12-23"
    },
    {
      price: { total: "534.50", currency: "BRL" },
      itineraries: [
        {
          segments: [
            {
              departure: { iataCode: "GIG", at: "2024-12-23T12:20:00" },
              arrival: { iataCode: "SSA", at: "2024-12-23T14:35:00" },
              carrierCode: "G3",
              number: "1789"
            }
          ]
        }
      ],
      searchDate: "2024-12-23"
    },
    {
      price: { total: "578.90", currency: "BRL" },
      itineraries: [
        {
          segments: [
            {
              departure: { iataCode: "GRU", at: "2024-12-24T09:15:00" },
              arrival: { iataCode: "FOR", at: "2024-12-24T12:45:00" },
              carrierCode: "LA",
              number: "3987"
            }
          ]
        }
      ],
      searchDate: "2024-12-24"
    },
    {
      price: { total: "612.00", currency: "BRL" },
      itineraries: [
        {
          segments: [
            {
              departure: { iataCode: "CNF", at: "2024-12-25T13:50:00" },
              arrival: { iataCode: "GRU", at: "2024-12-25T15:10:00" },
              carrierCode: "AD",
              number: "2876"
            }
          ]
        }
      ],
      searchDate: "2024-12-25"
    },
    {
      price: { total: "645.30", currency: "BRL" },
      itineraries: [
        {
          segments: [
            {
              departure: { iataCode: "POA", at: "2024-12-26T08:00:00" },
              arrival: { iataCode: "GRU", at: "2024-12-26T10:20:00" },
              carrierCode: "G3",
              number: "1345"
            }
          ]
        }
      ],
      searchDate: "2024-12-26"
    },
    {
      price: { total: "689.90", currency: "BRL" },
      itineraries: [
        {
          segments: [
            {
              departure: { iataCode: "GRU", at: "2024-12-27T15:30:00" },
              arrival: { iataCode: "CWB", at: "2024-12-27T16:45:00" },
              carrierCode: "LA",
              number: "4567"
            }
          ]
        }
      ],
      searchDate: "2024-12-27"
    },
    {
      price: { total: "723.50", currency: "BRL" },
      itineraries: [
        {
          segments: [
            {
              departure: { iataCode: "FLN", at: "2024-12-28T10:40:00" },
              arrival: { iataCode: "GIG", at: "2024-12-28T12:25:00" },
              carrierCode: "AD",
              number: "2398"
            }
          ]
        }
      ],
      searchDate: "2024-12-28"
    }
  ]
};

// Função para obter ofertas estáticas
function getStaticOffers() {
  console.log('📦 Carregando ofertas estáticas...');
  
  // Simular ofertas com datas atualizadas
  const today = new Date();
  const updatedOffers = {
    ...STATIC_OFFERS,
    generated: new Date().toISOString(),
    offers: STATIC_OFFERS.offers.map((offer, index) => {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + (index % 7) + 1);
      
      const updatedOffer = {
        ...offer,
        searchDate: futureDate.toISOString().split('T')[0],
        itineraries: offer.itineraries.map(itinerary => ({
          ...itinerary,
          segments: itinerary.segments.map(segment => ({
            ...segment,
            departure: {
              ...segment.departure,
              at: futureDate.toISOString().split('T')[0] + 'T' + segment.departure.at.split('T')[1]
            },
            arrival: {
              ...segment.arrival,
              at: futureDate.toISOString().split('T')[0] + 'T' + segment.arrival.at.split('T')[1]
            }
          }))
        }))
      };
      
      return updatedOffer;
    })
  };
  
  console.log(`✅ ${updatedOffers.offers.length} ofertas estáticas preparadas`);
  return updatedOffers;
}

// Export para uso no browser
if (typeof window !== 'undefined') {
  window.getStaticOffers = getStaticOffers;
}