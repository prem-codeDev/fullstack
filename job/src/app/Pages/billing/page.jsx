  "use client"

import axios from "axios"
import { useEffect , useState } from "react"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation'

  export default function Billing() {
    const [posts ,setPost] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const router = useRouter();
    const fetchRecords = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/jcard/");
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching records:", error);
        toast.error("Failed to fetch job cards: " + error.message);
      } finally {
        setIsFetching(false); // Always clear loading state
      }
    };

      const DeleteItem = async (id) => {
        setIsLoading(true);
        try {
          await axios.delete(`http://127.0.0.1:8000/jcard/${id}/`, {
            headers: { "Content-Type": "application/json" },
          });
          // Update posts state by filtering out the deleted item
          setPost((prevPosts) => prevPosts.filter((post) => post.id !== id));
          toast.success("Job card deleted successfully!");
        } catch (error) {
          console.error("Error deleting job card:", {
            response: error.response?.data,
            status: error.response?.status,
            message: error.message,
          });
          const errorMessage =
            error.response?.data?.detail ||
            JSON.stringify(error.response?.data) ||
            error.message;
          toast.error("Failed to delete job card: " + errorMessage);
        } finally {
          setIsLoading(false);
        }
      };

      const EditItem = async (post) =>{
        try {
          localStorage.setItem('JobCardData',JSON.stringify(post))
          router.push(`Jobcard?editId=${post.id}`);
          toast.info("Navigating to edit job card....",{ autoClose:2000})
        } catch (error) {
          console.error("Error navigating to edit:", error);
          toast.error("Failed to navigate to edit page" + error.message, {autoClose:5000});
        }
      }

    useEffect(()=>{
      fetchRecords()
    },[])
    if (isFetching) {
      return (
        <div className="container-fluid py-4 text-center">
          <p>Loading job cards...</p>
        </div>
      );
    }

    return (
      <div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 " id="sidenav-main">
            <div className="sidenav-header">
              <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
              <a className="navbar-brand m-0" href="https://demos.creative-tim.com/soft-ui-dashboard/pages/dashboard.html" target="_blank">
                <img src="/assets/img/logo-ct.png" className="navbar-brand-img h-100" alt="main_logo"/>
                <span className="ms-1 font-weight-bold">Soft UI Dashboard</span>
              </a>
            </div>
            <hr className="horizontal dark mt-0"/>
            <div className="collapse navbar-collapse  w-auto  max-height-vh-100 h-100" id="sidenav-collapse-main">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link  " href="../pages/dashboard.html">
                    <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <svg width="12px" height="12px" viewBox="0 0 45 40">
                        <title>shop </title>
                      </svg>
                    </div>
                    <span className="nav-link-text ms-1">Dashboard</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link  " href="../pages/tables.html">
                    <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <svg width="12px" height="12px" viewBox="0 0 42 42">
                        <title>office</title>
                      </svg>
                    </div>
                    <span className="nav-link-text ms-1">Tables</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link  active" href="../pages/billing.html">
                    <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <svg width="12px" height="12px" viewBox="0 0 43 36">
                        <title>credit-card</title>
                      </svg>
                    </div>
                    <span className="nav-link-text ms-1">Billing</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link  " href="../pages/virtual-reality.html">
                    <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <svg width="12px" height="12px" viewBox="0 0 42 42">
                        <title>box-3d-50</title>
                      </svg>
                    </div>
                    <span className="nav-link-text ms-1">Virtual Reality</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link  " href="../pages/rtl.html">
                    <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <svg width="12px" height="12px" viewBox="0 0 40 40">
                        <title>settings</title>
                      </svg>
                    </div>
                    <span className="nav-link-text ms-1">RTL</span>
                  </a>
                </li>
                <li className="nav-item mt-3">
                  <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Account pages</h6>
                </li>
                <li className="nav-item">
                  <a className="nav-link  " href="../pages/profile.html">
                    <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <svg width="12px" height="12px" viewBox="0 0 46 42">
                        <title>customer-support</title>
                      </svg>
                    </div>
                    <span className="nav-link-text ms-1">Profile</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link  " href="../pages/sign-in.html">
                    <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <svg width="12px" height="12px" viewBox="0 0 40 44">
                        <title>document</title>
                      </svg>
                    </div>
                    <span className="nav-link-text ms-1">Sign In</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link  " href="../pages/sign-up.html">
                    <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <svg width="12px" height="20px" viewBox="0 0 40 40">
                        <title>spaceship</title>
                      </svg>
                    </div>
                    <span className="nav-link-text ms-1">Sign Up</span>
                  </a>
                </li>
              </ul>
            </div>
          </aside>
          <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
            {/* Navbar */}
            <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
              <div className="container-fluid py-1 px-3">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                    <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">Pages</a></li>
                    <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Billing</li>
                  </ol>
                  <h6 className="font-weight-bolder mb-0">Billing</h6>
                </nav>
                <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                  <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                    <div className="input-group">
                      <span className="input-group-text text-body"><i className="fas fa-search" aria-hidden="true"></i></span>
                      <input type="text" className="form-control" placeholder="Type here..."/>
                    </div>
                  </div>
                  <ul className="navbar-nav  justify-content-end">
                    <li className="nav-item d-flex align-items-center">
                      <a href="javascript:;" className="nav-link text-body font-weight-bold px-0">
                        <i className="fa fa-user me-sm-1"></i>
                        <span className="d-sm-inline d-none">Sign In</span>
                      </a>
                    </li>
                    <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                      <a href="javascript:;" className="nav-link text-body p-0" id="iconNavbarSidenav">
                        <div className="sidenav-toggler-inner">
                          <i className="sidenav-toggler-line"></i>
                          <i className="sidenav-toggler-line"></i>
                          <i className="sidenav-toggler-line"></i>
                        </div>
                      </a>
                    </li>
                    <li className="nav-item px-3 d-flex align-items-center">
                      <a href="javascript:;" className="nav-link text-body p-0">
                        <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
                      </a>
                    </li>
                    <li className="nav-item dropdown pe-2 d-flex align-items-center">
                      <a href="javascript:;" className="nav-link text-body p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa fa-bell cursor-pointer"></i>
                      </a>
                      <ul className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                        <li className="mb-2">
                          <a className="dropdown-item border-radius-md" href="javascript:;">
                            <div className="d-flex py-1">
                              <div className="my-auto">
                                <img src="/assets/img/team-2.jpg" className="avatar avatar-sm  me-3 "/>
                              </div>
                              <div className="d-flex flex-column justify-content-center">
                                <h6 className="text-sm font-weight-normal mb-1">
                                  <span className="font-weight-bold">New message</span> from Laur
                                </h6>
                                <p className="text-xs text-secondary mb-0">
                                  <i className="fa fa-clock me-1"></i>
                                  13 minutes ago
                                </p>
                              </div>
                            </div>
                          </a>
                        </li>
                        <li className="mb-2">
                          <a className="dropdown-item border-radius-md" href="javascript:;">
                            <div className="d-flex py-1">
                              <div className="my-auto">
                                <img src="/assets/img/small-logos/logo-spotify.svg" className="avatar avatar-sm bg-gradient-dark  me-3 "/>
                              </div>
                              <div className="d-flex flex-column justify-content-center">
                                <h6 className="text-sm font-weight-normal mb-1">
                                  <span className="font-weight-bold">New album</span> by Travis Scott
                                </h6>
                                <p className="text-xs text-secondary mb-0">
                                  <i className="fa fa-clock me-1"></i>
                                  1 day
                                </p>
                              </div>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            {/* End Navbar */}
            <div className="container-fluid py-4">
                            <div className="table-responsive mt-5">
                                      <h6>Route List</h6>
                                      <table className="table align-items-center table-bordered mb-0">
                                      <thead className="thead table-light">
                                          <tr>
                                          <th scope="col">S.NO</th>
                                          <th scope="col" className="text-center">JOB CARD NUMBER</th>
                                          <th scope="col" className="text-center">JOB CARD DATE</th>
                                          <th scope="col" className="text-center">ROUTE</th>
                                          <th scope="col" className="text-center">JOB DETAIL</th>
                                          <th scope="col" className="text-center">Action</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          {posts.length === 0 ? (
                                          <tr id="noRecords">
                                              <td colSpan="4" className="text-center">No Records Added</td>
                                          </tr>
                                          ) : (
                                          posts.map((post, idx) => (
                                              <tr key={idx}>
                                              <td>{idx+1}</td>
                                              <td className="text-center item-code">{post.jcards}</td>
                                              <td className="text-center item-name">{post.jcds}</td>
                                              <td className="text-center item-qty">{post.route}</td>
                                              <td className="text-center item-qty">{post.pcss}</td>
                                              <td className="text-center">
                                                  <div className="d-flex justify-content-center gap-2">
                                                    <button
                                                      className="btn btn-danger btn-sm"
                                                      onClick={() => DeleteItem(post.id)}
                                                      disabled={isLoading}
                                                    >
                                                      {isLoading ? "Deleting..." : "Delete"}
                                                    </button>
                                                    <button
                                                        className="btn btn-warning btn-sm"
                                                        onClick={() => EditItem(post)}
                                                      >
                                                        Edit
                                                      </button>
                                                  </div>
                                                </td>
                                              </tr>
                                          ))
                                          )}
                                      </tbody>
                                      </table>
                                  </div>
            
              <footer className="footer pt-3  ">
                <div className="container-fluid">
                  <div className="row align-items-center justify-content-lg-between">
                    <div className="col-lg-6 mb-lg-0 mb-4">
                      <div className="copyright text-center text-sm text-muted text-lg-start">
                        ©,
                        made with <i className="fa fa-heart"></i> by
                        <a href="https://www.creative-tim.com" className="font-weight-bold" target="_blank">Creative Tim</a>
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
    )
  }

