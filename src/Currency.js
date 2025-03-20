import {React,useState,useEffect }from 'react'

export default function Currency() {
    const[amount,setAmout]=useState(1)
    const[fromCurrency,setFromCurrency]=useState("EUR")
    const[toCurrency,setToCurrency]=useState("USD")
    const[converted,setConverted]=useState("")
    
    useEffect(function(){
async function convert(){
    const response=await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
    const data=await response.json()
    console.log(data)
    setConverted(data.rates[toCurrency])
    
}
convert()
    },[amount,fromCurrency,toCurrency])
  return (
    <div>
      
      <input type="text" value={amount} onChange={(e)=>setAmout(+e.target.value)}/>
<select value={fromCurrency} onChange={e=>setFromCurrency(e.target.value)}  >
    <option value="USD">USD</option>
    <option value="EUR">EUR</option>
    <option value="CAD">GBP</option>
    <option value="INR">JPY</option>
</select>

<select value={toCurrency} onChange={e=>setToCurrency(e.target.value)}  >
    <option value="USD">USD</option>
    <option value="EUR">EUR</option>
    <option value="CAD">GBP</option>
    <option value="INR">JPY</option>
</select>
<p>{converted}</p>
    </div>
  )
}
