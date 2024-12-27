import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import { getPengguna, deletePengguna, updatePenggunaVerifikasi } from '../../PenggunaService';
import { getPosyandus } from '../../PosyanduService';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import posyandu from '@/assets/silaba.png';

const PenggunaList = () => {
  const [penggunaList, setPenggunaList] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [error, setError] = useState('');
  const [posyanduList, setPosyanduList] = useState([]);
  const [selectedPosyandu, setSelectedPosyandu] = useState(null);
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    loadPengguna();
    loadPosyanduList();
  }, []);

  const loadPengguna = async () => {
    try {
      const result = await getPengguna();
      const data = result.data;
      setPenggunaList(Array.isArray(data) ? data : []);
    } catch (error) {
      setError('Failed to load pengguna data or unauthorized.');
      console.error('Failed to load pengguna data:', error);
    }
  };

  const loadPosyanduList = async () => {
    try {
      const result = await getPosyandus();
      setPosyanduList([{ nama: "Semua Posyandu" }, ...result.data]);
    } catch (error) {
      console.error('Failed to load posyandu data:', error);
    }
  };

  const refreshList = () => {
    loadPengguna();
  };

  const handlePosyanduFilter = (e) => {
    setSelectedPosyandu(e.value);
  };

  const handleAddPengguna = () => {
    navigate('/pengguna/baru');
  };

  const handleEditPengguna = (id) => {
    navigate(`/pengguna/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?');
    if (confirmDelete) {
      try {
        await deletePengguna(id);
        refreshList();
      } catch (error) {
        setError('Failed to delete pengguna or unauthorized.');
        console.error('Failed to delete pengguna:', error);
      }
    }
  };

  const handleViewDetail = (id) => {
    navigate(`/pengguna/${id}`);
  };

  const handleVerifikasi = async (id) => {
    try {
        await updatePenggunaVerifikasi(id);

      
        setPenggunaList((prevList) =>
            prevList.map((pengguna) =>
                pengguna.id === id ? { ...pengguna, verifikasi: true } : pengguna
            )
        );
    } catch (error) {
        console.error("Failed to verify user:", error);
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
    doc.text(`Laporan Pengguna - ${selectedPosyandu?.nama || 'Semua Posyandu'}`, 14, 45);

    const columns = ['No', 'Nama Pengguna', 'No Hp', 'Role', 'Posyandu', 'Verifikasi'];
    const rows = penggunaList
      .filter((pengguna) => !selectedPosyandu || selectedPosyandu.nama === 'Semua Posyandu' || pengguna.posyanduDetail?.nama === selectedPosyandu.nama)
      .map((pengguna, index) => [
        index + 1,
        pengguna.nama,
        pengguna.no_hp,
        pengguna.role,
        pengguna.posyanduDetail?.nama || '-',
        pengguna.verifikasi,
      ]);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 55,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] },
      styles: { cellPadding: 2, fontSize: 10, halign: 'center' },
    });

    doc.save('Laporan_Pengguna.pdf');
  };

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <Button
          className="bg-green-500 text-white hover:bg-green-600 rounded-md flex items-center"
          onClick={handleAddPengguna}
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

  const dialogFooter = (
    <div className="flex justify-end">
      <Button label="Batal" icon="pi pi-times" className="p-button-text" onClick={() => setShowDialog(false)} />
      <Button label="Cetak" icon="pi pi-check" className="p-button" onClick={generatePDF} />
    </div>
  );

  const filteredPenggunaList = selectedPosyandu && selectedPosyandu.nama !== "Semua Posyandu"
  ? penggunaList.filter(pengguna => pengguna.posyanduDetail?.nama === selectedPosyandu.nama)
  : penggunaList;

  const actionBodyTemplate = (rowData) => (
    <div className="flex flex-col items-end gap-2">
      <div className="flex justify-end gap-2">
        {!rowData.verifikasi && (
          <Button
            className="p-button-text bg-green-400 text-white hover:bg-green-500"
            onClick={() => handleVerifikasi(rowData.id)}
          >
            <span className="fas fa-check mr-3"></span> Verifikasi
          </Button>
        )}
        <Button
          className="p-button-text bg-blue-400 text-white hover:bg-blue-500"
          onClick={() => handleViewDetail(rowData.id)}
        >
          <span className="fas fa-circle-info mr-3"></span> Detail
        </Button>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          className="p-button-text bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => handleEditPengguna(rowData.id)}
        >
          <span className="fas fa-edit mr-3"></span> Edit
        </Button>
        <Button
          className="p-button-text bg-red-500 text-white hover:bg-red-600"
          onClick={() => handleDelete(rowData.id)}
        >
          <span className="fas fa-trash mr-3"></span> Hapus
        </Button>
      </div>
    </div>
  );

  const verifikasiTemplate = (rowData) => {
    return (
        <Badge 
            value={rowData.verifikasi ? "Terverifikasi" : "Belum Diverifikasi"} 
            severity={rowData.verifikasi ? "success" : "warning"} 
        />
    );
};

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">Data Pengguna</h2>

    </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <DataTable
        value={filteredPenggunaList}
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
        <Column field="nama" header="Nama Pengguna" />
        <Column field="no_hp" header="No HP" />
        <Column field="role" header="Role" />
        <Column field="posyanduDetail.nama" header="Posyandu" />
        <Column field="verifikasi" header="Status" body={verifikasiTemplate} />
        <Column
          body={actionBodyTemplate}
          style={{ textAlign: 'center' }}
        />
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

export default PenggunaList;
