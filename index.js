import express from "express";
import morgan from "morgan";
const app = express();
const puerto = 4000;

let products = [
  {
    id: 1,
    name: "laptop",
    price: 3000,
  },
];

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  const newProduct = { ...req.body, id: products.length + 1 };
  products.push(newProduct);
  res.send(newProduct);
});

app.put("/products/:id", (req, res) => {
    const newData = req.body
  const productFound = products.find(
    (product) => product.id === parseInt(req.params.id)
  );

  if (!productFound)
    return res.status(404).json({
      message: "product no found",
    });

    products = products.map(product => product.id === parseInt(req.params.id) ? {...product, ...newData} : product)
    console.log(products)
    res.json({
        message: "product update"
    })
});

app.delete("/products/:id", (req, res) => {
  const productFound = products.find(
    (product) => product.id === parseInt(req.params.id)
  );

  if (!productFound)
    return res.status(404).json({
      message: "product no found",
    });

  products = products.filter(
    (product) => product.id !== parseInt(req.params.id)
  );
  res.sendStatus(204);
});

app.get("/products/:id", (req, res) => {
  const productFound = products.find(
    (product) => product.id === parseInt(req.params.id)
  );

  if (!productFound)
    return res.json({
      message: "product no found",
    });
  res.json(productFound);
  console.log(productFound);
});

app.listen(puerto);
console.log(`Servidor funcionando en el puerto ${puerto}`);
