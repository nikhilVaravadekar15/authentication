import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserData, logout } from "../../http";
import { toast } from "react-toastify";
import React from "react";
import { UserContext } from "../../components/provider/UserContextProvider";
import { TUser } from "../../types";

function Index() {
  const { setUserDetails } = React.useContext(UserContext);

  const query = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return await getUserData();
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await logout();
    },
    onSuccess: () => {
      setUserDetails({
        email: "",
        username: "",
        is_verified: false,
      } as TUser);
    },
    onError: () => {
      toast.info("logging out");
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  return (
    <div className="h-full w-full flex items-center justify-center ">
      <div className="p-6 sm:w-[50%] md:w-[25%] flex gap-2 flex-col items-center justify-center border rounded shadow-white">
        <img
          draggable={false}
          className="h-24 w-24 rounded-full mx-auto"
          alt={`${query.data?.data.user?.username}`}
          src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${query.data?.data.user?.username}`}
        />
        <p className="pt-2 text-lg font-semibold">
          {query.data?.data.user?.username}
        </p>
        <p className="text-sm">{query.data?.data.user?.email}</p>
        <div className="mt-5">
          <button
            onClick={() => {
              logoutMutation.mutate();
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Index;
