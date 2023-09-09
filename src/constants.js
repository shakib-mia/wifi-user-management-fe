export const backendUrl = "https://wifi-user-management-be.onrender.com/";

export const config = {
  headers: {
    token: localStorage.getItem("token"),
  },
};
