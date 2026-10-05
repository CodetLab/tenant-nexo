import React, { useState } from "react";
import { LoginCard } from "./LoginCard";
import { RegisterCard } from "./RegisterCard";
import { MouseDepth } from "../../components/effects/mouseDepth/MouseDepth";
import styles from "./Auth.module.css";

export const AuthPage: React.FC = () => {
    const [view, setView] = useState<
        "login" | "register"
    >("login");

    return (
        <MouseDepth className={styles.page}>
            {view === "login" ? (
                <LoginCard
                    onSwitchToRegister={() =>
                        setView("register")
                    }
                />
            ) : (
                <RegisterCard
                    onSwitchToLogin={() =>
                        setView("login")
                    }
                />
            )}
        </MouseDepth>
    );
};

export default AuthPage;