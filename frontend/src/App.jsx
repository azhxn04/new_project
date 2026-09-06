import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BusinessProvider } from './context/BusinessContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import MainLayout from './components/common/MainLayout';
import TopBanner from "./components/common/TopBanner";
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import MarketPotential from './pages/MarketPotential';
import FeasibilitySwot from './pages/FeasibilitySwot';
import CostPlanning from './pages/CostPlanning';
import GovernmentSchemes from './pages/GovernmentSchemes';
import AiAdvisor from './pages/AiAdvisor';
import ReportActionPlan from './pages/ReportActionPlan';

function App() {
  return (
    <AuthProvider>
      <BusinessProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-slate-50">
            {/* Top Banner locked to the top edge across all routes & login */}
            <TopBanner />

            <div className="flex-1 flex flex-col">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                  path="/onboarding"
                  element={
                    <ProtectedRoute>
                      <Onboarding />
                    </ProtectedRoute>
                  }
                />

                {/* Main Application Workspace (Phases 1-7) */}
                <Route
                  element={
                    <ProtectedRoute>
                      <MainLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/market-potential" element={<MarketPotential />} />
                  <Route path="/feasibility" element={<FeasibilitySwot />} />
                  <Route path="/finance" element={<CostPlanning />} />
                  <Route path="/schemes" element={<GovernmentSchemes />} />
                  <Route path="/advisor" element={<AiAdvisor />} />
                  <Route path="/reports" element={<ReportActionPlan />} />
                </Route>

                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </BusinessProvider>
    </AuthProvider>
  );
}

export default App;