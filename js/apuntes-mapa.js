// Mapa de la sección de apuntes: de aquí sale la barra lateral izquierda.
// Al publicar un tema o un material nuevo, añádelo también aquí.
window.MAPA_APUNTES = [
  {
    slug: '1cfgb-montaje-mantenimiento', curso: '1º CFGB',
    titulo: 'Montaje y mantenimiento de sistemas y componentes informáticos',
    temas: [
      { slug: 'tema-1', num: 1, titulo: 'Electricidad y componentes electrónicos', materiales: [] },
      { slug: 'tema-2', num: 2, titulo: 'La placa base', materiales: [
        { slug: 'placa-base-ii', tipo: 'Apuntes', titulo: 'La placa base (II)' },
        { slug: 'componentes-placa-base', tipo: 'Actividad', titulo: 'Componentes de la placa base' },
        { slug: 'kahoot-bios-placa-base', tipo: 'Kahoot', titulo: 'BIOS, UEFI y placa base' }
      ] }
    ]
  },
  { slug: '2cfgb-proyecto-intermodular', curso: '2º CFGB', titulo: 'Proyecto Intermodular de Aprendizaje Colaborativo', temas: [] },
  { slug: '2smr-digitalizacion', curso: '2º SMR', titulo: 'Digitalización aplicada a los sistemas productivos', temas: [] },
  { slug: '2smr-sostenibilidad', curso: '2º SMR', titulo: 'Sostenibilidad aplicada al sistema productivo', temas: [] }
];
