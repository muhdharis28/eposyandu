import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for breadcrumb navigation
import { createLansia } from '../../LansiaService'; // Service to handle API requests
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import { useSidebar } from '../../SideBarContext';
import { getJobs } from '../../PekerjaanService'; // Import the service
import { getPendidikans } from '../../PendidikanService';
import { getPengguna } from '../../PenggunaService'; // For fetching all users to select Wali

const AddLansiaForm = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    no_kk_lansia: '',
    wali: '', // Field for Wali (selected manually)
    nik_lansia: '',
    nama_lansia: '',
    tempat_lahir_lansia: '',
    tanggal_lahir_lansia: '',
    jenis_kelamin_lansia: '',
    alamat_ktp_lansia: '',
    kelurahan_ktp_lansia: '',
    kecamatan_ktp_lansia: '',
    kota_domisili_lansia_ktp_lansia: '',
    provinsi_ktp_lansia: '',
    alamat_domisili_lansia: '',
    kelurahan_domisili_lansia: '',
    kecamatan_domisili_lansia: '',
    kota_domisili_lansia: '',
    provinsi_domisili_lansia: '',
    no_hp_lansia: '',
    email_lansia: '',
    pekerjaan_lansia: '',
    pendidikan_lansia: '',
    status_pernikahan_lansia: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pekerjaanOptions, setPekerjaanOptions] = useState([]);
  const [pendidikanOptions, setPendidikanOptions] = useState([]);
  const [waliOptions, setWaliOptions] = useState([]); // State for Wali options
  const [errors, setErrors] = useState({}); // State to handle validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const pekerjaanRes = await getJobs();
        const pendidikanRes = await getPendidikans();
        const waliRes = await getPengguna(); // Fetch all users to be selected as Wali

        setPekerjaanOptions(pekerjaanRes.data);
        setPendidikanOptions(pendidikanRes.data);
        setWaliOptions(waliRes.data); // Set Wali options
      } catch (error) {
        console.error('Error fetching dropdown options:', error);
      }
    };

    fetchDropdownOptions();
  }, []);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.no_kk_lansia) newErrors.no_kk_lansia = 'Nomor KK is required';
    if (!formData.wali) newErrors.wali = 'Wali is required'; // Validate Wali field
    if (!formData.nik_lansia) newErrors.nik_lansia = 'NIK is required';
    if (!formData.nama_lansia) newErrors.nama_lansia = 'Nama Lansia is required';
    if (!formData.tempat_lahir_lansia) newErrors.tempat_lahir_lansia = 'Tempat Lahir is required';
    if (!formData.tanggal_lahir_lansia) newErrors.tanggal_lahir_lansia = 'Tanggal Lahir is required';
    if (!formData.jenis_kelamin_lansia) newErrors.jenis_kelamin_lansia = 'Jenis Kelamin is required';
    if (!formData.alamat_ktp_lansia) newErrors.alamat_ktp_lansia = 'Alamat KTP is required';
    if (!formData.no_hp_lansia) {
      newErrors.no_hp_lansia = 'Nomor HP is required';
    } else if (!/^[0-9]+$/.test(formData.no_hp_lansia)) {
      newErrors.no_hp_lansia = 'Nomor HP harus angka';
    }
    if (formData.email_lansia && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_lansia)) {
      newErrors.email_lansia = 'Email tidak valid';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return; // If validation fails, stop form submission
      }

    setIsSubmitting(true);
    try {
      await createLansia(formData); // Pass the form data including selected Wali
      navigate('/kader-lansia');
    } catch (error) {
      console.error('Error adding Lansia:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onToggle={toggleSidebar} />
      <div className="flex flex-grow transition-all duration-500 ease-in-out">
        <SideBar isCollapsed={isSidebarCollapsed} />
        <div className="flex-1 bg-gray-100 p-6 transition-all duration-500 ease-in-out mt-16">
          
          {/* Breadcrumb for navigation */}
          <nav className="text-gray-600 mb-4">
            <Link to="/kader-lansia" className="hover:underline">Lansia List</Link> &gt; Tambah Lansia
          </nav>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Tambah Lansia</h1>
            <form onSubmit={handleSubmit}>
              {/* Four Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold">No KK</label>
                  <input
                    type="text"
                    name="no_kk_lansia"
                    value={formData.no_kk_lansia}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.no_kk_lansia && <p className="text-red-500 text-sm">{errors.no_kk_lansia}</p>}
                </div>
                
                {/* Adding Wali Field */}
                <div>
                  <label className="block text-sm font-semibold">Wali</label>
                  <select
                    name="wali"
                    value={formData.wali}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  >
                    <option value="">Pilih Wali</option>
                    {waliOptions.map((wali) => (
                      <option key={wali.id} value={wali.id}>
                        {wali.nama} ({wali.no_hp})
                      </option>
                    ))}
                  </select>
                  {errors.wali && <p className="text-red-500 text-sm">{errors.wali}</p>}
                </div>
                
                {/* Other fields for Lansia data ... */}
                <div>
                  <label className="block text-sm font-semibold">NIK</label>
                  <input
                    type="text"
                    name="nik_lansia"
                    value={formData.nik_lansia}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.nik_lansia && <p className="text-red-500 text-sm">{errors.nik_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Nama Lansia</label>
                  <input
                    type="text"
                    name="nama_lansia"
                    value={formData.nama_lansia}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.nama_lansia && <p className="text-red-500 text-sm">{errors.nama_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Tempat Lahir</label>
                  <input
                    type="text"
                    name="tempat_lahir_lansia"
                    value={formData.tempat_lahir_lansia}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.tempat_lahir_lansia && <p className="text-red-500 text-sm">{errors.tempat_lahir_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Tanggal Lahir</label>
                  <input
                    type="date"
                    name="tanggal_lahir_lansia"
                    value={formData.tanggal_lahir_lansia}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.tanggal_lahir_lansia && <p className="text-red-500 text-sm">{errors.tanggal_lahir_lansia}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold">Jenis Kelamin</label>
                  <select
                    name="jenis_kelamin_lansia"
                    value={formData.jenis_kelamin_lansia}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  >
                    <option value="">Pilih</option>
                    <option value="l">Laki-laki</option>
                    <option value="p">Perempuan</option>
                  </select>
                  {errors.jenis_kelamin_lansia && <p className="text-red-500 text-sm">{errors.jenis_kelamin_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Alamat KTP</label>
                  <input
                    type="text"
                    name="alamat_ktp_lansia"
                    value={formData.alamat_ktp_lansia}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.alamat_ktp_lansia && <p className="text-red-500 text-sm">{errors.alamat_ktp_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Kelurahan KTP</label>
                  <input
                    type="text"
                    name="kelurahan_ktp_lansia"
                    value={formData.kelurahan_ktp_lansia}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.kelurahan_ktp_lansia && <p className="text-red-500 text-sm">{errors.kelurahan_ktp_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Kecamatan KTP</label>
                  <input
                    type="text"
                    name="kecamatan_ktp_lansia"
                    value={formData.kecamatan_ktp_lansia}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  {errors.kecamatan_ktp_lansia && <p className="text-red-500 text-sm">{errors.kecamatan_ktp_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Kota KTP</label>
                  <input
                    type="text"
                    name="kota_ktp_lansia"
                    value={formData.kota_ktp_lansia}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                    {errors.kota_ktp_lansia && <p className="text-red-500 text-sm">{errors.kota_ktp_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Provinsi KTP</label>
                  <input
                    type="text"
                    name="provinsi_ktp_lansia"
                    value={formData.provinsi_ktp_lansia}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                    {errors.provinsi_ktp_lansia && <p className="text-red-500 text-sm">{errors.provinsi_ktp_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Alamat Domisili</label>
                  <input
                    type="text"
                    name="alamat_domisili_lansia"
                    value={formData.alamat_domisili_lansia}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                    {errors.alamat_domisili_lansia && <p className="text-red-500 text-sm">{errors.alamat_domisili_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Kelurahan Domisili</label>
                  <input
                    type="text"
                    name="kelurahan_domisili_lansia"
                    value={formData.kelurahan_domisili_lansia}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                    {errors.kelurahan_domisili_lansia && <p className="text-red-500 text-sm">{errors.kelurahan_domisili_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Kecamatan Domisili</label>
                  <input
                    type="text"
                    name="kecamatan_domisili_lansia"
                    value={formData.kecamatan_domisili_lansia}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                    {errors.kecamatan_domisili_lansia && <p className="text-red-500 text-sm">{errors.kecamatan_domisili_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Kota Domisili</label>
                  <input
                    type="text"
                    name="kota_domisili_lansia"
                    value={formData.kota_domisili_lansia}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                    {errors.kota_domisili_lansia && <p className="text-red-500 text-sm">{errors.kota_domisili_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Provinsi Domisili</label>
                  <input
                    type="text"
                    name="provinsi_domisili_lansia"
                    value={formData.provinsi_domisili_lansia}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                    {errors.provinsi_domisili_lansia && <p className="text-red-500 text-sm">{errors.provinsi_domisili_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">No HP</label>
                  <input
                    type="text"
                    name="no_hp_lansia"
                    value={formData.no_hp_lansia}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                    {errors.no_hp_lansia && <p className="text-red-500 text-sm">{errors.no_hp_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Email</label>
                  <input
                    type="email"
                    name="email_lansia"
                    value={formData.email_lansia}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"/>
                    {errors.email_lansia && <p className="text-red-500 text-sm">{errors.email_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Pekerjaan</label>
                  <select
                    name="pekerjaan_lansia"
                    value={formData.pekerjaan_lansia}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  >
                    <option value="">Pilih Pekerjaan</option>
                    {pekerjaanOptions.map((pekerjaan) => (
                      <option key={pekerjaan.id} value={pekerjaan.id}>
                        {pekerjaan.nama}
                      </option>
                    ))}
                  </select>
                  {errors.pekerjaan_lansia && <p className="text-red-500 text-sm">{errors.pekerjaan_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Pendidikan</label>
                  <select
                    name="pendidikan_lansia"
                    value={formData.pendidikan_lansia}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  >
                    <option value="">Pilih Pendidikan</option>
                    {pendidikanOptions.map((pendidikan) => (
                      <option key={pendidikan.id} value={pendidikan.id}>
                        {pendidikan.nama}
                      </option>
                    ))}
                  </select>
                  {errors.pendidikan_lansia && <p className="text-red-500 text-sm">{errors.pendidikan_lansia}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold">Status Pernikahan</label>
                  <select
                    name="status_pernikahan_lansia"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData.status_pernikahan_lansia}
                    onChange={handleChange}
                    required>
                    <option value="Menikah">Menikah</option>
                    <option value="Duda">Duda</option>
                    <option value="Janda">Janda</option>
                    <option value="Tidak Menikah">Tidak Menikah</option>
                  </select>
                  {errors.status_pernikahan_lansia && <p className="text-red-500 text-sm">{errors.status_pernikahan_lansia}</p>}
                </div>
              </div>

              <button
                type="submit"
                className={`mt-6 px-6 py-2 rounded-lg text-white ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Add Lansia'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLansiaForm;
