"use strict";
// import mongoose from "mongoose";
// import app from "./app";
// import config from "./app/config";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// async function main() {
//   try {
//     await mongoose.connect(config.database_url as string);
//     app.listen(config.port, () => {
//       console.log(`App is listening on port ${config.port}`);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }
// main();
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
// main function start here
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.database_url);
            console.log("Connected to MongoDB");
            app_1.default.listen(config_1.default.port, () => {
                console.log(`App is listening on port ${config_1.default.port}`);
            });
        }
        catch (err) {
            console.error("Failed to connect to MongoDB", err);
            process.exit(1); // Exit the process with a failure code
        }
    });
}
main();
