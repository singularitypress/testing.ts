export const deviceCompat = (name: string) => {
  return {
    isIOS: !!name.match(/(iPhone)/g),
    isAndroid: !!name.match(/(Pixel)/g),
    isDesktop: !!name.match(/(chromium|firefox|webkit)/g),
    isChromium: !!name.match(/(Pixel|chromium)/g),
  };
};
