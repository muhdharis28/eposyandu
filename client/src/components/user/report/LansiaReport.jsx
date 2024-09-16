import React, { useEffect, useState } from 'react';
import { getLansiaReports } from '../../LansiaService';

const ReportLansia = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const response = await getLansiaReports();
      console.log('ttttttttttttttttttttt', response.data)
      setReports(response.data);
    };
    fetchReports();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Laporan Lansia</h1>
      <table className="table-auto w-full">
        <tbody>
          <tr>
            <td className="px-4 py-2 font-bold">Total Lansia</td>
            <td className="px-4 py-2">{reports.totalLansia}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-bold">Average Age</td>
            <td className="px-4 py-2">{parseFloat(reports.averageAgeLansia).toFixed(2)}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-bold">Total Laki-laki</td>
            <td className="px-4 py-2">{reports.totalLakiLaki}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-bold">Total Perempuan</td>
            <td className="px-4 py-2">{reports.totalPerempuan}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReportLansia;
