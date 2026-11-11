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
  {
    slug: '2smr-sostenibilidad', curso: '2º SMR',
    titulo: 'Sostenibilidad aplicada al sistema productivo',
    temas: [
      { slug: 'tema-1', num: 1, titulo: 'La sostenibilidad en las organizaciones empresariales', materiales: [
        { slug: 'sostenibilidad-organizaciones', tipo: 'Apuntes', titulo: 'La sostenibilidad en las organizaciones empresariales' },
        { slug: 'actividad-foro-hlpf', tipo: 'Actividad 1', titulo: 'Investiga el Foro Político de Alto Nivel (HLPF)' },
        { slug: 'caso-cafeterias-origen', tipo: 'Actividad 2', titulo: 'Caso práctico: Cafeterías Origen' }
      ] },
      { slug: 'tema-2', num: 2, titulo: 'Retos ambientales y sociales', materiales: [
        { slug: 'retos-ambientales-sociales', tipo: 'Apuntes', titulo: 'Retos ambientales y sociales' },
        { slug: 'mercado-libre-regulado', tipo: 'Material de apoyo', titulo: 'Mercado libre y mercado regulado' },
        { slug: 'practica-consumo-electrico', tipo: 'Práctica', titulo: '¿Cuánto cuesta encender un ordenador?' }
      ] },
      { slug: 'tema-3', num: 3, titulo: 'Los ODS en el desempeño profesional y personal', materiales: [
        { slug: 'ods-desempeno', tipo: 'Apuntes', titulo: 'Los ODS en el desempeño profesional y personal' },
        { slug: 'ficha-p1-ods-empresa-tic', tipo: 'Práctica P1', titulo: 'Riesgos y oportunidades de los ODS en una empresa TIC' },
        { slug: 'ficha-p2-plan-accion', tipo: 'Práctica P2', titulo: 'Mi autodiagnóstico y mi plan de acción' }
      ] },
      { slug: 'tema-4', num: 4, titulo: 'Economía verde y circular', materiales: [
        { slug: 'economia-verde-circular', tipo: 'Apuntes', titulo: 'Economía verde y circular' },
        { slug: 'ficha-p1-mochila-ordenador', tipo: 'Práctica P1', titulo: 'La mochila de un ordenador' },
        { slug: 'ficha-p2-7r-negocio-circular', tipo: 'Práctica P2', titulo: 'Las 7R y un negocio circular' },
        { slug: 'ficha-p3-ciclo-vida', tipo: 'Práctica P3', titulo: 'Ciclo de vida de un equipo' }
      ] }
    ]
  }
];
