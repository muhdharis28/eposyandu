// DataOrtu.js
import React from 'react';

const DataOrtu = ({pekerjaanOptions, pendidikanOptions}) => {

  const [orangTuaDetails,
    setOrangTuaDetails] = useState({
    id: '',
    no_kk: '',
    nik_ibu: '',
    nama_ibu: '',
    tempat_lahir_ibu: '',
    tanggal_lahir_ibu: '',
    jenis_kelamin_ibu: '',
    alamat_ktp_ibu: '',
    kelurahan_ktp_ibu: '',
    kecamatan_ktp_ibu: '',
    kota_ktp_ibu: '',
    provinsi_ktp_ibu: '',
    alamat_domisili_ibu: '',
    kelurahan_domisili_ibu: '',
    kecamatan_domisili_ibu: '',
    kota_domisili_ibu: '',
    provinsi_domisili_ibu: '',
    no_hp_ibu: '',
    email_ibu: '',
    pekerjaan_ibu: '',
    pendidikan_ibu: '',
    nik_ayah: '',
    nama_ayah: '',
    tempat_lahir_ayah: '',
    tanggal_lahir_ayah: '',
    jenis_kelamin_ayah: '',
    alamat_ktp_ayah: '',
    kelurahan_ktp_ayah: '',
    kecamatan_ktp_ayah: '',
    kota_ktp_ayah: '',
    provinsi_ktp_ayah: '',
    alamat_domisili_ayah: '',
    kelurahan_domisili_ayah: '',
    kecamatan_domisili_ayah: '',
    kota_domisili_ayah: '',
    provinsi_domisili_ayah: '',
    no_hp_ayah: '',
    email_ayah: '',
    pekerjaan_ayah: '',
    pendidikan_ayah: ''
  });

  const [errors,
    setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};

    if (!orangTuaDetails.no_kk) {
      formErrors.no_kk = 'No KK is required';
    } else if (!/^\d{16}$/.test(orangTuaDetails.no_kk)) {
      formErrors.no_kk = 'No KK must be 16 digits';
    }

    if (!orangTuaDetails.nik_ibu) {
      formErrors.nik_ibu = 'NIK Ibu is required';
    } else if (!/^\d{16}$/.test(orangTuaDetails.nik_ibu)) {
      formErrors.nik_ibu = 'NIK Wali must be 16 digits';
    }

    if (!orangTuaDetails.nama_ibu) {
      formErrors.nama_ibu = 'Nama Ibu is required';
    }

    if (!orangTuaDetails.tempat_lahir_ibu) {
      formErrors.tempat_lahir_ibu = 'Tempat Lahir Ibu is required';
    }

    if (!orangTuaDetails.tanggal_lahir_ibu) {
      formErrors.tanggal_lahir_ibu = 'Tanggal Lahir Ibu is required';
    }

    if (!orangTuaDetails.email_ibu) {
      formErrors.email_ibu = 'Email Ibu is required';
    } else if (!/\S+@\S+\.\S+/.test(orangTuaDetails.email_ibu)) {
      formErrors.email_ibu = 'Email Ibu is invalid';
    }

    if (!orangTuaDetails.no_hp_ibu) {
      formErrors.no_hp_ibu = 'No HP Ibu is required';
    } else if (!/^\d+$/.test(orangTuaDetails.no_hp_ibu)) {
      formErrors.no_hp_ibu = 'No HP Wali must be a valid number';
    }

    if (!orangTuaDetails.alamat_ktp_ibu) {
      formErrors.alamat_ktp_ibu = 'Alamat KTP Ibu is required';
    }

    if (!orangTuaDetails.kelurahan_ktp_ibu) {
      formErrors.kelurahan_ktp_ibu = 'Kelurahan KTP Ibu is required';
    }

    if (!orangTuaDetails.kecamatan_ktp_ibu) {
      formErrors.kecamatan_ktp_ibu = 'Kecamatan KTP Ibu is required';
    }

    if (!orangTuaDetails.kota_ktp_ibu) {
      formErrors.kota_ktp_ibu = 'Kota KTP Ibu is required';
    }

    if (!orangTuaDetails.provinsi_ktp_ibu) {
      formErrors.provinsi_ktp_ibu = 'Provinsi KTP Ibu is required';
    }

    if (!orangTuaDetails.alamat_domisili_ibu) {
      formErrors.alamat_domisili_ibu = 'Alamat Domisili Ibu is required';
    }

    if (!orangTuaDetails.kelurahan_domisili_ibu) {
      formErrors.kelurahan_domisili_ibu = 'Kelurahan Domisili Ibu is required';
    }

    if (!orangTuaDetails.kecamatan_domisili_ibu) {
      formErrors.kecamatan_domisili_ibu = 'Kecamatan Domisili Ibu is required';
    }

    if (!orangTuaDetails.kota_domisili_ibu) {
      formErrors.kota_domisili_ibu = 'Kota Domisili Ibu is required';
    }

    if (!orangTuaDetails.provinsi_domisili_ibu) {
      formErrors.provinsi_domisili_ibu = 'Provinsi Domisili Ibu is required';
    }

    if (!orangTuaDetails.pekerjaan_ibu) {
      formErrors.pekerjaan_ibu = 'Pekerjaan Ibu is required';
    }

    if (!orangTuaDetails.pendidikan_ibu) {
      formErrors.pendidikan_ibu = 'Pendidikan Ibu is required';
    }

    // ------------------

    if (!orangTuaDetails.nik_ayah) {
      formErrors.nik_ayah = 'NIK Ayah is required';
    } else if (!/^\d{16}$/.test(orangTuaDetails.nik_ayah)) {
      formErrors.nik_ayah = 'NIK Wali must be 16 digits';
    }

    if (!orangTuaDetails.nama_ayah) {
      formErrors.nama_ayah = 'Nama Ayah is required';
    }

    if (!orangTuaDetails.tempat_lahir_ayah) {
      formErrors.tempat_lahir_ayah = 'Tempat Lahir Ayah is required';
    }

    if (!orangTuaDetails.tanggal_lahir_ayah) {
      formErrors.tanggal_lahir_ayah = 'Tanggal Lahir Ayah is required';
    }

    if (!orangTuaDetails.email_ayah) {
      formErrors.email_ayah = 'Email Ayah is required';
    } else if (!/\S+@\S+\.\S+/.test(orangTuaDetails.email_ayah)) {
      formErrors.email_ayah = 'Email Ayah is invalid';
    }

    if (!orangTuaDetails.no_hp_ayah) {
      formErrors.no_hp_ayah = 'No HP Ayah is required';
    } else if (!/^\d+$/.test(orangTuaDetails.no_hp_ayah)) {
      formErrors.no_hp_ayah = 'No HP Wali must be a valid number';
    }

    if (!orangTuaDetails.alamat_ktp_ayah) {
      formErrors.alamat_ktp_ayah = 'Alamat KTP Ayah is required';
    }

    if (!orangTuaDetails.kelurahan_ktp_ayah) {
      formErrors.kelurahan_ktp_ayah = 'Kelurahan KTP Ayah is required';
    }

    if (!orangTuaDetails.kecamatan_ktp_ayah) {
      formErrors.kecamatan_ktp_ayah = 'Kecamatan KTP Ayah is required';
    }

    if (!orangTuaDetails.kota_ktp_ayah) {
      formErrors.kota_ktp_ayah = 'Kota KTP Ayah is required';
    }

    if (!orangTuaDetails.provinsi_ktp_ayah) {
      formErrors.provinsi_ktp_ayah = 'Provinsi KTP Ayah is required';
    }

    if (!orangTuaDetails.alamat_domisili_ayah) {
      formErrors.alamat_domisili_ayah = 'Alamat Domisili Ayah is required';
    }

    if (!orangTuaDetails.kelurahan_domisili_ayah) {
      formErrors.kelurahan_domisili_ayah = 'Kelurahan Domisili Ayah is required';
    }

    if (!orangTuaDetails.kecamatan_domisili_ayah) {
      formErrors.kecamatan_domisili_ayah = 'Kecamatan Domisili Ayah is required';
    }

    if (!orangTuaDetails.kota_domisili_ayah) {
      formErrors.kota_domisili_ayah = 'Kota Domisili Ayah is required';
    }

    if (!orangTuaDetails.provinsi_domisili_ayah) {
      formErrors.provinsi_domisili_ayah = 'Provinsi Domisili Ayah is required';
    }

    if (!orangTuaDetails.pekerjaan_ayah) {
      formErrors.pekerjaan_ayah = 'Pekerjaan Ayah is required';
    }

    if (!orangTuaDetails.pendidikan_ayah) {
      formErrors.pendidikan_ayah = 'Pendidikan Ayah is required';
    }

    setErrors(formErrors);
    return Object
      .keys(formErrors)
      .length === 0;
  };

  const [provinsiIbu,
    setProvinsiIbu] = useState([]); // Initialize as an array
  const [regenciesIbu,
    setRegenciesIbu] = useState([]);
  const [districtsIbu,
    setDistrictsIbu] = useState([]);
  const [villagesIbu,
    setVillagesIbu] = useState([]);
  const [provinsiIbuDom,
    setProvinsiIbuDom] = useState([]); // Initialize as an array
  const [regenciesIbuDom,
    setRegenciesIbuDom] = useState([]);
  const [districtsIbuDom,
    setDistrictsIbuDom] = useState([]);
  const [villagesIbuDom,
    setVillagesIbuDom] = useState([]);
  
  const [provinsiAyah,
    setProvinsiAyah] = useState([]); // Initialize as an array
  const [regenciesAyah,
    setRegenciesAyah] = useState([]);
  const [districtsAyah,
    setDistrictsAyah] = useState([]);
  const [villagesAyah,
    setVillagesAyah] = useState([]);
  const [provinsiAyahDom,
    setProvinsiAyahDom] = useState([]); // Initialize as an array
  const [regenciesAyahDom,
    setRegenciesAyahDom] = useState([]);
  const [districtsAyahDom,
    setDistrictsAyahDom] = useState([]);
  const [villagesAyahDom,
    setVillagesAyahDom] = useState([]);

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-700 mt-5 mb-3">Data Ibu</h3>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0 mt-5">
        {/* Fields for Ibu */}
        <div>
          <label className="block text-sm font-semibold">No KK</label>
          <input
            type="text"
            name="no_kk"
            value={orangTuaDetails.no_kk}
            onChange={(e) => setOrangTuaDetails({
            ...orangTuaDetails,
            no_kk: e.target.value
          })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"/> {errors.no_kk && <p className="text-red-500 text-sm mt-1">{errors.no_kk}</p>}
        </div>
        {/* Additional fields for Ibu... */}
      </div>
      {/* Similar structure for Ayah... */}
      <button
        onClick={() => handleUpdateOrangtua(orangTuaDetails.id)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
        Update Orangtua
      </button>
    </div>
  );
};

export default DataOrtu;
