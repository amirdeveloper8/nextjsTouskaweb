import classes from "./plans-front.module.css";

import React, { useRef } from "react";
import Modal from "../../ui/Modal";
import { Table } from "react-bootstrap";
import { AiFillPrinter } from "react-icons/ai";
import { MdOutlineKeyboardReturn } from "react-icons/md";
import Image from "next/image";

import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "./ComponentToPrint";
const PrintValues = (props) => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const value = props.value;

  let basicSum = 0;
  for (let i = 0; i < value.basic.length; i++) {
    basicSum += +value.basic[i].price;
  }

  let offerSum = 0;
  for (let i = 0; i < value.offer.length; i++) {
    offerSum += +value.offer[i].price;
  }

  let specialSum = 0;
  for (let i = 0; i < value.special.length; i++) {
    specialSum += +value.special[i].price;
  }

  const allSum = basicSum + offerSum + specialSum;
  const finalSum = allSum + allSum * 0.09;

  let finalStr = finalSum.toString().split(".");
  if (finalStr[0].length >= 5) {
    finalStr[0] = finalStr[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  if (finalStr[1] && finalStr[1].length >= 5) {
    finalStr[1] = finalStr[1].replace(/(\d{3})/g, "$1 ");
  }

  let allStr = allSum.toString().split(".");
  if (allStr[0].length >= 5) {
    allStr[0] = allStr[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  if (allStr[1] && allStr[1].length >= 5) {
    allStr[1] = allStr[1].replace(/(\d{3})/g, "$1 ");
  }

  return (
    <Modal className={`whiteSec ${classes.modalSec}`}>
      <ComponentToPrint ref={componentRef} />
      <div className={`printValues ${classes.print}`} ref={componentRef}>
        <div className={`logoPrint ${classes.logoPrint}`}>
          <Image
            width={90}
            height={60}
            alt="touska-web"
            src="/images/logo.png"
          />
        </div>
        <h2 className="text-center mb-4">پیش فاکتور</h2>
        <div className={classes.valuesItem}>
          <h3>امکانات پایه</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>قیمت</th>
              </tr>
            </thead>
            <tbody>
              {value.basic.map((item, index) => (
                <tr key={index}>
                  <td>{item.name} </td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className={classes.valuesItem}>
          <h3>امکانات پیشنهادی</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>قیمت</th>
              </tr>
            </thead>
            <tbody>
              {value.offer.map((item, index) => (
                <tr key={index}>
                  <td>{item.name} </td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className={classes.valuesItem}>
          <h3>امکانات تخصصی</h3>
          <Table striped bordered hover className={classes.specialTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>قیمت</th>
              </tr>
            </thead>
            <tbody>
              {value.special.map((item, index) => (
                <tr key={index}>
                  <td>{item.name} </td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className={classes.price}>
          <h5>
            <span>هزینه کلی: </span>
            {allStr} تومان
          </h5>
          <h5 dir="rtl">
            <span>ارزش افزوده: </span>
            9%
          </h5>
          <h5>
            <span>هزینه کلی: </span>
            {finalStr} تومان
          </h5>
        </div>
        <AiFillPrinter
          className={`printBtn ${classes.printBtn}`}
          onClick={handlePrint}
        />
        <MdOutlineKeyboardReturn
          onClick={props.backStep1}
          className={classes.back}
        />
      </div>
    </Modal>
  );
};

export default PrintValues;
