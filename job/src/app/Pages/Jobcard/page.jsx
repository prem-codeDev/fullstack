'use client'

import { useEffect, useState } from "react"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";


export default function Jobcard(){

    const [routes ,setRoute] = useState([])
    const [items ,setItem] = useState([])
    const [cardNums ,setCardNums] = useState('')
    const [selectedItem, setSelectedItem] = useState('');
    const [selectedCode, setSelectedCode] = useState('');
    const [rows, setRows] = useState([]);
    const [vendRows ,setVendRows] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [rowCount, setRowCount] = useState(1);
    const [jobCardDate, setJobCardDate] = useState('');
    const [selectedProcess, setSelectedProcess] = useState('');
    const [selectedVendor ,setSelectedtVendor] = useState('');
    const [selectedDepartment ,setSelectedtDepartment] = useState('');
    const [selectedIsInHouse ,setSelectedtIsInHouse] = useState('');
    const [dept ,setDept] = useState('')
    const [process ,setProcess] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [jobCards ,setJobCards] = useState([]);
    const [editingJobCards ,setEditingJobCards] = useState(null);
    const [view ,setView] = useState('form');
    const [isFetching, setIsFetching] = useState(true);
    const [editId, setEditId] = useState(null);

    const router = useRouter();
    const searchParams = useSearchParams();

    // Configure Axios for CSRF
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";

    async function fetchJobCard(id) {
         try{
            const storedData = localStorage.getItem('JobcardData')
            if(storedData){
                const jobCard = JSON.parse(storedData);
                if(jobCard.id === parseInt(id)){
                  setCardNums({ card_no:jobCard.jcards});
                  setJobCardDate(jobCard.jcds);
                  setRows([{
                    id:1,
                    itemCode: jobCard.itmcodes,
                    itemName:jobCard.itmnames,
                    quantity: jobCard.qtys,
                  },
                ]);

                setVendRows([
                    {
                        id:1,
                        departmentName:jobCard.depts,
                        ProcessName:jobCard.pcss,
                        IsInHouse: jobCard.huses,
                        VendorName:jobCard.route,
                    },
                ]);
                setSelectedItem(jobCard.itmnames)
                setSelectedCode(jobCard.itmcodes)
                setSelectedtVendor(jobCard.route);
                setRowCount(2);
                localStorage.removeItem("jobCard Item")
                toast.success("Job card data loaded from local storage!",{autoClose:3000})
                return;
                }
            }

            //fallBack API if no valid localStorage data
            const response = await axios.get(`http://127.0.0.1:8000/jcard/${id}`)
            const jobCard = response.data
            setCardNums({card_no: jobCard.jcards});
            setJobCardDate(jobCard.jcds);
            setRows([
               {
                   id:1,
                   itemCode:jobCard.itmcodes,
                   itemName:jobCard.itmnames,
                   quantity:jobCard.qtys,
               }
            ]);
            setVendRows([
                {
                    id:1,
                    departmentName:jobCard.depts,
                    ProcessName:jobCard.pcss,
                    IsInHouse:jobCard.huses,
                    VendorName:jobCard.route
                },
            ]);
            setSelectedItem(jobCard.itmnames);
            setSelectedCode(jobCard.itmcodes);
            setSelectedtVendor(jobCard.route);
            setRowCount(2);
            toast.success("Job Card data loaded successfully!",{autoClose:3000, toastId: "jobcard-load"});
         }catch(error){
            console.error("Error fetching job card:", error)
            toast.error("failed to fetch job card:" + error.message,{autoClose:5000})
         }
    }

  
    async function dateOfToday() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
        const year = today.getFullYear();
    
        const formattedDate = `${day}-${month}-${year}`; // format: DD-MM-YYYY
        setJobCardDate(formattedDate);
    }

    async function CardNumber(){
        try{
            const response = await axios.get('http://127.0.0.1:8000/jorder/');
            if(response.data && response.data.card_no){
                setCardNums(response.data)
            }else{
                setCardNums({card_no:''})
                console.log('Card Number Losing......')
            }
        }
        catch(error){
            console.log(error)
        }
    }

    async function fetchItem(){
        try{
            const response = await axios.get('http://127.0.0.1:8000/item/');
            if(response.data && response.data.length > 0){
                setItem(response.data)
                console.log('Item Fetching......')
            }else{
                setItem([])
                console.log('Item Losing......')
            }
        }
        catch(error){
            console.log(error)
        }
    }

    async function fetchDepartment() {
        try{
        const apiResponse = await fetch("http://127.0.0.1:8000/dept/")
        const result = await apiResponse.json()
        if(result){
            setDept(result)
            console.log('Route Fetching......')
        }else{
            setDept([])
            console.log('Route Losing......')
        }
        }
        catch(error){
            console.log(error)
        }
        

    }
      
    async function fetchProcess() {
        try{
        const apiResponse = await fetch("http://127.0.0.1:8000/process/")
        const result = await apiResponse.json()
        if(result){
            setProcess(result)
            console.log('Process Fetching......')
        }else{
            setProcess([])
            console.log('Process Losing......')
        }
        }
        catch(error){
            console.log(error)
        }
        

    }

    async function fetchRoutes(){
        try{
            const apiResponse = await fetch('http://127.0.0.1:8000/rout/');
            const result = await apiResponse.json();
            console.log("Initial",result)

            if(result){
                setRoute(result)
                console.log('Route Fetching......')
            }else{
                setRoute([])
                console.log('Route Losing......')
            }
        }
        catch(error){
            console.log(error)
        }
    }

    
   // Handle form submission (Create operation)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        console.log('handleSubmit triggered. State:', { cardNums, jobCardDate, rows, vendRows });
    
        if (!cardNums.card_no || !jobCardDate || !rows.length || !vendRows.length) {
            const missingFields = [];
            if (!cardNums.card_no) missingFields.push('Job Card Number');
            if (!jobCardDate) missingFields.push('Job Card Date');
            if (!rows.length) missingFields.push('Items');
            if (!vendRows.length) missingFields.push('Routes');
            setError(`Missing required fields: ${missingFields.join(', ')}`);
            toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
            return;
        }
    
        const firstRoute = vendRows[0];
        setIsLoading(true);
    
        try {
            const jobCardPromises = rows.map(async (item) => {
                const jobCardData = {
                    route: firstRoute.VendorName,
                    jcards: cardNums.card_no,
                    jcds: jobCardDate,
                    itmcodes: item.itemCode,
                    itmnames: item.itemName,
                    qtys: item.quantity,
                    depts: firstRoute.departmentName,
                    pcss: firstRoute.ProcessName,
                    huses: firstRoute.IsInHouse,
                };
    
                console.log('Submitting jobCardData:', jobCardData);
                return axios.post('http://127.0.0.1:8000/jcard/', jobCardData, {
                    headers: { 'Content-Type': 'application/json' },
                });
            });
    
            const responses = await Promise.all(jobCardPromises);
            console.log('Backend Responses:', responses.map((res) => res.data));
            toast.success('All job cards created successfully!');
    
            setSelectedItem('');
            setSelectedCode('');
            setQuantity('');
            setRows([]);
            setVendRows([]);
            setRowCount(1);
            setError('');
            CardNumber();
        } catch (error) {
            console.error('Error creating job cards:', {
                response: error.response?.data,
                status: error.response?.status,
                message: error.message,
            });
            const errorMessage = error.response?.data?.detail || JSON.stringify(error.response?.data) || error.message;
            setError('Failed to create job cards: ' + errorMessage);
            toast.error('Failed to create job cards: ' + errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    
   
    

    useEffect(()=>{
     const fetchData = async()=>{
        setIsFetching(true)
           try{
            await Promise.all([
                fetchRoutes(),
                fetchItem(),
                CardNumber(),
                dateOfToday(),
                fetchDepartment(),
                fetchProcess(),
            ]);
            const id = searchParams.get("editId")
            if(id && !editId){
                setEditId(id);
                await fetchJobCard(id)
            }
           }catch(error){
                 console.error("Error fetching data:",error);
                 toast.error("Failed to load job card data:" + error.message,{autoClose:5000})
           }finally{
            setIsFetching(false)
           }
     };
     fetchData();
    },[searchParams])

 
    const handleAddRow = () => {
        console.log("Comes row",{rows})
      
        const newRow = {
          id: rowCount,
          itemCode: selectedCode,
          itemName: selectedItem,
          quantity: quantity
        };
      
        setRows((prev) => [...prev, newRow]);
        setRowCount((prev) => prev + 1);
      
        // Clear fields
        setSelectedItem('');
        setSelectedCode('');
        setQuantity('');
      };
      console.log("ROWS Value",rows);
      
    const handleItemChange = (e) => {
        const selectedName = e.target.value;
        setSelectedItem(selectedName)
        const selectedItem = items.find(item => item.item_names === selectedName);
        setSelectedCode(selectedItem ? selectedItem.item_codes : '');

      };
    

    const handleRouteSelectChange =  (e) => {
        const selectedRouter = e.target.value;
        const selectedVendorObj = routes.find(route => route.route_names === selectedRouter);
      
        const department = selectedVendorObj ? selectedVendorObj.departs : '';
        const process = selectedVendorObj ? selectedVendorObj.process : '';
        const inHouse = selectedVendorObj ? selectedVendorObj.inhouse : '';
        const vendor = selectedVendorObj ? selectedVendorObj.route_names : '';
      
        // Set individual states (optional, in case you want to reflect them in the UI)
        setSelectedtVendor(vendor);
        setSelectedtDepartment(department);
        setSelectedProcess(process);
        setSelectedtIsInHouse(inHouse);
      
        // Create new row entry
        const newVendRows = {
          id: rowCount,
          departmentName: department,
          ProcessName: process,
          IsInHouse: inHouse,
          VendorName: vendor
        };
      
        setVendRows((prev) => [...prev, newVendRows]);
        setRowCount((prev) => prev + 1);
      
        // Clear fields after adding
        setSelectedtDepartment('');
        setSelectedProcess('');
        setSelectedtIsInHouse('');
        setSelectedtVendor('');
      };
      

    return(
        <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
          <div className="g-sidenav-show  bg-gray-100">
                <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
                    {/*  Navbar */}
                    {/* End Navbar */}
                    <div className="container-fluid py-4">
                    <div className="row mt-2 ">
                        <div className=" col-12">
                        <div className="card z-index-2">
                            <div className="card-header pb-0">
                            <h6>Job Card</h6>
                            </div>
                            <div className="card-body p-3">
                            <form onSubmit={handleSubmit}>
                            <div className="row g-3" >
                                <div className="col-md-4">
                                    <label className="form-label">Route</label>
                                    <select type="text" className="form-select " id="rte" name="route" onChange={handleRouteSelectChange}>                        
                                    {/* List */}
                                    <option value=""> Select Route </option>
                                    {(
                                            routes && routes.length > 0 ? routes.map((route, index) => {
                                            return (
                                                <option key={index} value={route.route_names}>
                                                {route.route_names}
                                                </option>
                                            )
                                            }) 
                                            : null
                                        )}
                                    </select>
        
                                </div>
                                <div className="col-md-3">
                                <label className="form-label"></label>
                                <div className="input-group">
                                    <span className="input-group-text fw-bold px-3">Job Card No.</span>                                    
                                    <input type="text" className="form-control bg-light px-3" id='JCN' value={cardNums.card_no} name="JCN" onChange={(e)=>{setIPjcard()}} readOnly/>
                                
                                </div> 
                                </div>
                                <div className="col-md-3">
                                <label className="form-label"></label>
                                <div className="input-group">
                                    <span className="input-group-text fw-bold px-3">Job Card Date</span>
                                    <input type="text" className="form-control bg-light px-3" id="JOD" name="jcd"  value={jobCardDate} onChange={(e) =>setIPjcd(e.target.value)} readOnly/>
                                </div> 
                                </div>
                                <div className="col-md-3">
                                <label className="form-label">Item Code</label>
                                <input type="text" className="form-control " id="itmCode" name="itmcode" value={selectedCode} readOnly/>
                                </div>
                                <div className="col-md-3">
                                <label className="form-label">Item Name</label>
                                <select type="text" className="form-select " id="itmname" name="itmName" onChange={handleItemChange} >
                                    {/* Item list */}
                                    <option value="">Select Item</option>
                                    {(
                
                                        items && items.length > 0 ? items.map((item, index) => {
                                        return (
                                            <option key={index} value={item.item_names}>
                                            {item.item_names}
                                            </option>
                                        )
                                        }) 
                                        : null
                                    )}  
                                </select> 
                                </div>
                                <div className="col-md-3">
                                <label className="form-label">Quantity</label>
                                <div className="input-group">
                                    <input type="text" className="form-control " id="qty" name="qty" onChange={(e) => setQuantity(e.target.value)} />
                                    <button type='button' id="addBtn" className="btn btn-success" onClick={handleAddRow}>Add</button>
                                </div> 
                                <input type="hidden" id="productData" name="productData"/>
                                </div>
                            </div>
                                {/* PRO LIST */}
                            <div className="table-responsive mt-5">
                                <h6>Product List</h6>
                                <table className="table align-items-center table-bordered mb-0">
                                    <thead className="thead table-light">
                                    <tr>
                                        <th scope="col">S.NO</th>
                                        <th scope="col" className="text-center">Item Code</th>
                                        <th scope="col" className="text-center">Item Name</th>
                                        <th scope="col" className="text-center">Qty</th>
                                    </tr>
                                    </thead>
                                    <tbody id='productlist'>
                                        
                                    {rows.length === 0 ? (
                                        <tr id="noRecords">
                                            <td colSpan="4" className="text-center">No Records Added</td>
                                        </tr>
                                        ) : (
                                        rows.map((row, idx) => (
                                            <tr key={idx}>
                                            <td>{row.id}</td>
                                            <td className="text-center item-code">{row.itemCode}</td>
                                            <td className="text-center item-name">{row.itemName}</td>
                                            <td className="text-center item-qty">{row.quantity}</td>
                                            </tr>
                                        ))
                                        )}
                                    {/* jobcard list */}
                                    </tbody>
                                </table>
                            </div>
                                {/* RM list */}
                            <div className="table-responsive mt-5">
                                <h6>Raw Material List</h6>
                                <table className="table align-items-center table-bordered mb-0">
                                    <thead className="thead table-light">
                                    <tr>
                                        <th scope="col">S.NO</th>
                                        <th scope="col" className="text-center">Item Code</th>
                                        <th scope="col" className="text-center">Item Name</th>
                                        <th scope="col" className="text-center">Qty</th>
                                    </tr>
                                    </thead>
                                    <tbody id='rmlist'>
                                    {/* jobcard list */}
                                        <tr id="noRecords">
                                            <td colSpan="4" className="text-center">No Records Added</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="row mt-5">
                                <div className="col-md-3">
                                    <label className="form-label">Department</label>
                                    <select className="form-select" id='dept' name="department">
                                        {/* department list*/}
                                        <option value=""> Select Department </option>
                                        {(
                                            dept && dept.length > 0 ? dept.map((depts, index) => {
                                            return (
                                                <option key={index} value={depts.dept_names}>
                                                {depts.dept_names}
                                                </option>
                                            )
                                            }) 
                                            : null
                                        )}
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">Process</label>
                                    <select className="form-select" name="process" id="pcss">
                                        {/*process list*/}
                                        <option value=""> Select Process </option>
                                        {(
                                            process && process.length > 0 ? process.map((pcs, index) => {
                                            return (
                                                <option key={index} value={pcs.process_name}>
                                                {pcs.process_name}
                                                </option>
                                            )
                                            }) 
                                            : null
                                        )}
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">House</label>
                                    <select className="form-select" id="huse" name="house">
                                        <option value="">Select House</option>
                                        <option value="InHouse">InHouse</option>
                                        <option value="OutSource">OutSource</option>
                                    </select>
                                </div>
                                <div className="col-md-2">
                                    <label className="form-label"></label>
                                    <button className="btn btn-success w-100">Add</button>
                                </div>

                                {/*Route Detail*/}
                                <div className="table-responsive mt-5">
                                    <h6>Route List</h6>
                                    <table className="table align-items-center table-bordered mb-0">
                                    <thead className="thead table-light">
                                        <tr>
                                        <th scope="col">S.NO</th>
                                        <th scope="col" className="text-center">Department</th>
                                        <th scope="col" className="text-center">Process</th>
                                        <th scope="col" className="text-center">Is InHouse</th>
                                        <th scope="col" className="text-center">vendor</th>
                                        <th scope="col" className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id='routelist'>
                                        {/* jobcard list */}
                                        {vendRows.length === 0 ? (
                                        <tr id="noRecords">
                                            <td colSpan="4" className="text-center">No Records Added</td>
                                        </tr>
                                        ) : (
                                        vendRows.map((route, idx) => (
                                            <tr key={idx}>
                                            <td>{route.id}</td>
                                            <td className="text-center item-code">{route.departmentName}</td>
                                            <td className="text-center item-name">{route.ProcessName}</td>
                                            <td className="text-center item-qty">{route.IsInHouse}</td>
                                            <td className="text-center item-qty">{route.VendorName}</td>
                                            <td className="text-center item-qty">Action</td>
                                            </tr>
                                        ))
                                        )}
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                                <div className="row mt-3 justify-content-end">
                                <div className=" d-flex justify-content-end align-items-center gap-3 m-3 ">
                                    <button type="submit" className="btn btn-success saveBtn ">Save</button>
                                    <button type="reset" className="btn btn-danger">Cancel</button>
                                    <button type="button" className="btn btn-danger">
                                        <Link href="./billing">
                                            Go To List
                                        </Link>
                                    </button>
                                </div>
                                </div>
                            </form>
                            </div>
                        </div>
                        </div>
                    </div>
                    <footer className="footer pt-3  ">
                        <div className="container-fluid">
                        <div className="row align-items-center justify-content-lg-between">
                            <div className="col-lg-6 mb-lg-0 mb-4">
                            <div className="copyright text-center text-sm text-muted text-lg-start">
                                ©,
                                made with <i className="fa fa-heart"></i> by
                                <a href="#" className="font-weight-bold" target="_blank">Abc</a>
                                for a better web.
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                                <li className="nav-item">
                                <a href="https://www.creative-tim.com" className="nav-link text-muted" target="_blank">Creative Tim</a>
                                </li>
                                <li className="nav-item">
                                <a href="https://www.creative-tim.com/presentation" className="nav-link text-muted" target="_blank">About Us</a>
                                </li>
                                <li className="nav-item">
                                <a href="https://creative-tim.com/blog" className="nav-link text-muted" target="_blank">Blog</a>
                                </li>
                                <li className="nav-item">
                                <a href="https://www.creative-tim.com/license" className="nav-link pe-0 text-muted" target="_blank">License</a>
                                </li>
                            </ul>
                            </div>
                        </div>
                        </div>
                    </footer>
                    </div>
                </main>
                </div>
        </>
    )
}