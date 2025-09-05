import axios from "axios";

const profileApi = axios.create({
    baseURL: "https://preduskbackend-ouvvu466c-gograj-choudharys-projects.vercel.app/api/v1/profile"
});



export const GetProfile= async()=>{
    const res = await profileApi.get("/");
    return res.data;
};


profileApi.interceptors.request.use((config)=>{
    const token = localStorage.getItem("accessToken");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
  (error)=>{
    return Promise.reject(error); 
});


export const AddProfile = async(data)=> {
    const res = await profileApi.post("/add", data);
    return res.data;
}

export const UpdateProfile = async({id,data})=> {
    const res = await profileApi.put(`/update/${id}`, data);
    return res.data;
}

export const DeleteProfile = async(id)=> {
    const res = await profileApi.delete(`/delete/${id}`);
    return res.data;
}
