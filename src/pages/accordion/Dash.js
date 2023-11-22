import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Dash = () => {
  const { angka } = useParams();
  const [data, setData] = useState([]);
  const [dataYear, setDataYear] = useState("");
  // tahun
  const tahunSekarang = new Date().getFullYear();
  let thisYear = tahunSekarang.toString();
  const tahunLalu = tahunSekarang - 1;
  let lastYear = tahunLalu.toString();


  useEffect(() => {
    if (angka === "1") {
      // Panggil fetchData di dalam useEffect setelah setDataYear
      setDataYear(lastYear);
    }
  }, [angka]);

  useEffect(() => {
      let url = `http://127.0.0.1:5000/api/rekap-pbg?tahun=${dataYear}`;
    fetchData(url);
  }, [dataYear]);

  const fetchData = (url) => {
    axios
      .get(url)
      .then((response) => {
        console.log("ini tahun data:",dataYear);
        const newData = response.data.data;
        const totalPageAll = response.data.total_page;
        const page = response.data.current_page;
        setData(newData.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Ini Office</h1>
    </div>
  );
};

export default Dash;
