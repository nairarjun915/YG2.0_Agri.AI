// Subsidy Service for fetching government schemes and subsidies
// This is a mock implementation - in a real app, you would integrate with actual government APIs

export class SubsidyService {
  constructor() {
    this.subsidyData = [
      {
        scheme: 'PM-KISAN',
        category: 'General',
        description: 'Direct income support of ₹6,000 per year to all landholding farmer families.',
        benefit: '₹6,000 per year',
        eligibility: 'All landholding farmer families with cultivable land',
        applyUrl: 'https://pmkisan.gov.in',
        moreInfoUrl: 'https://pmkisan.gov.in/NewSchemeDetails.aspx',
      },
      {
        scheme: 'Soil Health Card Scheme',
        category: 'General',
        description: 'Provides soil health cards to farmers with recommendations for nutrients and fertilizers.',
        benefit: 'Free soil testing and recommendations',
        eligibility: 'All farmers with agricultural land',
        applyUrl: 'https://soilhealth.dac.gov.in',
        moreInfoUrl: 'https://soilhealth.dac.gov.in/AboutScheme.aspx',
      },
      {
        scheme: 'Paramparagat Krishi Vikas Yojana (PKVY)',
        category: 'Organic Farming',
        description: 'Promotes organic farming through cluster approach and PGS certification.',
        benefit: '₹50,000 per hectare for 3 years',
        eligibility: 'Farmers willing to practice organic farming',
        applyUrl: 'https://pgsindia-ncof.gov.in',
        moreInfoUrl: 'https://pgsindia-ncof.gov.in/PKVY.aspx',
      },
      {
        scheme: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
        category: 'Insurance',
        description: 'Crop insurance scheme to provide financial support to farmers in case of crop failure.',
        benefit: 'Up to 90% premium subsidy',
        eligibility: 'All farmers growing notified crops',
        applyUrl: 'https://pmfby.gov.in',
        moreInfoUrl: 'https://pmfby.gov.in/AboutUs.aspx',
      },
      {
        scheme: 'Sub-Mission on Agricultural Mechanization (SMAM)',
        category: 'Equipment',
        description: 'Promotes agricultural mechanization through financial assistance for farm equipment.',
        benefit: '25-50% subsidy on equipment',
        eligibility: 'Individual farmers, groups, and institutions',
        applyUrl: 'https://agrimachinery.nic.in',
        moreInfoUrl: 'https://agrimachinery.nic.in/SMAM.aspx',
      },
      {
        scheme: 'National Mission on Oilseeds and Oil Palm (NMOOP)',
        category: 'Seeds',
        description: 'Promotes oilseed cultivation and oil palm plantation.',
        benefit: 'Subsidy on seeds and planting material',
        eligibility: 'Farmers growing oilseeds and oil palm',
        applyUrl: 'https://nmoop.gov.in',
        moreInfoUrl: 'https://nmoop.gov.in/AboutScheme.aspx',
      },
      {
        scheme: 'Per Drop More Crop (PDMC)',
        category: 'Irrigation',
        description: 'Promotes micro irrigation systems for water use efficiency.',
        benefit: '35-55% subsidy on micro irrigation systems',
        eligibility: 'Farmers with irrigation facilities',
        applyUrl: 'https://pmksy.gov.in',
        moreInfoUrl: 'https://pmksy.gov.in/PDMC.aspx',
      },
      {
        scheme: 'Kerala State Organic Farming Policy',
        category: 'Organic Farming',
        description: 'State-specific scheme to promote organic farming in Kerala.',
        benefit: 'Financial assistance for organic certification',
        eligibility: 'Kerala farmers practicing organic farming',
        applyUrl: 'https://keralaagriculture.gov.in',
        moreInfoUrl: 'https://keralaagriculture.gov.in/organic-farming',
      },
      {
        scheme: 'Kerala Coconut Development Board Schemes',
        category: 'General',
        description: 'Various schemes for coconut cultivation and processing.',
        benefit: 'Subsidy on coconut seedlings and processing units',
        eligibility: 'Coconut farmers in Kerala',
        applyUrl: 'https://coconutboard.gov.in',
        moreInfoUrl: 'https://coconutboard.gov.in/schemes',
      },
      {
        scheme: 'Kerala State Seed Farm Development',
        category: 'Seeds',
        description: 'Development of seed farms and distribution of quality seeds.',
        benefit: 'Subsidized quality seeds',
        eligibility: 'All farmers in Kerala',
        applyUrl: 'https://keralaagriculture.gov.in',
        moreInfoUrl: 'https://keralaagriculture.gov.in/seed-development',
      },
    ];
  }

  async getSubsidies() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real implementation, you would fetch from an actual API
    return this.subsidyData;
  }

  async getSubsidiesByCategory(category) {
    const subsidies = await this.getSubsidies();
    return subsidies.filter(subsidy => subsidy.category === category);
  }

  async searchSubsidies(query) {
    const subsidies = await this.getSubsidies();
    const lowerQuery = query.toLowerCase();
    
    return subsidies.filter(subsidy => 
      subsidy.scheme.toLowerCase().includes(lowerQuery) ||
      subsidy.description.toLowerCase().includes(lowerQuery) ||
      subsidy.category.toLowerCase().includes(lowerQuery)
    );
  }
}
