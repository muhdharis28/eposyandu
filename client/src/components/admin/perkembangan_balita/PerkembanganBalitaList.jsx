import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';
import { getPerkembanganBalitas, deletePerkembanganBalita } from '../../PerkembanganBalitaService';
import { getPosyandus } from '../../PosyanduService';
import { Dropdown } from 'primereact/dropdown';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import posyandu from '@/assets/silaba.png';

const PerkembanganBalitaList = () => {
  const [perkembanganBalitaList, setPerkembanganBalitaList] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [posyanduList, setPosyanduList] = useState([]);
  const [selectedPosyandu, setSelectedPosyandu] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    loadPerkembanganBalitas();
    loadPosyanduList();
  }, []);

  const loadPerkembanganBalitas = async () => {
    try {
      const result = await getPerkembanganBalitas();
      const data = result.data;
      setPerkembanganBalitaList(Array.isArray(data) ? data : []);
    } catch (error) {
      setError('Failed to load Perkembangan Balita data.');
      console.error('Failed to load data:', error);
    }
  };

  const refreshList = () => {
    loadPerkembanganBalitas();
  };

  const handleAddPerkembanganBalita = () => {
    navigate('/perkembangan-balita/baru');
  };

  const handleEditPerkembanganBalita = (id) => {
    navigate(`/perkembangan-balita/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data perkembangan balita ini?');
    if (confirmDelete) {
      try {
        await deletePerkembanganBalita(id);
        refreshList();
      } catch (error) {
        setError('Failed to delete Perkembangan Balita.');
        console.error('Failed to delete:', error);
      }
    }
  };

  const handleViewDetail = (id) => {
    navigate(`/perkembangan-balita/${id}`);
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
    doc.text(`Laporan Pemeriksaan Lansia - ${selectedPosyandu?.nama || 'Semua Posyandu'}`, 14, 45);

    const columns = ['No', 'Nama Lansia', 'Tanggal Kunjungan', 'Berat Badan', 'Tinggi Badan', 'Lingkar Kepala', 'Status Gizi', 'Imunisasi', 'Vitamin', 'Dokter', 'Kader'];
    const rows = perkembanganBalitaList
      .filter((perkembanganBalita) => !selectedPosyandu || selectedPosyandu.nama === 'Semua Posyandu' || perkembanganBalita.posyanduDetail?.nama === selectedPosyandu.nama)
      .map((perkembanganBalita, index) => [
        index + 1,
        perkembanganBalita.balitaDetail.nama_lansia,
        perkembanganBalita.tanggal_kunjungan,
        perkembanganBalita.berat_badan,
        perkembanganBalita.tinggi_badan,
        perkembanganBalita.lingkar_kepala,
        perkembanganBalita.status_gizi,
        perkembanganBalita.tipe_imunisasi,
        perkembanganBalita.tipe_vitamin,
        perkembanganBalita.dokterDetail.nama,
        perkembanganBalita.kaderDetail.nama,
      ]);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 55,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] },
      styles: { cellPadding: 2, fontSize: 10, halign: 'center' },
    });

    doc.save('Laporan_Pemeriksaan_Lansia.pdf');
  };

  const filteredPerkembanganBalitaList = selectedPosyandu && selectedPosyandu.nama !== "Semua Posyandu"
  ? perkembanganBalitaList.filter(perkembanganBalita => perkembanganBalita.posyanduDetail?.nama === selectedPosyandu.nama)
  : perkembanganBalitaList;

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
        <Button
          className="bg-green-500 text-white hover:bg-green-600 rounded-md flex items-center"
          onClick={handleAddPerkembanganBalita}
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

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex justify-end gap-2">
        <Button
          className="p-button-text bg-blue-400 text-white hover:bg-blue-500"
          onClick={() => handleViewDetail(rowData.id)}
        ><span className="fas fa-circle-info mr-3"></span> Detail </Button>
        <Button
          className="p-button-text bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => handleEditPerkembanganBalita(rowData.id)}
        ><span className="fas fa-edit mr-3"></span> Edit </Button>
        <Button
          className="p-button-text bg-red-500 text-white hover:bg-red-600"
          onClick={() => handleDelete(rowData.id)}
        ><span className="fas fa-trash mr-3"></span> Hapus </Button>
      </div>
    );
  };

  const dialogFooter = (
    <div className="flex justify-end">
      <Button label="Batal" icon="pi pi-times" className="p-button-text" onClick={() => setShowDialog(false)} />
      <Button label="Cetak" icon="pi pi-check" className="p-button" onClick={generatePDF} />
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Data Perkembangan Balita</h2>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <DataTable
        value={filteredPerkembanganBalitaList}
        paginator
        rows={10}
        globalFilter={globalFilter}
        emptyMessage="Data tidak ditemukan"
        header={renderHeader()}
      >
        <Column field="id" header="No" body={(rowData, options) => options.rowIndex + 1} />
        <Column field="balitaDetail.nama_balita" header="Nama Balita" />
        <Column field="tanggal_kunjungan" header="Tanggal Kunjungan" />
        <Column field="berat_badan" header="Berat Badan (kg)" />
        <Column field="tinggi_badan" header="Tinggi Badan (cm)" />
        <Column field="lingkar_kepala" header="Lingkar Kepala (cm)" />
        <Column field="status_gizi" header="Status Gizi" />
        <Column field="tipe_imunisasi" header="Imunisasi" />
        <Column field="tipe_vitamin" header="Vitamin" />
        <Column field="dokterDetail.nama" header="Dokter" />
        <Column field="kaderDetail.nama" header="Kader" />
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

export default PerkembanganBalitaList;
