import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "@/Context";
import { ID, Models, Query } from "appwrite";
import client, {
  account,
  databases,
  DB,
  USERS,
  ADMIN,
  TRANSACTIONS,
} from "@/Backend/appwrite";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { sendEmail } from "@/Email";
import { welcomeEmailTemplate } from "@/Email/welcomeEmail";
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [users, setUsers] = useState<Models.Document[]>([]);
  const [userData, setUserData] = useState<Models.Document>();
  const [rates, setRates] = useState<Models.Document>();
  const [isUpdatingUyo, setIsUpdatingUyo] = useState(false);
  const [isUpdatingPh, setIsUpdatingPh] = useState(false);
  const [transactions, setTransactions] = useState<Models.Document[]>([]);
  const [restaurants, setRestaurants] = useState<Models.Document[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await databases.listDocuments(DB, USERS);
        setUsers(res.documents);
      } catch (error) {
        console.log(error);
        throw new Error((error as Error).message);
      }
    };
    getUsers();
  }, []);

  const register = async (form: FormType) => {
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
      sendEmail(
        form.email,
        "Jackson From Lani",
        welcomeEmailTemplate(form.name, `https://lani.ng/dashboard`),
        "Jackson From Lani"
      );
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const createUserdata = async (form: FormType, id: string) => {
    try {
      await databases.createDocument(DB, USERS, id, {
        userId: id,
        name: form.name,
        email: form.email,
        phone: form.phoneNumber,
        role: form.role,
        location: form.location,
        companyName: form.businessName,
        address: form.address,
        businessName: form.businessName,
        businessRegNo: form.businessRegNo,
        subrole: form.subRole,
        lat: form.lat.toString(),
        lon: form.lon.toString(),
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
      // throw new Error((error as Error).message);
    }
  }, []);


  const getRestaurants = useCallback(async () => {
    try {
      const res = await databases.listDocuments(DB, USERS, [
        Query.equal("role", ["restaurant"]),
        Query.orderDesc("$createdAt"),
      ]);
      setRestaurants(res.documents);
    } catch (error) {
      console.log(error); 
      throw new Error((error as Error).message);
    }
  }, []);

  useEffect(() => {
    getUserData();
    getRestaurants();
  }, [getUserData, getRestaurants]);

  const login = async (form: LoginFormTypes) => {
    setLoading(true);
    try {
      await account.createEmailPasswordSession(form.email, form.password);
      const session = await account.get();
      setUser(session);
      console.log(session);
      await getUserData();
      if (userData) {
        navigate("/dashboard");
      }
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
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [navigate, getUserData, userData?.role]);

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

  const getAdminSettings = useCallback(async () => {
    try {
      const res = await databases.getDocument(DB, ADMIN, "rates");
      setRates(res);
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    }
  }, []);

  const updateRatesUyo = async (rate: string) => {
    setIsUpdatingUyo(true);
    try {
      await databases.updateDocument(DB, ADMIN, "rates", {
        rateForUyo: Number(rate),
      });
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    } finally {
      setIsUpdatingUyo(false);
    }
  };

  const updateRatesPh = async (rate: string) => {
    setIsUpdatingPh(true);
    try {
      await databases.updateDocument(DB, ADMIN, "rates", {
        rateForPh: Number(rate),
      });
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    } finally {
      setIsUpdatingPh(false);
    }
  };

  useEffect(() => {
    getAdminSettings();
  }, [getAdminSettings]);

  // transaction
  const createTransaction = async (
    amount: number,
    status: "pending" | "success" | "failed",
    type: "credit" | "debit",
    category: "deposit" | "Package" | "Food",
    description: string
  ) => {
    try {
      if (!userData?.$id) throw new Error("User not found");
      const res = await databases.createDocument(
        DB,
        TRANSACTIONS,
        ID.unique(),
        {
          transactionId: userData?.$id,
          amount: amount,
          status: status,
          type: type,
          category: category,
          description: description,
        }
      );

      if (type === "credit") {
        await databases.updateDocument(DB, USERS, userData?.$id, {
          wallet: Number(userData?.wallet) + amount,
        });
        toast.success("Balance updated successfully");
      }
      if (type === "debit") {
        await databases.updateDocument(DB, USERS, userData?.$id, {
          wallet: Number(userData?.wallet) - amount,
        });
        toast.success("Balance updated successfully");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    }
  };

  const getTransactions = useCallback(async () => {
    try {
      if (!userData?.$id) throw new Error("User not found");
      const res = await databases.listDocuments(DB, TRANSACTIONS, [
        Query.equal("transactionId", userData?.$id),
        Query.orderDesc("$createdAt"),
      ]);
      setTransactions(res.documents);
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    }
  }, [userData]);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  const updateCompanyName = async (name: string) => {
    setLoading(true);
    if (!userData?.$id) throw new Error("User not found");
    try {
      await databases.updateDocument(DB, USERS, userData?.$id, {
        companyName: name,
      });
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const updateCompanyAddress = async (address: string) => {
    setLoading(true);
    if (!userData?.$id) throw new Error("User not found");
    try {
      await databases.updateDocument(DB, USERS, userData?.$id, {
        companyAddress: address,
     
      });
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const updateCompanyEmail = async (email: string) => {
    setLoading(true);
    if (!userData?.$id) throw new Error("User not found");
    try {
      await databases.updateDocument(DB, USERS, userData?.$id, {
        companyEmail: email,
      });
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };


  const updateRestaurant = async (restaurant: Models.Document) => {
    setLoading(true);
    try {
      await databases.updateDocument(DB, USERS, restaurant.$id, {
        isVerified: true,
      });
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const verifyUser = async (id: string) => {
    setLoading(true);
    try {
      await databases.updateDocument(DB, USERS, id, {
        isVerified: true,
      });
      await getUserData()
      navigate("/admin/users")
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = client.subscribe(
      [
        `databases.${DB}.collections.${USERS}.documents`,
        `databases.${DB}.collections.${ADMIN}.documents`,
        `databases.${DB}.collections.${TRANSACTIONS}.documents`,
      ],
      (response) => {
        if (
          response.events.some(
            (event) => event.includes("create") || event.includes("update")
          )
        ) {
          getUserData();
          getAdminSettings();
          getTransactions();
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [getUserData, getAdminSettings, getTransactions]);

  const value: AuthContextType = {
    user,
    loading,
    register,
    userData,
    login,
    logout,
    updatePhoneNumber,
    updateLocation,
    users,
    rates,
    isUpdatingUyo,
    isUpdatingPh,
    updateRatesUyo,
    updateRatesPh,
    transactions,
    createTransaction,
    getTransactions,
    updateCompanyName,
    updateCompanyAddress,
    updateCompanyEmail,
    restaurants,
    updateRestaurant,
    verifyUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
