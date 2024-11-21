import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';
import { getOrangTua, deleteOrangTua } from '../../OrangTuaService';
import { getPosyandus } from '../../PosyanduService';
import { Dropdown } from 'primereact/dropdown';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import posyandu from '@/assets/silaba.png';

const OrangtuaList = () => {
  const [orangtuaList, setOrangtuaList] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [posyanduList, setPosyanduList] = useState([]);
  const [selectedPosyandu, setSelectedPosyandu] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    loadOrangtua();
    loadPosyanduList();
  }, []);

  const loadOrangtua = async () => {
    try {
      const result = await getOrangTua();
      const data = result.data;
      setOrangtuaList(Array.isArray(data) ? data : []);
    } catch (error) {
      setError('Failed to load orangtua data.');
      console.error('Failed to load orangtua data:', error);
    }
  };

  const filteredOrangtuaList = selectedPosyandu && selectedPosyandu.nama !== "Semua Posyandu"
  ? orangtuaList.filter(orangtua => orangtua.posyanduDetail?.nama === selectedPosyandu.nama)
  : orangtuaList;

  const refreshList = () => {
    loadOrangtua();
  };

  const handleAddOrangtua = () => {
    navigate('/orangtua/baru');
  };

  const handleEditOrangtua = (id) => {
    navigate(`/orangtua/edit/${id}`);
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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data orangtua ini?');
    if (confirmDelete) {
      try {
        await deleteOrangTua(id);
        refreshList();
      } catch (error) {
        setError('Failed to delete orangtua data.');
        console.error('Failed to delete orangtua:', error);
      }
    }
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
    doc.text(`Laporan Orangtua - ${selectedPosyandu?.nama || 'Semua Posyandu'}`, 14, 45);

    const columns = ['No', 'Nama Ayah', 'NIK Ayah', 'Nama Ibu', 'NIK Ibu', 'Posyandu'];
    const rows = orangtuaList
      .filter((orangtua) => !selectedPosyandu || selectedPosyandu.nama === 'Semua Posyandu' || orangtua.posyanduDetail?.nama === selectedPosyandu.nama)
      .map((orangtua, index) => [
        index + 1,
        orangtua.nama_ayah,
        orangtua.nik_ayah,
        orangtua.nama_ibu,
        orangtua.nik_ibu,
        orangtua.posyanduDetail?.nama || '-',
      ]);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 55,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] },
      styles: { cellPadding: 2, fontSize: 10, halign: 'center' },
    });

    doc.save('Laporan_Orangtua.pdf');
  };

  const handleViewDetail = (id) => {
    navigate(`/orangtua/${id}`);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Button
            className="bg-green-500 text-white hover:bg-green-600 rounded-md flex items-center"
            onClick={handleAddOrangtua}
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
          onClick={() => handleEditOrangtua(rowData.id)}
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
        <h2 className="text-xl font-bold">Data Orangtua</h2>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <DataTable
        value={filteredOrangtuaList}
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
        <Column field="nama_ayah" header="Nama Ayah" />
        <Column field="nik_ayah" header="NIK Ayah" />
        <Column field="nama_ibu" header="Nama Ibu" />
        <Column field="nik_ibu" header="NIK Ibu" />
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

export default OrangtuaList;
