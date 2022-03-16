import classes from "./video.module.css";

const VideoSection = (props) => {
  const value = props.sec;
  const data = props.details;

  return (
    <section
      className={
        value.title.split("#")[1] === "style2"
          ? `${classes.video} ${classes.style2}`
          : `${classes.video}`
      }
    >
      <div className={classes.content}>
        <h2>{value.title.split("#")[0]}</h2>
        {value.subtitle && <p className={classes.subtitle}>{value.subtitle}</p>}
      </div>
      <div className={`h_iframe-aparat_embed_frame ${classes.videoSec}`}>
        <iframe src={data.src} allowFullScreen={true}></iframe>
      </div>
    </section>
  );
};

export default VideoSection;
