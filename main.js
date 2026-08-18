/* =============================================================================
   REX MEDIA v4 — main.js
   ============================================================================= */
(function(){
  'use strict';
  document.addEventListener('DOMContentLoaded', init);

  function init(){
    headerScroll();
    fullScreenMenu();
    smoothScroll();
    scrollReveal();
    heroSlider();
    testimonialRandom();
    serviceListIcons();
    serviceModal();
    projectModal();
    contactForm();
  }

  /* ---------------------------------------------------------------------------
     HERO SLIDER — crossfade through the slider backgrounds
     --------------------------------------------------------------------------- */
  function heroSlider(){
    var slides = document.querySelectorAll('.hero__bg-slide');
    if(slides.length < 2) return;
    var i = 0;
    setInterval(function(){
      slides[i].classList.remove('active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('active');
    }, 6000);
  }

  /* ---------------------------------------------------------------------------
     HEADER — scroll behavior:
     - Adds .fixed to header when scrolled past threshold
     - Adds .move to .main-header__inner (triggers frosted glass pill)
     - Adds .hidden when scrolling down, removes when scrolling up
     --------------------------------------------------------------------------- */
  function headerScroll(){
    var header = document.getElementById('mainHeader');
    var inner = document.getElementById('headerInner');
    var btt = document.getElementById('btt');
    var lastY = 0;
    var ticking = false;
    var hideThreshold = 100;

    function onScroll(){
      if(ticking) return;
      ticking = true;
      requestAnimationFrame(function(){
        var y = window.pageYOffset || document.documentElement.scrollTop;

        // Fixed class after scrolling past header height
        if(y > 80){
          header.classList.add('fixed');
        } else {
          header.classList.remove('fixed');
        }

        // Move class — triggers frosted glass pill on inner
        if(y > 80){
          inner.classList.add('move');
        } else {
          inner.classList.remove('move');
        }

        // Auto-hide: hide on scroll down, show on scroll up
        if(y > hideThreshold){
          if(y > lastY + 8){
            header.classList.add('hidden');
          } else if(y < lastY - 8){
            header.classList.remove('hidden');
          }
        } else {
          header.classList.remove('hidden');
        }

        // BTT button
        btt.classList.toggle('visible', y > 500);

        lastY = y;
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  /* ---------------------------------------------------------------------------
     FULL-SCREEN MENU
     --------------------------------------------------------------------------- */
  function fullScreenMenu(){
    var trigger = document.getElementById('actionMenu');
    var wrapper = document.getElementById('menuWrapper');
    var links = wrapper.querySelectorAll('.menu-item a');
    var isOpen = false;

    // Create overlay dynamically
    var overlay = document.createElement('div');
    overlay.className = 'close-menu-bg';
    overlay.id = 'closeMenuBg';
    document.body.appendChild(overlay);

    function openMenu(){
      if(isOpen) return;
      isOpen = true;
      trigger.classList.add('active');
      wrapper.classList.add('open');
      overlay.classList.add('show');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu(){
      if(!isOpen) return;
      isOpen = false;
      trigger.classList.remove('active');
      wrapper.classList.remove('open');
      overlay.classList.remove('show');
      document.body.style.overflow = '';
    }

    trigger.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      if(isOpen) closeMenu(); else openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    links.forEach(function(link){
      link.addEventListener('click', function(){
        closeMenu();
        // Smooth scroll to target
        var id = this.getAttribute('href');
        if(id && id !== '#'){
          var target = document.querySelector(id);
          if(target){
            setTimeout(function(){
              var headerH = document.getElementById('mainHeader').offsetHeight;
              var top = target.getBoundingClientRect().top + window.pageYOffset - headerH - 10;
              window.scrollTo({top:top, behavior:'smooth'});
            }, 400);
          }
        }
      });
    });

    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && isOpen) closeMenu();
    });
  }

  /* ---------------------------------------------------------------------------
     SMOOTH SCROLL
     --------------------------------------------------------------------------- */
  function smoothScroll(){
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      if(a.hasAttribute('data-service')) return;
      a.addEventListener('click', function(e){
        var id = this.getAttribute('href');
        if(id === '#top'){
          e.preventDefault();
          window.scrollTo({top:0, behavior:'smooth'});
          return;
        }
        var target = document.querySelector(id);
        if(target){
          e.preventDefault();
          var headerH = document.getElementById('mainHeader').offsetHeight;
          var top = target.getBoundingClientRect().top + window.pageYOffset - headerH - 10;
          window.scrollTo({top:top, behavior:'smooth'});
        }
      });
    });
  }

  /* ---------------------------------------------------------------------------
     SCROLL REVEAL
     --------------------------------------------------------------------------- */
  function scrollReveal(){
    var els = document.querySelectorAll('.kicker,.headline,.body-text,.client-logo,.prod-card,.proj-card,.who-card,.svc-item,.testimonial__inner,.cta__left,.cta__right,.video-split__text,.video-split__embed,.site-footer__brand,.site-footer__col');
    els.forEach(function(el){ if(!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal',''); });

    document.querySelectorAll('.who-grid,.cta__form-row').forEach(function(grid){
      var ch = grid.children;
      for(var i=0;i<ch.length;i++) ch[i].setAttribute('data-reveal','d'+Math.min(i+1,4));
    });

    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.classList.add('revealed'); obs.unobserve(entry.target); }
      });
    }, {threshold:0.08, rootMargin:'0px 0px -30px 0px'});

    document.querySelectorAll('[data-reveal]').forEach(function(el){ obs.observe(el); });
  }

  /* ---------------------------------------------------------------------------
     TESTIMONIAL — random quote on page load
     --------------------------------------------------------------------------- */
  function testimonialRandom(){
    var quotes = [
      {text:'«La gente ignora el diseño que ignora a la gente.»', author:'Frank Chimero'},
      {text:'«La tecnología hace posible lo que antes era imposible. El diseño hace que sea real.»', author:'Michael Gagliano'},
      {text:'«El lenguaje es una limitación, una prisión. El diseño permite explorar otros espacios.»', author:'Neville Brody'},
      {text:'«Si puedes diseñar una cosa, entonces puedes diseñarlo todo; si lo haces bien, perdurará para siempre.»', author:'Massimo Vignelli'},
      {text:'«Haz el trabajo que le haga bien a tu alma, no a tu ego.»', author:'Jessica Walsh'},
      {text:'«Haz un buen trabajo para buenas personas.»', author:'Aaron Draplin'},
      {text:'«He visto películas que me han conmovido, he leído libros que han cambiado mi modo de ver las cosas y he escuchado música que ha influido en mi ánimo. Nuestro objetivo será llegar al corazón de la gente con el diseño.»', author:'Stefan Sagmeister'},
      {text:'«Haz lo que mejor sabes hacer, pero sé capaz de cambiar con el tiempo.»', author:'Paula Scher'},
      {text:'«Que tus diseños tengan un fuerte significado.»', author:'Jacqueline Casey'},
      {text:'«Los símbolos sencillos y económicos funcionan mejor y de forma más universal que los cargados de detalles.»', author:'Susan Kare'},
      {text:'«En cuanto los clientes se dan cuenta de que los cambios no son un bufet libre, descubren que ya no tienen hambre.»', author:'Lester Ball'},
      {text:'«La información solo es útil cuando es comprendida.»', author:'Muriel Cooper'},
      {text:'«Leo mucho, después pienso y hago un gran número de bocetos. Nunca voy al ordenador si no tengo ideas antes.»', author:'Noma Bar'},
      {text:'«El significado de un logo deriva de la calidad de lo que simboliza, no a la inversa.»', author:'Paul Rand'},
      {text:'«Cada gran diseño comienza con una historia aún mejor.»', author:'Lorinda Mamo'},
      {text:'«Diseñar es pensar en hacerlo visual.»', author:'Saul Bass'},
      {text:'«Al usar iconos puedes crear un sentido de pertenencia, y puedes crear un programa internacional que no dependa de ningún lenguaje.»', author:'Lance Wyman'},
      {text:'«El contenido precede al diseño. Diseño en ausencia de contenido no es diseño, es decoración.»', author:'Jeffrey Zeldman'},
      {text:'«El diseño debe servir para comunicar de la manera más clara y sencilla posible.»', author:'Astrid Stavro'},
      {text:'«El diseño está en todo lo que hacemos, pero también está en medio de todo; es una combinación de arte, historia y filosofía.»', author:'Erik Adigard'},
      {text:'«La idea no es vivir para siempre: la idea es crear algo que sí lo haga.»', author:'Andy Warhol'},
      {text:'«Solo hay un tipo de diseñador: al que le importa la tipografía.»', author:'Rohan Nanavati'},
      {text:'«La tipografía necesita ser escuchada, necesita ser sentida, necesita ser vivida.»', author:'Helmut Schmid'},
      {text:'«Deshazte de todo lo que no es esencial para mostrar algo.»', author:'Cristoph Niemann'},
      {text:'«El rol de un buen diseñador es anticiparse, como un buen anfitrión lo hace con las necesidades de sus invitados.»', author:'Charles Eames'},
      {text:'«Observa las cosas usuales con ojos inusuales.»', author:'Vigo Magistretti'},
      {text:'«No busques la alabanza, busca la crítica.»', author:'Paul Arden'},
      {text:'«Todo está diseñado. Pocas cosas están bien diseñadas.»', author:'Brian Reed'},
      {text:'«La simplicidad es sustraer lo obvio y añadir lo significativo.»', author:'John Maeda'},
      {text:'«Simplicidad, blanco y una buena tipografía.»', author:'Michael Bierut'},
      {text:'«El gran diseño es una relación multidimensional entre la vida humana y el entorno.»', author:'Naoto Fukasawa'},
      {text:'«La interfaz de usuario es como un chiste: si tienes que explicarla, entonces no es tan buena.»', author:'Martin LeBlanc'},
      {text:'«El diseño es una oportunidad de seguir contando una historia, no de resumirla.»', author:'Tate Linden'},
      {text:'«El fracaso es algo que debemos aceptar; si no cometes los suficientes errores, no estás tomando riesgos.»', author:'Debbie Millman'},
      {text:'«El trabajo que haces mientras procrastinas es el que debes hacer el resto de tu vida.»', author:'Jessica Hische'},
      {text:'«El diseño puede ser arte. El diseño puede ser estética. El diseño es tan simple, por eso es tan complicado.»', author:'Paul Rand'},
      {text:'«El buen diseño es honesto.»', author:'Dieter Rams'},
      {text:'«Los detalles no son detalles. Los detalles hacen el diseño.»', author:'Charles Eames'},
      {text:'«El diseño es el intermediario entre la información y la comprensión.»', author:'Hans Hoffman'},
      {text:'«El color es tan intuitivo.»', author:'Milton Glaser'},
      {text:'«El espacio en blanco es como el aire: es necesario para que el diseño respire.»', author:'Wojciech Zieliński'},
      {text:'«Para mí, no hay reglas cuando se trata de lo que se considera un "buen" diseño.»', author:'Kate Moross'},
      {text:'«La simplicidad es la máxima sofisticación.»', author:'Leonardo da Vinci'},
      {text:'«Puedes hacer un buen anuncio sin una buena tipografía, pero no puedes hacer un gran anuncio sin una buena tipografía.»', author:'Herb Lubalin'},
      {text:'«Hay tres respuestas a una pieza de diseño: sí, no y ¡guau! Guau es el objetivo al que hay que apuntar.»', author:'Milton Glaser'},
      {text:'«El diseño gráfico salvará el mundo justo después de que lo haga el rock and roll.»', author:'David Carson'},
      {text:'«Si puedes definir correctamente el problema, entonces también has definido la solución.»', author:'Chip Kidd'},
      {text:'«El buen diseño es como un refrigerador: cuando funciona, nadie se da cuenta, pero cuando no funciona, definitivamente apesta.»', author:'Irene Au'},
      {text:'«Me gusta entrar en áreas donde tengo miedo. El miedo es una señal de que voy en la dirección correcta.»', author:'April Greiman'},
      {text:'«La creatividad no es más que una mente liberada.»', author:'Torrie T. Asai'}
    ];
    var q = quotes[Math.floor(Math.random() * quotes.length)];
    var quoteEl = document.getElementById('testimonialQuote');
    var citeEl = document.getElementById('testimonialCite');
    if(quoteEl && citeEl){
      quoteEl.textContent = q.text;
      citeEl.textContent = '— ' + q.author;
    }
  }

  /* ---------------------------------------------------------------------------
     SERVICE SVG DATA — single source of truth
     --------------------------------------------------------------------------- */
  var svcAnims = {
    'multimedia-3d':{title:'Multimedia 3D',lead:'Videos corporativos e industriales en 3D que comunican procesos y proyectos complejos con impacto visual.',desc:'Creamos piezas audiovisuales en 3D que transforman ideas complejas en historias visuales claras y impactantes. Desde videos de presentación corporativa hasta simulaciones industriales detalladas, nuestro equipo combina modelado, animación y renderizado para entregar contenido que capta la atención y comunica con precisión.'},
    'aplicaciones':{title:'Aplicaciones',lead:'Aplicaciones web y móviles a medida para la industria, diseñadas para el entorno operativo real.',desc:'Desarrollamos herramientas digitales personalizadas que se integran directamente en los flujos de trabajo de tu operación. Aplicaciones de gestión, dashboards interactivos, sistemas de seguimiento y control — todo diseñado para resolver problemas reales en entornos industriales exigentes.'},
    'representaciones':{title:'Representaciones 3D',lead:'Modelado y renders fotorrealistas de equipos, plantas y productos.',desc:'Convertimos planos, modelos CAD y referencias técnicas en imágenes 3D fotorrealistas. Ideal para presentaciones de proyectos, marketing de equipos industriales o visualización de instalaciones antes de su construcción. Cada detalle se modela con precisión técnica y estética profesional.'},
    'procesos':{title:'Procesos Industriales',lead:'Visualización de procesos productivos para optimizar operaciones y capacitar equipos.',desc:'Transformamos flujos de trabajo industriales en animaciones 3D que facilitan la comprensión, capacitación y optimización. Desde líneas de producción hasta protocolos de seguridad, cada proceso se visualiza con claridad para reducir errores, mejorar tiempos y capacitar de forma efectiva.'},
    'interactivos':{title:'Interactivos 3D',lead:'Experiencias interactivas para explorar y presentar proyectos de forma inmersiva.',desc:'Diseñamos experiencias donde el usuario controla la navegación: explorar una planta 3D, interactuar con maquinaria virtual o recorrer un proyecto desde cualquier ángulo. Aplicaciones web interactivas, touchscreens para eventos y kioscos digitales que dejan una impresión duradera.'},
    'rv':{title:'Realidad Virtual',lead:'Simulaciones inmersivas de RV para entrenamiento de seguridad y operaciones de alto riesgo.',desc:'Creamos entornos de realidad virtual donde el equipo puede practicar protocolos de seguridad, operar maquinaria virtual y enfrentar escenarios de riesgo sin consecuencias reales. La RV reduce accidentes, mejora la retención de aprendizaje y permite simular situaciones imposibles de replicar en la vida real.'}
  };

  var svcSvgList = {
    'multimedia-3d':'<svg viewBox="0 0 64 36"><defs><clipPath id="svcClipL1"><rect x="4" y="4" width="56" height="28" rx="1"/></clipPath></defs><rect class="vf-frame" x="4" y="4" width="56" height="28" rx="1"/><polyline class="vf-frame" points="4,10 4,4 10,4"/><polyline class="vf-frame" points="54,4 60,4 60,10"/><polyline class="vf-frame" points="60,26 60,32 54,32"/><polyline class="vf-frame" points="10,32 4,32 4,26"/><g clip-path="url(#svcClipL1)"><g><animateTransform attributeName="transform" type="translate" from="0 0" to="-60 0" dur="3s" repeatCount="indefinite"/><line x1="0" y1="24" x2="120" y2="24" stroke="var(--accent)" stroke-width="1" opacity=".5"/><polyline points="0,24 8,14 14,20 22,12 30,24" fill="none" stroke="var(--accent)" stroke-width="1.2" opacity=".7"/><rect x="34" y="16" width="3" height="8" fill="none" stroke="var(--accent)" stroke-width=".8" opacity=".6"/><rect x="38" y="14" width="2.5" height="10" fill="none" stroke="var(--accent)" stroke-width=".8" opacity=".6"/><line x1="0" y1="32" x2="120" y2="32" stroke="var(--accent)" stroke-width=".6" opacity=".35"/><line x1="60" y1="24" x2="120" y2="24" stroke="var(--accent)" stroke-width="1" opacity=".5"/><polyline points="60,24 68,14 74,20 82,12 90,24" fill="none" stroke="var(--accent)" stroke-width="1.2" opacity=".7"/><rect x="94" y="16" width="3" height="8" fill="none" stroke="var(--accent)" stroke-width=".8" opacity=".6"/><rect x="98" y="14" width="2.5" height="10" fill="none" stroke="var(--accent)" stroke-width=".8" opacity=".6"/><line x1="60" y1="32" x2="120" y2="32" stroke="var(--accent)" stroke-width=".6" opacity=".35"/></g></g></svg>',
    'aplicaciones':'<svg viewBox="0 0 64 64"><rect class="phone-frame" x="18" y="8" width="28" height="48" rx="5"/><circle class="phone-dot" cx="27" cy="24" r="3"/><circle class="phone-dot" cx="37" cy="24" r="3"/><circle class="phone-dot" cx="27" cy="34" r="3"/><circle class="phone-dot" cx="37" cy="34" r="3"/><line x1="27" y1="48" x2="37" y2="48" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round" opacity=".4"/></svg>',
    'representaciones':'<svg viewBox="0 0 64 64" class="svc-list-repr"><g class="shape" data-shape="cube"><polyline class="sh-line" points="20,44 32,50 32,36"/><polyline class="sh-line" points="20,44 20,32 32,36"/><polyline class="sh-line" points="20,32 32,26 32,36"/><polyline class="sh-line" points="32,26 44,32 32,36"/><polyline class="sh-line" points="44,32 44,44 32,50"/></g><g class="shape" data-shape="sphere"><ellipse class="sh-line" cx="32" cy="32" rx="14" ry="14"/><ellipse class="sh-line" cx="32" cy="32" rx="14" ry="5"/><ellipse class="sh-line" cx="32" cy="32" rx="5" ry="14"/></g><g class="shape" data-shape="cone"><polygon class="sh-line" points="32,20 18,48 46,48"/><ellipse class="sh-line" cx="32" cy="48" rx="14" ry="5"/><line class="sh-line" x1="32" y1="20" x2="46" y2="48"/></g></svg>',
    'procesos':'<svg viewBox="0 0 64 64"><circle class="gear" cx="32" cy="32" r="18" stroke-dasharray="8 6"/><circle class="gear-inner" cx="32" cy="32" r="10" stroke-dasharray="4 4"/><circle cx="32" cy="32" r="3" fill="var(--accent)" opacity=".6"/></svg>',
    'interactivos':'<svg viewBox="0 0 64 64"><circle class="ripple" cx="32" cy="32" r="8"/><circle class="ripple" cx="32" cy="32" r="8"/><polygon class="cursor" points="26,20 26,36 32,30 38,38 42,36 36,28 42,28" fill="var(--accent)"/></svg>',
    'rv':'<svg viewBox="0 0 64 64"><path class="headset" d="M12,28 Q12,20 20,20 L44,20 Q52,20 52,28 L52,36 Q52,40 48,40 L42,40 L38,44 L26,44 L22,40 L16,40 Q12,40 12,36 Z"/><rect class="vr-scan" x="20" y="26" width="10" height="8" rx="2"/><rect class="vr-scan" x="34" y="26" width="10" height="8" rx="2"/><line x1="12" y1="32" x2="6" y2="32" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round" opacity=".5"/><line x1="52" y1="32" x2="58" y2="32" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round" opacity=".5"/></svg>'
  };

  var svcSvgModal = {
    'multimedia-3d':'<svg viewBox="0 0 64 36" class="svc-anim-mimedia3d" style="width:100%;height:auto;display:block"><defs><clipPath id="vfClip"><rect x="4" y="4" width="56" height="28" rx="1"/></clipPath></defs><rect class="vf-frame" x="4" y="4" width="56" height="28" rx="1"/><polyline class="vf-frame" points="4,10 4,4 10,4"/><polyline class="vf-frame" points="54,4 60,4 60,10"/><polyline class="vf-frame" points="60,26 60,32 54,32"/><polyline class="vf-frame" points="10,32 4,32 4,26"/><line class="vf-frame" x1="30" y1="17" x2="34" y2="17" opacity=".5"/><line class="vf-frame" x1="32" y1="15" x2="32" y2="19" opacity=".5"/><g clip-path="url(#vfClip)"><g class="vf-horizon"><animateTransform attributeName="transform" type="translate" from="0 0" to="-60 0" dur="3s" repeatCount="indefinite"/><line x1="0" y1="14" x2="120" y2="14" stroke="var(--accent)" stroke-width=".5" opacity=".25"/><line x1="0" y1="18" x2="120" y2="18" stroke="var(--accent)" stroke-width=".4" opacity=".15"/><polyline points="0,24 6,16 10,20 16,12 22,18 26,24" fill="none" stroke="var(--accent)" stroke-width="1.2" opacity=".7"/><rect x="30" y="17" width="3" height="7" fill="none" stroke="var(--accent)" stroke-width=".8" opacity=".6"/><rect x="34" y="14" width="2.5" height="10" fill="none" stroke="var(--accent)" stroke-width=".8" opacity=".6"/><rect x="37.5" y="18" width="2" height="6" fill="none" stroke="var(--accent)" stroke-width=".8" opacity=".6"/><line x1="30" y1="19" x2="33" y2="19" stroke="var(--accent)" stroke-width=".4" opacity=".3"/><line x1="34" y1="16" x2="36.5" y2="16" stroke="var(--accent)" stroke-width=".4" opacity=".3"/><line x1="43" y1="24" x2="43" y2="20" stroke="var(--accent)" stroke-width=".7" opacity=".5"/><line x1="47" y1="24" x2="47" y2="19" stroke="var(--accent)" stroke-width=".7" opacity=".5"/><line x1="51" y1="24" x2="51" y2="21" stroke="var(--accent)" stroke-width=".7" opacity=".5"/><line x1="0" y1="24" x2="60" y2="24" stroke="var(--accent)" stroke-width=".8" opacity=".5"/><line x1="0" y1="32" x2="60" y2="32" stroke="var(--accent)" stroke-width=".6" opacity=".35"/><line x1="5" y1="26" x2="12" y2="26" stroke="var(--accent)" stroke-width=".3" opacity=".2"/><line x1="20" y1="27" x2="28" y2="27" stroke="var(--accent)" stroke-width=".3" opacity=".2"/><line x1="40" y1="26" x2="50" y2="26" stroke="var(--accent)" stroke-width=".3" opacity=".2"/><line x1="60" y1="14" x2="120" y2="14" stroke="var(--accent)" stroke-width=".5" opacity=".25"/><line x1="60" y1="18" x2="120" y2="18" stroke="var(--accent)" stroke-width=".4" opacity=".15"/><polyline points="60,24 66,16 70,20 76,12 82,18 86,24" fill="none" stroke="var(--accent)" stroke-width="1.2" opacity=".7"/><rect x="90" y="17" width="3" height="7" fill="none" stroke="var(--accent)" stroke-width=".8" opacity=".6"/><rect x="94" y="14" width="2.5" height="10" fill="none" stroke="var(--accent)" stroke-width=".8" opacity=".6"/><rect x="97.5" y="18" width="2" height="6" fill="none" stroke="var(--accent)" stroke-width=".8" opacity=".6"/><line x1="90" y1="19" x2="93" y2="19" stroke="var(--accent)" stroke-width=".4" opacity=".3"/><line x1="94" y1="16" x2="96.5" y2="16" stroke="var(--accent)" stroke-width=".4" opacity=".3"/><line x1="103" y1="24" x2="103" y2="20" stroke="var(--accent)" stroke-width=".7" opacity=".5"/><line x1="107" y1="24" x2="107" y2="19" stroke="var(--accent)" stroke-width=".7" opacity=".5"/><line x1="111" y1="24" x2="111" y2="21" stroke="var(--accent)" stroke-width=".7" opacity=".5"/><line x1="60" y1="24" x2="120" y2="24" stroke="var(--accent)" stroke-width=".8" opacity=".5"/><line x1="60" y1="32" x2="120" y2="32" stroke="var(--accent)" stroke-width=".6" opacity=".35"/><line x1="65" y1="26" x2="72" y2="26" stroke="var(--accent)" stroke-width=".3" opacity=".2"/><line x1="80" y1="27" x2="88" y2="27" stroke="var(--accent)" stroke-width=".3" opacity=".2"/><line x1="100" y1="26" x2="110" y2="26" stroke="var(--accent)" stroke-width=".3" opacity=".2"/></g></g></svg>',
    'aplicaciones':'<svg viewBox="0 0 64 64" style="width:64px;height:64px;margin:0 auto"><rect class="phone-frame" x="18" y="8" width="28" height="48" rx="5"/><circle class="phone-dot" cx="27" cy="24" r="3"/><circle class="phone-dot" cx="37" cy="24" r="3"/><circle class="phone-dot" cx="27" cy="34" r="3"/><circle class="phone-dot" cx="37" cy="34" r="3"/><line x1="27" y1="48" x2="37" y2="48" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round" opacity=".4"/></svg>',
    'representaciones':'<svg viewBox="0 0 64 64" style="width:64px;height:64px;margin:0 auto" class="svc-anim-repr"><g class="shape" data-shape="cube"><polyline class="sh-line" points="20,44 32,50 32,36"/><polyline class="sh-line" points="20,44 20,32 32,36"/><polyline class="sh-line" points="20,32 32,26 32,36"/><polyline class="sh-line" points="32,26 44,32 32,36"/><polyline class="sh-line" points="44,32 44,44 32,50"/></g><g class="shape" data-shape="sphere"><ellipse class="sh-line" cx="32" cy="32" rx="14" ry="14"/><ellipse class="sh-line" cx="32" cy="32" rx="14" ry="5"/><ellipse class="sh-line" cx="32" cy="32" rx="5" ry="14"/></g><g class="shape" data-shape="cone"><polygon class="sh-line" points="32,20 18,48 46,48"/><ellipse class="sh-line" cx="32" cy="48" rx="14" ry="5"/><line class="sh-line" x1="32" y1="20" x2="46" y2="48"/></g></svg>',
    'procesos':'<svg viewBox="0 0 64 64" style="width:64px;height:64px;margin:0 auto"><circle class="gear" cx="32" cy="32" r="18" stroke-dasharray="8 6"/><circle class="gear-inner" cx="32" cy="32" r="10" stroke-dasharray="4 4"/><circle cx="32" cy="32" r="3" fill="var(--accent)" opacity=".6"/></svg>',
    'interactivos':'<svg viewBox="0 0 64 64" style="width:64px;height:64px;margin:0 auto"><circle class="ripple" cx="32" cy="32" r="8"/><circle class="ripple" cx="32" cy="32" r="8"/><polygon class="cursor" points="26,20 26,36 32,30 38,38 42,36 36,28 42,28" fill="var(--accent)"/></svg>',
    'rv':'<svg viewBox="0 0 64 64" style="width:64px;height:64px;margin:0 auto"><path class="headset" d="M12,28 Q12,20 20,20 L44,20 Q52,20 52,28 L52,36 Q52,40 48,40 L42,40 L38,44 L26,44 L22,40 L16,40 Q12,40 12,36 Z"/><rect class="vr-scan" x="20" y="26" width="10" height="8" rx="2"/><rect class="vr-scan" x="34" y="26" width="10" height="8" rx="2"/><line x1="12" y1="32" x2="6" y2="32" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round" opacity=".5"/><line x1="52" y1="32" x2="58" y2="32" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round" opacity=".5"/></svg>'
  };

  /* ---------------------------------------------------------------------------
     SERVICE LIST ICONS — inject from shared data
     --------------------------------------------------------------------------- */
  function serviceListIcons(){
    var iconMap = {'multimedia-3d':'svcIcon01','aplicaciones':'svcIcon02','representaciones':'svcIcon03','procesos':'svcIcon04','interactivos':'svcIcon05','rv':'svcIcon06'};
    Object.keys(iconMap).forEach(function(key){
      var el = document.getElementById(iconMap[key]);
      if(el) el.innerHTML = svcSvgList[key];
    });
    var shapes = ['cube','sphere','cone'];
    var idx = 0;
    setInterval(function(){
      var svg = document.querySelector('.svc-list-repr');
      if(!svg) return;
      svg.querySelectorAll('.shape').forEach(function(s){s.classList.remove('active')});
      var current = svg.querySelector('[data-shape="'+shapes[idx]+'"]');
      if(current) current.classList.add('active');
      idx = (idx + 1) % shapes.length;
    }, 1800);
  }

  /* ---------------------------------------------------------------------------
     SERVICE MODAL
     --------------------------------------------------------------------------- */
  function serviceModal(){
    var modal = document.getElementById('svcModal');
    var overlay = document.getElementById('svcModalOverlay');
    var closeBtn = document.getElementById('svcModalClose');
    var animEl = document.getElementById('svcModalAnim');
    var titleEl = document.getElementById('svcModalTitle');
    var leadEl = document.getElementById('svcModalLead');
    var descEl = document.getElementById('svcModalDesc');
    var ctaEl = document.getElementById('svcModalCta');

    var shapeInterval = null;
    var shapes = ['cube','sphere','cone'];
    var shapeIdx = 0;

    function cycleShapes(){
      var svg = animEl.querySelector('.svc-anim-repr');
      if(!svg) return;
      svg.querySelectorAll('.shape').forEach(function(s){s.classList.remove('active')});
      var current = svg.querySelector('[data-shape="'+shapes[shapeIdx]+'"]');
      if(current) current.classList.add('active');
      shapeIdx = (shapeIdx + 1) % shapes.length;
    }

    function startShapeCycle(){
      shapeIdx = 0;
      cycleShapes();
      shapeInterval = setInterval(cycleShapes, 1800);
    }

    function stopShapeCycle(){
      if(shapeInterval){clearInterval(shapeInterval); shapeInterval = null;}
    }

    function openModal(key){
      var s = svcAnims[key];
      if(!s) return;
      stopShapeCycle();
      animEl.innerHTML = svcSvgModal[key];
      titleEl.textContent = s.title;
      leadEl.textContent = s.lead;
      descEl.textContent = s.desc;
      ctaEl.setAttribute('href','#contacto');
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      if(key === 'representaciones') requestAnimationFrame(function(){ startShapeCycle(); });
    }

    function closeModal(){
      stopShapeCycle();
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.svc-item[data-service]').forEach(function(item){
      item.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        openModal(this.getAttribute('data-service'));
      });
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });

    ctaEl.addEventListener('click', function(){
      closeModal();
    });
  }

  /* ---------------------------------------------------------------------------
     PROJECT MODAL
     --------------------------------------------------------------------------- */
  var projData = {
    'visualizacion-3d': {
      cat: 'Eventos',
      title: 'Visualización 3D Corporativa',
      desc: 'En la industria, los accidentes se llaman "eventos" — situaciones de riesgo que necesitan ser analizadas, difundidas y convertidas en aprendizaje. Creamos videos 3D que explican estas situaciones con una claridad y permeabilidad que los métodos tradicionales no logran alcanzar.',
      formats: ['Video','Interactivo','VR'],
      images: [{src:'images/proyectos/01_1.jpg',alt:'Visualización 3D Corporativa'},{src:'images/proyectos/01_2.jpg',alt:'Modelado 3D del equipo de extracción'},{src:'images/proyectos/01_3.jpg',alt:'Vista interactiva del proceso minero'}]
    },
    'procesos': {
      cat: 'Capacitación',
      title: 'Procesos Industriales 3D',
      desc: 'Transformamos flujos de trabajo industriales en animaciones 3D que facilitan la comprensión, capacitación y optimización. Desde líneas de producción hasta protocolos de seguridad, cada proceso se visualiza con claridad para reducir errores y capacitar de forma efectiva.',
      formats: ['Video','Web','Interactivo','VR','Presentación'],
      images: [{src:'images/proyectos/02_1.jpg',alt:'Procesos Industriales 3D'},{src:'images/proyectos/02_2.jpg',alt:'Flujo operativo visualizado en 3D'},{src:'images/proyectos/02_3.jpg',alt:'Detalle del proceso de ensamblaje'}]
    },
    'video': {
      cat: 'Multimedia',
      title: 'Video Corporativo 3D',
      desc: 'Videos corporativos en 3D que comunican la visión, valores y capacidades de una empresa con impacto visual. Piezas audiovisuales diseñadas para eventos, presentaciones ejecutivas y plataformas digitales.',
      formats: ['Video','Presentación','Web'],
      images: [{src:'images/proyectos/03_1.jpg',alt:'Video Corporativo 3D'},{src:'images/proyectos/03_2.jpg',alt:'Escena de animación 3D corporativa'},{src:'images/proyectos/03_3.jpg',alt:'Composición visual con infografías'}]
    },
    'simulacion': {
      cat: 'Realidad Virtual',
      title: 'Simulación VR Industrial',
      desc: 'Entornos de realidad virtual donde el equipo puede practicar protocolos de seguridad, operar maquinaria virtual y enfrentar escenarios de riesgo sin consecuencias reales. La RV reduce accidentes y mejora la retención de aprendizaje.',
      formats: ['VR','Interactivo','Web'],
      images: [{src:'images/proyectos/04_1.jpg',alt:'Simulación VR Industrial'},{src:'images/proyectos/04_2.jpg',alt:'Entrenamiento de seguridad en RV'},{src:'images/proyectos/04_3.jpg',alt:'Simulación de escenario de riesgo'}]
    },
    'modelado': {
      cat: 'Representaciones 3D',
      title: 'Modelado 3D Industrial',
      desc: 'Convertimos planos, modelos CAD y referencias técnicas en imágenes 3D fotorrealistas. Ideal para presentaciones de proyectos, marketing de equipos industriales o visualización de instalaciones antes de su construcción.',
      formats: ['3D','Video','Image'],
      images: [{src:'images/proyectos/05_1.jpg',alt:'Modelado 3D Industrial'},{src:'images/proyectos/05_2.jpg',alt:'Render fotorrealista de equipo industrial'},{src:'images/proyectos/05_3.jpg',alt:'Vista exploded del ensamblaje'}]
    },
    'interactivo': {
      cat: 'Interactivos',
      title: 'Interactivo Capacitación',
      desc: 'Experiencias donde el usuario controla la navegación: explorar una planta 3D, interactuar con maquinaria virtual o recorrer un proyecto desde cualquier ángulo. Aplicaciones web interactivas que dejan una impresión duradera.',
      formats: ['Interactivo','VR','Web'],
      images: [{src:'images/proyectos/06_1.jpg',alt:'Interactivo Capacitación'},{src:'images/proyectos/06_2.jpg',alt:'Interfaz de la aplicación interactiva'},{src:'images/proyectos/06_3.jpg',alt:'Módulo de evaluación de aprendizaje'}]
    }
  };

  function projectModal(){
    var modal = document.getElementById('projModal');
    var overlay = document.getElementById('projModalOverlay');
    var closeBtn = document.getElementById('projModalClose');
    var ctaEl = document.getElementById('projModalCta');
    var galleryEl = document.getElementById('projGallery');
    var dotsContainer = document.getElementById('projDots');
    var catEl = document.getElementById('projModalCat');
    var titleEl = document.getElementById('projModalTitle');
    var descEl = document.getElementById('projModalDesc');
    var metaEl = document.getElementById('projModalMeta');
    var timer = null;
    var current = 0;
    var slides = [];

    function buildGallery(imgs){
      galleryEl.innerHTML = '';
      slides = [];
      imgs.forEach(function(img,i){
        var div = document.createElement('div');
        div.className = 'proj-modal__slide' + (i===0?' proj-modal__slide--active':'');
        div.innerHTML = '<img src="'+img.src+'" alt="'+img.alt+'">';
        galleryEl.appendChild(div);
        slides.push(div);
      });
    }

    function buildDots(n){
      dotsContainer.innerHTML = '';
      for(var i=0;i<n;i++){
        var d = document.createElement('button');
        d.className = 'proj-modal__dot' + (i===0?' proj-modal__dot--active':'');
        d.setAttribute('aria-label','Slide '+(i+1));
        (function(idx){
          d.addEventListener('click', function(){ goTo(idx); resetTimer(); });
        })(i);
        dotsContainer.appendChild(d);
      }
    }

    function buildMeta(formats){
      metaEl.innerHTML = '<span style="font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--fg3);display:block;margin-bottom:.5rem">Formatos</span>';
      var html = '<div style="display:flex;flex-wrap:wrap;gap:6px">';
      formats.forEach(function(f){
        html += '<span style="font-size:.72rem;padding:4px 10px;border:1px solid var(--border);border-radius:20px;color:var(--fg2)">'+f+'</span>';
      });
      metaEl.innerHTML += html + '</div>';
    }

    function goTo(idx){
      slides.forEach(function(s,i){ s.classList.toggle('proj-modal__slide--active', i===idx); });
      dotsContainer.querySelectorAll('.proj-modal__dot').forEach(function(d,i){ d.classList.toggle('proj-modal__dot--active', i===idx); });
      current = idx;
    }

    function next(){ goTo((current+1) % slides.length); }

    function resetTimer(){
      clearInterval(timer);
      timer = setInterval(next, 5000);
    }

    function openModal(key){
      var p = projData[key];
      if(!p) return;
      catEl.textContent = p.cat;
      titleEl.textContent = p.title;
      descEl.textContent = p.desc;
      buildGallery(p.images);
      buildDots(p.images.length);
      buildMeta(p.formats);
      current = 0;
      goTo(0);
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      resetTimer();
    }

    function closeModal(){
      clearInterval(timer);
      timer = null;
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-project]').forEach(function(card){
      card.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        openModal(this.getAttribute('data-project'));
      });
      card.addEventListener('keydown', function(e){
        if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openModal(this.getAttribute('data-project')); }
      });
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    ctaEl.addEventListener('click', closeModal);
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
  }

  /* ---------------------------------------------------------------------------
     CONTACT FORM
     --------------------------------------------------------------------------- */
  function contactForm(){
    var form = document.getElementById('contactForm');
    var msgBox = document.getElementById('formMsg');
    if(!form) return;
    function showMsg(t,c){ msgBox.innerHTML='<div class="alert alert-'+c+'">'+t+'</div>'; setTimeout(function(){msgBox.innerHTML='';},6000); }
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(typeof grecaptcha==='undefined'){ showMsg('reCAPTCHA no se pudo cargar.','error'); return; }
      var rc=grecaptcha.getResponse();
      if(!rc){ showMsg('Completa la verificación.','error'); return; }
      var fd=new FormData(form); fd.append('recaptcha_response',rc);
      showMsg('Enviando...','info');
      fetch('enviar_contacto.php',{method:'POST',body:fd}).then(function(r){return r.json();}).then(function(d){
        if(d.success){ showMsg('¡Mensaje enviado!','success'); form.reset(); grecaptcha.reset(); }
        else showMsg(d.message||'Error al enviar.','error');
      }).catch(function(){ showMsg('Error de conexión.','error'); });
    });
  }
})();
