const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  async index(request, response) {
    // Listar todos os registros
    const { orderBy } = request.query;
    const contacts = await ContactRepository.findAll(orderBy);

    response.json(contacts);
  }

  async show(request, response) {
    // Obter UM registro
    const { id } = request.params;

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(contact);
  }

  async store(request, response) {
    // Criar novo registro
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is requered' });
    }

    const contactExists = await ContactRepository.findByEmail(email);

    if (contactExists) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  async update(request, response) {
    // Editar UM registro
    const { id } = request.params;
    const {
      name,
      email,
      phone,
      category_id,
    } = request.body;

    const contactExists = await ContactRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'User not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is requered' });
    }

    const contactByEmail = await ContactRepository.findByEmail(email);

    if (contactByEmail && contactExists.id !== id) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  async delete(request, response) {
    // Deletar UM registro
    const { id } = request.params;

    await ContactRepository.delete(id);
    response.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
