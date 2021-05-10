import axios from "axios";
import { useState, useEffect } from "react";
import Loaf1 from "./Photos/loaf.png";
import Loaf2 from "./Photos/loaf2.png";
import Loaf3 from "./Photos/loaf3.png";
import Man from "./Photos/man.png";

// updated to receive data from backend query
const Websitelist = () => {
  return axios.post("https://comp0067.herokuapp.com/websitelist");
};

export default Websitelist;
