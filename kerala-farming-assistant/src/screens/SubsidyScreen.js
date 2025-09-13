import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Linking } from 'react-native';
import { Text, Card, Title, Paragraph, Button, ActivityIndicator, Chip } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { SubsidyService } from '../services/SubsidyService';

const SubsidyScreen = () => {
  const { t } = useTranslation();
  const [subsidyData, setSubsidyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const subsidyService = new SubsidyService();

  useEffect(() => {
    fetchSubsidyData();
  }, []);

  const fetchSubsidyData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await subsidyService.getSubsidies();
      setSubsidyData(data);
    } catch (error) {
      console.error('Error fetching subsidy data:', error);
      setError('Unable to fetch subsidy information. Please try again later.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSubsidyData();
  };

  const handleApplyNow = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      'Organic Farming': '#4CAF50',
      'Equipment': '#2196F3',
      'Seeds': '#FF9800',
      'Irrigation': '#9C27B0',
      'Insurance': '#F44336',
      'General': '#607D8B',
    };
    return colorMap[category] || '#607D8B';
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={styles.loadingText}>{t('common.loading')}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Card style={styles.headerCard}>
        <Card.Content>
          <Title style={styles.headerTitle}>🎁 {t('subsidy.title')}</Title>
          <Paragraph style={styles.headerSubtitle}>
            Government schemes and subsidies for farmers in Kerala
          </Paragraph>
        </Card.Content>
      </Card>

      {error && (
        <Card style={styles.errorCard}>
          <Card.Content>
            <Text style={styles.errorText}>{error}</Text>
            <Button mode="outlined" onPress={fetchSubsidyData} style={styles.retryButton}>
              {t('common.retry')}
            </Button>
          </Card.Content>
        </Card>
      )}

      {subsidyData.map((subsidy, index) => (
        <Card key={index} style={styles.subsidyCard}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <Title style={styles.schemeTitle}>{subsidy.scheme}</Title>
              <Chip
                style={[styles.categoryChip, { backgroundColor: getCategoryColor(subsidy.category) }]}
                textStyle={styles.categoryText}
              >
                {subsidy.category}
              </Chip>
            </View>
            
            <Paragraph style={styles.description}>
              {subsidy.description}
            </Paragraph>

            <View style={styles.benefitContainer}>
              <Ionicons name="gift" size={20} color="#4CAF50" />
              <Text style={styles.benefitLabel}>{t('subsidy.benefit')}:</Text>
              <Text style={styles.benefitText}>{subsidy.benefit}</Text>
            </View>

            <View style={styles.eligibilityContainer}>
              <Ionicons name="checkmark-circle" size={20} color="#2196F3" />
              <Text style={styles.eligibilityLabel}>{t('subsidy.eligibility')}:</Text>
              <Text style={styles.eligibilityText}>{subsidy.eligibility}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={() => handleApplyNow(subsidy.applyUrl)}
                style={styles.applyButton}
                icon="open-in-new"
              >
                {t('subsidy.applyNow')}
              </Button>
              <Button
                mode="outlined"
                onPress={() => handleApplyNow(subsidy.moreInfoUrl)}
                style={styles.infoButton}
                icon="information"
              >
                {t('subsidy.moreInfo')}
              </Button>
            </View>
          </Card.Content>
        </Card>
      ))}

      <Card style={styles.contactCard}>
        <Card.Content>
          <Title style={styles.contactTitle}>📞 Contact Information</Title>
          <Paragraph style={styles.contactText}>
            For more information about government schemes:{'\n\n'}
            • Agriculture Department: +91-471-1234567{'\n'}
            • Krishi Vigyan Kendra: +91-484-1234567{'\n'}
            • District Agriculture Office: Contact your local office{'\n'}
            • Online Portal: https://keralaagriculture.gov.in
          </Paragraph>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={onRefresh}
        style={styles.refreshButton}
        icon="refresh"
      >
        Refresh Subsidies
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  headerCard: {
    margin: 16,
    backgroundColor: '#E8F5E8',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  headerSubtitle: {
    color: '#666',
    marginTop: 4,
  },
  errorCard: {
    margin: 16,
    marginTop: 0,
    backgroundColor: '#FFEBEE',
  },
  errorText: {
    color: '#C62828',
    marginBottom: 12,
  },
  retryButton: {
    alignSelf: 'flex-start',
  },
  subsidyCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  schemeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    flex: 1,
  },
  categoryChip: {
    marginLeft: 8,
  },
  categoryText: {
    color: 'white',
    fontSize: 12,
  },
  description: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  benefitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginLeft: 8,
  },
  benefitText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
    marginLeft: 4,
  },
  eligibilityContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  eligibilityLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginLeft: 8,
  },
  eligibilityText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  applyButton: {
    flex: 1,
    marginRight: 8,
  },
  infoButton: {
    flex: 1,
    marginLeft: 8,
  },
  contactCard: {
    margin: 16,
    marginTop: 0,
    backgroundColor: '#E3F2FD',
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
  },
  contactText: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
  },
  refreshButton: {
    margin: 16,
    marginTop: 0,
  },
});

export default SubsidyScreen;
