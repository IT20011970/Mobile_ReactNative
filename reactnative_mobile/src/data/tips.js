export const tips = [
  {
    id: '1',
    title: 'Network printer stops responding after router restart',
    category: 'Hardware',
    summary: 'Printer drops off the network when it gets a new IP from DHCP.',
    details: 'The printer was set to DHCP, so a router restart gave it a different IP while the installed driver still pointed at the old one. Fix: set a static IP on the printer, or reserve its MAC address in the router DHCP table. Then update the port in Printers & Scanners.',
    author: 'J. Perera',
    dateAdded: '2026-08-22',
    tags: ['printer', 'dhcp', 'static ip', 'offline'],
    image: 'https://picsum.photos/seed/printer/400/250',
  },
  {
    id: '2',
    title: 'Network printer stops responding after router restart',
    category: 'Hardware',
    summary: 'Printer drops off the network when it gets a new IP from DHCP.',
    details: 'The printer was set to DHCP, so a router restart gave it a different IP while the installed driver still pointed at the old one. Fix: set a static IP on the printer, or reserve its MAC address in the router DHCP table. Then update the port in Printers & Scanners.',
    author: 'J. Perera',
    dateAdded: '2026-08-22',
    tags: ['printer', 'dhcp', 'static ip', 'offline'],
    image: 'https://picsum.photos/seed/printer/400/250',
  }
];
