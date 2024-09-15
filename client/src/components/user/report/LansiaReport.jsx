import React, { useEffect, useState } from 'react';
import { getLansiaReports } from '../../LansiaService';

const ReportLansia = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const response = await getLansiaReports();
      setReports(response.data);
    };
    fetchReports();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Laporan Lansia</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Umur</th>
            <th className="px-4 py-2">Kesehatan</th>
            <th className="px-4 py-2">Keluhan</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td className="border px-4 py-2">{report.nama}</td>
              <td className="border px-4 py-2">{report.umur}</td>
              <td className="border px-4 py-2">{report.kesehatan_umum}</td>
              <td className="border px-4 py-2">{report.keluhan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportLansia;
