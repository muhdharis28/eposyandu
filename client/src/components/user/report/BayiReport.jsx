import React, { useEffect, useState } from 'react';
import { getBalitaReports } from '../../BayiService';

const ReportBalita = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const response = await getBalitaReports();
      setReports(response.data);
    };
    fetchReports();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Laporan Balita</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Umur</th>
            <th className="px-4 py-2">Berat Badan</th>
            <th className="px-4 py-2">Tinggi Badan</th>
            <th className="px-4 py-2">Status Gizi</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td className="border px-4 py-2">{report.nama}</td>
              <td className="border px-4 py-2">{report.umur}</td>
              <td className="border px-4 py-2">{report.berat_badan}</td>
              <td className="border px-4 py-2">{report.tinggi_badan}</td>
              <td className="border px-4 py-2">{report.status_gizi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportBalita;
