import NavigationBar from "../../components/NavigationsBar";
import { Card } from "react-bootstrap";
import BoxCard from "../../components/BoxCard";
import React, { useState, useEffect } from "react";
import axios from "axios";

import ChartStacked from "../../components/ChartStacked";
// import { async } from "q";

const FixDashboard = () => {
  //kiri -> getter, kanan -> setter
  const date = new Date().getDate();
  const month = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;
  const [data, setData] = useState(null);

  const color = ["#00917c", "#c62c11"];
  const color2 = ["#7E0B02", "#c62c11"];
  const dataPotensi = 24537326696;
  const dataChartVerif = [[9270733484], [15686727303]];
  const dataChartBelumVerif = [[10778885200], [4907842103]];

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData(); // Mendapatkan data setiap 24 jam
    }, 24 * 60 * 60 * 1000); // Mengulang pemanggilan setiap 24 jam

    return () => clearInterval(interval); // Membersihkan interval saat komponen tidak lagi digunakan
  }, []);

  const fetchData = () => {
    axios
      .get("https://sibedaspbg.bandungkab.go.id/api/simbg/coba")
      .then((response) => {
        setData(response.data.data);
        // console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
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
          <div className="date-today">
            <p className="inter-25 fw-500 m-10">
              {date} {month} {currentYear}
            </p>
          </div>
        </div>

        <div className="row2 flex-x-center">
          <div className="colom1 card">
            <div className="c2-b1">
              <div className="ts-center mtp-10">
                <span className="inter-25 fw-bold mtp-25">Total Berkas:</span>
              </div>
              <div className="center mtp-10">
                <div className="card-tb-permohonan1 bg-blue">
                  <span className="m-10 fs-38 fc-white pd-5 f-500">
                    Rp 33.171. 612.765
                  </span>
                  <p className="total-text">Jumlah Permohonan</p>
                </div>
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
            </div>

            <div className="card c2-b2-c1">
              <p className="inter-25 fw-bold ts-center">
                Berkas Terbit PBG {lastYear}:
              </p>
              <div className="bg-purple card-tt-tolak">
                <span className="fs-38 fc-white pd-5 f-500">
                  Rp 8.214. 151.978
                </span>
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
                <p className="pgb-value">1558</p>
                <p className="pgb-text">Dinas Teknis</p>
              </BoxCard>
              <BoxCard className="box-card bg-red">
                {data && <p className="pgb-value">{data.terproses_di_ptsp}</p>}
                <p className="pgb-text">Dinas Perizinan</p>
              </BoxCard>
              <BoxCard className="box-card bg-purple">
                {data && (
                  <p className="pgb-value">
                    {data.berkas_terbit_pbg + data.berkas_terbit_last}
                  </p>
                )}
                <p className="pgb-text">Telah Terbit / Ditolak</p>
              </BoxCard>
            </div>
          </div>

          {/* ini buat potensi */}
          <div className="colom2">
            <div className="potensi-card">
              <div className="ts-center">
                <br />
                <span className="inter-20 fw-500 mtp-10">
                  Total Berkas {currentYear}
                </span>
              </div>
              <div className="ts-center">
                {data && (
                  <span className="fs-67 ts-center fc-green fw-500">
                    {Math.round(data.total_berkas_now_perc)}%
                  </span>
                )}
              </div>
              <div className="ts-center mtp-10">
                <span className="fs-30">Potensi: </span>
                <div className="card-potensi bg-green fc-white fs-30">
                  <span className="m-15">Rp. {dataPotensi}</span>
                </div>
                {data && (
                  <span className="fs-30 f-500 mlf-10">
                    {data.total_berkas_now}
                  </span>
                )}
              </div>
            </div>

            <div className="container-colom2">
              <div className="colom2-separator1"></div>
              <div className="colom2-separator2 card">
                <div className="center mt-2">
                  <div className="triangle triangle-bottoms"></div>
                </div>
              </div>
              <div className="colom2-separator3"></div>
            </div>

            <div className="container-colom2">
              <div className="col2-berkas-total">
                <div className="col2-berkas">
                  <div className="">
                    <div className="ts-center">
                      <span className="inter-30 fw-700">
                        Total Berkas {currentYear}:
                      </span>
                    </div>
                  </div>
                  <div className="container-colom mtp-10">
                    <div className="clm-35 fw-500">
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
                    </div>
                    <div className="clm-4  fw-500"></div>
                    <div className="clm-25 fw-500">
                      <div className="ts-center">
                        <span className="inter-25 ">
                          Berkas Aktual Terverifikasi Dinas Teknis:
                        </span>
                      </div>
                      <br />
                      {data && (
                        <div className="ts-right">
                          <span className="text-actual-verif mlf-35">
                            {Math.round(
                              data.berkas_aktual_terverifikasi_dinas_teknis_perc
                            )}{" "}
                            %
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="container-colom mtp-15 mlf-35">
                    <ChartStacked
                      data={dataChartVerif}
                      width="741px"
                      color={color}
                    ></ChartStacked>
                  </div>
                  <div className="container-colom mtp-10">
                    <div className="clm-6 mlf-35">
                      {data && (
                        <span className="inter-20 ts-left fw-500">
                          {data.berkas_aktual_terverifikasi_dinas_teknis}
                        </span>
                      )}
                    </div>
                    <div className="clm-6 ">
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
                <div className="separator2-row2 boxCard">
                  <div className="center">
                    <div className="triangle triangle-bottoms"></div>
                  </div>
                </div>
              </div>

              <div className="col-triangle center">
                <div className="flex-align-item-center mlf-15">
                  <div className="triangle triangle-right"></div>
                </div>
              </div>

              <div className="proses-penerbitan">
                <br></br>
                <div className="ts-center">
                  <span className="mlf-10 inter-25 fw-500">
                    Proses <br /> Penerbitan:
                  </span>
                </div>
                <div className="ts-center mtp-20 mbt-25">
                  {data && (
                    <div className="fs-50 fc-green f-500">
                      {Math.round(data.proses_penerbitan_perc)} %
                    </div>
                  )}
                </div>
                <div className="mlf-35 mtp-75">
                  <span className="bg-blue inter-20 br-10 pd-5 fw-500">
                    Rp. 5.210.596.075
                  </span>
                </div>
                <div className="ts-right mtp-10">
                  {data && (
                    <span className="mrg-35  fs-20 fw-500">
                      {data.proses_penerbitan}
                    </span>
                  )}
                </div>
                <br />
                <br />
                <br />

                <div className="center">
                  <div className="triangle triangle-bottoms"></div>
                </div>
              </div>
            </div>

            <div className="container-colom">
              <div className="card-dputr">
                <div className="container-colom">
                  
                  <div className="clm-12 ts-center">
                    <span className="inter-30 fw-500 me-3">
                      Terproses di DPUTR:
                    </span>
                    <div className="mtp-35">
                      {data && (
                        <span className="text-dputr  me-3 f-500">
                          {data.terproses_di_dputr}
                        </span>
                      )}
                    </div>
                    <div className="mtp-50">
                      <span className="bg-blue inter-20 br-10 pd-5 fw-500">
                        Rp. 358.939.739
                      </span>
                    </div>
                    <div className="mtp-10">
                      {data && (
                        <div className="ts-right mrg-35 inter-25 fw-500">
                          {Math.round(data.terproses_di_dputr_perc)}%
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="separator-dputr">
                    <div className="triangle triangle-right"></div>
                  </div>
                </div>
              </div>

              <div className="card-ptsp">
                <div className="mlf-35">
                  <span className="inter-30 fw-500 text-right">
                    Terproses di PTSP:
                  </span>
                  <div>
                    <div className="luar-box bg-red mt-3">
                      <div className="bg-red box-dinas-perizinan text-left">
                        {data && (
                          <span className="total-value-pbg me-3">
                            {Math.round(data.terproses_di_ptsp_perc)}%
                          </span>
                        )}
                        <br />
                        <span className="total-text-pbg me-3 mb-1">DPMTSP</span>
                      </div>
                    </div>
                  </div>
                  <div className="mtp-20">
                    <span className="bg-blue inter-20 br-10 pd-5 fw-500">
                      Rp. 358.939.739
                    </span>
                  </div>
                  <div className="mtp-15">
                    {data && (
                      <span className="inter-25 ts-left fw-500">
                        {data.terproses_di_ptsp}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="belum-verif">
                <div className="">
                  <div className="ts-center mtp-20">
                    <span className="inter-30 fw-700">
                      Berkas Aktual Belum Terverifikasi
                    </span>
                  </div>
                  <div className="container-35 mtp-35">
                    <div className="clm-6 ts-left">
                      <span className="inter-25 fw-500">Potensi Kecil:</span>
                      <br />
                      {data && (
                        <div className="fs-50 fc-red fw-500 mtp-15">
                          {Math.round(data.potensi_kecil_perc)} %
                        </div>
                      )}
                    </div>
                    <div className="clm-6 ts-right ">
                      <span className="inter-25 fw-500">Potensi Besar:</span>
                      <br />
                      {data && (
                        <span className="text-actual-verif mtp-15">
                          {Math.round(data.potensi_besar_perc)} %
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mlf-35 mtp-10">
                    <ChartStacked
                      data={dataChartBelumVerif}
                      width="472px"
                      color={color2}
                    ></ChartStacked>
                  </div>
                  <div className="container-colom mtp-15">
                    <div className="clm-6 mlf-35">
                      {data && (
                        <span className="ts-right mrg-35 fs-20 fw-500">
                          {data.potensi_kecil}
                        </span>
                      )}
                    </div>
                    <div className="clm-6 ">
                      {data && (
                        <span className="inter-20 ts-left fw-500">
                          {data.potensi_besar}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-colom">
              <div className="berkas-terbit">
                <div className="ts-center mtp-10">
                  <span className=" inter-25 fw-500">Berkas Terbit PBG:</span>
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
                <div className="center mtp-15">
                  <span className="fs-30 fw-500">Realisasi : </span>
                  <span className="bg-blue inter-30 br-10 pd-5 fw-500">
                    Rp. 5.210.596.075
                  </span>{" "}
                  {data && (
                    <span className="inter-30 mlf-10 ts-left fw-500">
                      {data.berkas_terbit_pbg}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixDashboard;
