import React, { FunctionComponent } from 'react'
import { ArrowViewProps } from '../utils/interfaceHelper'
import {
    View, Image, StyleSheet, Keyboard, TouchableOpacity, TouchableHighlight, Text,
    TouchableNativeFeedback, TouchableWithoutFeedback, Alert
} from 'react-native'
import { BAR_INACTIVE_COLOR, GRAY, GREEN, TINT_GRAY } from '../utils/colors'

const ArrowNavigator: FunctionComponent<ArrowViewProps> = (props) => {
    return (
        <View style={styles.parentArrow}>
            <TouchableOpacity
                onPress={() => {
                    Keyboard.dismiss()
                    props.onArrowClick('left')
                }}
                style={styles.circleDiv} >
                <Text></Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    Keyboard.dismiss()
                    props.onArrowClick('right')
                }}
                style={styles.circleDiv} >
                <Text></Text>
            </TouchableOpacity>
        </View>
    )
}

export default ArrowNavigator

const styles = StyleSheet.create({
    parentArrow: {
        flexDirection: 'row',
        width: '100%',
        height: '50%',
        justifyContent: 'space-between',
        alignSelf: 'center',
        position: 'absolute',
        top: '25%',
        flex: 1,
        // backgroundColor:TINT_GRAY
    },

    imgLeftStyle: {
        width: 15,
        height: 15,
        marginTop: 2,
        marginRight: 3,
    },
    imgRightStyle: {
        width: 15,
        height: 15,
        marginTop: 2,
        marginLeft: 3,
    },
    circleDiv: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
    }

})
