// export const backendUrl = "http://localhost:5000/";
export const backendUrl = "https://wifi-user-management-be.onrender.com/";

export const config = {
  headers: {
    token: localStorage.getItem("token"),
  },
};
