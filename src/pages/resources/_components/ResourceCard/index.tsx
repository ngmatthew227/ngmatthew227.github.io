import Link from "@docusaurus/Link";
import clsx from "clsx";
import React, { memo } from "react";

import { type Resource } from "@site/data/resocurces";
import Tooltip from "../ShowcaseTooltip";
import styles from "./styles.module.css";

const ResourceCard = memo(({ resource }: { resource: Resource }) => (
  <li
    key={resource.name}
    className={clsx(styles.resourceCard, "padding-vert--sm padding-horiz--md")}
  >
    <img
      src={
        typeof resource.logo === "string"
          ? resource.logo
          : (resource.logo as any)?.src?.src
      }
      alt={resource.name}
      className={clsx(styles.resourceCardImage)}
    />
    <div className={styles.resourceCardBody}>
      <div className={clsx(styles.resourceCardHeader)}>
        <h4 className={styles.resourceCardTitle}>
          <Link href={resource.href} className={styles.resourceCardLink}>
            {resource.name}
          </Link>
        </h4>
      </div>
      <Tooltip
        key={resource.name}
        text={resource.desc}
        anchorEl="#__docusaurus"
        id={`resourcetip-${resource.name}`}
      >
        <p className={styles.resourceCardDesc}>{resource.desc}</p>
      </Tooltip>
    </div>
  </li>
));

export default ResourceCard;
