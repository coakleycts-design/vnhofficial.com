const BASE_URL = String(process.env.BASE_URL || 'https://vnhofficial.com').replace(/\/$/, '');

const checks = [
  { path: '/', contains: 'VNH' },
  { path: '/shop', contains: 'VNH Store' },
  { path: '/mission' },
  { path: '/contact' },
  { path: '/cart', contains: 'Your Cart' },
  { path: '/account', contains: 'Your Account' },
  { path: '/policies/terms-of-service' },
  { path: '/policies/refund-policy' },
  { path: '/policies/shipping-policy' },
  { path: '/policies/privacy-policy' },
  { path: '/robots.txt', contentType: 'text/plain', contains: 'Sitemap: https://vnhofficial.com/sitemap.xml' },
  { path: '/sitemap.xml', contentType: 'xml', contains: '<urlset' },
];

let failures = 0;

for (const check of checks) {
  const url = `${BASE_URL}${check.path}`;
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: { 'User-Agent': 'VNH-Launch-QA/1.0' },
    });
    const body = await response.text();
    const type = response.headers.get('content-type') || '';
    const errors = [];

    if (!response.ok) errors.push(`HTTP ${response.status}`);
    if (check.contentType && !type.toLowerCase().includes(check.contentType.toLowerCase())) errors.push(`content-type ${type || '(missing)'}`);
    if (check.contains && !body.includes(check.contains)) errors.push(`missing ${JSON.stringify(check.contains)}`);

    if (errors.length) {
      failures += 1;
      console.error(`FAIL ${check.path}: ${errors.join(', ')}`);
    } else {
      console.log(`PASS ${check.path} (${response.status}, ${type || 'unknown type'})`);
    }
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${check.path}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures) {
  console.error(`\n${failures} launch check${failures === 1 ? '' : 's'} failed.`);
  process.exit(1);
}

console.log(`\nAll ${checks.length} VNH launch checks passed for ${BASE_URL}.`);
