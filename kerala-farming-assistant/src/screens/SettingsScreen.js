import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Title, Paragraph, Button, Switch, List, Divider } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const { t, i18n } = useTranslation();
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const languages = [
    { code: 'en', name: t('settings.english'), nativeName: 'English' },
    { code: 'hi', name: t('settings.hindi'), nativeName: 'हिंदी' },
    { code: 'ml', name: t('settings.malayalam'), nativeName: 'മലയാളം' },
  ];

  const changeLanguage = async (languageCode) => {
    try {
      await i18n.changeLanguage(languageCode);
      await AsyncStorage.setItem('selectedLanguage', languageCode);
      setSelectedLanguage(languageCode);
    } catch (error) {
      console.error('Error changing language:', error);
      Alert.alert(t('common.error'), 'Failed to change language');
    }
  };

  const showLanguageDialog = () => {
    Alert.alert(
      t('settings.selectLanguage'),
      '',
      languages.map(lang => ({
        text: lang.nativeName,
        onPress: () => changeLanguage(lang.code),
        style: selectedLanguage === lang.code ? 'default' : 'default',
      })).concat([{ text: t('common.cancel'), style: 'cancel' }])
    );
  };

  const showAboutDialog = () => {
    Alert.alert(
      t('settings.about'),
      `Kerala Farming Assistant\n\n${t('settings.version')}\n\nA comprehensive farming companion app designed specifically for Kerala farmers. Get AI-powered advice, weather updates, market prices, and government subsidy information all in one place.\n\nDeveloped with ❤️ for the farming community.`,
      [{ text: t('common.ok') }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.headerCard}>
        <Card.Content>
          <Title style={styles.headerTitle}>⚙️ {t('settings.title')}</Title>
          <Paragraph style={styles.headerSubtitle}>
            Customize your farming assistant experience
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.settingsCard}>
        <Card.Content>
          <List.Item
            title={t('settings.language')}
            description={`Current: ${languages.find(lang => lang.code === selectedLanguage)?.nativeName}`}
            left={(props) => <List.Icon {...props} icon="translate" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={showLanguageDialog}
          />
          <Divider />
          
          <List.Item
            title={t('settings.notifications')}
            description="Get alerts for weather updates and market prices"
            left={(props) => <List.Icon {...props} icon="bell" />}
            right={() => (
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                color="#2E7D32"
              />
            )}
          />
          <Divider />
          
          <List.Item
            title={t('settings.location')}
            description="Allow location access for weather and local information"
            left={(props) => <List.Icon {...props} icon="map-marker" />}
            right={() => (
              <Switch
                value={locationServices}
                onValueChange={setLocationServices}
                color="#2E7D32"
              />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={styles.infoCard}>
        <Card.Content>
          <Title style={styles.infoTitle}>📱 App Information</Title>
          <List.Item
            title={t('settings.about')}
            description="Learn more about this app"
            left={(props) => <List.Icon {...props} icon="information" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={showAboutDialog}
          />
          <Divider />
          
          <List.Item
            title="Version"
            description={t('settings.version')}
            left={(props) => <List.Icon {...props} icon="tag" />}
          />
        </Card.Content>
      </Card>

      <Card style={styles.featuresCard}>
        <Card.Content>
          <Title style={styles.featuresTitle}>🌟 Features</Title>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Ionicons name="chatbubbles" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>AI-powered farming advice</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="partly-sunny" size={20} color="#2196F3" />
              <Text style={styles.featureText}>Real-time weather updates</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="trending-up" size={20} color="#FF9800" />
              <Text style={styles.featureText}>Market price tracking</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="gift" size={20} color="#9C27B0" />
              <Text style={styles.featureText}>Government subsidy information</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="translate" size={20} color="#607D8B" />
              <Text style={styles.featureText}>Multi-language support</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.contactCard}>
        <Card.Content>
          <Title style={styles.contactTitle}>📞 Support</Title>
          <Paragraph style={styles.contactText}>
            Need help? Contact us:{'\n\n'}
            • Email: support@keralafarming.com{'\n'}
            • Phone: +91-471-1234567{'\n'}
            • Website: www.keralafarming.com
          </Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
  settingsCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  infoCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  featuresCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
  },
  featureList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
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
});

export default SettingsScreen;
