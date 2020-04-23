import React, { useEffect, useState } from 'react'
import '../components/css/footer.css'
import { ReplyFooterProps } from '../utils/interfaceHelper'
import { Typography } from '@material-ui/core';
import { WHITE } from '../../../utils/webColors';

export const ReplyFooterView = ({ progressIndex, onReplyButtonClick,
    onReplyTextChange, onInputFocus, messageList }: ReplyFooterProps) => {
    const [showReply, setShowReply] = useState(true);
    // console.log(progressIndex && messageList && messageList[progressIndex])
    // alert(progressIndex && progressIndex)
    useEffect(() => {
        if (showReply) {
            // animate()
        }
    }, [showReply, progressIndex])

    return (
        <div style={Object.assign(styles.parentStyle)}>
            {
                messageList && messageList.length > 0 && (
                    <div style={Object.assign(styles.messageStyle)}>
                        <p>
                            {messageList[progressIndex] === '' ? '' : messageList[progressIndex]}
                        </p>
                    </div>
                )
            }

            <div className='innerDiv'>
                <img
                    className="imgStyle"
                    src={process.env.PUBLIC_URL + '/images/smiley.svg'}
                    onClick={() => onReplyButtonClick && onReplyButtonClick('smiley', progressIndex)}
                />
                <textarea
                    placeholder={'Type a reply...'}
                    className='inputStyle'
                    onChange={(event) => onReplyTextChange && onReplyTextChange(event.target.value, progressIndex)}
                    onFocus={() => onInputFocus && onInputFocus(true)}
                    onBlur={() => onInputFocus && onInputFocus(false)}
                />
                <img
                    className="imgStyle"
                    src={process.env.PUBLIC_URL + '/images/send.svg'}
                    onClick={() => onReplyButtonClick && onReplyButtonClick('send', progressIndex)}
                />
            </div>
        </div>
    )
}

const styles = {
    messageStyle: {
        fontSize: 16,
        color: WHITE,
        fontWeight: '500',
        marginBottom: '2%',
        alignSelf: 'center',
        maxWidth: '50%',
    },
    parentStyle: {
        display: 'flex',
        /* top: 0;
        left: 0;
        right: 0;
        margin-top: 1%; */
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
        flexDirection: 'column',
        // backgroundColor: WHITE,
        position: 'relative'
    }
}
