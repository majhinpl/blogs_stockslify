"use client";

import React, { useState } from "react";
import styles from "./writePage.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }
  return (
    <div className={styles.container}>
      <input type="text" placeholder="Title" className={styles.input} />
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="" width={16} height={16} />
        </button>
        {open && (
          <div className={styles.add}>
            <button className={styles.addbutton}>
              <Image src="/image.png" alt="" width={16} height={16} />
            </button>
            <button className={styles.button}>
              <Image src="/external.png" alt="" width={16} height={16} />
            </button>
            <button className={styles.button}>
              <Image src="/video.png" alt="" width={16} height={16} />
            </button>
          </div>
        )}
        <ReactQuill
          theme="bubble"
          value={value}
          onchange={setValue}
          placeholder="Tell your story..."
          className={styles.textArea}
        />
      </div>
      <button className={styles.publish}>Submit</button>
    </div>
  );
};

export default WritePage;
