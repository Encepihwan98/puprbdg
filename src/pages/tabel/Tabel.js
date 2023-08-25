import NavigationBar from "../../components/NavigationsBar";
import { Link } from "react-router-dom";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const [selectedYear, setSelectedYear] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectRowData, setSelectRowData] = useState('');

  let sheetId = "1eeyCizwEH8DMpUBW4x0w2rZTv3pc3xNjE18r2uyx1IY";
  let sheetName = encodeURIComponent("logbook");
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

  const links = document.querySelectorAll(".date-today ul li a");

  // Loop melalui tautan dan tambahkan event listener
  links.forEach((link) => {
    link.addEventListener("click", () => {
      // Hapus kelas "active" dari semua tautan sebelumnya
      links.forEach((link) => link.classList.remove("active"));

      // Tambahkan kelas "active" ke tautan yang sedang aktif
      link.classList.add("active");
    });
  });

  const filteredData = data.filter((row) => {
    const potensiValueString = row[31] || ""; // Menggunakan nilai default string kosong jika elemen tidak ada
    const potensiValue = parseInt(
      potensiValueString
        .replace("Rp", "")
        .replace(".", "")
        .replace(".", "")
        .replace(".", "")
    );
    // console.log(row[2], potensiValue);
    const meetsSearchTerm = row.some((cell) =>
      cell.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const meetsStatusCriteria =
      selectedStatus === "" ||
      row[7]?.toLowerCase() === selectedStatus.toLowerCase();

    const meetsYearCriteria =
      selectedYear === "" ||
      row[37]?.toLowerCase() === selectedYear.toLowerCase();

    const meetsPotensiCriteria =
      selectedPotensi === "" ||
      (selectedPotensi === "Besar" && potensiValue > 50000000) || // Lebih dari 50 juta
      (selectedPotensi === "Kecil" && potensiValue <= 50000000); // Kurang dari atau sama dengan 50 juta
    return (
      meetsSearchTerm &&
      meetsStatusCriteria &&
      meetsPotensiCriteria &&
      meetsYearCriteria
    );
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
  const handleYearChange = (event) => {
    console.log(event);
    setSelectedYear(event.target.value);
  };

  const openDialog = (rowData) => {
    setIsDialogOpen(true);
    setSelectRowData(rowData);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectRowData('');
  };

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains('dialog-overlay')) {
      closeDialog();
    }
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
              <select
                className="mlf-10 selectOptionst"
                value={selectedYear}
                onChange={handleYearChange}
              >
                <option value={""}>Tahun</option>
                {tahunOptions}
              </select>
              <select
                className="mlf-10 selectOptionst"
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <option value={""}>Status</option>
                <option value={"Perbaikan Ulang"}>Perbaikan Ulang</option>
                <option value={"Selesai Verifikasi"}>Selesai Verifikasi</option>
                <option value={"Verifikasi Ulang"}>Verifikasi Ulang</option>
              </select>
              <select
                className="mlf-10 selectOptionst"
                value={selectedPotensi}
                onChange={handlePotensiChange}
              >
                <option value={""}>Potensi</option>
                <option value={"Kecil"}>Kecil</option>
                <option value={"Besar"}>Besar</option>
              </select>
            </div>
            <div className="table-container ">
              <div className="horizontal-scroll">
                <table className="datatab">
                  <thead>
                    <tr className="bg-grey">
                      <th>No Registrasi</th>
                      <th>Nama Pemilik</th>
                      <th>Lokasi BG</th>
                      <th>Tgl Permohonan</th>
                      <th>Status</th>
                      <th>Catatan Kekurangan Dokumen</th>
                      <th>BA TPA/TPT</th>
                      <th>Gambar</th>
                      <th>KRK/KKPR</th>
                      <th>LH</th>
                      <th>SKA</th>
                      <th>Validasi Dinas</th>
                      <th>PTSP</th>
                      <th>Selesai Terbit</th>
                      <th>Tanggal Pembayaran</th>
                      <th>Penerimaan PAD</th>
                      <th>SKRD</th>
                      <th>Usulan Retribusi</th>
                      <th>Nilai Retribusi</th>
                      <th>Nama Bangungan</th>
                      <th>Alamat Pemilik</th>
                      <th>No Hp</th>
                      <th>Kode WA</th>
                      <th>2/8</th>
                      <th>Keterangan Kontrak</th>
                      <th>TTD KADIS</th>
                      <th>Tahun Terbit</th>
                      <th>Tahun Berjalan</th>
                      <th>Tahun</th>
                      <th className="bg-green">Jenis Konsultasi</th>
                      <th className="bg-green">Fungsi BG</th>
                      <th>Verivikasi</th>
                      <th>Tanggal Log</th>
                      <th>Keterangan Log</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((row, index) => (
                        <tr key={index}>
                          <td>{row[0]}</td>
                          <td>{row[1]}</td>
                          <td>{row[2]}</td>
                          <td>{row[3]}</td>
                          <td>{row[4]}</td>
                          <td>
                            <div className="center">
                              <button
                                className="buttonIcon bg-green"
                                onClick={() => openDialog(row[5])}
                              >
                                <FontAwesomeIcon icon={faUser} />
                              </button>
                            </div>
                          </td>
                          <td>{row[6]}</td>
                          <td>{row[7]}</td>
                          <td>{row[8]}</td>
                          <td>{row[9]}</td>
                          <td>{row[10]}</td>
                          <td>{row[11]}</td>
                          <td>{row[12]}</td>
                          <td>{row[13]}</td>
                          <td>{row[14]}</td>
                          <td>{row[15]}</td>
                          <td>{row[16]}</td>
                          <td>{row[17]}</td>
                          <td>{row[18]}</td>
                          <td>{row[19]}</td>
                          <td>{row[20]}</td>
                          <td>{row[21]}</td>
                          <td>{row[22]}</td>
                          <td>{row[23]}</td>
                          <td>{row[24]}</td>
                          <td>{row[25]}</td>
                          <td>{row[26]}</td>
                          <td>{row[27]}</td>
                          {/* <td>{row[28]}</td> */}
                          <td>{row[29]}</td>
                          <td className="bg-green">{row[30]}</td>
                          <td className="bg-green">{row[31]}</td>
                          {/* <td>{row[32]}</td>
                          <td>{row[33]}</td>
                          <td>{row[34]}</td> */}
                          {/* <td>{row[35]}</td> */}
                          {/* <td>{row[36]}</td>
                          <td>{row[37]}</td>
                          <td>{row[38]}</td>
                          <td>{row[39]}</td>
                          <td>{row[40]}</td> */}
                          <td>{row[41]}</td>
                          <td>{row[42]}</td>
                          <td>{row[43]}</td>
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
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isDialogOpen && (
        <div className="dialog-overlay" onClick={handleOverlayClick}>
          <dialog open className="dialog">
            <h4>Catatan Kekurangan</h4>
            <p>{selectRowData}</p>
            {/* <button className="close-dialog" onClick={closeDialog}>Tutup</button> */}
          </dialog>
        </div>
      )}
    </div>
  );
};

export default FixDashboard;
