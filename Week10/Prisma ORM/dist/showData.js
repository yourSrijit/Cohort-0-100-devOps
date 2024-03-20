"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
let prisma = new client_1.PrismaClient();
const showData = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let res = yield prisma.user.findMany({
        where: { email }
    });
    console.log(res);
});
const showAll = () => __awaiter(void 0, void 0, void 0, function* () {
    let res = yield prisma.user.findMany();
    console.log(res);
});
showData("berasrijit02@gamil.com");
showAll();
