import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';
import { getLansia, deleteLansia } from '../../LansiaService';
import { getPosyandus } from '../../PosyanduService';
import { Dropdown } from 'primereact/dropdown';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import posyandu from '@/assets/silaba.png';

const LansiaList = () => {
  const [lansiaList, setLansiaList] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [posyanduList, setPosyanduList] = useState([]);
  const [selectedPosyandu, setSelectedPosyandu] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    loadLansia();
    loadPosyanduList();
  }, []);

  const loadLansia = async () => {
    try {
      const result = await getLansia();
      const data = result.data;
      setLansiaList(Array.isArray(data) ? data : []);
    } catch (error) {
      setError('Failed to load lansia data.');
      console.error('Failed to load lansia data:', error);
    }
  };

  const refreshList = () => {
    loadLansia();
  };

  const handleAddLansia = () => {
    navigate('/lansia/baru');
  };

  const handleEditLansia = (id) => {
    navigate(`/lansia/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus lansia ini?');
    if (confirmDelete) {
      try {
        await deleteLansia(id);
        refreshList();
      } catch (error) {
        setError('Failed to delete lansia.');
        console.error('Failed to delete lansia:', error);
      }
    }
  };

  const handleViewDetail = (id) => {
    navigate(`/lansia/${id}`);
  };

  const loadPosyanduList = async () => {
    try {
      const result = await getPosyandus();
      setPosyanduList([{ nama: "Semua Posyandu" }, ...result.data]);
    } catch (error) {
      console.error('Failed to load posyandu data:', error);
    }
  };

  const handlePosyanduFilter = (e) => {
    setSelectedPosyandu(e.value);
  };

  const generatePDF = () => {
    setShowDialog(false); 
    const doc = new jsPDF();

    const imgWidth = 24;
    const imgHeight = 18;
    doc.addImage(posyandu, 'PNG', 14, 10, imgWidth, imgHeight);
    doc.setFontSize(18);
    doc.setTextColor('#007ACC');
    doc.text('SiLaBa Tanjungpinang', 40, 20);
    doc.setLineWidth(1);
    doc.setDrawColor(0, 122, 204);
    doc.line(14, 30, 196, 30);

    doc.setFontSize(16);
    doc.setTextColor('#000000');
    doc.text(`Laporan Lansia - ${selectedPosyandu?.nama || 'Semua Posyandu'}`, 14, 45);

    const columns = ['No', 'Nama Lansia', 'Nama Wali', 'Tempat Lahir', 'Tanggal Lahir', 'Posyandu'];
    const rows = lansiaList
      .filter((lansia) => !selectedPosyandu || selectedPosyandu.nama === 'Semua Posyandu' || lansia.posyanduDetail?.nama === selectedPosyandu.nama)
      .map((lansia, index) => [
        index + 1,
        lansia.nama_lansia,
        lansia.waliDetail.nama_wali,
        lansia.tempat_lahir_lansia,
        lansia.tanggal_lahir_lansia,
        lansia.posyanduDetail?.nama || '-',
      ]);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 55,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] },
      styles: { cellPadding: 2, fontSize: 10, halign: 'center' },
    });

    doc.save('Laporan_Lansia.pdf');
  };

  const filteredLansiaList = selectedPosyandu && selectedPosyandu.nama !== "Semua Posyandu"
  ? lansiaList.filter(lansia => lansia.posyanduDetail?.nama === selectedPosyandu.nama)
  : lansiaList;

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Button
            className="bg-green-500 text-white hover:bg-green-600 rounded-md flex items-center"
            onClick={handleAddLansia}
          >
            <span className="fas fa-plus mr-2"></span> Tambah
          </Button>
          <Button
            className="bg-blue-500 text-white hover:bg-blue-600 rounded-md flex items-center"
            onClick={() => setShowDialog(true)}
          >
            <span className="fas fa-print mr-2"></span> Cetak Laporan
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Dropdown
            value={selectedPosyandu}
            options={posyanduList}
            onChange={handlePosyanduFilter}
            optionLabel="nama"
            placeholder="Filter berdasarkan posyandu"
            className="p-dropdown-sm"
          />
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Kata kunci..."
            className="p-inputtext-sm md:w-30rem"
          />
        </div>
      </div>
    );
  };

  const dialogFooter = (
    <div className="flex justify-end">
      <Button label="Batal" icon="pi pi-times" className="p-button-text" onClick={() => setShowDialog(false)} />
      <Button label="Cetak" icon="pi pi-check" className="p-button" onClick={generatePDF} />
    </div>
  );

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex justify-end gap-2">
        <Button
          className="p-button-text bg-blue-400 text-white hover:bg-blue-500"
          onClick={() => handleViewDetail(rowData.id)}
        ><span className="fas fa-circle-info mr-3"></span> Detail </Button>
        <Button
          className="p-button-text bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => handleEditLansia(rowData.id)}
        ><span className="fas fa-edit mr-3"></span> Edit </Button>
        <Button
          className="p-button-text bg-red-500 text-white hover:bg-red-600"
          onClick={() => handleDelete(rowData.id)}
        ><span className="fas fa-trash mr-3"></span> Hapus </Button>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Data Lansia</h2>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <DataTable
        value={filteredLansiaList}
        paginator
        rows={10}
        globalFilter={globalFilter}
        emptyMessage="Data tidak ditemukan"
        header={renderHeader()}
      >
        <Column
          field="id"
          header="No"
          body={(rowData, options) => options.rowIndex + 1}
        />
        <Column field="nama_lansia" header="Nama Lansia" />
        <Column field="waliDetail.nama_wali" header="Nama Wali" />
        <Column field="tanggal_lahir_lansia" header="Tanggal Lahir Lansia" />
        <Column field="tempat_lahir_lansia" header="Tempat Lahir Lansia" />
        <Column field="posyanduDetail.nama" header="Posyandu" />
        <Column body={actionBodyTemplate} style={{ textAlign: 'center' }} />
      </DataTable>

      <Dialog header="Pilih Posyandu" visible={showDialog} style={{ width: '30vw' }} footer={dialogFooter} onHide={() => setShowDialog(false)}>
        <Dropdown
          value={selectedPosyandu}
          options={posyanduList}
          onChange={handlePosyanduFilter}
          optionLabel="nama"
          placeholder="Pilih Posyandu"
          className="w-full"
        />
      </Dialog>
    </div>
  );
};

export default LansiaList;
