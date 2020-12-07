const fs = require('fs');
const dotenv = require('dotenv');

let envConfig = process.env;

if (envConfig === undefined) {
  envConfig = dotenv.parse(fs.readFileSync('.env'));
}
envConfig = dotenv.parse(fs.readFileSync('.env'));

const config = envConfig;

const mapDataJSON = (reqData, jsonData) => {

  let payload = {};

  if (reqData && jsonData) {
    if(reqData.length) {
      let arrayData = [];
      for(let counter = 0; counter < reqData.length; counter++) {
        let internalData = {};
        for (let i in reqData[counter]) {
          for (let j in jsonData) {
            if (i == j) {
              internalData[i] = reqData[counter][i];
            }
          }
        }
        arrayData.push(internalData);
      }
      payload = arrayData;
    } else {
      for (let i in reqData) {
        for (let j in jsonData) {
          if (i == j) {
            payload[i] = reqData[i];
          }
        }
      }
    }
    return payload;
  }
}

const hasProperty = (obj, key, val = '') => {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    if (obj[key] == val || obj[key] != undefined) {
      return true;
    }
    return false;
  } else {
    return false;
  }
}

function isJson(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

module.exports = {
  config,
  mapDataJSON,
  hasProperty,
  isJson
};