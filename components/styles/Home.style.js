import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

const styles = StyleSheet.create({
  textStyle: { 
    fontFamily: 'bold',
    fontSize: 40
  },
  appBarWrapper: {
    marginHorizontal: 22,
    marginTop: SIZES.small
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  location: {
    fontFamily: 'semibold',
    fontSize: SIZES.medium,
    color: COLORS.gray
  },
  cartCount: {
    position: 'absolute',
    bottom: 16,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'blue',
    justifyContent: 'center',
    zIndex: 999,
  },
  cartNumber: {
    fontFamily: 'regular',
    fontWeight: '600',
    fontSize: SIZES.small,
    color: COLORS.lightWhite
  },
  dropdown: {
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    borderWidth: 1,
  },
  
  dropdownContainer: {
    backgroundColor: '#ffffff',
    borderColor: '#000000',
  },
  dropdownItem: {
    justifyContent: 'flex-start',
  },
  dropdownText: {
    color: '#000000',
  },
  dropdownContainerStyle: {
    width: '100%',
    height: 200,
  },
});

export default styles;
