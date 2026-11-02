/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { LangProvider } from "@/lib/i18n";
import Home from "@/pages/Home";
import InteriorDesign from "@/pages/InteriorDesign";
import AdminLeads from "@/pages/AdminLeads";

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interior-design" element={<InteriorDesign />} />
          <Route path="/admin" element={<AdminLeads />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </LangProvider>
  );
}
