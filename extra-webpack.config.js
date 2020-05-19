
module.exports = (config) => {
  config.module.rules.forEach(rule => {
    if (rule.test.exec('.css')) {
      rule.exclude = [...(rule.exclude || []), /app-ajs/]
    }
  });

  config.module.rules.push({
    test: /\.html$/,
    exclude: /node_modules/,
    use: ['html-loader'],
  }, {
    test: /app-ajs.*\/.*\.css$/,
    use: ['to-string-loader', 'css-loader']
  });

  return config;
};
