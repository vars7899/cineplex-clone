import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  // ! Global states for App
  const [user, setUser] = useState();
  const [time, setTime] = useState();
  const [location, setLocation] = useState();
  const [date, setDate] = useState();
  const [seat, setSeat] = useState([]);
  const [movieName, setMovieName] = useState();
  const [theatreName, setTheatreName] = useState();
  const [standardTicket, setStandardTicket] = useState(0);
  const [balconyTicket, setBalconyTicket] = useState(0);
  const [dBoxTicket, setDBoxTicket] = useState(0);
  const [total, setTotal] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [theatreId, setTheatreId] = useState();
  const [movieId, setMovieId] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);

  // ! Get User information from the local storage
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("cineplex-user"));
    setUser(userInfo);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        time,
        setTime,
        location,
        setLocation,
        date,
        setDate,
        seat,
        setSeat,
        movieName,
        setMovieName,
        theatreName,
        setTheatreName,
        standardTicket,
        setStandardTicket,
        dBoxTicket,
        setDBoxTicket,
        balconyTicket,
        setBalconyTicket,
        total,
        setTotal,
        taxPrice,
        setTaxPrice,
        serviceCharge,
        setServiceCharge,
        subTotal,
        setSubTotal,
        theatreId,
        setTheatreId,
        movieId,
        setMovieId,
        selectedSeats,
        setSelectedSeats,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const UserState = () => {
  return useContext(UserContext);
};
