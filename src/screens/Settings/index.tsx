import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Appearance,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { useStyles } from './styles';
import { SvgXml } from 'react-native-svg';
import { arrowBack, arrowRight } from '../../svg/svg-xml-list';
import type { MyMD3Theme } from '../../providers/amity-ui-kit-provider';
import { useTheme } from 'react-native-paper';
import { AuthContext } from '../../providers/auth-provider';

const SettingsPage: React.FC = () => {
  const navigation = useNavigation(); // Initialize navigation hook
  const theme = useTheme() as MyMD3Theme;
  const styles = useStyles();
  const systemTheme = Appearance.getColorScheme();
  const { logout } = useContext(AuthContext); // Access logout function from AuthContext
  const settingsItems = [
    {
      title: 'Account',
      items: ['Blocked users', 'Log out'],
    },
    {
      title: 'About',
      items: ['Report a problem', 'Terms and conditions', 'Privacy policy'],
    },
    { title: '', items: ['Delete account'] },
  ];
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgXml xml={arrowBack(theme.colors.base)} width={24} height={20} />
        </TouchableOpacity>
      ),
      title: 'Settings',
    });
  }, [navigation, theme.colors.primary]);

  const openEmailApp = (subject: string, body?: string) => {
    const companyEmail = 'brokieapp@gmail.com';
    let url = `mailto:${companyEmail}?subject=${subject}`;
    if (body) {
      url += `&body=${encodeURIComponent(body)}`;
    }
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url)
          .then(() => {
            console.log('Email app opened successfully');
          })
          .catch((error) => {
            console.error('Failed to open email app:', error);
          });
      } else {
        console.error('Email app is not supported');
      }
    });
  };

  const onPress = (menu: string) => {
    switch (menu) {
      case 'Report a problem':
        openEmailApp('Reporting a problem');
        break;
      case 'Log out':
        logout();
        break;
      case 'Delete account':
        openEmailApp(
          'Request to delete account',
          'Please provide your account email address. Make sure it matches the sender email address.'
        );
        break;
      default:
        break;
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: systemTheme === 'dark' ? '#000' : '#F2F2F7' },
      ]}
    >
      {settingsItems.map((section, index) => (
        <View key={index} style={styles.section}>
          {section.title !== '' && (
            <Text
              style={[
                styles.sectionTitle,
                { color: systemTheme === 'dark' ? '#FFFFFF' : '#000000' }, // Change text color based on system theme
              ]}
            >
              {section.title}
            </Text>
          )}
          {section.items.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                onPress(item);
              }}
              style={[
                styles.item,
                {
                  backgroundColor: systemTheme === 'dark' ? '#1F1F1F' : '#FFF',
                }, // Change background color based on system theme
              ]}
            >
              <Text
                style={[
                  styles.itemText,
                  { color: systemTheme === 'dark' ? '#FFF' : '#000' }, // Change text color based on system theme
                  item === 'Delete account' && styles.deleteAccountText,
                ]}
              >
                {item}
              </Text>
              {item !== 'Delete account' && item !== 'Log out' && (
                <SvgXml
                  xml={arrowRight(theme.colors.base)}
                  width="20"
                  height="16"
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

export default SettingsPage;
