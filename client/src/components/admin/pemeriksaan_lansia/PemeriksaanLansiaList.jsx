import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';
import { getPemeriksaanLansia, deletePemeriksaanLansia } from '../../PemeriksaanLansiaService';
import { getPosyandus } from '../../PosyanduService';
import { Dropdown } from 'primereact/dropdown';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import posyandu from '@/assets/silaba.png';

const PemeriksaanLansiaList = () => {
  const [pemeriksaanLansiaList, setPemeriksaanLansiaList] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [posyanduList, setPosyanduList] = useState([]);
  const [selectedPosyandu, setSelectedPosyandu] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    loadPemeriksaanLansia();
    loadPosyanduList();
  }, []);

  const loadPemeriksaanLansia = async () => {
    try {
      const result = await getPemeriksaanLansia();
      setPemeriksaanLansiaList(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      setError('Failed to load pemeriksaan lansia data.');
      console.error('Failed to load pemeriksaan lansia data:', error);
    }
  };

  const refreshList = () => {
    loadPemeriksaanLansia();
  };

  const handleAddPemeriksaanLansia = () => {
    navigate('/pemeriksaan-lansia/baru');
  };

  const handleEditPemeriksaanLansia = (id) => {
    navigate(`/pemeriksaan-lansia/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus pemeriksaan ini?');
    if (confirmDelete) {
      try {
        await deletePemeriksaanLansia(id);
        refreshList();
      } catch (error) {
        setError('Failed to delete pemeriksaan.');
        console.error('Failed to delete pemeriksaan:', error);
      }
    }
  };

  const handleViewDetail = (id) => {
    navigate(`/pemeriksaan-lansia/${id}`);
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

    const columns = ['No', 'Nama Lansia', 'Tanggal Kunjungan', 'Berat Badan', 'Lingkar Perut', 'Tekanan Darah', 'Gula Darah', 'Kolestrol', 'Asam Urat', 'Kesehatan Mata', 'Dokter', 'Kader'];
    const rows = pemeriksaanLansiaList
      .filter((pemeriksaanLansia) => !selectedPosyandu || selectedPosyandu.nama === 'Semua Posyandu' || pemeriksaanLansia.posyanduDetail?.nama === selectedPosyandu.nama)
      .map((pemeriksaanLansia, index) => [
        index + 1,
        pemeriksaanLansia.lansiaDetail.nama_lansia,
        pemeriksaanLansia.tanggal_kunjungan,
        pemeriksaanLansia.berat_badan,
        pemeriksaanLansia.lingkar_perut,
        pemeriksaanLansia.tekanan_darah,
        pemeriksaanLansia.gula_darah,
        pemeriksaanLansia.kolestrol,
        pemeriksaanLansia.asam_urat,
        pemeriksaanLansia.kesehatan_mata,
        pemeriksaanLansia.dokterDetail.nama,
        pemeriksaanLansia.kaderDetail.nama,
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

  const filteredPemeriksaanLansiaList = selectedPosyandu && selectedPosyandu.nama !== "Semua Posyandu"
  ? pemeriksaanLansiaList.filter(pemeriksaanLansia => pemeriksaanLansia.posyanduDetail?.nama === selectedPosyandu.nama)
  : pemeriksaanLansiaList;

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <Button
          className="bg-green-500 text-white hover:bg-green-600 rounded-md flex items-center"
          onClick={handleAddPemeriksaanLansia}
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

  const actionBodyTemplate = (rowData) => (
    <div className="flex justify-end gap-2">
      <div className="flex justify-end gap-2">
        <Button
          className="p-button-text bg-blue-400 text-white hover:bg-blue-500"
          onClick={() => handleViewDetail(rowData.id)}
        ><span className="fas fa-circle-info mr-3"></span> Detail </Button>
        <Button
          className="p-button-text bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => handleEditPemeriksaanLansia(rowData.id)}
        ><span className="fas fa-edit mr-3"></span> Edit </Button>
        <Button
          className="p-button-text bg-red-500 text-white hover:bg-red-600"
          onClick={() => handleDelete(rowData.id)}
        ><span className="fas fa-trash mr-3"></span> Hapus </Button>
      </div>
    </div>
  );

  const dialogFooter = (
    <div className="flex justify-end">
      <Button label="Batal" icon="pi pi-times" className="p-button-text" onClick={() => setShowDialog(false)} />
      <Button label="Cetak" icon="pi pi-check" className="p-button" onClick={generatePDF} />
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Data Pemeriksaan Lansia</h2>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <DataTable
        value={filteredPemeriksaanLansiaList}
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
        <Column field="lansiaDetail.nama_lansia" header="Nama Lansia" />
        <Column field="tanggal_kunjungan" header="Tanggal Kunjungan" />
        <Column field="berat_badan" header="Berat Badan" />
        <Column field="tinggi_badan" header="Tinggi Badan" />
        <Column field="lingkar_perut" header="Lingkar Perut" />
        <Column field="tekanan_darah" header="Tekanan Darah" />
        <Column field="gula_darah" header="Gula Darah" />
        <Column field="kolestrol" header="Kolestrol" />
        <Column field="asam_urat" header="Asam Urat" />
        <Column field="kesehatan_mata" header="Kesehatan Mata" />
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

export default PemeriksaanLansiaList;