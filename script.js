const scrollSections = ['inicio', 'soluciones', 'tecnologias'];
  const exclusiveSections = ['innews', 'publicaciones', 'contacto'];

  const navLinks = document.querySelectorAll('.nav-links-center a[data-section]');

  function clearActiveLinks() {
    navLinks.forEach(link => link.classList.remove('active'));
  }

  function showOnly(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(sec => {
      sec.style.display = 'none';
    });

    // Mostrar solo la sección solicitada
    const target = document.getElementById(sectionId);
    if (target) {
      target.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Ocultar footer si es contacto
    const footer = document.getElementById('footer');
    if (footer) {
      footer.style.display = sectionId === 'contacto' ? 'none' : 'block';
    }
  }

  function showScrollSectionsAndScrollTo(targetId) {
    // Mostrar secciones de scroll
    scrollSections.forEach(id => {
      const sec = document.getElementById(id);
      if (sec) sec.style.display = 'block';
    });

    // Ocultar secciones exclusivas
    exclusiveSections.forEach(id => {
      const sec = document.getElementById(id);
      if (sec) sec.style.display = 'none';
    });

    // Mostrar footer si no es contacto
    const footer = document.getElementById('footer');
    if (footer) {
      footer.style.display = targetId === 'contacto' ? 'none' : 'block';
    }

    // Scroll hacia la sección
    setTimeout(() => {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  // Manejo de clics en navegación interna
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const sectionId = link.getAttribute('data-section');
      if (!sectionId) return;

      clearActiveLinks();
      link.classList.add('active');

      if (scrollSections.includes(sectionId)) {
        showScrollSectionsAndScrollTo(sectionId);
      } else if (exclusiveSections.includes(sectionId)) {
        showOnly(sectionId);
      }
    });
  });

  // IntersectionObserver para activar el enlace según scroll
  let currentActiveSection = null;

  const observer = new IntersectionObserver(entries => {
    const visibleEntries = entries.filter(e => e.isIntersecting);
    if (visibleEntries.length > 0) {
      visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      const mostVisible = visibleEntries[0];
      const id = mostVisible.target.id;

      if (currentActiveSection !== id) {
        currentActiveSection = id;
        clearActiveLinks();

        const link = Array.from(navLinks).find(a => a.getAttribute('data-section') === id);
        if (link) link.classList.add('active');
      }
    }
  }, {
    threshold: Array.from({ length: 101 }, (_, i) => i / 100),
    rootMargin: '0px 0px -40% 0px'
  });

  // Observar solo las secciones de scroll
  document.querySelectorAll('.scroll-section').forEach(section => {
    observer.observe(section);
  });

  // Mostrar inicio al cargar
  window.addEventListener('DOMContentLoaded', () => {
    showScrollSectionsAndScrollTo('inicio');
  });



    function showSection(event, idSeccion) {
      if (event) event.preventDefault(); // 👈 Previene el salto de href="#"

      // Ocultar todas las secciones
      document.querySelectorAll('.section').forEach(sec => {
        sec.style.display = 'none';
      });

      // Mostrar la sección deseada
      const seccion = document.getElementById(idSeccion);
      if (seccion) {
        seccion.style.display = 'block';
      }

      // Controlar visibilidad del footer
      const footer = document.getElementById('footer');
      if (footer) {
        footer.style.display = idSeccion === 'contacto' ? 'none' : 'block';
      }
    }




  function toggleArticles(id, headerElement) {
    const section = document.getElementById(id);
    const isVisible = section.style.display === "block";
    section.style.display = isVisible ? "none" : "block";

    // Alternar clase 'active' en el encabezado
    if (headerElement) {
      headerElement.classList.toggle("active", !isVisible);
    }
  }