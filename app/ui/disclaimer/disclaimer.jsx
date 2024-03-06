"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./disclaimer.module.css";

const Disclaimer = () => {
  const router = useRouter();

  useEffect(() => {
    const lastAcknowledged = localStorage.getItem("disclaimerAcknowledged");
    if (!lastAcknowledged) {
      return;
    } else {
      const lastAcknowledgedTime = new Date(lastAcknowledged);
      const currentTime = new Date();
      const timeDiff = currentTime - lastAcknowledgedTime;
      const hoursDiff = timeDiff / (1000 * 60 * 60); // Convert milliseconds to hours
      if (hoursDiff < 24) {
        router.push("/news");
      }
    }
  }, []);

  const acknowledgeDisclaimer = () => {
    localStorage.setItem("disclaimerAcknowledged", new Date());
  };

  const handleAcknowlegde = () => {
    acknowledgeDisclaimer();
    router.push("/news");
  };

  return (
    <div className={styles.form}>
      <Image src={"/logo.png"} alt="logo" width="150" height="30" />
      <div className={styles.header}>
        <div className={styles.title}>Disclaimer</div>
      </div>
      <div className={styles.desc}>
        <b>Please note:</b>
        <br />
        Information on the site: The content on this site is provided for
        informational purposes only. We try to ensure that the information is
        up-to-date and accurate, but we do not guarantee its complete
        reliability.
        <br />
        <br />
        Disclaimer: The owners and creators of the site are not responsible for
        any direct or indirect losses resulting from the use of the information
        presented on the site.
        <br />
        <br />
        External links: The site may contain links to external resources. We are
        not responsible for the content or privacy policies of these sites.
        <br />
        <br />
        Copyright: All site content is protected by copyright. Any copying,
        distribution or other use of materials without the written permission of
        the copyright owner is prohibited.
        <br />
        <br />
        Policy Changes: Site policies may change at any time without notice.
        Visitors are advised to check regularly for updates.
        <br />
        Use of the site constitutes your acceptance of these terms and
        conditions.
      </div>
      <button onClick={handleAcknowlegde}>I Agree</button>
    </div>
  );
};

export default Disclaimer;
