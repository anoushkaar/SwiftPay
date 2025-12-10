import axios from "axios";
import { create } from "zustand";

const useStore = create((set) => ({
  isAuthenticated: false,
  userDetails: null,
  auth: (userData) =>
    set(() => ({ isAuthenticated: true, userDetails: userData })),
  getProfile: () =>
    set(async () => {
      try {
        const profileData = await axios.get(
          "http://localhost:3000/api/v1/user/profile"
        );
        return profileData;
      } catch (error) {
        console.log(error); 
      }
    }),
}));

export default useStore;
