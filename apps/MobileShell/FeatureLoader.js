// apps/MobileShell/FeatureLoader.js
import { NativeModules } from "react-native";

export default async function loadFeatureBundle({ feature, version, url }) {
  
    try {
      const { DynamicBundleLoader } = NativeModules;

      const res = await fetch(`${url}/features/${feature}/${version}/main.bundle`);
      const jsCode = await res.text();

      await DynamicBundleLoader.loadBundle(`${url}/features/${feature}/${version}/main.bundle`)
      const runApp = () => {
        AppRegistry.runApplication(moduleName, {
          rootTag: document.getElementById('react-root'),
        });
      };

      runApp();

      return globalThis.FeatureComponent;
    } catch (err) {
      console.log("check err: ", err);
      console.error('Failed to load feature bundle:', err);
      throw err;
    }
  }
  