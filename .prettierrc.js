module.exports = {
  singleQuote: true,
  overrides: [
    {
      files: '*.hbs',
      options: {
        singleQuote: false,
      },
    },
  ],
  trailingComma: 'es5',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  htmlWhitespaceSensitivity: 'strict',
}
