import NavigationBar from "../../components/NavigationsBar";
import { Card } from "react-bootstrap";
import BoxCard from "../../components/BoxCard";
import React,{useState, useEffect} from "react";
import axios  from "axios";
import BarchartStacked from "../../components/BarchartStacked";

import ChartStacked from "../../components/ChartStacked";
// import { async } from "q";

const FixDashboard = () => {
  //kiri -> getter, kanan -> setter
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;
  const [data, setData] = useState(null);
  const dataChart = [[24957460787],[128123934]];
  const dataChartPbgAtas = [[358],[3701]];
  const dataChartPbgBawah = [[393739],[197670]];
  const dataChartVerif = [[9270733484],[15686727303]];
  const dataChartSudahVerif = [[5210596075],[4060137409]];
  const dataChartBelumVerif = [[10778885200],[4907842103]];

  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/simbg/coba");
      setData(response.data.data);
      // console.log(response.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="custom-container mt-4">
        <div className="row1 card">
          <div className="container-colom">
            <span className="inter-25 fw-500 text-pad">Target PAD {currentYear}:</span>
            <div className="card bg-blue  card-pad">
              <span className="inter-20 fw-500 pd-5">Rp 25.085.584.721,-</span>
            </div>
          </div>
        </div>
        <div className="row2 mtp-25 flex-x-center">
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
                  {data && <span className="total-value">{data.total_berkas}</span>}
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
                  Berkas Terbit PBG {lastYear}:
                </p>
                <div className="bg-purple card-tt-tolak">
                  {data && <span className="total-value">{data.berkas_terbit_last}</span> }
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
                      Total Berkas  {currentYear}:
                    </span>
                    <br />
                    {data && <span className="fs-50 fc-green f-500 mlf-35">{data.total_berkas_now}</span>}
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
                    <ChartStacked data={dataChart} width="734px"></ChartStacked>
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
        <div className="row3 flex-x-center">
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
                    {data && <span className="total-value-pbg text-right me-3">{data.terproses_di_ptsp}</span>}
                    <span className="total-text-pbg text-right me-3 mb-1">
                      Dinas Perizinan
                    </span>
                  </Card>
                </div>
              </div>
              <div className="clm-6">
                <span className="inter-23 fw-500">Terposes di DPUTR:</span>
                <Card className="mt-3 border-0">
                  {data && <span className="text-dputr text-right me-3 f-500">{data.berkas_terbit_pbg}</span>}
                </Card>
              </div>
            </div>
            <div className="container-colom mlf-15 mtp-10">
              <ChartStacked data={dataChartPbgAtas} width="285px"></ChartStacked>
            </div>
            <div className="container-colom mlf-15 ">
              <ChartStacked data={dataChartPbgBawah} width="285px"></ChartStacked>
            </div>
          </div>
          <div className="colom2 card">
            <div className="ts-center mtp-25">
              <span className="inter-30 fw-700">Total Berkas {currentYear}:</span>
            </div>
            <div className="container-colom">
              <div className="clm-35 mlf-35">
                <span className="inter-25 fw-500">
                  Berkas Aktual Terverifikasi Dinas Teknis:
                </span>
                <br />
                {data && <span className="text-actual-verif">{data.berkas_aktual_terverifikasi_dinas_teknis}</span> }
              </div>
              <div className="clm-30"></div>
              <div className="clm-25 mlf-27">
                <span className="inter-25 fw-500">
                  Berkas Aktual Belum Terverifikasi:
                </span>
                <br />
                  {data && <span className="text-blm-actual-verif">{data.berkas_aktual_belum_terverifikasi}</span>}
              </div>
            </div>
            <div className="container-colom mtp-25 mlf-35">
              <ChartStacked data={dataChartVerif} width="935px" ></ChartStacked>
            </div>
          </div>
        </div>
        <div className="row4 flex-x-center">
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
        <div className="row5 flex-x-center">
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
              <ChartStacked data={dataChartSudahVerif} width="600px"/>
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
            <ChartStacked data={dataChartBelumVerif} width="600px"></ChartStacked>
              {/* <ChartStacked data={dataChartBelumVerif} width="600px" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixDashboard;
