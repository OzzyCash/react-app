import Monent from "./moment/moment";

/**
 * interface:
 *    title
 *    oneOf
 *    setCurrentPath
 *    getRoutes          -> 取得指定路径的层级数组
 *    toRouteList
 *    getSession         -> 获取session值
 *    setSession         -> 设置session值
 *    date2str           -> 设置日期格式为 YYYY-MM-DD
 *    dateTime2str       -> 设置日期格式为 YYYY-MM-DD HH:mm:ss
 *    dateFormat         -> 自定义日期格式并进行格式化
 *    transform2Date     -> varchar8和YYYY-MM-DD格式日期转换为 标准日期格式
 *    openNewPage
 *    validateFields     -> 校验多个表单字段
 *    autoHeight         -> 计算页面不出现垂直滚动条时，el（元素）可用最大高度，结果返回给callback函数
 *    isObjEmpty         -> 判断对象是否为空
 *    getType            -> 获取数据类型
 *    deepCopy           -> 深拷贝对象
 *    objEqual           -> 判断两个对象是否相等
 *    formatTime         -> 日期格式化为 yyyy-MM-dd
 *    sortMenu           -> 菜单排序
 *    configTableCol     -> 配置补充表头
 *    configCell         -> 配置单元格
 *    numFormat          -> 配置千分位分隔符
 *    forceGetData       -> 强硬获取数据，确保一定能获取到
 *    getParentEle       -> 获取元素指定父盒子
 *    testBrowser        -> 判断浏览器类型
 *    debounce           -> 函数防抖
 *    throttle           -> 函数节流
 *    download           -> 下载文件
 *    install
 *    resetTableColWidth -> 设置表格宽度，自适应数据宽度
 */

let util = {};
util.title = function(title) {
  title = title ? title : "";
  window.document.title = title;
};

util.oneOf = function(ele, targetArr) {
  if (targetArr.indexOf(ele) >= 0) {
    return true;
  } else {
    return false;
  }
};

util.setCurrentPath = function(vm, to) {
  if (!to) return;
  // let routeLine = util.getRoutes(vm.$router.options.routes, to.path);
  vm.$store.commit("setCurrentPath", to.path);
};

/**
 * 取得指定路径的层级数组
 */
util.getRoutes = function(routesList, path) {
  for (let i in routesList) {
    let route = routesList[i];
    if (route.path === path) {
      return [route];
    } else if (route.children && route.children.length > 0) {
      let tmps = util.getRoutes(route.children, path);
      if (tmps.length > 0) {
        return [
          route.component
            ? route
            : {
                meta: route.meta
              },
          ...tmps
        ];
      }
    }
  }
  return [];
};
util.toRouteList = function(routesList) {
  let tmpRoutes = [];
  for (let i in routesList) {
    let route = routesList[i];
    // 除非显式设置成false，否则默认为true, 从标签页打开页面
    route.meta.useTags = route.meta.useTags !== false;
    if (route.children && route.children.length > 0) {
      let tmps = util.toRouteList(route.children);
      if (tmps.length > 0) {
        tmpRoutes = [...tmpRoutes, ...tmps];
      }
    }
    tmpRoutes = [...tmpRoutes, route];
  }
  return tmpRoutes;
};

util.getSession = function(key) {
  return JSON.parse(sessionStorage.getItem(key));
};

util.setSession = function(key, val) {
  sessionStorage.setItem(key, JSON.stringify(val));
};

util.date2str = function(date) {
  return Monent(date).format("YYYY-MM-DD");
};
util.dateTime2str = function(date) {
  return Monent(date).format("YYYY-MM-DD HH:mm:ss");
};
util.dateFormat = function(date, format) {
  format = format || "YYYY-MM-DD";
  return Monent(date).format(format);
};
/**
 * 转换 系统中常用日期类型 为 varchar8 类型
 * @param {*} date [系统中用到的类型 varchar8 string date]
 * @return {[String]} [varchar8 类型日期 或为空字符串]
 */
util.date2Varchar = function(date) {
  if (!date || date == "") {
    return "";
  }
  if (util.getType(date) == "string") {
    if (date.length == 8) {
      return date;
    } else if (date.length == 10) {
      return util.dateFormat(
        util.transform2Date(date, "datestring"),
        "YYYYMMDD"
      );
    } else {
      return "";
    }
  }
  if (util.getType(date) == "date") {
    return util.dateFormat(date, "YYYYMMDD");
  }
  return "";
};

/**
 *
 * @param {日期值} val
 * @param {当前日期值格式} type
 */
util.transform2Date = function(val = "", type) {
  if (arguments.length != 2) {
    throw "utils 方法 transform2Date 需传递两个参数！";
  }
  if (type == "datestring") {
    return new Date(
      parseInt(val.slice(0, 4)),
      parseInt(val.slice(5, 7)) - 1,
      parseInt(val.slice(8, 10))
    );
  } else if (type == "varchar8") {
    return new Date(
      parseInt(val.slice(0, 4)),
      parseInt(val.slice(4, 6)) - 1,
      parseInt(val.slice(6, 8))
    );
  }
  throw "日期类型参数传递有误！[datestring, varchar8]";
};

util.openNewPage = function(vm, to) {
  if (!to) return;
  let path = to.path;
  let pageOpenedList = vm.$store.state.tabsPageStore.pageOpenedList;
  let openedPageLen = pageOpenedList.length;
  let tagHasOpened = false;
  let to2 = Object.assign({}, to);
  to2.meta = Object.assign({}, to2.meta);
  delete to2.matched;
  to2.index = 0;
  while (to2.index < openedPageLen) {
    if (path === pageOpenedList[to2.index].path) {
      // 页面已经打开
      vm.$store.commit("pageOpenedList", to2);
      tagHasOpened = true;
      break;
    }
    to2.index++;
  }
  if (tagHasOpened === false && to.meta.useTags === true) {
    // 获取组件名
    to.meta.name = to.matched[0].components.default.name;
    vm.$store.commit("increateTag", to2);
  }
  vm.$store.commit("setCurrentPagePath", path);
};

// 校验多个表单字段
util.validateFields = function(form, callback, ...fields) {
  if (fields.length == 0) {
    callback(true);
  } else {
    form.validateField(fields[0], msg => {
      if (msg) {
        callback(false);
      } else {
        util.validateFields(form, callback, ...fields.slice(1, fields.length));
      }
    });
  }
};

// 计算页面不出现垂直滚动条时，el（元素）可用最大高度，结果返回给callback函数
util.autoHeight = function(vm, el, callback) {
  // el需作为参数传进来，不能直接从里面取到上面的el
  let setHeight = function(el) {
    vm.$nextTick(function() {
      setTimeout(function() {
        let height = window.innerHeight;
        while (el) {
          height -= el.offsetTop;
          el = el.offsetParent;
        }
        if (height < 350) height = 350;
        callback(height);
      }, 200);
    });
  };
  setHeight(el);
  // 通过标签页通信机制确保所有标签页都能收到事件，触发事件代码在app.vue
  vm.$store.commit("registerInbox", {
    component: vm,
    callback: msg => {
      if (msg == "window_resize") {
        setHeight(el);
      }
    }
  });
};

util.isObjEmpty = function(obj) {
  if (Object.getOwnPropertyNames) {
    return Object.getOwnPropertyNames(obj).length === 0;
  } else {
    var k;
    for (k in obj) {
      if (obj.hasOwnProperty(k)) {
        return false;
      }
    }
    return true;
  }
};

/**
 * 获取数据类型
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
util.getType = function(data) {
  var type = Object.prototype.toString.call(data);
  type = type.slice(8, type.length - 1);
  type = type[0].toLocaleLowerCase() + type.slice(1);
  return type;
};

// 深拷贝
util.deepCopy = function(data) {
  var type = util.getType(data);
  var obj;
  if (type === "array") {
    obj = [];
  } else if (type === "object") {
    obj = {};
  } else {
    //不再具有下一层次
    return data;
  }
  if (type === "array") {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(util.deepCopy(data[i]));
    }
  } else if (type === "object") {
    for (var key in data) {
      obj[key] = util.deepCopy(data[key]);
    }
  }
  return obj;
};

// 比较两个对象是否相等
util.objEqual = function(obj1, obj2) {
  if (util.getType(obj1) === "object" && util.getType(obj2) === "object") {
    let o1 = Object.keys(obj1),
      o2 = Object.keys(obj2);
    for (let i = 0, len = o1.length; i < len; i++) {
      if (o2.indexOf(o1[i]) < 0) {
        return false;
      } else {
        if (!objEqual(obj1[o1[i]], obj2[o1[i]])) {
          return false;
        }
      }
    }
  } else if (util.getType(obj1) === "array" && util.getType(obj2) === "array") {
    if (obj1.length != obj2.length) return false;
    for (let i = 0, len = obj1.length; i < len; i++) {
      if (obj2.indexOf(obj1[i]) < 0) {
        return false;
      }
    }
  } else {
    if (obj1 !== obj2) {
      return false;
    }
  }
  return true;
};

util.sortMenu = function(menuList) {
  // 菜单排序
  menuList.sort((a, b) => {
    return parseInt(a.order) - parseInt(b.order);
  });
  for (let i = 0, len = menuList.length; i < len; i++) {
    let item = menuList[i];
    if (!item.submenu) continue;
    item.submenu.sort((a, b) => {
      return parseInt(a.order) - parseInt(b.order);
    });
  }
};

/**
 * 设置配置
 * @param {列配置} columns 
 * @param {表格数据} data 
 * @param {表格宽度} tableW 
 * @returns 
 */

util.setColumns = (columns, data, tableW) => {
  const col = JSON.parse(JSON.stringify(columns))
  let averageW = 0
  let noChildren = false
  if (tableW) {
    noChildren = col.findIndex(item => !!item.children) === -1
    if (noChildren) averageW = util.setColumnsWidth(columns, tableW)
  }
  col.forEach((item, index) => {
    item.render = columns[index].render || undefined
    if ((!item.fixed && !item.type) && tableW && !item.children) {
      item.resizable = tableW ? true : false
      const w = item.width || item.minWidth || 0
      item.width = noChildren ? (w > averageW ? w : averageW) : util.setChildrenColumnsWidth(data, item)
    }
    if (!tableW && !item.children) {
      item.minWidth = util.setChildrenColumnsWidth(data, item)
      item.maxWidth = 300
      item.width = undefined
    }
    if (item.children) {
      item.children = util.setColumns(item.children, data)
    }
  })
  return col
}

util.setColumnsWidth = (columns, tableW) => {
  let moveSum = 0
  const fixedW = columns.reduce((total, item) => {
    if (!item.fixed && !item.type) moveSum += 1
    return total + (item.fixed || item.type ? item.width || item.minWidth || 0 : 0)
  }, 0)
  const moveW = tableW - fixedW
  return moveW / moveSum
}

util.setChildrenColumnsWidth = (list, { key, title }) => {
  const span = document.createElement('span')
  span.innerHTML = list.reduce((total, item) => {
    const text = item[key] || ''
    return total.length > text.length ? total : text
  }, title)
  span.style.height = 0
  document.body.appendChild(span)
  const w = span.offsetWidth + (span.innerHTML === title ? 40 : 0)
  document.body.removeChild(span)
  return w
}

/**
 * 配置表头，自动填充 align、 minWidth 配置
 * @param  {[Array]} colObj [需初始化配置的表头配置列表]
 * @param  {[Object]} config [需要共同配置的配置项]
 * @return {[type]}        [description]
 */
util.configTableCol = (colArr, tableW) => {
  for (let i = 0, len = colArr.length; i < len; i++) {
    // 排除勾选列和其他默认操作列
    if (!colArr[i].type) {
      // colArr[i].minWidth = colArr[i].minWidth || 200;
      let containChinese = /.*[\u4e00-\u9fa5]+.*$/.test(colArr[i].title);
      colArr[i].minWidth =
        colArr[i].minWidth ||
        (containChinese
          ? 50 + colArr[i].title.length * 14
          : 8 + colArr[i].title.length * 10);
    }
    // 展示浮窗气泡时，默认带上单元格内容超出省略
    // 或设置单元格内容超出省略时，展示浮窗气泡
    if (colArr.tooltip) {
      colArr.ellipsis = true;
    } else if (colArr.ellipsis) {
      colArr.tooltip = true;
    }

    // 设置对齐格式 默认居中
    colArr[i].align = colArr[i].align || "center";
    if (colArr[i].children) {
      util.configTableCol(colArr[i].children);
    }
  }
  return colArr;
};

/**
 * 数组去重
 * @param {[Array]} arr [需要去重的数组]
 * @returns {[Array]} [description]
 */
util.dedup = arr => {
  var tmp = {},res = [];
  for (var i = 0, j = arr.length; i < j; i++) {
    if (!tmp[arr[i]]) {
      tmp[arr[i]] = 1;
      res.push(arr[i]);
    }
  }
  return res;
},

/**
 * 在配置报表时，需要使用自定义悬浮提示时，
 * @param {*} index
 * @return {*}
 */
util.configCell = cell => {
  return (h, params) => {
    return h(
      "div",
      {
        style: {
          padding: "0 5px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }
      },
      [h("span", { class: "txt" }, params.row[cell] || "")]
    );
  };
};

/**
 * 将传入数值转换为千分位，并补齐两位小数
 * @param {*} num
 * @param {*} ifDecimal [是否 保留/补齐 两位小数点]
 * @return {*}
 */
util.numFormat = (num, ifDecimal = false) => {
  let _num = +num;
  let res = _num.toString().replace(/\d+/, function(n) {
    // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function($1) {
      return $1 + ",";
    });
  });

  if (ifDecimal) {
    // 小数点补零
    let splitNum = res.split(".");
    //
    if (splitNum.length == 1) {
      res += ".00";
    } else if (splitNum.length == 2) {
      let endNum = 2 - splitNum[1].length;
      endNum = endNum == 2 ? "00" : endNum == 1 ? "0" : "";
      res += endNum;
    }
  }
  return res;
};

/**
 * 在异步获取数据中，经常出现其他组件需要获取请求数据的情况，但不可能所有的获取数据方法都能写在请求回来的回调中，故使用定时器来强制获取
 * @param  {[VueComponent]} ele [实例对象]
 * @param  {[Array]} arr [需要获取数据的 所有 变量名]
 * @return {[type]}     [description]
 */
util.forceGetData = (ele, arr) => {
  return new Promise((resolve, reject) => {
    let _this = ele;
    let clock = setInterval(() => {
      try {
        // if (
        //   _this.$refs[arr[0]][arr[1]] != "" ||
        //   _this.$refs[arr[0]][arr[1]].length > 0
        // ) {
        clearInterval(clock);
        resolve(_this.$refs[arr[0]][arr[1]]);
        // }
      } catch (e) {
        clearInterval(clock);
        reject(e);
      }
    }, 100);
  });
};

/**
 * 获取元素指定父盒子
 * @param  {[MouseEvent]} ele       [行为对象]
 * @param  {[String]} className [类名]
 * @return {[Element]}           [父盒子对象]
 */
util.getParentEle = (ele, className) => {
  let result;
  if (ele instanceof MouseEvent) {
    // 兼容火狐浏览器
    let browserMess = navigator.userAgent;
    if (browserMess.includes("Chrome")) {
      let parents = ele.path;
      for (let i = 0, len = parents.length; i < len; i++) {
        let item = parents[i];
        if (item.classList.contains(className)) {
          result = item;
          break;
        }
      }
    } else if (
      browserMess.includes("MSIE") ||
      browserMess.includes("Windows NT")
    ) {
      let targetEle = ele.currentTarget;
      for (let i = 0, len = 4; i < len; i++) {
        targetEle = targetEle.parentElement;
        if (targetEle.classList.contains(className)) {
          result = targetEle;
          break;
        }
      }
    } else {
      // 兼容火狐浏览器
      let targetEle = ele.target;
      for (let i = 0, len = 4; i < len; i++) {
        targetEle = targetEle.parentElement;
        if (targetEle.classList.contains(className)) {
          result = targetEle;
          break;
        }
      }
    }
  } else {
    return;
  }
  return result;
};

/**
 * 根据className获取父盒子
 * @param {[Node]} e [当前目标元素]
 * @param {[String]} className [父盒子类名]
 * @return {[Node]} [父盒子]
 */
util.parent = (e, className) => {
  let currentEle = e.parentNode ? e : e.target;
  let result;
  for (let i = 0; i < 6; i++) {
    if (currentEle.parentNode.classList.contains(className)) {
      result = currentEle.parentNode;
      return result;
    } else {
      currentEle = currentEle.parentNode;
    }
  }
  return null;
};

/**
 * 测试浏览器环境
 */
util.testBrowser = () => {
  let browserMess = navigator.userAgent.toLocaleLowerCase();
  if (browserMess.includes("firefox")) {
    return "firefox";
  } else if (browserMess.includes("msie") || browserMess.includes("trident")) {
    return "ie";
  } else {
    return "chrome";
  }
  // if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
  //   browserType = "IE";
  //   browserVersion = ua.match(/msie ([\d.]+)/) != null ? ua.match(/msie ([\d.]+)/)[1] : ua.match(/rv:([\d.]+)/)[1];
  // } else if (ua.match(/firefox/) != null) {
  //   browserType = "火狐";
  // }else if (ua.match(/ubrowser/) != null) {
  //   browserType = "UC";
  // }else if (ua.match(/opera/) != null) {
  //   browserType = "欧朋";
  // } else if (ua.match(/bidubrowser/) != null) {
  //   browserType = "百度";
  // }else if (ua.match(/metasr/) != null) {
  //   browserType = "搜狗";
  // }else if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
  //   browserType = "QQ";
  // }else if (ua.match(/maxthon/) != null) {
  //   browserType = "遨游";
  // }else if (ua.match(/chrome/) != null) {
  // }else if (ua.match(/safari/) != null) {
  //   browserType = "Safari";
  // }
};

/**
 * 函数防抖    触发n秒后执行，反复触发会重置上一次计时
 * @param {[Function]} func [需执行防抖的方法]
 * @param {[Number]} wait [等待的时间]
 * @param {[Boolean]} immediate [是否立即执行一次]
 * @return {[Function]} [返回一个可被调用的闭包函数]
 */
util.debounce = (func, wait = 0, immediate = false) => {
  let timeout = null;
  let context = this;

  return function(...rest) {
    if (typeof func !== "function") {
      throw "需传入一个执行方法";
    }

    if (timeout) clearTimeout(timeout);

    try {
      if (immediate) {
        let callNow = !timeout;
        timeout = setTimeout(() => {
          timeout = null;
        }, wait);
        if (callNow) func.call(context, ...rest);
      } else {
        timeout = setTimeout(() => {
          func.call(context, ...rest);
          clearTimeout(timeout);
          timeout = null;
        }, wait);
      }
    } catch (error) {
      console.log("Debounce execution occurs error! ", error);
    }
  };
};

/**
 * 节流    触发后n秒内执行一次
 * @param   {[Function]} func [调用的函数]
 * @param   {[Number]} wait [需要等待的时间间隙]
 * @param   {[Boolean]} immediate [是否需要立即执行传入函数]
 * @return  {[Function]} [返回的一个闭包函数，需执行]
 */
util.throttle = (func, wait = 0, immediate = true) => {
  var previous = 0;
  var timeout = null;
  var context = this;
  return function(...rest) {
    let now = Date.now();

    if (typeof func !== "function") {
      throw "需传入一个执行方法";
    }

    try {
      if (immediate) {
        if (now - previous > wait) {
          func.call(context, ...rest);
          previous = now;
        }
      } else {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          func.call(context, ...rest);
          clearTimeout(timeout);
          timeout = null;
        }, wait);
      }
    } catch (error) {
      throw error;
    }
  };
};

/**
 * 下载方法封装
 * @param {[*]} data [接口返回的下载的数据]
 * @param {[String]} name [下载的文件名]
 * @param {[Function]} callback [回调函数，执行完下载动作之后的回调函数，返回两个参数，1：是否成功下载，2：错误信息（参数1为false时出现）]
 * @return {*}
 */
util.download = (data, name, callback) => {
  // return new Promise((resolve, reject) => {
  try {
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(data, name);
    } else {
      let aTag = document.createElement("a");
      let blob = new Blob([data], {
        type: "application/x-msdownload"
      });
      aTag.download = name;
      aTag.href = URL.createObjectURL(blob);
      aTag.click();
      URL.revokeObjectURL(blob);
      // resolve(true);
      if (typeof callback == "function") {
        callback(true, "");
      }
    }
  } catch (error) {
    if (typeof callback == "function") {
      callback(false, error);
    }
    // reject(false, error);
  }
  // })
};

/**
 * 设置表格宽度，自适应数据宽度
 * @param {[Array]} fixHeadWidFront [固定列的头列宽设定]
 * @param {[Array]} fixHeadWidEnd [固定列的尾列宽设定]
 * @return {*}
 */
util.resetTableColWidth = (fixHeadWidFront = [], fixHeadWidEnd = []) => {
  // let fragment = document.createDocumentFragment();
  // fragment.appendChild(document.querySelector('.pages-table'));
  // 获取需要变动的table对象
  let // 表头
    headerTable = document.querySelector(".ivu-table-header table"),
    // 表体
    bodyTable = document.querySelector(".ivu-table-body table");
  // 固定的表头
  // 固定的表体

  // 设置操作的表头和表体样式  table-layout: auto; 以及 table 的整体宽度为 width: auto;
  headerTable.style.width = "auto";
  headerTable.style.tableLayout = "auto";

  bodyTable.style.width = "auto";
  bodyTable.style.tableLayout = "auto";

  let ifOverLong =
    bodyTable.offsetHeight - bodyTable.parentElement.offsetHeight > 0;

  let // 获取表头的各列宽数组
    thWids = [],
    // 获取表体的各列宽数组
    tbWids = [],
    // 比对得出对应的最大值
    tableWids = [];

  // 获取表头各列列宽
  let secondRowsWid = 0,
    secondRows = headerTable.querySelectorAll("tr:nth-child(2) th");
  Array.from(headerTable.querySelectorAll("tr:first-of-type th")).map(ele => {
    if (!ele.getAttribute("colspan") || ele.getAttribute("colspan") == "1") {
      thWids.push(ele.offsetWidth);
    } else {
      for (let i = 0, len = +ele.getAttribute("colspan"); i < len; i++) {
        thWids.push(secondRows[secondRowsWid + i].offsetWidth);
      }
      secondRowsWid += +ele.getAttribute("colspan");
    }
  });

  Array.from(bodyTable.querySelectorAll("tr:first-of-type td")).map(ele => {
    tbWids.push(ele.offsetWidth);
  });

  for (let i = 0, len = thWids.length; i < len; i++) {
    tableWids.push(Math.max(thWids[i], tbWids[i] || 0) + 5);
  }

  if (ifOverLong) {
    tableWids[tableWids.length - 1] = 16;
  }

  // 第一列为维度列，固定设置为500
  for (let i = 0, len = fixHeadWidFront.length; i < len; i++) {
    tableWids[i] = fixHeadWidFront[i];
  }
  // 设置固定列尾列
  let temp = fixHeadWidEnd.concat([]);
  for (
    let i = tableWids.length - 1, len = tableWids.length - fixHeadWidEnd.length;
    i >= len;
    i--
  ) {
    tableWids[i] = temp.pop();
  }
  // let i = tableWids.length - 1;
  // while(temp.length > 0) {
  //   tableWids[i] = temp.pop();
  //   i--;
  // }

  // 将比对后的列宽结果数组设置到各table的 colgroup 属性中去，并还原 table-layout: fixed; 和 设置新的表格宽度
  let cols = headerTable.querySelectorAll("colgroup col");
  for (let i = 0, len = cols.length; i < len; i++) {
    cols[i].width = tableWids[i];
  }

  cols = bodyTable.querySelectorAll("colgroup col");
  for (let i = 0, len = cols.length; i < len; i++) {
    cols[i].width = tableWids[i];
  }

  let tableWid = tableWids.reduce((a, b) => a + b);
  // 设置报表头宽度
  headerTable.style.width = tableWid + "px";
  headerTable.style.tableLayout = "fixed";

  // 修正 当数据过多出现滚动条的情况
  let resortWidth = ifOverLong ? 15 : 0;
  // 设置报表体宽度
  bodyTable.style.width = tableWid - resortWidth + "px";
  bodyTable.style.tableLayout = "fixed";

  // document.querySelector('.ivu-card-body').appendChild(fragment);
};

export default util;

const install = function(Vue, opts = {}) {
  if (Vue.prototype.$utils) return;
  Vue.prototype.$utils = util;
};
export { install as Utils };
