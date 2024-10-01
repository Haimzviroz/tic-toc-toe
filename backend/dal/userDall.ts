import { User } from "../models/user.js"
import jsonfile from "jsonfile"

const FILE = "./user.json";

export const getUsers = async (): Promise<User[]> => await jsonfile.readFile(FILE);

export const saveUsers = async (users: User[]): Promise<void> =>
    await jsonfile.writeFile(FILE, users);