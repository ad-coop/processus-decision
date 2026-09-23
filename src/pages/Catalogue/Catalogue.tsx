import { Link } from 'react-router-dom';
import { DECISION_PROCESSES } from '../../data/processes';
import { slugify } from '../../utils/slug';
import './Catalogue.css';

const SECTIONS = [
  { id: 'catalogue-processes-title', title: 'Processus', isFamily: false },
  { id: 'catalogue-families-title', title: 'Familles', isFamily: true },
];

export function Catalogue() {
  return (
    <main className="catalogue">
      <div className="page-back-nav" aria-hidden="true" />
      <h1 className="page-title">Catalogue</h1>
      <div className="catalogue__grid">
        {SECTIONS.map(({ id, title, isFamily }) => (
          <section key={id} className="catalogue__column" aria-labelledby={id}>
            <h2 id={id} className="catalogue__column-title">
              {title}
            </h2>
            <ul className="catalogue__list">
              {DECISION_PROCESSES.filter((p) => p.isFamily === isFamily)
                .sort((a, b) => a.name.localeCompare(b.name, 'fr'))
                .map((process) => (
                  <li key={process.name} className="catalogue__item">
                    <Link
                      to={`/processus/${slugify(process.name)}`}
                      state={{ from: 'catalogue' }}
                      className="catalogue__link"
                    >
                      {process.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
