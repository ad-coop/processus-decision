import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/ui/Layout';
import { CriteriaForm } from './pages/CriteriaForm';
import { Results } from './pages/Results';
import { Catalogue } from './pages/Catalogue';
import { ProcessDetail } from './pages/ProcessDetail';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Layout>
        <Routes>
          <Route path="/" element={<CriteriaForm />} />
          <Route path="/results" element={<Results />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/processus/:slug" element={<ProcessDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
