import Image from "next/image";
import React from "react";

const QR = ({ amount }: any) => {
  const MY_BANK = {
    BANK_ID: 970418,
    ACCOUNT_NO: 1351142110,
    TEMPLATE: "compact",
    AMOUNT: amount,
    DESCRIPTION: "CHUYEN TIEN",
    ACCOUNT_NAME: "",
  };
  const QR = `https://img.vietqr.io/image/${MY_BANK.BANK_ID}-${MY_BANK.ACCOUNT_NO}-${MY_BANK.TEMPLATE}.png?amount=${MY_BANK.AMOUNT}&addInfo=${MY_BANK.DESCRIPTION}&accountName=${MY_BANK.ACCOUNT_NAME}`;
  return (
    <div>
      <Image src={QR} alt="" height={150} width={150} />
    </div>
  );
};

export default QR;
