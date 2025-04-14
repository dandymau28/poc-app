// 📁 File: apps/MobileShell/App.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import FeatureLoader from './FeatureLoader';

export default function App() {
  const [FeatureComponent, setFeatureComponent] = useState(null);

  useEffect(() => {
    console.info("App mounted");

    const loadFeature = async () => {
      try {
        console.log("Loading feature...");

        const LoadedComponent = await FeatureLoader({
          feature: 'home',
          version: '1.0.0',
          url: 'http://10.233.107.209:3000',
        });

        console.log("LoadedComponent", LoadedComponent);
        setFeatureComponent(() => LoadedComponent);
      } catch (err) {
        console.error('Failed to load feature:', err);
      }
    };

    loadFeature();
  }, []);
  console.log("FeatureComponent: ", FeatureComponent);

  if (!FeatureComponent) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading feature...</Text>
      </View>
    );
  }

  return <FeatureComponent />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
