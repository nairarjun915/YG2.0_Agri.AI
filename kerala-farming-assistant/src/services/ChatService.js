// Simple AI Chat Service for Farming Assistant
// This is a mock implementation - in a real app, you would integrate with OpenAI, Google AI, or similar

export class ChatService {
  constructor() {
    this.farmingKnowledge = {
      // Common farming questions and answers
      'rice': {
        keywords: ['rice', 'paddy', 'അരി', 'चावल'],
        responses: [
          'Rice is a staple crop in Kerala. For best results, plant during the monsoon season (June-July). Use organic fertilizers and ensure proper water management.',
          'Rice cultivation requires 20-25°C temperature and 100-150cm rainfall. Use certified seeds and practice crop rotation.',
        ]
      },
      'weather': {
        keywords: ['weather', 'rain', 'monsoon', 'കാലാവസ്ഥ', 'മഴ', 'मौसम', 'बारिश'],
        responses: [
          'Check the weather tab for current conditions. Kerala has two monsoons - Southwest (June-September) and Northeast (October-November).',
          'Monitor rainfall patterns for optimal planting times. Too much rain can cause waterlogging.',
        ]
      },
      'fertilizer': {
        keywords: ['fertilizer', 'manure', 'organic', 'വളം', 'उर्वरक', 'खाद'],
        responses: [
          'Use organic fertilizers like cow dung, compost, and green manure. Avoid chemical fertilizers for better soil health.',
          'Apply fertilizers based on soil test results. Organic farming improves soil fertility over time.',
        ]
      },
      'pest': {
        keywords: ['pest', 'disease', 'insect', 'കീടം', 'रोग', 'कीट'],
        responses: [
          'Use neem oil, garlic spray, or other organic pest control methods. Regular monitoring helps prevent pest outbreaks.',
          'Practice crop rotation and maintain field hygiene to reduce pest problems.',
        ]
      },
      'market': {
        keywords: ['price', 'market', 'selling', 'വില', 'വിപണി', 'मूल्य', 'बाजार'],
        responses: [
          'Check the market prices tab for current rates. Sell during peak demand periods for better prices.',
          'Consider direct selling to consumers or cooperatives for better margins.',
        ]
      },
      'subsidy': {
        keywords: ['subsidy', 'scheme', 'government', 'സബ്സിഡി', 'सब्सिडी', 'योजना'],
        responses: [
          'Check the subsidy tab for available government schemes. Many programs support organic farming and modern techniques.',
          'Apply for PM-KISAN, soil health cards, and other beneficial schemes.',
        ]
      }
    };
  }

  async sendMessage(message) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const lowerMessage = message.toLowerCase();
    
    // Find matching category
    for (const [category, data] of Object.entries(this.farmingKnowledge)) {
      if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
        const responses = data.responses;
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }

    // Default responses for general questions
    const defaultResponses = [
      'I can help you with farming advice, weather information, market prices, and government schemes. What specific topic would you like to know about?',
      'As your farming assistant, I can provide guidance on crop cultivation, pest management, weather patterns, and more. How can I assist you?',
      'Feel free to ask me about rice cultivation, organic farming, weather updates, market prices, or government subsidies. What would you like to know?',
      'I\'m here to help with all your farming needs. You can ask about crops, weather, pests, fertilizers, market prices, or government schemes.',
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }
}
