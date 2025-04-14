// 📁 File: apps/MobileShell/App.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RNFS from 'react-native-fs';

import FeatureScreen from './Feature.js'
import HomeScreen from './Home.js'

const Stack = createNativeStackNavigator();

export default function App() {
    useEffect(() => {
        const downloadMiniAppBundle = async () => {
        console.log("checking new version")
          const manifestPath = `${RNFS.ExternalDirectoryPath}/manifest.json`;
          const destPath = `${RNFS.ExternalDirectoryPath}/main.bundle.js`; // /Android/data/{package}/files/main.bundle.js
          let version;
          let data;

          const versionUrl = 'http://192.168.1.14:3000/meta.json';

          try {
            const resp = await fetch(versionUrl);
            data = await resp.json();
          } catch (err) {
            console.error('Error fetching version:', err);
            return;
          }

          const manifestExist = await RNFS.exists(manifestPath)

          if (manifestExist) {
            try {
              const manifestContent = await RNFS.readFile(manifestPath);
              const manifestJson = JSON.parse(manifestContent);
              version = manifestJson.version;
            } catch(err) {
              console.error('Error reading manifest:', err);
              return;
            }
          } else {
            const manifestJson = {
                "version": data.version
            }
            const manifestContent = JSON.stringify(manifestJson)
            try {
              const write = await RNFS.writeFile(manifestPath, manifestContent)
            } catch(err) {
              console.error('Error writing manifest:', err);
              return;
            }
          }

           if(data.version == version) {
            console.log("you are up-to-date")
            return;
           }

           console.log(`download new version: ${version} -> ${data.version}`)

          const downloadUrl = 'http://192.168.1.14:3000/features/home/1.0.0/main.bundle';

          console.log("dest Path: ", destPath);

          try {
            const result = await RNFS.downloadFile({
              fromUrl: downloadUrl,
              toFile: destPath,
            }).promise;

            if (result.statusCode === 200) {
              console.log('Download sukses:', destPath);
            } else {
              console.warn('Gagal download:', result.statusCode);
            }
          } catch (err) {
            console.error('Error download:', err);
          }
        };

        downloadMiniAppBundle();
    }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Feature" component={FeatureScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

