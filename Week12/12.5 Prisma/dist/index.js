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
const prisma = new client_1.PrismaClient();
const insertData = (username, password, firstName, lastName) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.user.create({
        data: {
            username,
            password,
            firstName,
            lastName
        }
    });
    // await prisma.user.deleteMany({});
    console.log("Data insertion successful: ", res);
    const display = yield prisma.user.findMany({});
    console.log(display);
});
const createTodo = (title, description, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.todo.create({
        data: {
            title,
            description,
            user_id
        }
    });
    console.log("Todo insertion successfully");
});
const getTodo = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.todo.findMany({
        where: {
            user_id
        }
    });
});
insertData("yourSrijit", "Srijit123", "Srijit", "Bera");
createTodo("Gym", "I have to go for gyme", 1);
