import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
// import Skeleton from "react-loading-skeleton"; 
import HomeFeatures from "./HomeFeatures";
import '../style/departments.css';
import imgIt from "../img/itImg.png"
import imgEce from "../img/eceImg.jpeg"
import imgCse from "../img/cseImg.jpg"

const Availability = () => {
    const [data, setData] = useState([]);
    const [detail, setDetail] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state

    useEffect(() => {
        getInfo();
        getIssuedBooks();
    }, []);

    const getInfo = () => {
        axios.get("https://library-mang-backend.onrender.com/apiCse")
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false); // Update loading state when data is fetched
            });
    }

    const getIssuedBooks = () => {
        axios.get("https://library-mang-backend.onrender.com/details")
            .then((res) => {
                setDetail(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const isBookAvailable = (bookId) => {
        return !detail.some(item => item.bookId === bookId);
    }

    return (
        <>
            <Header />
            <div className='CSE' style={{backgroundColor:"#9EC8B9"}}>
                {/* Conditionally render Skeleton component while loading */}
                {loading ? (
                    <div className="" style={{display:"flex",flexDirection:"row",justifyContent:"space-between",paddingBottom:"5rem",paddingTop:"5rem"}}>
        <HomeFeatures Branch="Loading ..." Tittle="Data is loading from Backend" img={imgCse} />
        <HomeFeatures Branch="Loading ..." Tittle="Data is loading from Backend" img={imgEce}  />
        <HomeFeatures Branch="Loading ..." Tittle="Data is loading from Backend" img={imgIt}  />
        </div>
                    
                ) : (
                    data.map((item) => {
                        const isAvailable = isBookAvailable(item.bookId);
                        if (isAvailable) {
                            return (
                                <div key={item.bookId} className='semesters'>
                                    <img src={item.img} alt={item.bookName} />
                                    <div className='semData'>
                                        <p className='course'>{item.course}</p>
                                        <p className='bookName'>Author: {item.author}</p>
                                        {/* <p className='bookName'>Books: {item.quantity}</p> */}
                                        <p className='semester'>Semester: {item.semester}</p>
                                    </div>
                                </div>
                            );
                        } else {
                            return null; // Don't render if book is not available
                        }
                    })
                )}
            </div>
        </>
    );
}

export default Availability;
