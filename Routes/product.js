import { Router } from "express";
import products from "../models/products.js";
const router = Router();

async function GetProducts(req, res) {
    const find = req.query;
    console.log(find);
    try {
        res.json(await products.find({}));
    } catch (e) {
        res.status(400).json({ errors: e });
    }
}
async function AddProduct(req, res) {
    try {
        await products.create(req.body);
        res.send("Done");
    } catch (e) {
        res.status(400).json({ errors: e });
    }
}
router.route("/").get(GetProducts).post(AddProduct);
export default router;
