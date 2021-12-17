import mongoose from "mongoose";
const required = true;
const productSchema = new mongoose.Schema({
    brand: { type: String, required },
    category: { type: String, required },
    name: { type: String, required },
    description: { type: String, required },
    price: { type: Number, required },
    barCode: { type: String, required },
    quantity: { type: Number, required },
    pictutre: { type: String, required },
});
export default mongoose.model("product", productSchema);
