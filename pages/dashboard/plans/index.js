import { useContext, useEffect, useState } from "react";
import { CloseButton } from "react-bootstrap";
import CreateItems from "../../../components/plans/CreateItems";
import CreatePlans from "../../../components/plans/CreatePlans";
import UpdateItems from "../../../components/plans/UpdateItems";
import UpdatePlans from "../../../components/plans/UpdatePlans";
import Button from "../../../components/ui/Button";
import { getData } from "../../../lib/get-data";
import AuthContext from "../../../store/auth-context";

import classes from "../../../styles/dashboard.module.css";

const Plans = (props) => {
  const [createCats, setCreateCats] = useState(false);
  const [updateCats, setUpdateCats] = useState(false);
  const [createItems, setCreateItems] = useState(false);
  const [updateItems, setUpdateItems] = useState(false);
  const [catDetails, setCatDetails] = useState(props.valCats.cats);
  const [itemDetails, setItemDetails] = useState(props.valItem);

  const authCtx = useContext(AuthContext);
  const showPage = authCtx.showPage;

  const getDataHandler = async () => {
    const catUpdate = await getData("get/semiplan/cat");
    const valUpdate = await getData("get/semiplan/item");

    setCatDetails(catUpdate.cats);
    setItemDetails(valUpdate);

    authCtx.showPageHandler();
  };

  console.log("cats", catDetails);
  console.log("item", itemDetails);

  return (
    <section className="dashboard">
      {showPage && (
        <div className={classes.createPlans}>
          {!createCats && (
            <Button
              className={classes.createBtnPlans}
              onClick={() => setCreateCats(true)}
            >
              Create Plans
            </Button>
          )}
          {createCats && <CreatePlans getData={getDataHandler} />}
          {createCats && (
            <CloseButton
              className={classes.closePlans}
              onClick={() => setCreateCats(false)}
            />
          )}
        </div>
      )}
      {showPage && catDetails.length !== 0 && (
        <div className={classes.createPlans}>
          {!updateCats && (
            <Button
              className={classes.updateBtnPlans}
              onClick={() => setUpdateCats(true)}
            >
              Update Plans
            </Button>
          )}
          {updateCats && (
            <UpdatePlans value={catDetails} getData={getDataHandler} />
          )}
          {updateCats && (
            <CloseButton
              className={classes.closePlans}
              onClick={() => setUpdateCats(false)}
            />
          )}
        </div>
      )}

      {showPage && (
        <div className={classes.createPlans}>
          {!createItems && (
            <Button
              className={classes.createBtnPlans}
              onClick={() => setCreateItems(true)}
            >
              Create Items
            </Button>
          )}
          {createItems && (
            <CreateItems cats={catDetails} getData={getDataHandler} />
          )}
          {createItems && (
            <CloseButton
              className={classes.closePlans}
              onClick={() => setCreateItems(false)}
            />
          )}
        </div>
      )}
      {showPage && itemDetails.length !== 0 && (
        <div className={classes.createPlans}>
          {!updateItems && (
            <Button
              className={classes.updateBtnPlans}
              onClick={() => setUpdateItems(true)}
            >
              Update Itmes
            </Button>
          )}
          {updateItems && (
            <UpdateItems
              value={itemDetails}
              cats={catDetails}
              getData={getDataHandler}
            />
          )}
          {updateItems && (
            <CloseButton
              className={classes.closePlans}
              onClick={() => setUpdateItems(false)}
            />
          )}
        </div>
      )}
    </section>
  );
};

export const getServerSideProps = async (context) => {
  const cookie = context.req.headers.cookie;
  //   const cookie2 = cookie.split(",");
  const session = cookie.includes("token");

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const response = await fetch(
    `https://api.tooskaweb.com/api/get/semiplan/cat`
  );
  const valCats = await response.json();

  const res = await fetch(`https://api.tooskaweb.com/api/get/semiplan/item`);
  const valItem = await res.json();

  return {
    props: {
      valCats,
      valItem,
    },
  };
};

export default Plans;
