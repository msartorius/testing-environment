'use strict';

let argv = require('yargs').argv;

const DELIMITER = ',';
const TAG_IDENT = '@';
let tagsOpt = typeof argv.tags === 'string' && argv.tags;
let grepString, tags;

if (tagsOpt) {
  tags = tagsOpt.split(DELIMITER);
  grepString = tags.map(tag => `${TAG_IDENT}${tag}`).join('|');
}

module.exports = function getMochaTags() {
  return grepString;
};
