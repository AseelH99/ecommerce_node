import { roles } from "../../middleware/auth.js";

export const endPoint={
    create:[roles.Admin],
    getAll:[roles.Admin],
    update:[roles.Admin],
    spesific:[roles.Admin,roles.User],
    delete:[roles.Admin]
}