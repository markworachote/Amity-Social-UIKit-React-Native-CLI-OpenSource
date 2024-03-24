import React, { memo, useEffect, useRef } from 'react';
import {
  Animated,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { gearSettingIcon, profileIcon } from '../../svg/svg-xml-list';
import { useStyles } from './style';
import { MyMD3Theme } from 'src/providers/amity-ui-kit-provider';
import { useTheme } from 'react-native-paper';

interface SettingsModalProps {
  onClose: () => void;
  onChoose: (type: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, onChoose }) => {
  const styles = useStyles();
  const theme = useTheme() as MyMD3Theme;

  const modalAnimation = useRef(new Animated.Value(0)).current;
  const overlayAnimation = useRef(new Animated.Value(0)).current;

  const slideIn = () => {
    Animated.parallel([
      Animated.timing(modalAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const slideOut = () => {
    Animated.parallel([
      Animated.timing(modalAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(onClose);
  };

  useEffect(() => {
    slideIn();

    return () => {
      modalAnimation.stopAnimation();
      overlayAnimation.stopAnimation();
    };
  }, []);

  const onChooseType = (type: string) => {
    console.log(`Selected type: ${type}`);
    onChoose(type);
    slideOut();
  };

  const translateY = modalAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });
  const modalStyle = { transform: [{ translateY }], height: 175 };

  const overlayOpacity = overlayAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={true}
      onRequestClose={slideOut}
    >
      <Animated.View
        style={[styles.modalContainer, { opacity: overlayOpacity }]}
      >
        <Pressable onPress={slideOut} style={styles.modalContainer}>
          <Animated.View style={[styles.modalContent, modalStyle]}>
            <TouchableOpacity
              onPress={() => onChooseType('profile')}
              style={styles.modalRow}
            >
              <SvgXml
                xml={profileIcon(theme.colors.base)}
                width="28"
                height="28"
              />
              <Text style={styles.postText}>Your profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onChooseType('settings')}
              style={styles.modalRow}
            >
              <SvgXml
                xml={gearSettingIcon(theme.colors.base)}
                width="28"
                height="28"
              />
              <Text style={styles.postText}>Settings</Text>
            </TouchableOpacity>
          </Animated.View>
        </Pressable>
      </Animated.View>
    </Modal>
  );
};

export default memo(SettingsModal);
