import NavigationBar from "../../components/NavigationsBar";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  faList,
  faTimes,
  faExclamationCircle,
  faGreaterThan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { async } from "q";

const Table = () => {
  const { angka } = useParams();
  console.log(angka);
  //kiri -> getter, kanan -> setter
  const date = new Date().getDate();
  const month = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();

  const itemsPerPage = 10; // Jumlah data per halaman
  const [data, setData] = useState([]);
  const [dataDeviasi, setDataDeviasi] = useState([]);
  const [dataInformasi, setDataInformasi] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPotensi, setSelectedPotensi] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenInformasi, setIsDialogOpenInformasi] = useState(false);
  const [selectRowData, setSelectRowData] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  let sheetId = "1eeyCizwEH8DMpUBW4x0w2rZTv3pc3xNjE18r2uyx1IY";
  let sheetName = encodeURIComponent("Bagan 2023");
  let apiKey = "AIzaSyA8bz--_nRrVAoCmttaoIA1WpYp8Xn7Wp8";

  let sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

  // let sheetId = "1eeyCizwEH8DMpUBW4x0w2rZTv3pc3xNjE18r2uyx1IY";
  // let sheetName = encodeURIComponent("Data");
  // let apiKey = "AIzaSyB2WHCLlhqILOtiAih_xam8y7-znaT829s";

  // let sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;
  // let url = "http://localhost:5000/api/rekap-pbg/";
  let url = "https://sibedaspbg.bandungkab.go.id/api/rekap-pbg/";

  // tahun
  const tahunSekarang = new Date().getFullYear();
  let thisYear = tahunSekarang.toString();
  const tahunLalu = tahunSekarang - 1;
  let lastYear = tahunLalu.toString();
  
  useEffect(() => {
    if (angka === "berkasTerbitLast") {
      // setSelectedStatus("Perbaikan Ulang");
      // setSelectedPotensi("Kecil");
      setSelectedYear(lastYear);
    }else if ( angka === "totalBerkasNow"){
      setSelectedYear(thisYear);
    }else if (angka === "belumTerVerif"){
      setSelectedYear(thisYear);
      setSelectedStatus("Perbaikan Ulang");
      setSelectedStatus("Verifikasi Ulang");
    }else if (angka === "berkasTerVerif"){
      setSelectedYear(thisYear);
      setSelectedStatus("Selesai Verifikasi");
    }else if (angka === "usaha"){
      setSelectedYear(thisYear);
      setSelectedStatus("Selesai Verifikasi");
      setSelectedPotensi("Besar");
    }else if (angka === "nonUsaha"){
      setSelectedYear(thisYear);
      setSelectedStatus("Perbaikan Ulang");
      setSelectedPotensi("Kecil");
    }
    fetchData();
    fetchDataDeviasi();
  }, []);

  const fetchData = () => {
    axios
      .get(url)
      .then((response) => {
        // console.log(response);
        const newData = response.data;
        // console.log(newData[0]['KRK/KKPR']);
        setData(newData.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchDataDeviasi = () => {
    axios
      // .get("https://sibedaspbg.bandungkab.go.id/api/simbg/coba")
      .get(sheetUrl)
      .then((response) => {
        let datas = response.data.values;
        let deviasi_target_potensi_rp = datas[4][11];

        setDataDeviasi({
          deviasi_target_potensi_rp: deviasi_target_potensi_rp,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fechDataInformasi = (nomor) => {
    axios
      // .get(`http://localhost:5000/api/lacak/${nomor}`)
      .get(`https://sibedaspbg.bandungkab.go.id/api/lacak/${nomor}`)
      .then((res) => {
        let Informasi = res.data;

        setDataInformasi(Informasi);
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
    const potensiValueString = row["Nilai Retribusi Keseluruhan"] || ""; // Menggunakan nilai default string kosong jika elemen tidak ada
    const potensiValue = parseInt(
      potensiValueString
        .replace("Rp", "")
        .replace(".", "")
        .replace(".", "")
        .replace(".", "")
    );
    // console.log(row);
    // const meetsSearchTerm = row.some((cell) =>
    //   cell.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    const meetsSearchTerm = Object.values(row).some(
      (cell) =>
        typeof cell === "string" &&
        cell.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const meetsStatusCriteria =
      selectedStatus === "" ||
      row["Status Permohonan"]?.toLowerCase() === selectedStatus.toLowerCase();

    const meetsYearCriteria =
      selectedYear === "" ||
      row["Tahun"]?.toLowerCase() === selectedYear.toLowerCase();

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
  // const

  const handleMouseEnter = (event) => {
    const rect = event.target.getBoundingClientRect();
    setPopupPosition({ top: rect.bottom, left: rect.left });
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  // console.log(currentData);

  //tahun select
  const tahunOptions = [];

  for (let tahun = 2021; tahun <= tahunSekarang; tahun++) {
    tahunOptions.push(tahun);
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
    setSelectedYear(event.target.value);
  };

  const openDialog = (rowData) => {
    setIsDialogOpen(true);
    setSelectRowData(rowData);
  };

  const openDialogInformasi = (nomor) => {
    fechDataInformasi(nomor);
    setIsDialogOpenInformasi(true);
  };
  const closeDialogInformasi = () => {
    setIsDialogOpenInformasi(false);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectRowData("");
  };

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("dialog-overlay")) {
      closeDialog();
      closeDialogInformasi();
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
                {dataDeviasi && (
                  <span className="inter-20 fc-white fw-500 pd-5">
                    Rp {dataDeviasi.deviasi_target_potensi_rp},-
                  </span>
                )}
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
                {tahunOptions.map((tahun, index) => (
                  <option key={index} value={tahun}>
                    {tahun}
                  </option>
                ))}
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
              <div
                className="legend"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon
                  className="iconLegend"
                  icon={faExclamationCircle}
                />
              </div>
              {showPopup && (
                <div
                  className="popupLegend"
                  style={{
                    position: "absolute",
                    top: "480px",
                    left: "1000px",
                  }}
                >
                  <div>
                    <p className="notePopup">Note</p>
                  </div>

                  <div className="clm-12">
                    <div className="container-colom">
                      <div className="lengkap"></div>
                      <div className="icon-grather-container">
                        <FontAwesomeIcon
                          className="icon-grather"
                          icon={faGreaterThan}
                        ></FontAwesomeIcon>
                      </div>
                      <div className="legend-ket">
                        <p>Lengkap</p>
                      </div>
                    </div>
                  </div>
                  <div className="clm-12">
                    <div className="container-colom">
                      <div className="tidak-lengkap"></div>
                      <div className="icon-grather-container">
                        <FontAwesomeIcon
                          className="icon-grather"
                          icon={faGreaterThan}
                        ></FontAwesomeIcon>
                      </div>
                      <div className="legend-ket">
                        <p>Tidak Lengkap</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="table-container ">
              <div className="horizontal-scroll">
                <table className="datatab">
                  <thead>
                    <tr className="bg-grey">
                      <th>Catatan Kekurangan</th>
                      <th>Informasi</th>
                      <th>No. Registrasi</th>
                      <th>Nama Pemilik</th>
                      <th>Lokasi BG</th>
                      <th>Tgl Permohonan</th>
                      <th>Status</th>
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
                      {/* <th>Verifikasi</th>
                      <th>Tanggal Log</th>
                      <th>Keterangan Log</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((row, index) => (
                        <tr
                          key={index}
                          style={{
                            backgroundColor:
                              row["LH"] !== "Ada" ||
                              row["SKA"] !== "Ada" ||
                              row["KRK/KKPR"] !== "Ada"
                                ? "#D29F9F"
                                : "",
                          }}
                        >
                          <td>
                            <div className="center">
                              <button
                                className="buttonIcon"
                                onClick={() =>
                                  openDialog(row["Catatan Kekurangan Dokumen"])
                                }
                              >
                                <FontAwesomeIcon icon={faList} />
                              </button>
                            </div>
                          </td>
                          <td>
                            <div className="center">
                              <button
                                className="buttonIcon"
                                onClick={() =>
                                  openDialogInformasi(row["No. Registrasi"])
                                }
                              >
                                <FontAwesomeIcon icon={faList} />
                              </button>
                            </div>
                          </td>
                          <td>{row["No. Registrasi"]}</td>
                          <td>{row["Nama Pemilik"]}</td>
                          <td>{row["Lokasi BG"]}</td>
                          <td>{row["Tgl Permohonan"]}</td>
                          <td>{row["Status Permohonan"]}</td>
                          <td>{row["BA TPA/TPT"]}</td>
                          <td>{row["GAMBAR"]}</td>
                          <td>{row["KRK/KKPR"]}</td>
                          <td>{row["LH"]}</td>
                          <td>{row["SKA"]}</td>
                          <td>{row["Validasi Dinas"]}</td>
                          <td>{row["PTSP"]}</td>
                          <td>{row["Selesai Terbit"]}</td>
                          <td>{row["Tanggal"]}</td>
                          <td>{row["Penerimaan PAD"]}</td>
                          <td>{row["SKRD"]}</td> {/* skrd */}
                          <td>{row["Usulan Retribusi"]}</td>
                          <td>{row["Nilai Retribusi Keseluruhan"]}</td>
                          <td>{row["Nama Bangunan"]}</td>
                          <td>{row["Alamat Pemilik"]}</td>
                          <td>{row["No. Hp"]}</td>
                          <td>{row["KODE WHATSAPP"]}</td>
                          <td>{row["28/8"]}</td> {/*2/8*/}
                          <td>{row["Keterangan"]}</td>
                          <td>{row["TTD KADIS"]}</td>
                          <td>{row["Selesai Terbit"]}</td>
                          <td>{row[""]}</td>
                          <td>{row["Tahun"]}</td>
                          <td className="bg-green">
                            {row["Jenis Konsultasi"]}
                          </td>
                          <td className="bg-green">{row["Fungsi BG"]}</td>
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
            <div className="container-colom">
              <div className="clm-6">
                <p className="fs-25 fw-500">Catatan Kekurangan</p>
              </div>
              <div className="clm-6 flex-x-end">
                <button className="buttonClose" onClick={closeDialog}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>
            <p>{selectRowData}</p>
            {/* <button className="close-dialog" onClick={closeDialog}>Tutup</button> */}
          </dialog>
        </div>
      )}

      {isDialogOpenInformasi && (
        <div className="dialog-overlay" onClick={handleOverlayClick}>
          <dialog open className="dialogInformasi">
            <div className="container-colom">
              <div className="clm-6">
                <p className="fs-25 fw-500">Informasi</p>
              </div>
              <div className="clm-6 flex-x-end">
                <button className="buttonClose" onClick={closeDialogInformasi}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>
            <div className="container-clom">
              <div
                className="horizontal-scroll"
                style={{ maxHeight: "500px", overflowY: "auto" }}
              >
                <table className="tableDialog">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Modul</th>
                      <th>Tanggal</th>
                      <th>Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataInformasi.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item["Modul"]}</td>
                        <td>{item["Tanggal"]}</td>
                        <td>{item["Keterangan"]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default Table;
