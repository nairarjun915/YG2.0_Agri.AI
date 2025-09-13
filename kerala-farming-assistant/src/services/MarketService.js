// Market Service for fetching crop prices
// This is a mock implementation - in a real app, you would integrate with actual market APIs

export class MarketService {
  constructor() {
    this.marketData = [
      {
        crop: 'Rice (Paddy)',
        price: 28.50,
        unit: 'per kg',
        change: 2.5,
        lastUpdated: new Date(),
      },
      {
        crop: 'Coconut',
        price: 12.00,
        unit: 'per piece',
        change: -1.2,
        lastUpdated: new Date(),
      },
      {
        crop: 'Banana',
        price: 35.00,
        unit: 'per dozen',
        change: 5.8,
        lastUpdated: new Date(),
      },
      {
        crop: 'Rubber',
        price: 180.00,
        unit: 'per kg',
        change: 0.0,
        lastUpdated: new Date(),
      },
      {
        crop: 'Pepper',
        price: 450.00,
        unit: 'per kg',
        change: -3.2,
        lastUpdated: new Date(),
      },
      {
        crop: 'Cardamom',
        price: 1200.00,
        unit: 'per kg',
        change: 8.5,
        lastUpdated: new Date(),
      },
      {
        crop: 'Cashew',
        price: 320.00,
        unit: 'per kg',
        change: 1.8,
        lastUpdated: new Date(),
      },
      {
        crop: 'Tapioca',
        price: 18.00,
        unit: 'per kg',
        change: -2.1,
        lastUpdated: new Date(),
      },
      {
        crop: 'Ginger',
        price: 85.00,
        unit: 'per kg',
        change: 4.2,
        lastUpdated: new Date(),
      },
      {
        crop: 'Turmeric',
        price: 95.00,
        unit: 'per kg',
        change: -1.5,
        lastUpdated: new Date(),
      },
    ];
  }

  async getMarketPrices() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real implementation, you would fetch from an actual API
    // For now, we'll return mock data with some randomization
    return this.marketData.map(item => ({
      ...item,
      price: item.price + (Math.random() - 0.5) * 2, // Add some price variation
      change: item.change + (Math.random() - 0.5) * 2, // Add some change variation
      lastUpdated: new Date(),
    }));
  }

  async getCropPrice(cropName) {
    const prices = await this.getMarketPrices();
    return prices.find(item => 
      item.crop.toLowerCase().includes(cropName.toLowerCase())
    );
  }

  async getPriceHistory(cropName, days = 30) {
    // Mock price history data
    const history = [];
    const basePrice = this.marketData.find(item => 
      item.crop.toLowerCase().includes(cropName.toLowerCase())
    )?.price || 50;

    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      history.push({
        date: date.toISOString().split('T')[0],
        price: basePrice + (Math.random() - 0.5) * 10,
      });
    }

    return history;
  }
}
