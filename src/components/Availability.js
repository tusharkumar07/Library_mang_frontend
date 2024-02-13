import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import '../style/departments.css';

const Availability = () => {
    const [data, setData] = useState([]);
    const [detail, setDetail] = useState([]);

    useEffect(() => {
        getInfo();
        getIssuedBooks();
    }, []);

    const getInfo = () => {
        axios.get("http://localhost:5000/apiCse")
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getIssuedBooks = () => {
        axios.get("http://localhost:5000/details")
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
                {data.map((item) => {
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
                })}
            </div>
        </>
    );
}

export default Availability;
