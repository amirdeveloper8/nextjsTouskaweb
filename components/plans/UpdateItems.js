import { useContext, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import useInput from "../../hooks/use-input";
import classes from "./plans.module.css";

import axios from "axios";
import { ConnectToDB } from "../../lib/connect-to-db";
import Notification from "../ui/notification";
import AuthContext from "../../store/auth-context";
import UpdateItemsForm from "./UpdateItemsForm";

const UpdateItems = (props) => {
  const [value, setValue] = useState(props.value);
  const [count, setCount] = useState(value.length);
  const [categories, setCategories] = useState(props.cats);
  const [typeValue, setTypeValue] = useState();

  const [loading, setLoading] = useState(false);

  const [valueBox, setValueBox] = useState("Open this select menu");

  const changeHandler = (e) => {
    const value = e.target.value;
    const val = value.split(".");
    setValueBox(value);

    setTypeValue(+val[0]);
    console.log("value", typeValue);

    const catName = val[1];
    console.log(catName);

    if (catName !== "all") {
      const filteredCategories = props.value.filter(
        (item) => item.cat.name === catName
      );
      console.log("filteredCategories", filteredCategories);
      setValue(filteredCategories);
    }
    if (catName === "all") {
      setValue(props.value);
    }
  };

  console.log("value", value);

  let cats = [];

  for (let i = 0; i < value.length; i++) {
    cats[i] = (
      <UpdateItemsForm
        cats={categories}
        key={i}
        value={value[i]}
        number={i}
        getData={props.getData}
      />
    );
  }

  return (
    <section className={classes.plans}>
      <div className={classes.filterCat}>
        <Form.Group
          as={Col}
          lg={12}
          controlId="formGridFName"
          className={classes.formGroup}
        >
          <Form.Label>پلن مورد نظر را انتخاب کنید</Form.Label>
          <Form.Select
            value={valueBox}
            onChange={changeHandler}
            aria-label="Default select example"
          >
            <option>انتخاب پلن ...</option>
            <option key="select0" value="0.all">
              همه
            </option>
            {props.cats.map((box) => (
              <option key={box.id} value={`${box.id}.${box.name}`}>
                {box.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>
      <Form>{cats} </Form>
    </section>
  );
};

export default UpdateItems;
