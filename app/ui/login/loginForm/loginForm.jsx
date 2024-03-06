"use client";

// import { authenticate } from "@/app/lib/actions";
import styles from "./loginForm.module.css";
// import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LoginForm = () => {
  // const [state, formAction] = useFormState(authenticate, undefined);

  const router = useRouter();

  return (
    <form className={styles.form}>
      <Image src={"/logo.png"} alt="logo" width="150" height="30" />
      <div className={styles.header}>
        <div className={styles.title}>Welcome back!</div>
        <div className={styles.subtitle}>Login to your account</div>
      </div>
      <div className={styles.inputGroup}>
        <div className={styles.inputLabelIcon}>
          <span className="text-gray-500 sm:text-sm">$</span>
        </div>
        <input type="email" placeholder="Email Address" name="email" />
      </div>
      <div className={styles.inputGroup}>
        <div className={styles.inputLabelIcon}>
          <span className="text-gray-500 sm:text-sm">$</span>
        </div>
        <input type="password" placeholder="Password" name="password" />
      </div>
      <button onClick={() => router.push("/disclaimer")}>Login</button>
    </form>
  );
};

export default LoginForm;
