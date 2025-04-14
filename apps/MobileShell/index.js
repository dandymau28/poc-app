/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Feature from './Feature'
import Home from './Home'
import {name as appName} from './app.json';

AppRegistry.registerComponent("feature", () => FeatureScreen);
AppRegistry.registerComponent("home", () => Home);
AppRegistry.registerComponent(appName, () => App);
