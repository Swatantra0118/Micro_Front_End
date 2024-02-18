const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "cart",
    publicPath: "auto",scriptType: "text/javascript"
  },
  optimization: {
    runtimeChunk: false
  },   
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
        //library: { type: "module" },

        // For remotes (please adjust)
         name: "cart",
         filename: "remoteCartEntry.js",
         exposes: {
             './MyCartModule': './projects/cart/src/app/my-cart/my-cart.module.ts',
         },        
        
        // For hosts (please adjust)
        // remotes: {
        //     "hostApp": "http://localhost:4200/remoteEntry.js",
        //     "mfeApp": "http://localhost:4300/remoteEntry.js",
        //     "productsApp": "http://localhost:7000/remoteEntry.js",
        //     "productDetail": "http://localhost:4200/remoteEntry.js",

        // },

        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          //"projects/shared/src/lib/shared-cart.service": { singleton: true, strictVersion: true, requiredVersion: 'auto', eager: true },
        
          ...sharedMappings.getDescriptors()
        })
        
    }),
    sharedMappings.getPlugin()
  ],
};
