import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import { NetworkImage, WidthSpacer, HeightSpacer } from './NetworkImage';
import ReusableText from './ReusableText';
import reusable from './reusable.style';

const ReusableTitle = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={reusable.rowWithSpacer('flex-start')}>
        <NetworkImage source={item.imageUrl} width={80} height={80} radius={12} />

        <WidthSpacer width={15} />

        <View>
          <ReusableText
            text={item.bookName}
            family={"medium"}
            size={SIZES.medium}
            color={COLORS.black}
          />

          <HeightSpacer height={8} />

          <ReusableText 
            text={item.bookLanguage}
            family={"medium"}
            size={14}
            color={COLORS.gray}                  
          />

          <HeightSpacer height={8} />

          <View style={reusable.rowWithSpacer('flex-start')}>
            <ReusableText 
              text={`$${item.price}`}
              family={"medium"}
              size={14}
              color={COLORS.gray}                  
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReusableTitle;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 12,
  },
});
