import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, Title, Paragraph, Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const quickActions = [
    {
      id: 1,
      title: t('home.chatWithAI'),
      icon: 'chatbubbles',
      color: '#4CAF50',
      onPress: () => navigation.navigate('Chat'),
    },
    {
      id: 2,
      title: t('home.checkWeather'),
      icon: 'partly-sunny',
      color: '#2196F3',
      onPress: () => navigation.navigate('Weather'),
    },
    {
      id: 3,
      title: t('home.marketPrices'),
      icon: 'trending-up',
      color: '#FF9800',
      onPress: () => navigation.navigate('Market'),
    },
    {
      id: 4,
      title: t('home.subsidyInfo'),
      icon: 'gift',
      color: '#9C27B0',
      onPress: () => navigation.navigate('Subsidy'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#2E7D32', '#4CAF50']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>{t('home.title')}</Text>
        <Text style={styles.headerSubtitle}>{t('home.welcome')}</Text>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>{t('home.quickActions')}</Text>
        
        <View style={styles.actionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.actionCard}
              onPress={action.onPress}
            >
              <Card style={[styles.card, { borderLeftColor: action.color }]}>
                <Card.Content style={styles.cardContent}>
                  <Ionicons
                    name={action.icon}
                    size={32}
                    color={action.color}
                    style={styles.icon}
                  />
                  <Text style={styles.actionTitle}>{action.title}</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <Card style={styles.infoCard}>
          <Card.Content>
            <Title>🌱 Farming Tips</Title>
            <Paragraph>
              Get personalized farming advice, weather updates, and market information 
              to help you make better decisions for your crops.
            </Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.infoCard}>
          <Card.Content>
            <Title>📱 Easy to Use</Title>
            <Paragraph>
              Simple interface designed for farmers of all ages. 
              No technical knowledge required!
            </Paragraph>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionCard: {
    width: '48%',
    marginBottom: 12,
  },
  card: {
    borderLeftWidth: 4,
    elevation: 2,
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  icon: {
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  infoCard: {
    marginBottom: 16,
    elevation: 2,
  },
});

export default HomeScreen;
