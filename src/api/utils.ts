const mediumDisplayMap = {
  oil_on_panel: 'Oil on Panel',
  acrylic_on_panel: 'Acrylic on Panel',
  oil_on_mdf: 'Oil on MDF',
  oil_on_oil_paper: 'Oil on Oil Paper',
  clay_sculpture: 'Clay Sculpture',
  plaster_sculpture: 'Plaster Sculpture',
  ink_on_paper: 'Ink on Paper',
  mixed_media_on_paper: 'Mixed Media on Paper',
  unknown: 'Unknown',
}

export const getMedium = (medium: keyof typeof mediumDisplayMap) =>
  mediumDisplayMap[medium] || medium;
