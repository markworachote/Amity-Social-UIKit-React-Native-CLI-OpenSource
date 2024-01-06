import React, {useState} from 'react';

// import {
//   AmityUiKitProvider,
//   AmityUiKitChat,
// } from '@amityco/react-native-chat-ui-kit'
import {
  AmityUiKitProvider,
  AmityUiKitSocial,
} from 'amity-react-native-social-ui-kit'
import LoginPage from './Login';

export interface ILoginForm {
  userId: string;
  apiKey: string;
  apiRegion: string;
}
export default function App() {
  const [form, setForm] = useState<ILoginForm>();

  const submitForm = (value: ILoginForm) => {
    setForm(value);
  };
  return !form ? (
    <LoginPage onSubmit={submitForm} />
  ) : (
    
    <AmityUiKitProvider
      apiKey={form.apiKey}
      apiRegion={form.apiRegion}
      userId={form.userId}
      displayName={form.userId}
      apiEndpoint="https://api.sg.amity.co">
      <AmityUiKitSocial />
    </AmityUiKitProvider>
  );
}
