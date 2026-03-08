import { API_ENDPOINTS } from '../mock/api-endpoints.mock';
import { generateBashCurl, generateWindowsCurl } from '../utils/curl.util';

const getMethodColor = (method: string) => {
  switch (method) {
    case 'GET':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'POST':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'PATCH':
    case 'PUT':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'DELETE':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const renderApiDocs = (): string => {
  const cardsHtml = API_ENDPOINTS.map((ep, index) => {
    const bashCodeEncoded = encodeURIComponent(generateBashCurl(ep));
    const winCodeEncoded = encodeURIComponent(generateWindowsCurl(ep));

    const bashCodeDisplay = generateBashCurl(ep)
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const winCodeDisplay = generateWindowsCurl(ep)
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const uniqueId = `ep-${index}`;
    const methodClass = getMethodColor(ep.method);

    return `
      <div class="card bg-white shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300 mb-10 rounded-xl overflow-hidden">
        <div class="card-body p-5 md:p-6">
          
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div class="flex items-center gap-3 flex-wrap min-w-0">
              <span class="badge ${methodClass} border badge-lg font-bold font-mono px-3 py-3 rounded-md shrink-0">${ep.method}</span>
              <code class="text-base md:text-lg font-bold text-[#003B70] tracking-tight break-all">${ep.path}</code>
              ${
                ep.auth
                  ? '<div class="badge badge-outline border-orange-400 text-orange-600 text-xs font-semibold gap-1 items-center h-6 shrink-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg> Auth</div>'
                  : ''
              }
            </div>
            <div class="badge bg-slate-100 text-slate-600 border-none font-medium px-3 py-3 h-auto shrink-0">${ep.tag}</div>
          </div>
          
          <p class="text-slate-600 mb-6 text-sm md:text-base pl-3 border-l-4 border-slate-200 italic">${ep.description}</p>

          <div class="rounded-xl overflow-hidden border border-slate-300 mb-2">
            <div role="tablist" class="tabs tabs-sm bg-[#f1f5f9] py-2 px-2">
              
              <input type="radio" name="tabs-${uniqueId}" role="tab" class="tab bash-tab whitespace-nowrap" aria-label="Bash / Linux" checked />
              <div role="tabpanel" class="tab-content border-t-0 border-x-0 border-b-0 rounded-b-xl">
                <div class="relative group bg-[#1e293b] p-4 min-h-[50px]">
                  <pre class="text-green-400 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto custom-scrollbar max-w-full whitespace-pre"><code>${bashCodeDisplay}</code></pre>
                  
                  <button onclick="copyToClipboard(this, '${bashCodeEncoded}')" 
                          class="absolute top-3 right-3 p-2 rounded-md bg-white/10 text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 border border-white/5 z-20 backdrop-blur-sm"
                          title="Copy to clipboard">
                    <span class="icon-copy"><svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg></span>
                    <span class="icon-check hidden text-green-400"><svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg></span>
                  </button>
                </div>
              </div>

              <input type="radio" name="tabs-${uniqueId}" role="tab" class="tab win-tab whitespace-nowrap" aria-label="Windows CMD" />
              <div role="tabpanel" class="tab-content border-t-0 border-x-0 border-b-0 rounded-b-xl">
                <div class="relative group bg-[#0f172a] p-4 min-h-[50px]">
                  <pre class="text-blue-300 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto custom-scrollbar max-w-full whitespace-pre"><code>${winCodeDisplay}</code></pre>
                  
                  <button onclick="copyToClipboard(this, '${winCodeEncoded}')" 
                          class="absolute top-3 right-3 p-2 rounded-md bg-white/10 text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 border border-white/5 z-20 backdrop-blur-sm"
                          title="Copy to clipboard">
                    <span class="icon-copy"><svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg></span>
                    <span class="icon-check hidden text-green-400"><svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg></span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <!DOCTYPE html>
    <html lang="vi" data-theme="light">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>API Docs - FIT HCMUTE</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/daisyui@4.7.2/dist/full.min.css" rel="stylesheet" type="text/css" />
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        body { 
          font-family: 'Inter', sans-serif;
          background-color: #F8FAFC; 
          color: #334155;
        }
        
        .custom-scrollbar::-webkit-scrollbar { height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #64748b; }
        
        .header-bg {
          background: linear-gradient(180deg, #F0F9FF 0%, #E6F4FE 100%);
          border-bottom: 1px solid #D6EAFE;
        }
        
        .tab { 
            height: 2.75rem; 
            font-size: 0.85rem; 
            font-weight: 500;
            border-color: transparent !important;
            --tab-border-color: transparent;
            color: #64748b;
            transition: all 0.2s;
        }
        
        input.bash-tab:checked {
            background-color: #1e293b !important;
            color: #ffffff !important;
            border-radius: 0.5rem 0.5rem 0 0;
        }

        input.win-tab:checked {
            background-color: #0f172a !important;
            color: #ffffff !important;
            border-radius: 0.5rem 0.5rem 0 0;
        }
        
        .copy-btn {
            z-index: 20; 
            cursor: pointer;
        }
      </style>
    </head>
    <body class="min-h-screen pb-20">
      
      <div class="header-bg mb-10">
        <div class="max-w-5xl mx-auto px-4 py-16 text-center">
          <div class="inline-flex items-center justify-center mb-5">
            <div class="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-white">
               <span class="text-2xl font-black text-[#003B70]">FIT</span>
            </div>
          </div>
          <h1 class="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight text-[#003B70] drop-shadow-sm">
            API Documentation
          </h1>
          <p class="text-[#334155] text-lg max-w-2xl mx-auto font-medium opacity-80">
            Hệ thống Backend phục vụ Kỷ niệm 25 năm thành lập Khoa CNTT
          </p>
        </div>
      </div>

      <div class="max-w-5xl mx-auto px-4">
        ${cardsHtml}
      </div>

      <div class="text-center mt-20 pt-8 border-t border-slate-200 text-slate-400 text-sm pb-8">
        <p class="font-medium">© 2024 Faculty of Information Technology - HCMUTE</p>
      </div>

      <script>
        function copyToClipboard(btn, encodedCode) {
          const code = decodeURIComponent(encodedCode);
          
          if (!navigator.clipboard) {
             alert("Trình duyệt không hỗ trợ copy tự động");
             return;
          }

          navigator.clipboard.writeText(code).then(() => {
            const iconCopy = btn.querySelector('.icon-copy');
            const iconCheck = btn.querySelector('.icon-check');
            
            if(iconCopy && iconCheck) {
                iconCopy.classList.add('hidden');
                iconCheck.classList.remove('hidden');
                
                btn.classList.add('bg-green-500/20', 'text-green-400', 'border-green-500/50');
                btn.classList.remove('bg-white/10', 'text-white');
                
                setTimeout(() => {
                  iconCopy.classList.remove('hidden');
                  iconCheck.classList.add('hidden');
                  
                  btn.classList.remove('bg-green-500/20', 'text-green-400', 'border-green-500/50');
                  btn.classList.add('bg-white/10', 'text-white');
                }, 2000);
            }
          }).catch(err => {
            console.error('Failed to copy:', err);
          });
        }
      </script>
    </body>
    </html>
  `;
};
