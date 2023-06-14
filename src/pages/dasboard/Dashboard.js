import NavigationBar from "../../components/NavigationsBar";
import { Card } from "react-bootstrap";
import BoxCard from "../../components/BoxCard";
import React, { useState, useEffect } from "react";
import axios from "axios";

import ChartStacked from "../../components/ChartStacked";
// import { async } from "q";

const FixDashboard = () => {
  //kiri -> getter, kanan -> setter
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;
  const [data, setData] = useState(null);
  const color = ["#00917c", "#c62c11"];
  const color2 = ["#7E0B02", "#c62c11"];

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData(); // Mendapatkan data setiap 24 jam
    }, 24 * 60 * 60 * 1000); // Mengulang pemanggilan setiap 24 jam

    return () => clearInterval(interval); // Membersihkan interval saat komponen tidak lagi digunakan
  }, []);

  const fetchData = () => {
    axios
      .get("https://api.sibedaspbgbdgkab.my.id/simbg/coba")
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dataChart = [[23772727494], [6901294751]];
  // const dataChartPbgBawah = [[393739], [197670]];
  const dataChartVerif = [[13114122977], [10658604517]];
  // const dataChartSudahVerif = [[5210596075], [4060137409]];
  const dataChartBelumVerif = [[5101660400], [5556944117]];
  return (
    <div>
      <NavigationBar />
      <div className="custom-container mt-4">
        <div className="row1 card">
          <div className="container-colom">
            <span className="inter-25 fw-500 text-pad">
              Target PAD {currentYear}:
            </span>
            <div className="card bg-blue  card-pad">
              <span className="inter-20 fw-500 pd-5">Rp 25.085.584.721,-</span>
            </div>
          </div>
        </div>
        <div className="row2 mtp-25 flex-x-center">
          <div className="colom1 card">
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
          <div className="colom2">
            <div className="c2-b1 card">
              <span className="inter-25 fw-bold mtp-25 ts-center">
                Total Berkas:
              </span>
              <div className="center mtp-10">
                <div className="card-tb-permohonan bg-blue">
                  {data && (
                    <span className="total-value">{data.total_berkas}</span>
                  )}
                  <p className="total-text">Jumlah Permohonan</p>
                </div>
              </div>
              <div className="center">
                <div className="card-tb-value bg-blue bg-blue">
                  {data && (
                    <span className="inter-20 pd-5 f-500">
                      Rp {data.total_berkas_rp}
                    </span>
                  )}
                </div>
              </div>
              <div className="center mtp-20">
                <div className="triangle triangle-bottoms"></div>
              </div>
            </div>
            <div className="container-colom2">
              <div className="card c2-b2-c1">
                <p className="inter-25 fw-bold ts-center mtp-50">
                  Berkas Terbit PBG {lastYear}:
                </p>
                <div className="bg-purple card-tt-tolak">
                  {data && (
                    <span className="total-value">
                      {data.berkas_terbit_last}
                    </span>
                  )}
                  <br />
                  <span className="total-text">Telah Terbit / Ditolak</span>
                </div>
                <div className="mlf-35">
                  <div className="card-tb-value bg-blue mt-2">
                    {data && (
                      <span className="inter-20 pd-5 f-500">
                        Rp{" "}
                        {data.berkas_terbit_last_year_rp.toLocaleString(
                          "id-ID"
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="card c2-b2-c2">
                <div className="container-colom">
                  <div className="clm-4 mt-5">
                    <span className="inter-25 fw-500 mlf-35">
                      Total Berkas {currentYear}:
                    </span>
                    <br />
                    {data && (
                      <span className="fs-50 fc-green f-500 mlf-35">
                        {data.total_berkas_now}
                      </span>
                    )}
                  </div>
                  <div className="clm-3"></div>
                  <div className="clm-4 mt-4">
                    <div className=" ts-center">
                      <span className="fw-500  inter-25">
                        Deviasi Target Dengan Potensi Total Berkas:
                      </span>
                      <br />
                      <div className="ts-right mrg-35">
                        <span className="fs-50 fc-red fw-500"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-colom">
                  <div className="ms-4 bg-blue">
                    <ChartStacked
                      data={dataChart}
                      color={color}
                      width="734px"
                    ></ChartStacked>
                  </div>
                </div>
                <div className="container-colom mtp-10">
                  <div className="clm-6 mlf-35">
                    {data && (
                      <span className="inter-20 ts-left fw-500">
                        {Math.round(data.total_berkas_now_perc)}%
                      </span>
                    )}
                  </div>
                  <div className="clm-6 ">
                    {data && (
                      <div className="ts-right mrg-35 fs-20 fw-500">
                        {data.deviasi_target_potensi_perc}%
                      </div>
                    )}
                  </div>
                </div>
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

            <div className="container-colom">
              <div className="col2-kosong"></div>
              <div className="col2-berkas-total">
                <div className="col2-berkas">
                  <div className="ts-center mtp-25">
                    <br></br>
                    <span className="inter-30 fw-700">
                      Total Berkas {currentYear}:
                    </span>
                  </div>
                  <div className="container-colom mtp-10">
                    <div className="clm-6 mlf-35 fw-500">
                      <div className="ts-center">
                        <span className="inter-25 ">
                          Berkas Aktual Terverifikasi Dinas Teknis:
                        </span>
                      </div>
                      <br />
                      {data && (
                        <span className="text-actual-verif">
                          {data.berkas_aktual_terverifikasi_dinas_teknis}
                        </span>
                      )}
                    </div>
                    <div className="clm-6 mlf-27">
                      <div className="ts-center">
                        <span className="inter-25 fw-500 ">
                          Berkas Aktual Belum Terverifikasi:
                        </span>
                      </div>
                      <br />
                      {data && (
                        <div className="ts-right mrg-35">
                          <span className="text-blm-actual-verif ">
                            {data.berkas_aktual_belum_terverifikasi}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="container-colom mtp-25 mlf-35">
                    <ChartStacked
                      data={dataChartVerif}
                      width="1270px"
                      color={color}
                    ></ChartStacked>
                  </div>
                  <div className="container-colom mtp-10">
                    <div className="clm-6 mlf-35">
                      {data && (
                        <span className="inter-20 ts-left fw-500">
                          {Math.round(
                            data.berkas_aktual_terverifikasi_dinas_teknis_perc
                          )}{" "}
                          %
                        </span>
                      )}
                    </div>
                    <div className="clm-6 ">
                      {data && (
                        <div className="ts-right mrg-35 fs-20 fw-500">
                          {Math.round(
                            data.berkas_aktual_belum_terverifikasi_perc
                          )}{" "}
                          %
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="container-colom">
                  <div className="separator1-row2-col2 boxCard">
                    <div className="center mt-2">
                      <div className="triangle triangle-bottoms"></div>
                    </div>
                  </div>
                  <div className="separator2-row2 boxCard">
                    <div className="center mt-3">
                      <div className="triangle triangle-bottoms"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-colom">
              <div className="boxColom1">
                <div className="container-colom boxCard">
                  <div className="berkas-terbit">
                    <br></br>
                    <div className="ts-center">
                      <span className="mlf-10 inter-30 fw-500">
                        Berkas Terbit PBG:
                      </span>
                    </div>
                    <div className="container-colom mlf-35">
                      <div className="card-luar bg-purple">
                        <Card className="bg-purple card-tt-tolak2">
                          {data && (
                            <span className="total-value">
                              {data.berkas_terbit_pbg}
                            </span>
                          )}
                          <span className="total-text">
                            Telah Terbit / Ditolak
                          </span>
                        </Card>
                      </div>
                    </div>
                    <div className="mlf-35 mtp-15">
                      {data && ( <span className="bg-blue inter-20 br-10 pd-5 fw-500">
                        Rp. {(data.berkas_terbit_pbg_rp).toLocaleString('id-ID')}
                      </span> )}
                    </div>
                    <div className="mlf-35 mtp-10">
                      {data && (
                        <span className="inter-20 ts-left fw-500">
                          {Math.round(data.berkas_terbit_pbg_perc)}%
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="proses-penerbitan">
                    <br></br>
                    <div className="ts-center">
                      <span className="mlf-10 inter-30 fw-500">
                        Proses Penerbitan:
                      </span>
                    </div>
                    <div className="ts-center mtp-20 mbt-25">
                      {data && (
                        <span className="fs-50 fc-green f-500 ">
                          {data.proses_penerbitan}
                        </span>
                      )}
                    </div>
                    <div className="mlf-35 mtp-75">
                      {data  && (<span className="bg-blue inter-20 br-10 pd-5 fw-500">
                        Rp. {(data.proses_penerbitan_rp).toLocaleString('id-ID')}
                      </span> )}
                    </div>
                    <div className="ts-right">
                      {data && (
                        <div className=" mrg-35 fs-20 fw-500">
                          {Math.round(data.proses_penerbitan_perc)} %
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* triangle */}
                <div className="container-colom">
                  <div className="separator-berkas1 boxCard">
                    <div className="center">
                      <div className="triangle triangle-top"></div>
                    </div>
                  </div>
                  <div className="separator-berkas2 boxCard">
                    <div className="center">
                      <div className="triangle triangle-bottoms"></div>
                    </div>
                  </div>
                </div>
                {/* end triangle */}
                <div className="container-colom">
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
                                {data.terproses_di_ptsp}
                              </span>
                            )}
                            <br />
                            <span className="total-text-pbg me-3 mb-1">
                              Dinas Perizinan
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mtp-20">
                        {data && (<span className="bg-blue inter-20 br-10 pd-5 fw-500">
                          Rp. {(data.terproses_di_ptsp_rp).toLocaleString('id-ID')}
                        </span> )}
                      </div>
                      <div className="mtp-15">
                        {data && (
                          <span className="inter-25 ts-left fw-500">
                            {Math.round(data.terproses_di_ptsp_perc)}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="card-dputr">
                    <div className="container-colom">
                      <div className="separator-dputr">
                        <div className="triangle triangle-left"></div>
                      </div>
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
                          {data && (<span className="bg-blue inter-20 br-10 pd-5 fw-500">
                            Rp. {(data.terproses_di_dputr_rp).toLocaleString('id-ID')}
                          </span>)}
                        </div>
                        <div className="mtp-10">
                          {data && (
                            <div className="ts-right mrg-35 inter-25 fw-500">
                              {Math.round(data.terproses_di_dputr_perc)}%
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
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
                    <div className="clm-6 ts-left ">
                      <span className="inter-25 fw-500">Potensi Besar:</span>
                      <br />
                      {data && (
                        <span className="text-actual-verif mtp-15">
                          {data.potensi_besar}
                        </span>
                      )}
                    </div>
                    <div className="clm-6 ts-right">
                      <span className="inter-25 fw-500">Potensi Kecil:</span>
                      <br />
                      {data && (
                        <span className="text-blm-actual-verif mtp-15">
                          {data.potensi_kecil}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mlf-35 mtp-50">
                    <ChartStacked
                      data={dataChartBelumVerif}
                      width="472px"
                      color={color2}
                    ></ChartStacked>
                  </div>
                  <div className="container-colom mtp-15">
                    <div className="clm-6 mlf-35">
                      {data && (
                        <span className="inter-20 ts-left fw-500">
                          {Math.round(data.potensi_besar_perc)} %
                        </span>
                      )}
                    </div>
                    <div className="clm-6 ">
                      {data && (
                        <div className="ts-right mrg-35 fs-20 fw-500">
                          {Math.round(data.potensi_kecil_perc)} %
                        </div>
                      )}
                    </div>
                  </div>
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
