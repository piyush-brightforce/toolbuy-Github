import { Pressable, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import styles from './style.css';
import { external } from '../../style/external.css';
import appColors from '../../themes/appColors';
import { useValues } from '../../../App';
import LinearGradient from 'react-native-linear-gradient';
import { windowHeight } from '../../themes/appConstant';
import TextStackView from './textstackview';

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
  onSubmitEditing

}) => {
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
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
  const { isDark, textColorStyle, linearColorStyle, textRTLStyle, viewRTLStyle } =
    useValues();

  const colors = isDark
    ? ['#808184', '#2E3036']
    : [appColors.screenBg, appColors.screenBg];
  return (
    <View style={[external.mt_10]}>
      <View style={[external.mb_5]}> 
        <View>

          {(value?.length > 0 || isFocused) && (
            <Text style={styles.label}>{title}</Text>
          )}
          <TextStackView>
            
            <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 1.0 }}
            colors={colors}
            style={[
              show ? styles.textInputView : styles.withoutShow,
              { shadowColor: appColors.shadowColor },
              { width: fullWidth || '100%' },
              {
                borderColor: isFocused ? appColors.primary : '#ccc',
                borderWidth: 1,
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
                value={value}
                keyboardType={keyboardType}
                style={[
                  styles.textInput,
                  { width: width },
                  { color: textColorStyle },
                  { textAlign: textRTLStyle },
                ]}
                placeholder={placeHolder}
                placeholderTextColor={color || appColors.subtitle}
                onChangeText={text => {
                  onChangeText(text);
                 if (text?.length > 0) {
  setError('');
}
                }}
                onFocus={() => setIsFocused(true)}
                editable={isEditable ?? true}
                onBlur={handleValidation}
                maxLength={maxLength}
                onSubmitEditing={onSubmitEditing}
              />

              {show && <Pressable style={[external.mh_10]}>{value}</Pressable>}
            </LinearGradient>
          </LinearGradient>
          </TextStackView>
        </View>
        {error !== '' && (
          <Text style={{ color: 'red', marginTop: 5 }}>{error}</Text>
        )}
      </View>
    </View>
  );
};

export default TextInputs;
