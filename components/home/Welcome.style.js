import { StyleSheet } from 'react-native';
import { SIZES, COLORS } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  welcomeText: (color) => ({
    fontFamily: 'Roboto-Bold',
    fontSize: SIZES.xxLarge - 5,
    marginTop: 0,
    color: color,
    marginHorizontal: 12,
  }),
  smallerWelcomeText: (color) => ({
    fontFamily: 'Roboto-Bold',
    fontSize: SIZES.xLarge,
    marginTop: 20,  // Reduced marginTop to minimize the space
    color: color,
    marginHorizontal: 12,
  }),
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Align items to the center
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    height: 40,
    paddingHorizontal: SIZES.small,
  },
  searchIcon: {
    color: COLORS.gray,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.small,
  },
  searchInput: {
    fontFamily: "regular",
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.small,
  }
});

export default styles;
