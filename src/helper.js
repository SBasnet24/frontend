import axios from "axios";

export const Send = async (method, url, data) => {
  let res = await axios({
    url: "/api" + url,
    method,
    data,
  });
  return res.data;
};

export const toastConfig = async =>{
  const obj ={
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }
  return obj;
}