/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';

import {
  View,
  TouchableOpacity,
  LogBox,
  Text,
  Appearance,
  Modal,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { plusIcon, searchIcon, profileIcon } from '../../svg/svg-xml-list';
import FloatingButton from '../../components/FloatingButton';
import useAuth from '../../hooks/useAuth';
import Explore from '../Explore';
import GlobalFeed from '../GlobalFeed';
import { useStyles } from './styles';
import CustomTab from '../../components/CustomTab';
import { useTheme } from 'react-native-paper';
import type { MyMD3Theme } from '../../providers/amity-ui-kit-provider';
import AllMyCommunity from '../AllMyCommunity';
import useConfig from '../../hooks/useConfig';
import { ComponentID } from '../../util/enumUIKitID';
import { TabName } from '../../enum/tabNameState';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import uiSlice from '../../redux/slices/uiSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SettingsModal from '../../components/SettingsModal/SettingsModal';
LogBox.ignoreAllLogs(true);
export default function Home() {
  const styles = useStyles();
  const { client } = useAuth();
  const theme = useTheme() as MyMD3Theme;
  const dispatch = useDispatch();
  const { openPostTypeChoiceModal } = uiSlice.actions;
  const { excludes } = useConfig();
  const [activeTab, setActiveTab] = useState<string>(TabName.NewsFeed);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const systemTheme = Appearance.getColorScheme();
  const onClickSearch = () => {
    navigation.navigate('CommunitySearch');
  };
  const onClickProfile = () => {
    setShowSettingsModal(true); // Show SettingsModal
  };

  const onProfileModalChoose = (type: string) => {
    switch (type) {
      case 'profile':
        navigation.navigate('UserProfile', {
          userId: (client as Amity.Client).userId as string,
        });
        break;
      case 'settings':
        navigation.navigate('SettingsPage');
        break;
      default:
        break;
    }
  };
  const onClickAddCommunity = () => {
    navigation.navigate('CreateCommunity');
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        activeTab === TabName.MyCommunities ? (
          <TouchableOpacity
            onPress={onClickAddCommunity}
            style={styles.btnWrap}
          >
            <SvgXml xml={plusIcon(theme.colors.base)} width="25" height="25" />
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity onPress={onClickSearch} style={styles.btnWrap}>
              <View
                style={[
                  styles.circularButton,
                  {
                    backgroundColor:
                      systemTheme === 'dark' ? '#3d3e3d' : '#e3e5ea',
                  },
                ]}
              >
                <SvgXml
                  xml={searchIcon(theme.colors.base)}
                  width="25"
                  height="25"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClickProfile} style={styles.btnWrap}>
              <View
                style={[
                  styles.circularButton,
                  {
                    backgroundColor:
                      systemTheme === 'dark' ? '#3d3e3d' : '#e3e5ea',
                  },
                ]}
              >
                <SvgXml
                  xml={profileIcon(theme.colors.base)}
                  width="19"
                  height="19"
                />
              </View>
            </TouchableOpacity>
          </>
        ),
      headerTitle: null,
      headerLeft: () => (
        // To make header left and bold
        <View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: systemTheme === 'dark' ? 'white' : 'black',
            }}
          >
            Brokie
          </Text>
        </View>
      ),
    });
  }, []);

  const openModal = () => {
    dispatch(
      openPostTypeChoiceModal({
        userId: (client as Amity.Client).userId as string,
      })
    );
  };

  return (
    <View>
      <CustomTab
        tabName={
          excludes.includes(ComponentID.StoryTab)
            ? [TabName.NewsFeed, TabName.Explore]
            : [TabName.NewsFeed, TabName.Explore, TabName.MyCommunities]
        }
        onTabChange={setActiveTab}
      />
      {activeTab === TabName.NewsFeed ? (
        <View>
          <GlobalFeed />
          <FloatingButton onPress={openModal} />
        </View>
      ) : activeTab === TabName.Explore ? (
        <View>
          <Explore />
        </View>
      ) : (
        <View>
          <AllMyCommunity />
        </View>
      )}
      <Modal
        animationType="none"
        transparent={true}
        visible={showSettingsModal}
        onRequestClose={() => setShowSettingsModal(false)} // Close modal when requested
      >
        <SettingsModal
          onClose={() => setShowSettingsModal(false)}
          onChoose={onProfileModalChoose}
        />
      </Modal>
    </View>
  );
}
