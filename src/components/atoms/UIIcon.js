import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLORS, SIZE } from '../../constants';
const CUSTOM = ({ name = 'home', size = SIZE.size20, color = COLORS.primary, style }) => {
  return <Icon name={name} size={size} color={color} style={style} />;
};


const USER_SM = ({ name, size, color }) => {
  return <Icon name={'user'} size={SIZE.size20} color={color} />;
};

const LOCK_SM = ({ name, size, color }) => {
  return <Icon name={'lock'} size={SIZE.size20} color={color} />;
};

const PWD_HIDE_SM = ({ name, size, color }) => {
  return <Icon name={'eye-slash'} size={SIZE.size20} color={color} />;
};
const PWD_SHOW_SM = ({ name, size, color }) => {
  return <Icon name={'eye'} size={SIZE.size20} color={color} />;
};

const NEWSPAPER_SM = ({ name, size, color }) => {
  return <Icon name={'newspaper'} size={SIZE.size20} color={color} />;
};

const HEADSET_SM = ({ name, size, color }) => {
  return <Icon name={'headset'} size={SIZE.size20} color={color} />;
};

const COMMENT_DOTS_SM = ({ name, size, color, style }) => {
  return <Icon name={'comment-dots'} size={SIZE.size20} color={color} style={style} />;
};
const EXCLAMATION_TRIANGLE_SM = ({ name, size, color, style }) => {
  return (
    <Icon name={'exclamation-triangle'} size={SIZE.size10} color={color} style={style} />
  );
};
const PHONE_ALT_SM = ({ name, size, color, style }) => {
  return <Icon name={'phone-alt'} size={SIZE.size20} color={color} style={style} />;
};

const ARROW_LEFT_SM = ({ name, size, color, style }) => {
  return <Icon name={'arrow-left'} size={SIZE.size20} color={color} style={style} />;
};

const DOWNLOAD_SM = ({ name, size, color, style }) => {
  return <Icon name={'download'} size={SIZE.size20} color={color} style={style} />;
};

const TIMES_SM = ({ name, size = SIZE.size20, color, style }) => {
  return <Icon name={'times'} size={size} color={color} style={style} />;
};

export {
  CUSTOM,
  USER_SM,
  LOCK_SM,
  PWD_HIDE_SM,
  PWD_SHOW_SM,
  NEWSPAPER_SM,
  HEADSET_SM,
  COMMENT_DOTS_SM,
  EXCLAMATION_TRIANGLE_SM,
  PHONE_ALT_SM,
  ARROW_LEFT_SM,
  DOWNLOAD_SM,
  TIMES_SM,
};
