import { StyleSheet } from 'react-native';
import { SIZES, COLORS } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    height:40,
  },
  searchIcon: {
    marginHorizontal: 10,
    color: COLORS.gray,
   
  },
  searchWrapper :{
    flex: 1,
    backgroundColor: COLORS.secondary,
    marginRight: SIZES.small,
    borderRadius: SIZES.small
  },
  searchInput :{
    fontFamily: "regular",
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.small,
  },
  searchbtn: {
    width: 50,
    height: "100%",
    borderRadius:SIZES.medium,
    justifyContent:"center",
    alignItems: "center",
    backgroundColor:COLORS.primary
  }
});

export default styles;
