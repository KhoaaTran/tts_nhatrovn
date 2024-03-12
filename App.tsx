import {SafeAreaView, StatusBar} from 'react-native'
import {COLORS} from './src/constants'
import Navigation from './src/navigation/Navigation_v2'
import {AuthProvider} from './src/services/AuthContext'

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={COLORS.primary}
        barStyle='dark-content'
        translucent={false}
        hidden={false}
        animated={false}
      />

      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </SafeAreaView>
  )
}

export default App
