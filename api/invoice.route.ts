import { Router } from 'express';

import {
  findALLInvoices,
  findInvoiceById
} from './invoice.services.ts';

const router = Router();

router.get('/', async (_request, response) => {




  try {
      const invoices = await findALLInvoices();
      response.status(200).json(invoices);
  } catch (error) {
    console.log(error);

    response.status(500).json({ error: {
      status: 500,
      message: 'Não foi possível carregar as faturas.'
    }});
    
  }
 

});

router.get('/:id', async (request, response) => {
  try {
    const id = Number(request.params.id);

    const invoice = await findInvoiceById(id);

    if (!invoice) {
      response.status(404).json({ error: {
        status: 404,
        message: 'Fatura não encontrada.'
      }});
      return;
    }

    response.status(200).json(invoice);
  } catch (error) {
    console.error(error);

    response.status(500).json({ error: {
      status: 500,
      message: 'Não foi possível carregar as faturas.'
    }});
  }
});

export default router;
