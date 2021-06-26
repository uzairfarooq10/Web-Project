import GenericServices from "./GenericServices";

class ProductsService extends GenericServices{
    constructor(){
        super();
    }
    addProduct = (data) => this.post("products", data);
    deleteProduct = (_id) => this.delete("products/" + _id);
    updateProduct = (_id, data) => this.put("products/"+ _id, data);
    getProduct = (page=1, perPage=3) => this.get("products/?page=" + page + "&perPage=" + perPage);
    getSingleProduct = (id) => this.get("products/"+ id);
}

let productService = new ProductsService();
export default productService;