import { StyleSheet } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'

const UIPPTextInput = (props) => {
    const { input_style, ...otherProps } = props;
    return (
        <TextInput mode='flat' dense underlineStyle={{ height: 0, marginTop: 5 }}
            style={[styles.textInput, input_style]}
            autoCorrect={false}
            placeholderTextColor={'#888'}
            {...otherProps}
        />
    )
}

export default React.memo(UIPPTextInput)

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderRadius: 10,
        //fontSize: 14,
        paddingHorizontal: 10,
    },
});

// https://stackoverflow.com/questions/55958311/change-text-color-of-textinput-in-react-native-paper
{/* <TextInput
        type="outlined"
        style={{ ...styles.textInput, ...this.props.style }}
        underlineColor={this.theme.colors.primary}
        onChangeText={this.props.onChange}
        label={this.props.label}
        value={this.props.value || "Replace this text"}
        placeholder={this.props.placeholder}
        theme={{ colors: { text: this.props.style.color } }}
      /> */}