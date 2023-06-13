import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import React from "react";
import otter from "../../static/img/otter_icon.png";
import SpaceOtter from "./SpaceOtter";

import styles from "./index.module.css";

const svgList = [
  {
    title: "github",
    Svg: require("../../static/img/github.svg").default,
    color: "black",
    link: "https://github.com/ngmatthew227",
  },
  {
    title: "github",
    Svg: require("../../static/img/github.svg").default,
    color: "black",
    link: "https://github.com/ngmatthew227",
  },
  {
    title: "github",
    Svg: require("../../static/img/github.svg").default,
    color: "black",
    link: "https://github.com/ngmatthew227",
  },
];

interface SvgProps {
  Svg: any;
  color?: string;
  title?: string;
  link?: string;
}

const Svg = ({ Svg, color, title, link }: SvgProps) => {
  return (
    <a href={link} target="_blank">
      <Svg className={styles.svg} style={{ fill: color }} />
    </a>
  );
};

function MyHero() {
  return (
    <div className={styles.myHeroContainer}>
      <div className={styles.leftContainer}>
        <h1 className={styles.leftContainer_h1}>Learn and live.</h1>
        <p className={styles.leftContainer_p}>
          Learn and Play and Chill
          <img src={otter} />
        </p>
        <div className={styles.buttonContainer}>
          <div className={styles.svgContainer}>
            {svgList.map((item, index) => {
              return <Svg {...item} key={item.title} />;
            })}
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <SpaceOtter />
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <Head>
        // Bing
        <meta name="msvalidate.01" content="5723E6B938F5EE2738E056F2A58E1DB7" />
        // Google
        <meta
          name="google-site-verification"
          content="_rHzOjHo4rSNNcdH1Pyby6bwPqXCZWZ4qWPXRGj11kw"
        />
      </Head>
      <main style={{ display: "flex", flex: 1 }}>
        <MyHero />
      </main>
    </Layout>
  );
}
