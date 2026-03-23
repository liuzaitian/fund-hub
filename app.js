/* ══════════════════════════════════════════════════════
   Fund Hub - 基金实时估值查询
   ══════════════════════════════════════════════════════ */

// ── Curated Fund List (完整板块分类) ─────────────────
const ETF_LIST = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  宽基指数
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { code: '000961', name: '天弘沪深300ETF联接A', sector: '沪深300' },
  { code: '110020', name: '易方达沪深300ETF联接A', sector: '沪深300' },

  { code: '007856', name: '天弘创业板ETF联接A', sector: '创业板' },
  { code: '110026', name: '易方达创业板ETF联接A', sector: '创业板' },

  { code: '001051', name: '华夏上证50ETF联接A', sector: '上证50' },
  { code: '110003', name: '易方达上证50指数A', sector: '上证50' },

  { code: '000962', name: '天弘中证500指数A', sector: '中证500' },
  { code: '007028', name: '易方达中证500ETF联接A', sector: '中证500' },

  { code: '014205', name: '华夏中证科创创业50ETF联接A', sector: '双创50' },

  { code: '017519', name: '易方达北证50成份指数A', sector: '北证' },

  { code: '011612', name: '华夏科创50ETF联接A', sector: '科创板' },
  { code: '011609', name: '易方达科创50ETF联接A', sector: '科创板' },

  { code: '005827', name: '易方达蓝筹精选混合', sector: '蓝筹' },
  { code: '519066', name: '汇添富蓝筹稳健混合', sector: '蓝筹' },

  { code: '012768', name: '天弘中证1000指数A', sector: '微盘股' },
  { code: '014045', name: '易方达中证1000ETF联接A', sector: '微盘股' },

  { code: '501047', name: '富国中证1000指数增强A', sector: '小微盘量化' },
  { code: '008112', name: '国金中证1000指数增强A', sector: '小微盘量化' },

  { code: '018992', name: '国金量化精选混合A', sector: '量化' },
  { code: '005994', name: '万家中证1000指数增强A', sector: '量化' },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  半导体/芯片
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { code: '012478', name: '天弘中证芯片产业指数A', sector: '半导体' },
  { code: '008887', name: '华夏中证半导体芯片ETF联接A', sector: '半导体' },

  { code: '007300', name: '国泰CES半导体芯片ETF联接A', sector: '半导体材料设备' },

  { code: '019513', name: '华夏中证存储芯片指数A', sector: '存储芯片' },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  AI / 科技
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { code: '011613', name: '天弘中证人工智能主题A', sector: '人工智能' },
  { code: '001513', name: '易方达信息产业混合', sector: '人工智能' },

  { code: '015046', name: '天弘中证云计算与大数据A', sector: 'AI应用' },
  { code: '014774', name: '广发中证海外中国互联网30ETF联接A', sector: 'AI应用' },

  { code: '015046', name: '天弘中证云计算与大数据A', sector: '云计算' },

  { code: '012479', name: '天弘中证电子ETF联接A', sector: '消费电子' },

  { code: '007873', name: '广发中证全指通信设备ETF联接A', sector: '通信' },

  { code: '161631', name: '融通中证人工智能主题A', sector: '大科技' },
  { code: '161033', name: '富国中证科技50策略ETF联接A', sector: '大科技' },

  { code: '018690', name: '天弘中证机器人指数A', sector: '机器人' },
  { code: '015316', name: '华夏中证机器人ETF联接A', sector: '机器人' },

  { code: '013530', name: '华宝中证金融科技ETF联接A', sector: '金融科技' },

  { code: '020682', name: '招商中证脑机接口主题A', sector: '脑机接口' },

  { code: '010737', name: '天弘中证传媒ETF联接A', sector: '传媒游戏' },
  { code: '004752', name: '广发中证传媒ETF联接A', sector: '传媒游戏' },

  { code: '008702', name: '广发中证低空经济主题A', sector: '低空经济' },
  { code: '021039', name: '天弘中证低空经济指数A', sector: '低空经济' },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  新能源 / 电力
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { code: '010150', name: '华夏中证新能源ETF联接A', sector: '新能源' },
  { code: '012481', name: '天弘中证锂电池主题A', sector: '新能源' },

  { code: '012480', name: '天弘中证光伏产业指数A', sector: '光伏' },

  { code: '017069', name: '国泰中证储能产业ETF联接A', sector: '储能' },

  { code: '018578', name: '天弘中证固态电池主题A', sector: '固态电池' },

  { code: '013279', name: '招商中证电力指数A', sector: '电力' },
  { code: '017935', name: '天弘中证电力指数A', sector: '电力' },

  { code: '017475', name: '天弘中证智能电网指数A', sector: '电网设备' },

  { code: '020930', name: '天弘中证可控核聚变指数A', sector: '可控核聚变' },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  汽车 / 制造
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { code: '013091', name: '天弘中证新能源汽车指数A', sector: '汽车整车' },
  { code: '018655', name: '华夏中证汽车零部件主题ETF联接A', sector: '汽车整车' },

  { code: '008763', name: '广发中证先进制造ETF联接A', sector: '先进制造' },

  { code: '005693', name: '天弘中证军工龙头ETF联接A', sector: '军工' },
  { code: '012477', name: '天弘中证国防ETF联接A', sector: '军工' },

  { code: '017826', name: '天弘中证商业航天主题A', sector: '商业航天' },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  消费
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { code: '161725', name: '招商中证白酒指数A', sector: '白酒' },
  { code: '012414', name: '天弘中证白酒指数A', sector: '白酒' },

  { code: '001632', name: '天弘中证食品饮料指数A', sector: '食品饮料' },
  { code: '000248', name: '汇添富中证主要消费ETF联接A', sector: '食品饮料' },

  { code: '110022', name: '易方达消费行业股票', sector: '消费' },
  { code: '012863', name: '天弘中证内地消费主题A', sector: '消费' },

  { code: '006479', name: '广发沪港深消费主题混合A', sector: '沪港深消费' },

  { code: '007380', name: '广发中证全指家电ETF联接A', sector: '家用电器' },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  医药 / 健康
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { code: '001180', name: '广发医药卫生联接A', sector: '医药' },
  { code: '011608', name: '天弘中证医药100A', sector: '医药' },

  { code: '013403', name: '天弘中证创新药产业A', sector: '创新药' },
  { code: '501009', name: '汇添富中证生物科技指数A', sector: '创新药' },

  { code: '006768', name: '华宝海外医疗指数A', sector: '海外医药' },

  { code: '000059', name: '国联安中证医药100指数A', sector: '医疗' },
  { code: '162412', name: '华宝中证医疗ETF联接A', sector: '医疗' },

  { code: '000968', name: '广发养老指数A', sector: '养老产业' },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  金融
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { code: '001594', name: '天弘中证银行指数A', sector: '银行' },
  { code: '004069', name: '南方中证银行ETF联接A', sector: '银行' },

  { code: '004070', name: '南方中证全指证券ETF联接A', sector: '证券保险' },
  { code: '005241', name: '华宝中证全指证券ETF联接A', sector: '证券保险' },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  资源 / 周期
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { code: '161726', name: '招商中证煤炭等权指数A', sector: '煤炭' },
  { code: '015689', name: '国泰中证煤炭ETF联接A', sector: '煤炭' },

  { code: '012481', name: '天弘中证锂电池主题A', sector: '锂矿' },

  { code: '162411', name: '华宝油气LOF', sector: '油气资源' },

  { code: '018227', name: '华夏中证稀土产业ETF联接A', sector: '稀土永磁' },

  { code: '008282', name: '天弘中证化工ETF联接A', sector: '化工' },

  { code: '008279', name: '天弘中证钢铁指数A', sector: '钢铁' },

  { code: '014832', name: '天弘中证有色金属指数A', sector: '有色金属' },
  { code: '161028', name: '富国中证有色金属指数A', sector: '有色金属' },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  策略 / 红利
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { code: '501029', name: '华泰柏瑞中证红利ETF联接A', sector: '红利' },
  { code: '012708', name: '天弘中证红利低波动100A', sector: '红利' },

  { code: '008928', name: '华泰柏瑞红利低波ETF联接A', sector: '红利低波' },

  { code: '019260', name: '天弘港股红利低波ETF联接A', sector: '港股红利' },

  { code: '019857', name: '国泰中证自由现金流ETF联接A', sector: '现金流' },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  跨境
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { code: '050025', name: '博时标普500ETF联接A', sector: '标普' },
  { code: '270042', name: '广发纳斯达克100指数A', sector: '标普' },

  { code: '000071', name: '华夏恒生ETF联接A', sector: '恒生' },

  { code: '012348', name: '华夏恒生科技ETF联接A', sector: '恒生科技' },
  { code: '013171', name: '天弘恒生科技指数A', sector: '恒生科技' },

  { code: '006327', name: '易方达中概互联50联接A', sector: '亚太' },
  { code: '164906', name: '交银海外中国互联网指数', sector: '亚太' },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  固收 / 债基
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { code: '110027', name: '易方达纯债债券A', sector: '债基' },
  { code: '000171', name: '易方达裕丰回报债券A', sector: '债基' },

  { code: '006030', name: '南方希元可转债A', sector: '可转债' },
  { code: '003816', name: '中欧可转债债券A', sector: '可转债' },

  { code: '000198', name: '天弘增利宝货币', sector: '货币基金' },

  { code: '110017', name: '易方达增强回报债券A', sector: '混债' },
  { code: '080003', name: '长盛积极配置债券A', sector: '混债' },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  地产 / 基建 / 其他
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { code: '008088', name: '天弘中证房地产指数A', sector: '房地产' },
  { code: '160218', name: '国泰国证房地产指数', sector: '房地产' },

  { code: '160516', name: '博时中证基建指数A', sector: '基建' },

  { code: '008957', name: '天弘中证交通运输指数A', sector: '交通运输' },

  { code: '001579', name: '国泰国证农业指数A', sector: '农林牧渔' },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  黄金 / 商品
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { code: '002610', name: '博时黄金ETF联接A', sector: '黄金' },
  { code: '000217', name: '华安黄金易ETF联接A', sector: '黄金' },

  { code: '005063', name: '华夏黄金股ETF联接A', sector: '黄金股' },
];

// Deduplicate by code
const uniqueCodes = new Set();
const FUNDS = ETF_LIST.filter(f => {
  if (uniqueCodes.has(f.code)) return false;
  uniqueCodes.add(f.code);
  return true;
});

const SECTORS = ['全部', ...new Set(FUNDS.map(f => f.sector))];

// Sector grouping for tab navigation
const SECTOR_GROUPS = [
  { label: '全部', sectors: null },
  { label: '宽基指数', sectors: ['沪深300', '上证50', '中证500', '创业板', '双创50', '北证', '科创板', '蓝筹', '微盘股', '小微盘量化', '量化'] },
  { label: '半导体/芯片', sectors: ['半导体', '半导体材料设备', '存储芯片'] },
  { label: 'AI/科技', sectors: ['人工智能', 'AI应用', '云计算', '大科技', '机器人', '金融科技', '脑机接口', '消费电子', '通信', '传媒游戏', '低空经济'] },
  { label: '新能源/电力', sectors: ['新能源', '光伏', '储能', '固态电池', '电力', '电网设备', '可控核聚变'] },
  { label: '智造/军工', sectors: ['汽车整车', '先进制造', '军工', '商业航天'] },
  { label: '消费', sectors: ['白酒', '食品饮料', '消费', '沪港深消费', '家用电器'] },
  { label: '医药健康', sectors: ['医药', '创新药', '海外医药', '医疗', '养老产业'] },
  { label: '金融', sectors: ['银行', '证券保险'] },
  { label: '资源/周期', sectors: ['煤炭', '锂矿', '油气资源', '稀土永磁', '化工', '钢铁', '有色金属'] },
  { label: '红利/策略', sectors: ['红利', '红利低波', '港股红利', '现金流'] },
  { label: '跨境', sectors: ['标普', '恒生', '恒生科技', '亚太'] },
  { label: '固收', sectors: ['债基', '可转债', '货币基金', '混债'] },
  { label: '地产/其他', sectors: ['房地产', '基建', '交通运输', '农林牧渔'] },
  { label: '黄金', sectors: ['黄金', '黄金股'] },
];

// ── Precious Metals (贵金属实时行情) ─────────────────
const METALS = [
  { secid: '101.XAU_USD', name: '现货黄金', icon: '🥇', type: 'gold', unit: '美元/盎司', decimals: 2 },
  { secid: '101.XAG_USD', name: '现货白银', icon: '🥈', type: 'silver', unit: '美元/盎司', decimals: 3 },
  { secid: '118.AU9999', name: '黄金AU9999', icon: '🏅', type: 'gold', unit: '元/克', decimals: 2 },
  { secid: '118.AG9999', name: '白银AG9999', icon: '⚪', type: 'silver', unit: '元/千克', decimals: 0 },
];

let metalCallbackId = 0;

function fetchMetalPrice(secid) {
  return new Promise((resolve) => {
    const cbName = `metalCb_${++metalCallbackId}`;
    const script = document.createElement('script');
    const timeout = setTimeout(() => { cleanup(); resolve(null); }, 8000);

    function cleanup() {
      clearTimeout(timeout);
      delete window[cbName];
      try { document.head.removeChild(script); } catch (e) {}
    }

    window[cbName] = (data) => {
      cleanup();
      if (data && data.data) {
        resolve(data.data);
      } else {
        resolve(null);
      }
    };

    script.onerror = () => { cleanup(); resolve(null); };
    script.src = `https://push2.eastmoney.com/api/qt/stock/get?cb=${cbName}&fltt=2&invt=2&secid=${secid}&fields=f43,f44,f45,f46,f57,f58,f169,f170,f171&_=${Date.now()}`;
    document.head.appendChild(script);
  });
}

// ── State ─────────────────────────────────────────────
const state = {
  watchlist: JSON.parse(localStorage.getItem('fund_watchlist') || '[]'),
  fundData: {},          // code -> estimation data
  metalData: {},         // secid -> metal price data
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
    this.renderMetalCards();
    this.updateMarketStatus();
    this.bindEvents();

    // Load metal prices first (fast, only 4 requests)
    await this.loadMetalPrices();

    // Initial data load
    await this.loadAllData();

    // Auto refresh
    this.startAutoRefresh();

    // Metal prices refresh every 10s (markets trade nearly 24h)
    this.startMetalAutoRefresh();

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
    container.innerHTML = SECTOR_GROUPS.map(g => {
      const key = g.sectors === null ? 'all' : g.label;
      return `<button class="sector-tab ${key === 'all' ? 'active' : ''}" data-sector="${key}" onclick="App.switchSector('${key}')">${g.label}</button>`;
    }).join('');
  },

  switchSector(sector) {
    state.currentSector = sector;
    document.querySelectorAll('.sector-tab').forEach(t => t.classList.toggle('active', t.dataset.sector === sector));
    this.renderSectorGrid();
  },

  getSectorFunds(sector) {
    if (sector === 'all') return FUNDS;
    // Check if it's a group label
    const group = SECTOR_GROUPS.find(g => g.label === sector);
    if (group && group.sectors) {
      return FUNDS.filter(f => group.sectors.includes(f.sector));
    }
    // Direct sector match (from overview click)
    return FUNDS.filter(f => f.sector === sector);
  },

  renderSectorGrid() {
    const grid = document.getElementById('sectorGrid');
    const filtered = this.getSectorFunds(state.currentSector);

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
      if (withData.length === 0) return { sector, avg: null, count: funds.length, loaded: 0 };

      const sum = withData.reduce((acc, f) => acc + (parseFloat(state.fundData[f.code].gszzl) || 0), 0);
      return { sector, avg: sum / withData.length, count: funds.length, loaded: withData.length };
    }).filter(s => s.avg !== null);

    // Sort by average change descending
    sectorStats.sort((a, b) => b.avg - a.avg);

    // Find max absolute value for bar scaling
    const maxAbs = Math.max(...sectorStats.map(s => Math.abs(s.avg)), 0.01);

    container.innerHTML = sectorStats.map(s => {
      const dir = s.avg > 0.001 ? 'up' : s.avg < -0.001 ? 'down' : 'flat';
      const sign = s.avg > 0 ? '+' : '';
      const barWidth = Math.abs(s.avg) / maxAbs * 100;

      return `
        <div class="sector-bar-item" onclick="App.jumpToSector('${s.sector}')">
          <span class="sector-bar-name">${s.sector}</span>
          <div class="sector-bar-track">
            <div class="sector-bar-fill ${dir}" style="width:${barWidth}%"></div>
          </div>
          <span class="sector-bar-pct ${dir}">${sign}${s.avg.toFixed(2)}%</span>
          <span class="sector-bar-count">${s.count}只</span>
        </div>
      `;
    }).join('');
  },

  jumpToSector(sector) {
    // Find which group this sector belongs to and activate that tab
    const group = SECTOR_GROUPS.find(g => g.sectors && g.sectors.includes(sector));
    if (group) {
      state.currentSector = group.label;
      document.querySelectorAll('.sector-tab').forEach(t => t.classList.toggle('active', t.dataset.sector === group.label));
    } else {
      state.currentSector = sector;
    }
    this.renderSectorGrid();
    // Scroll to the sector grid
    document.getElementById('sectorGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  // ── Metal Prices (贵金属行情) ────────────────────────
  async loadMetalPrices() {
    for (const metal of METALS) {
      const data = await fetchMetalPrice(metal.secid);
      if (data) {
        state.metalData[metal.secid] = data;
      }
    }
    this.renderMetalCards();
    document.getElementById('metalTime').textContent = `更新于 ${new Date().toLocaleTimeString('zh-CN')}`;
  },

  async refreshMetals() {
    await this.loadMetalPrices();
  },

  startMetalAutoRefresh() {
    // Precious metals trade nearly 24h on weekdays, refresh every 15s
    setInterval(() => {
      const day = new Date().getDay();
      if (day === 0 || day === 6) return; // Skip weekends
      if (!document.getElementById('autoRefresh').checked) return;
      this.loadMetalPrices();
    }, 15000);
  },

  renderMetalCards() {
    const grid = document.getElementById('metalGrid');

    grid.innerHTML = METALS.map(metal => {
      const data = state.metalData[metal.secid];

      if (!data || data.f43 === '-') {
        return `
          <div class="metal-card loading">
            <div class="metal-card-header">
              <span class="metal-card-name">
                <span class="metal-card-icon ${metal.type}">${metal.icon}</span>
                ${metal.name}
              </span>
              <span class="metal-card-unit">${metal.unit}</span>
            </div>
            <div class="metal-card-body">
              <div class="metal-card-price">--.--</div>
              <div class="metal-card-change"><div class="metal-card-pct">--.--% </div></div>
            </div>
            <div class="metal-card-footer">
              <div class="metal-card-stat"><div class="metal-card-stat-label">今开</div><div class="metal-card-stat-value">--</div></div>
              <div class="metal-card-stat"><div class="metal-card-stat-label">最高</div><div class="metal-card-stat-value">--</div></div>
              <div class="metal-card-stat"><div class="metal-card-stat-label">最低</div><div class="metal-card-stat-value">--</div></div>
            </div>
          </div>
        `;
      }

      const price = data.f43;   // 最新价
      const high = data.f44;    // 最高
      const low = data.f45;     // 最低
      const open = data.f46;    // 今开
      const change = data.f169; // 涨跌额
      const pctVal = data.f170; // 涨跌幅
      const prevClose = data.f171; // 昨收

      const dir = pctVal > 0 ? 'up' : pctVal < 0 ? 'down' : '';
      const sign = pctVal > 0 ? '+' : '';
      const d = metal.decimals;

      const fmt = (v) => v != null && v !== '-' ? Number(v).toFixed(d) : '--';

      return `
        <div class="metal-card ${dir}">
          <div class="metal-card-header">
            <span class="metal-card-name">
              <span class="metal-card-icon ${metal.type}">${metal.icon}</span>
              ${metal.name}
            </span>
            <span class="metal-card-unit">${metal.unit}</span>
          </div>
          <div class="metal-card-body">
            <div class="metal-card-price">${fmt(price)}</div>
            <div class="metal-card-change">
              <div class="metal-card-pct">${sign}${Number(pctVal).toFixed(2)}%</div>
              <div class="metal-card-diff">${sign}${fmt(change)}</div>
            </div>
          </div>
          <div class="metal-card-footer">
            <div class="metal-card-stat">
              <div class="metal-card-stat-label">今开</div>
              <div class="metal-card-stat-value">${fmt(open)}</div>
            </div>
            <div class="metal-card-stat">
              <div class="metal-card-stat-label">最高</div>
              <div class="metal-card-stat-value">${fmt(high)}</div>
            </div>
            <div class="metal-card-stat">
              <div class="metal-card-stat-label">最低</div>
              <div class="metal-card-stat-value">${fmt(low)}</div>
            </div>
          </div>
        </div>
      `;
    }).join('');
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
