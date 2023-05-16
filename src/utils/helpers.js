import axios from "axios";

export const getUserInfo = async (dispatch, setCurrentUser) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      axios.defaults.headers.common["x-auth-token"] = token;
      const res = await axios.get("/api/user/info");

      // Convert binary image to str
      if (res.data.user?.profile?.image) {
        res.data.user.profile.image = getImageURL(res.data.user.profile.image);
      }

      dispatch(setCurrentUser({ currentUser: res.data.user }));
    } catch (e) {
      console.error(e);
    }
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export const getImageURL = (image) => {
  // Get base64 string
  const base64String = btoa(
    new Uint8Array(image.data.data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );

  return `data:${image.data.contentType};base64,${base64String}`;
};
