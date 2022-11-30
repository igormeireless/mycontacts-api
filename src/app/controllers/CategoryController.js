const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;

    const categories = await CategoryRepository.findAll(orderBy);

    response.json(categories);
  }

  async show(request, response) {
    const { id } = request.params;

    const category = await CategoryRepository.findById(id);

    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }

    response.json(category);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is requered' });
    }

    const category = await CategoryRepository.create({ name });

    response.json(category);
  }
}

module.exports = new CategoryController();
