import * as React from 'react';
import {
  AmityUiKitProvider,
  AmityUiKitSocial,
} from 'amity-react-native-social-ui-kit';

export default function App() {
  return (
    <AmityUiKitProvider
      apiKey="b3babb0b3a89f4341d31dc1a01091edcd70f8de7b23d697f" // Put your apiKey
      apiRegion="sg" // Put your apiRegion
      userId="top" // Put your UserId
      displayName="top" // Put your displayName
      apiEndpoint="https://api.sg.amity.co" //"https://api.{apiRegion}.amity.co"
    >
      <AmityUiKitSocial />
    </AmityUiKitProvider>
  );
}
