import * as React from 'react';
import {
    TouchableOpacity,
    Alert,
    StatusBar,
    Dimensions,
    FlatList,
    Text,
    View,
    StyleSheet,
    Animated,
} from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

import data from '../../users.json';

const ICON_SIZE = 42;
const ITEM_HEIGHT = ICON_SIZE * 2;
const colors = {
    blue: '#00aeef',  // Updated color
    dark: '#2D2D2D',
    textGray: '#83829A',  // New color for text
};

const { width, height } = Dimensions.get('window');

const Icon = React.memo(({ icon, color }) => {
    return <SimpleLineIcons name={icon} color={color} size={ICON_SIZE} />;
});

const Item = React.memo(({ bookName, price, showText }) => {
    return (
        <View style={styles.itemWrapper}>
            {showText ? (
                <View style={styles.textRow}>
                    <Text style={[styles.itemText, { color: colors.textGray }]}>
                        {bookName}
                    </Text>
                    <Text style={[styles.itemText, { color: colors.textGray }]}>
                        {`$${price.toFixed(2)}`}
                    </Text>
                </View>
            ) : (
                <View />
            )}
        </View>
    );
});

const ConnectButton = React.memo(({ onPress }) => {
    return (
        <View
            style={{
                position: 'absolute',
                top: height / 2 + ITEM_HEIGHT / 30,
                paddingHorizontal: 14,
            }}>
            <View
                style={{
                    height: ITEM_HEIGHT * 3,
                    width: 2,
                    backgroundColor: colors.blue,
                }}
            />
            <TouchableOpacity
                onPress={onPress}
                style={{
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    backgroundColor: colors.blue,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                activeOpacity={0.8}>
                <Text style={{ fontSize: 32, fontWeight: '800', color: colors.dark }}>
                    Done!
                </Text>
            </TouchableOpacity>
        </View>
    );
});

const List = React.forwardRef(({ color, showText, style, onScroll, onItemIndexChange }, ref) => {
    return (
        <Animated.FlatList
            ref={ref}
            data={data.books}
            style={style}
            scrollEnabled={showText}
            scrollEventThrottle={16}
            onScroll={onScroll}
            decelerationRate='fast'
            snapToInterval={ITEM_HEIGHT}
            snapToAlignment='start'
            keyExtractor={item => `${item.bookName}-${item.price}`}
            bounces={false}
            contentContainerStyle={{
                paddingTop: showText ? height / 2 - ITEM_HEIGHT / 2 : 0,
                paddingBottom: showText ? height / 2 - ITEM_HEIGHT / 2 : 0,
                paddingHorizontal: 20,
            }}
            renderItem={({ item }) => {
                return <Item {...item} color={color} showText={showText} />;
            }}
            onMomentumScrollEnd={ev => {
                const newIndex = Math.round(ev.nativeEvent.contentOffset.y / ITEM_HEIGHT);
                if (onItemIndexChange) {
                    onItemIndexChange(newIndex);
                }
            }}
        />
    );
});

export default function AllCategories2() {
    const [index, setIndex] = React.useState(0);

    const onConnectPress = React.useCallback(() => {
        Alert.alert('Connect with:', data.books[index].bookName.toUpperCase());
    }, [index]);

    const blueRef = React.useRef();
    const darkRef = React.useRef();
    const scrollY = React.useRef(new Animated.Value(0)).current;

    const onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
    );

    const onItemIndexChange = React.useCallback(setIndex, []);

    React.useEffect(() => {
        const listenerId = scrollY.addListener(v => {
            if (darkRef?.current) {
                darkRef.current.scrollToOffset({
                    offset: v.value,
                    animated: false,
                });
            }
        });
        return () => {
            scrollY.removeListener(listenerId);
        };
    }, [scrollY]);

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <Item {...data.books[0]} showText={false} />
            <List
                ref={blueRef}
                color={colors.blue}
                showText
                style={[styles.list, { zIndex: 1 }]} // Ensure list is above darkRef
                onScroll={onScroll}
                onItemIndexChange={onItemIndexChange}
            />
            <List
                ref={darkRef}
                color={colors.dark}
                showText
                style={styles.overlay} // Fixed position for background rectangle
            />
            <ConnectButton onPress={onConnectPress} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',  // Removed dark background
    },
    list: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1, // Ensure list is above other elements
    },
    overlay: {
        position: 'absolute',
        backgroundColor: colors.blue,
        width,
        height: ITEM_HEIGHT / 2,
        top: height / 2 - ITEM_HEIGHT / 2,
        opacity: 0.3,
        zIndex: 0, // Ensure the background rectangle is behind the list
    },
    itemWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    textRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    itemText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 8,
    },
});
