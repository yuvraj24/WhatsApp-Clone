import React from 'react'
import '../components/css/header.css'
import { UserProps } from '../utils/interfaceHelper'
import { WHITE, GREEN, TINT_GRAY } from '../utils/colors';

const UserHeaderView = ({ userImage, userName, userMessage, imageArrow, onImageClick }: UserProps) => {

    const imgClose = process.env.PUBLIC_URL + 'images/cancel.svg'

    return (
        <div style={Object.assign(styles.parentStyle)}>
            <img
                style={Object.assign(styles.imgLeftArrow)}
                onClick={() => onImageClick && onImageClick('back')} src={imageArrow} alt="Left Arrow"
            />
            <img style={styles.circleDiv} src={userImage} alt="User Image" />
            <div style={Object.assign(styles.verticalStyle)}>
                <p style={Object.assign(styles.titleStyle)}>{userName}</p>
                <p style={Object.assign(styles.descStyle)}>{userMessage}</p>
            </div>
            <img
                style={Object.assign(styles.imgRightArrow)}
                onClick={() => onImageClick && onImageClick('cancel')} src={imgClose} alt="Right Arrow"
            />
        </div>
    )
}

export default UserHeaderView

const styles = ({
    parentStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        marginTop: '3%',
        flexDirection: 'row',
        // backgroundColor: TINT_GRAY,
        display: 'flex',
        justifyContent: 'center',
    },

    titleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: WHITE,
        marginTop: 10,
    },
    descStyle: {
        fontSize: 14,
        fontWeight: '400',
        color: WHITE,
        marginTop: -15,
    },
    circleDiv: {
        width: 45,
        height: 45,
        borderRadius: 45 / 2,
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: '2%',
    },
    verticalStyle: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '1%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    imgLeftArrow: {
        width: 24,
        height: 24, padding: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        left: '2%',
        cursor:'pointer'
    },
    imgRightArrow: {
        width: 24,
        height: 24,
        padding: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        right: '3%',
        cursor:'pointer'
    },
});