import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { SignUp } from './components/SignUp';
import { Profile } from './components/Profile';
import { RemotePizza } from './components/RemotePizza';

const HomePage = () => (
  <main>
    <h1>Little pizza app</h1>
    <p>Welcome back, space cowboy!</p>
    <ul>
      <li>
        <Link to="/signup">Sign up</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <Link to="/remote-pizza">RemotePizza</Link>
      </li>
    </ul>
  </main>
);

const SignUpPage = () => <SignUp />;

const ProfilePage = () => <Profile />;

const RemotePizzaPage = () => <RemotePizza />;

const TermsAndConfitionsPage = () => (
  <main>
    <h1>Terms and conditions</h1>
    <p>
      I'm baby ennui vice shabby chic, migas gochujang 90's retro gastropub
      knausgaard banh mi waistcoat. Keytar tumeric deep v, migas enamel pin
      occupy drinking vinegar poke. Fashion axe tousled master cleanse 3 wolf
      moon, humblebrag fixie brooklyn beard lumbersexual hell of small batch
      direct trade biodiesel wayfarers. Hot chicken umami tilde messenger bag.
      Bespoke sriracha craft beer, mixtape subway tile twee meditation cred wolf
      man braid taxidermy polaroid forage tofu hell of. Adaptogen viral selfies
      cold-pressed activated charcoal skateboard, ugh blog you probably haven't
      heard of them bitters cardigan four loko fam.
    </p>
  </main>
);

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/remote-pizza" element={<RemotePizzaPage />} />
        <Route path="/toc" element={<TermsAndConfitionsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
