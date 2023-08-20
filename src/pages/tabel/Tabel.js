import NavigationBar from "../../components/NavigationsBar";
import { Link } from "react-router-dom";

import React, { useState, useEffect } from "react";
import axios from "axios";
// import { async } from "q";

const FixDashboard = () => {
  //kiri -> getter, kanan -> setter
  const date = new Date().getDate();
  const month = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();

  const itemsPerPage = 10; // Jumlah data per halaman
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPotensi, setSelectedPotensi] = useState("");

  let sheetId = "1eeyCizwEH8DMpUBW4x0w2rZTv3pc3xNjE18r2uyx1IY";
  let sheetName = encodeURIComponent("Data");
  let apiKey = "AIzaSyB2WHCLlhqILOtiAih_xam8y7-znaT829s";

  let sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(sheetUrl)
      .then((response) => {
        const newData = response.data.values.slice(1); // Mengabaikan header
        // console.log(newData);
        setData(newData.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filteredData = data.filter((row) => {
    const potensiValueString = row[35] || ""; // Menggunakan nilai default string kosong jika elemen tidak ada
    const potensiValue = parseInt(potensiValueString.replace("Rp", "").replace(".", "").replace(".", "").replace(".", ""));
    console.log(row[2], potensiValue);
    const meetsSearchTerm = row.some((cell) =>
        cell.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const meetsStatusCriteria = selectedStatus === "" || row[8]?.toLowerCase() === selectedStatus.toLowerCase();

    const meetsPotensiCriteria =
        selectedPotensi === "" ||
        (selectedPotensi === "Besar" && potensiValue > 50000000) || // Lebih dari 50 juta
        (selectedPotensi === "Kecil" && potensiValue <= 50000000); // Kurang dari atau sama dengan 50 juta

    return meetsSearchTerm && meetsStatusCriteria && meetsPotensiCriteria;
});


  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // tahun
  const tahunSekarang = new Date().getFullYear();
  const tahunOptions = [];

  for (let tahun = 2021; tahun <= tahunSekarang; tahun++) {
    tahunOptions.push(
      <option key={tahun} value={tahun}>
        {tahun}
      </option>
    );
  }

  // serch data
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };
  const handlePotensiChange = (event) => {
    setSelectedPotensi(event.target.value);
  };

  return (
    <div>
      <NavigationBar />
      <div className="custom-container mt-4">
        <div className="row1 card">
          <div className="container-colom">
            <div className="flex-x-start">
              <span className="inter-25 fw-500 text-pad">
                Target PAD {currentYear}:
              </span>
              <div className="card bg-blue  card-pad">
                <span className="inter-20 fw-500 pd-5">
                  Rp 25.085.584.721,-
                </span>
              </div>
            </div>
            <div className="flex-x-end">
              <span className="inter-25 fw-500 text-pad">
                Deviasi Target dengan Potensi Total Berkas:
              </span>
              <div className="card bg-red  card-pad">
                <span className="inter-20 fc-white fw-500 pd-5">
                  Rp 7.665.893.953,-
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* row tanggal  */}
        <div className="row-tgl mtp-25 flex-x-center">
          <div className="date-today container-colom">
            <ul>
              <li>
                <Link to="/" type="button">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/Tabel" type="button">
                  Tabel
                </Link>
              </li>
            </ul>
            <p className="inter-25 fw-500 m-10">
              {date} {month} {currentYear}
            </p>
          </div>
        </div>

        <div className="baris flex-x-center">
          <div className="row-tab">
            <div className="center mtp-20">
              <input
                type="text"
                placeholder="Search"
                className="serch"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="container-colom2 mlf-15 mtp-10">
              <select className="mlf-10 selectOptionst">
                <option>Tahun</option>
                {tahunOptions}
              </select>
              <select
                className="mlf-10 selectOptionst"
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <option>Status</option>
                <option value={"Perbaikan Ulang"}>Perbaikan Ulang</option>
                <option value={"Selesai Verifikasi"}>Selesai Verifikasi</option>
                <option value={"Verifikasi Ulang"}>Verifikasi Ulang</option>
              </select>
              <select
                className="mlf-10 selectOptionst"
                value={selectedPotensi}
                onChange={handlePotensiChange}
              >
                <option>Potensi</option>
                <option value={"Kecil"}>Kecil</option>
                <option value={"Besar"}>Besar</option>
              </select>
            </div>
            <div className="table-container ">
              <div className="horizontal-scroll">
                <table className="datatab">
                  <thead>
                    <tr>
                      <th>Jenis Konsultasi</th>
                      <th>No Registrasi</th>
                      <th>Nama Pemilik</th>
                      <th>Lokasi BG</th>
                      <th>Fungsi BG</th>
                      <th>Nama Bangungan</th>
                      <th>Tgl Permohonan</th>
                      <th>Status</th>
                      <th>Verivikasi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((row, index) => (
                        <tr key={index}>
                          <td>{row[1]}</td>
                          <td>{row[2]}</td>
                          <td>{row[3]}</td>
                          <td>{row[4]}</td>
                          <td>{row[5]}</td>
                          <td>{row[6]}</td>
                          <td>{row[7]}</td>
                          <td>{row[8]}</td>
                          <td>{row[9]}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9">No data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="pagination">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>

                  {Array.from(
                    { length: totalPages > 5 ? 5 : totalPages },
                    (_, index) => {
                      const pageNumber = currentPage - 2 + index;
                      if (pageNumber > 0 && pageNumber <= totalPages) {
                        return (
                          <button
                            key={index}
                            className={
                              currentPage === pageNumber ? "active" : ""
                            }
                            onClick={() => setCurrentPage(pageNumber)}
                          >
                            {pageNumber}
                          </button>
                        );
                      }
                      return null;
                    }
                  )}
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
                <br/><br/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixDashboard;
