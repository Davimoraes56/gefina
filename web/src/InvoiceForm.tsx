import { useState } from 'react';

import type { Invoice, InvoiceStatus, InvoiceInput } from './InvoiceTypes.ts';
import type { CustomerOption } from './customerType.ts';

interface InvoiceFormProps {
    invoice: Invoice | null;
    customers: CustomerOption[];
    error: string | null;
    onDelete: () => void;
    onCancel: () => void;
    onSubmit: (values: InvoiceInput) => void;
    busy: boolean;
}

export default function InvoiceForm(props: InvoiceFormProps) {
    const [customerId, setCustomerId] = useState(!props.invoice ? '' : props.invoice.customer.id);
    const [amount, setAmount] = useState(!props.invoice ? '' : (props.invoice.amount / 100).toFixed(2));
    const [status, setStatus] = useState<InvoiceStatus>(!props.invoice ? 'pending' : props.invoice.status);
    const [issueDate, setIssueDate] = useState(!props.invoice ? '' : props.invoice.issueDate);
    const [dueDate, setDueDate] = useState(!props.invoice ? '' : props.invoice.dueDate);

    const handleSubmit = (event: SubmitEvent) => {
        event.preventDefault();

        props.onSubmit({
            customerId: Number(customerId),
            amount: Math.round(Number(amount) * 100),
            status,
            issueDate,
            dueDate
        })
    }

    return <form>
      <h2></h2>

      <div>
        <label htmlFor='customer'>Cliente</label>
        <select id='customer'>
            <option 
            selected 
            disabled
            >
                Selecione um cliente
            </option>
        </select>
      </div>
      <div>
        <label htmlFor='amount'>Valor</label>
        <input 
        type="number"
        step="0.01"
        min="0.01"
        required
        />
      </div>
      <div>
        <label htmlFor="status">Situação</label>
        <select id='status'>
            <option value="panding">Pendente</option>
            <option value="paid">Paga</option>
        </select>
      </div>
      <div>

         <div>
            <label htmlFor="issueDate">Emissão</label>
            <input id='issuedate' type="date" required  />
        </div>

            
        <label htmlFor="issueDate">Vencimento</label>
        <input 
        id="issueDate"
        type="date" 
        required
        />
      </div>
      <div>
        <button type='button'>Excluir</button>
        <button type='button'>Cancelar</button>
        <button type='submit'>Salvar</button>
      </div>
    </form>;
}