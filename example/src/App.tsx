import * as React from 'react';
import {
  AmityUiKitProvider,
  AmityUiKitSocial,
} from 'amity-react-native-social-ui-kit';
import { Appearance } from 'react-native';

export default function App() {
  const systemTheme = Appearance.getColorScheme();
  return (
    <AmityUiKitProvider
      apiKey="b3babb0b3a89f4341d31dc1a01091edcd70f8de7b23d697f"
      apiRegion="sg"
      userId="John"
      displayName="John"
      apiEndpoint="https://api.sg.amity.co"
      darkMode={systemTheme === 'dark'}
    >
      <AmityUiKitSocial />
    </AmityUiKitProvider>
  );
}
