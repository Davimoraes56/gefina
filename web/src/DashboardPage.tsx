import { useState, useEffect } from 'react';

import type { Dashboard } from './dashboardType.ts';

import SummaryCard from './SummaryCard.tsx';
import InvoiceSummaryTable from './InvoiceSummaryTable.tsx';

import { formatCurrency } from './utils.ts';



export default function DashboardPage() {

 const [dasboard, setDashboard ] = useState<null | Dashboard>(null);
 const [error, setError] = useState<string | null>(null)
 const[loading, setloading] = useState(true);

 
useEffect(() => {
  async function getDashboard() {
    try {
      const response = await fetch('/api/dashboard');

     if( !response.ok) {
        setError('Não foi possível carregar faturas.');
        setloading(false);
        return;
    }
      
     const datas = await response.json();
     setDashboard(datas);

    } catch{
      setError('Não foi possível carregar faturas.');

    }
    
    setloading(false)
  }

  

  getDashboard();
    
  },[]);
  if (loading) return <p>Carregando painel inicial...</p>


  if (error  || dasboard === null ) return <p>{error}</p>;

 return <>
 <h1>Painel Inicial</h1>

 <div className='summary-cards'>
    <SummaryCard label='Total recebido:' value={ formatCurrency(dasboard?.totals.paid)} />
    <SummaryCard label='Total pendente:' value={ formatCurrency(dasboard?.totals.pending)} />
    <SummaryCard label='Faturas:' value={String(dasboard.totals.invoiceCount)} />
    <SummaryCard label='Clientes:' value={String(dasboard.totals.customerCount)} />
 </div>

 <div className='summary-tables'>
  <InvoiceSummaryTable
 title='Faturas recentes'
 dateLabel='Emissão'
 invoices={dasboard.recentInvoices}
 date={(invoice) => invoice.issueDate}
 />
 <InvoiceSummaryTable
 title='Faturas atrasadas'
 dateLabel='Vencimento'
 invoices={dasboard.overdueInvoices}
 date={(invoice) => invoice.dueDate}
 />
 </div>

</>

}