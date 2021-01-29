const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  ProductTag.findAll({
    attributes: ['id', 'product_id', 'tag_id'],
    order: [['DESC']],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(dbProductTagData => res.json(dbProductTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  ProductTag.findOne({
    where: { id: req.params.id },
    attributes: ['id', 'product_id', 'tag_id'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(dbProductTagData => {
      if (!dbProductTagData) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      res.json(dbProductTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_id: req.body.tag_id
  })
  .then(dbProductTagData => res.json(dbProductTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  ProductTag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbProductTagData => {
    if (!dbProductTagData[0]) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    res.json(dbProductTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  ProductTag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbProductTagData => {
    if (!dbProductTagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(dbProductTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
