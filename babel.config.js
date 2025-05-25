module.exports = {
  presets: ["babel-preset-expo"], // or 'module:metro-react-native-babel-preset'
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "@app": "./app",
          "@api": "./app/api",
          "@components": "./app/components",
          "@components/atom": "./app/components/atom",
          "@components/molecules": "./app/components/molecules",
          "@components/organisms": "./app/components/organisms",
          "@helpers": "./app/helpers",
          "@hooks": "./app/hooks",
          "@navigation": "./app/navigation",
          "@screens": "./app/screens",
          "@store": "./app/store",
        },
      },
    ],
  ],
};
