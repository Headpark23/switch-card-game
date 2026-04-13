function Navigation() {
  try {
    const [activeTab, setActiveTab] = React.useState('rules');

    const tabs = [
      { id: 'rules',         label: 'Rules',      icon: '📋' },
      { id: 'special-cards', label: 'Cards',      icon: '🃏' },
      { id: 'game-plays',    label: 'Modes',      icon: '🏆' },
      { id: 'game-flow',     label: 'Flow',       icon: '🔀' },
      { id: 'simulation',    label: 'Simulation', icon: '▶️' },
      { id: 'comments',      label: 'Chat',       icon: '💬' }
    ];

    // Track active section on scroll
    React.useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY + 120;
        let current = tabs[0].id;
        for (let i = tabs.length - 1; i >= 0; i--) {
          const el = document.getElementById(tabs[i].id);
          if (el && el.offsetTop <= scrollY) {
            current = tabs[i].id;
            break;
          }
        }
        setActiveTab(current);
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // run once on mount
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth scroll to section when tab clicked
    const handleTabClick = (id) => {
      setActiveTab(id);
      const el = document.getElementById(id);
      if (el) {
        const navHeight = 64;
        const top = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    };

    return (
      <nav
        data-name="navigation"
        className="sticky top-0 bg-white shadow-md z-50"
        style={{ borderBottom: '2px solid #e2e8f0' }}
      >
        <div className="container mx-auto px-4 py-2">
          <ul className="flex flex-wrap justify-center gap-1">
            {tabs.map(function(tab) {
              var isActive = activeTab === tab.id;
              return (
                <li key={tab.id}>
                  <button
                    data-tab={tab.id}
                    onClick={function() { handleTabClick(tab.id); }}
                    className={[
                      'flex flex-col items-center px-4 py-2 rounded-lg font-medium',
                      'transition-all duration-200',
                      'focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1',
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                    ].join(' ')}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="text-xl leading-none mb-1" aria-hidden="true">{tab.icon}</span>
                    <span className="text-xs">{tab.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    );
  } catch (error) {
    console.error('Navigation component error:', error);
    reportError(error);
    return null;
  }
}
