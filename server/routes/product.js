const router = require("express").Router();
const {
    getAllProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    //    getProductByName,
    //    getProductReviews,
    //    createProductReview,
    //    updateProductReview,
} = require("../controllers/products.controller");

// Маршрут для получения всех продуктов
router.route("/").get(getAllProducts);

// Маршрут для создания нового продукта
router.route("/").post(createProduct);

// Маршрут для получения информации о продукте по ID
router.route("/:id").get(getProduct);

// Маршрут для обновления информации о продукте по ID
router.route("/:id").put(updateProduct);

// Маршрут для удаления продукта по ID
router.route("/:id").delete(deleteProduct);

// Маршрут для получения отзывов о продукте по ID
// router.route("/:id/reviews").get(getProductReviews);

// Маршрут для создания нового отзыва о продукте по ID
// router.route("/:id/reviews").post(createProductReview);

// Маршрут для обновления отзыва о продукте по ID
// router.route("/:id/reviews").put(updateProductReview);

module.exports = router;

