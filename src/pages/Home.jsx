import React,{useEffect,useState} from 'react'
import { useForm } from "react-hook-form";
import nationalities from "../utils/nationalities";
import education from "../utils/education_background";
import apiServices from '../services/apiServices';
import _ from "lodash";
import { toast } from 'react-toastify';
import { toastConfig } from '../helper';
import { Link } from 'react-router-dom';
import Header from '../components/Header';



const Home = ()=>{
    // functions to build form returned by useForm() hook
    const { register, handleSubmit} = useForm();
    const [clients,setClients] =useState([]);
    const [client,setClient] = useState({});

    const [error,setError] =useState("");
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        async function getAllClients(){
            setLoading(true)
            let data = await apiServices.getAllClients();
            if(data.clients){
                setClients(data.clients);
                setLoading(false);
            }else if(data.error){
                setError(data.error);
                toast.error(error,toastConfig);
            }
        }
        getAllClients();
    },[error,client]);


    const onSubmit =async (data,e)=>{
        let {name,gender,phone,email,address,nationality,birthday:dob,education_background,preffered_mode} = data;
        let vError = false;
        if(_.isEmpty(name)) {vError=true; toast.error("Name is required",toastConfig)}
        if(_.isEmpty(gender)) {vError=true; toast.error("Gender is required",toastConfig)}
        if(_.isEmpty(phone)) {vError = true ; toast.error("Phone is required",toastConfig)}
        if(_.isEmpty(email)) {vError=true; toast.error("Email is required",toastConfig)}
        if(_.isEmpty(address)) {vError=true; toast.error("Address is required",toastConfig)}
        if(_.isEmpty(nationality)) {vError=true; toast.error("Nationality is required",toastConfig)}
        if(_.isEmpty(dob)) {vError=true; toast.error("Date of Birth is required",toastConfig)}
        if(_.isEmpty(education_background)) {vError=true; toast.error("Education Background is required",toastConfig);}
        if(_.isEmpty(preffered_mode)) {vError=true; toast.error("Preffered Mode is required",toastConfig)}
        if(phone.length <10){
            vError=true;
            toast.error("Phone no is invalid",toastConfig)
        }

       if(!vError){
            let addingData ={name,gender,phone,email,address,nationality,dob,education_background,preffered_mode};
            const result = await apiServices.addClient(addingData);
            if(result.client){
                setClient(result.client);
                e.target.reset();
                toast.success("Client created successfully",toastConfig);
            }else if(result.error){
                toast.error(result.error,toastConfig);
            }
       }
    }

    return (
        <>
        <section>
            <Header/>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-md-5">
                        <form onSubmit={handleSubmit(onSubmit)} className="main__form mt-3">
                            <h3>Create Client</h3>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Full Name</label>
                                        <input {...register("name")} type="name" className="form-control" placeholder="Name" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Phone Number</label>
                                        <input type="number" {...register("phone")}  className="form-control" placeholder="Phone Number"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="email" {...register("email")} className="form-control" placeholder="Email" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Date of Birth</label>
                                        <input type="date" {...register("birthday")}  className="form-control" id="birthday" name="birthday" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Address</label>
                                        <input type="name" {...register("address")} className="form-control" placeholder="Address"  />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Nationality</label>
                                        <select className="form-select" {...register("nationality")} aria-label="Default select example" required>
                                            {nationalities.map((n) => {
                                                return (
                                                  <option value={n}  >{n}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Gender</label>
                                        <select className="form-select" {...register("gender")} aria-label="Default select example" required>
                                            <option>Female</option>
                                            <option value="male">Male</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Preferred mode</label>
                                        <select className="form-select" {...register("preffered_mode")} aria-label="Default select example" required>
                                            <option defaultValue="none" selected>None</option>
                                            <option defaultValue="phone">Phone Number</option>
                                            <option defaultValue="email" >Email</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Education Background</label>
                                        <select className="form-select" {...register("education_background")} aria-label="Default select example" required> 
                                            {education.map((e) => {
                                                return (
                                                  <option value={e}>{e}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <input type="submit" value="Create" className="btn submit__btn "/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-3"></div>
                    <div className="col-md-4">
                        <div className="background__last mt-3">
                            <h3>Clients Created</h3>
                            <h2 className="text-center">{loading ? "loading...." : clients.length}</h2>
                            <Link type="button" to="/clients" className="btn type__btn">Get All The Clients</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}


export default Home;