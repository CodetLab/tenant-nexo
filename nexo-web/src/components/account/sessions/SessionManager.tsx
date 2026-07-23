import { useEffect, useState } from "react";

import {
    getSessions,
    revokeSession
} from "../../../services/account.service";

import styles from "./SessionManager.module.css";


interface Session {
    sessionId: string;
    userId: number;
    device: string;
    ip: string;
    userAgent: string;
    createdAt: string;
    expiresAt: string;
    revokedAt: string | null;
    isCurrent: boolean;
}


interface SessionManagerProps {
    onLogout: () => void;
}


export default function SessionManager({
    onLogout
}: SessionManagerProps) {


    const [
        sessions,
        setSessions
    ] = useState<Session[]>([]);



    const loadSessions = async () => {

        const data =
            await getSessions();

        setSessions(data);

    };



    useEffect(() => {

        loadSessions();

    }, []);



    const currentSession =
        sessions.find(
            session => session.isCurrent
        );



    const handleRevoke = async (
        sessionId: string
    ) => {

        await revokeSession(
            sessionId
        );

        await loadSessions();

    };



    const handleLogout = async () => {

        if (currentSession) {

            await revokeSession(
                currentSession.sessionId
            );

        }


        onLogout();

    };



    return (

        <div className={styles.container}>


            <h3>
                Sesión actual
            </h3>


            {
                currentSession ? (

                    <div className={styles.session}>

                        <p>
                            {currentSession.device}
                        </p>

                        <p>
                            {currentSession.ip}
                        </p>

                        <p>
                            {currentSession.sessionId}
                        </p>

                        <p>
                            expires at: {currentSession.expiresAt}
                        </p>

                    </div>

                ) : (

                    <p>
                        No encontrada
                    </p>

                )
            }



            <h3>
                Otros dispositivos
            </h3>


            {
                sessions
                    .filter(
                        session =>
                            !session.isCurrent
                    )
                    .map(session => (

                        <div
                            className={styles.session}
                            key={session.sessionId}
                        >

                            <p>
                                {session.device}
                            </p>

                            <p>
                                {new Date(
                                    session.createdAt
                                ).toLocaleString()}
                            </p>
                            <p>
                                {session.ip}
                            </p>
                            <p>
                                {session.sessionId}
                            </p>
                            <p>
                                expires at: {session.expiresAt}
                            </p>
                            <button
                                onClick={() =>
                                    handleRevoke(
                                        session.sessionId
                                    )
                                }
                            >
                                Revocar
                            </button>


                        </div>

                    ))
            }



            <button
                onClick={handleLogout}
            >
                Cerrar sesión
            </button>


        </div>

    );

}