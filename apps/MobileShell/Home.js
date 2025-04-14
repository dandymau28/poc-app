import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, NativeModules } from 'react-native';

export default function HomeScreen({ navigation }) {
  const navigateToHybridFeature = () => {
    console.log('Navigating to Hybrid Feature...');
    console.log(NativeModules.MiniAppLauncher);
    return NativeModules.MiniAppLauncher.openMiniApp()

//    return navigation.navigate("Feature");
  };

    return (
        <View style={styles.container}>
          <Text style={styles.title}>POC App</Text>
          <Button title="Go to Hybrid Feature" onPress={navigateToHybridFeature} />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});