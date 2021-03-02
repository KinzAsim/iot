import { Provider } from 'react-redux';
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { colors } from './src/styles';
import { store, persistor } from './src/redux/store';

import 'react-native-gesture-handler';
import Navigation from './src/modules/navigation/RootNavigation';

const App: () => React$Node = () => {
  // eslint-disable-next-line no-undef
  window.navigator.userAgent = 'react-native';

  return (
    <Provider store={store}>
      <PersistGate
        loading={(
          <View style={styles.container}>
            <ActivityIndicator color={colors.red} />
          </View>
        )}
        persistor={persistor}
      >
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
