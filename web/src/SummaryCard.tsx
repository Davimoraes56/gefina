interface SummaryCardProps {
    label: string;
    value: string;
}

export default function SummaryCard(props: SummaryCardProps) {
    return <div className='Card'>
        <p className='card-label'>{props.label}</p>
        <p className='numeric card-value'>{props.value}</p>
    </div>
}