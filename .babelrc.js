module.exports = {
  presets: [
    ["next/babel", {
      "preset-env": {
        "modules": "commonjs"
      }
    }]
  ],
  plugins: [
    "inline-react-svg",
  ]
};
