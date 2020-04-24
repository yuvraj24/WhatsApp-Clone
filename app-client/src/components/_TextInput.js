import {Item, Label, Input, Icon} from 'native-base';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  INPUT_TEXT,
  INPUT_ICON,
  ACCENT,
  BLACK,
  DISABLED_GRAY,
  WHITE,
  RED,
  GREEN,
} from '../utils/colors';

class _TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
  }
  onChangeText = text => {
    const {onChangeText, inputKey} = this.props;
    onChangeText && onChangeText({key: inputKey, value: text});
  };
  onSubmitEditing = () => {
    const {onSubmitEditing} = this.props;
    onSubmitEditing && onSubmitEditing();
  };

  onEndEditing = () => {
    const {onEndEditing} = this.props;
    onEndEditing && onEndEditing();
  };
  onRightIconPressed = () => {
    const {rightIconOnPress} = this.props;
    rightIconOnPress && rightIconOnPress();
  };

  handleInputFocus = () => {
    const {onFocus} = this.props;
    onFocus && onFocus();
    this.setState({isFocused: true});
  };

  handleInputBlur = () => {
    const {onBlur} = this.props;
    onBlur && onBlur();
    this.setState({isFocused: false});
  };

  render() {
    const {isFocused} = this.state;
    const {defaultItem, defaultLabel, defaultInput} = inputDefaultStyle;
    const {
      ref,
      isMandatory,
      placeholder,
      value,
      editable = true,
      leftIcon,
      rightIcon,
      labelStyle,
      containerStyle,
      inputStyle,
      leftIconType,
      rightIconType,
      rightIconColor,
      secureTextEntry,
      keyboardType,
      returnKeyType,
      getRef,
      refKey,
      maxLength,
      inlineImageLeft,
      inlineImagePadding,
      numberOfLines,
      returnKeyLabel,
      multiline,
      selectionColor,
      defaultValue,
      floatingLabel,
      textAlign,
    } = this.props;
    return (
      <Item
        floatingLabel={floatingLabel}
        style={[
          defaultItem,
          containerStyle,
          {
            borderBottomWidth: isFocused ? 2 : 2,
            borderBottomColor: isFocused ? GREEN : GREEN,
          },
        ]}>
        {/* <Icon style={{color: INPUT_ICON}} name={leftIcon} type={leftIconType} /> */}
        {/* <Label style={[defaultLabel, labelStyle]}> {placeholder}</Label> */}
        <Input
          ref={ref}
          selectionColor={selectionColor}
          maxLength={maxLength}
          editable={editable}
          value={value}
          secureTextEntry={secureTextEntry}
          style={[
            defaultInput,
            inputStyle,
            {color: !editable ? DISABLED_GRAY : INPUT_TEXT},
          ]}
          autoCapitalize="words"
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitEditing}
          getRef={ref => getRef && getRef({refKey, ref})} //need to use getRef in case of floatingLabel
          inlineImageLeft={inlineImageLeft}
          inlineImagePadding={inlineImagePadding}
          numberOfLines={numberOfLines}
          returnKeyLabel={returnKeyLabel}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
          multiline={multiline}
          onEndEditing={this.onEndEditing}
          autoFocus={this.props.autoFocus}
          defaultValue={defaultValue}
          textAlign={textAlign}
        />
        {rightIcon && (
          <Icon
            onPress={this.onRightIconPressed}
            style={{color: rightIconColor, fontSize: 16}}
            name={rightIcon}
            type={rightIconType}
          />
        )}

        <Icon
          // onPress={this.onRightIconPressed}
          style={{color: isMandatory ? RED : rightIconColor, fontSize: 8}}
          name={isMandatory ? 'asterisk' : ''}
          type={isMandatory ? 'Foundation' : ''}
        />
      </Item>
    );
  }
}
export default _TextInput;

export const inputDefaultStyle = StyleSheet.create({
  defaultItem: {
    width: '100%',
    alignItems: 'center',
  },
  defaultLabel: {
    color: ACCENT,
    fontSize: 14,
  },
  defaultInput: {
    color: INPUT_TEXT,
    fontSize: 16,
  },
});
