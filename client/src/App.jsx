import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/homepage/HomePage';
import Login from './components/auth/Login';
import RegistrationFlow from './components/auth/register/RegistrationFlow';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminDashboard from './components/admin/AdminDashboard'; // Example path
import PekerjaanForm from './components/admin/pekerjaan/PekerjaanForm'; // Example path
import PekerjaanDashboard from './components/admin/pekerjaan/PekerjaanDashboard'; // Example path
import PekerjaanDetail from './components/admin/pekerjaan/PekerjaanDetail'; // Example path
import PendidikanDashboard from './components/admin/pendidikan/PendidikanDashboard'; // Example path
import PendidikanForm from './components/admin/pendidikan/PendidikanForm'; // Example path
import PendidikanDetail from './components/admin/pendidikan/PendidikanDetail'; // Example path
import DokterDashboard from './components/admin/dokter/DokterDashboard'; // Example path
import DokterForm from './components/admin/dokter/DokterForm'; // Example path
import DokterDetail from './components/admin/dokter/DokterDetail'; // Example path
import DokumentasiDashboard from './components/admin/dokumentasi/DokumentasiDashboard'; // Example path
import DokumentasiForm from './components/admin/dokumentasi/DokumentasiForm'; // Example path
import DokumentasiDetail from './components/admin/dokumentasi/DokumentasiDetail'; // Example path
import KegiatanDashboard from './components/admin/kegiatan/KegiatanDashboard';
import KegiatanForm from './components/admin/kegiatan/KegiatanForm';
import KegiatanDetail from './components/admin/kegiatan/KegiatanDetail'; // Example path
import PenggunaForm from './components/admin/pengguna/PenggunaForm';
import PenggunaDashboard from './components/admin/pengguna/PenggunaDashboard';
import LansiaForm from './components/admin/lansia/LansiaForm';
import LansiaDashboard from './components/admin/lansia/LansiaDashboard';
import BayiForm from './components/admin/bayi/BayiForm';
import BayiDashboard from './components/admin/bayi/BayiDashboard';
import BayiDetail from './components/admin/bayi/BayiDetail';
import OrangTuaForm from './components/admin/orangtua/OrangTuaForm';
import OrangTuaDashboard from './components/admin/orangtua/OrangTuaDashboard';
import OrangTuaDetail from './components/admin/orangtua/OrangTuaDetail';
import KaderDashboard from './components/kader/KaderDashboard'; // Example path
import UserDashboard from './components/user/UserDashboard'; // Example path
import { SidebarProvider } from './components/SideBarContext';
import DataBayi from './components/kader/Bayi/DataBayi';

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
          <Route path="/pengguna/:id/edit" element={<PenggunaForm />} />
          <Route path="/lansia" element={<LansiaDashboard />} />
          <Route path="/lansia/baru" element={<LansiaForm />} />
          <Route path="/lansia/:id/edit" element={<LansiaForm />} />
          <Route path="/balita" element={<BayiDashboard />} />
          <Route path="/balita/baru" element={<BayiForm />} />
          <Route path="/balita/edit/:id" element={<BayiForm />} />
          <Route path="/balita/:id" element={<BayiDetail />} />
          <Route path="/orangtua" element={<OrangTuaDashboard />} />
          <Route path="/orangtua/baru" element={<OrangTuaForm />} />
          <Route path="/orangtua/edit/:id" element={<OrangTuaForm />} />
          <Route path="/orangtua/:id" element={<OrangTuaDetail />} />
        </Route>

        <Route element={<ProtectedRoute role="kader" />}>
          <Route path="/kader-dashboard" element={<KaderDashboard />} />
          <Route path="/data-anak" element={<DataBayi />} />
        </Route>

        <Route element={<ProtectedRoute role="user" />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>
    </Router>
  </SidebarProvider>
);

export default App;
