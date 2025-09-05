import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'leaflet/dist/leaflet.css';
import './index.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRouteUser from './components/ProtectedRouteUser';
import ChatRoom from './components/ChatRoom';  
import ChatModal from './components/ChatModal';

// Public Pages
import Home from './pages/Home';
import Cars from './pages/Cars';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

// User Pages
import Dashboard from './pages/Dashboard';
import PaymentPage from './pages/PaymentPage';
import PaymentHistory from './pages/PaymentHistory';
import Historique from './pages/Historique';
import ContratsLocation from './pages/ContratsLocation';
import NotificationsPage from './pages/NotificationsPage';

// Agent Pages
import AgentDashboard from './pages/AgentDashboard';
import Agents from './pages/Agents';
import Missions from './pages/Missions';
import Damages from './pages/Damages';
import Deliveries from './pages/Deliveries';
import DeliveryDetails from './pages/DeliveryDetails';


// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminReservations from './pages/admin/AdminReservations';
import AdminPaymentsHistory from './pages/AdminPaymentsHistory';
import AdminDocuments from './pages/AdminDocuments';
import AdminContrats from './pages/AdminContrats';
import AdminCars from './pages/AdminCars';

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div style={{ padding: "2rem" }}>Chargement...</div>}>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/paiement" element={<PaymentPage />} />

          {/* Routes utilisateur protégées */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRouteUser role="user">
                <Dashboard />
              </ProtectedRouteUser>
            }
          />
          <Route
            path="/historique"
            element={
              <ProtectedRouteUser role="user">
                <Historique />
              </ProtectedRouteUser>
            }
          />
          <Route
            path="/paiement/historique"
            element={
              <ProtectedRouteUser role="user">
                <PaymentHistory />
              </ProtectedRouteUser>
            }
          />
          <Route
            path="/contrats-location"
            element={
              <ProtectedRouteUser role="user">
                <ContratsLocation />
              </ProtectedRouteUser>
            }
          />

          {/* Routes agent protégées */}
          <Route
            path="/agent-dashboard"
            element={
              <ProtectedRouteUser role="agent">
                <AgentDashboard />
              </ProtectedRouteUser>
            }
          />

            <Route
            path="/agent-dashboard/chat"
            element={
              <ProtectedRouteUser role="agent">
                <ChatModal />
              </ProtectedRouteUser>
            }
          />

          <Route
            path="/missions"
            element={
              <ProtectedRouteUser role="agent">
                <Missions />
              </ProtectedRouteUser>
            }
          />
          <Route
            path="/damages"
            element={
              <ProtectedRouteUser role="agent">
                <Damages />
              </ProtectedRouteUser>
            }
          />
          <Route
            path="/deliveries"
            element={
              <ProtectedRouteUser role="agent">
                <Deliveries />
              </ProtectedRouteUser>
            }
          />
          <Route
            path="/deliveries/:id"
            element={
              <ProtectedRouteUser role="agent">
                <DeliveryDetails />
              </ProtectedRouteUser>
            }
          />
          <Route
            path="/chat/reservation/:reservationId"
            element={
              <ProtectedRouteUser role="agent">
                <ChatRoom />
              </ProtectedRouteUser>
            }
          />

          {/* Routes admin protégées */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRouteUser role="admin">
                <AdminDashboard />
              </ProtectedRouteUser>
            }
          />
          <Route
            path="/admin-reservations"
            element={
              <ProtectedRouteUser role="admin">
                <AdminReservations />
              </ProtectedRouteUser>
            }
          />
          <Route
            path="/admin-payments"
            element={
              <ProtectedRouteUser role="admin">
                <AdminPaymentsHistory />
              </ProtectedRouteUser>
            }
          />
          <Route
            path="/admin-documents"
            element={
              <ProtectedRouteUser role="admin">
                <AdminDocuments />
              </ProtectedRouteUser>
            }
          />
          <Route
            path="/admin-contrats"
            element={
              <ProtectedRouteUser role="admin">
                <AdminContrats />
              </ProtectedRouteUser>
            }
          />

          <Route
            path="/admin-cars"
            element={
              <ProtectedRouteUser role="admin">
                <AdminCars />
              </ProtectedRouteUser>
            }
          />
          
          {/* Routes admin avec préfixe /admin/ */}
          <Route
            path="/admin/deliveries"
            element={
              <ProtectedRouteUser role="admin">
                <Deliveries />
              </ProtectedRouteUser>
            }
          />
          <Route
            path="/admin/deliveries/:id"
            element={
              <ProtectedRouteUser role="admin">
                <DeliveryDetails />
              </ProtectedRouteUser>
            }
          />
          <Route
            path="/admin/contrats"
            element={
              <ProtectedRouteUser role="admin">
                <AdminContrats />
              </ProtectedRouteUser>
            }
          />
          <Route
            path="/admin/payments"
            element={
              <ProtectedRouteUser role="admin">
                <AdminPaymentsHistory />
              </ProtectedRouteUser>
            }
          />
          <Route
            path="/admin/documents"
            element={
              <ProtectedRouteUser role="admin">
                <AdminDocuments />
              </ProtectedRouteUser>
            }
          />


          <Route
            path="/admin/reservations"
            element={
              <ProtectedRouteUser role="admin">
                <AdminReservations />
              </ProtectedRouteUser>
            }
          />

          {/* Route 404 */}
          <Route
            path="*"
            element={
              <div style={{ padding: "2rem", textAlign: "center" }}>
                <h2>404 - Page non trouvée</h2>
                <p>La page que vous recherchez n'existe pas.</p>
              </div>
            }
          />
        </Routes>
      </Suspense>
      
      <Footer />
      <ToastContainer position="top-right" autoClose={4000} />
    </Router>
  );
}

export default App;