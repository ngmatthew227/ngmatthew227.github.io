import React from "react";
import styles from "./space-otter.module.css";

export default function SpaceOtter(): JSX.Element {
  return (
    <div className="space-otter-warpper">
      <div className="atom">
        <div className="nucleus"></div>
        <div className="electron"></div>
        <div className="electron"></div>
        <div className="electron"></div>
      </div>
    </div>
  );
}
