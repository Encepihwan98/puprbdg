import NavigationBar from "../../components/NavigationsBar";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import Select from "react-select";
import queryString from "query-string";
import {
  faList,
  faTimes,
  faExclamationCircle,
  faGreaterThan,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { async } from "q";

const options = [
  {
    value: "Verifikasi Kelengkapan Operator",
    label: "Verifikasi Kelengkapan Operator",
  },
  {
    value: "Dikembalikan Untuk Revisi Dokumen",
    label: "Dikembalikan Untuk Revisi Dokumen",
  },
  { value: "Verifikasi Ulang", label: "Verifikasi Ulang" },
  { value: "Perbaikan Dokumen", label: "Perbaikan Dokumen" },
  { value: "Menunggu Penugasan TPT/TPA", label: "Menunggu Penugasan TPT/TPA" },
  {
    value: "Menunggu Penjadwalan Konsultasi",
    label: "Menunggu Penjadwalan Konsultasi",
  },
  { value: "Konsultasi", label: "Konsultasi" },
  { value: "Perhitungan Retribusi", label: "Perhitungan Retribusi" },
  {
    value: "Selesai Penilaian Konsultasi",
    label: "Selesai Penilaian Konsultasi",
  },
  { value: "Pengiriman SKRD", label: "Pengiriman SKRD" },
  {
    value: "Menunggu Pembayaran Retribusi",
    label: "Menunggu Pembayaran Retribusi",
  },
  {
    value: "Menunggu Validasi Retribusi",
    label: "Menunggu Validasi Retribusi",
  },
  { value: "Menunggu Pengambilan Izin", label: "Menunggu Pengambilan Izin" },
  { value: "Penugasan Inspeksi", label: "Penugasan Inspeksi" },
];
const Table2 = () => {
  const { angka } = useParams();
  // console.log(angka);
  //kiri -> getter, kanan -> setter
  const [loading, setLoading] = useState(true);
  const date = new Date().getDate();
  const month = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();

  const itemsPerPage = 10; // Jumlah data per halaman
  const [data, setData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [totalPage, setTotalPage] = useState([]);
  const [dataDeviasi, setDataDeviasi] = useState([]);
  const [dataInformasi, setDataInformasi] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedPotensi, setSelectedPotensi] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenInformasi, setIsDialogOpenInformasi] = useState(false);
  const [selectRowData, setSelectRowData] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [selectedOption, setSelectedOption] = useState(null);

  let sheetId = "1eeyCizwEH8DMpUBW4x0w2rZTv3pc3xNjE18r2uyx1IY";
  let sheetName = encodeURIComponent("Bagan 2023");
  let apiKey = "AIzaSyA8bz--_nRrVAoCmttaoIA1WpYp8Xn7Wp8";

  let sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

  // let sheetId = "1eeyCizwEH8DMpUBW4x0w2rZTv3pc3xNjE18r2uyx1IY";
  // let sheetName = encodeURIComponent("Data");
  // let apiKey = "AIzaSyB2WHCLlhqILOtiAih_xam8y7-znaT829s";

  // let sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;
  // let url = "http://localhost:5000/api/rekap-pbg/";
  // let param = "";
  // let url = `http://127.0.0.1:5000/api/rekap-pbg/?page=${currentPage}`;

  // tahun
  const tahunSekarang = new Date().getFullYear();
  let thisYear = tahunSekarang.toString();
  const tahunLalu = tahunSekarang - 1;
  let lastYear = tahunLalu.toString();

  useEffect(() => {
    if (angka === "berkasTerbitLast") {
      setSelectedYear(lastYear);
    } else if (angka === "totalBerkasNow") {
      setSelectedYear(thisYear);
    } else if (angka === "belumTerVerif") {
      setSelectedYear(thisYear);
      setSelectedStatus([
        { value: "Perbaikan Ulang", label: "Perbaikan Ulang" },
        { value: "Verifikasi Ulang", label: "Verifikasi Ulang" },
      ]);
    } else if (angka === "berkasTerVerif") {
      setSelectedYear(thisYear);
      setSelectedStatus([
        { value: "Selesai Verifikasi", label: "Selesai Verifikasi" },
      ]);
    } else if (angka === "usaha") {
      setSelectedYear(thisYear);
      setSelectedStatus([
        { value: "Perbaikan Ulang", label: "Perbaikan Ulang" },
        { value: "Verifikasi Ulang", label: "Verifikasi Ulang" },
      ]);
      setSelectedPotensi("Besar");
    } else if (angka === "nonUsaha") {
      setSelectedYear(thisYear);
      setSelectedStatus([
        { value: "Perbaikan Ulang", label: "Perbaikan Ulang" },
        { value: "Verifikasi Ulang", label: "Verifikasi Ulang" },
      ]);
      setSelectedPotensi("Kecil");
    } else if (angka === "test") {
      setSelectedYear(thisYear);
      setSelectedStatus([
        { value: "Perbaikan Dokumen", label: "Perbaikan Dokumen" },
      ]);
      setSelectedPotensi("Kecil");
    } else if (
      angka === "terproses_di_ptsp" ||
      angka === "terproses_di_ptsp14" ||
      angka === "berkas_aktual_terverifikasi_dinas_teknis14" ||
      angka === "berkas_aktual_terverifikasi_dinas_teknis" ||
      angka === "berkas_aktual_belum_terverifikasi14" ||
      angka === "berkas_aktual_belum_terverifikasi" ||
      angka === "terproses_di_dputr" ||
      angka === "terproses_di_dputr14" ||
      angka === "proses_penerbitan" ||
      angka === "proses_penerbitan14" ||
      angka === "potensi_kecil14" ||
      angka === "potensi_besar14"
    ) {
      setSelectedFilter(angka);
    }else {
      // Hanya menjalankan API call nomor 1 jika angka tidak sesuai dengan filtered
      const queryParams = {
        page: currentPage,
        tahun: selectedYear,
        potensi: selectedPotensi,
        filtered: "",
        status: "",
      };
  
      const url = `http://127.0.0.1:5000/api/rekap-pbg2/?${queryString.stringify(
        queryParams
      )}`;
      fetchData(url);
      return; // Keluar dari useEffect setelah menjalankan API call nomor 1
    }

    // fetchData();
  }, [selectedYear]);

  useEffect(() => {
    if (
      selectedFilter === "terproses_di_ptsp" ||
      selectedFilter === "terproses_di_ptsp14" ||
      selectedFilter === "berkas_aktual_terverifikasi_dinas_teknis14" ||
      selectedFilter === "berkas_aktual_terverifikasi_dinas_teknis" ||
      selectedFilter === "berkas_aktual_belum_terverifikasi14" ||
      selectedFilter === "berkas_aktual_belum_terverifikasi" ||
      selectedFilter === "terproses_di_dputr" ||
      selectedFilter === "terproses_di_dputr14" ||
      selectedFilter === "proses_penerbitan" ||
      selectedFilter === "proses_penerbitan14" ||
      selectedFilter === "potensi_kecil14" ||
      selectedFilter === "potensi_besar14"
    ) {
      handleTest();
      fetchDataDeviasi();
    }
  }, [selectedStatus, selectedFilter]);

  const fetchData = (url) => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        // console.log(response);
        const newData = response.data.data;
        const totalPageAll = response.data.total_page;
        const page = response.data.current_page;
        console.log("ini test tahun ke : ", selectedYear);
        // console.log("ini page", response.data.current_page);
        // console.log(newData);
        setData(newData.reverse());
        setTotalPage(totalPageAll);
        setCurrentPage(page);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 300);
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
    setLoading(true);
    axios
      // .get(`http://localhost:5000/api/lacak/${nomor}`)
      .get(`https://sibedaspbg.bandungkab.go.id/api/lacak/${nomor}`)
      .then((res) => {
        let Informasi = res.data;

        setDataInformasi(Informasi);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 300);
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

  const handleMouseEnter = (event) => {
    const rect = event.target.getBoundingClientRect();
    setPopupPosition({ top: rect.bottom, left: rect.left });
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  const handleTest = () => {
    console.log("ini page tahun ke : ", selectedYear);
    var valuesStatus = selectedStatus.map((item) => item.value);
    const resultString = valuesStatus.join(", ");
    const queryParams = {
      page: currentPage,
      tahun: selectedYear,
      potensi: selectedPotensi,
      filtered: selectedFilter,
      status: selectedStatus.map((status) => status.value).join(","),
    };

    const url = `http://127.0.0.1:5000/api/rekap-pbg2/?${queryString.stringify(
      queryParams
    )}`;
    fetchData(url);
  };

  // const totalPages = Math.ceil(data.length / itemsPerPage);
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data;
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

  const handleSearchButtonClick = () => {
    // Logika pencarian atau tindakan lainnya dapat ditambahkan di sini
    console.log("Button clicked! Searching for:", searchTerm);
    const queryParams = {
      page: currentPage,
      tahun: selectedYear,
      potensi: selectedPotensi,
      filtered: selectedFilter,
      search: searchTerm,
      status: selectedStatus.map((status) => status.value).join(","),
    };

    const url = `http://127.0.0.1:5000/api/rekap-pbg2/?${queryString.stringify(
      queryParams
    )}`;
    fetchData(url);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event);

    const queryParams = {
      page: currentPage,
      tahun: selectedYear,
      potensi: selectedPotensi,
      filtered: selectedFilter,
      search: searchTerm,
      status: selectedStatus.map((status) => status.value).join(","),
    };

    const url = `http://127.0.0.1:5000/api/rekap-pbg2/?${queryString.stringify(
      queryParams
    )}`;
    fetchData(url);
  };

  const handlePotensiChange = (event) => {
    let newPotensi = event.target.value;
    setSelectedPotensi(newPotensi);

    const queryParams = {
      page: currentPage,
      tahun: selectedYear,
      potensi: newPotensi,
      filtered: selectedFilter,
      search: searchTerm,
      status: selectedStatus.map((status) => status.value).join(","),
    };

    const url = `http://127.0.0.1:5000/api/rekap-pbg2/?${queryString.stringify(
      queryParams
    )}`;
    fetchData(url);
  };

  const handleYearChange = (newYear) => {
    setSelectedYear(newYear);
    const queryParams = {
      page: currentPage,
      tahun: newYear,
      potensi: selectedPotensi,
      filtered: selectedFilter,
      search: searchTerm,
      status: selectedStatus.map((status) => status.value).join(","),
    };

    const url = `http://127.0.0.1:5000/api/rekap-pbg2/?${queryString.stringify(
      queryParams
    )}`;
    fetchData(url);
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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);

    const queryParams = {
      page: newPage,
      tahun: selectedYear,
      potensi: selectedPotensi,
      filtered: selectedFilter,
      search: searchTerm,
      status: selectedStatus.map((status) => status.value).join(","),
    };

    const url = `http://127.0.0.1:5000/api/rekap-pbg2/?${queryString.stringify(
      queryParams
    )}`;
    fetchData(url);
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
              <li className="bg-blue br-10">
                <Link to="/tabel/0" type="button">
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
              <button
                type="text"
                onClick={handleSearchButtonClick}
                className="searchBtn"
              >
                <FontAwesomeIcon
                  className=""
                  icon={faMagnifyingGlass}
                ></FontAwesomeIcon>
              </button>
            </div>
            <div className="container-colom2 mlf-15 mtp-10">
              <select
                className="mlf-10 selectOptionst"
                value={selectedYear}
                onChange={(e) => handleYearChange(e.target.value)}
              >
                <option value={""}>Tahun</option>
                {tahunOptions.map((tahun, index) => (
                  <option key={index} value={tahun}>
                    {tahun}
                  </option>
                ))}
              </select>
              <Select
                className="mlf-10"
                value={selectedStatus}
                onChange={handleStatusChange}
                placeholder="Status"
                options={options}
                isMulti
                style={{ borderRadius: "10px", border: "1px solid black" }}
              />
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
                    {loading ? (
                      <tr>
                        <td colSpan="32" style={{ textAlign: "center" }}>
                          <div
                            style={{
                              marginLeft: "600px",
                              marginTop: "100px",
                              marginBottom: "100px",
                            }}
                          >
                            <Loading />
                          </div>
                        </td>
                      </tr>
                    ) : currentData.length > 0 ? (
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
                          <td>{row["Status"]}</td>
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
                          <td>{row["Capitals"]}</td>
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
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>

                  {Array.from(
                    { length: totalPage > 5 ? 5 : totalPage },
                    (_, index) => {
                      const pageNumber = currentPage - 2 + index;
                      if (pageNumber > 0 && pageNumber <= totalPage) {
                        return (
                          <button
                            key={index}
                            className={
                              currentPage === pageNumber ? "active" : ""
                            }
                            onClick={() => handlePageChange(pageNumber)}
                          >
                            {pageNumber}
                          </button>
                        );
                      }
                      return null;
                    }
                  )}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPage}
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
                  <tbody className="">
                    {loading ? (
                      <tr>
                        <div
                          style={{ marginLeft: "500px", marginTop: "100px" }}
                        >
                          <Loading />
                        </div>
                      </tr>
                    ) : (
                      dataInformasi.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item["Modul"]}</td>
                          <td>{item["Tanggal"]}</td>
                          <td>{item["Keterangan"]}</td>
                        </tr>
                      ))
                    )}
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

export default Table2;
