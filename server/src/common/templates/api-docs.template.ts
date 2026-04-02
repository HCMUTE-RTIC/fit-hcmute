import { API_ENDPOINTS, ApiEndpoint } from '../mock/api-endpoints.mock';

const getMethodColor = (method: string): string => {
  switch (method) {
    case 'GET':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'POST':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'PUT':
    case 'PATCH':
      return 'bg-orange-50 text-orange-700 border-orange-200';
    case 'DELETE':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

const getMethodBadge = (method: string): string => {
  switch (method) {
    case 'GET':
      return 'bg-blue-600 text-white';
    case 'POST':
      return 'bg-green-600 text-white';
    case 'PUT':
    case 'PATCH':
      return 'bg-orange-500 text-white';
    case 'DELETE':
      return 'bg-red-600 text-white';
    default:
      return 'bg-gray-600 text-white';
  }
};

const formatJson = (data: any): string => {
  if (!data) return '';
  return JSON.stringify(data, null, 2);
};

const generateBashCurl = (endpoint: ApiEndpoint): string => {
  const method = endpoint.method;
  const url = `http://localhost:3000${endpoint.path}`;
  let curl = `curl -X ${method} \\\\\n  ${url}`;

  if (endpoint.auth) {
    curl += ` \\\\\n  -H "Authorization: Bearer <YOUR_TOKEN>"`;
  }

  if (endpoint.body) {
    if (endpoint.isFormData) {
      Object.entries(endpoint.body).forEach(([key, value]) => {
        curl += ` \\\\\n  -F "${key}=${value}"`;
      });
    } else {
      curl += ` \\\\\n  -H "Content-Type: application/json" \\\\\n  -d '${JSON.stringify(endpoint.body)}'`;
    }
  }

  return curl;
};

export const renderApiDocs = (): string => {
  // Group endpoints by tag
  const groupedEndpoints = API_ENDPOINTS.reduce(
    (acc, ep) => {
      if (!acc[ep.tag]) {
        acc[ep.tag] = [];
      }
      acc[ep.tag].push(ep);
      return acc;
    },
    {} as Record<string, typeof API_ENDPOINTS>,
  );

  // Render HTML based on grouped sections
  const sectionsHtml = Object.entries(groupedEndpoints)
    .map(([tag, endpoints]) => {
      const rowsHtml = endpoints
        .map((ep) => {
          const methodColorClass = getMethodColor(ep.method);
          const methodBadgeClass = getMethodBadge(ep.method);
          const bashCodeEncoded = encodeURIComponent(generateBashCurl(ep));

          const bashCodeDisplay = generateBashCurl(ep)
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

          const bodyDisplay = ep.body
            ? formatJson(ep.body).replace(/</g, '&lt;').replace(/>/g, '&gt;')
            : '';

          return `
        <details class="endpoint-row group mb-3 rounded border ${methodColorClass} bg-white shadow-sm overflow-hidden transition-all duration-200">
          <summary class="flex items-center gap-3 p-3 cursor-pointer hover:bg-black/5 outline-none custom-summary relative">
            <span class="w-20 inline-block text-center rounded text-sm font-bold py-1.5 ${methodBadgeClass}">
              ${ep.method}
            </span>
            <span class="font-mono text-slate-800 font-semibold text-[15px]">${ep.path}</span>
            <span class="text-slate-600 ml-2 text-sm hidden md:inline-block flex-1 truncate">${ep.description}</span>
            
            <div class="ml-auto flex items-center gap-3">
               ${
                 ep.auth
                   ? '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-slate-400" title="Authorization Required"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>'
                   : ''
               }
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-slate-400 transition-transform duration-200 group-open:rotate-90">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
               </svg>
            </div>
          </summary>
          
          <div class="p-4 border-t border-black/10 bg-slate-50">
            <div class="mb-4">
               <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</h4>
               <p class="text-slate-700 text-sm">${ep.description}</p>
            </div>

            ${
              ep.body
                ? `
            <div class="mb-4">
               <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Parameters</h4>
               <div class="bg-white border rounded p-3">
                  <div class="flex items-center gap-2 mb-2">
                     <span class="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border">
                        ${ep.isFormData ? 'multipart/form-data' : 'application/json'}
                     </span>
                  </div>
                  <pre class="font-mono text-[13px] text-slate-800 bg-[#f8f9fa] p-3 rounded overflow-x-auto leading-relaxed border border-slate-200"><code>${bodyDisplay}</code></pre>
               </div>
            </div>`
                : ''
            }

            <div class="mb-2">
               <div class="flex items-center justify-between mb-2">
                 <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider">Example Request (cURL)</h4>
                 <button onclick="copyToClipboard(this, '${bashCodeEncoded}')" class="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>
                    <span>Copy</span>
                 </button>
               </div>
               <pre class="font-mono text-[13px] text-slate-200 bg-slate-900 p-4 rounded-lg overflow-x-auto leading-relaxed shadow-inner"><code>${bashCodeDisplay}</code></pre>
            </div>
          </div>
        </details>
      `;
        })
        .join('');

      return `
      <div class="mb-10">
        <h2 class="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-slate-200 flex items-center gap-2">
          ${tag}
        </h2>
        <div>${rowsHtml}</div>
      </div>
    `;
    })
    .join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>API Documentation - FIT HCMUTE</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet">
      <script src="https://cdn.tailwindcss.com"></script>
      <script>
        tailwind.config = {
          theme: {
            extend: {
              fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['Roboto Mono', 'monospace'],
              }
            }
          }
        }
      </script>
      <style>
        body {
          background-color: #FAFAFA;
        }
        .custom-summary::-webkit-details-marker {
          display: none;
        }
        details > summary {
          list-style: none;
        }
        ::selection {
          background-color: rgba(59, 130, 246, 0.2);
        }
      </style>
    </head>
    <body class="font-sans text-slate-600 antialiased min-h-screen pb-20">

      <!-- Header -->
      <header class="bg-slate-900 text-white shadow-md sticky top-0 z-50">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-inner flex items-center justify-center font-bold text-xl">25</div>
            <div>
              <h1 class="text-xl font-bold leading-tight">REST API</h1>
              <p class="text-xs text-slate-400 font-medium tracking-wide">FIT HCMUTE SUB-SYSTEM</p>
            </div>
          </div>
          <div class="text-sm font-medium text-slate-300">
            Version: <span class="text-white">v1.0.0</span>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-6 md:p-8 mb-10">
          <h2 class="text-3xl font-bold text-slate-900 mb-3 tracking-tight">API Reference</h2>
          <p class="text-slate-600 text-lg max-w-3xl leading-relaxed">
            Welcome to the official developer documentation for the FIT HCMUTE 25th Anniversary platform. This API provides programmatic access to user management, article provisioning, media capabilities, and core configurations.
          </p>
          <div class="mt-6 flex flex-wrap gap-4 text-sm font-medium">
             <div class="flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-md border border-slate-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
                </svg>
                Base URL: <span class="font-mono text-slate-900 select-all">http://localhost:3000</span>
             </div>
             <div class="flex items-center gap-2 bg-orange-50 text-orange-800 px-3 py-1.5 rounded-md border border-orange-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
                Authentication: JWT Bearer
             </div>
          </div>
        </div>

        <div class="endpoints-container">
          ${sectionsHtml}
        </div>

        <div class="mt-16 text-center text-sm text-slate-500">
          <p>© 2024 HCMUTE RTIC. System Documentations natively generated.</p>
        </div>
      </main>

      <script>
        function copyToClipboard(buttonElement, textToCopyEncoded) {
          const textToCopy = decodeURIComponent(textToCopyEncoded);
          navigator.clipboard.writeText(textToCopy).then(() => {
            const originalHtml = buttonElement.innerHTML;
            
            buttonElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 text-green-600"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg><span class="text-green-600">Copied!</span>';
            
            setTimeout(() => {
              buttonElement.innerHTML = originalHtml;
            }, 2000);
          }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Lỗi khi copy!');
          });
        }
      </script>
    </body>
    </html>
  `;
};
