import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "@/Context";
import { ID, Models } from "appwrite";
import client, { account, databases, DB, USERS } from "@/Backend/appwrite";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [userData, setUserData] = useState<Models.Document>();

  const register = async (form: RegisterFormTypes) => {
    setLoading(true);
    try {
      const user = await account.create(
        ID.unique(),
        form.email,
        form.password,
        form.name
      );
      await account.createEmailPasswordSession(form.email, form.password);
      await createUserdata(form, user.$id);
      const session = await account.get();
      setUser(session);
      console.log(user);
      await getUserData();
      toast.success("Account created successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const createUserdata = async (form: RegisterFormTypes, id: string) => {
    try {
      await databases.createDocument(DB, USERS, id, {
        userId: id,
        name: form.name,
        email: form.email,
        phone: form.phone,
        role: form.role,
        location: form.city,
      });
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    }
  };

  const getUserData = useCallback(async () => {
    const user = await account.get();
    if (!user?.$id) throw new Error("User not found");
    try {
      const res = await databases.getDocument(DB, USERS, user.$id);
      setUserData(res);
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    }
  }, []);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const login = async (form: LoginFormTypes) => {
    setLoading(true);
    try {
      await account.createEmailPasswordSession(form.email, form.password);
      const session = await account.get();
      setUser(session);
      console.log(session);
      await getUserData();
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await account.deleteSession("current");
      setUser(null);
      setUserData(undefined);
      navigate("/login");
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const session = await account.get();
        if (!session) {
          toast.error("Please login to continue");
          navigate("/login");
          return;
        }
        if (isMounted) {
          setUser(session);
          await getUserData();
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkAuth();

    return () => {
      isMounted = false; 
    };
  }, [navigate, getUserData]);

  const updatePhoneNumber = async (phone: string) => {
    setLoading(true);
    if (!userData?.$id) throw new Error("User not found");
    try {
      await databases.updateDocument(DB, USERS, userData?.$id, {
        phone: phone,
      });
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const updateLocation = async (location: string) => {
    setLoading(true);
    if (!userData?.$id) throw new Error("User not found");
    try {
      await databases.updateDocument(DB, USERS, userData?.$id, {
        location: location,
      });
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = client.subscribe(
      [`databases.${DB}.collections.${USERS}.documents`],
      (response) => {
        if (
          response.events.some(
            (event) => event.includes("create") || event.includes("update")
          )
        ) {
          getUserData();
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [getUserData]);

  const value: AuthContextType = {
    user,
    loading,
    register,
    userData,
    login,
    logout,
    updatePhoneNumber,
    updateLocation,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
