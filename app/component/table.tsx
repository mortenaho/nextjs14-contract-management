type BasicTableParam={
    coltitle:[{name:string}],
    data:[]|null
}
export  function BasicTable({coltitle,data}:BasicTableParam) {
   return <table>
    <thead>
        {coltitle && coltitle.map((item)=>{return <th>{item.name}</th>})}
    </thead>
    <tbody>
        
    {data && data.map((item)=>{return <tr><td>{item}</td></tr>})}  
    </tbody>
   </table>
}