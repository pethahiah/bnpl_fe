export const TableStatus = ({amountPaid, target}: any) => {
  return (
    <span className={`status-chip ${parseInt(amountPaid) >= parseInt(target) ? 'paid' : 'unpaid'}`}>&#8358;{amountPaid || 0} of &#8358;{target}</span>
  )
}

export const TableAction = ({handleMore, label}: { handleMore: () => void, label?: string}) => {
  return (
    <button type='button' className='status link-btn !rounded-full' onClick={() => handleMore && handleMore()}>
      <p className='!w-20 h-8 flex flex-row justify-center items-center !bg-az-light-red text-peth-red !rounded-full'>{label || 'More'}</p>
    </button>
  )
}