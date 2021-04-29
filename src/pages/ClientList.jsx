import React,{useEffect,useState} from 'react'
import apiServices from '../services/apiServices';
import { toast } from 'react-toastify';
import { toastConfig } from '../helper';
import usePagination from '../components/Pagination';
import _ from "lodash";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Header from '../components/Header';


const ClientList = ()=>{
    const [clients,setClients] =useState([]);
    const [error,setError] =useState("");
    const [loading,setLoading] = useState(false);

    const [page, setPage] = useState(1);
    let perPage = 5;
    let items = Math.ceil(clients.length / perPage);
    const pages = _.range(1, items + 1);
    let paginated = usePagination(clients.length > 0 ? clients : [], perPage);
    let data = paginated.currentData();
    let [deleteFlag,setDeleteFlag] = useState(false);


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
    },[deleteFlag,error]);

    const handleSelect = (page) => {
        setPage(page);
        paginated.jump(page);
    };

    const deleteAlert = async (id) => {
        Swal.fire({
          title: "Delete This Client?",
          text: "This client will be deleted and cannot be recovered back",
          icon: "warning",
          showCancelButton: true,
          cancelButtonColor: "#3085d6",
          confirmButtonColor: "#d33",
          confirmButtonText: "Yes,delete it !",
        }).then(async (result) => {
          if (result.value) {
              let resultData = await apiServices.deleteClient(id);
              if(resultData.isDeleted){
                setDeleteFlag(true);
                toast.success("Client Deleted successfully",toastConfig);
              }else if(resultData.error){
                toast.error(resultData.error,toastConfig);
            }
          }
        });
      };  

      
    let sn = page > 1 ? (page - 1) * 5 : 0;
    return (
        <section>
        <Header/>
       <div className="container">
           <div className="table-responsive">
         <table className="table table-striped table-bordered">
                 <thead>
                   <tr>
                     <th scope="col">S.N</th>
                     <th scope="col">FN</th>
                     <th scope="col">PN</th>
                     <th scope="col">Email</th>
                     <th scope="col">DOB</th>
                     <th scope="col">Address</th>
                     <th scope="col">Gender</th>
                     <th scope="col">Nationality</th>
                     <th scope="col">Mode</th>
                     <th scope="col">EB</th>
                     <th scope="col">Action</th>
                   </tr>
                 </thead>
                 <tbody>
                    {loading ? (<tr>Loading....</tr>) :(
                       data.map((c,i)=>{
                           return (
                               <tr key={i}>
                                    <th>{page > 1 ? sn + i + 1 : i + 1}</th>
                                    <td>{c.name}</td>
                                    <td>{c.phone}</td>
                                    <td>{c.email}</td>
                                    <td>{c.dob}</td>
                                    <td>{c.address}</td>
                                    <td>{c.gender}</td>
                                    <td>{c.nationality}</td>
                                    <td>{c.preffered_mode}</td>
                                    <td>{c.education_background}</td>
                                    <td>
                                        <Link class="btn btn-sm btn-info mb-1" to={`/client/${c.id}`} role="button"><i class="fa fa-edit"></i> Edit</Link>
                                        <button type="button" class="btn btn-danger btn-sm btn-delete"  onClick={() => deleteAlert(c.id)}>
                                        Delete
                                        </button>
                                    </td>
                               </tr>
                           )
                       })
                    )}
                 </tbody>
           </table>
           <nav aria-label="...">
                <ul className="pagination pagination-md">
                    {pages.map((p, i) => (
                    <li
                        className={
                        p === page ? "page-item active" : "page-item"
                        }
                        aria-current="page"
                        key={i}
                    >
                        <span
                        onClick={() => handleSelect(p)}
                        className="page-link"
                        >
                        {p}
                        </span>
                    </li>
                    ))}
                </ul>
             </nav>
       </div>
     </div>
    </section>
    )
}
export default ClientList;