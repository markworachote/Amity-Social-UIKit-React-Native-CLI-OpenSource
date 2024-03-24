// index.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Appearance } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { useStyles } from './styles';
import { SvgXml } from 'react-native-svg';
import { arrowBack, arrowRight } from '../../svg/svg-xml-list';
import type { MyMD3Theme } from '../../providers/amity-ui-kit-provider';
import { useTheme } from 'react-native-paper';

const SettingsPage: React.FC = () => {
  const navigation = useNavigation(); // Initialize navigation hook
  const theme = useTheme() as MyMD3Theme;
  const styles = useStyles();
  const systemTheme = Appearance.getColorScheme();
  const settingsItems = [
    {
      title: 'Account',
      items: ['Block users', 'Log out'],
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

  return (
    <View style={styles.container}>
      {settingsItems.map((section, index) => (
        <View key={index} style={styles.section}>
          {section.title !== '' && (
            <Text style={styles.sectionTitle}>{section.title}</Text>
          )}
          {section.items.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.item,
                { backgroundColor: systemTheme === 'dark' ? '#444' : '#111' },
              ]}
            >
              <Text
                style={[
                  styles.itemText,
                  { backgroundColor: systemTheme === 'dark' ? '#444' : '#111' },
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
