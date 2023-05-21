import NavigationBar from "../../components/NavigationsBar";
import Navbar2 from "../../components/Navbar2";
import { Col, Row, Container, Card, Button } from "react-bootstrap";
import BoxCard from "../../components/BoxCard";
// import "../../assets/css/style.css";
import "../../assets/css/style2.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect } from "react";
import ChartStacked from "../../components/ChartStacked";

const FixDashboard = () => {
  return (
    <div>
      <Navbar2 />
      <div className="container">
        <div className="row1 card">
          <div className="container-colom">
            <span className="inter-25 fw-500 text-pad">Target PAD 2023:</span>
            <div className="card bg-blue  card-pad">
              <span className="inter-20 fw-500 pd-5">Rp 25.085.584.721,-</span>
            </div>
          </div>
        </div>
        <div className="row2 mtp-25">
          <div className="colom1 card">
            <span className="inter-20 fw-500 mtp-25">
              Rekapitulasi Proses Persetujuan Bangunan Gedung (PBG)
            </span>
            <BoxCard className="box-card bg-blue">
              <p className="pgb-value">2450</p>
              <p className="pgb-text">Jumlah Permohonan</p>
            </BoxCard>
            <BoxCard className="box-card bg-green">
              <p className="pgb-value">1558</p>
              <p className="pgb-text">Dinas Teknis</p>
            </BoxCard>
            <BoxCard className="box-card bg-red">
              <p className="pgb-value">76</p>
              <p className="pgb-text">Dinas Peizinan</p>
            </BoxCard>
            <BoxCard className="box-card bg-purple">
              <p className="pgb-value">816/0</p>
              <p className="pgb-text">Telah Terbit / Ditolak</p>
            </BoxCard>
          </div>
          <div className="colom2">
            <div className="c2-b1 card">
              <span className="inter-25 fw-500 mtp-25 ts-center">
                Total Berkas:
              </span>
              <div className="center mtp-10">
                <div className="card-tb-permohonan bg-blue">
                  <span className="total-value">2500</span>
                  <p className="total-text">Jumlah Permohonan</p>
                </div>
              </div>
              <div className="center">
                <div className="card-tb-value bg-blue bg-blue">
                  <span className="inter-20 pd-5 f-500">Rp 33.171.612.765</span>
                </div>
              </div>
              <div className="center mtp-20">
                <div className="triangle triangle-bottoms"></div>
              </div>
            </div>
            <div className="container-colom2">
              <div className="card c2-b2-c1">
                <p className="inter-25 fw-500 mtp-50">
                  Berkas Terbit PBG 2022:
                </p>
                <div className="bg-purple card-tt-tolak">
                  <span className="total-value">2500</span>
                  <br />
                  <span className="total-text">Telah Terbit / Ditolak</span>
                </div>
                <div className="mlf-35">
                  <div className="card-tb-value bg-blue mt-2">
                    <span className="inter-20 pd-5 f-500">
                      Rp 8.214.151.978
                    </span>
                  </div>
                </div>
              </div>
              <div className="card c2-b2-c2">
                <div className="container-colom">
                  <div className="clm-4 mt-5">
                    <span className="inter-25 fw-500 mlf-35">
                      Total Berkas 2023:
                    </span>
                    <br />
                    <span className="fs-50 fc-green f-500 mlf-35">1805</span>
                  </div>
                  <div className="clm-3"></div>
                  <div className="clm-4 mt-4 ts-right">
                    <div className="mrg-35">
                      <span className="fw-500 inter-25">
                        Deviasi Target Dengan Potensi Total Berkas:
                      </span>
                      <br />
                      <span className="fs-50 fc-red fw-500">18</span>
                    </div>
                  </div>
                </div>
                <div className="container-colom">
                  <div className="ms-4 bg-blue">
                    <ChartStacked width="734px"></ChartStacked>
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
          </div>
        </div>
        <div className="row3">
          <div className="colom1 card">
            <div className="ts-center">
              <span className="inter-30 fw-700">Berkas Terbit PBG:</span>
            </div>
            <div className="container-colom mtp-10">
              <div className="clm-6">
                <div className="mlf-15">
                  <span className="inter-23 fw-500 text-right">
                    Terposes di PTSP:
                  </span>
                  <Card className="bg-red mt-3">
                    <span className="total-value-pbg text-right me-3">76</span>
                    <span className="total-text-pbg text-right me-3 mb-1">
                      Dinas Perizinan
                    </span>
                  </Card>
                </div>
              </div>
              <div className="clm-6">
                <span className="inter-23 fw-500">Terposes di DPUTR:</span>
                <Card className="mt-3 border-0">
                  <span className="text-dputr text-right me-3 f-500">321</span>
                </Card>
              </div>
            </div>
            <div className="container-colom mlf-15 mtp-10">
              <ChartStacked width="285px"></ChartStacked>
            </div>
            <div className="container-colom mlf-15 ">
              <ChartStacked width="285px"></ChartStacked>
            </div>
          </div>
          <div className="colom2 card">
            <div className="ts-center mtp-25">
              <span className="inter-30 fw-700">Total Berkas 2023:</span>
            </div>
            <div className="container-colom">
              <div className="clm-35 mlf-35">
                <span className="inter-25 fw-500">
                  Berkas Aktual Terverifikasi Dinas Teknis:
                </span>
                <br />
                <span className="text-actual-verif">568</span>
              </div>
              <div className="clm-30"></div>
              <div className="clm-25 mlf-27">
                <span className="inter-25 fw-500">
                  Berkas Aktual Belum Terverifikasi:
                </span>
                <br />
                <span className="text-blm-actual-verif">1237</span>
              </div>
            </div>
            <div className="container-colom mtp-25 mlf-35">
              <ChartStacked width="935px" ></ChartStacked>
            </div>
          </div>
        </div>
        <div className="row4">
          <div className="separator1-row4 card">
            <div className="center mt-2">
              <div className="triangle triangle-top"></div>
            </div>
          </div>
          <div className="separator2-row4 card">
            <div className="center mt-3">
              <div className="triangle triangle-bottoms"></div>
            </div>
          </div>
          <div className="separator3-row4 card">
            <div className="center mt-3">
              <div className="triangle triangle-bottoms"></div>
            </div>
          </div>
        </div>
        <div className="row5">
          <div className="colom1 card">
            <div className="ts-center mtp-20">
              <span className="inter-30 fw-700">
                Berkas Aktual Terverifikasi Dinas Teknis
              </span>
            </div>
            <div className="container-35 mtp-20">
              <div className="clm-6">
                <span className="inter-25 fw-500 mtp-10">
                  Berkas Terbit PBG:
                </span>
                <div className="container-colom">
                  <Card className="mt-2 bg-purple card-tt-tolak2">
                    <span className="total-value">171</span>
                    <span className="total-text">Telah Terbit / Ditolak</span>
                  </Card>
                  <div className="end">
                    <div className="triangle triangle-left"></div>
                  </div>
                </div>
              </div>
              <div className="clm-6 ts-right">
                <span className="inter f-500 ">Proses Penerbitan:</span>
                <br />
                <div>
                  <span className="fs-50 fc-red f-500 mtp-10">568</span>
                </div>
              </div>
            </div>
            <div className="mlf-35 mtp-10">
              <ChartStacked width="600px"/>
            </div>
          </div>
          <div className="colom2 card">
            <div className="ts-center mtp-20">
              <span className="inter-30 fw-700">
                Berkas Aktual Belum Terverifikasi
              </span>
            </div>
            <div className="container-35 mtp-20">
              <div className="clm-6 ts-left ">
                <span className="inter-25 fw-500">Potensi Besar:</span>
                <br />
                <span className="text-actual-verif">47</span>
              </div>
              <div className="clm-6 ts-right">
                <span className="inter-25 fw-500">Potensi Kecil:</span>
                <br />
                <span className="text-blm-actual-verif">1237</span>
              </div>
            </div>
            <div className="mlf-35 mtp-10">
              <ChartStacked width="600px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixDashboard;
