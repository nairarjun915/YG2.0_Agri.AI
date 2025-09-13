import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, Card, Title, Paragraph, Button, ActivityIndicator, DataTable } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { MarketService } from '../services/MarketService';

const MarketScreen = () => {
  const { t } = useTranslation();
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const marketService = new MarketService();

  useEffect(() => {
    fetchMarketData();
  }, []);

  const fetchMarketData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await marketService.getMarketPrices();
      setMarketData(data);
    } catch (error) {
      console.error('Error fetching market data:', error);
      setError('Unable to fetch market data. Please try again later.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMarketData();
  };

  const getPriceChangeColor = (change) => {
    if (change > 0) return '#4CAF50'; // Green for increase
    if (change < 0) return '#F44336'; // Red for decrease
    return '#666'; // Gray for no change
  };

  const getPriceChangeIcon = (change) => {
    if (change > 0) return 'trending-up';
    if (change < 0) return 'trending-down';
    return 'remove';
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
          <Title style={styles.headerTitle}>📈 {t('market.title')}</Title>
          <Paragraph style={styles.headerSubtitle}>
            Current market prices for major crops in Kerala
          </Paragraph>
        </Card.Content>
      </Card>

      {error && (
        <Card style={styles.errorCard}>
          <Card.Content>
            <Text style={styles.errorText}>{error}</Text>
            <Button mode="outlined" onPress={fetchMarketData} style={styles.retryButton}>
              {t('common.retry')}
            </Button>
          </Card.Content>
        </Card>
      )}

      {marketData.length === 0 && !error ? (
        <Card style={styles.emptyCard}>
          <Card.Content style={styles.emptyContent}>
            <Ionicons name="trending-up-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>{t('market.noData')}</Text>
          </Card.Content>
        </Card>
      ) : (
        <Card style={styles.tableCard}>
          <Card.Content>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={styles.cropColumn}>{t('market.crop')}</DataTable.Title>
                <DataTable.Title numeric style={styles.priceColumn}>{t('market.price')}</DataTable.Title>
                <DataTable.Title numeric style={styles.changeColumn}>Change</DataTable.Title>
              </DataTable.Header>

              {marketData.map((item, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.cropColumn}>
                    <View style={styles.cropCell}>
                      <Text style={styles.cropName}>{item.crop}</Text>
                      <Text style={styles.cropUnit}>({item.unit})</Text>
                    </View>
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.priceColumn}>
                    <Text style={styles.priceText}>₹{item.price}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.changeColumn}>
                    <View style={styles.changeCell}>
                      <Ionicons
                        name={getPriceChangeIcon(item.change)}
                        size={16}
                        color={getPriceChangeColor(item.change)}
                      />
                      <Text style={[
                        styles.changeText,
                        { color: getPriceChangeColor(item.change) }
                      ]}>
                        {item.change > 0 ? '+' : ''}{item.change}%
                      </Text>
                    </View>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>
      )}

      <Card style={styles.infoCard}>
        <Card.Content>
          <Title style={styles.infoTitle}>💡 Market Tips</Title>
          <Paragraph style={styles.infoText}>
            • Prices are updated daily from major markets in Kerala{'\n'}
            • Best selling times are usually early morning{'\n'}
            • Consider direct selling to consumers for better margins{'\n'}
            • Monitor price trends before harvesting
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.infoCard}>
        <Card.Content>
          <Title style={styles.infoTitle}>📞 Market Contacts</Title>
          <Paragraph style={styles.infoText}>
            • Kochi Market: +91-484-1234567{'\n'}
            • Thiruvananthapuram: +91-471-1234567{'\n'}
            • Kozhikode: +91-495-1234567{'\n'}
            • Thrissur: +91-487-1234567
          </Paragraph>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={onRefresh}
        style={styles.refreshButton}
        icon="refresh"
      >
        {t('market.refresh')}
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
  emptyCard: {
    margin: 16,
    marginTop: 0,
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  tableCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  cropColumn: {
    flex: 2,
  },
  priceColumn: {
    flex: 1,
  },
  changeColumn: {
    flex: 1,
  },
  cropCell: {
    flex: 1,
  },
  cropName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  cropUnit: {
    fontSize: 12,
    color: '#666',
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  changeCell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  infoCard: {
    margin: 16,
    marginTop: 0,
    backgroundColor: '#F3E5F5',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7B1FA2',
    marginBottom: 8,
  },
  infoText: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
  },
  refreshButton: {
    margin: 16,
    marginTop: 0,
  },
});

export default MarketScreen;
