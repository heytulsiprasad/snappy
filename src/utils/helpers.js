import axios from "axios";

export const getUserInfo = async (dispatch, setCurrentUser) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      axios.defaults.headers.common["x-auth-token"] = token;
      const res = await axios.get("/api/user/info");

      dispatch(setCurrentUser({ currentUser: res.data.user }));
    } catch (e) {
      console.error(e);
    }
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

// export const getImageURL = (image) => {
//   // Get base64 string
//   const base64String = btoa(
//     new Uint8Array(image.data.data).reduce(
//       (data, byte) => data + String.fromCharCode(byte),
//       ""
//     )
//   );

//   return `data:${image.data.contentType};base64,${base64String}`;
// };

export const imageUpload = (imageFile, cb) => {
  const formData = new FormData();

  formData.append("file", imageFile);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  );
  formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

  delete axios.defaults.headers.common["x-auth-token"];

  axios
    .post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      formData
    )
    .then((res) => res.data.secure_url)
    .then((url) => cb(url))
    .catch((err) => console.error(err));
};
