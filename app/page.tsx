"use client";
import { useState } from "react";
import {MainLayout} from "@/components/main-layout";
import DashboardContent from "@/components/dashboard-content";
import LoginPage from "@/components/login-page";

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      {isAuthenticated ? (
        <MainLayout>
          <DashboardContent />
        </MainLayout>
      ) : (
        <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />
      )}
    </>
  );
}

