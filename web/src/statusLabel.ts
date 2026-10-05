import type { InvoiceStatus } from './InvoiceTypes.ts';

export default function statusLabel(status: InvoiceStatus) {
    return status === 'paid' ? 'Pago' : 'Pendente';
}