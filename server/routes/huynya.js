// Импорт Router из Express.js для создания нового роутера
const router = require("express").Router();

// Маршрут для обработки GET-запросов по пути /bolshaya
router.route("/bolshaya").get(async (req, res) => {
    // Проверка наличия параметров query id и name в запросе
    // Если один из параметров отсутствует, возвращается статус 400 с сообщением об ошибке
    if (!req?.query?.id) { return res.status(400).json({ 'message': 'id is required' }) };
    if (!req?.query?.name) { return res.status(400).json({ 'message': 'name is required' }) };

    // Определение фиксированной строки bio
    const bio = "dhfjhahfkejhjf ajesfj eashjkfh eashkf ashejfh eashfjk easfj heasjfh asjkefh jkeasfjkahesfjkndm,fvn m,dcnv,z nj";
    // Получение значения параметра name из запроса
    const name = req.query.name;

    // Здесь предполагается вызов функции для получения элементов корзины, но строка закомментирована
    // const cart = await cartService.getCart(userId);

    // Отправка JSON-ответа с параметрами name и bio
    res.json({ name: name, bio: bio });
});

// Маршрут для обработки GET-запросов по пути /malenkaua
router.route("/malenkaua").get(async (req, res) => {
    // Проверка наличия параметра query text в запросе
    if (!req?.query?.text) { return res.status(400).json({ 'message': 'text is required' }) }

    // Получение значения параметра textik из запроса и вывод его в консоль
    const textik = req.query.textik;
    console.log(textik);

    // Определение фиксированной строки bio
    const bio = "dhfjhahfkejhjf ajesfj eashjkfh eashkf ashejfh eashfjk easfj heasjfh asjkefh jkeasfjkahesfjkndm,fvn m,dcnv,z nj";

    // Здесь предполагается вызов функции для получения элементов корзины, но строка закомментирована
    // const cart = await cartService.getCart(userId);

    // Отправка JSON-ответа с фиксированным именем "Pushkin" и параметром bio
    res.json({ name: "Pushkin", bio: bio });
});

// Маршрут для обработки GET-запросов по пути /srednaya
router.route("/srednaya").get(async (req, res) => {
    // Проверка наличия параметра query text в запросе
    if (!req?.query?.text) { return res.status(400).json({ 'message': 'text is required' }) }

    // Получение значения параметра textik из запроса и вывод его в консоль
    const textik = req.query.textik;
    console.log(textik);

    // Определение фиксированной строки bio
    const bio = "dhfjhahfkejhjf ajesfj eashjkfh eashkf ashejfh eashfjk easfj heasjfh asjkefh jkeasfjkahesfjkndm,fvn m,dcnv,z nj";

    // Здесь предполагается вызов функции для получения элементов корзины, но строка закомментирована
    // const cart = await cartService.getCart(userId);

    // Отправка JSON-ответа с фиксированным именем "Pushkin" и параметром bio
    res.json({ name: "Pushkin", bio: bio });
});

// Экспорт роутера для использования в других частях приложения
module.exports = router;
