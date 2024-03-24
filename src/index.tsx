import AmityUiKitProvider from './providers/amity-ui-kit-provider';
import AmityUiKitSocial from './routes/SocialNavigator';
import React from 'react';

const exploreScreen = () => {
  return <AmityUiKitSocial screen="Explore" />;
};
const profileScreen = () => {
  return <AmityUiKitSocial screen="UserProfile" />;
};

export {
  AmityUiKitProvider,
  AmityUiKitSocial,
  exploreScreen as Explore,
  profileScreen as Profile,
};
