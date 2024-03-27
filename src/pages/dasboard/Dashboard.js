import NavigationBar from "../../components/NavigationsBar";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import BoxCard from "../../components/BoxCard";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { faChevronDown,  faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChartStacked from "../../components/ChartStacked";
//import ChartStackedVertikal from "../../components/ChartStackedVertikal";
//import ChartStackedHorizontal from "../../components/ChartStackedHorizontal";
import StackedVertikal from "../../components/StackedVertikal";
import MeteranMacetplan from "../../components/MeteranMacetplan";
// import { async } from "q";

const FixDashboard = () => {
  //kiri -> getter, kanan -> setter
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const date = new Date().getDate();
  const month = new Date().toLocaleString("default", { month: "long" });
  let currentYear = new Date().getFullYear();
  let lastYear = currentYear - 1;
  const [selectCurrentYear, setSelectCurrentYear] = useState(currentYear);
  const [selectLastYear, setSelectLastYear] = useState(lastYear);

  const [data, setData] = useState(null);
  const [dataUsaha, setDataUsaha] = useState(null);
  const [dataChartVerifChart, setDataChartVerifChart] = useState(null);
  const [dataChartBelumVerif, setdataChartBelumVerif] = useState(null);

  const [showPopup, setShowPopup] = useState(false);
  const [showPopupPotensiYear, setShowPopupPotensiYear] = useState(false);
  const [showPopupPermohonan1, setShowPopupPermohonan1] = useState(false);
  const [showPopupLegenda, setShowPopupLegenda] = useState(false);
  const [showPopupPTSP, setShowPopupPTSP] = useState(false);
  const [showPopupTerverifikasi, setShowPopupTerverifikasi] = useState(false);
  const [showPopupBelumverifikasi, setShowPopupBelumverifikasi] =
    useState(false);
  const [showPopupDPUTR, setShowPopupDPUTR] = useState(false);
  const [showPopupPotensiKecil, setShowPopupPotensiKecil] = useState(false);
  const [showPopupPotensiBesar, setShowPopupPotensiBesar] = useState(false);
  const [showPopupProsesPenerbitan, setShowPopupProsesPenerbitan] =
    useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenNonUsaha, setIsDialogOpenNonUsaha] = useState(false);

  const [macetplanBelumVerif, setMacetplanBelumVerif] = useState(null);
  const [macetplanAktualVerif, setMacetplanAktualVerif] = useState(null);
  const [macetplanTerbitPbg, setMacetpTerbitPbg] = useState(null);
  const [macetplanPotensiBesar, setMacetpPotensiBesar] = useState(null);
  const [macetplanPotensiKecil, setMacetpPotensiKecil] = useState(null);
  const [macetplanProsesPenerbitan, setMacetpProsesPenerbitan] = useState(null);
  const [macetplanProsesDputr, setMcetpProsesDputr] = useState(null);
  const [macetplanProsesPtsp, setMcetpProsesPtsp] = useState(null);

  const color = ["#00917c", "#c62c11"];
  const color2 = ["#7E0B02", "#c62c11"];
  const coba = [3400000];

  const menuLinks = document.querySelectorAll(".date-today ul li a");

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Remove "active" class from all menu links
      menuLinks.forEach((link) => link.classList.remove("active"));

      // Add "active" class to the clicked menu link
      link.classList.add("active");
    });
  });

  const tahunSekarang = new Date().getFullYear();
  let thisYear = tahunSekarang.toString();
  const tahunLalu = tahunSekarang - 1;

  const tahunOptions = [];

  for (let tahun = 2022; tahun <= tahunSekarang; tahun++) {
    tahunOptions.push(tahun);
  }

  const handleMouseEnter = (event) => {
    const rect = event.target.getBoundingClientRect();
    setPopupPosition({ top: rect.bottom, left: rect.left });
    setShowPopup(true);
  };

  const handleMouseEnterPotensiKecil = (event) => {
    const rect = event.target.getBoundingClientRect();
    setPopupPosition({ top: rect.bottom, left: rect.left });
    setShowPopupPotensiKecil(true);
  };

  const handleMouseEnterPotensiBesar = (event) => {
    const rect = event.target.getBoundingClientRect();
    setPopupPosition({ top: rect.bottom, left: rect.left });
    setShowPopupPotensiBesar(true);
  };

  const handleMouseEnterProsesPenerbitan = (event) => {
    const rect = event.target.getBoundingClientRect();
    setPopupPosition({ top: rect.bottom, left: rect.left });
    setShowPopupProsesPenerbitan(true);
  };

  const handleMouseEnterPotensiYear = (event) => {
    const rect = event.target.getBoundingClientRect();
    setPopupPosition({ top: rect.bottom, left: rect.left });
    setShowPopupPotensiYear(true);
  };

  const handleMouseEnterPTSP = (event) => {
    const rect = event.target.getBoundingClientRect();
    setPopupPosition({ top: rect.bottom, left: rect.left });
    setShowPopupPTSP(true);
  };
  const handleMouseEnterTerverifikasi = (event) => {
    const rect = event.target.getBoundingClientRect();
    setPopupPosition({ top: rect.bottom, left: rect.left });
    setShowPopupTerverifikasi(true);
  };

  const handleMouseEnterBelumverifikasi = (event) => {
    const rect = event.target.getBoundingClientRect();
    setPopupPosition({ top: rect.bottom, left: rect.left });
    setShowPopupBelumverifikasi(true);
  };

  const handleMouseEnterDPUTR = (event) => {
    const rect = event.target.getBoundingClientRect();
    setPopupPosition({ top: rect.bottom, left: rect.left });
    setShowPopupDPUTR(true);
  };

  const handleMouseEnterPermohonan1 = (event) => {
    const rect = event.target.getBoundingClientRect();
    setPopupPosition({ top: rect.bottom, left: rect.left });
    setShowPopupPermohonan1(true);
  };

  const handleMouseEnterLegenda = (event) => {
    const rect = event.target.getBoundingClientRect();
    setPopupPosition({ top: rect.bottom, left: rect.left });
    setShowPopupLegenda(true);
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  const handleMouseLeavePotensiBesar = () => {
    setShowPopupPotensiBesar(false);
  };

  const handleMouseLeavePotensiKecil = () => {
    setShowPopupPotensiKecil(false);
  };

  const handleMouseLeaveProsesPenerbitan = () => {
    setShowPopupProsesPenerbitan(false);
  };

  const handleMouseLeaveDPUTR = () => {
    setShowPopupDPUTR(false);
  };

  const handleMouseLeaveBelumverifikasi = () => {
    setShowPopupBelumverifikasi(false);
  };

  const handleMouseLeaveTerverifikasi = () => {
    setShowPopupTerverifikasi(false);
  };

  const handleMouseLeavePotensiYear = () => {
    setShowPopupPotensiYear(false);
  };

  const handleMouseLeavePermohonan1 = () => {
    setShowPopupPermohonan1(false);
  };

  const handleMouseLeaveLegenda = () => {
    setShowPopupLegenda(false);
  };

  const handleMouseLeavePTSP = () => {
    setShowPopupPTSP(false);
  };

  const navigate = useNavigate();

  const redirectToTabel = (params) => {
    let url = `/tabel/${params}`;
    navigate(url);
  };

  const openDialog = () => { 
    setIsDialogOpen(true);
  };

  const openDialogNonUsaha = () => {
    setIsDialogOpenNonUsaha(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const closeDialogNonUsaha = () => {
    setIsDialogOpenNonUsaha(false);
  };

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("dialog-overlay-usaha")) {
      closeDialog();
      closeDialogNonUsaha();
    }
  };

  // let sheetId = "1eeyCizwEH8DMpUBW4x0w2rZTv3pc3xNjE18r2uyx1IY";
  // let sheetName = encodeURIComponent("Bagan 2023");
  // let apiKey = "AIzaSyA8bz--_nRrVAoCmttaoIA1WpYp8Xn7Wp8";

  // let sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

  useEffect(() => {
    handleUrl(selectedYear);
    getDataUsaha();
    getDataChartStacked();
    const interval = setInterval(() => {
      handleUrl(selectedYear);
    }, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [selectedYear]);

  const handleYearChange = (e) => {
    const selectedYear = e;
    setSelectCurrentYear(e);
    setSelectLastYear(e - 1);
    setSelectedYear(selectedYear);
  };

  const handleUrl = (newYear) => {
    let sheetId = "1eeyCizwEH8DMpUBW4x0w2rZTv3pc3xNjE18r2uyx1IY";
    let sheetName = encodeURIComponent("Bagan " + newYear + "");
    let apiKey = "AIzaSyA8bz--_nRrVAoCmttaoIA1WpYp8Xn7Wp8";

    let sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

    fetchData(sheetUrl);
  };

  const fetchData = (url) => {
    axios
      // .get("https://sibedaspbg.bandungkab.go.id/api/simbg/coba")
      .get(url)
      .then((response) => {
        // console.log(response);P
        let datas = response.data.values;
        let targetPAD = parseInt(datas[1][11].replace(/\./g, ""));
        let total_berkas = datas[2][10];

        let total_berkas_rp = datas[2][11];
        var totalBerkasrpString = total_berkas_rp.toString();
        var total_berkas_rp1 = totalBerkasrpString.substring(0, 6);
        var total_berkas_rp2 = totalBerkasrpString.substring(6);

        let total_berkas_now = datas[3][10];
        let total_berkas_now_perc = parseInt(datas[3][12]);
        let total_berkas_this_year_rp = datas[3][11];
        let total_berkas_this_year_rp_int = parseInt(
          total_berkas_this_year_rp.replace(/\./g, "")
        );
        let deviasi_target_potensi_rp = datas[4][11];
        let deviasi_target_potensi_perc = parseInt(datas[4][12]);
        let berkas_aktual_belum_terverifikasi = datas[29][10];
        let berkas_aktual_belum_terverifikasi_perc = parseInt(datas[29][13]);
        let berkas_aktual_belum_terverifikasi_rp = datas[29][11];
        let aktual_belum_varif = parseInt(
          berkas_aktual_belum_terverifikasi_rp.replace(/\./g, "")
        );
        let potensi_besar = datas[31][10];
        let potensi_besar_perc = parseInt(datas[31][13]);
        let potensi_besar_rp = datas[31][11];
        let potensi_besarChart = parseInt(potensi_besar_rp.replace(/\./g, ""));
        let potensi_kecil = datas[30][10];
        let potensi_kecil_perc = parseInt(datas[30][13]);
        let potensi_kecil_rp = datas[30][11];
        let potensi_kecilChart = parseInt(potensi_kecil_rp.replace(/\./g, ""));
        let berkas_aktual_terverifikasi_dinas_teknis = datas[13][10];
        let berkas_aktual_terverifikasi_dinas_teknis_perc = parseInt(
          datas[13][13]
        );
        let berkas_aktual_terverifikasi_dinas_teknis_rp = datas[13][11];
        let dataChartVerif = parseInt(
          berkas_aktual_terverifikasi_dinas_teknis_rp.replace(/\./g, "")
        );

        let berkas_terbit_pbg = datas[15][10];
        let berkas_terbit_pbg_perc = parseInt(datas[15][12]);
        let berkas_terbit_pbg_rp = datas[15][11];
        let berkas_terbit_pbg_rp_int = parseInt(
          berkas_terbit_pbg_rp.replace(/\./g, "")
        );
        let proses_penerbitan = datas[16][10];
        let proses_penerbitan_perc = parseInt(datas[16][13]);
        let proses_penerbitan_rp = datas[16][11];
        let proses_penerbitan_rp1 = proses_penerbitan_rp.substring(0, 9);
        let proses_penerbitan_rp2 = proses_penerbitan_rp.substring(9);
        let terproses_di_ptsp = datas[19][10];
        let terproses_di_ptsp_perc = parseInt(datas[19][13]);
        let terproses_di_ptsp_rp = datas[19][11];
        let terproses_di_dputr = datas[20][10];
        let terproses_di_dputr_perc = parseInt(datas[20][13]);
        let terproses_di_dputr_rp = datas[20][11];
        let terproses_di_dputr_substring = terproses_di_dputr_rp.toString();
        let terproses_di_dputr_rp1 = terproses_di_dputr_substring.substring(
          0,
          9
        );
        let terproses_di_dputr_rp2 = terproses_di_dputr_substring.substring(9);
        let berkas_terbit_last = datas[14][10];
        let berkas_terbit_last_year_rp = [14][11];

        setData({
          targetPAD: targetPAD,
          total_berkas: total_berkas,
          total_berkas_rp: total_berkas_rp,
          total_berkas_rp1: total_berkas_rp1,
          total_berkas_rp2: total_berkas_rp2,
          total_berkas_now: total_berkas_now,
          total_berkas_now_perc: total_berkas_now_perc,
          total_berkas_this_year_rp: total_berkas_this_year_rp,
          deviasi_target_potensi_rp: deviasi_target_potensi_rp,
          deviasi_target_potensi_perc: deviasi_target_potensi_perc,
          berkas_aktual_belum_terverifikasi: berkas_aktual_belum_terverifikasi,
          berkas_aktual_belum_terverifikasi_perc:
            berkas_aktual_belum_terverifikasi_perc,
          berkas_aktual_belum_terverifikasi_rp:
            berkas_aktual_belum_terverifikasi_rp,
            berkas_terbit_pbg_rp_int: berkas_terbit_pbg_rp_int,
          potensi_besar: potensi_besar,
          potensi_besar_perc: potensi_besar_perc,
          potensi_besar_rp: potensi_besar_rp,
          potensi_kecil: potensi_kecil,
          potensi_kecil_perc: potensi_kecil_perc,
          potensi_kecil_rp: potensi_kecil_rp,
          berkas_aktual_terverifikasi_dinas_teknis:
            berkas_aktual_terverifikasi_dinas_teknis,
          berkas_aktual_terverifikasi_dinas_teknis_perc:
            berkas_aktual_terverifikasi_dinas_teknis_perc,
          berkas_aktual_terverifikasi_dinas_teknis_rp:
            berkas_aktual_terverifikasi_dinas_teknis_rp,
          berkas_terbit_pbg: berkas_terbit_pbg,
          berkas_terbit_pbg_perc: berkas_terbit_pbg_perc,
          berkas_terbit_pbg_rp: berkas_terbit_pbg_rp,
          proses_penerbitan: proses_penerbitan,
          proses_penerbitan_perc: proses_penerbitan_perc,
          proses_penerbitan_rp: proses_penerbitan_rp,
          terproses_di_ptsp: terproses_di_ptsp,
          terproses_di_ptsp_perc: terproses_di_ptsp_perc,
          terproses_di_ptsp_rp: terproses_di_ptsp_rp,
          terproses_di_dputr: terproses_di_dputr,
          terproses_di_dputr_perc: terproses_di_dputr_perc,
          terproses_di_dputr_rp: terproses_di_dputr_rp,
          berkas_terbit_last: berkas_terbit_last,
          berkas_terbit_last_year_rp: berkas_terbit_last_year_rp,
          dataChartVerif: dataChartVerif,
          aktual_belum_varif: aktual_belum_varif,
          potensi_kecilChart: potensi_kecilChart,
          potensi_besarChart: potensi_besarChart,
          terproses_di_dputr_rp1: terproses_di_dputr_rp1,
          terproses_di_dputr_rp2: terproses_di_dputr_rp2,
          proses_penerbitan_rp1: proses_penerbitan_rp1,
          proses_penerbitan_rp2: proses_penerbitan_rp2,
          total_berkas_this_year_rp_int:total_berkas_this_year_rp_int,
          percenVerif: (dataChartVerif / targetPAD) * 100,
        });
        setDataChartVerifChart([[dataChartVerif], [aktual_belum_varif]]);
        setdataChartBelumVerif([[potensi_kecilChart], [potensi_besarChart]]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDataUsaha = () => {
    axios
      .get("https://sibedaspbg.bandungkab.go.id/api/nilai-retribusi/")
      .then((res) => {
        var dataUsahaNon = res.data;
        let nonUsahaDibawah = dataUsahaNon.nonUsahaDibawah
          .toString()
          .slice(0, -6)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        let nonUsahaDibawah1 = dataUsahaNon.nonUsahaDibawah
          .toString()
          .slice(-6)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        let nonUsahaDiatas = dataUsahaNon.nonUsahaDiatas
          .toString()
          .slice(0, -6)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        let nonUsahaDiatas1 = dataUsahaNon.nonUsahaDiatas
          .toString()
          .slice(-6)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        let usahaDiatas = dataUsahaNon.usahaDiatas
          .toString()
          .slice(0, -6)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        let usahaDiatas1 = dataUsahaNon.usahaDiatas
          .toString()
          .slice(-6)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        let usahaDibawah = dataUsahaNon.usahaDibawah
          .toString()
          .slice(0, -6)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        let usahaDibawah1 = dataUsahaNon.usahaDibawah
          .toString()
          .slice(-6)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        let countNonUsahaDiatas = dataUsahaNon.countNonUsahaDiatas;
        let countNonUsahaDibawah = dataUsahaNon.countNonUsahaDibawah;
        let countUsahaDiatas = dataUsahaNon.countUsahaDiatas;
        let countUsahaDibawah = dataUsahaNon.countUsahaDibawah;

        setDataUsaha({
          nonUsahaDibawah: nonUsahaDibawah,
          nonUsahaDibawah1: nonUsahaDibawah1,
          nonUsahaDiatas: nonUsahaDiatas,
          nonUsahaDiatas1: nonUsahaDiatas1,
          usahaDiatas: usahaDiatas,
          usahaDiatas1: usahaDiatas1,
          usahaDibawah: usahaDibawah,
          usahaDibawah1: usahaDibawah1,
          countNonUsahaDiatas: countNonUsahaDiatas,
          countNonUsahaDibawah: countNonUsahaDibawah,
          countUsahaDiatas: countUsahaDiatas,
          countUsahaDibawah: countUsahaDibawah,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDataChartStacked = () => {
    axios.get("https://sibedaspbg.bandungkab.go.id/api/macet-plan/").then((res) => {
      let dataMacetPlan = res.data;
      setMacetplanBelumVerif([
        dataMacetPlan.berkas_aktual_belum_terverifikasi_ov14,
        // dataMacetPlan.berkas_aktual_belum_terverifikasi_7to14,
        // dataMacetPlan.berkas_aktual_belum_terverifikasi_und7,
      ]);
      setMacetplanAktualVerif([
        dataMacetPlan.berkas_aktual_terverifikasi_dinas_teknis_ov14,
        // dataMacetPlan.berkas_aktual_terverifikasi_dinas_teknis_7to14,
        // dataMacetPlan.berkas_aktual_terverifikasi_dinas_teknis_und7,
      ]);
      setMacetpTerbitPbg([
        dataMacetPlan.berkas_terbit_pbg_ov14,
        // dataMacetPlan.berkas_terbit_pbg_7to14,
        // dataMacetPlan.berkas_terbit_pbg_und7,
      ]);
      setMacetpPotensiBesar([
        dataMacetPlan.potensi_besar_ov14,
        // dataMacetPlan.potensi_besar_7to14,
        // dataMacetPlan.potensi_besar_und7,
      ]);
      setMacetpPotensiKecil([
        dataMacetPlan.potensi_kecil_ov14,
        // dataMacetPlan.potensi_kecil_7to14,
        // dataMacetPlan.potensi_kecil_und7,
      ]);
      setMacetpProsesPenerbitan([
        dataMacetPlan.proses_penerbitan_ov14,
        // 50
        // dataMacetPlan.proses_penerbitan_7to14o.,
        // dataMacetPlan.proses_penerbitan_und7,
      ]);
      setMcetpProsesDputr([
        dataMacetPlan.terproses_di_dputr_ov14,
        // dataMacetPlan.terproses_di_dputr_7to14,
        // dataMacetPlan.terproses_di_dputr_und7,
      ]);
      setMcetpProsesPtsp([
        dataMacetPlan.terproses_di_ptsp_ov14,
        // dataMacetPlan.terproses_di_ptsp_7to14,
        // dataMacetPlan.terproses_di_ptsp_und7,
      ]);
    });
  };

  return (
    <div>
      <NavigationBar />
      <div className="custom-container mt-4">
        <div className="row1 card">
          <div className="container-colom">
            <div className="flex-x-start">
              <span className="inter-25 fw-500 text-pad">
                Target PAD {selectCurrentYear}:
              </span>
              <div className="card bg-blue  card-pad">
                {data && (
                  <span className="inter-20 fw-500 pd-5">
                    Rp{" "}
                    {data.targetPAD
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    ,-
                  </span>
                )}
              </div>
            </div>
            <div className="flex-x-end">
              <span className="inter-25 fw-500 text-pad">
                Deviasi Target dengan Potensi Total Berkas:
              </span>
              <div className="card bg-red  card-pad">
                {data && (
                  <span className="inter-20 fc-white fw-500 pd-5">
                    Rp {data.deviasi_target_potensi_rp},-
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* row tanggal  */}
        <div className="row-tgl mtp-25 flex-x-center">
          <div className="date-today">
            <div style={{  }}>
              <ul>
                <li className="bg-blue br-10">
                  <Link to="/" type="button">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/tabel/0" type="button">
                    Tabel
                  </Link>
                </li>
                <li>
                  <select
                    className="selectOptionst"
                    onChange={(e) => handleYearChange(e.target.value)}
                    value={selectedYear}
                  >
                    {tahunOptions
                      .slice()
                      .reverse()
                      .map((tahun, index) => (
                        <option key={index} value={tahun}>
                          {tahun}
                        </option>
                      ))}
                  </select>
                </li>
              </ul>
              <div className="">
                <p className="inter-25 fw-500 m-10">
                  {date} {month} {selectCurrentYear}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row2 flex-x-center">
          <div className="colom1 card">
            {/* total berkas */}
            <div
              className="c2-b1"
              onClick={() => redirectToTabel("totalBerkas")}
              onMouseEnter={handleMouseEnterPermohonan1}
              onMouseLeave={handleMouseLeavePermohonan1}
              style={{ cursor: "pointer" }}
            >
              <div className="ts-center mtp-10">
                <span className="inter-25 fw-bold mtp-25">Total Berkas:</span>
              </div>
              <div className="center mtp-10">
                {data && (
                  <div className="card-tb-permohonan1 pd-5 bg-blue">
                    <span className="m-10 fs-35 fc-white f-500">
                      Rp{data.total_berkas_rp1}
                    </span>
                    <span className="m-10 fs-35 fc-white f-500">
                      {data.total_berkas_rp2}
                    </span>

                    <p className="total-text">Jumlah Permohonan</p>
                  </div>
                )}
              </div>
              <div className="mlf-25">
                <div className="card-tb-value bg-blue">
                  {data && (
                    <span className="total-value m-10">
                      {data.total_berkas}
                    </span>
                  )}
                </div>
              </div>
              {showPopupPermohonan1 && (
                <div
                  className="popup"
                  style={{
                    position: "absolute",
                    top: popupPosition.top + "px",
                    left: popupPosition.left + "px",
                  }}
                >
                  <div>
                    <p className="notePopup">Note</p>
                  </div>
                  <div className="noteIsi">
                    Total keseluruhan berkas yang diterima sampai dengan tahun
                    ini
                  </div>
                </div>
              )}
            </div>

            <div
              className="card c2-b2-c1"
              onClick={() => redirectToTabel("berkasTerbitLast")}
              style={{ cursor: "pointer" }}
            >
              <p className="inter-25 fw-bold ts-center">
                Berkas Terbit PBG {selectLastYear}:
              </p>
              <div className="bg-purple card-tt-tolak">
                {data && (
                  <span className="fs-38 fc-white pd-5 f-500">
                    Rp 8.214. 151.978
                  </span>
                )}
                <br />
                <span className="total-text">Telah Terbit / Ditolak</span>
              </div>
              <div className="mlf-35">
                <div className="card-tb-value bg-blue mt-2">
                  {data && (
                    <span className="total-value m-10">
                      {data.berkas_terbit_last}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="width-262">
              <div className="ts-center mtp-25">
                <span className="inter-20 fw-bold ">
                  Rekapitulasi Proses Persetujuan Bangunan Gedung (PBG)
                </span>
              </div>
              <BoxCard className="box-card bg-blue">
                {data && <p className="pgb-value">{data.total_berkas}</p>}
                <p className="pgb-text">Jumlah Permohonan</p>
              </BoxCard>
              <BoxCard className="box-card bg-green">
                {data && (
                  <p className="pgb-value">
                    {data.total_berkas -
                      data.terproses_di_ptsp -
                      data.berkas_terbit_pbg -
                      data.berkas_terbit_last}
                  </p>
                )}
                <p className="pgb-text">Dinas Teknis</p>
              </BoxCard>
              <BoxCard className="box-card bg-red">
                {data && <p className="pgb-value">{data.terproses_di_ptsp}</p>}
                <p className="pgb-text">Dinas Perizinan</p>
              </BoxCard>
              <BoxCard className="box-card bg-purple">
                {data && (
                  <p className="pgb-value">
                    {parseInt(data.berkas_terbit_pbg) +
                      parseInt(data.berkas_terbit_last)}
                  </p>
                )}
                <p className="pgb-text">Telah Terbit / Ditolak</p>
              </BoxCard>
            </div>
          </div>

          {/* ini buat potensi */}
          <div className="colom2">
            <div className="container-colom2">
              <div
                className="berkas-terbit"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                // style={{ cursor: "pointer" }}
              >
                <div className="ts-center-lgd mtp-10">
                  <span className="inter-25 mlf-70 legend-center ts-center fw-500">Berkas Terbit PBG:</span>
                  <div className="legend-container">
                    <div
                      className="legend"
                      onMouseEnter={handleMouseEnterLegenda}
                      onMouseLeave={handleMouseLeaveLegenda}
                      style={{ cursor: "pointer" }}
                    >
                      <FontAwesomeIcon
                      className="iconLegend"
                      icon={faExclamationCircle}
                    />
                    </div>
                  </div>
                </div>
                <div className="container-colom center">
                  <div className="card-luar bg-purple">
                    <Card className="bg-purple card-tt-tolak2">
                      {data && (
                        <span className="fs-60 mlf-10 fc-white">
                          {Math.round(data.berkas_terbit_pbg_perc)}%
                        </span>
                      )}
                      <span className="total-text">Telah Terbit / Ditolak</span>
                    </Card>
                  </div>
                </div>
                <div className="container-colom center mtp-10">
                  <div  
                   
                    className="m-10 widht-100 bg-btt br-10"
                  >
                    {data && (
                      <span className="inter-20 center-text">
                        {Math.round((data.berkas_terbit_pbg_rp_int / data.dataChartVerif)*100)}%
                      </span>
                    )}{" "}
                    
                  </div>  
                  
                  <div 
                   
                    className="m-10 widht-100 bg-btl br-10"
                  >
                    {data && (
                      <span className="inter-20 center-text">
                        {Math.round((data.berkas_terbit_pbg_rp_int / data.total_berkas_this_year_rp_int)*100)}%
                      </span>
                    )}{" "}
                  </div> 
                </div>
                <div className="mtp-15 mlf-28">
                  <div className="fs-30 fw-500">Realisasi : </div>
                  {data && (
                    <span className="bg-blue inter-30 br-10 mtp-10 pd-10 fw-500">
                      Rp. {data.berkas_terbit_pbg_rp}
                    </span>
                  )}{" "}
                  <br />
                  {data && (
                    <span className="inter-30 mtp-10 ts-left fw-500">
                      {data.berkas_terbit_pbg}
                    </span>
                  )}
                </div>
                {showPopup && (
                  <div
                    className="popup"
                    style={{
                      position: "absolute",
                      top: popupPosition.top + "px",
                      left: popupPosition.left + "px",
                    }}
                  >
                    <div>
                      <p className="notePopup">Note</p>
                    </div>
                    <div className="noteIsi">
                      Total keseluruhan berkas yang terbit tahun ini
                    </div>
                  </div>
                )}

                {showPopupLegenda && (
                  <div
                  className="popupLegend"
                  style={{
                    position: "absolute",
                    top: "480px",
                    left: "800px",
                  }}
                >
                  <div>
                    <p className="notePopup">Note</p>
                  </div>

                  <div className="clm-12">
                    <div className="container-colom">
                      <div className="berkas-terbit-terverifikasi"></div>
                      <div className="legend-ket-ds">
                        <p>berkas terbit / berkas aktual terverifikasi</p>
                      </div>
                    </div>
                  </div>
                  <div className="clm-12">
                    <div className="container-colom">
                      <div className="berkas-terbit-total"></div>                     
                      <div className="legend-ket-ds">
                        <p>berkas terbit / total berkas</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              </div>

              <div
                className="potensi-card"
                onClick={() => redirectToTabel("totalBerkasNow")}
                onMouseEnter={handleMouseEnterPotensiYear}
                onMouseLeave={handleMouseLeavePotensiYear}
                style={{ cursor: "pointer" }}
              >
                <div className="ts-center">
                  <br />
                  <span className="inter-20 fw-500 mtp-10">
                    Total Berkas {selectCurrentYear}
                  </span>
                </div>
                <div className="ts-center mtp-10">
                  {data && (
                    <span className="fs-67 ts-center fc-green fw-500">
                      {Math.round(data.total_berkas_now_perc)}%
                    </span>
                  )}
                </div>
                <div className="mlf-28 mtp-25">
                  <div className="fs-30">Potensi: </div>
                  <div className="card-potensi mtp-10 bg-green fc-white fs-30">
                    {data && (
                      <span className="m-15">
                        Rp {data.total_berkas_this_year_rp}
                      </span>
                    )}
                  </div>
                  {data && (
                    <div className="fs-30 mtp-10 f-500 mlf-10">
                      {data.total_berkas_now}
                    </div>
                  )}
                </div>
                {showPopupPotensiYear && (
                  <div
                    className="popup"
                    style={{
                      position: "absolute",
                      top: popupPosition.top + "px",
                      left: popupPosition.left + "px",
                    }}
                  >
                    <div>
                      <p className="notePopup">Note</p>
                    </div>
                    <div className="noteIsi">
                      Total keseluruhan berkas yang diterima tahun 2023
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="container-colom2">
              <div className="colom2-separator1 card">
                <div className="center mt-2">
                  <div className="triangle triangle-top"></div>
                </div>
              </div>
              <div className="colom2-separator2"></div>
              <div className="colom2-separator3 card">
                <div className="center mt-2">
                  <div className="triangle triangle-bottoms"></div>
                </div>
              </div>
            </div>

            <div className="container-colom2">
              {/* proses ptsp */}
              <div
                className="card-ptsp"
                onMouseEnter={handleMouseEnterPTSP}
                onMouseLeave={handleMouseLeavePTSP}
                // style={{ cursor: "pointer" }}
              >
                <div className="container-colom">
                  <div
                    onClick={() => redirectToTabel("terproses_di_ptsp")}
                    style={{ cursor: "pointer" }}
                    className="mlf-15"
                  >
                    {macetplanProsesPtsp && (
                      <MeteranMacetplan
                        data={macetplanProsesPtsp}
                        marginTop="100px"
                      />
                    )}
                  </div>
                  <div className="mlf-15 card-ptsp-atas">
                    <span className="inter-23 fw-500 text-right">
                      Berproses Izin PBG di DPMTSP:
                    </span>
                    <br />
                    <br />
                    <br />
                    <div>
                      <div
                        onClick={() => redirectToTabel("terproses_di_ptsp14")}
                        style={{ cursor: "pointer" }}
                        className="luar-box bg-red mt-3"
                      >
                        <div className="bg-red box-dinas-perizinan text-left">
                          {data && (
                            <span className="total-value-pbg me-3">
                              {/* {Math.round(data.terproses_di_ptsp_perc)}% */}
                              {data.terproses_di_ptsp}
                            </span>
                          )}
                          <br />
                          <span className="total-text-pbg me-3 mb-1">
                            DPMTSP
                          </span>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="mtp-20">
                      {data && (
                        <span className="bg-blue inter-20 br-10 pd-5 fw-500">
                          Rp.{data.terproses_di_ptsp_rp}
                        </span>
                      )}
                    </div>
                    {/* <div className="mtp-15">
                    {data && (
                      <span className="inter-25 ts-left fw-500">
                        {data.terproses_di_ptsp}
                      </span>
                    )}
                  </div> */}
                  </div>
                </div>
                <div className="card-ptsp-bawah">
                  <div className="separator-ptsp boxCard">
                    <div className="center">
                      <div className="triangle triangle-top"></div>
                    </div>
                  </div>
                </div>
                {showPopupPTSP && (
                  <div
                    className="popup"
                    style={{
                      position: "absolute",
                      top: popupPosition.top + "px",
                      left: popupPosition.left + "px",
                    }}
                  >
                    <div>
                      <p className="notePopup">Note</p>
                    </div>
                    <div className="noteIsi">
                      Total berkas dengan status Menunggu Pembayaran Retribusi,
                      Menunggu Validasi Retribusi, dan Pengiriman SKRD.
                    </div>
                  </div>
                )}
              </div>

              {/* end */}
              <div className="col2-berkas-total">
                <div className="col2-berkas">
                  <div className="">
                    <div className="ts-center">
                      <span className="inter-30 fw-700">
                        Total Berkas {selectCurrentYear}:
                      </span>
                    </div>
                  </div>
                  <div className="container-colom">
                    <div
                      onClick={() =>
                        redirectToTabel(
                          "berkas_aktual_terverifikasi_dinas_teknis14"
                        )
                      }
                      style={{ cursor: "pointer" }}
                      className="mlf-15"
                    >
                      {macetplanAktualVerif && (
                        <MeteranMacetplan
                          data={macetplanAktualVerif}
                          marginTop="58px"
                        />
                      )}
                    </div>
                    <div>
                      <div className="container-colom mtp-10">
                        <div
                          className="clm-25 fw-500"
                          // onClick={() => redirectToTabel("berkasTerVerif")}
                          onMouseEnter={handleMouseEnterTerverifikasi}
                          onMouseLeave={handleMouseLeaveTerverifikasi}
                          // style={{ cursor: "pointer" }}
                        >
                          <div className="ts-center">
                            <span className="inter-25 ">
                              Berkas Aktual Terverifikasi Dinas Teknis:
                            </span>
                          </div>
                          <br />
                          {data && (
                            <div className="ts-right">
                              <span className="text-actual-ptnsi-verif">
                                {Math.round(data.percenVerif)} %
                              </span>
                            </div>
                          )}
                          {showPopupTerverifikasi && (
                            <div
                              className="popup"
                              style={{
                                position: "absolute",
                                top: popupPosition.top + "px",
                                left: popupPosition.left + "px",
                              }}
                            >
                              <div>
                                <p className="notePopup">Note</p>
                              </div>
                              <div className="noteIsi">
                                Total keseluruhan berkas diterima tahun{" "}
                                {selectCurrentYear} yang sudah melengkapi
                                persyaratan
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="clm-4  fw-500"></div>
                        <div
                          className="clm-35 fw-500"
                          // onClick={() => redirectToTabel("belumTerVerif")}
                          onMouseEnter={handleMouseEnterBelumverifikasi}
                          onMouseLeave={handleMouseLeaveBelumverifikasi}
                          // style={{ cursor: "pointer" }}
                        >
                          <div className="ts-center">
                            <span className="inter-25 mlf-10 fw-500 ">
                              Berkas Aktual Belum Terverifikasi:
                            </span>
                          </div>
                          <br />
                          <br></br>
                          {data && (
                            <div className="text-blm-actual-verif">
                              {Math.round(
                                data.berkas_aktual_belum_terverifikasi_perc
                              )}{" "}
                              %
                            </div>
                          )}
                          {showPopupBelumverifikasi && (
                            <div
                              className="popup"
                              style={{
                                position: "absolute",
                                top: popupPosition.top + "px",
                                left: popupPosition.left + "px",
                              }}
                            >
                              <div>
                                <p className="notePopup">Note</p>
                              </div>
                              <div className="noteIsi">
                                Total keseluruhan berkas diterima tahun{" "}
                                {selectCurrentYear} yang belum melengkapi
                                persyaratan
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="container-colom mtp-15 mlf-35">
                        {dataChartVerifChart && (
                          <ChartStacked
                            data={dataChartVerifChart}
                            width="635px"
                            color={color}
                          ></ChartStacked>
                        )}
                      </div>
                      <div className="container-colom mtp-10">
                        <div
                          onClick={() =>
                            redirectToTabel(
                              "berkas_aktual_terverifikasi_dinas_teknis"
                            )
                          }
                          style={{ cursor: "pointer" }}
                          className="clm-6 mlf-35"
                        >
                          {data && (
                            <span className="inter-20 ts-left fw-500">
                              {data.berkas_aktual_terverifikasi_dinas_teknis}
                            </span>
                          )}
                        </div>
                        <div
                          onClick={() =>
                            redirectToTabel("berkas_aktual_belum_terverifikasi")
                          }
                          style={{ cursor: "pointer" }}
                          className="clm-6 "
                        >
                          {data && (
                            <div className="ts-right mrg-35">
                              <span className=" ts-right mrg-35 fs-20 fw-500">
                                {data.berkas_aktual_belum_terverifikasi}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      onClick={() =>
                        redirectToTabel("berkas_aktual_belum_terverifikasi14")
                      }
                      style={{ cursor: "pointer" }}
                      className="mrg-15"
                    >
                      {macetplanBelumVerif && (
                        <MeteranMacetplan
                          data={macetplanBelumVerif}
                          marginTop="58px"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="container-colom2">
                  <div className="separator1-row2 boxCard">
                    <div className="center">
                      <div className="triangle triangle-bottoms"></div>
                    </div>
                  </div>
                  <div className="separator2-row2 boxCard">
                    <div className="center">
                      <div className="triangle triangle-bottoms"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="col-triangle center">
                <div className="flex-align-item-center mlf-15">
                  <div className="triangle triangle-right"></div>
                </div>
              </div> */}
            </div>

            <div className="container-colom">
              <div
                className="card-dputr"
                onMouseEnter={handleMouseEnterDPUTR}
                onMouseLeave={handleMouseLeaveDPUTR}
                // style={{ cursor: "pointer" }}
              >
                <div className="container-colom">
                  <div
                    onClick={() => redirectToTabel("terproses_di_dputr")}
                    style={{ cursor: "pointer" }}
                    className="mlf-15"
                  >
                    {macetplanProsesDputr && (
                      <MeteranMacetplan
                        data={macetplanProsesDputr}
                        marginTop="150px"
                      />
                    )}
                  </div>
                  <div className="clm-12 ts-center">
                    <span className="inter-25 fw-500 me-3 center">
                      Belum Selesai Rekomtek PBG:
                    </span>
                    <div className="mtp-35">
                      {data && (
                        <span className="text-dputr  me-3 f-500">
                          {/* {Math.round(data.terproses_di_dputr_perc)}% */}
                        </span>
                      )}
                    </div>
                    {data && (
                      <div className="card-rupiah mlf-15 mtp-15 ts-left">
                        <span className="pd-5 fs-25 fw-500">
                          Rp{data.terproses_di_dputr_rp1}
                        </span>
                        <br />
                        <span className="pd-5 fs-25 fw-500">
                          {data.terproses_di_dputr_rp2}
                        </span>
                      </div>
                    )}
                    <div className="mtp-10">
                      {data && (
                        <div
                          onClick={() =>
                            redirectToTabel("terproses_di_dputr14")
                          }
                          style={{ cursor: "pointer" }}
                          className="ts-right mrg-35 inter-25 fw-500"
                        >
                          {data.terproses_di_dputr}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {showPopupDPUTR && (
                  <div
                    className="popup"
                    style={{
                      position: "absolute",
                      top: popupPosition.top + "px",
                      left: popupPosition.left + "px",
                    }}
                  >
                    <div>
                      <p className="notePopup">Note</p>
                    </div>
                    <div className="noteIsi">
                      {/* Total berkas yang sedang menunggu pembayaran dan validasi
                      retribusi
                       */}
                      Total berkas dengan status Menunggu Penugasan TPT/TPA,
                      Menunggu Penjadwalan Konsultasi, Konsultasi, Perhitungan
                      Retribusi, dan Selesai Penilaian Konsultasi.
                    </div>
                  </div>
                )}
              </div>

              {/* proses penerbitan */}
              <div
                className="proses-penerbitan"
                onMouseEnter={handleMouseEnterProsesPenerbitan}
                onMouseLeave={handleMouseLeaveProsesPenerbitan}
                // style={{ cursor: "pointer" }}
              >
                <div className="container-colom">
                  <div className="separator-dputr">
                    <div className="triangle triangle-left"></div>
                  </div>
                  <div className="container-colom">
                    <div
                      onClick={() => redirectToTabel("proses_penerbitan")}
                      style={{ cursor: "pointer" }}
                      className=""
                    >
                      {macetplanProsesPenerbitan && (
                        <MeteranMacetplan
                          data={macetplanProsesPenerbitan}
                          marginTop="150px"
                        />
                      )}
                    </div>
                    <div className="mlf-10">
                      <div className="ts-center">
                        <span className="inter-25 fw-500">
                          Proses <br /> Penerbitan:
                        </span>
                      </div>
                      <div className="ts-center mtp-20 mbt-25">
                        {data && (
                          <div className="fs-50 fc-white f-500">
                            {Math.round(data.proses_penerbitan_perc)} %
                          </div>
                        )}
                      </div>

                      {data && (
                        <div className="card-rupiah mtp-35 ts-left">
                          <span className="pd-5 fs-25 fw-500">
                            Rp{data.proses_penerbitan_rp1}
                          </span>
                          <br />
                          <span className="pd-5 fs-25 fw-500">
                            {data.proses_penerbitan_rp2}
                          </span>
                        </div>
                      )}
                      <div className="ts-right mtp-10">
                        {data && (
                          <span
                            onClick={() =>
                              redirectToTabel("proses_penerbitan14")
                            }
                            style={{ cursor: "pointer" }}
                            className="mrg-15  fs-25 fw-500"
                          >
                            {data.proses_penerbitan}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {showPopupProsesPenerbitan && (
                  <div
                    className="popup"
                    style={{
                      position: "absolute",
                      top: popupPosition.top + "px",
                      left: popupPosition.left + "px",
                    }}
                  >
                    <div>
                      <p className="notePopup">Note</p>
                    </div>
                    <div className="noteIsi">
                      Terproses di DPUTR dan DPMPTSP
                    </div>
                  </div>
                )}
              </div>
              {/* end */}

              <div className="belum-verif">
                <div className="">
                  <div className="ts-center mtp-20">
                    <span className="inter-30 fw-700">
                      Berkas Aktual Belum Terverifikasi
                    </span>
                  </div>
                  <div className="container-colom">
                    <div
                      onClick={() => redirectToTabel("potensi_kecil14")}
                      style={{ cursor: "pointer" }}
                      className="mlf-10"
                    >
                      {macetplanPotensiKecil && (
                        <MeteranMacetplan
                          data={macetplanPotensiKecil}
                          marginTop="58px"
                        />
                      )}
                    </div>
                    <div>
                      <div className="container-35 mtp-35">
                        <div
                          className="clm-6 ts-left"
                          onMouseEnter={handleMouseEnterPotensiKecil}
                          onMouseLeave={handleMouseLeavePotensiKecil}
                          // style={{ cursor: "pointer" }}
                        >
                          <span className="inter-25 fw-500">Non Usaha:</span>
                          <br />
                          <div className="container-colom ">
                            {/* {data && (
                              <span className="fs-50 fc-red-heart fw-500 mtp-15">
                                {Math.round(data.potensi_kecil_perc)}%
                              </span>
                            )} */}
                            <div
                              className="iconStyle ts-right mtp-15 mlf-120"
                              onClick={openDialogNonUsaha}
                              style={{ cursor: "pointer" }}
                            >
                              <FontAwesomeIcon
                                className="iconLegend"
                                icon={faChevronDown}
                              />
                            </div>
                          </div>
                          {showPopupPotensiKecil && (
                            <div
                              className="popup"
                              style={{
                                position: "absolute",
                                top: popupPosition.top + "px",
                                left: popupPosition.left + "px",
                              }}
                            >
                              <div>
                                <p className="notePopup">Note</p>
                              </div>
                              <div className="noteIsi">
                                Total perizinan yang memiliki "Nilai Retribusi"
                                Dibawah Rp. 50 Juta
                              </div>
                            </div>
                          )}
                        </div>
                        <div
                          className="clm-6 ts-right"
                          onMouseEnter={handleMouseEnterPotensiBesar}
                          onMouseLeave={handleMouseLeavePotensiBesar}
                        >
                          <span className="inter-25 fw-500">Usaha:</span>
                          <br />
                          <div className="container-colom">
                            <div
                              className="iconStyle mtp-15"
                              onClick={openDialog}
                              style={{ cursor: "pointer" }}
                            >
                              <FontAwesomeIcon
                                className="iconLegend"
                                icon={faChevronDown}
                              />
                            </div>
                            {/* {data && (
                              <span
                                // onClick={() => redirectToTabel("usaha")}
                                // style={{ cursor: "pointer" }}
                                className="text-actual-verif mtp-15 mlf-35"
                              >
                                {Math.round(data.potensi_besar_perc)}%
                              </span>
                            )} */}
                          </div>
                          {showPopupPotensiBesar && (
                            <div
                              className="popup"
                              style={{
                                position: "absolute",
                                top: popupPosition.top + "px",
                                left: popupPosition.left + "px",
                              }}
                            >
                              <div>
                                <p className="notePopup">Note</p>
                              </div>
                              <div className="noteIsi">
                                Total perizinan yang memiliki "Nilai Retribusi"
                                diatas Rp. 50 Juta
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mlf-35 mtp-10">
                        {dataChartBelumVerif && (
                          <ChartStacked
                            data={dataChartBelumVerif}
                            width="382px"
                            color={color2}
                          ></ChartStacked>
                        )}
                      </div>
                      <div className="container-colom mtp-15">
                        <div className="clm-6 mlf-35">
                          {data && (
                            <span
                              onClick={() => redirectToTabel("nonUsaha")}
                              style={{ cursor: "pointer" }}
                              className="ts-right mrg-35 fs-20 fw-500"
                            >
                              {data.potensi_kecil}
                            </span>
                          )}
                        </div>
                        <div className="clm-6 ts-right">
                          {data && (
                            <span
                              onClick={() => redirectToTabel("usaha")}
                              style={{ cursor: "pointer" }}
                              className="inter-20 mrg-35 fw-500"
                            >
                              {data.potensi_besar}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      onClick={() => redirectToTabel("potensi_besar14")}
                      style={{ cursor: "pointer" }}
                      className="mrg-10"
                    >
                      {macetplanPotensiBesar && (
                        <MeteranMacetplan
                          data={macetplanPotensiBesar}
                          marginTop="58px"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
      {isDialogOpen && (
        <div className="dialog-overlay-usaha" onClick={handleOverlayClick}>
          <div className="dialogUsaha">
            <div className="container-colom2 pd-15">
              <div className="clm-4 fs-25 fw-500">
                &#62; 70 Juta
                <br />
                Rupiah
              </div>
              {/* <div className="clm-4 center fs-25 fw-500">
                25 - 50 juta
                <br />
                rupiah
              </div> */}
              <div className="clm-4 flex-align-item-right fs-25 fw-500">
                &#60; 75 Juta
                <br />
                Rupiah
              </div>
            </div>
            <div className="container-colom costChart">
              <div className="clm-6 costKecil center">
                {dataUsaha && (
                  <span className="mtp-15">
                    Rp {dataUsaha.usahaDiatas} <br /> .{dataUsaha.usahaDiatas1}
                  </span>
                )}
              </div>
              {/* <div className="clm-4 costSedang center">
                <span className="mtp-15">
                  Rp 5.898.
                  <br />
                  941.251
                </span>
              </div> */}
              <div className="clm-6 costBesar center">
                {dataUsaha && (
                  <span className="mtp-15">
                    Rp {dataUsaha.usahaDibawah} <br /> .
                    {dataUsaha.usahaDibawah1}
                  </span>
                )}
              </div>
            </div>
            <div className="container-colom2 pd-15">
              {dataUsaha && (
                <div className="clm-6 fs-25 fw-500">
                  {dataUsaha.countUsahaDibawah}
                </div>
              )}
              {/* <div className="clm-4 center fs-25 fw-500">1594</div> */}
              {dataUsaha && (
                <div className="clm-6 flex-align-item-right fs-25 fw-500">
                  {dataUsaha.countNonUsahaDiatas}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {isDialogOpenNonUsaha && (
        <div className="dialog-overlay-usaha" onClick={handleOverlayClick}>
          <div className="dialogUsaha">
            <div className="container-colom2 pd-15">
              <div className="clm-4 fs-25 fw-500">
                &#62; Rp. 25 Juta
                <br />
                Rupiah
              </div>
              {/* <div className="clm-4 center fs-25 fw-500">
                25 - 50 juta
                <br />
                rupiah
              </div> */}
              <div className="clm-4 flex-align-item-right fs-25 fw-500">
                &#60; Rp. 25 Juta
                <br />
                Rupiah
              </div>
            </div>
            <div className="container-colom costChart">
              <div className="clm-6 costKecil center">
                {dataUsaha && (
                  <span className="mtp-15">
                    Rp {dataUsaha.nonUsahaDiatas} <br /> .
                    {dataUsaha.nonUsahaDiatas1}
                  </span>
                )}
              </div>
              {/* <div className="clm-4 costSedang center">
                <span className="mtp-15">
                  Rp 5.898.
                  <br />
                  941.251
                </span>
              </div> */}
              <div className="clm-6 costBesar center">
                {dataUsaha && (
                  <span className="mtp-15">
                    Rp {dataUsaha.nonUsahaDibawah} <br /> .
                    {dataUsaha.nonUsahaDibawah1}
                  </span>
                )}
              </div>
            </div>
            {dataUsaha && (
              <div className="container-colom2 pd-15">
                <div className="clm-6 fs-25 fw-500">
                  {dataUsaha.countNonUsahaDibawah}
                </div>
                <div className="clm-6 flex-align-item-right fs-25 fw-500">
                  {dataUsaha.countNonUsahaDiatas}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FixDashboard;
