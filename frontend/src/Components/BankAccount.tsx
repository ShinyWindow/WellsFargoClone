import React, { useEffect, useState } from "react";
import BankCard from "./BankCard";

export default function BankAccount() {
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const onClick = async () => {
    const response = await fetch(`/api/${"balance"}`, { method: "GET" });
    const data = await response.json();
    if (data.error != null) {
      //console.log(data.error);
      return;
    }
    if(data.accounts.length < 1){
        onClick();
        return;
    }
    setBankAccounts(data.accounts);
    let count = 0;
    for(let i = 0; i < data.accounts.length; i++){
        count+=data.accounts[i].balances.available;
    }
    setTotal(count);
    console.log(data);
    //trans();
  };


  const trans = async () => {
    const response = await fetch(`/api/${"transactions"}`, { method: "GET" });
    const data = await response.json();
    if (data.error != null) {
      //console.log(data.error);
      return;
    }
    console.log(data);
  };



  function bankCards(){
    let elements = [];
    for(let i = 0; i < bankAccounts.length; i++){
        elements.push(<BankCard title={bankAccounts[i].name} balance={bankAccounts[i].balances.available} key={"card"+i}/>)
    }
    return elements;
  }

  useEffect(() => {
    onClick();
  }, []);

  return (
    <div className="front-padding color-white">
      <div className="">Total Balance</div>
      <div className="total">{total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          })}</div>
      <div className="accounts-title">
        <div>Accounts</div>
        <div onClick={onClick}>+</div>
        <div onClick={onClick}>+</div>
      </div>
        {bankCards()}
    </div>
  );
}
