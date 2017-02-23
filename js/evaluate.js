/**
 * Created by rvum on 16/8/31.
 */
var evaluate = {
    evaData: null,
    init: function () {
        this.getAllEva();/*进入页面获取所有评价,这里用的是ajax请求,但第一屏也可用vm借助后端来进行渲染*/
        this.initEvent();/*初始化监听事件*/
        this.scrollLoad();/*滚动动态加载监听*/
        this.slideLeftOrRight();/*图片预览左右滑动初始化*/
    },

    /**
     * 绑定监听事件。获取图片的需要加载两次防止图片不够一屏
     */
    initEvent: function () {
        var self = this;
        $(".allEva").on('click', function () {
            self.getAllEva();
        });
        $(".goodEva").on("click", function () {
            self.getGoodEva();
        });
        $(".metaEva").on("click", function () {
            self.getMetaEva();
        });
        $(".badEva").on("click", function () {
            self.getBadEva();
        });
        $(".getPictures").on("click", function () {
            self.getPictures();
            self.getPictures();
        });

    },

    /**
     * 滚动动态加载监听,当到达页面底部,会发起该页面的ajax请求
     */
    scrollLoad: function () {
        var self = this;
        $(window).scroll(function () {
            var scrollTop = $(this).scrollTop();
            var scrollHeight = $(document).height();
            var windowHeight = $(this).height();
            if (scrollTop + windowHeight == scrollHeight) {
                if($(".nav .active").hasClass("allEva")){
                    self.allEvaAjax();
                }else if($(".nav .active").hasClass("goodEva")){
                    self.goodEvaAjax();
                }else if($(".nav .active").hasClass("metaEva")){
                    self.metaEvaAjax();
                }else if($(".nav .active").hasClass("badEva")){
                    self.badEvaAjax();
                }else if($(".nav .active").hasClass("getPictures")){
                    self.picturesAjax();
                }
            }
        });
    },

    /**
     * 左右滑动(有bug未实现)
     */
    slideLeftOrRight:function(){
        var self = this;
        $(".swiperWrap").on("swipeLeft",function(){
            self.slideLeftEvent();
        });
        $(".swiperWrap").on("swipeRight",function(){
            self.slideRightEvent();
        });

    },

    /**
     * 左滑动事件处理
     */
    slideRightEvent:function(){
        var imgPosition = $(".preview-header h1").html().split("/")[0];
        var imgPositionNum = parseInt(imgPosition);
        if(imgPositionNum>=2){
            $(".evaInfo").css("display", "none");
            $(".imgEvaInfo" + (imgPositionNum-2)).css("display", "block");

            /*更改图片预览的标题*/
            var imgNum = $(".preview-header h1").html().split("/")[1];
            $(".preview-header h1").html(( imgPositionNum- 1) + "/" + imgNum);

            /*显示图片预览的大图,这里设置为背景了,即不可缩放。*/
            var largeImgUrl = $(".img"+(imgPositionNum-2)+" div").attr("data-largeImgUrl");
            $(".largeImg").css("background-image", "url(" + largeImgUrl + ")");
            $(".imgPreview").css("display", "block");

            /*返回按钮*/
            $("#back-btn").on("click", function () {
                $(".imgPreview").css("display", "none");
            });
        }

    },

    /**
     * 右滑动事件处理
     */
    slideLeftEvent:function(){
        var imgPosition = $(".preview-header h1").html().split("/")[0];
        var imgNum = $(".preview-header h1").html().split("/")[1];
        var imgPositionNum = parseInt(imgPosition);
        imgNum=parseInt(imgNum);
        if((imgPositionNum+1) <= imgNum){
            $(".evaInfo").css("display", "none");
            $(".imgEvaInfo" + imgPositionNum).css("display", "block");

            /*更改图片预览的标题*/
            $(".preview-header h1").html(( imgPositionNum+ 1) + "/" + imgNum);

            /*显示图片预览的大图,这里设置为背景了,即不可缩放。*/

            var largeImgUrl = $(".img"+imgPositionNum+" div").attr("data-largeImgUrl");
            $(".largeImg").css("background-image", "url(" + largeImgUrl + ")");
            $(".imgPreview").css("display", "block");

            /*返回按钮*/
            $("#back-btn").on("click", function () {
                $(".imgPreview").css("display", "none");
            });
        }
    },

    /**
     * 全部评价页面加载
     */
    getAllEva: function () {
        var self = this;
        $(".nav div").removeClass("active");
        $(".allEva").addClass("active");
        $(".onePage").html("");
        $(".pictures").html("");
        self.allEvaAjax();
    },

    /**
     * 全部评价页面ajax请求
     */
    allEvaAjax:function(){
        var self = this;
        $.ajax({
            type: "GET",
            url: "http://localhost:8090/server/mock/allEva.json",
            data: {},
            // timeout:10000,
            // type of data we are expecting in return:
            // dataType: "jsonp",
            success: function (result) {
                self.parseEvaRequest(result);
            },
            error: function (e) {
                console.log(e.message);
            }
        });
    },
    getGoodEva: function () {
        var self = this;
        $(".nav div").removeClass("active");
        $(".goodEva").addClass("active");
        $(".onePage").html("");
        $(".pictures").html("");
        self.goodEvaAjax();
    },
    goodEvaAjax:function () {
        var self = this;
        $.ajax({
            type: "GET",
            url: "http://localhost:8090/server/mock/goodEva.json",
            data: {},
            // timeout:10000,
            // type of data we are expecting in return:
            // dataType: "jsonp",
            success: function (result) {
                self.parseEvaRequest(result);
            },
            error: function (e) {
                console.log(e.message);
            }
        });
    },
    getMetaEva: function () {
        var self = this;
        $(".nav div").removeClass("active");
        $(".metaEva").addClass("active");
        $(".onePage").html("");
        $(".pictures").html("");
        self.metaEvaAjax();
    },
    metaEvaAjax:function () {
        var self = this;
        $.ajax({
            type: "GET",
            url: "http://localhost:8090/server/mock/metaEva.json",
            data: {},
            // timeout:10000,
            // type of data we are expecting in return:
            // dataType: "jsonp",
            success: function (result) {
                self.parseEvaRequest(result);
            },
            error: function (e) {
                console.log(e.message);
            }
        });
    },
    getBadEva: function () {
        var self = this;
        $(".nav div").removeClass("active");
        $(".badEva").addClass("active");
        $(".onePage").html("");
        $(".pictures").html("");
        self.badEvaAjax();
    },
    badEvaAjax:function () {
        var self = this;
        $.ajax({
            type: "GET",
            url: "http://localhost:8090/server/mock/badEva.json",
            data: {},
            // timeout:10000,
            // type of data we are expecting in return:
            // dataType: "jsonp",
            success: function (result) {
                self.parseEvaRequest(result);
            },
            error: function (e) {
                console.log(e.message);
            }
        });
    },

    /**
     * 晒图页面加载
     */
    getPictures: function () {
        var self = this;
        $(".nav div").removeClass("active");
        $(".getPictures").addClass("active");
        $(".onePage").html("");
        // $(".mainWrap").css("display","none");
        // $(".header").css("display","none");
        // $(".imgPreview").css("display","block");

        self.picturesAjax();
    },

    /**
     * 晒图页面ajax请求
     */
    picturesAjax:function(){
        var self = this;
        $.ajax({
            type: "GET",
            url: "http://localhost:8090/server/mock/picEva.json",
            data: {},
            // timeout:10000,
            // type of data we are expecting in return:
            // dataType: "jsonp",
            success: function (result) {
                self.parsePictureRequest(result);
            },
            error: function (e) {
                console.log(e.message);
            }
        });
    },

    /**
     * 解析全部评价、好评、中评、差评的ajax请求的数据
     * @param result
     */
    parseEvaRequest: function (result) {
        var self = this;
        var length = result["comments"].length;
        var evaData = null, evaScore = null;
        for (var i = 0; i < length; i++) {
            (function (i) {
                evaScore = result["comments"][i]["score"];

                /**
                 * 处理ajax的json数据,得到要渲染的数据,随后将其传递给vm来渲染
                 * @type {{nickname: *, creationTime: *, active0, active1, active2, active3, active4, content: *}}
                 */
                evaData = {
                    nickname: result["comments"][i]["nickname"],
                    creationTime: result["comments"][i]["creationTime"],
                    active0: (function () {
                        if (1 <= evaScore) {
                            return "active";
                        } else {
                            return "";
                        }
                    })(),
                    active1: (function () {
                        if (2 <= evaScore) {
                            return "active";
                        } else {
                            return "";
                        }
                    })(),
                    active2: (function () {
                        if (3 <= evaScore) {
                            return "active";
                        } else {
                            return "";
                        }
                    })(),
                    active3: (function () {
                        if (4 <= evaScore) {
                            return "active";
                        } else {
                            return "";
                        }
                    })(),
                    active4: (function () {
                        if (5 == evaScore) {
                            return "active";
                        } else {
                            return "";
                        }
                    })(),
                    content: result["comments"][i]["content"]
                };
            })(i);

            /**
             * 渲染前几个评价页面的数据,加载模板添加到页面中
             */
            self.renderEva(evaData);
        }
    },

    /**
     * 解析晒图的ajax的json数据,evaData.guid用于加入到comment-detail中的a标签,用于之后点击晒图
     * 二级页面的搜索按钮跳转到三级页面(注意要把evaInfo.vm的a标签地址用vm变量代替)
     * @param result
     */
    parsePictureRequest: function (result) {
        var self = this;
        var length = result["comments"].length;
        var imgNum = $(".preview-header h1").html().split("/")[1];
        var evaData = null;
        var z = imgNum || 0;
        for (var i = 0; i < length; i++) {
            (function (i) {
                var imgNums = result["comments"][i]["images"].length;
                for (var j = 0; j < imgNums; j++) {
                    (function (j) {
                        evaData = {
                            nickname: result["comments"][i]["nickname"],
                            minImgUrl: result["comments"][i]["images"][j]["minImgUrl"],
                            largeImgUrl: result["comments"][i]["images"][j]["largeImgUrl"],
                            creationTime: result["comments"][i]["creationTime"],
                            content: result["comments"][i]["content"],
                            score: result["comments"][i]["score"],
                            guid: result["comments"][i]["guid"],
                            imgId: "img" + z,
                            imgIdNum: z++
                        };
                    })(j);
                    self.renderPictureEva(evaData);

                    /**
                     * 对小图片绑定监听事件,从而点击小图片显示图片预览
                     */
                    (function (evaData) {
                        $("." + evaData.imgId).on("click", function () {
                            self.displayLargeImg(evaData)
                        })
                    }(evaData));
                }
            })(i);
        }
        $(".preview-header h1").html("1/" + z);
    },

    /**
     * 渲染每一条评价并加入到页面中
     * @param datas
     */
    renderEva: function (datas) {
        var addModule = require("../components/eva-item.vm");
        var parsedTpl = Velocity.parse(addModule);
        var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
            data: datas
        });
        $(".onePage").append(compiledHtml);
    },

    /**
     * 渲染每一个小图片并加入到页面中
     * @param datas
     */
    renderPictureEva: function (datas) {
        var self = this;
        var addModule = require("../components/picture-itme.vm");
        var parsedTpl = Velocity.parse(addModule);
        var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
            data: datas
        });
        $(".pictures").append(compiledHtml);

        /**
         * 初始化晒图中图片的高度
         */
        var imgWrap = $(".imgWrap");
        imgWrap.css("height", imgWrap.width());

        /**
         * 渲染所有的评价详情
         */
        self.renderEvaInfo(datas);
    },

    /**
     * 显示图片预览界面(小图片绑定的点击事件处理函数)
     * @param data
     */
    displayLargeImg: function (data) {
        var self = this;

        /*更改图片预览的标题*/
        var imgNum = $(".preview-header h1").html().split("/")[1];
        $(".preview-header h1").html((data.imgIdNum + 1) + "/" + imgNum);

        /*显示图片预览的大图,这里设置为背景了,即不可缩放。*/
        $(".largeImg").css("background-image", "url(" + data.largeImgUrl + ")");
        $(".imgPreview").css("display", "block");

        /*返回按钮*/
        $("#back-btn").on("click", function () {
            $(".imgPreview").css("display", "none");
        });

        $(".evaInfo").css("display", "none");
        $(".imgEvaInfo" + data.imgIdNum).css("display", "block");
    },

    /**
     * 渲染评价详情
     * @param data
     */
    renderEvaInfo: function (data) {
        var addModule = require("../components/evaInfo.vm");
        var parsedTpl = Velocity.parse(addModule);
        for (var i = 0; i < 5; i++) {
            data["active" + i] = (function () {
                if (i <= data.score) {
                    return "active";
                } else {
                    return "";
                }
            })()
        }
        var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
            data: data
        });
        $(".evaInfoWrap").append(compiledHtml);
    }
};

$(function () {
    evaluate.init();
});

