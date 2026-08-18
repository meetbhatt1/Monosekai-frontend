// src/ui/ComponentRegistry.js

import HeroSection from "./components/HeroSection";
import AnimeRail from "./components/AnimeRail";
import ContinueWatching from "./components/ContinueWatching";
import GenreGrid from "./components/GenreGrid";
import PromoCard from "./components/PromoCard";

export const componentRegistry = {
  hero: HeroSection,
  animeRail: AnimeRail,
  continueWatching: ContinueWatching,
  genreGrid: GenreGrid,
  promoCard: PromoCard,
};

export const getComponent = (type) =>
  componentRegistry[type] ?? null;