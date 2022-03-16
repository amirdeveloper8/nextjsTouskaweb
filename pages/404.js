import classes from "../styles/allpages.module.css";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Link from "next/link";

const NotFound = () => {
  return (
    <Modal className={classes.notFound} dir="rtl">
      <h1 className="text-center">404</h1>
      <h2 className="text-center">صفحه مورد نظر پیدا نشد!</h2>
      <Button className="p-3 m-auto">
        <Link href="/" className={classes.returnIndex}>
          باز گشت به صفحه اصلی
        </Link>
      </Button>
    </Modal>
  );
};

export default NotFound;
