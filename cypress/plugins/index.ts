import { promises as fsp, unlink, access, writeFile } from "fs";
import fs = require("fs");
const getStream = require("get-stream");

module.exports = (on, config) => {
  createDownloadsFolder();
  on("task", {
    createLogFileIfNotExist: createLogFileIfNotExist,
    log: log,
    getDownloadedFileName: getLastDownloadFilePath,
    getNoOfDownloadedFiles: getNoOfDownloadedFiles,
    deleteDownloadedFiles: deleteDownloadedFiles,
  });

  return config;
};

async function createLogFileIfNotExist() {
  const path = "cypress/fixtures/logs.json";
  access(path, (error) => {
    if (error) {
      writeFile(path, "{}", () => { });
    }
  });
  return null;
}

function log(message: string) {
  if (typeof message == "string" && message.charAt(0) == "{") {
    console.log("       • ");
    var tabShiftedMessage = "";
    message.split("\n").forEach(function (line) {
      tabShiftedMessage += "         " + line + "\n";
    });
    console.log(tabShiftedMessage);
  } else {
    console.log("       • ".concat(message));
  }
  return null;
}

const downloadsDirPath = "cypress/testdownloads";

async function getLastDownloadFilePath() {
  const files = await fsp.readdir(downloadsDirPath);
  return files[files.length - 1];
}

async function getNoOfDownloadedFiles() {
  const files = await fsp.readdir(downloadsDirPath);
  return files.length;
}

async function deleteDownloadedFiles() {
  const files = await fsp.readdir(downloadsDirPath);
  if (files.length > 0) {
    files.forEach(function (fileName) {
      if (fileName != ".gitkeep") {
        unlink(`cypress/testdownloads/${fileName}`, function (err) {
          if (err) {
            throw err;
          }
        });
      }
    });
  }
  return null;
}

async function createDownloadsFolder() {
  try {
    return await fsp.mkdir("cypress/testdownloads");
  } catch (error) {
    if (error.message.includes("EEXIST")) {
      return;
    }
    throw error;
  }
}
