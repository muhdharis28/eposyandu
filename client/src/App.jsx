import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { SidebarProvider } from './components/SideBarContext';
import Homepage from './components/homepage/HomePage';
import Login from './components/auth/Login';
import RegistrationFlow from './components/auth/register/RegistrationFlow';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminDashboard from './components/admin/AdminDashboard';
import PekerjaanForm from './components/admin/pekerjaan/PekerjaanForm';
import PekerjaanDashboard from './components/admin/pekerjaan/PekerjaanDashboard';
import PekerjaanDetail from './components/admin/pekerjaan/PekerjaanDetail';
import PendidikanDashboard from './components/admin/pendidikan/PendidikanDashboard';
import PendidikanForm from './components/admin/pendidikan/PendidikanForm';
import PendidikanDetail from './components/admin/pendidikan/PendidikanDetail';
import PosyanduDashboard from './components/admin/posyandu/PosyanduDashboard';
import PosyanduForm from './components/admin/posyandu/PosyanduForm';
import PosyanduDetail from './components/admin/posyandu/PosyanduDetail';
import DokterDashboard from './components/admin/dokter/DokterDashboard';
import DokterForm from './components/admin/dokter/DokterForm';
import DokterDetail from './components/admin/dokter/DokterDetail';
import DokumentasiDashboard from './components/admin/dokumentasi/DokumentasiDashboard';
import DokumentasiForm from './components/admin/dokumentasi/DokumentasiForm';
import DokumentasiDetail from './components/admin/dokumentasi/DokumentasiDetail';
import KegiatanDashboard from './components/admin/kegiatan/KegiatanDashboard';
import KegiatanForm from './components/admin/kegiatan/KegiatanForm';
import KegiatanDetail from './components/admin/kegiatan/KegiatanDetail';
import PenggunaForm from './components/admin/pengguna/PenggunaForm';
import PenggunaDashboard from './components/admin/pengguna/PenggunaDashboard';
import PenggunaDetail from './components/admin/pengguna/PenggunaDetail';
import LansiaForm from './components/admin/lansia/LansiaForm';
import LansiaDashboard from './components/admin/lansia/LansiaDashboard';
import LansiaDetail from './components/admin/lansia/LansiaDetail';
import BayiForm from './components/admin/bayi/BayiForm';
import BayiDashboard from './components/admin/bayi/BayiDashboard';
import BayiDetail from './components/admin/bayi/BayiDetail';
import OrangTuaForm from './components/admin/orangtua/OrangTuaForm';
import OrangTuaDashboard from './components/admin/orangtua/OrangTuaDashboard';
import OrangTuaDetail from './components/admin/orangtua/OrangTuaDetail';
import WaliForm from './components/admin/wali/WaliForm';
import WaliDashboard from './components/admin/wali/WaliDashboard';
import WaliDetail from './components/admin/wali/WaliDetail';
import PemeriksaanLansiaForm from './components/admin/pemeriksaan_lansia/PemeriksaanLansiaForm';
import PemeriksaanLansiaDashboard from './components/admin/pemeriksaan_lansia/PemeriksaanLansiaDashboard';
import PemeriksaanLansiaDetail from './components/admin/pemeriksaan_lansia/PemeriksaanLansiaDetail';
import PerkembanganBalitaForm from './components/admin/perkembangan_balita/PerkembanganBalitaForm';
import PerkembanganBalitaDashboard from './components/admin/perkembangan_balita/PerkembanganBalitaDashboard';
import PerkembanganBalitaDetail from './components/admin/perkembangan_balita/PerkembanganBalitaDetail';
import KaderDashboard from './components/kader/KaderDashboard';
import UserDashboard from './components/user/UserDashboard';
import Settings from './components/user/settings/Settings';
import LansiaCard from './components/user/lansia/LansiaCard';
import LansiaUserDetail from './components/user/lansia/LansiaDetail';
import LansiaUserAdd from './components/user/lansia/AddLansia';
import LansiaUserEdit from './components/user/lansia/EditLansia';
import BayiCard from './components/user/bayi/BayiCard';
import BayiUserDetail from './components/user/bayi/BayiDetail';
import BayiUserAdd from './components/user/bayi/AddBayi';
import BayiUserEdit from './components/user/bayi/EditBayi';
import BayiCardKader from './components/kader/bayi/BayiCardKader';
import BayiDetailKader from './components/kader/bayi/BayiDetailKader';
import AddBayiKader from './components/kader/bayi/AddBayiKader';
import EditBayiKader from './components/kader/bayi/EditBayiKader';
import LansiaCardKader from './components/kader/lansia/LansiaCardKader';
import LansiaDetailKader from './components/kader/lansia/LansiaDetailKader';
import AddLansiaKader from './components/kader/lansia/AddLansiaKader';
import EditLansiaKader from './components/kader/lansia/EditLansiaKader';
import PemeriksaanLansiaCard from './components/kader/pemeriksaan_lansia/PemeriksaanLansiaCard';
import PemeriksaanLansiaDetailKader from './components/kader/pemeriksaan_lansia/PemeriksaanLansiaDetailKader';
import PemeriksaanLansiaKaderForm from './components/kader/pemeriksaan_lansia/PemeriksaanLansiaKaderForm';
import PerkembanganBalitaCard from './components/kader/perkembangan_balita/PerkembanganBalitaCard';
import PerkembanganBalitaDetailKader from './components/kader/perkembangan_balita/PerkembanganBalitaDetailKader';
import PerkembanganBalitaKaderForm from './components/kader/perkembangan_balita/PerkembanganBalitaKaderForm';
import KegiatanCardKader from './components/kader/kegiatan/KegiatanCardKader';
import KegiatanDetailKader from './components/kader/kegiatan/KegiatanDetailKader';
import KegiatanKaderForm from './components/kader/kegiatan/KegiatanKaderForm';
import DokumentasiCardKader from './components/kader/dokumentasi/DokumentasiCardKader';
import DokumentasiDetailKader from './components/kader/dokumentasi/DokumentasiDetailKader';
import DokumentasiKaderForm from './components/kader/dokumentasi/DokumentasiKaderForm';
import OrangTuaCardKader from './components/kader/orangtua/OrangTuaCardKader';
import OrangTuaDetailKader from './components/kader/orangtua/OrangTuaDetailKader';
import OrangTuaKaderForm from './components/kader/orangtua/OrangTuaKaderForm';
import WaliCardKader from './components/kader/wali/WaliCardKader';
import WaliDetailKader from './components/kader/wali/WaliDetailKader';
import WaliKaderForm from './components/kader/wali/WaliKaderForm';
import SettingsKader from './components/kader/settings/SettingsKader';

const App = () => (
  <SidebarProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<RegistrationFlow />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/pekerjaan" element={<PekerjaanDashboard />} />
          <Route path="/pekerjaan/baru" element={<PekerjaanForm />} />
          <Route path="/pekerjaan/edit/:id" element={<PekerjaanForm />} />
          <Route path="/pekerjaan/:id" element={<PekerjaanDetail />} />
          <Route path="/pendidikan" element={<PendidikanDashboard />} />
          <Route path="/pendidikan/baru" element={<PendidikanForm />} />
          <Route path="/pendidikan/edit/:id" element={<PendidikanForm />} />
          <Route path="/pendidikan/:id" element={<PendidikanDetail />} />
          <Route path="/dokter" element={<DokterDashboard />} />
          <Route path="/dokter/baru" element={<DokterForm />} /> 
          <Route path="/dokter/edit/:id" element={<DokterForm />} />
          <Route path="/dokter/:id" element={<DokterDetail />} />
          <Route path="/kegiatan" element={<KegiatanDashboard />} />
          <Route path="/kegiatan/baru" element={<KegiatanForm />} />
          <Route path="/kegiatan/edit/:id" element={<KegiatanForm />} />
          <Route path="/kegiatan/:id" element={<KegiatanDetail />} />
          <Route path="/dokumentasi" element={<DokumentasiDashboard />} />
          <Route path="/dokumentasi/baru" element={<DokumentasiForm />} />
          <Route path="/dokumentasi/edit/:id" element={<DokumentasiForm />} />
          <Route path="/dokumentasi/:id" element={<DokumentasiDetail />} />
          <Route path="/pengguna" element={<PenggunaDashboard />} />
          <Route path="/pengguna/baru" element={<PenggunaForm />} />
          <Route path="/pengguna/edit/:id" element={<PenggunaForm />} />
          <Route path="/pengguna/:id" element={<PenggunaDetail />} />
          <Route path="/lansia" element={<LansiaDashboard />} />
          <Route path="/lansia/baru" element={<LansiaForm />} />
          <Route path="/lansia/edit/:id" element={<LansiaForm />} />
          <Route path="/lansia/:id" element={<LansiaDetail />} />
          <Route path="/balita" element={<BayiDashboard />} />
          <Route path="/balita/baru" element={<BayiForm />} />
          <Route path="/balita/edit/:id" element={<BayiForm />} />
          <Route path="/balita/:id" element={<BayiDetail />} />
          <Route path="/orangtua" element={<OrangTuaDashboard />} />
          <Route path="/orangtua/baru" element={<OrangTuaForm />} />
          <Route path="/orangtua/edit/:id" element={<OrangTuaForm />} />
          <Route path="/orangtua/:id" element={<OrangTuaDetail />} />
          <Route path="/wali" element={<WaliDashboard />} />
          <Route path="/wali/baru" element={<WaliForm />} />
          <Route path="/wali/edit/:id" element={<WaliForm />} />
          <Route path="/wali/:id" element={<WaliDetail />} />
          <Route path="/pemeriksaan-lansia" element={<PemeriksaanLansiaDashboard />} />
          <Route path="/pemeriksaan-lansia/baru" element={<PemeriksaanLansiaForm />} />
          <Route path="/pemeriksaan-lansia/edit/:id" element={<PemeriksaanLansiaForm />} />
          <Route path="/pemeriksaan-lansia/:id" element={<PemeriksaanLansiaDetail />} />
          <Route path="/perkembangan-balita" element={<PerkembanganBalitaDashboard />} />
          <Route path="/perkembangan-balita/baru" element={<PerkembanganBalitaForm />} />
          <Route path="/perkembangan-balita/edit/:id" element={<PerkembanganBalitaForm />} />
          <Route path="/perkembangan-balita/:id" element={<PerkembanganBalitaDetail />} />
          <Route path="/posyandu" element={<PosyanduDashboard />} />
          <Route path="/posyandu/baru" element={<PosyanduForm />} />
          <Route path="/posyandu/edit/:id" element={<PosyanduForm />} />
          <Route path="/posyandu/:id" element={<PosyanduDetail />} />
        </Route>

        <Route element={<ProtectedRoute role="kader" />}>
          <Route path="/kader-dashboard" element={<KaderDashboard />} />
          <Route path="/kader-balita" element={<BayiCardKader />} />
          <Route path="/kader-balita/:id" element={<BayiDetailKader/>} />
          <Route path="/kader-balita/edit/:id" element={<EditBayiKader/>} />
          <Route path="/kader-balita/baru" element={<AddBayiKader/>} />
          <Route path="/kader-lansia" element={<LansiaCardKader />} />
          <Route path="/kader-lansia/:id" element={<LansiaDetailKader/>} />
          <Route path="/kader-lansia/baru" element={<AddLansiaKader/>} />
          <Route path="/kader-lansia/edit/:id" element={<EditLansiaKader/>} />
          <Route path="/kader-pemeriksaan-lansia" element={<PemeriksaanLansiaCard/>} />
          <Route path="/kader-pemeriksaan-lansia/:id" element={<PemeriksaanLansiaDetailKader/>} />
          <Route path="/kader-pemeriksaan-lansia/baru" element={<PemeriksaanLansiaKaderForm/>} />
          <Route path="/kader-pemeriksaan-lansia/edit/:id" element={<PemeriksaanLansiaKaderForm/>} />
          <Route path="/kader-perkembangan-balita" element={<PerkembanganBalitaCard/>} />
          <Route path="/kader-perkembangan-balita/:id" element={<PerkembanganBalitaDetailKader/>} />
          <Route path="/kader-perkembangan-balita/baru" element={<PerkembanganBalitaKaderForm/>} />
          <Route path="/kader-perkembangan-balita/edit/:id" element={<PerkembanganBalitaKaderForm/>} />
          <Route path="/kader-kegiatan" element={<KegiatanCardKader/>} />
          <Route path="/kader-kegiatan/:id" element={<KegiatanDetailKader/>} />
          <Route path="/kader-kegiatan/baru" element={<KegiatanKaderForm/>} />
          <Route path="/kader-kegiatan/edit/:id" element={<KegiatanKaderForm/>} />
          <Route path="/kader-dokumentasi" element={<DokumentasiCardKader/>} />
          <Route path="/kader-dokumentasi/:id" element={<DokumentasiDetailKader/>} />
          <Route path="/kader-dokumentasi/baru" element={<DokumentasiKaderForm/>} />
          <Route path="/kader-dokumentasi/edit/:id" element={<DokumentasiKaderForm/>} />
          <Route path="/kader-orangtua" element={<OrangTuaCardKader/>} />
          <Route path="/kader-orangtua/:id" element={<OrangTuaDetailKader/>} />
          <Route path="/kader-orangtua/baru" element={<OrangTuaKaderForm/>} />
          <Route path="/kader-orangtua/edit/:id" element={<OrangTuaKaderForm/>} />
          <Route path="/kader-wali" element={<WaliCardKader/>} />
          <Route path="/kader-wali/:id" element={<WaliDetailKader/>} />
          <Route path="/kader-wali/baru" element={<WaliKaderForm/>} />
          <Route path="/kader-wali/edit/:id" element={<WaliKaderForm/>} />
          <Route path="/kader-settings" element={<SettingsKader/>} />
        </Route>

        <Route element={<ProtectedRoute role="user" />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/user-settings" element={<Settings />} />
          <Route path="/user-lansia" element={<LansiaCard />} />
          <Route path="/user-lansia/:id" element={<LansiaUserDetail/>} />
          <Route path="/user-lansia/baru" element={<LansiaUserAdd/>} />
          <Route path="/user-lansia/edit/:id" element={<LansiaUserEdit/>} />
          <Route path="/user-balita" element={<BayiCard />} />
          <Route path="/user-balita/:id" element={<BayiUserDetail/>} />
          <Route path="/user-balita/baru" element={<BayiUserAdd/>} />
          <Route path="/user-balita/edit/:id" element={<BayiUserEdit/>} />
        </Route>
      </Routes>
    </Router>
  </SidebarProvider>
);

export default App;
