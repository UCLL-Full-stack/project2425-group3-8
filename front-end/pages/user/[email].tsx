// pages/user/[email].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "@types";
import UserService from "@services/userService";
import Header from "@components/header";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const UserDetailsPage = () => {
  const { query } = useRouter();
  const { email } = query;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [showUsers, setShowUsers] = useState<boolean>(false);

  useEffect(() => {
    if (email) {
      const fetchUserData = async () => {
        try {
          const response = await UserService.getUserByJustMail(email as string);
          setUser(response);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLoading(false);
        }
      };

      fetchUserData();

      const user = sessionStorage.getItem('loggedInUser');
      if (user) {
        const visitorStatus = JSON.parse(user).role;
        setUserStatus(visitorStatus);
      }
    }
  }, [email]);

  const handleShowUsers = async () => {
    if (userStatus !== 'admin') {
      const errorMessage = "You are not authorized to view this.";
    setError(errorMessage);

      console.warn(`Authorization error: ${errorMessage} - User Status: ${userStatus}`);
      // Optionally, you can redirect the user here
      setTimeout(() => {
        setError(null);  // Reset error after a short time
      }, 3000);
      return;
    }

    setShowUsers(prevState => !prevState);

    if (!showUsers) {
      try {
        const response = await UserService.getUsers();
        setUsers(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <div>
      <Header />
      <div style={{ margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "5px", width: "50%", textAlign: "center", marginTop: "50px" }}>
        <h1>User Details</h1>
        <p><strong>Name:</strong> {user.fullName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phoneNumber}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={handleShowUsers}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#45a049"}
          onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#4CAF50"}
        >
          {showUsers ? "Hide Users" : "Show Users"}
        </button>
      </div>

      {error && (
        <p style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
          {error}
        </p>
      )}

      {showUsers && users.length > 0 && (
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <h2>All Users</h2>
          <table style={{ width: "80%", borderCollapse: "collapse", margin: "auto" }}>
            <thead>
              <tr>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Full Name</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Email</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Phone</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email}>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{user.fullName}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{user.email}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{user.phoneNumber}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};



export default UserDetailsPage;
