import { StyleSheet, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ReusableBtn = ({onPress, btnText, textColor , width , backgroundColor , borderWidth , borderColor}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btnStyle(width , backgroundColor , borderWidth , borderColor)} >
        <Text style={styles.btnText(textColor)}>{btnText}</Text>
    </TouchableOpacity>
  );  
};

export default ReusableBtn

const styles = StyleSheet.create({
    btnText: (textColor) => ({
        fontFamily: "medium",
        fontSize: SIZES.medium,
        color: textColor
    }),
    btnStyle: (width , backgroundColor , borderWidth , borderColor)=> ({
        width: width,
        backgroundColor: backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        height:45,
        borderRadius: SIZES.small,
        borderColor: borderColor,
        boederWidth: borderWidth,
    })
});