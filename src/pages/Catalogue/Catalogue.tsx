import { Link } from 'react-router-dom';
import { DECISION_PROCESSES } from '../../data/processes';
import { slugify } from '../../utils/slug';
import './Catalogue.css';

export function Catalogue() {
  const processes = [...DECISION_PROCESSES]
    .filter((p) => !p.isFamily)
    .sort((a, b) => a.name.localeCompare(b.name, 'fr'));

  const families = [...DECISION_PROCESSES]
    .filter((p) => p.isFamily)
    .sort((a, b) => a.name.localeCompare(b.name, 'fr'));

  return (
    <main className="catalogue">
      <h1 className="page-title">Catalogue</h1>
      <div className="catalogue__grid">
        <section className="catalogue__column" aria-labelledby="catalogue-processes-title">
          <h2 id="catalogue-processes-title" className="catalogue__column-title">
            Processus
          </h2>
          <ul className="catalogue__list">
            {processes.map((process) => (
              <li key={process.name} className="catalogue__item">
                <Link to={`/processus/${slugify(process.name)}`} className="catalogue__link">
                  {process.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="catalogue__column" aria-labelledby="catalogue-families-title">
          <h2 id="catalogue-families-title" className="catalogue__column-title">
            Familles
          </h2>
          <ul className="catalogue__list">
            {families.map((process) => (
              <li key={process.name} className="catalogue__item">
                <Link to={`/processus/${slugify(process.name)}`} className="catalogue__link">
                  {process.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
