import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLORS, SIZE } from '../../constants';

const ICON = {
    CUSTOM: ({ name = 'home', size = SIZE.size20, color = COLORS.primary, style }) => {
        return (
            <Icon name={name} size={size} color={color} style={style} />
        )
    },
    USER_SM: ({ name, size, color }) => {
        return (
            <Icon name={"user"} size={SIZE.size20} color={color} />
        )
    },
    LOCK_SM: ({ name, size, color }) => {
        return (
            <Icon name={"lock"} size={SIZE.size20} color={color} />
        )
    },
    PWD_HIDE_SM: ({ name, size, color }) => {
        return (
            <Icon name={"eye-slash"} size={SIZE.size20} color={color} />
        )
    },
    PWD_SHOW_SM: ({ name, size, color }) => {
        return (
            <Icon name={"eye"} size={SIZE.size20} color={color} />
        )
    },
    NEWSPAPER_SM: ({ name, size, color }) => {
        return (
            <Icon name={"newspaper"} size={SIZE.size20} color={color} />
        )
    },
    HEADSET_SM: ({ name, size, color }) => {
        return (
            <Icon name={"headset"} size={SIZE.size20} color={color} />
        )
    },
    COMMENT_DOTS_SM: ({ name, size, color, style }) => {
        return (
            <Icon name={"comment-dots"} size={SIZE.size20} color={color} style={style} />
        )
    },
    EXCLAMATION_TRIANGLE_SM: ({ name, size, color, style }) => {
        return (
            <Icon name={"exclamation-triangle"} size={SIZE.size20} color={color} style={style} />
        )
    },
    PHONE_ALT_SM: ({ name, size, color, style }) => {
        return (
            <Icon name={"phone-alt"} size={SIZE.size20} color={color} style={style} />
        )
    },
    ARROW_LEFT_SM: ({ name, size, color, style }) => {
        return (
            <Icon name={"arrow-left"} size={SIZE.size20} color={color} style={style} />
        )
    },
    DOWNLOAD_SM: ({ name, size, color, style }) => {
        return (
            <Icon name={"download"} size={SIZE.size20} color={color} style={style} />
        )
    },
    TIMES_SM: ({ name, size = SIZE.size20, color, style }) => {
        return (
            <Icon name={"times"} size={size} color={color} style={style} />
        )
    }

}
export default ICON