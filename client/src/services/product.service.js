import API from "api/axios.config";

class ProductService {
  getProducts(page) {
    return API.get(`/product/?page=${page}`);
  }
  getProduct(id) {
    return API.get(`/product/${id}`);
  }
  getProductByName(name) {
    return API.get(`/product/${name}`);
  }
}

export default new ProductService();
