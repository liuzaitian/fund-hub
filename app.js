/* ══════════════════════════════════════════════════════
   Fund Hub - 基金实时估值查询
   ══════════════════════════════════════════════════════ */

// ── Curated ETF List (支付宝可购买) ──────────────────
const ETF_LIST = [
  // 宽基指数
  { code: '000961', name: '天弘沪深300ETF联接A', sector: '宽基指数' },
  { code: '001051', name: '华夏上证50ETF联接A', sector: '宽基指数' },
  { code: '000962', name: '天弘中证500指数A', sector: '宽基指数' },
  { code: '007856', name: '天弘创业板ETF联接A', sector: '宽基指数' },
  { code: '011612', name: '华夏科创50ETF联接A', sector: '宽基指数' },
  { code: '012768', name: '天弘中证1000指数A', sector: '宽基指数' },
  { code: '001552', name: '天弘中证100指数A', sector: '宽基指数' },
  { code: '005918', name: '天弘中证800ETF联接A', sector: '宽基指数' },

  // 科技
  { code: '012478', name: '天弘中证芯片产业指数A', sector: '科技' },
  { code: '008887', name: '华夏中证半导体芯片ETF联接A', sector: '科技' },
  { code: '011613', name: '天弘中证人工智能主题A', sector: '科技' },
  { code: '007873', name: '广发中证全指通信设备ETF联接A', sector: '科技' },
  { code: '001513', name: '易方达信息产业混合', sector: '科技' },
  { code: '015046', name: '天弘中证云计算与大数据A', sector: '科技' },
  { code: '012479', name: '天弘中证电子ETF联接A', sector: '科技' },

  // 消费
  { code: '110022', name: '易方达消费行业股票', sector: '消费' },
  { code: '001632', name: '天弘中证食品饮料指数A', sector: '消费' },
  { code: '000248', name: '汇添富中证主要消费ETF联接A', sector: '消费' },
  { code: '007380', name: '广发中证全指家电ETF联接A', sector: '消费' },

  // 医药
  { code: '001180', name: '广发医药卫生联接A', sector: '医药' },
  { code: '000059', name: '国联安中证医药100指数A', sector: '医药' },
  { code: '011608', name: '天弘中证医药100A', sector: '医药' },
  { code: '501009', name: '汇添富中证生物科技指数A', sector: '医药' },
  { code: '013403', name: '天弘中证创新药产业A', sector: '医药' },

  // 金融
  { code: '001594', name: '天弘中证银行指数A', sector: '金融' },
  { code: '004069', name: '南方中证银行ETF联接A', sector: '金融' },
  { code: '004070', name: '南方中证全指证券ETF联接A', sector: '金融' },
  { code: '001552', name: '天弘中证保险指数A', sector: '金融' },

  // 新能源
  { code: '007380', name: '广发中证新能源ETF联接A', sector: '新能源' },
  { code: '012480', name: '天弘中证光伏产业指数A', sector: '新能源' },
  { code: '013091', name: '天弘中证新能源汽车指数A', sector: '新能源' },
  { code: '012481', name: '天弘中证锂电池主题A', sector: '新能源' },

  // 军工
  { code: '005693', name: '天弘中证军工龙头ETF联接A', sector: '军工' },
  { code: '012477', name: '天弘中证国防ETF联接A', sector: '军工' },

  // 跨境
  { code: '270042', name: '广发纳斯达克100指数A', sector: '跨境' },
  { code: '050025', name: '博时标普500ETF联接A', sector: '跨境' },
  { code: '000071', name: '华夏恒生ETF联接A', sector: '跨境' },
  { code: '006327', name: '易方达中概互联50联接A', sector: '跨境' },
  { code: '005241', name: '华宝中证全指证券ETF联接A', sector: '跨境' },
  { code: '164906', name: '交银海外中国互联网指数', sector: '跨境' },
  { code: '513520', name: '华夏日经225ETF联接A', sector: '跨境' },

  // 红利
  { code: '012708', name: '天弘中证红利低波动100A', sector: '红利' },
  { code: '008928', name: '华泰柏瑞红利低波ETF联接A', sector: '红利' },
  { code: '501029', name: '华泰柏瑞中证红利ETF联接A', sector: '红利' },

  // 商品
  { code: '002610', name: '博时黄金ETF联接A', sector: '商品' },
  { code: '002611', name: '博时黄金ETF联接C', sector: '商品' },
  { code: '007937', name: '华夏豆粕ETF联接A', sector: '商品' },
];

// Deduplicate by code
const uniqueCodes = new Set();
const FUNDS = ETF_LIST.filter(f => {
  if (uniqueCodes.has(f.code)) return false;
  uniqueCodes.add(f.code);
  return true;
});

const SECTORS = ['全部', ...new Set(FUNDS.map(f => f.sector))];

// ── State ─────────────────────────────────────────────
const state = {
  watchlist: JSON.parse(localStorage.getItem('fund_watchlist') || '[]'),
  fundData: {},          // code -> estimation data
  currentSector: 'all',
  refreshTimer: null,
  searchTimeout: null,
};

// ── JSONP Request Queue ───────────────────────────────
const jsonpQueue = {
  queue: [],
  running: false,

  add(code) {
    return new Promise((resolve, reject) => {
      this.queue.push({ code, resolve, reject });
      this.process();
    });
  },

  async process() {
    if (this.running || this.queue.length === 0) return;
    this.running = true;

    const { code, resolve, reject } = this.queue.shift();

    try {
      const data = await this._fetch(code);
      resolve(data);
    } catch (e) {
      reject(e);
    }

    this.running = false;
    // Small delay between requests
    if (this.queue.length > 0) {
      setTimeout(() => this.process(), 80);
    }
  },

  _fetch(code) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      const timeout = setTimeout(() => {
        cleanup();
        reject(new Error('Timeout'));
      }, 8000);

      function cleanup() {
        clearTimeout(timeout);
        try { document.head.removeChild(script); } catch (e) {}
      }

      window.jsonpgz = (data) => {
        cleanup();
        resolve(data);
      };

      script.onerror = () => {
        cleanup();
        reject(new Error('Load failed'));
      };

      script.src = `https://fundgz.1234567.com.cn/js/${code}.js?rt=${Date.now()}`;
      document.head.appendChild(script);
    });
  },
};

// ── Fund Search API ───────────────────────────────────
let searchCallbackId = 0;

function searchFunds(keyword) {
  return new Promise((resolve, reject) => {
    const cbName = `fundSearch_${++searchCallbackId}`;
    const script = document.createElement('script');
    const timeout = setTimeout(() => {
      cleanup();
      resolve([]);
    }, 5000);

    function cleanup() {
      clearTimeout(timeout);
      delete window[cbName];
      try { document.head.removeChild(script); } catch (e) {}
    }

    window[cbName] = (data) => {
      cleanup();
      const results = (data?.Datas || []).map(d => ({
        code: d.CODE,
        name: d.NAME,
        type: d.FundBaseInfo?.FTYPE || '',
        company: d.FundBaseInfo?.JJGS || '',
        nav: d.FundBaseInfo?.DWJZ,
        navDate: d.FundBaseInfo?.FSRQ,
      }));
      resolve(results);
    };

    script.onerror = () => { cleanup(); resolve([]); };
    script.src = `https://fundsuggest.eastmoney.com/FundSearch/api/FundSearchAPI.ashx?callback=${cbName}&m=1&key=${encodeURIComponent(keyword)}&_=${Date.now()}`;
    document.head.appendChild(script);
  });
}

// ── App ───────────────────────────────────────────────
const App = {
  async init() {
    this.renderSectorTabs();
    this.renderSectorGrid();
    this.renderWatchlist();
    this.updateMarketStatus();
    this.bindEvents();

    // Initial data load
    await this.loadAllData();

    // Auto refresh
    this.startAutoRefresh();

    // Update market status every minute
    setInterval(() => this.updateMarketStatus(), 60000);
  },

  // ── Data Loading ──────────────────────────────────
  async fetchFund(code) {
    try {
      const data = await jsonpQueue.add(code);
      if (data && data.fundcode) {
        state.fundData[data.fundcode] = data;
        return data;
      }
    } catch (e) {
      console.warn(`Failed to fetch ${code}:`, e.message);
    }
    return null;
  },

  async loadAllData() {
    // Load watchlist funds first
    const watchCodes = state.watchlist.filter(c => !state.fundData[c]);
    const sectorCodes = FUNDS.map(f => f.code).filter(c => !state.fundData[c]);
    const allCodes = [...new Set([...watchCodes, ...sectorCodes])];

    let loaded = 0;
    for (const code of allCodes) {
      await this.fetchFund(code);
      loaded++;
      // Update cards progressively
      if (loaded % 5 === 0 || loaded === allCodes.length) {
        this.updateAllCards();
      }
    }
  },

  async refreshWatchlist() {
    for (const code of state.watchlist) {
      await this.fetchFund(code);
    }
    this.updateAllCards();
    document.getElementById('watchlistTime').textContent = `更新于 ${new Date().toLocaleTimeString('zh-CN')}`;
  },

  async refreshAll() {
    const allCodes = [...new Set([...state.watchlist, ...FUNDS.map(f => f.code)])];
    for (const code of allCodes) {
      await this.fetchFund(code);
    }
    this.updateAllCards();
    document.getElementById('watchlistTime').textContent = `更新于 ${new Date().toLocaleTimeString('zh-CN')}`;
  },

  // ── Auto Refresh ──────────────────────────────────
  startAutoRefresh() {
    this.stopAutoRefresh();
    if (!document.getElementById('autoRefresh').checked) return;
    if (!this.isMarketOpen()) return;

    state.refreshTimer = setInterval(() => {
      if (this.isMarketOpen()) {
        this.refreshAll();
      } else {
        this.stopAutoRefresh();
      }
    }, 30000); // 30 seconds
  },

  stopAutoRefresh() {
    if (state.refreshTimer) {
      clearInterval(state.refreshTimer);
      state.refreshTimer = null;
    }
  },

  isMarketOpen() {
    const now = new Date();
    const day = now.getDay();
    if (day === 0 || day === 6) return false; // Weekend

    const h = now.getHours();
    const m = now.getMinutes();
    const time = h * 60 + m;
    // 9:30 - 11:30, 13:00 - 15:00
    return (time >= 570 && time <= 690) || (time >= 780 && time <= 900);
  },

  updateMarketStatus() {
    const el = document.getElementById('marketStatus');
    const open = this.isMarketOpen();
    el.className = `market-status ${open ? 'open' : 'closed'}`;
    el.querySelector('.status-text').textContent = open ? '交易中' : '已休市';

    // Restart auto refresh if market just opened
    if (open && !state.refreshTimer && document.getElementById('autoRefresh').checked) {
      this.startAutoRefresh();
    }
  },

  // ── Events ────────────────────────────────────────
  bindEvents() {
    const input = document.getElementById('searchInput');

    input.addEventListener('input', () => {
      clearTimeout(state.searchTimeout);
      const val = input.value.trim();
      if (!val) {
        document.getElementById('searchResults').classList.add('hidden');
        return;
      }
      state.searchTimeout = setTimeout(() => this.doSearch(val), 300);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        clearTimeout(state.searchTimeout);
        const val = input.value.trim();
        if (val) this.doSearch(val);
      }
      if (e.key === 'Escape') {
        document.getElementById('searchResults').classList.add('hidden');
      }
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-section')) {
        document.getElementById('searchResults').classList.add('hidden');
      }
    });

    // Auto refresh toggle
    document.getElementById('autoRefresh').addEventListener('change', (e) => {
      if (e.target.checked) this.startAutoRefresh();
      else this.stopAutoRefresh();
    });
  },

  // ── Search ────────────────────────────────────────
  async doSearch(keyword) {
    const container = document.getElementById('searchResults');
    container.classList.remove('hidden');
    container.innerHTML = '<div class="search-item"><span class="search-item-name" style="color:var(--text-muted)">搜索中...</span></div>';

    // Local search first
    const localResults = FUNDS.filter(f =>
      f.code.includes(keyword) || f.name.includes(keyword)
    ).slice(0, 5);

    // API search
    let apiResults = [];
    try {
      apiResults = await searchFunds(keyword);
    } catch (e) {}

    // Merge, deduplicate
    const seen = new Set();
    const allResults = [];

    for (const r of localResults) {
      if (!seen.has(r.code)) {
        seen.add(r.code);
        allResults.push({ code: r.code, name: r.name, type: r.sector || '', source: 'local' });
      }
    }

    for (const r of apiResults) {
      if (!seen.has(r.code)) {
        seen.add(r.code);
        allResults.push({ code: r.code, name: r.name, type: r.type, source: 'api' });
      }
    }

    if (allResults.length === 0) {
      container.innerHTML = '<div class="search-item"><span class="search-item-name" style="color:var(--text-muted)">未找到相关基金</span></div>';
      return;
    }

    container.innerHTML = allResults.slice(0, 10).map(r => {
      const isWatched = state.watchlist.includes(r.code);
      return `
        <div class="search-item" data-code="${r.code}">
          <div class="search-item-left">
            <span class="search-item-name">${r.name}</span>
            <span class="search-item-meta">${r.code} · ${r.type}</span>
          </div>
          <div class="search-item-actions">
            <button class="btn-star ${isWatched ? 'active' : ''}"
                    onclick="event.stopPropagation(); App.toggleWatchlist('${r.code}', '${r.name.replace(/'/g, "\\'")}', this)"
                    title="${isWatched ? '取消自选' : '添加自选'}">
              ${isWatched ? '★' : '☆'}
            </button>
            <button class="btn-query" onclick="event.stopPropagation(); App.queryFund('${r.code}')">查询估值</button>
          </div>
        </div>
      `;
    }).join('');
  },

  // ── Query Fund ────────────────────────────────────
  async queryFund(code) {
    document.getElementById('searchResults').classList.add('hidden');

    const data = await this.fetchFund(code);
    if (data) {
      this.showFundModal(data);
      this.updateAllCards();
    } else {
      alert(`无法获取基金 ${code} 的估值数据, 可能是货币基金或代码有误.`);
    }
  },

  // ── Modal ─────────────────────────────────────────
  showFundModal(data) {
    const pct = parseFloat(data.gszzl) || 0;
    const dir = pct > 0 ? 'up' : pct < 0 ? 'down' : '';
    const sign = pct > 0 ? '+' : '';

    document.getElementById('modalHeader').innerHTML = `
      <div class="modal-fund-name">${data.name}</div>
      <div class="modal-fund-code">${data.fundcode}</div>
      <div class="modal-value-row">
        <span class="modal-gsz ${dir}">${parseFloat(data.gsz).toFixed(4)}</span>
        <span class="modal-pct ${dir}">${sign}${pct.toFixed(2)}%</span>
      </div>
    `;

    document.getElementById('modalBody').innerHTML = `
      <div class="modal-info-grid">
        <div class="modal-info-item">
          <div class="modal-info-label">估算净值</div>
          <div class="modal-info-value">${parseFloat(data.gsz).toFixed(4)}</div>
        </div>
        <div class="modal-info-item">
          <div class="modal-info-label">估算涨跌</div>
          <div class="modal-info-value" style="color:var(--${dir || 'flat'})">${sign}${pct.toFixed(2)}%</div>
        </div>
        <div class="modal-info-item">
          <div class="modal-info-label">上一净值</div>
          <div class="modal-info-value">${data.dwjz}</div>
        </div>
        <div class="modal-info-item">
          <div class="modal-info-label">净值日期</div>
          <div class="modal-info-value">${data.jzrq}</div>
        </div>
        <div class="modal-info-item">
          <div class="modal-info-label">估值时间</div>
          <div class="modal-info-value">${data.gztime}</div>
        </div>
        <div class="modal-info-item">
          <div class="modal-info-label">自选</div>
          <div class="modal-info-value">
            <button class="btn-star ${state.watchlist.includes(data.fundcode) ? 'active' : ''}" style="font-size:20px"
                    onclick="App.toggleWatchlist('${data.fundcode}', '${data.name.replace(/'/g, "\\'")}', this)">
              ${state.watchlist.includes(data.fundcode) ? '★' : '☆'}
            </button>
          </div>
        </div>
      </div>
    `;

    // Reset tabs to info
    document.querySelectorAll('.modal-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === 'info'));
    document.getElementById('modalBody').classList.remove('hidden');
    const holdingsEl = document.getElementById('modalHoldings');
    holdingsEl.classList.add('hidden');
    holdingsEl.innerHTML = '<div class="holdings-loading">加载成分股数据...</div>';

    document.getElementById('modalOverlay').classList.remove('hidden');

    // Fetch holdings asynchronously
    this.fetchHoldings(data.fundcode).then(result => {
      if (!result || result.holdings.length === 0) {
        holdingsEl.innerHTML = '<div class="holdings-loading">暂无成分股数据 (货币基金/债券基金可能无持仓信息)</div>';
        return;
      }
      holdingsEl.innerHTML = `
        <table class="holdings-table">
          <thead>
            <tr><th>序号</th><th>股票代码</th><th>股票名称</th><th>占比</th></tr>
          </thead>
          <tbody>
            ${result.holdings.map((h, i) => `
              <tr>
                <td><span class="holdings-rank ${i < 3 ? 'top3' : ''}">${i + 1}</span></td>
                <td><span class="holdings-code">${h.code}</span></td>
                <td><span class="holdings-name">${h.name}</span></td>
                <td><span class="holdings-pct">${h.pct}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        ${result.date ? `<div class="holdings-date">数据来源: ${result.date} 基金季报</div>` : ''}
      `;
    });
  },

  closeModal() {
    document.getElementById('modalOverlay').classList.add('hidden');
  },

  // ── Watchlist ─────────────────────────────────────
  toggleWatchlist(code, name, btn) {
    const idx = state.watchlist.indexOf(code);
    if (idx >= 0) {
      state.watchlist.splice(idx, 1);
      if (btn) { btn.textContent = '☆'; btn.classList.remove('active'); }
    } else {
      state.watchlist.push(code);
      if (btn) { btn.textContent = '★'; btn.classList.add('active'); }
      // Fetch data if not already loaded
      if (!state.fundData[code]) {
        this.fetchFund(code).then(() => this.updateAllCards());
      }
    }

    localStorage.setItem('fund_watchlist', JSON.stringify(state.watchlist));
    this.renderWatchlist();
  },

  renderWatchlist() {
    const grid = document.getElementById('watchlistGrid');
    const section = document.getElementById('watchlistSection');

    if (state.watchlist.length === 0) {
      grid.innerHTML = '<div class="empty-hint">点击搜索结果或卡片中的 ★ 添加自选基金</div>';
      return;
    }

    grid.innerHTML = state.watchlist.map(code => this.renderFundCard(code, true)).join('');
  },

  // ── Sector ────────────────────────────────────────
  renderSectorTabs() {
    const container = document.getElementById('sectorTabs');
    container.innerHTML = SECTORS.map(s => {
      const key = s === '全部' ? 'all' : s;
      return `<button class="sector-tab ${key === 'all' ? 'active' : ''}" data-sector="${key}" onclick="App.switchSector('${key}')">${s}</button>`;
    }).join('');
  },

  switchSector(sector) {
    state.currentSector = sector;
    document.querySelectorAll('.sector-tab').forEach(t => t.classList.toggle('active', t.dataset.sector === sector));
    this.renderSectorGrid();
  },

  renderSectorGrid() {
    const grid = document.getElementById('sectorGrid');
    const filtered = state.currentSector === 'all'
      ? FUNDS
      : FUNDS.filter(f => f.sector === state.currentSector);

    if (filtered.length === 0) {
      grid.innerHTML = '<div class="empty-hint">暂无该板块基金</div>';
      return;
    }

    grid.innerHTML = filtered.map(f => this.renderFundCard(f.code, false)).join('');
  },

  // ── Fund Card ─────────────────────────────────────
  renderFundCard(code, isWatchlist) {
    const data = state.fundData[code];
    const fundInfo = FUNDS.find(f => f.code === code);
    const isWatched = state.watchlist.includes(code);

    if (!data) {
      return `
        <div class="fund-card loading" data-code="${code}" onclick="App.queryFund('${code}')">
          <div class="fund-card-header">
            <div>
              <div class="fund-card-name">${fundInfo?.name || code}</div>
              <div class="fund-card-code">${code}</div>
            </div>
            <button class="fund-card-star ${isWatched ? 'active' : ''}"
                    onclick="event.stopPropagation(); App.toggleWatchlist('${code}', '${(fundInfo?.name || '').replace(/'/g, "\\'")}', this)">
              ${isWatched ? '★' : '☆'}
            </button>
          </div>
          <div class="fund-card-body">
            <div class="fund-card-value">-.----</div>
            <div class="fund-card-change"><div class="fund-card-pct">--.--% </div></div>
          </div>
          <div class="fund-card-footer">
            <span class="fund-card-sector">${fundInfo?.sector || ''}</span>
            <span class="fund-card-time">加载中</span>
          </div>
        </div>
      `;
    }

    const pct = parseFloat(data.gszzl) || 0;
    const dir = pct > 0 ? 'up' : pct < 0 ? 'down' : '';
    const sign = pct > 0 ? '+' : '';
    const gsz = parseFloat(data.gsz).toFixed(4);
    const time = data.gztime ? data.gztime.split(' ')[1] || data.gztime : '';

    return `
      <div class="fund-card ${dir}" data-code="${code}" onclick="App.showFundModal(App.getData('${code}'))">
        <div class="fund-card-header">
          <div>
            <div class="fund-card-name">${data.name}</div>
            <div class="fund-card-code">${data.fundcode}</div>
          </div>
          <button class="fund-card-star ${isWatched ? 'active' : ''}"
                  onclick="event.stopPropagation(); App.toggleWatchlist('${code}', '${data.name.replace(/'/g, "\\'")}', this)">
            ${isWatched ? '★' : '☆'}
          </button>
        </div>
        <div class="fund-card-body">
          <div class="fund-card-value">${gsz}</div>
          <div class="fund-card-change">
            <div class="fund-card-pct">${sign}${pct.toFixed(2)}%</div>
            <div class="fund-card-prev">前值 ${data.dwjz}</div>
          </div>
        </div>
        <div class="fund-card-footer">
          <span class="fund-card-sector">${fundInfo?.sector || ''}</span>
          <span class="fund-card-time">${time}</span>
        </div>
      </div>
    `;
  },

  getData(code) {
    return state.fundData[code];
  },

  updateAllCards() {
    this.renderWatchlist();
    this.renderSectorGrid();
    this.renderSectorOverview();
  },

  // ── Sector Overview (行情总览) ──────────────────────
  renderSectorOverview() {
    const container = document.getElementById('sectorOverview');
    const sectorNames = SECTORS.filter(s => s !== '全部');

    // Calculate average change per sector
    const sectorStats = sectorNames.map(sector => {
      const funds = FUNDS.filter(f => f.sector === sector);
      const withData = funds.filter(f => state.fundData[f.code]);
      if (withData.length === 0) return { sector, avg: 0, count: funds.length, loaded: 0 };

      const sum = withData.reduce((acc, f) => acc + (parseFloat(state.fundData[f.code].gszzl) || 0), 0);
      return { sector, avg: sum / withData.length, count: funds.length, loaded: withData.length };
    });

    // Sort by average change descending
    sectorStats.sort((a, b) => b.avg - a.avg);

    // Find max absolute value for bar scaling
    const maxAbs = Math.max(...sectorStats.map(s => Math.abs(s.avg)), 0.01);

    container.innerHTML = sectorStats.map(s => {
      const dir = s.avg > 0.001 ? 'up' : s.avg < -0.001 ? 'down' : 'flat';
      const sign = s.avg > 0 ? '+' : '';
      const barWidth = Math.abs(s.avg) / maxAbs * 100;

      return `
        <div class="sector-bar-item" onclick="App.switchSector('${s.sector}')">
          <span class="sector-bar-name">${s.sector}</span>
          <div class="sector-bar-track">
            <div class="sector-bar-fill ${dir}" style="width:${barWidth}%"></div>
          </div>
          <span class="sector-bar-pct ${dir}">${sign}${s.avg.toFixed(2)}%</span>
          <span class="sector-bar-count">${s.loaded}/${s.count}</span>
        </div>
      `;
    }).join('');
  },

  // ── Holdings (成分股) ───────────────────────────────
  async fetchHoldings(code) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      const timeout = setTimeout(() => { cleanup(); resolve(null); }, 8000);

      function cleanup() {
        clearTimeout(timeout);
        try { document.head.removeChild(script); } catch (e) {}
      }

      // The API sets window.apidata
      window.apidata = undefined;
      script.onload = () => {
        cleanup();
        try {
          const content = window.apidata?.content;
          if (!content) { resolve(null); return; }
          resolve(App.parseHoldingsHtml(content));
        } catch (e) {
          resolve(null);
        }
      };
      script.onerror = () => { cleanup(); resolve(null); };
      script.src = `https://fundf10.eastmoney.com/FundArchivesDatas.aspx?type=jjcc&code=${code}&topline=10&year=&month=&rt=${Date.now()}`;
      document.head.appendChild(script);
    });
  },

  parseHoldingsHtml(html) {
    const div = document.createElement('div');
    div.innerHTML = html;

    // Find the first table (latest quarter)
    const table = div.querySelector('table');
    if (!table) return null;

    // Get the date from the header
    const dateMatch = html.match(/(\d{4}年第\d季度)/);
    const date = dateMatch ? dateMatch[1] : '';

    const rows = table.querySelectorAll('tbody tr');
    const holdings = [];

    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      if (cells.length >= 5) {
        holdings.push({
          rank: cells[0]?.textContent?.trim() || '',
          code: cells[1]?.textContent?.trim() || '',
          name: cells[2]?.textContent?.trim() || '',
          pct: cells[6]?.textContent?.trim() || cells[4]?.textContent?.trim() || '',
        });
      }
    });

    return { date, holdings };
  },

  // ── Modal Tabs ──────────────────────────────────────
  switchModalTab(tab) {
    document.querySelectorAll('.modal-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
    document.getElementById('modalBody').classList.toggle('hidden', tab !== 'info');
    document.getElementById('modalHoldings').classList.toggle('hidden', tab !== 'holdings');
  },
};

// ── Initialize ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => App.init());
