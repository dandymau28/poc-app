import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const FeatureScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 Catalog Mini App</Text>
      <Text>This is a modular React Native mini app screen.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {fontSize: 22, fontWeight: 'bold', marginBottom: 10},
});

export default FeatureScreen;
