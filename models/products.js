import mongoose from "mongoose";
const required = true;
const productSchema = new mongoose.Schema({
    food_name: { type: String, required },
    type: { type: String, required },
    list_sauce: [{ type: String, required }],
    
    
});
export default mongoose.model("product", productSchema);
