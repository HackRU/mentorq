import React from "react"; // Default react imports for the component
import Grid from "@material-ui/core/Grid";

const imageDefs = [
  {
    source: "/assets/background/2023/background.svg",
    top: -100,
    left: 0,
    height: 2000,
    opacity: 1,
  },
  {
    source: "/assets/background/2023/cloud2-01.svg",
    bottom: 600,
    right: 1,
    height: 450,
    opacity: 1,
  },
  {
    source: "/assets/background/2023/cloud1-01.svg",
    bottom: 1,
    right: 1,
    height: 350,
    opacity: 1,
  },
  {
    source: "/assets/background/2023/cloud1-01.svg",
    bottom: 100,
    right: 500,
    height: 300,
    opacity: 1,
  },
  {
    source: "/assets/background/2023/cloud4-01.svg",
    bottom: 200,
    right: 500,
    height: 400,
    opacity: 1,
  }, //END BOTTOM RIGHT SECTION
  {
    source: "/assets/background/2023/cloud1-01.svg",
    top: 100,
    left: 500,
    height: 750,
    opacity: 1,
  },
  {
    source: "/assets/background/2023/cloud1-01.svg",
    top: -100,
    left: -100,
    height: 550,
    opacity: 1,
  },
  // {
  //   source: "/assets/background/2023/cloud4-01.svg",
  //   top: 0,
  //   left: 0,
  //   height: 400,
  //   opacity: 1,
  // },
  {
    source: "/assets/background/2023/cloud4-01.svg",
    top: 500,
    left: -200,
    height: 750,
    opacity: 1,
  }, //END TOP LEFT SECTION
];

export default function Background() {
  const renderImage = (
    icon,
    top,
    left,
    bottom,
    right,
    height,
    transform,
    multiplier,
    opacity
  ) => {
    let style = { position: "fixed" };
    style["top"] = top ? top : null;
    style["left"] = left ? left : null;
    style["bottom"] = bottom ? bottom : null;
    style["right"] = right ? right : null;
    style["transform"] = transform ? transform : null;
    style["opacity"] = opacity ? opacity : 0.25;
    return (
      <div style={style}>
        <img alt={icon.split("/").pop()} src={icon} height={height} />
      </div>
    );
  };
  const images = [];
  for (let i = 0; i < imageDefs.length; i++) {
    {
      let image = imageDefs[i];
      images.push(
        renderImage(
          image.source,
          image.top,
          image.left,
          image.bottom,
          image.right,
          image.height,
          image.transform,
          image.multiplier ? 1 - image.multiplier : 1,
          image.opacity
        )
      );
    }
  }
  return (
    <Grid container justify="space-between">
      {images}
    </Grid>
  );
}
