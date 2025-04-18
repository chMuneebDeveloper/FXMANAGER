import {
    Circle,
  } from '@shopify/react-native-skia';
const ToolTip = ({x, y}) => {
    return <Circle r={8} cx={x} cy={y} color={'gray'} opacity={0.8} />;
  };

  export default ToolTip;