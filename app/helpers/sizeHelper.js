import { Dimensions, PixelRatio } from "react-native";

const screenSize = Dimensions.get("window");

const screentHeight = screenSize.height;
const screenWidth = screenSize.width;
const Height = 1920;
const Width = 1080;

const calHp = (heightPixel) => {
  let calculatedHeight = (heightPixel / Height) * 100;
  const elemHeight =
    typeof calculatedHeight === "number"
      ? calculatedHeight
      : parseFloat(calculatedHeight);
  let heightDP = PixelRatio.roundToNearestPixel(
    (screentHeight * elemHeight) / 100
  );
  return heightDP;
};

const calWp = (widthPixel) => {
  let calculatedWidth = (widthPixel / Width) * 100;

  const elemWidth =
    typeof calculatedWidth === "number"
      ? calculatedWidth
      : parseFloat(calculatedWidth);
  let widthDP = PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
  return widthDP;
};

const sizeHelper = {
  calHp,
  calWp,
  screentHeight,
  screenWidth,
};

export default sizeHelper;
