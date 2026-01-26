import './Header.css';

export function Header() {
  return (
    <header className="header">
      <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="header__logo" />
      <span className="header__title">AD COOP | ALBAN DERICBOURG</span>
    </header>
  );
}
