import { Fragment, useState } from "react";

import ListAccordion from "./getdata/ListAccordion";
import classes from "./simple-textimage.module.css";

import { AiOutlineFullscreen } from "react-icons/ai";
import { AiOutlineFullscreenExit } from "react-icons/ai";

import Button from "../ui/Button";
import Link from "next/link";

import Modal from "../ui/Modal";
import Image from "next/image";

const SimpleTxtImg = (props) => {
  const data = props.details;
  const btn = props.sec.button[0];
  const [fullscreen, setFullscreen] = useState(false);
  const [modalClass, setModalClass] = useState();

  const fullHandler = () => {
    setFullscreen(true);
    setModalClass(`${classes.modalScale}`);
    setTimeout(function () {
      setModalClass(`${classes.modal}`);
    }, 100);
  };

  const exitHandler = () => {
    setTimeout(function () {
      setModalClass(classes.modalScale);
    }, 100);
    setTimeout(function () {
      setFullscreen(false);
    }, 400);
  };

  return (
    <Fragment>
      {data[0].title.split("#")[1] !== "__adds" &&
        data.map((item, index) => (
          <section key={index} className={classes.simple}>
            <div className={classes.content}>
              {item.image_url && <h2>{item.title}</h2>}
              {!item.image_url && (
                <h2 id="simpleTxt" className={classes.txtTitle}>
                  {item.title}
                </h2>
              )}
              <div
                className={
                  item.image_url
                    ? `${classes.detailsImgTxt}`
                    : `${classes.detailsTxt}`
                }
              >
                {item.image_url && (
                  <div className={classes.imageSimple}>
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      width={1920}
                      height={1135}
                    />
                    <AiOutlineFullscreen onClick={fullHandler} />
                  </div>
                )}
                {item.subtitle && (
                  <div className={classes.textSimple}>
                    <ListAccordion items={item.subtitle} />
                  </div>
                )}
              </div>
            </div>
            {btn && (
              <div className="text-center my-3">
                {btn.name && (
                  <Button>
                    <a href={btn.url}>{btn.name}</a>
                  </Button>
                )}
              </div>
            )}
          </section>
        ))}
      {data[0].title.split("#")[1] === "__adds" && (
        <section
          className={
            !btn.url ? classes.adds : `${classes.adds} ${classes.linkAdds}`
          }
        >
          {data.map((item, index) => (
            <Link key={index} href={btn.url ? btn.url : "#"}>
              <Image
                src={item.image_url}
                alt={item.title}
                width={`${data[0].title.split("#")[2].split("*")[0] * 480}`}
                height={`${data[0].title.split("#")[2].split("*")[1] * 480}`}
                className={classes.addsImg}
              />
            </Link>
          ))}
        </section>
      )}
      {fullscreen && (
        <Modal className={modalClass}>
          {data.map((item, index) => (
            <div key={index} className={classes.modalImage}>
              <Image
                src={item.image_url}
                alt={item.title}
                width={1920}
                height={1135}
              />
              <AiOutlineFullscreenExit onClick={exitHandler} />
            </div>
          ))}
        </Modal>
      )}
    </Fragment>
  );
};

export default SimpleTxtImg;
