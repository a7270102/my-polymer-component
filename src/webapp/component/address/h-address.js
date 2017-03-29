/**
 * Created by iplas087 on 2016/9/8.
 */
Polymer({
    is: "h-address",
    behaviors: [OBaseBehavior],
    properties: {
        label: {
            type: String,
            value: "",
            observer: '_labelChange'
        },
        placeholder: {
            type: String
        },
        tabIndex: {
            type: Number,
            value: 0,
            observer: '_tabIndexChange'
        },
        width: {
            type: String,
            value: "170px"
        },
        /**
         * 是否必填字段
         */
        required: {
            type: Boolean
        },
        mode: {
            type: String,
            value: 'Edit',
            observer: '_modeChange'
        },
        isInner:{
            type:Boolean,
            value:false
        },

        isView: Boolean,
        isEdit: true,
        isTip: {                //是否显示提示信息
            type: Boolean,
            value:false,
            observer: '_isTipChanged'
        },
        /**
         * 是否是演示模式
         */
        demo: Boolean,
        /**
         * 级联数,2：二级地址(省、市)，4：四级地址（省、市、区、街道）
         */
        level: {
            type: Number,
            value: function () {
                return 4;
            }
        },
        detailAddress: {
            type: String,
            notify: true
        },
        /**
         * 输入栏显示的详细地址
         */
        address: {
            type: Object,
            value: {
                common: null,
                province: null,
                city: null,
                zone: null,
                street:null
            }
        },
        specialCity: {  //东莞(4419)，中山(4420)
            type: Array,
            value: ['4420','4419']
        },
        common: {
            type: String,
            notify: true
        },
        province: {
            type: String,
            notify: true
        },
        city: {
            type: String,
            notify: true
        },
        zone: {
            type: String,
            notify: true
        },
        street: {
            type: String,
            notify: true
        },
        // 省份列表，城市列表，区/县列表，街道/镇列表
        provincesItems: {
            type: Array,
            value: [],
        },
        cityItems: {
            type: Array,
            notify: true,
            value: [],
        },
        zoneItems: {
            type: Array,
            notify: true,
            value:[]
        },
        streetItems: {
            type: Array,
            notify: true
        },
        ajaxSync: Boolean,              // 同步 or 异步请求ajax
        commonItems: {
            type: Array,
            value: [{
                label: '广州',
                value: '4401',
                level: 2
            }, {
                label: '中山',
                value: '4420',
                level: 2
            }, {
                label: '乐从',
                value: '440606103',
                level: 4
            }, {
                label: '樟木头',
                value: '441901112',
                level: 4
            }, {
                label: '黄江',
                value: '441901114',
                level: 4
            }, {
                label: '佛山',
                value: '4406',
                level: 2
            }, {
                label: '东莞',
                value: '4419',
                level: 2
            }, {
                label: '深圳',
                value: '4403',
                level: 2
            }, {
                label: '昆山',
                value: '320583',
                level: 3
            }, {
                label: '义乌',
                value: '330782',
                level: 3
            }, {
                label: '上海',
                value: '3101',
                level: 2
            }, {
                label: '余姚',
                value: '330281',
                level: 3
            }, {
                label: '常州',
                value: '3204',
                level: 2
            }, {
                label: '宁波',
                value: '3302',
                level: 2
            }, {
                label: '台州',
                value: '3310',
                level: 2
            }]
        },
        // 本地数据--演示使用
        /**
         * 本地数据省份
         */
        localProvincesItems: {
            type: Array,
            value: [
                {label: '上海', value: '31'}, {label: '浙江', value: '33'}, {label: '江苏', value: '32'}, {label: '山东', value: '37'},
                {label: '安徽', value: '34'}, {label: '广东', value: '44'}, {label: '广西', value: '45'}, {label: '江西', value: '36'},
                {label: '贵州', value: '52'}, {label: '云南', value: '53'}, {label: '福建', value: '35'}, {label: '湖南', value: '43'},
                {label: '湖北', value: '42'}, {label: '四川', value: '51'}, {label: '重庆', value: '50'}, {label: '陕西', value: '61'},
                {label: '甘肃', value: '62'}, {label: '宁夏', value: '64'}, {label: '山西', value: '14'}, {label: '内蒙古', value: '15'},
                {label: '辽宁', value: '21'}, {label: '吉林', value: '22'}, {label: '黑龙江', value: '23'}, {label: '西藏', value: '54'},
                {label: '新疆', value: '65'}, {label: '北京', value: '11'}, {label: '天津', value: '12'}, {label: '河南', value: '41'},
                {label: '河北', value: '13'}, {label: '青海', value: '63'}, {label: '海南', value: '46'}
            ],
            readonly: true
        },
        /**
         * 本地数据城市
         */
        localCityItems: {
            type: Array,
            value: [{
                label: '广州',
                value: '4401'
            }, {
                label: '佛山',
                value: '4406'
            }, {
                label: '深圳',
                value: '4403'
            }],
            readonly: true
        },
        /**
         * 本地数据 区
         */
        localZoneItems: {
            type: Array,
            value: [{
                label: '白云区',
                value: '440111'
            }, {
                label: '海珠区',
                value: '440105'
            }, {
                label: '天河区',
                value: '440106'
            }],
            readonly: true
        },
        /**
         * 本地数据
         */
        localStreetItems: {
            type: Array,
            value: [{
                label: '猎德街道',
                value: '440106013'
            }, {
                label: '元岗街道',
                value: '440106015'
            }, {
                label: '五山街道',
                value: '440106001'
            }],
            readonly: true
        },
        counter: {
            type: Object,
            value: function () {
                var counter = 1;
                return {
                    getCounter: function () {
                        return counter++;
                    }
                }
            }
        },
        // 省市区街道 编码/完整地址编码
        /**
         *地区编号
         **/
        areaCode: {
            type: String,
            notify: true,
            reflectToAttribute: true,
            observer: '_areaCodeChanged'
        },
    },
    observers: ['_addressCoChanged(address.common)','_addressPChanged(address.province)', '_addressCChanged(address.city)',
                '_addressZChanged(address.zone)', '_addressSChanged(address.street)'],
    //********************************  组件外观控制方法集   **********************//
    /**
     * 监听标签名改变
     * @param label 标签名
     * @private
     */
    _labelChange:function(label){
        var labelElement = this.querySelector(".label-size");
        if(labelElement){
            if(!label){
                labelElement.style.display= "none";
            }else{
                labelElement.style.display= "inline-block";
            }
        }
    },
    _isTipChanged: function(tip){
        if(tip) {
           this.initPage();
        }
    },
    _modeChange: function(mode) {
      if(mode) {
          mode == 'View' ? this.set('isView', true) : this.set('isEdit', true);
      }
    },

    /**
     * level control
     * @param newVal
     * @param oldVal
     * @private
     */
    _tabIndexChange: function(newVal, oldVal) {
        var level = this.level || 4;
        if(newVal > level) {
            this.tabIndex = oldVal;
        }
    },
    //***************************地址文本显示动态集********************************//
    initAddress: function() {
      this.set('address', {
          common: null,
          province: null,
          city: null,
          zone: null,
          street: null
      });
    },
    /**
     * 根据每一级地址更新地址详情
     * 1.点击common会触发跳转，此时后面的地址直接接在common后面
     * 2.若点击省，则清除common，后面的地址一级级的来；
     * @param common
     * @param province
     * @param city
     * @param zone
     * @param street
     * @private
     */
    _addressCoChanged: function(common) {
      if (common) {
          this.set('address.province', null);
          this.set('address.city', null);
          this.set('address.zone', null);
          this.set('address.street', null);
      }
    },
    _addressPChanged: function(province) {
        if(province) {
            this.set('address.common', null);
            this.set('detailAddress', province);
        }
    },
    _addressCChanged: function(city) {
        if(city) {
            var provinceName=this.address.province || "";//选择常用地址时没有省份
            this.set('detailAddress', provinceName + city);
        }
    },
    _addressZChanged: function(zone) {
        if(zone) {
            if (this.address.common) {
                if(this.common.length==4){
                    this.set('detailAddress', this.address.common + zone);
                }else{
                    this.set('detailAddress', this.detailAddress + zone);
                }
            } else {
                this.set('detailAddress', this.address.province + this.address.city + zone);
            }

        }
    },
    _addressSChanged: function(street) {
        var common, province, city, zone;
        if(street) {
            common = this.address.common || "";
            province = this.address.province || "" ;
            city = this.address.city || "";
            zone = this.address.zone || "";
            if (common) {
                this.set('detailAddress', this.detailAddress + street);
                if(this.address.length==4){
                    this.set('detailAddress', common + zone +street);
                }else if(this.common.length==6){
                    this.set('detailAddress', common + street);
                }else{
                    this.set('detailAddress', this.detailAddress + street);
                }
            } else {
                this.set('detailAddress', province + city + zone + street);
            }
        }
    },
    //************************************** 数据动态变化响应集 ************************************//

    // ******************************** 点击选中事件响应集 *********************************//
    /**
     * 选中对应面板区域的值，触发相应的动作相应
     * @param e
     */
    chooseCommon: function(e) {
        e.stopPropagation(); //阻止冒泡
        var item = e.srcElement.dataArgs;
        this.addSelectedClassByCode('common', item.value);
        // 设置areaCode 和 address
        this.clearCo();
        this.set('common', item.value);
        this.set('areaCode', item.value);
    },

    chooseProvince: function(e) {
        e.stopPropagation(); //阻止冒泡
        var item = e.srcElement.dataArgs;
        this.addSelectedClassByCode('province', item.value);
        //设置provice
        this.clearP();
        this.set('province', item.value);
        this.set('areaCode', item.value);
    },

    chooseCity: function(e) {
        e.stopPropagation(); //阻止冒泡
        var item = e.srcElement.dataArgs;
        this.addSelectedClassByCode('city', item.value);
        //设置city
        this.clearC();
        this.set('city', item.value);
        this.set('areaCode', item.value);
    },

    chooseZone: function(e) {
        e.stopPropagation(); //阻止冒泡
        var item = e.srcElement.dataArgs;
        this.addSelectedClassByCode('zone', item.value);
        //设置zone
        this.clearZ();
        this.set('zone', item.value);
        this.set('areaCode', item.value);
    },

    chooseStreet: function(e) {
        e.stopPropagation(); //阻止冒泡
        var item = e.srcElement.dataArgs;
        this.addSelectedClassByCode('street', item.value);
        //设置street
        this.set('street', item.value);
        this.set('areaCode', item.value);
        this.close();
    },

    /**
     * 清除当前节点其下属的数据 co:常用；p:省; c:市; z:区县
     */
    clearCo: function() {
        this.set('detailAddress',"");
        this.set('province',null);
        this.set('provinceItems',[]);
        this.set('city', null);
        this.set("cityItems", []);
        this.set('zone', null);
        this.set("zoneItems", []);
        this.set('street', null);
        this.set("streetItems", []);
    },
    clearP: function() {
        if (this.vaildVal(this.address.common)) {
            this.set('detailAddress', "");
        }
        this.set('city', null);
        this.set("cityItems", []);
        this.set('zone', null);
        this.set("zoneItems", []);
        this.set('street', null);
        this.set("streetItems", []);
    },
    clearC: function() {
        this.set('zone', null);
        this.set("zoneItems", []);
        this.set('street', null);
        this.set("streetItems", []);
    },
    clearZ: function() {
        this.set('street', null);
        this.set("streetItems", []);
    },

    //**************************** 状态控制集  ***********************************//
    /**
     * 支持 地址层次选择；二级 （省市） 三级（省市区） 四级 （省市区街道）
     * @param level
     * @param index
     * @returns {boolean}
     * @private
     */
    _hasShow: function(level, index) {
        return level >= index;
    },

    /**
     * 支持地址层级选择：只显示支持的层级地址选择
     * @param index
     * @param tabindex
     * @returns {boolean}
     */
    showTabIndex: function (index, tabIndex) {
        return this.level>= index && index == tabIndex;
    },
    //************************* 组件样式动态响应集  ****************************//
    _keywordChange: function (newKey) {
        if (!!newKey && newKey.length > 0) {
            this.$['tags-input'].style.width = this._getStrWidth(newKey);
        }
    },
    _getTagsBoxWidth: function (width) {
        width = width || "170px";
        return "min-width:" + width;
    },
    _getCollapseWidth: function (width) {
        width = width || "170px";
        return "min-width:" + width;
    },
    /**
     * 获取字符串在网页上边的宽度
     * @param str
     * @returns {string}
     * @private
     */
    _getStrWidth: function (str) {
        var self = this;
        var _thisMaxWith = Number(this.width.substr(0,this.width.indexOf("px")))-44;
        function getTagContentWidth(){
            var tag = self.querySelectorAll(".tag");
            return tag.length > 0 ? Array.prototype.reduce.call(tag,function(a,b){
                return {offsetWidth: a.offsetWidth+ b.offsetWidth}
            }).offsetWidth:0;
        }
        var span = document.createElement("span");
        document.body.appendChild(span);
        span.style.visibility = "hidden";
        span.style.whiteSpace = "nowrap";
        span.innerText = str;
        span.style.fontSize = "13px";
        var maxWidth = _thisMaxWith-getTagContentWidth(); //容许的最大宽度
        var realWidth = ((span.offsetWidth || 0) + 5 );
        return (realWidth>maxWidth?maxWidth:realWidth) + "px";
    },
    /**
     * 获取Input 宽度
     * @param width
     * @private
     */
    _getInputStyle: function (width) {
        return "width:" + width;
    },

    // ***************************** 初始化类集  ***********************************//
    /**
     * clear数据
     */
    initPage: function(e) {
        e?e.stopPropagation():'';
        this.set('address',{
            common: null,
            province: null,
            city: null,
            zone: null,
            street:null
        });
        this.set('isTip', false);
        this.set('areaCode', null);
        this.set('tabIndex', 0);
        this.addSelectedClassByCode('common');
        this.clearCo();
    },

    initClass: function() {
        if(!this.areaCode) {
            this.clearClass();
        } else {
            this.initSelectedClass();
        }
    },

    /**
     * 清除所有选中
     */
    clearClass: function() {
        var selectedEl;
        var contentEl = this.querySelector('#dropdown-content');
        if (contentEl) {
            selectedEl = contentEl.querySelectorAll('.selected');
            Array.prototype.forEach.call(selectedEl, function(e){
                $(e).removeClass('selected');
            })
        }
    },

    /**
     * 初始化所有选中
     */
    initSelectedClass: function() {
        var tabIndex = this.tabIndex;
        var areaCode = this.areaCode.toString();
        var code = this.areaCode.toString();
        switch(tabIndex){
            case 1:
                code = areaCode.substring(0,2);
                code.length == 2 ? this.addSelectedClassByCode('province',code) : '';
                break;
            case 2:
                code = areaCode.substring(0,4);
                code.length == 4 ? this.addSelectedClassByCode('city',code) : '';
                break;
            case 3:
                code = areaCode.substring(0,6);
                code.length == 6 ? this.addSelectedClassByCode('zone',code) : '';
                break;
            case 4:
                code = areaCode.substring(0,9);
                code.length == 9 ? this.addSelectedClassByCode('street',code) : '';
                break;
        }
    },

    // ************************ 功能按钮类集 ****************************//
    /**
     * 点击打开地址选择框
     * @param e
     */
    open: function(e) {
        e.stopPropagation();
        this.querySelector('#dropdown').open();
        // 给样式；
        this.initClass();
    },


    /**
     * 关闭下拉框
     * @param e
     */
    close: function(e) {
        var layOver = this.querySelector('#dropdown');
        layOver.close();
    },

    /**
     *
     * @param detailAddress
     * @param flag
     * @returns {boolean}
     * @private
     */
    _hasInput: function(detailAddress, flag) {
        return this.vaildVal(detailAddress) == flag;
    },
    /**
     * level control address level show
     * @private
     */
    _hasShow: function(level, adrLevel) {
        return level >= adrLevel
    },

    //*********************** 内容控制集 *******************************//
    /**
     * 由于id不允许纯数字查询，li#44 为非法的selector；
     * @param idCode
     * @returns {string}
     */
    showString: function(idCode) {
        return 'i' + idCode;
    },

    addSelectedClassByCode: function(ul,code) {
        var rootUl = this.querySelector('ul#' + ul);
        var aNodes = rootUl.querySelectorAll('li');
        aNodes = aNodes && aNodes.length ? aNodes : [];
        var curNode = rootUl.querySelector('li#'+ 'i' + code);
        Array.prototype.forEach.call(aNodes, function(node){
            var $node = $(node);
            if ($node.hasClass('selected')) {
                $node.removeClass('selected');
            }
        });
        curNode ? $(curNode).addClass('selected') : '';
    },

    addSelectedClass: function(e) {
        // 清除已选中的类
        var rootUl =  e.target.parentElement.parentElement;
        var aNodes = rootUl.querySelectorAll('li a');
        Array.prototype.forEach.call(aNodes, function(node){
            var $node = $(node);
            if ($node.hasClass('selected')) {
                $node.removeClass('selected');
            }
        });
        // 添加选中类
        $(event.target).addClass('selected');
    },

    // *************************对外对象集 ******************************//
    /**
     * 初始化就有值时，分隔areaCode 生成对应的detailAddress
     * @private
     */
    _areaCodeChanged: function(areaCode) {
        if (!areaCode) {
            return;
        }
        var valid = [2,4,6,9];
        var validLength = areaCode.toString().length;
        var flag = valid.some(function(e){
            return e == validLength;
        });
        if (!flag) {
            this.set('isTip', true);
            return;
        }
        // 内部变量 -- 外部变量
        this.getDetailAddress(areaCode.toString());
    },

    /**
     * 获取详细地址显示
     * @param areaCode
     */
    getDetailAddress: function(areaCode) {
        var self = this;
        var len = areaCode.length;
        var pCode, cCode, zCode, sCode;
        switch(len) {
            case 2:
                pCode = areaCode;
                this.ajaxSync ? this.handleAddressCode(pCode) : this.handleAddressCodeByAsync(pCode);
                break;
            case 4:
                pCode = areaCode.substring(0,2);
                cCode = areaCode;
                this.ajaxSync ? this.handleAddressCode(pCode, cCode) : this.handleAddressCodeByAsync(pCode, cCode);
                break;
            case 6:
                pCode = areaCode.substring(0,2);
                cCode = areaCode.substring(0,4);
                zCode = areaCode;
                this.ajaxSync ? this.handleAddressCode(pCode,cCode,zCode) : this.handleAddressCodeByAsync(pCode, cCode, zCode);
                break;
            case 9:
                pCode = areaCode.substring(0,2);
                cCode = areaCode.substring(0,4);
                zCode = self.specialCity.indexOf(cCode) == -1 ? areaCode.substring(0,6) : null;
                sCode = areaCode;
                this.ajaxSync ? this.handleAddressCode(pCode,cCode,zCode,sCode) : this.handleAddressCodeByAsync(pCode, cCode, zCode, sCode);
                break;
        }
    },
    // 尝试是使用promise.all来解决异步请求同步处理的问题;
    // 使用两套系统，同步/异步两套模式
    handleAjax: function(code, fn) {
        var self = this;
        var url = "/crm/complete/findAreasByParentCode/" + code + ".do";
        $.ajax({
            type: "GET",
            url: self.getRoot() + url,
            data: {},
            async: true,
            dataType: "json",
            success: fn
        });
    },
    //dataArr 为一组返回结果
    handleDate: function(dataArr) {
        var self = this;
        if(dataArr && dataArr.length > 0) {
            dataArr.forEach(function(data){success(data)});
        }
        function success(data) {
            var level, code;
            if(!data){
                return;
            }
            code = data.code;
            // 当前code查询出来的为其子目录的地址
            level = data.level + 1;
            if (level == 5) {//更新街道详情
                self.set('detailAddress', data['fullName']);
                return;
            }
            if (!data.childrenJson || data.childrenJson.length <= 2) {
                return;
            }
            var areas = JSON.parse(data.childrenJson);
            var temp = areas.map(function (e) {
                return {label: e.name, value: e.code, fullName: e.fullName};
            });
            switch(level) {
                case 1:
                    self.set("provincesItems", temp);
                    break;
                case 2:
                    self.set("cityItems", temp);
                    self.set("address.province", self.showRadioLabel(self.provincesItems, code));
                    break;
                case 3:
                    if(self.specialCity.indexOf(code) != -1) {
                        self.set("streetItems", temp);
                    } else {
                        self.set("zoneItems", temp);
                    }
                    self.set("address.city", self.showRadioLabel(self.cityItems, code));
                    break;
                case 4:
                    self.set("streetItems", temp);
                    self.set("address.zone", self.showRadioLabel(self.zoneItems, code));
                    break;
                case 5:
                    self.set("address.street", self.showRadioLabel(self.streetItems, code));
            }

        };
    },
    /**
     * 异步操作，使用promise.all()
     * @param pCode
     * @param cCode
     * @param zCode
     * @param sCode
     */
    handleAddressCodeByAsync: function(pCode, cCode, zCode, sCode) {
        var self = this;
        var province, city, zone, street, tabIndex, queue;

        if (pCode) {
            province = new Promise(function(resolve){self.handleAjax(pCode, function(data){resolve(data)})});
            tabIndex = 2;
        }
        if (cCode) {
            city = new Promise(function(resolve){self.handleAjax(cCode, function(data){resolve(data)})});
            tabIndex = self.specialCity.indexOf(cCode) == -1 ? 3 : 4;
        }
        if (zCode) {
            zone = new Promise(function(resolve){self.handleAjax(zCode, function(data){resolve(data)})});
            tabIndex = 4;
        }
        if (street) {
            street = new Promise(function(resolve){self.handleAjax(sCode, function(data){resolve(data)})});
        }

        queue = [province, city, zone, street].filter(function(e){return e !== null && e !== undefined});
        Promise.all(queue).then(function(datas){self.handleDate(datas)});
        // 自动跳转至下一级地址
        self.set('tabIndex', tabIndex);
    },
    /**
     * 同步操作 使用ajax async: false,
     * @param pCode
     * @param cCode
     * @param zCode
     * @param sCode
     */
    handleAddressCode: function(pCode, cCode, zCode, sCode) {
        var self = this;
        var tabIndex;
        if (pCode) {
            this.getData(self,pCode, 2);
            tabIndex = 2;
        }
        if (cCode) {
            this.getData(self, cCode, 3);
            tabIndex = self.specialCity.indexOf(cCode) == -1 ? 3 : 4;
        }
        if (zCode) {
            this.getData(self, zCode, 4);
            tabIndex = 4;
        }
        if (sCode) {
            this.getData(self, sCode, 5);
        }
        this.set("tabIndex", tabIndex);
    },
    /**
     * 获取操作; 同步操作
     * @param self 上下文
     * @param code
     * @param level
     */
    getData: function(self ,code, level) {
        if (code === undefined || code === null) {
            return;
        }
        if (this.demo) {
            this.demoShow(code,level);
            return;
        }
        var url = "/crm/complete/findAreasByParentCode/" + code + ".do";
        $.ajax({
            type: "GET",
            url: self.getRoot() + url,
            data: {},
            async: false,
            dataType: "json",
            success: function(data) {

                if(!data){
                    return;
                }
                if (level == 5) {//更新街道详情
                    self.set('detailAddress', data['fullName']);
                    return;
                }
                if (!data.childrenJson || data.childrenJson.length <= 2) {
                    return;
                }
                var areas = JSON.parse(data.childrenJson);
                var temp = areas.map(function (e) {
                    return {label: e.name, value: e.code, fullName: e.fullName};
                });
                switch(level) {
                    case 1:
                        self.set("provincesItems", temp);
                        break;
                    case 2:
                        self.set("cityItems", temp);
                        self.set("address.province", self.showRadioLabel(self.provincesItems, code));
                        break;
                    case 3:
                        if(self.specialCity.indexOf(code) != -1) {
                            self.set("streetItems", temp);
                        } else {
                            self.set("zoneItems", temp);
                        }
                        self.set("address.city", self.showRadioLabel(self.cityItems, code));
                        break;
                    case 4:
                        self.set("streetItems", temp);
                        self.set("address.zone", self.showRadioLabel(self.zoneItems, code));
                        break;
                    case 5:
                        self.set("address.street", self.showRadioLabel(self.streetItems, ode));
                }

            },
            error: function(messge) {
                throw Error("查询失败：" + messge.responseText);
            }
        })
    },
    /**
     * 演示使用 demo模式
     * @param level
     */
    demoShow: function(code,level) {
        var self = this;
        switch(level) {
            case 1:
                self.set("provincesItems", self.localProvincesItems);
                break;
            case 2:
                self.set("cityItems", self.localCityItems);
                self.set("address.province", self.showRadioLabel(self.provincesItems, code));
                break;
            case 3:
                if(self.specialCity.indexOf(code) != -1) {
                    self.set("streetItems", self.localStreetItems);
                } else {
                    self.set("zoneItems", self.localZoneItems);
                }
                self.set("address.city", self.showRadioLabel(self.cityItems, code));
                break;
            case 4:
                self.set("streetItems", self.localStreetItems);
                self.set("address.zone", self.showRadioLabel(self.zoneItems, code));
                break;
            case 5:
                self.set("address.street", self.showRadioLabel(self.streetItems, code));
        }
    },
    ready: function() {
        this.set('tabIndex',0);
        this.set('provincesItems', this.localProvincesItems);
    },
});