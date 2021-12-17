import { Router } from "express";
import { promises as fs } from "fs";
const router = Router();
const fileName = "./system.json";
function GetStoreInfos(req, res) {
    fs.readFile(fileName, { encoding: "utf-8" })
        .then((data) => JSON.parse(data))
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json({ errors: err }));
}
function SetStoreInfos(req, res) {
    fs.writeFile(fileName, JSON.stringify(req.body))
        .then(() => res.send("Done"))
        .catch((err) => res.status(400).json({ errors: err }));
}
router.route("/").get(GetStoreInfos).post(SetStoreInfos);
export default router;
