const path = require('path');

module.exports = {
  process(src, filename, config, options) {
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
  },
};

// package.json (for custom transformers and CSS Modules)
// {
//   "jest": {
//     "moduleNameMapper": {
//       "\\.(css|less)$": "identity-obj-proxy"
//     },
//     "transform": {
//       "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/fileTransformer.js"
//     }
//   }
// }