import React from "react";

interface CardProps {
  title: string;
  balance: number;
}

export default function BankCard({ title, balance }: CardProps) {
  return (
    <>
    <div className="width-100">
      <div>{title}</div>
      <div className="bank-card">
        <div>Account Balance</div>
        <div className="balance-number">
          {balance.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          })}
        </div>
      </div>
      </div>
    </>
  );
}
