import { useState } from 'react';
import { NAV_ITEMS } from '../data.js';
import {
  SearchIcon, CrossIcon, AccountIcon, StarIcon, HelpIcon, CartIcon, BellIcon, HomeIcon,
  ChevronDownIcon, MenuIcon, BellIconLarge, AccountIconLarge, SearchIconLarge, BasketIconLarge,
} from './Icons.jsx';

const LOGO = `${import.meta.env.BASE_URL}images/boom-discounts-logo.svg`;

const UTILITIES = [
  { label: 'Account', Icon: AccountIcon },
  { label: 'Favourites', Icon: StarIcon },
  { label: 'Support', Icon: HelpIcon },
  { label: 'Basket', Icon: CartIcon },
  { label: 'Alerts', Icon: BellIcon },
];

const MOBILE_ITEMS = [
  { label: 'Menu', Icon: MenuIcon },
  { label: 'Alerts', Icon: BellIconLarge },
  { label: 'Account', Icon: AccountIconLarge },
  { label: 'Search', Icon: SearchIconLarge },
  { label: 'Basket', Icon: BasketIconLarge },
];

function DesktopHeader() {
  const [query, setQuery] = useState('');
  return (
    <div className="header-desktop">
      <div className="top-bar">
        <a href="#" className="logo" aria-label="boom! discounts home">
          <img src={LOGO} width="181" height="27" alt="boom! discounts" />
        </a>
        <label className="search">
          <SearchIcon />
          <input
            type="search"
            placeholder="What are you looking for?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="button" className="search-clear" aria-label="Clear search" onClick={() => setQuery('')}>
            <CrossIcon />
          </button>
        </label>
        <nav className="utilities" aria-label="Account">
          {UTILITIES.map(({ label, Icon }) => (
            <a href="#" key={label} className="utility">
              <Icon />
              {label}
            </a>
          ))}
        </nav>
      </div>
      <nav className="main-nav" aria-label="Main">
        <a href="#" className="nav-home" aria-label="Home">
          <HomeIcon />
        </a>
        <a href="#" className="nav-item nav-back">
          <span className="nav-title">Back to Boom!Global</span>
        </a>
        {NAV_ITEMS.map((item) => (
          <button type="button" key={item.title} className="nav-item">
            <span className="nav-text">
              <span className="nav-title">{item.title}</span>
              <span className="nav-subtitle">{item.subtitle}</span>
            </span>
            <ChevronDownIcon />
          </button>
        ))}
        <span className="nav-fill" />
      </nav>
    </div>
  );
}

function MobileHeader() {
  return (
    <div className="header-mobile">
      <a href="#" className="logo" aria-label="boom! discounts home">
        <img src={LOGO} width="181" height="27" alt="boom! discounts" />
      </a>
      <div className="mobile-divider" />
      <nav className="mobile-nav" aria-label="Main">
        {MOBILE_ITEMS.map(({ label, Icon }) => (
          <a href="#" key={label} className="mobile-nav-item">
            <Icon />
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}

export default function Header() {
  return (
    <header className="header">
      <DesktopHeader />
      <MobileHeader />
    </header>
  );
}
