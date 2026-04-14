import { Pressable, Text, TextInput, View, Animated, TouchableOpacity } from 'react-native';
import React, { useRef,useEffect, useState } from 'react';
import styles from './style.css';
import { external } from '../../style/external.css';
import appColors from '../../themes/appColors';
import { useValues } from '../../../App';
import LinearGradient from 'react-native-linear-gradient';
import { fontSizes, windowHeight } from '../../themes/appConstant';
import TextStackView from './textstackview';
import { Cross } from '../../utils/icon';
import { ErrorIconG } from '../../assets/googleIcons/Erroricon';

const TextInputs = ({
  title,
  placeHolder,
  show,
  value,
  onChangeText,
  color,
  width,
  validation,
  icon,
  keyboardType,
  fullWidth,
  fullWidthTwo,
  paddingHorizontalTwo,
  isEditable,
  maxLength,
  onSubmitEditing,
  rightIcon,
  secureEntryValue,
  errorMessage = false,
  closeIcon = true,
  isrequired = false

}) => {
  const animatedValue = useState(new Animated.Value(value ? 1 : 0))[0];
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
  Animated.timing(animatedValue, {
    toValue: value ? 1 : 0,
    duration: 200,
    useNativeDriver: false,
  }).start();
}, [value]);
  const handleValidation = () => {
    setIsFocused(false);
    if (validation && typeof validation === 'function') {
      const validationResult = validation();
      if (validationResult !== true) {
        setError(validationResult);
      } else {
        setError('');
      }
    }
  };
  const handleFocus = () => {
    setIsFocused(true);

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    handleValidation();

    if (!value) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const INPUT_HEIGHT = windowHeight(40);
  const LABEL_FONT_SIZE = fontSizes.FONT12;

  const labelStyle = {
    position: "absolute",
    left: 10,
    backgroundColor: "#fff",
    paddingHorizontal: windowHeight(5),
    zIndex: 1,

    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        (INPUT_HEIGHT - 16) / 2, // 👈 perfectly centered (default font ~16)
        -6, // 👈 floating position (adjust slightly)
      ],
    }),

    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, LABEL_FONT_SIZE],
    }),

    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["#999", appColors.primary],
    }),
  };
  const inputRef = useRef(null);
  const { isDark, textColorStyle, linearColorStyle, textRTLStyle, viewRTLStyle } =
    useValues();

  const colors = isDark
    ? ['#808184', '#2E3036']
    : [appColors.screenBg, appColors.screenBg];
  return (
    <View style={[external.mt_5]}>
      <View style={[]}>
        <View>

          <Animated.Text pointerEvents="none"
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[labelStyle,{ maxWidth: '90%' }]} onPress={() => inputRef.current?.focus()}>
            {title}
            {isrequired && (
              <Text style={{ color: appColors.red }}>
                {" *"}
              </Text>
            )}
          </Animated.Text>
          <TextStackView>

            <LinearGradient
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1.0, y: 1.0 }}
              colors={colors}
              style={[
                styles.textInputView,
                { shadowColor: appColors.shadowColor },
                { width: fullWidth || '100%' },
                {
                  borderColor: isFocused ? appColors.primary : '#ccc',
                  borderWidth: isFocused ? 2 : 1,
                }
              ]}>
              <LinearGradient
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 0.0, y: 1.0 }}
                colors={linearColorStyle}
                style={[
                  styles.menuItemContent,
                  { shadowColor: appColors.shadowColor },
                  { flexDirection: viewRTLStyle },
                  { width: fullWidthTwo || '100%' },
                  { paddingHorizontal: paddingHorizontalTwo || windowHeight(8) },
                ]}>
                {icon}

                <TextInput
                  ref={inputRef}
                  value={value}
                  keyboardType={keyboardType}
                  style={[
                    styles.textInput,
                    { width: width },
                    { color: textColorStyle },
                    { textAlign: textRTLStyle },
                    external.fx_1
                  ]}
                  // placeholder={placeHolder}
                  placeholderTextColor={color || appColors.subtitle}
                  onChangeText={text => {
                    onChangeText(text);
                    if (text?.length > 0) {
                      setError('');
                    }
                  }}
                  secureTextEntry={secureEntryValue}
                  onFocus={() => {
                    setIsFocused(true);
                    handleFocus();
                  }}
                  editable={isEditable ?? true}
                  onBlur={() => {
                    handleValidation();
                    handleBlur();
                  }}
                  maxLength={maxLength}
                  onSubmitEditing={onSubmitEditing}
                />

                {show && rightIcon}
                {closeIcon && !errorMessage && isFocused &&
                  <TouchableOpacity onPress={() => {
                    onChangeText('');   // ✅ clear input
                    setError('');       // ✅ optional: clear error
                    inputRef.current?.focus(); // ✅ keep focus (nice UX)
                  }}>
                    <Cross />
                  </TouchableOpacity>
                }
                {errorMessage && <TouchableOpacity>
                  <ErrorIconG color={appColors.red} />
                </TouchableOpacity>}
              </LinearGradient>
            </LinearGradient>
          </TextStackView>
        </View>
      </View>
    </View>
  );


};


export default TextInputs;
