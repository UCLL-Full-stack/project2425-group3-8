import { useTranslation } from "next-i18next";

const LoginOverview: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <table style={{ borderCollapse: "collapse", width: "60%", justifyContent: "center", margin: "auto", marginTop: "50px" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid black", padding: "8px" }}>{t("logingegevens.email")}</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>{t("logingegevens.password")}</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>{t("logingegevens.role")}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>johndoe@gmail.com</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>john</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>admin</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>janedoe@gmail.com</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>jane</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>visitor</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>mikeljordan@gmail.com</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>baseball</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>player</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};


    

export default LoginOverview;
