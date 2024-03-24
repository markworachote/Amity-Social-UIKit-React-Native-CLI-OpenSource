import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      paddingVertical: 20,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    headerTitle: {
      color: 'white',
      fontSize: 18,
      marginLeft: 10,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
      paddingLeft: 10,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 15,
      paddingHorizontal: 10,
    },
    deleteAccountText: {
      color: 'red', // Set the color to red
      fontSize: 16,
      // Other relevant styles for the "Delete Account" text
    },
    itemText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '500',
    },
  });

  return styles;
};
