import React, { forwardRef, useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TextInputProps,
    TextStyle,
    ViewStyle,
    NativeSyntheticEvent,
    TextInputSubmitEditingEventData,
    Image,
    ImageProps,
    Pressable,
} from 'react-native';
import { Colors } from '../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { Typography } from '../Theme/Typographys';

type IFloatingTextInputProps = {
    label: string;
    containerStyle?: ViewStyle;
    isRequired?: boolean;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    editable?: boolean;
    secureTextEntry?: boolean;
    maxLength?: number;
    keyboardType?: TextInputProps['keyboardType'];
    multiline?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
    onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
    returnKeyType?: TextInputProps['returnKeyType'];
    inputStyle?: TextStyle;
    labelStyle?: TextStyle;
    error?: string;
    showError?: boolean;
    autoCapitalize?: TextInputProps['autoCapitalize'];
    autoCorrect?: TextInputProps['autoCorrect'];
    onPressRightIcon?: () => void;
    rightIcon?: ImageProps['source'] | null;
    inputMode?: TextInputProps['inputMode'];
    returnKeyLabel?: string;
    autoFocus?: boolean;
    rightIconStyle?: ImageProps['style'];
    rightIconContainerStyle?: ViewStyle;
    blurOnSubmit?: boolean;
    rightComponent?: React.ReactNode;
};

export const FloatingTextInput = forwardRef<TextInput, IFloatingTextInputProps>(
    (
        {
            label,
            isRequired = true,
            value,
            onChangeText,
            editable = true,
            secureTextEntry = false,
            maxLength,
            keyboardType = 'default',
            multiline = false,
            onFocus,
            onBlur,
            onSubmitEditing,
            returnKeyType,
            containerStyle,
            inputStyle,
            labelStyle,
            error,
            showError = false,
            autoCapitalize = 'none',
            autoCorrect = false,
            onPressRightIcon,
            rightIcon = null,
            inputMode,
            returnKeyLabel,
            autoFocus = false,
            rightIconStyle,
            rightIconContainerStyle,
            blurOnSubmit = false,
            rightComponent,
        },
        ref
    ) => {
        const [isFocused, setIsFocused] = useState<boolean>(false);
        const internalRef = useRef<TextInput>(null);

        if (value && value !== "") {
            if (!isFocused) {
                setIsFocused(true);
            }
        }
        const handleFocus = () => {
            setIsFocused(true);
            if (onFocus) {
                onFocus();
            }
        };
        const handleBlur = () => {
            setIsFocused(false);
            if (onBlur) {
                onBlur();
            }
        };

        return (
            <View style={[
                containerStyle,
                {
                    marginTop: ResponsivePixels.size24,
                    // marginBottom: ResponsivePixels.size10,
                }
            ]}>
                <View style={{
                    position: "relative",
                }}>
                    <Text
                        suppressHighlighting={true}
                        onPress={() => internalRef.current?.focus()}
                        style={[
                            {
                                position: "absolute",
                                top: !isFocused ? '38%' : "-10%",
                                // top: ResponsivePixels.size16 + (ResponsivePixels.size14 / 8),
                                left: ResponsivePixels.size12,
                                color: !isFocused ? Colors.SlateGraphiteText : Colors.LuminousGreen,
                                backgroundColor: Colors.DefaultWhite,
                                paddingHorizontal: ResponsivePixels.size4,
                                zIndex: 10,

                                // fontSize: ResponsivePixels.size14,
                                ...Typography.bodyLargePoppinsRegular
                            },
                            labelStyle
                        ]}>
                        {label}{isRequired ? '*' : ''}
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <TextInput
                            ref={(node) => {
                                internalRef.current = node;
                                if (typeof ref === 'function') {
                                    ref(node);
                                } else if (ref) {
                                    ref.current = node;
                                }
                            }}
                            value={value}
                            onChangeText={onChangeText}
                            editable={editable}
                            secureTextEntry={secureTextEntry}
                            maxLength={maxLength}
                            keyboardType={keyboardType}
                            multiline={multiline}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onSubmitEditing={onSubmitEditing}
                            returnKeyType={returnKeyType}
                            style={[
                                {
                                    flex: 1,
                                    padding: ResponsivePixels.size14,
                                    fontSize: ResponsivePixels.size14,
                                    borderWidth: 1,
                                    borderRadius: 8,
                                    borderColor: showError ? Colors.CrimsonPulse : isFocused ? Colors.LuminousGreen : Colors.SilverDust,
                                },
                                inputStyle,
                            ]}
                            autoCapitalize={autoCapitalize}
                            autoCorrect={autoCorrect}
                            selectionColor={Colors.LuminousGreen}
                            cursorColor={Colors.LuminousGreen}
                            inputMode={inputMode}
                            returnKeyLabel={returnKeyLabel}
                            autoFocus={autoFocus}
                            blurOnSubmit={blurOnSubmit}
                        />
                    </View>
                    {rightIcon && rightIcon !== null ? (
                        <View
                            style={[
                                rightIconContainerStyle,
                                {
                                    position: 'absolute',
                                    right: ResponsivePixels.size10,
                                    top: ResponsivePixels.size14,
                                    zIndex: 10,
                                }]}
                            onTouchEnd={() => {
                                isFocused && onPressRightIcon && onPressRightIcon();
                            }}
                        >
                            <Image source={rightIcon} style={[
                                rightIconStyle,
                                {
                                    height: ResponsivePixels.size25,
                                    width: ResponsivePixels.size25,
                                },
                                isFocused && { tintColor: Colors.LuminousGreen }
                            ]} />
                        </View>
                    ) : rightComponent ? (
                        <View
                            style={[
                                rightIconContainerStyle,
                                {
                                    position: 'absolute',
                                    right: ResponsivePixels.size10,
                                    top: ResponsivePixels.size10,
                                    bottom: 0,
                                    justifyContent: 'center',
                                    zIndex: 10,
                                }]}
                            onTouchEnd={() => {
                                isFocused && onPressRightIcon && onPressRightIcon();
                            }}
                        >
                            {rightComponent}
                        </View>
                    ) : null}
                </View>

                {showError && error ? (
                    <Text style={{ color: Colors.CrimsonPulse, marginTop: ResponsivePixels.size4, fontSize: ResponsivePixels.size12 }}>{error}</Text>
                ) : null}
            </View>
        );
    }
);
