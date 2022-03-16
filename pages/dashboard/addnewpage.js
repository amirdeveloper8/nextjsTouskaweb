import AddNew from "../../components/dashboard/AddNew";

import classes from "../../styles/dashboard.module.css";

const AddNewPage = () => {
  const classSection = `dashboard ${classes.addnewpage}`;
  return (
    <section className={classSection}>
      <AddNew />
    </section>
  );
};

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.headers.cookie;
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

  return {
    props: { session },
  };
}

export default AddNewPage;
