module.exports = {
  presets: [[
    "next/babel", {
      "transform-runtime": {
        "useESModules": false
      }
    }
  ]],
  plugins: [
    'inline-react-svg',
    'emotion',
  ]
};
