// pages/user/[email].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "@types";
import UserService from "@services/userService";

const UserDetailsPage = () => {
  const { query } = useRouter();
  const { email } = query;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
    }
  }, [email]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p><strong>Name:</strong> {user.fullName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Address:</strong> {user.phoneNumber}</p>
      <p><strong>Phone:</strong> {user.role}</p>
    </div>
  );
};

export default UserDetailsPage;
