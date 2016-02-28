var instrument = {
    clone: function(obj) {
        var o, i, j, k;
        if (typeof(obj) != "object" || obj === null) return obj;
        if (obj instanceof(Array)) {
            o = [];
            i = 0;
            j = obj.length;
            for (; i < j; i++) {
                if (typeof(obj[i]) == "object" && obj[i] != null) {
                    o[i] = arguments.callee(obj[i]);
                } else {
                    o[i] = obj[i];
                }
            }
        } else {
            o = {};
            for (i in obj) {
                if (typeof(obj[i]) == "object" && obj[i] != null) {
                    o[i] = arguments.callee(obj[i]);
                } else {
                    o[i] = obj[i];
                }
            }
        }
        return o;
    },
    data: {
        tabContent_each: {
            mainTitle: '',
            sideTitle: '',
            payMonth: '',
            price: '',
            picUrl: '',
            uri: '',
            sku: '',
            label: '',
            type: 'goods',
            code: ''
        },
        content_list: {
            mainTitle: '',
            sideTitle: '',
            payMonth: '',
            price: '',
            picUrl: '',
            uri: '',
            sku: '',
            label: '',
            code: '',
            isShowPayMonth: true,
            isShowPrice: true,
            payMonthType: "0*24",
            priceStyle: "售价",
            isLocked: false,
            tabContent: []
        },
        each_tpl: {
            code: '',
            index: '',
            title: '',
            more: '',
            hideTitle: false,
            isLocked: false,
            content: []
        }
    }

}
module.exports = instrument;
