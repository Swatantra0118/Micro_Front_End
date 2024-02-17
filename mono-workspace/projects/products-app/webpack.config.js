const {shareAll, withModuleFederationPlugin,} = require("@angular-architects/module-federation/webpack");
module.exports = withModuleFederationPlugin ({
  name : 'products',

  exposes: {
    'Module': './projects/products-app/src/app/views/products/products.module.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
})