const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  //FIND ALL ASSOCIATED PRODUCTS
  try {
    const catData = await Category.findAll({ include: [{ model: Product }] });
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async ({ params }, res) => {
  const category = await Category.findByPk(params.id);
  res.json(category);
});

router.post("/", async (req, res) => {
  // create a new category
  console.log(req.body);
  const newCat = await Category.create(req.body);
  res.json(newCat);
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  const updatedCat = await Category.update(req.body,{
    where: {
      id: req.params.id,
    }
    
  });
  res.json(updatedCat);
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  const deletedCat = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.json(deletedCat);
});

module.exports = router;
