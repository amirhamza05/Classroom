function OpenWindow(n, t, i, r) {
    var u = (screen.width - t) / 2,
        f = (screen.height - i) / 2,
        e;
    winprops = "resizable=0, height=" + i + ",width=" + t + ",top=" + f + ",left=" + u + "w";
    r && (winprops += ",scrollbars=1");
    e = window.open(n, "_blank", winprops)
}

function setLocation(n) {
    window.location.href = n
}

function displayAjaxLoading(n) {
    n ? $(".ajax-loading-block-window").show() : $(".ajax-loading-block-window").hide("slow")
}

function displayPopupNotification(n, t, i) {
    var f, r, u, e;
    if (f = t == "success" ? $("#dialog-notifications-success") : t == "error" ? $("#dialog-notifications-error") : t == "warning" ? $("#dialog-notifications-warning") : $("#dialog-notifications-success"), r = "", typeof n == "string") r = "<p>" + n + "<\/p>";
    else
        for (u = 0; u < n.length; u++) r = r + "<p>" + n[u] + "<\/p>";
    f.html(r);
    e = i ? !0 : !1;
    f.dialog({
        modal: e,
        width: 350
    })
}

function displayPopupContentFromUrl(n, t, i, r) {
    var u = i ? !0 : !1,
        f = r ? r : 550,
        e = $(window).height() - 20;
    $("<div><\/div>").load(n).dialog({
        modal: u,
        position: ["center", 20],
        width: f,
        maxHeight: e,
        title: t,
        close: function() {
            $(this).dialog("destroy").remove()
        }
    })
}

function displayBarNotification(n, t, i) {
    var r, u, f;
    if (clearTimeout(barNotificationTimeout), r = "success", t == "success" ? r = "success" : t == "error" ? r = "error" : t == "warning" && (r = "warning"), $("#bar-notification").removeClass("success").removeClass("error").removeClass("warning"), $("#bar-notification .content").remove(), u = "", typeof n == "string") u = '<p class="content">' + n + "<\/p>";
    else
        for (f = 0; f < n.length; f++) u = u + '<p class="content">' + n[f] + "<\/p>";
    $("#bar-notification-message").html(u);
    $("#bar-notification").addClass(r).fadeIn("slow").mouseenter(function() {
        clearTimeout(barNotificationTimeout)
    });
    $("#bar-notification .close").unbind("click").click(function() {
        $("#bar-notification").fadeOut("slow")
    });
    i > 0 && (barNotificationTimeout = setTimeout(function() {
        $("#bar-notification").fadeOut("slow")
    }, i))
}

function htmlEncode(n) {
    return $("<div/>").text(n).html()
}

function htmlDecode(n) {
    return $("<div/>").html(n).text()
}

function addAntiForgeryToken(n) {
    n || (n = {});
    var t = $("input[name=__RequestVerificationToken]");
    return t.length && (n.__RequestVerificationToken = t.val()), n
}

function toQuery(n) {
    var t = "";
    return $.each(n, function(n, i) {
        t += n + "=" + i + "&"
    }), t
}
var AjaxFilter, AjaxFilterToggler, barNotificationTimeout, AjaxCart, HomeComponent, EmiManager, _extends, _typeof, quickViewApi, api, miniShoppingCart;
$.fn.serializeObject = function() {
    var n = {},
        t = this.serializeArray();
    return $.each(t, function() {
        n[this.name] !== undefined ? (n[this.name].push || (n[this.name] = [n[this.name]]), n[this.name].push(this.value || "")) : n[this.name] = this.value || ""
    }), n
};
AjaxFilter = {
    url: !1,
    oryginalmodel: !1,
    expandBlock: !1,
    filteredSpecificationAttributesAndPriceRanges: [],
    filteredSpecificationAttributesForShowing: [],
    prevModel: !1,
    init: function(n, t) {
        this.url = t;
        this.oryginalmodel = n
    },
    pageClick: !1,
    loadProductPictures: function(n) {
        var t = {
            productIds: n
        };
        $.ajax({
            cache: !0,
            url: "/Catalog/LoadProductPictureByProductId",
            type: "POST",
            data: t,
            dataType: "json",
            success: function(n) {
                var t, i;
                if (n.Data)
                    for (t = 0; t < n.Data.length; t++) i = "#cataloglist_prductid_" + n.Data[t].ProductId, $(i).attr("src", "" + n.Data[t].ImageUrl + "").fadeIn(), $(i).attr("title", "" + n.Data[t].Title + ""), $(i).attr("alt", "" + n.Data[t].AlternateText + "")
            },
            error: function() {}
        })
    },
    processSearch: function(n) {
        if (n === !0) {
            var t = $(window).height(),
                i = $(window).width();
            $(".searchProcess").height(t);
            $(".searchProcess").width(i);
            $(".searchProcess").show()
        } else $(".searchProcess").hide()
    },
    loadInitial: function() {
        var n, t, i;
        this.processSearch(!0);
        n = this.getAllUrlParams(window.location.href);
        n.lp = "false";
        t = this.generateUrlFilterPart(n);
        i = this.getFilterUrl(t);
        this.loadFilter(i)
    },
    loadOnChange: function(n) {
        n || $("#PageNumber").val(1);
        this.processSearch(!0);
        var i = this.getSelectedFilters(),
            t = this.generateUrlFilterPart(i),
            r = this.getFilterUrl(t),
            u = window.location.href.split("?")[0];
        history.pushState({}, null, u + "?" + t);
        this.loadFilter(r)
    },
    generateUrlFilterPart: function(n) {
        var t = "",
            r = 0;
        for (var i in n) n.hasOwnProperty(i) && (r > 0 && (t += "&"), t += i + "=" + n[i], r++);
        return t
    },
    getFilterUrl: function(n) {
        return categoryId > 0 ? "/LoadComponentAjax/Category?categoryId=" + categoryId + "&" + n : manufacturerId > 0 ? "/LoadComponentAjax/Manufacturer?manufacturerId=" + manufacturerId + "&" + n : vendorId > 0 ? "/LoadComponentAjax/Vendor?vendorId=" + vendorId + "&" + n : productTagId > 0 ? "/LoadComponentAjax/ProductTag?productTagId=" + productTagId + "&" + n : discountId > 0 ? "/LoadComponentAjax/Discount?discountId=" + discountId + "&" + n : isBrowsingHistoryPage ? "/LoadComponentAjax/BrowsingHistory?" + n : isCertifiedProductPage ? "/LoadComponentAjax/CertifiedProducts?" + n : isRecommendationPage ? "/LoadComponentAjax/FeaturedRecommendation?" + n : void 0
    },
    loadFilter: function(n) {
        $.ajax({
            cache: !1,
            url: n,
            type: "get",
            success: function(n) {
                n.replace_products_section && ($("#product-container").html(n.products_section), $("html, body").animate({
                    scrollTop: $("#product-container").offset().top
                }, 1e3), AjaxFilter.page());
                $("#loadAjaxFilter").html(n.filter_section);
                AjaxFilter.processSearch(!1)
            },
            error: this.closeTheLoadingModal
        })
    },
    getSelectedFilters: function() {
        var n = {},
            t, o, i, r, u, f, e;
        return isBrowsingHistoryPage || isRecommendationPage || discountId != 0 || (n.pagesize = $("#PageSize").val(), t = $("#SortOption").val(), t !== undefined && t != null && t != "" && (n.orderby = t)), o = parseInt($("#PageNumber").val()), o > 1 && (n.pagenumber = o), discountId === 0 && ($("#ioc-filter-option").is(":checked") && (n.ioc = !0), $("#emi-filter-option").is(":checked") && (n.emi = !0), $("#new7-filter-option").is(":checked") && (n.new7 = !0), $("#new30-filter-option").is(":checked") && (n.new30 = !0), currentMinPrice > minPrice && (n.pricemin = currentMinPrice), currentMaxPrice < maxPrice && (n.pricemax = currentMaxPrice), i = [], $.each($('input[name="specs"]:checkbox:checked'), function() {
            var n = $(this).val();
            isNaN(n) || i.push(n)
        }), i !== undefined && i.length > 0 && (n.specs = i.join()), r = [], $.each($('input[name="manufactures"]:checkbox:checked'), function() {
            var n = $(this).val();
            isNaN(n) || r.push(n)
        }), r !== undefined && r.length > 0 && (n.manufactures = r.join()), u = [], $.each($('input[name="vendors"]:checkbox:checked'), function() {
            var n = $(this).val();
            isNaN(n) || u.push(n)
        }), u !== undefined && u.length > 0 && (n.vendors = u.join()), f = [], $.each($('input[name="discounts"]:checkbox:checked'), function() {
            var n = $(this).val();
            isNaN(n) || f.push(n)
        }), f !== undefined && f.length > 0 && (n.discounts = f.join()), e = [], $.each($('input[name="ratings"]:checkbox:checked'), function() {
            var n = $(this).val();
            isNaN(n) || e.push(n)
        }), e !== undefined && e.length > 0 && (n.ratings = e.join())), n
    },
    setAllURLParam: function() {
        var n, t, i, r, u, f;
        n = window.location.href;
        n = AjaxFilter.setParam(n, "pagesize", $("#PageSize").val());
        n = AjaxFilter.setParam(n, "orderby", $("#SortOption").val());
        n = AjaxFilter.setParam(n, "pagenumber", $("#PageNumber").val());
        n = AjaxFilter.setParam(n, "ioc", $("#ioc-filter-option").is(":checked"));
        n = AjaxFilter.setParam(n, "emi", $("#emi-filter-option").is(":checked"));
        n = AjaxFilter.setParam(n, "new7", $("#new7-filter-option").is(":checked"));
        n = AjaxFilter.setParam(n, "new30", $("#new30-filter-option").is(":checked"));
        n = $("#price-current-min").val() == $("#filterPriceModelMinPrice").val() ? AjaxFilter.setParam(n, "pricemin", 0) : AjaxFilter.setParam(n, "pricemin", $("#price-current-min").val());
        n = $("#price-current-max").val() == $("#filterPriceModelMaxPrice").val() ? AjaxFilter.setParam(n, "pricemax", 0) : AjaxFilter.setParam(n, "pricemax", $("#price-current-max").val());
        t = [];
        $.each($('input[name="specs"]:checkbox:checked'), function() {
            var n = $(this).val();
            isNaN(n) || t.push(n)
        });
        n = AjaxFilter.setParamNoEncode(n, "specs", t.join());
        i = [];
        $.each($('input[name="manufactures"]:checkbox:checked'), function() {
            var n = $(this).val();
            isNaN(n) || i.push(n)
        });
        n = AjaxFilter.setParamNoEncode(n, "manufactures", i.join());
        r = [];
        $.each($('input[name="vendors"]:checkbox:checked'), function() {
            var n = $(this).val();
            isNaN(n) || r.push(n)
        });
        n = AjaxFilter.setParamNoEncode(n, "vendors", r.join());
        u = [];
        $.each($('input[name="discounts"]:checkbox:checked'), function() {
            var n = $(this).val();
            isNaN(n) || u.push(n)
        });
        n = AjaxFilter.setParamNoEncode(n, "discounts", u.join());
        f = [];
        $.each($('input[name="ratings"]:checkbox:checked'), function() {
            var n = $(this).val();
            isNaN(n) || f.push(n)
        });
        n = AjaxFilter.setParamNoEncode(n, "ratings", f.join());
        history.pushState({}, null, n)
    },
    page: function() {
        var n = $(".pager");
        void 0 !== n && n.length > 0 && $("a", n).each(function() {
            var n = $(this).attr("href"),
                t = n.indexOf("pagenumber="),
                i;
            t !== -1 ? (t += 11, i = n.substring(t, n.length)) : i = null;
            $(this).attr("href", "javascript:;");
            $(this).click(function() {
                $("#PageNumber").val(i);
                AjaxFilter.loadOnChange(!0)
            })
        })
    },
    addParam: function(n, t, i) {
        var r = n;
        return r + (r.indexOf("?") < 0 ? "?" + t + "=" + i : "&" + t + "=" + i)
    },
    setParam: function(n, t, i) {
        return i == "" || i == null || i == 0 ? n.replace(RegExp("([?&]" + t + "(?=[=&#]|$)[^#&]*|(?=#|$))"), "") : n.replace(RegExp("([?&]" + t + "(?=[=&#]|$)[^#&]*|(?=#|$))"), "&" + t + "=" + encodeURIComponent(i)).replace(/^([^?&]+)&/, "$1?")
    },
    setParamNoEncode: function(n, t, i) {
        return i == "" || i == null || i == 0 ? n.replace(RegExp("([?&]" + t + "(?=[=&#]|$)[^#&]*|(?=#|$))"), "") : n.replace(RegExp("([?&]" + t + "(?=[=&#]|$)[^#&]*|(?=#|$))"), "&" + t + "=" + i).replace(/^([^?&]+)&/, "$1?")
    },
    setGetParameter: function(n, t) {
        var i = window.location.href,
            u, r;
        return i.indexOf(n + "=") >= 0 ? (u = i.substring(0, i.indexOf(n)), r = i.substring(i.indexOf(n)), r = r.substring(r.indexOf("=") + 1), r = r.indexOf("&") >= 0 ? r.substring(r.indexOf("&")) : "", i = u + n + "=" + t + r) : i += i.indexOf("?") < 0 ? "?" + n + "=" + t : "&" + n + "=" + t, i
    },
    getAllUrlParams: function(n) {
        var r = n ? n.split("?")[1] : window.location.search.slice(1),
            t = {},
            f, u;
        if (r)
            for (r = r.split("#")[0], f = r.split("&"), u = 0; u < f.length; u++) {
                var e = f[u].split("="),
                    i = e[0],
                    o = typeof e[1] == "undefined" ? !0 : e[1];
                t[i] ? t[i] && typeof t[i] == "string" ? (t[i] = [t[i]], t[i].push(o)) : t[i].push(o) : t[i] = o
            }
        return t
    },
    closeTheLoadingModal: function() {
        try {
            setTimeout(function() {
                $("#product-warning-modal").magnificPopup("close");
                AjaxFilter.processSearch(!0)
            }, 1e3)
        } catch (n) {
            $(".searchProcess").hide()
        }
    }
};
$(document).ready(function() {
    $("body").prepend('<div class="searchProcess"><\/div><div class="clear"><\/div>');
    $(".searchProcess").hide();
    $("body").prepend('<div class="searchProduct"><\/div><div class="clear"><\/div>');
    $(".searchProduct").hide();
    $.each($("#products-orderby option"), function(n, t) {
        $(t).val(/orderby=(\d+)/.exec($(t).val())[1])
    });
    $.each($("#products-pagesize option"), function(n, t) {
        $(t).val(/pagesize=(\d+)/.exec($(t).val())[1])
    });
    $.each($("#products-viewmode option"), function(n, t) {
        $(t).val(/viewmode=(\w+)/.exec($(t).val())[1])
    });
    $("#products-orderby").prop("onchange", "").unbind("onchange").change(function() {
        $("#SortOption").val(this.value);
        $("#PageNumber").val(1);
        AjaxFilter.loadOnChange()
    });
    $("#products-pagesize").prop("onchange", "").unbind("onchange").change(function() {
        $("#PageSize").val(this.value);
        $("#PageNumber").val(1);
        AjaxFilter.loadOnChange()
    });
    $("#products-viewmode").prop("onchange", "").unbind("onchange").change(function() {
        $("#ViewMode").val(this.value);
        this.value !== "grid" ? ($(".product-grid").removeClass("product-grid").addClass("product-list"), $("#products-viewmode option[value=list]").attr("selected", "selected"), $("#ViewMode").val("list")) : ($(".product-list").removeClass("product-list").addClass("product-grid"), $("#products-viewmode option[value=grid]").attr("selected", "selected"), $("#ViewMode").val("grid"))
    });
    AjaxFilter.page()
});
AjaxFilterToggler = {
    toggleLeftPanel: function(n) {
        $(n).toggleClass("expand")
    },
    toggleAttributes: function(n) {
        $(n).toggleClass("expand")
    },
    toggleSpecificationsAttributes: function(n) {
        $(n).toggleClass("expand")
    }
};
/*! jQuery & Zepto Lazy v1.7.9 - http://jquery.eisbehr.de/lazy - MIT&GPL-2.0 license - Copyright 2012-2018 Daniel 'Eisbehr' Kern */
! function(n, t) {
    "use strict";

    function f(r, f, e, o, s) {
        function it() {
            ut = n.devicePixelRatio > 1;
            e = rt(e);
            f.delay >= 0 && setTimeout(function() {
                p(!0)
            }, f.delay);
            (f.delay < 0 || f.combined) && (o.e = lt(f.throttle, function(n) {
                "resize" === n.type && (w = b = -1);
                p(n.all)
            }), o.a = function(n) {
                n = rt(n);
                e.push.apply(e, n)
            }, o.g = function() {
                return e = i(e).filter(function() {
                    return !i(this).data(f.loadedName)
                })
            }, o.f = function(n) {
                for (var i, t = 0; t < n.length; t++) i = e.filter(function() {
                    return this === n[t]
                }), i.length && p(!1, i)
            }, p(), i(f.appendScroll).on("scroll." + s + " resize." + s, o.e))
        }

        function rt(n) {
            var v = f.defaultImage,
                p = f.placeholder,
                k = f.imageBase,
                s = f.srcsetAttribute,
                c = f.loaderAttribute,
                a = f._f || {},
                e, w;
            for (n = i(n).filter(function() {
                    var n = i(this),
                        r = g(this);
                    return !n.data(f.handledName) && (n.attr(f.attribute) || n.attr(s) || n.attr(c) || a[r] !== t)
                }).data("plugin_" + f.name, r), e = 0, w = n.length; e < w; e++) {
                var u = i(n[e]),
                    o = g(n[e]),
                    b = u.attr(f.imageBaseAttribute) || k;
                o === l && b && u.attr(s) && u.attr(s, ct(u.attr(s), b));
                a[o] === t || u.attr(c) || u.attr(c, a[o]);
                o === l && v && !u.attr(h) ? u.attr(h, v) : o === l || !p || u.css(y) && "none" !== u.css(y) || u.css(y, "url('" + p + "')")
            }
            return n
        }

        function p(n, t) {
            if (!e.length) return void(f.autoDestroy && r.destroy());
            for (var s = t || e, w = !1, nt = f.imageBase || "", b = f.srcsetAttribute, c = f.handledName, o = 0; o < s.length; o++)
                if (n || t || ot(s[o])) {
                    var u = i(s[o]),
                        a = g(s[o]),
                        v = u.attr(f.attribute),
                        p = u.attr(f.imageBaseAttribute) || nt,
                        d = u.attr(f.loaderAttribute);
                    !u.data(c) && (!f.visibleOnly || u.is(":visible")) && ((v || u.attr(b)) && (a === l && (p + v !== u.attr(h) || u.attr(b) !== u.attr(k)) || a !== l && p + v !== u.css(y)) || d) && (w = !0, u.data(c, !0), et(u, a, p, d))
                }
            w && (e = i(e).filter(function() {
                return !i(this).data(c)
            }))
        }

        function et(n, t, r, u) {
            var o, s, e, w;
            ++tt;
            o = function() {
                c("onError", n);
                nt();
                o = i.noop
            };
            c("beforeLoad", n);
            var b = f.attribute,
                g = f.srcsetAttribute,
                p = f.sizesAttribute,
                it = f.retinaAttribute,
                rt = f.removeAttribute,
                et = f.loadedName,
                ot = n.attr(it);
            if (u) s = function() {
                rt && n.removeAttr(f.loaderAttribute);
                n.data(et, !0);
                c(ft, n);
                setTimeout(nt, 1);
                s = i.noop
            }, n.off(v).one(v, o).one(a, s), c(u, n, function(t) {
                t ? (n.off(a), s()) : (n.off(v), o())
            }) || n.trigger(v);
            else {
                e = i(new Image);
                e.one(v, o).one(a, function() {
                    n.hide();
                    t === l ? n.attr(d, e.attr(d)).attr(k, e.attr(k)).attr(h, e.attr(h)) : n.css(y, "url('" + e.attr(h) + "')");
                    n[f.effect](f.effectTime);
                    rt && (n.removeAttr(b + " " + g + " " + it + " " + f.imageBaseAttribute), p !== d && n.removeAttr(p));
                    n.data(et, !0);
                    c(ft, n);
                    e.remove();
                    nt()
                });
                w = (ut && ot ? ot : n.attr(b)) || "";
                e.attr(d, n.attr(p)).attr(k, n.attr(g)).attr(h, w ? r + w : null);
                e.complete && e.trigger(a)
            }
        }

        function ot(n) {
            var t = n.getBoundingClientRect(),
                r = f.scrollDirection,
                i = f.threshold,
                u = ht() + i > t.top && -i < t.bottom,
                e = st() + i > t.left && -i < t.right;
            return "vertical" === r ? u : "horizontal" === r ? e : u && e
        }

        function st() {
            return w >= 0 ? w : w = i(n).width()
        }

        function ht() {
            return b >= 0 ? b : b = i(n).height()
        }

        function g(n) {
            return n.tagName.toLowerCase()
        }

        function ct(n, t) {
            var r, i, u;
            if (t)
                for (r = n.split(","), n = "", i = 0, u = r.length; i < u; i++) n += t + r[i].trim() + (i !== u - 1 ? "," : "");
            return n
        }

        function lt(n, t) {
            var i, u = 0;
            return function(e, o) {
                function s() {
                    u = +new Date;
                    t.call(r, e)
                }
                var h = +new Date - u;
                i && clearTimeout(i);
                h > n || !f.enableThrottle || o ? s() : i = setTimeout(s, n - h)
            }
        }

        function nt() {
            --tt;
            e.length || tt || c("onFinishedAll")
        }

        function c(n) {
            return !!(n = f[n]) && (n.apply(r, [].slice.call(arguments, 1)), !0)
        }
        var tt = 0,
            w = -1,
            b = -1,
            ut = !1,
            ft = "afterLoad",
            a = "load",
            v = "error",
            l = "img",
            h = "src",
            k = "srcset",
            d = "sizes",
            y = "background-image";
        "event" === f.bind || u ? it() : i(n).on(a + "." + s, it)
    }

    function r(r, u) {
        var o = this,
            h = i.extend({}, o.config, u),
            s = {},
            c = h.name + "-" + ++e;
        return o.config = function(n, i) {
            return i === t ? h[n] : (h[n] = i, o)
        }, o.addItems = function(n) {
            return s.a && s.a("string" === i.type(n) ? i(n) : n), o
        }, o.getItems = function() {
            return s.g ? s.g() : {}
        }, o.update = function(n) {
            return s.e && s.e({}, !n), o
        }, o.force = function(n) {
            return s.f && s.f("string" === i.type(n) ? i(n) : n), o
        }, o.loadAll = function() {
            return s.e && s.e({
                all: !0
            }, !0), o
        }, o.destroy = function() {
            return i(h.appendScroll).off("." + c, s.e), i(n).off("." + c), s = {}, t
        }, f(o, h, r, s, c), h.chainable ? r : o
    }
    var i = n.jQuery || n.Zepto,
        e = 0,
        u = !1;
    i.fn.Lazy = i.fn.lazy = function(n) {
        return new r(this, n)
    };
    i.Lazy = i.lazy = function(n, u, f) {
        var s, h;
        if (i.isFunction(u) && (f = u, u = []), i.isFunction(f)) {
            n = i.isArray(n) ? n : [n];
            u = i.isArray(u) ? u : [u];
            for (var e = r.prototype.config, c = e._f || (e._f = {}), o = 0, l = n.length; o < l; o++)(e[n[o]] === t || i.isFunction(e[n[o]])) && (e[n[o]] = f);
            for (s = 0, h = u.length; s < h; s++) c[u[s]] = n[0]
        }
    };
    r.prototype.config = {
        name: "lazy",
        chainable: !0,
        autoDestroy: !0,
        bind: "load",
        threshold: 500,
        visibleOnly: !1,
        appendScroll: n,
        scrollDirection: "both",
        imageBase: null,
        defaultImage: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
        placeholder: null,
        delay: -1,
        combined: !1,
        attribute: "data-src",
        srcsetAttribute: "data-srcset",
        sizesAttribute: "data-sizes",
        retinaAttribute: "data-retina",
        loaderAttribute: "data-loader",
        imageBaseAttribute: "data-imagebase",
        removeAttribute: !0,
        handledName: "handled",
        loadedName: "loaded",
        effect: "show",
        effectTime: 0,
        enableThrottle: !0,
        throttle: 250,
        beforeLoad: t,
        afterLoad: t,
        onError: t,
        onFinishedAll: t
    };
    i(n).on("load", function() {
        u = !0
    })
}(window);
/*! jQuery Validation Plugin - v1.11.1 - 3/22/2013\n* https://github.com/jzaefferer/jquery-validation
 * Copyright (c) 2013 JÃ¶rn Zaefferer; Licensed MIT */
(function(n) {
    n.extend(n.fn, {
        validate: function(t) {
            if (!this.length) return t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."), void 0;
            var i = n.data(this[0], "validator");
            return i ? i : (this.attr("novalidate", "novalidate"), i = new n.validator(t, this[0]), n.data(this[0], "validator", i), i.settings.onsubmit && (this.validateDelegate(":submit", "click", function(t) {
                i.settings.submitHandler && (i.submitButton = t.target);
                n(t.target).hasClass("cancel") && (i.cancelSubmit = !0);
                void 0 !== n(t.target).attr("formnovalidate") && (i.cancelSubmit = !0)
            }), this.submit(function(t) {
                function r() {
                    var r;
                    return i.settings.submitHandler ? (i.submitButton && (r = n("<input type='hidden'/>").attr("name", i.submitButton.name).val(n(i.submitButton).val()).appendTo(i.currentForm)), i.settings.submitHandler.call(i, i.currentForm, t), i.submitButton && r.remove(), !1) : !0
                }
                return i.settings.debug && t.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, r()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : r() : (i.focusInvalid(), !1)
            })), i)
        },
        valid: function() {
            if (n(this[0]).is("form")) return this.validate().form();
            var t = !0,
                i = n(this[0].form).validate();
            return this.each(function() {
                t = t && i.element(this)
            }), t
        },
        removeAttrs: function(t) {
            var i = {},
                r = this;
            return n.each(t.split(/\s/), function(n, t) {
                i[t] = r.attr(t);
                r.removeAttr(t)
            }), i
        },
        rules: function(t, i) {
            var r = this[0],
                o, u, h;
            if (t) {
                var e = n.data(r.form, "validator").settings,
                    s = e.rules,
                    f = n.validator.staticRules(r);
                switch (t) {
                    case "add":
                        n.extend(f, n.validator.normalizeRule(i));
                        delete f.messages;
                        s[r.name] = f;
                        i.messages && (e.messages[r.name] = n.extend(e.messages[r.name], i.messages));
                        break;
                    case "remove":
                        return i ? (o = {}, n.each(i.split(/\s/), function(n, t) {
                            o[t] = f[t];
                            delete f[t]
                        }), o) : (delete s[r.name], f)
                }
            }
            return u = n.validator.normalizeRules(n.extend({}, n.validator.classRules(r), n.validator.attributeRules(r), n.validator.dataRules(r), n.validator.staticRules(r)), r), u.required && (h = u.required, delete u.required, u = n.extend({
                required: h
            }, u)), u
        }
    });
    n.extend(n.expr[":"], {
        blank: function(t) {
            return !n.trim("" + n(t).val())
        },
        filled: function(t) {
            return !!n.trim("" + n(t).val())
        },
        unchecked: function(t) {
            return !n(t).prop("checked")
        }
    });
    n.validator = function(t, i) {
        this.settings = n.extend(!0, {}, n.validator.defaults, t);
        this.currentForm = i;
        this.init()
    };
    n.validator.format = function(t, i) {
        return 1 === arguments.length ? function() {
            var i = n.makeArray(arguments);
            return i.unshift(t), n.validator.format.apply(this, i)
        } : (arguments.length > 2 && i.constructor !== Array && (i = n.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), n.each(i, function(n, i) {
            t = t.replace(RegExp("\\{" + n + "\\}", "g"), function() {
                return i
            })
        }), t)
    };
    n.extend(n.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusInvalid: !0,
            errorContainer: n([]),
            errorLabelContainer: n([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(n) {
                this.lastActive = n;
                this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, n, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(n)).hide())
            },
            onfocusout: function(n) {
                !this.checkable(n) && (n.name in this.submitted || !this.optional(n)) && this.element(n)
            },
            onkeyup: function(n, t) {
                (9 !== t.which || "" !== this.elementValue(n)) && (n.name in this.submitted || n === this.lastElement) && this.element(n)
            },
            onclick: function(n) {
                n.name in this.submitted ? this.element(n) : n.parentNode.name in this.submitted && this.element(n.parentNode)
            },
            highlight: function(t, i, r) {
                "radio" === t.type ? this.findByName(t.name).addClass(i).removeClass(r) : n(t).addClass(i).removeClass(r)
            },
            unhighlight: function(t, i, r) {
                "radio" === t.type ? this.findByName(t.name).removeClass(i).addClass(r) : n(t).removeClass(i).addClass(r)
            }
        },
        setDefaults: function(t) {
            n.extend(n.validator.defaults, t)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: n.validator.format("Please enter no more than {0} characters."),
            minlength: n.validator.format("Please enter at least {0} characters."),
            rangelength: n.validator.format("Please enter a value between {0} and {1} characters long."),
            range: n.validator.format("Please enter a value between {0} and {1}."),
            max: n.validator.format("Please enter a value less than or equal to {0}."),
            min: n.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function i(t) {
                    var i = n.data(this[0].form, "validator"),
                        r = "on" + t.type.replace(/^validate/, "");
                    i.settings[r] && i.settings[r].call(i, this[0], t)
                }
                var r, t;
                this.labelContainer = n(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || n(this.currentForm);
                this.containers = n(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
                r = this.groups = {};
                n.each(this.settings.groups, function(t, i) {
                    "string" == typeof i && (i = i.split(/\s/));
                    n.each(i, function(n, i) {
                        r[i] = t
                    })
                });
                t = this.settings.rules;
                n.each(t, function(i, r) {
                    t[i] = n.validator.normalizeRule(r)
                });
                n(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", i).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", i);
                this.settings.invalidHandler && n(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
            },
            form: function() {
                return this.checkForm(), n.extend(this.submitted, this.errorMap), this.invalid = n.extend({}, this.errorMap), this.valid() || n(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var n = 0, t = this.currentElements = this.elements(); t[n]; n++) this.check(t[n]);
                return this.valid()
            },
            element: function(t) {
                t = this.validationTargetFor(this.clean(t));
                this.lastElement = t;
                this.prepareElement(t);
                this.currentElements = n(t);
                var i = this.check(t) !== !1;
                return i ? delete this.invalid[t.name] : this.invalid[t.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), i
            },
            showErrors: function(t) {
                if (t) {
                    n.extend(this.errorMap, t);
                    this.errorList = [];
                    for (var i in t) this.errorList.push({
                        message: t[i],
                        element: this.findByName(i)[0]
                    });
                    this.successList = n.grep(this.successList, function(n) {
                        return !(n.name in t)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                n.fn.resetForm && n(this.currentForm).resetForm();
                this.submitted = {};
                this.lastElement = null;
                this.prepareForm();
                this.hideErrors();
                this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(n) {
                var t = 0;
                for (var i in n) t++;
                return t
            },
            hideErrors: function() {
                this.addWrapper(this.toHide).hide()
            },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    n(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (t) {}
            },
            findLastActive: function() {
                var t = this.lastActive;
                return t && 1 === n.grep(this.errorList, function(n) {
                    return n.element.name === t.name
                }).length && t
            },
            elements: function() {
                var t = this,
                    i = {};
                return n(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                    return !this.name && t.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in i || !t.objectLength(n(this).rules()) ? !1 : (i[this.name] = !0, !0)
                })
            },
            clean: function(t) {
                return n(t)[0]
            },
            errors: function() {
                var t = this.settings.errorClass.replace(" ", ".");
                return n(this.settings.errorElement + "." + t, this.errorContext)
            },
            reset: function() {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = n([]);
                this.toHide = n([]);
                this.currentElements = n([])
            },
            prepareForm: function() {
                this.reset();
                this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(n) {
                this.reset();
                this.toHide = this.errorsFor(n)
            },
            elementValue: function(t) {
                var r = n(t).attr("type"),
                    i = n(t).val();
                return "radio" === r || "checkbox" === r ? n("input[name='" + n(t).attr("name") + "']:checked").val() : "string" == typeof i ? i.replace(/\r/g, "") : i
            },
            check: function(t) {
                var r, u;
                t = this.validationTargetFor(this.clean(t));
                var i, f = n(t).rules(),
                    e = !1,
                    s = this.elementValue(t);
                for (r in f) {
                    u = {
                        method: r,
                        parameters: f[r]
                    };
                    try {
                        if (i = n.validator.methods[r].call(this, s, t, u.parameters), "dependency-mismatch" === i) {
                            e = !0;
                            continue
                        }
                        if (e = !1, "pending" === i) return this.toHide = this.toHide.not(this.errorsFor(t)), void 0;
                        if (!i) return this.formatAndAdd(t, u), !1
                    } catch (o) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + u.method + "' method.", o), o;
                    }
                }
                if (!e) return (this.objectLength(f) && this.successList.push(t), !0)
            },
            customDataMessage: function(t, i) {
                return n(t).data("msg-" + i.toLowerCase()) || t.attributes && n(t).attr("data-msg-" + i.toLowerCase())
            },
            customMessage: function(n, t) {
                var i = this.settings.messages[n];
                return i && (i.constructor === String ? i : i[t])
            },
            findDefined: function() {
                for (var n = 0; arguments.length > n; n++)
                    if (void 0 !== arguments[n]) return arguments[n];
                return void 0
            },
            defaultMessage: function(t, i) {
                return this.findDefined(this.customMessage(t.name, i), this.customDataMessage(t, i), !this.settings.ignoreTitle && t.title || void 0, n.validator.messages[i], "<strong>Warning: No message defined for " + t.name + "<\/strong>")
            },
            formatAndAdd: function(t, i) {
                var r = this.defaultMessage(t, i.method),
                    u = /\$?\{(\d+)\}/g;
                "function" == typeof r ? r = r.call(this, i.parameters, t) : u.test(r) && (r = n.validator.format(r.replace(u, "{$1}"), i.parameters));
                this.errorList.push({
                    message: r,
                    element: t
                });
                this.errorMap[t.name] = r;
                this.submitted[t.name] = r
            },
            addWrapper: function(n) {
                return this.settings.wrapper && (n = n.add(n.parent(this.settings.wrapper))), n
            },
            defaultShowErrors: function() {
                for (var i, t, n = 0; this.errorList[n]; n++) t = this.errorList[n], this.settings.highlight && this.settings.highlight.call(this, t.element, this.settings.errorClass, this.settings.validClass), this.showLabel(t.element, t.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (n = 0; this.successList[n]; n++) this.showLabel(this.successList[n]);
                if (this.settings.unhighlight)
                    for (n = 0, i = this.validElements(); i[n]; n++) this.settings.unhighlight.call(this, i[n], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return n(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(t, i) {
                var r = this.errorsFor(t);
                r.length ? (r.removeClass(this.settings.validClass).addClass(this.settings.errorClass), r.html(i)) : (r = n("<" + this.settings.errorElement + ">").attr("for", this.idOrName(t)).addClass(this.settings.errorClass).html(i || ""), this.settings.wrapper && (r = r.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(r).length || (this.settings.errorPlacement ? this.settings.errorPlacement(r, n(t)) : r.insertAfter(t)));
                !i && this.settings.success && (r.text(""), "string" == typeof this.settings.success ? r.addClass(this.settings.success) : this.settings.success(r, t));
                this.toShow = this.toShow.add(r)
            },
            errorsFor: function(t) {
                var i = this.idOrName(t);
                return this.errors().filter(function() {
                    return n(this).attr("for") === i
                })
            },
            idOrName: function(n) {
                return this.groups[n.name] || (this.checkable(n) ? n.name : n.id || n.name)
            },
            validationTargetFor: function(n) {
                return this.checkable(n) && (n = this.findByName(n.name).not(this.settings.ignore)[0]), n
            },
            checkable: function(n) {
                return /radio|checkbox/i.test(n.type)
            },
            findByName: function(t) {
                return n(this.currentForm).find("[name='" + t + "']")
            },
            getLength: function(t, i) {
                switch (i.nodeName.toLowerCase()) {
                    case "select":
                        return n("option:selected", i).length;
                    case "input":
                        if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length
                }
                return t.length
            },
            depend: function(n, t) {
                return this.dependTypes[typeof n] ? this.dependTypes[typeof n](n, t) : !0
            },
            dependTypes: {
                boolean: function(n) {
                    return n
                },
                string: function(t, i) {
                    return !!n(t, i.form).length
                },
                "function": function(n, t) {
                    return n(t)
                }
            },
            optional: function(t) {
                var i = this.elementValue(t);
                return !n.validator.methods.required.call(this, i, t) && "dependency-mismatch"
            },
            startRequest: function(n) {
                this.pending[n.name] || (this.pendingRequest++, this.pending[n.name] = !0)
            },
            stopRequest: function(t, i) {
                this.pendingRequest--;
                0 > this.pendingRequest && (this.pendingRequest = 0);
                delete this.pending[t.name];
                i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (n(this.currentForm).submit(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (n(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function(t) {
                return n.data(t, "previousValue") || n.data(t, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(t, "remote")
                })
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(t, i) {
            t.constructor === String ? this.classRuleSettings[t] = i : n.extend(this.classRuleSettings, t)
        },
        classRules: function(t) {
            var i = {},
                r = n(t).attr("class");
            return r && n.each(r.split(" "), function() {
                this in n.validator.classRuleSettings && n.extend(i, n.validator.classRuleSettings[this])
            }), i
        },
        attributeRules: function(t) {
            var u = {},
                e = n(t),
                f = e[0].getAttribute("type"),
                r, i;
            for (r in n.validator.methods) "required" === r ? (i = e.get(0).getAttribute(r), "" === i && (i = !0), i = !!i) : i = e.attr(r), /min|max/.test(r) && (null === f || /number|range|text/.test(f)) && (i = Number(i)), i ? u[r] = i : f === r && "range" !== f && (u[r] = !0);
            return u.maxlength && /-1|2147483647|524288/.test(u.maxlength) && delete u.maxlength, u
        },
        dataRules: function(t) {
            var i, r, u = {},
                f = n(t);
            for (i in n.validator.methods) r = f.data("rule-" + i.toLowerCase()), void 0 !== r && (u[i] = r);
            return u
        },
        staticRules: function(t) {
            var i = {},
                r = n.data(t.form, "validator");
            return r.settings.rules && (i = n.validator.normalizeRule(r.settings.rules[t.name]) || {}), i
        },
        normalizeRules: function(t, i) {
            return n.each(t, function(r, u) {
                if (u === !1) return delete t[r], void 0;
                if (u.param || u.depends) {
                    var f = !0;
                    switch (typeof u.depends) {
                        case "string":
                            f = !!n(u.depends, i.form).length;
                            break;
                        case "function":
                            f = u.depends.call(i, i)
                    }
                    f ? t[r] = void 0 !== u.param ? u.param : !0 : delete t[r]
                }
            }), n.each(t, function(r, u) {
                t[r] = n.isFunction(u) ? u(i) : u
            }), n.each(["minlength", "maxlength"], function() {
                t[this] && (t[this] = Number(t[this]))
            }), n.each(["rangelength", "range"], function() {
                var i;
                t[this] && (n.isArray(t[this]) ? t[this] = [Number(t[this][0]), Number(t[this][1])] : "string" == typeof t[this] && (i = t[this].split(/[\s,]+/), t[this] = [Number(i[0]), Number(i[1])]))
            }), n.validator.autoCreateRanges && (t.min && t.max && (t.range = [t.min, t.max], delete t.min, delete t.max), t.minlength && t.maxlength && (t.rangelength = [t.minlength, t.maxlength], delete t.minlength, delete t.maxlength)), t
        },
        normalizeRule: function(t) {
            if ("string" == typeof t) {
                var i = {};
                n.each(t.split(/\s/), function() {
                    i[this] = !0
                });
                t = i
            }
            return t
        },
        addMethod: function(t, i, r) {
            n.validator.methods[t] = i;
            n.validator.messages[t] = void 0 !== r ? r : n.validator.messages[t];
            3 > i.length && n.validator.addClassRules(t, n.validator.normalizeRule(t))
        },
        methods: {
            required: function(t, i, r) {
                if (!this.depend(r, i)) return "dependency-mismatch";
                if ("select" === i.nodeName.toLowerCase()) {
                    var u = n(i).val();
                    return u && u.length > 0
                }
                return this.checkable(i) ? this.getLength(t, i) > 0 : n.trim(t).length > 0
            },
            email: function(n, t) {
                return this.optional(t) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(n)
            },
            url: function(n, t) {
                return this.optional(t) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(n)
            },
            date: function(n, t) {
                return this.optional(t) || !/Invalid|NaN/.test("" + new Date(n))
            },
            dateISO: function(n, t) {
                return this.optional(t) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(n)
            },
            number: function(n, t) {
                return this.optional(t) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(n)
            },
            digits: function(n, t) {
                return this.optional(t) || /^\d+$/.test(n)
            },
            creditcard: function(n, t) {
                var r, e;
                if (this.optional(t)) return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(n)) return !1;
                var f = 0,
                    i = 0,
                    u = !1;
                for (n = n.replace(/\D/g, ""), r = n.length - 1; r >= 0; r--) e = n.charAt(r), i = parseInt(e, 10), u && (i *= 2) > 9 && (i -= 9), f += i, u = !u;
                return 0 == f % 10
            },
            minlength: function(t, i, r) {
                var u = n.isArray(t) ? t.length : this.getLength(n.trim(t), i);
                return this.optional(i) || u >= r
            },
            maxlength: function(t, i, r) {
                var u = n.isArray(t) ? t.length : this.getLength(n.trim(t), i);
                return this.optional(i) || r >= u
            },
            rangelength: function(t, i, r) {
                var u = n.isArray(t) ? t.length : this.getLength(n.trim(t), i);
                return this.optional(i) || u >= r[0] && r[1] >= u
            },
            min: function(n, t, i) {
                return this.optional(t) || n >= i
            },
            max: function(n, t, i) {
                return this.optional(t) || i >= n
            },
            range: function(n, t, i) {
                return this.optional(t) || n >= i[0] && i[1] >= n
            },
            equalTo: function(t, i, r) {
                var u = n(r);
                return this.settings.onfocusout && u.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                    n(i).valid()
                }), t === u.val()
            },
            remote: function(t, i, r) {
                var f, u, e;
                return this.optional(i) ? "dependency-mismatch" : (f = this.previousValue(i), this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), f.originalMessage = this.settings.messages[i.name].remote, this.settings.messages[i.name].remote = f.message, r = "string" == typeof r && {
                    url: r
                } || r, f.old === t) ? f.valid : (f.old = t, u = this, this.startRequest(i), e = {}, e[i.name] = t, n.ajax(n.extend(!0, {
                    url: r,
                    mode: "abort",
                    port: "validate" + i.name,
                    dataType: "json",
                    data: e,
                    success: function(r) {
                        var e, h, s, o;
                        u.settings.messages[i.name].remote = f.originalMessage;
                        e = r === !0 || "true" === r;
                        e ? (h = u.formSubmitted, u.prepareElement(i), u.formSubmitted = h, u.successList.push(i), delete u.invalid[i.name], u.showErrors()) : (s = {}, o = r || u.defaultMessage(i, "remote"), s[i.name] = f.message = n.isFunction(o) ? o(t) : o, u.invalid[i.name] = !0, u.showErrors(s));
                        f.valid = e;
                        u.stopRequest(i, e)
                    }
                }, r)), "pending")
            }
        }
    });
    n.format = n.validator.format
})(jQuery),
function(n) {
    var t = {},
        i;
    n.ajaxPrefilter ? n.ajaxPrefilter(function(n, i, r) {
        var u = n.port;
        "abort" === n.mode && (t[u] && t[u].abort(), t[u] = r)
    }) : (i = n.ajax, n.ajax = function(r) {
        var f = ("mode" in r ? r : n.ajaxSettings).mode,
            u = ("port" in r ? r : n.ajaxSettings).port;
        return "abort" === f ? (t[u] && t[u].abort(), t[u] = i.apply(this, arguments), t[u]) : i.apply(this, arguments)
    })
}(jQuery),
function(n) {
    n.extend(n.fn, {
        validateDelegate: function(t, i, r) {
            return this.bind(i, function(i) {
                var u = n(i.target);
                if (u.is(t)) return r.apply(u, arguments)
            })
        }
    })
}(jQuery),
function(n) {
    function i(n, t, i) {
        n.rules[t] = i;
        n.message && (n.messages[t] = n.message)
    }

    function h(n) {
        return n.replace(/^\s+|\s+$/g, "").split(/\s*,\s*/g)
    }

    function f(n) {
        return n.replace(/([!"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~])/g, "\\$1")
    }

    function e(n) {
        return n.substr(0, n.lastIndexOf(".") + 1)
    }

    function o(n, t) {
        return n.indexOf("*.") === 0 && (n = n.replace("*.", t)), n
    }

    function c(t, i) {
        var r = n(this).find("[data-valmsg-for='" + f(i[0].name) + "']"),
            u = r.attr("data-valmsg-replace"),
            e = u ? n.parseJSON(u) !== !1 : null;
        r.removeClass("field-validation-valid").addClass("field-validation-error");
        t.data("unobtrusiveContainer", r);
        e ? (r.empty(), t.removeClass("input-validation-error").appendTo(r)) : t.hide()
    }

    function l(t, i) {
        var u = n(this).find("[data-valmsg-summary=true]"),
            r = u.find("ul");
        r && r.length && i.errorList.length && (r.empty(), u.addClass("validation-summary-errors").removeClass("validation-summary-valid"), n.each(i.errorList, function() {
            n("<li />").html(this.message).appendTo(r)
        }))
    }

    function a(t) {
        var i = t.data("unobtrusiveContainer"),
            r = i.attr("data-valmsg-replace"),
            u = r ? n.parseJSON(r) : null;
        i && (i.addClass("field-validation-valid").removeClass("field-validation-error"), t.removeData("unobtrusiveContainer"), u && i.empty())
    }

    function v() {
        var t = n(this);
        t.data("validator").resetForm();
        t.find(".validation-summary-errors").addClass("validation-summary-valid").removeClass("validation-summary-errors");
        t.find(".field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error").removeData("unobtrusiveContainer").find(">*").removeData("unobtrusiveContainer")
    }

    function s(t) {
        var i = n(t),
            r = i.data(u),
            f = n.proxy(v, t);
        return r || (r = {
            options: {
                errorClass: "input-validation-error",
                errorElement: "span",
                errorPlacement: n.proxy(c, t),
                invalidHandler: n.proxy(l, t),
                messages: {},
                rules: {},
                success: n.proxy(a, t)
            },
            attachValidation: function() {
                i.unbind("reset." + u, f).bind("reset." + u, f).validate(this.options)
            },
            validate: function() {
                return i.validate(), i.valid()
            }
        }, i.data(u, r)), r
    }
    var r = n.validator,
        t, u = "unobtrusiveValidation";
    r.unobtrusive = {
        adapters: [],
        parseElement: function(t, i) {
            var u = n(t),
                f = u.parents("form")[0],
                r, e, o;
            f && (r = s(f), r.options.rules[t.name] = e = {}, r.options.messages[t.name] = o = {}, n.each(this.adapters, function() {
                var i = "data-val-" + this.name,
                    r = u.attr(i),
                    s = {};
                r !== undefined && (i += "-", n.each(this.params, function() {
                    s[this] = u.attr(i + this)
                }), this.adapt({
                    element: t,
                    form: f,
                    message: r,
                    params: s,
                    rules: e,
                    messages: o
                }))
            }), n.extend(e, {
                __dummy__: !0
            }), i || r.attachValidation())
        },
        parse: function(t) {
            var i = n(t).parents("form").andSelf().add(n(t).find("form")).filter("form");
            n(t).find(":input").filter("[data-val=true]").each(function() {
                r.unobtrusive.parseElement(this, !0)
            });
            i.each(function() {
                var n = s(this);
                n && n.attachValidation()
            })
        }
    };
    t = r.unobtrusive.adapters;
    t.add = function(n, t, i) {
        return i || (i = t, t = []), this.push({
            name: n,
            params: t,
            adapt: i
        }), this
    };
    t.addBool = function(n, t) {
        return this.add(n, function(r) {
            i(r, t || n, !0)
        })
    };
    t.addMinMax = function(n, t, r, u, f, e) {
        return this.add(n, [f || "min", e || "max"], function(n) {
            var f = n.params.min,
                e = n.params.max;
            f && e ? i(n, u, [f, e]) : f ? i(n, t, f) : e && i(n, r, e)
        })
    };
    t.addSingleVal = function(n, t, r) {
        return this.add(n, [t || "val"], function(u) {
            i(u, r || n, u.params[t])
        })
    };
    r.addMethod("__dummy__", function() {
        return !0
    });
    r.addMethod("regex", function(n, t, i) {
        var r;
        return this.optional(t) ? !0 : (r = new RegExp(i).exec(n), r && r.index === 0 && r[0].length === n.length)
    });
    r.addMethod("nonalphamin", function(n, t, i) {
        var r;
        return i && (r = n.match(/\W/g), r = r && r.length >= i), r
    });
    r.methods.extension ? (t.addSingleVal("accept", "mimtype"), t.addSingleVal("extension", "extension")) : t.addSingleVal("extension", "extension", "accept");
    t.addSingleVal("regex", "pattern");
    t.addBool("creditcard").addBool("date").addBool("digits").addBool("email").addBool("number").addBool("url");
    t.addMinMax("length", "minlength", "maxlength", "rangelength").addMinMax("range", "min", "max", "range");
    t.add("equalto", ["other"], function(t) {
        var r = e(t.element.name),
            u = t.params.other,
            s = o(u, r),
            h = n(t.form).find(":input").filter("[name='" + f(s) + "']")[0];
        i(t, "equalTo", h)
    });
    t.add("required", function(n) {
        (n.element.tagName.toUpperCase() !== "INPUT" || n.element.type.toUpperCase() !== "CHECKBOX") && i(n, "required", !0)
    });
    t.add("remote", ["url", "type", "additionalfields"], function(t) {
        var r = {
                url: t.params.url,
                type: t.params.type || "GET",
                data: {}
            },
            u = e(t.element.name);
        n.each(h(t.params.additionalfields || t.element.name), function(i, e) {
            var s = o(e, u);
            r.data[s] = function() {
                return n(t.form).find(":input").filter("[name='" + f(s) + "']").val()
            }
        });
        i(t, "remote", r)
    });
    t.add("password", ["min", "nonalphamin", "regex"], function(n) {
        n.params.min && i(n, "minlength", n.params.min);
        n.params.nonalphamin && i(n, "nonalphamin", n.params.nonalphamin);
        n.params.regex && i(n, "regex", n.params.regex)
    });
    n(function() {
        r.unobtrusive.parse(document)
    })
}(jQuery);
/*! jQuery UI - v1.10.3 - 2013-10-20
 * http://jqueryui.com
 * Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.resizable.js, jquery.ui.selectable.js, jquery.ui.sortable.js, jquery.ui.accordion.js, jquery.ui.autocomplete.js, jquery.ui.button.js, jquery.ui.datepicker.js, jquery.ui.dialog.js, jquery.ui.menu.js, jquery.ui.progressbar.js, jquery.ui.slider.js, jquery.ui.spinner.js, jquery.ui.tabs.js, jquery.ui.tooltip.js, jquery.ui.effect.js, jquery.ui.effect-blind.js, jquery.ui.effect-bounce.js, jquery.ui.effect-clip.js, jquery.ui.effect-drop.js, jquery.ui.effect-explode.js, jquery.ui.effect-fade.js, jquery.ui.effect-fold.js, jquery.ui.effect-highlight.js, jquery.ui.effect-pulsate.js, jquery.ui.effect-scale.js, jquery.ui.effect-shake.js, jquery.ui.effect-slide.js, jquery.ui.effect-transfer.js
 * Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(n, t) {
    function i(t, i) {
        var u, f, e, o = t.nodeName.toLowerCase();
        return "area" === o ? (u = t.parentNode, f = u.name, t.href && f && "map" === u.nodeName.toLowerCase() ? (e = n("img[usemap=#" + f + "]")[0], !!e && r(e)) : !1) : (/input|select|textarea|button|object/.test(o) ? !t.disabled : "a" === o ? t.href || i : i) && r(t)
    }

    function r(t) {
        return n.expr.filters.visible(t) && !n(t).parents().addBack().filter(function() {
            return "hidden" === n.css(this, "visibility")
        }).length
    }
    var u = 0,
        f = /^ui-id-\d+$/;
    n.ui = n.ui || {};
    n.extend(n.ui, {
        version: "1.10.3",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    });
    n.fn.extend({
        focus: function(t) {
            return function(i, r) {
                return "number" == typeof i ? this.each(function() {
                    var t = this;
                    setTimeout(function() {
                        n(t).focus();
                        r && r.call(t)
                    }, i)
                }) : t.apply(this, arguments)
            }
        }(n.fn.focus),
        scrollParent: function() {
            var t;
            return t = n.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(n.css(this, "position")) && /(auto|scroll)/.test(n.css(this, "overflow") + n.css(this, "overflow-y") + n.css(this, "overflow-x"))
            }).eq(0) : this.parents().filter(function() {
                return /(auto|scroll)/.test(n.css(this, "overflow") + n.css(this, "overflow-y") + n.css(this, "overflow-x"))
            }).eq(0), /fixed/.test(this.css("position")) || !t.length ? n(document) : t
        },
        zIndex: function(i) {
            if (i !== t) return this.css("zIndex", i);
            if (this.length)
                for (var u, f, r = n(this[0]); r.length && r[0] !== document;) {
                    if (u = r.css("position"), ("absolute" === u || "relative" === u || "fixed" === u) && (f = parseInt(r.css("zIndex"), 10), !isNaN(f) && 0 !== f)) return f;
                    r = r.parent()
                }
            return 0
        },
        uniqueId: function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++u)
            })
        },
        removeUniqueId: function() {
            return this.each(function() {
                f.test(this.id) && n(this).removeAttr("id")
            })
        }
    });
    n.extend(n.expr[":"], {
        data: n.expr.createPseudo ? n.expr.createPseudo(function(t) {
            return function(i) {
                return !!n.data(i, t)
            }
        }) : function(t, i, r) {
            return !!n.data(t, r[3])
        },
        focusable: function(t) {
            return i(t, !isNaN(n.attr(t, "tabindex")))
        },
        tabbable: function(t) {
            var r = n.attr(t, "tabindex"),
                u = isNaN(r);
            return (u || r >= 0) && i(t, !u)
        }
    });
    n("<a>").outerWidth(1).jquery || n.each(["Width", "Height"], function(i, r) {
        function u(t, i, r, u) {
            return n.each(o, function() {
                i -= parseFloat(n.css(t, "padding" + this)) || 0;
                r && (i -= parseFloat(n.css(t, "border" + this + "Width")) || 0);
                u && (i -= parseFloat(n.css(t, "margin" + this)) || 0)
            }), i
        }
        var o = "Width" === r ? ["Left", "Right"] : ["Top", "Bottom"],
            f = r.toLowerCase(),
            e = {
                innerWidth: n.fn.innerWidth,
                innerHeight: n.fn.innerHeight,
                outerWidth: n.fn.outerWidth,
                outerHeight: n.fn.outerHeight
            };
        n.fn["inner" + r] = function(i) {
            return i === t ? e["inner" + r].call(this) : this.each(function() {
                n(this).css(f, u(this, i) + "px")
            })
        };
        n.fn["outer" + r] = function(t, i) {
            return "number" != typeof t ? e["outer" + r].call(this, t) : this.each(function() {
                n(this).css(f, u(this, t, !0, i) + "px")
            })
        }
    });
    n.fn.addBack || (n.fn.addBack = function(n) {
        return this.add(null == n ? this.prevObject : this.prevObject.filter(n))
    });
    n("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (n.fn.removeData = function(t) {
        return function(i) {
            return arguments.length ? t.call(this, n.camelCase(i)) : t.call(this)
        }
    }(n.fn.removeData));
    n.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    n.support.selectstart = "onselectstart" in document.createElement("div");
    n.fn.extend({
        disableSelection: function() {
            return this.bind((n.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(n) {
                n.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    });
    n.extend(n.ui, {
        plugin: {
            add: function(t, i, r) {
                var u, f = n.ui[t].prototype;
                for (u in r) f.plugins[u] = f.plugins[u] || [], f.plugins[u].push([i, r[u]])
            },
            call: function(n, t, i) {
                var r, u = n.plugins[t];
                if (u && n.element[0].parentNode && 11 !== n.element[0].parentNode.nodeType)
                    for (r = 0; u.length > r; r++) n.options[u[r][0]] && u[r][1].apply(n.element, i)
            }
        },
        hasScroll: function(t, i) {
            if ("hidden" === n(t).css("overflow")) return !1;
            var r = i && "left" === i ? "scrollLeft" : "scrollTop",
                u = !1;
            return t[r] > 0 ? !0 : (t[r] = 1, u = t[r] > 0, t[r] = 0, u)
        }
    })
})(jQuery),
function(n, t) {
    var r = 0,
        i = Array.prototype.slice,
        u = n.cleanData;
    n.cleanData = function(t) {
        for (var i, r = 0; null != (i = t[r]); r++) try {
            n(i).triggerHandler("remove")
        } catch (f) {}
        u(t)
    };
    n.widget = function(i, r, u) {
        var h, e, f, s, c = {},
            o = i.split(".")[0];
        i = i.split(".")[1];
        h = o + "-" + i;
        u || (u = r, r = n.Widget);
        n.expr[":"][h.toLowerCase()] = function(t) {
            return !!n.data(t, h)
        };
        n[o] = n[o] || {};
        e = n[o][i];
        f = n[o][i] = function(n, i) {
            return this._createWidget ? (arguments.length && this._createWidget(n, i), t) : new f(n, i)
        };
        n.extend(f, e, {
            version: u.version,
            _proto: n.extend({}, u),
            _childConstructors: []
        });
        s = new r;
        s.options = n.widget.extend({}, s.options);
        n.each(u, function(i, u) {
            return n.isFunction(u) ? (c[i] = function() {
                var n = function() {
                        return r.prototype[i].apply(this, arguments)
                    },
                    t = function(n) {
                        return r.prototype[i].apply(this, n)
                    };
                return function() {
                    var i, r = this._super,
                        f = this._superApply;
                    return this._super = n, this._superApply = t, i = u.apply(this, arguments), this._super = r, this._superApply = f, i
                }
            }(), t) : (c[i] = u, t)
        });
        f.prototype = n.widget.extend(s, {
            widgetEventPrefix: e ? s.widgetEventPrefix : i
        }, c, {
            constructor: f,
            namespace: o,
            widgetName: i,
            widgetFullName: h
        });
        e ? (n.each(e._childConstructors, function(t, i) {
            var r = i.prototype;
            n.widget(r.namespace + "." + r.widgetName, f, i._proto)
        }), delete e._childConstructors) : r._childConstructors.push(f);
        n.widget.bridge(i, f)
    };
    n.widget.extend = function(r) {
        for (var u, f, o = i.call(arguments, 1), e = 0, s = o.length; s > e; e++)
            for (u in o[e]) f = o[e][u], o[e].hasOwnProperty(u) && f !== t && (r[u] = n.isPlainObject(f) ? n.isPlainObject(r[u]) ? n.widget.extend({}, r[u], f) : n.widget.extend({}, f) : f);
        return r
    };
    n.widget.bridge = function(r, u) {
        var f = u.prototype.widgetFullName || r;
        n.fn[r] = function(e) {
            var h = "string" == typeof e,
                o = i.call(arguments, 1),
                s = this;
            return e = !h && o.length ? n.widget.extend.apply(null, [e].concat(o)) : e, h ? this.each(function() {
                var i, u = n.data(this, f);
                return u ? n.isFunction(u[e]) && "_" !== e.charAt(0) ? (i = u[e].apply(u, o), i !== u && i !== t ? (s = i && i.jquery ? s.pushStack(i.get()) : i, !1) : t) : n.error("no such method '" + e + "' for " + r + " widget instance") : n.error("cannot call methods on " + r + " prior to initialization; attempted to call method '" + e + "'")
            }) : this.each(function() {
                var t = n.data(this, f);
                t ? t.option(e || {})._init() : n.data(this, f, new u(e, this))
            }), s
        }
    };
    n.Widget = function() {};
    n.Widget._childConstructors = [];
    n.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(t, i) {
            i = n(i || this.defaultElement || this)[0];
            this.element = n(i);
            this.uuid = r++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.options = n.widget.extend({}, this.options, this._getCreateOptions(), t);
            this.bindings = n();
            this.hoverable = n();
            this.focusable = n();
            i !== this && (n.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(n) {
                    n.target === i && this.destroy()
                }
            }), this.document = n(i.style ? i.ownerDocument : i.document || i), this.window = n(this.document[0].defaultView || this.document[0].parentWindow));
            this._create();
            this._trigger("create", null, this._getCreateEventData());
            this._init()
        },
        _getCreateOptions: n.noop,
        _getCreateEventData: n.noop,
        _create: n.noop,
        _init: n.noop,
        destroy: function() {
            this._destroy();
            this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(n.camelCase(this.widgetFullName));
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled");
            this.bindings.unbind(this.eventNamespace);
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: n.noop,
        widget: function() {
            return this.element
        },
        option: function(i, r) {
            var u, f, e, o = i;
            if (0 === arguments.length) return n.widget.extend({}, this.options);
            if ("string" == typeof i)
                if (o = {}, u = i.split("."), i = u.shift(), u.length) {
                    for (f = o[i] = n.widget.extend({}, this.options[i]), e = 0; u.length - 1 > e; e++) f[u[e]] = f[u[e]] || {}, f = f[u[e]];
                    if (i = u.pop(), r === t) return f[i] === t ? null : f[i];
                    f[i] = r
                } else {
                    if (r === t) return this.options[i] === t ? null : this.options[i];
                    o[i] = r
                }
            return this._setOptions(o), this
        },
        _setOptions: function(n) {
            for (var t in n) this._setOption(t, n[t]);
            return this
        },
        _setOption: function(n, t) {
            return this.options[n] = t, "disabled" === n && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _on: function(i, r, u) {
            var e, f = this;
            "boolean" != typeof i && (u = r, r = i, i = !1);
            u ? (r = e = n(r), this.bindings = this.bindings.add(r)) : (u = r, r = this.element, e = this.widget());
            n.each(u, function(u, o) {
                function s() {
                    return i || f.options.disabled !== !0 && !n(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? f[o] : o).apply(f, arguments) : t
                }
                "string" != typeof o && (s.guid = o.guid = o.guid || s.guid || n.guid++);
                var h = u.match(/^(\w+)\s*(.*)$/),
                    c = h[1] + f.eventNamespace,
                    l = h[2];
                l ? e.delegate(l, c, s) : r.bind(c, s)
            })
        },
        _off: function(n, t) {
            t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            n.unbind(t).undelegate(t)
        },
        _delay: function(n, t) {
            function r() {
                return ("string" == typeof n ? i[n] : n).apply(i, arguments)
            }
            var i = this;
            return setTimeout(r, t || 0)
        },
        _hoverable: function(t) {
            this.hoverable = this.hoverable.add(t);
            this._on(t, {
                mouseenter: function(t) {
                    n(t.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(t) {
                    n(t.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(t) {
            this.focusable = this.focusable.add(t);
            this._on(t, {
                focusin: function(t) {
                    n(t.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(t) {
                    n(t.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(t, i, r) {
            var u, f, e = this.options[t];
            if (r = r || {}, i = n.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], f = i.originalEvent)
                for (u in f) u in i || (i[u] = f[u]);
            return this.element.trigger(i, r), !(n.isFunction(e) && e.apply(this.element[0], [i].concat(r)) === !1 || i.isDefaultPrevented())
        }
    };
    n.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(t, i) {
        n.Widget.prototype["_" + t] = function(r, u, f) {
            "string" == typeof u && (u = {
                effect: u
            });
            var o, e = u ? u === !0 || "number" == typeof u ? i : u.effect || i : t;
            u = u || {};
            "number" == typeof u && (u = {
                duration: u
            });
            o = !n.isEmptyObject(u);
            u.complete = f;
            u.delay && r.delay(u.delay);
            o && n.effects && n.effects.effect[e] ? r[t](u) : e !== t && r[e] ? r[e](u.duration, u.easing, f) : r.queue(function(i) {
                n(this)[t]();
                f && f.call(r[0]);
                i()
            })
        }
    })
}(jQuery),
function(n) {
    var t = !1;
    n(document).mouseup(function() {
        t = !1
    });
    n.widget("ui.mouse", {
        version: "1.10.3",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var t = this;
            this.element.bind("mousedown." + this.widgetName, function(n) {
                return t._mouseDown(n)
            }).bind("click." + this.widgetName, function(i) {
                return !0 === n.data(i.target, t.widgetName + ".preventClickEvent") ? (n.removeData(i.target, t.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : undefined
            });
            this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName);
            this._mouseMoveDelegate && n(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(i) {
            if (!t) {
                this._mouseStarted && this._mouseUp(i);
                this._mouseDownEvent = i;
                var r = this,
                    u = 1 === i.which,
                    f = "string" == typeof this.options.cancel && i.target.nodeName ? n(i.target).closest(this.options.cancel).length : !1;
                return u && !f && this._mouseCapture(i) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    r.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1, !this._mouseStarted) ? (i.preventDefault(), !0) : (!0 === n.data(i.target, this.widgetName + ".preventClickEvent") && n.removeData(i.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(n) {
                    return r._mouseMove(n)
                }, this._mouseUpDelegate = function(n) {
                    return r._mouseUp(n)
                }, n(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), i.preventDefault(), t = !0, !0)) : !0
            }
        },
        _mouseMove: function(t) {
            return n.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button ? this._mouseUp(t) : this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted)
        },
        _mouseUp: function(t) {
            return n(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && n.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1
        },
        _mouseDistanceMet: function(n) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - n.pageX), Math.abs(this._mouseDownEvent.pageY - n.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0
        }
    })
}(jQuery),
function(n, t) {
    function e(n, t, i) {
        return [parseFloat(n[0]) * (a.test(n[0]) ? t / 100 : 1), parseFloat(n[1]) * (a.test(n[1]) ? i / 100 : 1)]
    }

    function r(t, i) {
        return parseInt(n.css(t, i), 10) || 0
    }

    function v(t) {
        var i = t[0];
        return 9 === i.nodeType ? {
            width: t.width(),
            height: t.height(),
            offset: {
                top: 0,
                left: 0
            }
        } : n.isWindow(i) ? {
            width: t.width(),
            height: t.height(),
            offset: {
                top: t.scrollTop(),
                left: t.scrollLeft()
            }
        } : i.preventDefault ? {
            width: 0,
            height: 0,
            offset: {
                top: i.pageY,
                left: i.pageX
            }
        } : {
            width: t.outerWidth(),
            height: t.outerHeight(),
            offset: t.offset()
        }
    }
    n.ui = n.ui || {};
    var f, u = Math.max,
        i = Math.abs,
        o = Math.round,
        s = /left|center|right/,
        h = /top|center|bottom/,
        c = /[\+\-]\d+(\.[\d]+)?%?/,
        l = /^\w+/,
        a = /%$/,
        y = n.fn.position;
    n.position = {
        scrollbarWidth: function() {
            if (f !== t) return f;
            var u, r, i = n("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'><\/div><\/div>"),
                e = i.children()[0];
            return n("body").append(i), u = e.offsetWidth, i.css("overflow", "scroll"), r = e.offsetWidth, u === r && (r = i[0].clientWidth), i.remove(), f = u - r
        },
        getScrollInfo: function(t) {
            var i = t.isWindow ? "" : t.element.css("overflow-x"),
                r = t.isWindow ? "" : t.element.css("overflow-y"),
                u = "scroll" === i || "auto" === i && t.width < t.element[0].scrollWidth,
                f = "scroll" === r || "auto" === r && t.height < t.element[0].scrollHeight;
            return {
                width: f ? n.position.scrollbarWidth() : 0,
                height: u ? n.position.scrollbarWidth() : 0
            }
        },
        getWithinInfo: function(t) {
            var i = n(t || window),
                r = n.isWindow(i[0]);
            return {
                element: i,
                isWindow: r,
                offset: i.offset() || {
                    left: 0,
                    top: 0
                },
                scrollLeft: i.scrollLeft(),
                scrollTop: i.scrollTop(),
                width: r ? i.width() : i.outerWidth(),
                height: r ? i.height() : i.outerHeight()
            }
        }
    };
    n.fn.position = function(t) {
        if (!t || !t.of) return y.apply(this, arguments);
        t = n.extend({}, t);
        var b, f, a, w, p, d, g = n(t.of),
            tt = n.position.getWithinInfo(t.within),
            it = n.position.getScrollInfo(tt),
            k = (t.collision || "flip").split(" "),
            nt = {};
        return d = v(g), g[0].preventDefault && (t.at = "left top"), f = d.width, a = d.height, w = d.offset, p = n.extend({}, w), n.each(["my", "at"], function() {
            var i, r, n = (t[this] || "").split(" ");
            1 === n.length && (n = s.test(n[0]) ? n.concat(["center"]) : h.test(n[0]) ? ["center"].concat(n) : ["center", "center"]);
            n[0] = s.test(n[0]) ? n[0] : "center";
            n[1] = h.test(n[1]) ? n[1] : "center";
            i = c.exec(n[0]);
            r = c.exec(n[1]);
            nt[this] = [i ? i[0] : 0, r ? r[0] : 0];
            t[this] = [l.exec(n[0])[0], l.exec(n[1])[0]]
        }), 1 === k.length && (k[1] = k[0]), "right" === t.at[0] ? p.left += f : "center" === t.at[0] && (p.left += f / 2), "bottom" === t.at[1] ? p.top += a : "center" === t.at[1] && (p.top += a / 2), b = e(nt.at, f, a), p.left += b[0], p.top += b[1], this.each(function() {
            var y, d, h = n(this),
                c = h.outerWidth(),
                l = h.outerHeight(),
                rt = r(this, "marginLeft"),
                ut = r(this, "marginTop"),
                ft = c + rt + r(this, "marginRight") + it.width,
                et = l + ut + r(this, "marginBottom") + it.height,
                s = n.extend({}, p),
                v = e(nt.my, h.outerWidth(), h.outerHeight());
            "right" === t.my[0] ? s.left -= c : "center" === t.my[0] && (s.left -= c / 2);
            "bottom" === t.my[1] ? s.top -= l : "center" === t.my[1] && (s.top -= l / 2);
            s.left += v[0];
            s.top += v[1];
            n.support.offsetFractions || (s.left = o(s.left), s.top = o(s.top));
            y = {
                marginLeft: rt,
                marginTop: ut
            };
            n.each(["left", "top"], function(i, r) {
                n.ui.position[k[i]] && n.ui.position[k[i]][r](s, {
                    targetWidth: f,
                    targetHeight: a,
                    elemWidth: c,
                    elemHeight: l,
                    collisionPosition: y,
                    collisionWidth: ft,
                    collisionHeight: et,
                    offset: [b[0] + v[0], b[1] + v[1]],
                    my: t.my,
                    at: t.at,
                    within: tt,
                    elem: h
                })
            });
            t.using && (d = function(n) {
                var r = w.left - s.left,
                    v = r + f - c,
                    e = w.top - s.top,
                    y = e + a - l,
                    o = {
                        target: {
                            element: g,
                            left: w.left,
                            top: w.top,
                            width: f,
                            height: a
                        },
                        element: {
                            element: h,
                            left: s.left,
                            top: s.top,
                            width: c,
                            height: l
                        },
                        horizontal: 0 > v ? "left" : r > 0 ? "right" : "center",
                        vertical: 0 > y ? "top" : e > 0 ? "bottom" : "middle"
                    };
                c > f && f > i(r + v) && (o.horizontal = "center");
                l > a && a > i(e + y) && (o.vertical = "middle");
                o.important = u(i(r), i(v)) > u(i(e), i(y)) ? "horizontal" : "vertical";
                t.using.call(this, n, o)
            });
            h.offset(n.extend(s, {
                using: d
            }))
        })
    };
    n.ui.position = {
            fit: {
                left: function(n, t) {
                    var h, e = t.within,
                        r = e.isWindow ? e.scrollLeft : e.offset.left,
                        o = e.width,
                        s = n.left - t.collisionPosition.marginLeft,
                        i = r - s,
                        f = s + t.collisionWidth - o - r;
                    t.collisionWidth > o ? i > 0 && 0 >= f ? (h = n.left + i + t.collisionWidth - o - r, n.left += i - h) : n.left = f > 0 && 0 >= i ? r : i > f ? r + o - t.collisionWidth : r : i > 0 ? n.left += i : f > 0 ? n.left -= f : n.left = u(n.left - s, n.left)
                },
                top: function(n, t) {
                    var h, o = t.within,
                        r = o.isWindow ? o.scrollTop : o.offset.top,
                        e = t.within.height,
                        s = n.top - t.collisionPosition.marginTop,
                        i = r - s,
                        f = s + t.collisionHeight - e - r;
                    t.collisionHeight > e ? i > 0 && 0 >= f ? (h = n.top + i + t.collisionHeight - e - r, n.top += i - h) : n.top = f > 0 && 0 >= i ? r : i > f ? r + e - t.collisionHeight : r : i > 0 ? n.top += i : f > 0 ? n.top -= f : n.top = u(n.top - s, n.top)
                }
            },
            flip: {
                left: function(n, t) {
                    var o, s, r = t.within,
                        y = r.offset.left + r.scrollLeft,
                        c = r.width,
                        h = r.isWindow ? r.scrollLeft : r.offset.left,
                        l = n.left - t.collisionPosition.marginLeft,
                        a = l - h,
                        v = l + t.collisionWidth - c - h,
                        u = "left" === t.my[0] ? -t.elemWidth : "right" === t.my[0] ? t.elemWidth : 0,
                        f = "left" === t.at[0] ? t.targetWidth : "right" === t.at[0] ? -t.targetWidth : 0,
                        e = -2 * t.offset[0];
                    0 > a ? (o = n.left + u + f + e + t.collisionWidth - c - y, (0 > o || i(a) > o) && (n.left += u + f + e)) : v > 0 && (s = n.left - t.collisionPosition.marginLeft + u + f + e - h, (s > 0 || v > i(s)) && (n.left += u + f + e))
                },
                top: function(n, t) {
                    var o, s, r = t.within,
                        y = r.offset.top + r.scrollTop,
                        a = r.height,
                        h = r.isWindow ? r.scrollTop : r.offset.top,
                        v = n.top - t.collisionPosition.marginTop,
                        c = v - h,
                        l = v + t.collisionHeight - a - h,
                        p = "top" === t.my[1],
                        u = p ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0,
                        f = "top" === t.at[1] ? t.targetHeight : "bottom" === t.at[1] ? -t.targetHeight : 0,
                        e = -2 * t.offset[1];
                    0 > c ? (s = n.top + u + f + e + t.collisionHeight - a - y, n.top + u + f + e > c && (0 > s || i(c) > s) && (n.top += u + f + e)) : l > 0 && (o = n.top - t.collisionPosition.marginTop + u + f + e - h, n.top + u + f + e > l && (o > 0 || l > i(o)) && (n.top += u + f + e))
                }
            },
            flipfit: {
                left: function() {
                    n.ui.position.flip.left.apply(this, arguments);
                    n.ui.position.fit.left.apply(this, arguments)
                },
                top: function() {
                    n.ui.position.flip.top.apply(this, arguments);
                    n.ui.position.fit.top.apply(this, arguments)
                }
            }
        },
        function() {
            var t, i, r, u, f, e = document.getElementsByTagName("body")[0],
                o = document.createElement("div");
            t = document.createElement(e ? "div" : "body");
            r = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            };
            e && n.extend(r, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px"
            });
            for (f in r) t.style[f] = r[f];
            t.appendChild(o);
            i = e || document.documentElement;
            i.insertBefore(t, i.firstChild);
            o.style.cssText = "position: absolute; left: 10.7432222px;";
            u = n(o).offset().left;
            n.support.offsetFractions = u > 10 && 11 > u;
            t.innerHTML = "";
            i.removeChild(t)
        }()
}(jQuery),
function(n) {
    n.widget("ui.draggable", n.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative");
            this.options.addClasses && this.element.addClass("ui-draggable");
            this.options.disabled && this.element.addClass("ui-draggable-disabled");
            this._mouseInit()
        },
        _destroy: function() {
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
            this._mouseDestroy()
        },
        _mouseCapture: function(t) {
            var i = this.options;
            return this.helper || i.disabled || n(t.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(t), this.handle ? (n(i.iframeFix === !0 ? "iframe" : i.iframeFix).each(function() {
                n("<div class='ui-draggable-iframeFix' style='background: #fff;'><\/div>").css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1e3
                }).css(n(this).offset()).appendTo("body")
            }), !0) : !1)
        },
        _mouseStart: function(t) {
            var i = this.options;
            return this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), n.ui.ddmanager && (n.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            }, this.offset.scroll = !1, n.extend(this.offset, {
                click: {
                    left: t.pageX - this.offset.left,
                    top: t.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }), this.originalPosition = this.position = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), n.ui.ddmanager && !i.dropBehaviour && n.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), n.ui.ddmanager && n.ui.ddmanager.dragStart(this, t), !0)
        },
        _mouseDrag: function(t, i) {
            if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), !i) {
                var r = this._uiHash();
                if (this._trigger("drag", t, r) === !1) return this._mouseUp({}), !1;
                this.position = r.position
            }
            return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), n.ui.ddmanager && n.ui.ddmanager.drag(this, t), !1
        },
        _mouseStop: function(t) {
            var r = this,
                i = !1;
            return n.ui.ddmanager && !this.options.dropBehaviour && (i = n.ui.ddmanager.drop(this, t)), this.dropped && (i = this.dropped, this.dropped = !1), "original" !== this.options.helper || n.contains(this.element[0].ownerDocument, this.element[0]) ? ("invalid" === this.options.revert && !i || "valid" === this.options.revert && i || this.options.revert === !0 || n.isFunction(this.options.revert) && this.options.revert.call(this.element, i) ? n(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                r._trigger("stop", t) !== !1 && r._clear()
            }) : this._trigger("stop", t) !== !1 && this._clear(), !1) : !1
        },
        _mouseUp: function(t) {
            return n("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            }), n.ui.ddmanager && n.ui.ddmanager.dragStop(this, t), n.ui.mouse.prototype._mouseUp.call(this, t)
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
        },
        _getHandle: function(t) {
            return this.options.handle ? !!n(t.target).closest(this.element.find(this.options.handle)).length : !0
        },
        _createHelper: function(t) {
            var r = this.options,
                i = n.isFunction(r.helper) ? n(r.helper.apply(this.element[0], [t])) : "clone" === r.helper ? this.element.clone().removeAttr("id") : this.element;
            return i.parents("body").length || i.appendTo("parent" === r.appendTo ? this.element[0].parentNode : r.appendTo), i[0] === this.element[0] || /(fixed|absolute)/.test(i.css("position")) || i.css("position", "absolute"), i
        },
        _adjustOffsetFromHelper: function(t) {
            "string" == typeof t && (t = t.split(" "));
            n.isArray(t) && (t = {
                left: +t[0],
                top: +t[1] || 0
            });
            "left" in t && (this.offset.click.left = t.left + this.margins.left);
            "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left);
            "top" in t && (this.offset.click.top = t.top + this.margins.top);
            "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            var t = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== document && n.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && n.ui.ie) && (t = {
                top: 0,
                left: 0
            }), {
                top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" === this.cssPosition) {
                var n = this.element.position();
                return {
                    top: n.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: n.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var u, t, i, r = this.options;
            return r.containment ? "window" === r.containment ? (this.containment = [n(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, n(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, n(window).scrollLeft() + n(window).width() - this.helperProportions.width - this.margins.left, n(window).scrollTop() + (n(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], undefined) : "document" === r.containment ? (this.containment = [0, 0, n(document).width() - this.helperProportions.width - this.margins.left, (n(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], undefined) : r.containment.constructor === Array ? (this.containment = r.containment, undefined) : ("parent" === r.containment && (r.containment = this.helper[0].parentNode), t = n(r.containment), i = t[0], i && (u = "hidden" !== t.css("overflow"), this.containment = [(parseInt(t.css("borderLeftWidth"), 10) || 0) + (parseInt(t.css("paddingLeft"), 10) || 0), (parseInt(t.css("borderTopWidth"), 10) || 0) + (parseInt(t.css("paddingTop"), 10) || 0), (u ? Math.max(i.scrollWidth, i.offsetWidth) : i.offsetWidth) - (parseInt(t.css("borderRightWidth"), 10) || 0) - (parseInt(t.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (u ? Math.max(i.scrollHeight, i.offsetHeight) : i.offsetHeight) - (parseInt(t.css("borderBottomWidth"), 10) || 0) - (parseInt(t.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = t), undefined) : (this.containment = null, undefined)
        },
        _convertPositionTo: function(t, i) {
            i || (i = this.position);
            var r = "absolute" === t ? 1 : -1,
                u = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && n.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
            return this.offset.scroll || (this.offset.scroll = {
                top: u.scrollTop(),
                left: u.scrollLeft()
            }), {
                top: i.top + this.offset.relative.top * r + this.offset.parent.top * r - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * r,
                left: i.left + this.offset.relative.left * r + this.offset.parent.left * r - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * r
            }
        },
        _generatePosition: function(t) {
            var i, e, u, f, r = this.options,
                h = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && n.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                o = t.pageX,
                s = t.pageY;
            return this.offset.scroll || (this.offset.scroll = {
                top: h.scrollTop(),
                left: h.scrollLeft()
            }), this.originalPosition && (this.containment && (this.relative_container ? (e = this.relative_container.offset(), i = [this.containment[0] + e.left, this.containment[1] + e.top, this.containment[2] + e.left, this.containment[3] + e.top]) : i = this.containment, t.pageX - this.offset.click.left < i[0] && (o = i[0] + this.offset.click.left), t.pageY - this.offset.click.top < i[1] && (s = i[1] + this.offset.click.top), t.pageX - this.offset.click.left > i[2] && (o = i[2] + this.offset.click.left), t.pageY - this.offset.click.top > i[3] && (s = i[3] + this.offset.click.top)), r.grid && (u = r.grid[1] ? this.originalPageY + Math.round((s - this.originalPageY) / r.grid[1]) * r.grid[1] : this.originalPageY, s = i ? u - this.offset.click.top >= i[1] || u - this.offset.click.top > i[3] ? u : u - this.offset.click.top >= i[1] ? u - r.grid[1] : u + r.grid[1] : u, f = r.grid[0] ? this.originalPageX + Math.round((o - this.originalPageX) / r.grid[0]) * r.grid[0] : this.originalPageX, o = i ? f - this.offset.click.left >= i[0] || f - this.offset.click.left > i[2] ? f : f - this.offset.click.left >= i[0] ? f - r.grid[0] : f + r.grid[0] : f)), {
                top: s - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
                left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging");
            this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove();
            this.helper = null;
            this.cancelHelperRemoval = !1
        },
        _trigger: function(t, i, r) {
            return r = r || this._uiHash(), n.ui.plugin.call(this, t, [i, r]), "drag" === t && (this.positionAbs = this._convertPositionTo("absolute")), n.Widget.prototype._trigger.call(this, t, i, r)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    });
    n.ui.plugin.add("draggable", "connectToSortable", {
        start: function(t, i) {
            var r = n(this).data("ui-draggable"),
                u = r.options,
                f = n.extend({}, i, {
                    item: r.element
                });
            r.sortables = [];
            n(u.connectToSortable).each(function() {
                var i = n.data(this, "ui-sortable");
                i && !i.options.disabled && (r.sortables.push({
                    instance: i,
                    shouldRevert: i.options.revert
                }), i.refreshPositions(), i._trigger("activate", t, f))
            })
        },
        stop: function(t, i) {
            var r = n(this).data("ui-draggable"),
                u = n.extend({}, i, {
                    item: r.element
                });
            n.each(r.sortables, function() {
                this.instance.isOver ? (this.instance.isOver = 0, r.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(t), this.instance.options.helper = this.instance.options._helper, "original" === r.options.helper && this.instance.currentItem.css({
                    top: "auto",
                    left: "auto"
                })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", t, u))
            })
        },
        drag: function(t, i) {
            var r = n(this).data("ui-draggable"),
                u = this;
            n.each(r.sortables, function() {
                var f = !1,
                    e = this;
                this.instance.positionAbs = r.positionAbs;
                this.instance.helperProportions = r.helperProportions;
                this.instance.offset.click = r.offset.click;
                this.instance._intersectsWith(this.instance.containerCache) && (f = !0, n.each(r.sortables, function() {
                    return this.instance.positionAbs = r.positionAbs, this.instance.helperProportions = r.helperProportions, this.instance.offset.click = r.offset.click, this !== e && this.instance._intersectsWith(this.instance.containerCache) && n.contains(e.instance.element[0], this.instance.element[0]) && (f = !1), f
                }));
                f ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = n(u).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                    return i.helper[0]
                }, t.target = this.instance.currentItem[0], this.instance._mouseCapture(t, !0), this.instance._mouseStart(t, !0, !0), this.instance.offset.click.top = r.offset.click.top, this.instance.offset.click.left = r.offset.click.left, this.instance.offset.parent.left -= r.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= r.offset.parent.top - this.instance.offset.parent.top, r._trigger("toSortable", t), r.dropped = this.instance.element, r.currentItem = r.element, this.instance.fromOutside = r), this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", t, this.instance._uiHash(this.instance)), this.instance._mouseStop(t, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), r._trigger("fromSortable", t), r.dropped = !1)
            })
        }
    });
    n.ui.plugin.add("draggable", "cursor", {
        start: function() {
            var t = n("body"),
                i = n(this).data("ui-draggable").options;
            t.css("cursor") && (i._cursor = t.css("cursor"));
            t.css("cursor", i.cursor)
        },
        stop: function() {
            var t = n(this).data("ui-draggable").options;
            t._cursor && n("body").css("cursor", t._cursor)
        }
    });
    n.ui.plugin.add("draggable", "opacity", {
        start: function(t, i) {
            var r = n(i.helper),
                u = n(this).data("ui-draggable").options;
            r.css("opacity") && (u._opacity = r.css("opacity"));
            r.css("opacity", u.opacity)
        },
        stop: function(t, i) {
            var r = n(this).data("ui-draggable").options;
            r._opacity && n(i.helper).css("opacity", r._opacity)
        }
    });
    n.ui.plugin.add("draggable", "scroll", {
        start: function() {
            var t = n(this).data("ui-draggable");
            t.scrollParent[0] !== document && "HTML" !== t.scrollParent[0].tagName && (t.overflowOffset = t.scrollParent.offset())
        },
        drag: function(t) {
            var r = n(this).data("ui-draggable"),
                i = r.options,
                u = !1;
            r.scrollParent[0] !== document && "HTML" !== r.scrollParent[0].tagName ? (i.axis && "x" === i.axis || (r.overflowOffset.top + r.scrollParent[0].offsetHeight - t.pageY < i.scrollSensitivity ? r.scrollParent[0].scrollTop = u = r.scrollParent[0].scrollTop + i.scrollSpeed : t.pageY - r.overflowOffset.top < i.scrollSensitivity && (r.scrollParent[0].scrollTop = u = r.scrollParent[0].scrollTop - i.scrollSpeed)), i.axis && "y" === i.axis || (r.overflowOffset.left + r.scrollParent[0].offsetWidth - t.pageX < i.scrollSensitivity ? r.scrollParent[0].scrollLeft = u = r.scrollParent[0].scrollLeft + i.scrollSpeed : t.pageX - r.overflowOffset.left < i.scrollSensitivity && (r.scrollParent[0].scrollLeft = u = r.scrollParent[0].scrollLeft - i.scrollSpeed))) : (i.axis && "x" === i.axis || (t.pageY - n(document).scrollTop() < i.scrollSensitivity ? u = n(document).scrollTop(n(document).scrollTop() - i.scrollSpeed) : n(window).height() - (t.pageY - n(document).scrollTop()) < i.scrollSensitivity && (u = n(document).scrollTop(n(document).scrollTop() + i.scrollSpeed))), i.axis && "y" === i.axis || (t.pageX - n(document).scrollLeft() < i.scrollSensitivity ? u = n(document).scrollLeft(n(document).scrollLeft() - i.scrollSpeed) : n(window).width() - (t.pageX - n(document).scrollLeft()) < i.scrollSensitivity && (u = n(document).scrollLeft(n(document).scrollLeft() + i.scrollSpeed))));
            u !== !1 && n.ui.ddmanager && !i.dropBehaviour && n.ui.ddmanager.prepareOffsets(r, t)
        }
    });
    n.ui.plugin.add("draggable", "snap", {
        start: function() {
            var t = n(this).data("ui-draggable"),
                i = t.options;
            t.snapElements = [];
            n(i.snap.constructor !== String ? i.snap.items || ":data(ui-draggable)" : i.snap).each(function() {
                var i = n(this),
                    r = i.offset();
                this !== t.element[0] && t.snapElements.push({
                    item: this,
                    width: i.outerWidth(),
                    height: i.outerHeight(),
                    top: r.top,
                    left: r.left
                })
            })
        },
        drag: function(t, i) {
            for (var e, o, s, h, c, a, l, v, w, r = n(this).data("ui-draggable"), b = r.options, f = b.snapTolerance, y = i.offset.left, k = y + r.helperProportions.width, p = i.offset.top, d = p + r.helperProportions.height, u = r.snapElements.length - 1; u >= 0; u--) c = r.snapElements[u].left, a = c + r.snapElements[u].width, l = r.snapElements[u].top, v = l + r.snapElements[u].height, c - f > k || y > a + f || l - f > d || p > v + f || !n.contains(r.snapElements[u].item.ownerDocument, r.snapElements[u].item) ? (r.snapElements[u].snapping && r.options.snap.release && r.options.snap.release.call(r.element, t, n.extend(r._uiHash(), {
                snapItem: r.snapElements[u].item
            })), r.snapElements[u].snapping = !1) : ("inner" !== b.snapMode && (e = f >= Math.abs(l - d), o = f >= Math.abs(v - p), s = f >= Math.abs(c - k), h = f >= Math.abs(a - y), e && (i.position.top = r._convertPositionTo("relative", {
                top: l - r.helperProportions.height,
                left: 0
            }).top - r.margins.top), o && (i.position.top = r._convertPositionTo("relative", {
                top: v,
                left: 0
            }).top - r.margins.top), s && (i.position.left = r._convertPositionTo("relative", {
                top: 0,
                left: c - r.helperProportions.width
            }).left - r.margins.left), h && (i.position.left = r._convertPositionTo("relative", {
                top: 0,
                left: a
            }).left - r.margins.left)), w = e || o || s || h, "outer" !== b.snapMode && (e = f >= Math.abs(l - p), o = f >= Math.abs(v - d), s = f >= Math.abs(c - y), h = f >= Math.abs(a - k), e && (i.position.top = r._convertPositionTo("relative", {
                top: l,
                left: 0
            }).top - r.margins.top), o && (i.position.top = r._convertPositionTo("relative", {
                top: v - r.helperProportions.height,
                left: 0
            }).top - r.margins.top), s && (i.position.left = r._convertPositionTo("relative", {
                top: 0,
                left: c
            }).left - r.margins.left), h && (i.position.left = r._convertPositionTo("relative", {
                top: 0,
                left: a - r.helperProportions.width
            }).left - r.margins.left)), !r.snapElements[u].snapping && (e || o || s || h || w) && r.options.snap.snap && r.options.snap.snap.call(r.element, t, n.extend(r._uiHash(), {
                snapItem: r.snapElements[u].item
            })), r.snapElements[u].snapping = e || o || s || h || w)
        }
    });
    n.ui.plugin.add("draggable", "stack", {
        start: function() {
            var i, r = this.data("ui-draggable").options,
                t = n.makeArray(n(r.stack)).sort(function(t, i) {
                    return (parseInt(n(t).css("zIndex"), 10) || 0) - (parseInt(n(i).css("zIndex"), 10) || 0)
                });
            t.length && (i = parseInt(n(t[0]).css("zIndex"), 10) || 0, n(t).each(function(t) {
                n(this).css("zIndex", i + t)
            }), this.css("zIndex", i + t.length))
        }
    });
    n.ui.plugin.add("draggable", "zIndex", {
        start: function(t, i) {
            var r = n(i.helper),
                u = n(this).data("ui-draggable").options;
            r.css("zIndex") && (u._zIndex = r.css("zIndex"));
            r.css("zIndex", u.zIndex)
        },
        stop: function(t, i) {
            var r = n(this).data("ui-draggable").options;
            r._zIndex && n(i.helper).css("zIndex", r._zIndex)
        }
    })
}(jQuery),
function(n) {
    function t(n, t, i) {
        return n > t && t + i > n
    }
    n.widget("ui.droppable", {
        version: "1.10.3",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: !1,
            addClasses: !0,
            greedy: !1,
            hoverClass: !1,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function() {
            var t = this.options,
                i = t.accept;
            this.isover = !1;
            this.isout = !0;
            this.accept = n.isFunction(i) ? i : function(n) {
                return n.is(i)
            };
            this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            };
            n.ui.ddmanager.droppables[t.scope] = n.ui.ddmanager.droppables[t.scope] || [];
            n.ui.ddmanager.droppables[t.scope].push(this);
            t.addClasses && this.element.addClass("ui-droppable")
        },
        _destroy: function() {
            for (var t = 0, i = n.ui.ddmanager.droppables[this.options.scope]; i.length > t; t++) i[t] === this && i.splice(t, 1);
            this.element.removeClass("ui-droppable ui-droppable-disabled")
        },
        _setOption: function(t, i) {
            "accept" === t && (this.accept = n.isFunction(i) ? i : function(n) {
                return n.is(i)
            });
            n.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function(t) {
            var i = n.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass);
            i && this._trigger("activate", t, this.ui(i))
        },
        _deactivate: function(t) {
            var i = n.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass);
            i && this._trigger("deactivate", t, this.ui(i))
        },
        _over: function(t) {
            var i = n.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", t, this.ui(i)))
        },
        _out: function(t) {
            var i = n.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", t, this.ui(i)))
        },
        _drop: function(t, i) {
            var r = i || n.ui.ddmanager.current,
                u = !1;
            return r && (r.currentItem || r.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                var t = n.data(this, "ui-droppable");
                return t.options.greedy && !t.options.disabled && t.options.scope === r.options.scope && t.accept.call(t.element[0], r.currentItem || r.element) && n.ui.intersect(r, n.extend(t, {
                    offset: t.element.offset()
                }), t.options.tolerance) ? (u = !0, !1) : undefined
            }), u ? !1 : this.accept.call(this.element[0], r.currentItem || r.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", t, this.ui(r)), this.element) : !1) : !1
        },
        ui: function(n) {
            return {
                draggable: n.currentItem || n.element,
                helper: n.helper,
                position: n.position,
                offset: n.positionAbs
            }
        }
    });
    n.ui.intersect = function(n, i, r) {
        if (!i.offset) return !1;
        var a, v, e = (n.positionAbs || n.position.absolute).left,
            s = e + n.helperProportions.width,
            o = (n.positionAbs || n.position.absolute).top,
            h = o + n.helperProportions.height,
            u = i.offset.left,
            c = u + i.proportions.width,
            f = i.offset.top,
            l = f + i.proportions.height;
        switch (r) {
            case "fit":
                return e >= u && c >= s && o >= f && l >= h;
            case "intersect":
                return e + n.helperProportions.width / 2 > u && c > s - n.helperProportions.width / 2 && o + n.helperProportions.height / 2 > f && l > h - n.helperProportions.height / 2;
            case "pointer":
                return a = (n.positionAbs || n.position.absolute).left + (n.clickOffset || n.offset.click).left, v = (n.positionAbs || n.position.absolute).top + (n.clickOffset || n.offset.click).top, t(v, f, i.proportions.height) && t(a, u, i.proportions.width);
            case "touch":
                return (o >= f && l >= o || h >= f && l >= h || f > o && h > l) && (e >= u && c >= e || s >= u && c >= s || u > e && s > c);
            default:
                return !1
        }
    };
    n.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(t, i) {
            var r, f, u = n.ui.ddmanager.droppables[t.options.scope] || [],
                o = i ? i.type : null,
                e = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();
            n: for (r = 0; u.length > r; r++)
                if (!(u[r].options.disabled || t && !u[r].accept.call(u[r].element[0], t.currentItem || t.element))) {
                    for (f = 0; e.length > f; f++)
                        if (e[f] === u[r].element[0]) {
                            u[r].proportions.height = 0;
                            continue n
                        }
                    u[r].visible = "none" !== u[r].element.css("display");
                    u[r].visible && ("mousedown" === o && u[r]._activate.call(u[r], i), u[r].offset = u[r].element.offset(), u[r].proportions = {
                        width: u[r].element[0].offsetWidth,
                        height: u[r].element[0].offsetHeight
                    })
                }
        },
        drop: function(t, i) {
            var r = !1;
            return n.each((n.ui.ddmanager.droppables[t.options.scope] || []).slice(), function() {
                this.options && (!this.options.disabled && this.visible && n.ui.intersect(t, this, this.options.tolerance) && (r = this._drop.call(this, i) || r), !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
            }), r
        },
        dragStart: function(t, i) {
            t.element.parentsUntil("body").bind("scroll.droppable", function() {
                t.options.refreshPositions || n.ui.ddmanager.prepareOffsets(t, i)
            })
        },
        drag: function(t, i) {
            t.options.refreshPositions && n.ui.ddmanager.prepareOffsets(t, i);
            n.each(n.ui.ddmanager.droppables[t.options.scope] || [], function() {
                if (!this.options.disabled && !this.greedyChild && this.visible) {
                    var r, e, f, o = n.ui.intersect(t, this, this.options.tolerance),
                        u = !o && this.isover ? "isout" : o && !this.isover ? "isover" : null;
                    u && (this.options.greedy && (e = this.options.scope, f = this.element.parents(":data(ui-droppable)").filter(function() {
                        return n.data(this, "ui-droppable").options.scope === e
                    }), f.length && (r = n.data(f[0], "ui-droppable"), r.greedyChild = "isover" === u)), r && "isover" === u && (r.isover = !1, r.isout = !0, r._out.call(r, i)), this[u] = !0, this["isout" === u ? "isover" : "isout"] = !1, this["isover" === u ? "_over" : "_out"].call(this, i), r && "isout" === u && (r.isout = !1, r.isover = !0, r._over.call(r, i)))
                }
            })
        },
        dragStop: function(t, i) {
            t.element.parentsUntil("body").unbind("scroll.droppable");
            t.options.refreshPositions || n.ui.ddmanager.prepareOffsets(t, i)
        }
    }
}(jQuery),
function(n) {
    function i(n) {
        return parseInt(n, 10) || 0
    }

    function t(n) {
        return !isNaN(parseInt(n, 10))
    }
    n.widget("ui.resizable", n.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _create: function() {
            var e, f, r, i, o, u = this,
                t = this.options;
            if (this.element.addClass("ui-resizable"), n.extend(this, {
                    _aspectRatio: !!t.aspectRatio,
                    aspectRatio: t.aspectRatio,
                    originalElement: this.element,
                    _proportionallyResizeElements: [],
                    _helper: t.helper || t.ghost || t.animate ? t.helper || "ui-resizable-helper" : null
                }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(n("<div class='ui-wrapper' style='overflow: hidden;'><\/div>").css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                })), this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable")), this.elementIsWrapper = !0, this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                }), this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                })), this.originalElement.css({
                    margin: this.originalElement.css("margin")
                }), this._proportionallyResize()), this.handles = t.handles || (n(".ui-resizable-handle", this.element).length ? {
                    n: ".ui-resizable-n",
                    e: ".ui-resizable-e",
                    s: ".ui-resizable-s",
                    w: ".ui-resizable-w",
                    se: ".ui-resizable-se",
                    sw: ".ui-resizable-sw",
                    ne: ".ui-resizable-ne",
                    nw: ".ui-resizable-nw"
                } : "e,s,se"), this.handles.constructor === String)
                for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), e = this.handles.split(","), this.handles = {}, f = 0; e.length > f; f++) r = n.trim(e[f]), o = "ui-resizable-" + r, i = n("<div class='ui-resizable-handle " + o + "'><\/div>"), i.css({
                    zIndex: t.zIndex
                }), "se" === r && i.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[r] = ".ui-resizable-" + r, this.element.append(i);
            this._renderAxis = function(t) {
                var i, r, u, f;
                t = t || this.element;
                for (i in this.handles) this.handles[i].constructor === String && (this.handles[i] = n(this.handles[i], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (r = n(this.handles[i], this.element), f = /sw|ne|nw|se|n|s/.test(i) ? r.outerHeight() : r.outerWidth(), u = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), t.css(u, f), this._proportionallyResize()), n(this.handles[i]).length
            };
            this._renderAxis(this.element);
            this._handles = n(".ui-resizable-handle", this.element).disableSelection();
            this._handles.mouseover(function() {
                u.resizing || (this.className && (i = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), u.axis = i && i[1] ? i[1] : "se")
            });
            t.autoHide && (this._handles.hide(), n(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                t.disabled || (n(this).removeClass("ui-resizable-autohide"), u._handles.show())
            }).mouseleave(function() {
                t.disabled || u.resizing || (n(this).addClass("ui-resizable-autohide"), u._handles.hide())
            }));
            this._mouseInit()
        },
        _destroy: function() {
            this._mouseDestroy();
            var t, i = function(t) {
                n(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            return this.elementIsWrapper && (i(this.element), t = this.element, this.originalElement.css({
                position: t.css("position"),
                width: t.outerWidth(),
                height: t.outerHeight(),
                top: t.css("top"),
                left: t.css("left")
            }).insertAfter(t), t.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
        },
        _mouseCapture: function(t) {
            var r, i, u = !1;
            for (r in this.handles) i = n(this.handles[r])[0], (i === t.target || n.contains(i, t.target)) && (u = !0);
            return !this.options.disabled && u
        },
        _mouseStart: function(t) {
            var f, e, o, u = this.options,
                s = this.element.position(),
                r = this.element;
            return this.resizing = !0, /absolute/.test(r.css("position")) ? r.css({
                position: "absolute",
                top: r.css("top"),
                left: r.css("left")
            }) : r.is(".ui-draggable") && r.css({
                position: "absolute",
                top: s.top,
                left: s.left
            }), this._renderProxy(), f = i(this.helper.css("left")), e = i(this.helper.css("top")), u.containment && (f += n(u.containment).scrollLeft() || 0, e += n(u.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                left: f,
                top: e
            }, this.size = this._helper ? {
                width: r.outerWidth(),
                height: r.outerHeight()
            } : {
                width: r.width(),
                height: r.height()
            }, this.originalSize = this._helper ? {
                width: r.outerWidth(),
                height: r.outerHeight()
            } : {
                width: r.width(),
                height: r.height()
            }, this.originalPosition = {
                left: f,
                top: e
            }, this.sizeDiff = {
                width: r.outerWidth() - r.width(),
                height: r.outerHeight() - r.height()
            }, this.originalMousePosition = {
                left: t.pageX,
                top: t.pageY
            }, this.aspectRatio = "number" == typeof u.aspectRatio ? u.aspectRatio : this.originalSize.width / this.originalSize.height || 1, o = n(".ui-resizable-" + this.axis).css("cursor"), n("body").css("cursor", "auto" === o ? this.axis + "-resize" : o), r.addClass("ui-resizable-resizing"), this._propagate("start", t), !0
        },
        _mouseDrag: function(t) {
            var i, e = this.helper,
                r = {},
                u = this.originalMousePosition,
                o = this.axis,
                s = this.position.top,
                h = this.position.left,
                c = this.size.width,
                l = this.size.height,
                a = t.pageX - u.left || 0,
                v = t.pageY - u.top || 0,
                f = this._change[o];
            return f ? (i = f.apply(this, [t, a, v]), this._updateVirtualBoundaries(t.shiftKey), (this._aspectRatio || t.shiftKey) && (i = this._updateRatio(i, t)), i = this._respectSize(i, t), this._updateCache(i), this._propagate("resize", t), this.position.top !== s && (r.top = this.position.top + "px"), this.position.left !== h && (r.left = this.position.left + "px"), this.size.width !== c && (r.width = this.size.width + "px"), this.size.height !== l && (r.height = this.size.height + "px"), e.css(r), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), n.isEmptyObject(r) || this._trigger("resize", t, this.ui()), !1) : !1
        },
        _mouseStop: function(t) {
            this.resizing = !1;
            var r, u, f, e, o, s, h, c = this.options,
                i = this;
            return this._helper && (r = this._proportionallyResizeElements, u = r.length && /textarea/i.test(r[0].nodeName), f = u && n.ui.hasScroll(r[0], "left") ? 0 : i.sizeDiff.height, e = u ? 0 : i.sizeDiff.width, o = {
                width: i.helper.width() - e,
                height: i.helper.height() - f
            }, s = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null, h = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null, c.animate || this.element.css(n.extend(o, {
                top: h,
                left: s
            })), i.helper.height(i.size.height), i.helper.width(i.size.width), this._helper && !c.animate && this._proportionallyResize()), n("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", t), this._helper && this.helper.remove(), !1
        },
        _updateVirtualBoundaries: function(n) {
            var u, f, e, o, i, r = this.options;
            i = {
                minWidth: t(r.minWidth) ? r.minWidth : 0,
                maxWidth: t(r.maxWidth) ? r.maxWidth : 1 / 0,
                minHeight: t(r.minHeight) ? r.minHeight : 0,
                maxHeight: t(r.maxHeight) ? r.maxHeight : 1 / 0
            };
            (this._aspectRatio || n) && (u = i.minHeight * this.aspectRatio, e = i.minWidth / this.aspectRatio, f = i.maxHeight * this.aspectRatio, o = i.maxWidth / this.aspectRatio, u > i.minWidth && (i.minWidth = u), e > i.minHeight && (i.minHeight = e), i.maxWidth > f && (i.maxWidth = f), i.maxHeight > o && (i.maxHeight = o));
            this._vBoundaries = i
        },
        _updateCache: function(n) {
            this.offset = this.helper.offset();
            t(n.left) && (this.position.left = n.left);
            t(n.top) && (this.position.top = n.top);
            t(n.height) && (this.size.height = n.height);
            t(n.width) && (this.size.width = n.width)
        },
        _updateRatio: function(n) {
            var i = this.position,
                r = this.size,
                u = this.axis;
            return t(n.height) ? n.width = n.height * this.aspectRatio : t(n.width) && (n.height = n.width / this.aspectRatio), "sw" === u && (n.left = i.left + (r.width - n.width), n.top = null), "nw" === u && (n.top = i.top + (r.height - n.height), n.left = i.left + (r.width - n.width)), n
        },
        _respectSize: function(n) {
            var i = this._vBoundaries,
                r = this.axis,
                u = t(n.width) && i.maxWidth && i.maxWidth < n.width,
                f = t(n.height) && i.maxHeight && i.maxHeight < n.height,
                e = t(n.width) && i.minWidth && i.minWidth > n.width,
                o = t(n.height) && i.minHeight && i.minHeight > n.height,
                s = this.originalPosition.left + this.originalSize.width,
                h = this.position.top + this.size.height,
                c = /sw|nw|w/.test(r),
                l = /nw|ne|n/.test(r);
            return e && (n.width = i.minWidth), o && (n.height = i.minHeight), u && (n.width = i.maxWidth), f && (n.height = i.maxHeight), e && c && (n.left = s - i.minWidth), u && c && (n.left = s - i.maxWidth), o && l && (n.top = h - i.minHeight), f && l && (n.top = h - i.maxHeight), n.width || n.height || n.left || !n.top ? n.width || n.height || n.top || !n.left || (n.left = null) : n.top = null, n
        },
        _proportionallyResize: function() {
            if (this._proportionallyResizeElements.length)
                for (var t, r, u, n, f = this.helper || this.element, i = 0; this._proportionallyResizeElements.length > i; i++) {
                    if (n = this._proportionallyResizeElements[i], !this.borderDif)
                        for (this.borderDif = [], r = [n.css("borderTopWidth"), n.css("borderRightWidth"), n.css("borderBottomWidth"), n.css("borderLeftWidth")], u = [n.css("paddingTop"), n.css("paddingRight"), n.css("paddingBottom"), n.css("paddingLeft")], t = 0; r.length > t; t++) this.borderDif[t] = (parseInt(r[t], 10) || 0) + (parseInt(u[t], 10) || 0);
                    n.css({
                        height: f.height() - this.borderDif[0] - this.borderDif[2] || 0,
                        width: f.width() - this.borderDif[1] - this.borderDif[3] || 0
                    })
                }
        },
        _renderProxy: function() {
            var t = this.element,
                i = this.options;
            this.elementOffset = t.offset();
            this._helper ? (this.helper = this.helper || n("<div style='overflow:hidden;'><\/div>"), this.helper.addClass(this._helper).css({
                width: this.element.outerWidth() - 1,
                height: this.element.outerHeight() - 1,
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++i.zIndex
            }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
        },
        _change: {
            e: function(n, t) {
                return {
                    width: this.originalSize.width + t
                }
            },
            w: function(n, t) {
                var i = this.originalSize,
                    r = this.originalPosition;
                return {
                    left: r.left + t,
                    width: i.width - t
                }
            },
            n: function(n, t, i) {
                var r = this.originalSize,
                    u = this.originalPosition;
                return {
                    top: u.top + i,
                    height: r.height - i
                }
            },
            s: function(n, t, i) {
                return {
                    height: this.originalSize.height + i
                }
            },
            se: function(t, i, r) {
                return n.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, i, r]))
            },
            sw: function(t, i, r) {
                return n.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, i, r]))
            },
            ne: function(t, i, r) {
                return n.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, i, r]))
            },
            nw: function(t, i, r) {
                return n.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, i, r]))
            }
        },
        _propagate: function(t, i) {
            n.ui.plugin.call(this, t, [i, this.ui()]);
            "resize" !== t && this._trigger(t, i, this.ui())
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    });
    n.ui.plugin.add("resizable", "animate", {
        stop: function(t) {
            var i = n(this).data("ui-resizable"),
                u = i.options,
                r = i._proportionallyResizeElements,
                f = r.length && /textarea/i.test(r[0].nodeName),
                s = f && n.ui.hasScroll(r[0], "left") ? 0 : i.sizeDiff.height,
                h = f ? 0 : i.sizeDiff.width,
                c = {
                    width: i.size.width - h,
                    height: i.size.height - s
                },
                e = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null,
                o = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
            i.element.animate(n.extend(c, o && e ? {
                top: o,
                left: e
            } : {}), {
                duration: u.animateDuration,
                easing: u.animateEasing,
                step: function() {
                    var u = {
                        width: parseInt(i.element.css("width"), 10),
                        height: parseInt(i.element.css("height"), 10),
                        top: parseInt(i.element.css("top"), 10),
                        left: parseInt(i.element.css("left"), 10)
                    };
                    r && r.length && n(r[0]).css({
                        width: u.width,
                        height: u.height
                    });
                    i._updateCache(u);
                    i._propagate("resize", t)
                }
            })
        }
    });
    n.ui.plugin.add("resizable", "containment", {
        start: function() {
            var u, e, o, s, h, c, l, t = n(this).data("ui-resizable"),
                a = t.options,
                v = t.element,
                f = a.containment,
                r = f instanceof n ? f.get(0) : /parent/.test(f) ? v.parent().get(0) : f;
            r && (t.containerElement = n(r), /document/.test(f) || f === document ? (t.containerOffset = {
                left: 0,
                top: 0
            }, t.containerPosition = {
                left: 0,
                top: 0
            }, t.parentData = {
                element: n(document),
                left: 0,
                top: 0,
                width: n(document).width(),
                height: n(document).height() || document.body.parentNode.scrollHeight
            }) : (u = n(r), e = [], n(["Top", "Right", "Left", "Bottom"]).each(function(n, t) {
                e[n] = i(u.css("padding" + t))
            }), t.containerOffset = u.offset(), t.containerPosition = u.position(), t.containerSize = {
                height: u.innerHeight() - e[3],
                width: u.innerWidth() - e[1]
            }, o = t.containerOffset, s = t.containerSize.height, h = t.containerSize.width, c = n.ui.hasScroll(r, "left") ? r.scrollWidth : h, l = n.ui.hasScroll(r) ? r.scrollHeight : s, t.parentData = {
                element: r,
                left: o.left,
                top: o.top,
                width: c,
                height: l
            }))
        },
        resize: function(t) {
            var f, o, s, h, i = n(this).data("ui-resizable"),
                a = i.options,
                r = i.containerOffset,
                c = i.position,
                e = i._aspectRatio || t.shiftKey,
                u = {
                    top: 0,
                    left: 0
                },
                l = i.containerElement;
            l[0] !== document && /static/.test(l.css("position")) && (u = r);
            c.left < (i._helper ? r.left : 0) && (i.size.width = i.size.width + (i._helper ? i.position.left - r.left : i.position.left - u.left), e && (i.size.height = i.size.width / i.aspectRatio), i.position.left = a.helper ? r.left : 0);
            c.top < (i._helper ? r.top : 0) && (i.size.height = i.size.height + (i._helper ? i.position.top - r.top : i.position.top), e && (i.size.width = i.size.height * i.aspectRatio), i.position.top = i._helper ? r.top : 0);
            i.offset.left = i.parentData.left + i.position.left;
            i.offset.top = i.parentData.top + i.position.top;
            f = Math.abs((i._helper ? i.offset.left - u.left : i.offset.left - u.left) + i.sizeDiff.width);
            o = Math.abs((i._helper ? i.offset.top - u.top : i.offset.top - r.top) + i.sizeDiff.height);
            s = i.containerElement.get(0) === i.element.parent().get(0);
            h = /relative|absolute/.test(i.containerElement.css("position"));
            s && h && (f -= i.parentData.left);
            f + i.size.width >= i.parentData.width && (i.size.width = i.parentData.width - f, e && (i.size.height = i.size.width / i.aspectRatio));
            o + i.size.height >= i.parentData.height && (i.size.height = i.parentData.height - o, e && (i.size.width = i.size.height * i.aspectRatio))
        },
        stop: function() {
            var t = n(this).data("ui-resizable"),
                r = t.options,
                u = t.containerOffset,
                f = t.containerPosition,
                e = t.containerElement,
                i = n(t.helper),
                o = i.offset(),
                s = i.outerWidth() - t.sizeDiff.width,
                h = i.outerHeight() - t.sizeDiff.height;
            t._helper && !r.animate && /relative/.test(e.css("position")) && n(this).css({
                left: o.left - f.left - u.left,
                width: s,
                height: h
            });
            t._helper && !r.animate && /static/.test(e.css("position")) && n(this).css({
                left: o.left - f.left - u.left,
                width: s,
                height: h
            })
        }
    });
    n.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var r = n(this).data("ui-resizable"),
                t = r.options,
                i = function(t) {
                    n(t).each(function() {
                        var t = n(this);
                        t.data("ui-resizable-alsoresize", {
                            width: parseInt(t.width(), 10),
                            height: parseInt(t.height(), 10),
                            left: parseInt(t.css("left"), 10),
                            top: parseInt(t.css("top"), 10)
                        })
                    })
                };
            "object" != typeof t.alsoResize || t.alsoResize.parentNode ? i(t.alsoResize) : t.alsoResize.length ? (t.alsoResize = t.alsoResize[0], i(t.alsoResize)) : n.each(t.alsoResize, function(n) {
                i(n)
            })
        },
        resize: function(t, i) {
            var r = n(this).data("ui-resizable"),
                u = r.options,
                f = r.originalSize,
                e = r.originalPosition,
                s = {
                    height: r.size.height - f.height || 0,
                    width: r.size.width - f.width || 0,
                    top: r.position.top - e.top || 0,
                    left: r.position.left - e.left || 0
                },
                o = function(t, r) {
                    n(t).each(function() {
                        var t = n(this),
                            f = n(this).data("ui-resizable-alsoresize"),
                            u = {},
                            e = r && r.length ? r : t.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                        n.each(e, function(n, t) {
                            var i = (f[t] || 0) + (s[t] || 0);
                            i && i >= 0 && (u[t] = i || null)
                        });
                        t.css(u)
                    })
                };
            "object" != typeof u.alsoResize || u.alsoResize.nodeType ? o(u.alsoResize) : n.each(u.alsoResize, function(n, t) {
                o(n, t)
            })
        },
        stop: function() {
            n(this).removeData("resizable-alsoresize")
        }
    });
    n.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var t = n(this).data("ui-resizable"),
                i = t.options,
                r = t.size;
            t.ghost = t.originalElement.clone();
            t.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: r.height,
                width: r.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost : "");
            t.ghost.appendTo(t.helper)
        },
        resize: function() {
            var t = n(this).data("ui-resizable");
            t.ghost && t.ghost.css({
                position: "relative",
                height: t.size.height,
                width: t.size.width
            })
        },
        stop: function() {
            var t = n(this).data("ui-resizable");
            t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0))
        }
    });
    n.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var t = n(this).data("ui-resizable"),
                i = t.options,
                v = t.size,
                f = t.originalSize,
                e = t.originalPosition,
                h = t.axis,
                c = "number" == typeof i.grid ? [i.grid, i.grid] : i.grid,
                o = c[0] || 1,
                s = c[1] || 1,
                l = Math.round((v.width - f.width) / o) * o,
                a = Math.round((v.height - f.height) / s) * s,
                r = f.width + l,
                u = f.height + a,
                y = i.maxWidth && r > i.maxWidth,
                p = i.maxHeight && u > i.maxHeight,
                w = i.minWidth && i.minWidth > r,
                b = i.minHeight && i.minHeight > u;
            i.grid = c;
            w && (r += o);
            b && (u += s);
            y && (r -= o);
            p && (u -= s);
            /^(se|s|e)$/.test(h) ? (t.size.width = r, t.size.height = u) : /^(ne)$/.test(h) ? (t.size.width = r, t.size.height = u, t.position.top = e.top - a) : /^(sw)$/.test(h) ? (t.size.width = r, t.size.height = u, t.position.left = e.left - l) : (t.size.width = r, t.size.height = u, t.position.top = e.top - a, t.position.left = e.left - l)
        }
    })
}(jQuery),
function(n) {
    n.widget("ui.selectable", n.ui.mouse, {
        version: "1.10.3",
        options: {
            appendTo: "body",
            autoRefresh: !0,
            distance: 0,
            filter: "*",
            tolerance: "touch",
            selected: null,
            selecting: null,
            start: null,
            stop: null,
            unselected: null,
            unselecting: null
        },
        _create: function() {
            var t, i = this;
            this.element.addClass("ui-selectable");
            this.dragged = !1;
            this.refresh = function() {
                t = n(i.options.filter, i.element[0]);
                t.addClass("ui-selectee");
                t.each(function() {
                    var t = n(this),
                        i = t.offset();
                    n.data(this, "selectable-item", {
                        element: this,
                        $element: t,
                        left: i.left,
                        top: i.top,
                        right: i.left + t.outerWidth(),
                        bottom: i.top + t.outerHeight(),
                        startselected: !1,
                        selected: t.hasClass("ui-selected"),
                        selecting: t.hasClass("ui-selecting"),
                        unselecting: t.hasClass("ui-unselecting")
                    })
                })
            };
            this.refresh();
            this.selectees = t.addClass("ui-selectee");
            this._mouseInit();
            this.helper = n("<div class='ui-selectable-helper'><\/div>")
        },
        _destroy: function() {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item");
            this.element.removeClass("ui-selectable ui-selectable-disabled");
            this._mouseDestroy()
        },
        _mouseStart: function(t) {
            var i = this,
                r = this.options;
            this.opos = [t.pageX, t.pageY];
            this.options.disabled || (this.selectees = n(r.filter, this.element[0]), this._trigger("start", t), n(r.appendTo).append(this.helper), this.helper.css({
                left: t.pageX,
                top: t.pageY,
                width: 0,
                height: 0
            }), r.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                var r = n.data(this, "selectable-item");
                r.startselected = !0;
                t.metaKey || t.ctrlKey || (r.$element.removeClass("ui-selected"), r.selected = !1, r.$element.addClass("ui-unselecting"), r.unselecting = !0, i._trigger("unselecting", t, {
                    unselecting: r.element
                }))
            }), n(t.target).parents().addBack().each(function() {
                var u, r = n.data(this, "selectable-item");
                return r ? (u = !t.metaKey && !t.ctrlKey || !r.$element.hasClass("ui-selected"), r.$element.removeClass(u ? "ui-unselecting" : "ui-selected").addClass(u ? "ui-selecting" : "ui-unselecting"), r.unselecting = !u, r.selecting = u, r.selected = u, u ? i._trigger("selecting", t, {
                    selecting: r.element
                }) : i._trigger("unselecting", t, {
                    unselecting: r.element
                }), !1) : undefined
            }))
        },
        _mouseDrag: function(t) {
            if (this.dragged = !0, !this.options.disabled) {
                var e, o = this,
                    s = this.options,
                    i = this.opos[0],
                    r = this.opos[1],
                    u = t.pageX,
                    f = t.pageY;
                return i > u && (e = u, u = i, i = e), r > f && (e = f, f = r, r = e), this.helper.css({
                    left: i,
                    top: r,
                    width: u - i,
                    height: f - r
                }), this.selectees.each(function() {
                    var e = n.data(this, "selectable-item"),
                        h = !1;
                    e && e.element !== o.element[0] && ("touch" === s.tolerance ? h = !(e.left > u || i > e.right || e.top > f || r > e.bottom) : "fit" === s.tolerance && (h = e.left > i && u > e.right && e.top > r && f > e.bottom), h ? (e.selected && (e.$element.removeClass("ui-selected"), e.selected = !1), e.unselecting && (e.$element.removeClass("ui-unselecting"), e.unselecting = !1), e.selecting || (e.$element.addClass("ui-selecting"), e.selecting = !0, o._trigger("selecting", t, {
                        selecting: e.element
                    }))) : (e.selecting && ((t.metaKey || t.ctrlKey) && e.startselected ? (e.$element.removeClass("ui-selecting"), e.selecting = !1, e.$element.addClass("ui-selected"), e.selected = !0) : (e.$element.removeClass("ui-selecting"), e.selecting = !1, e.startselected && (e.$element.addClass("ui-unselecting"), e.unselecting = !0), o._trigger("unselecting", t, {
                        unselecting: e.element
                    }))), e.selected && (t.metaKey || t.ctrlKey || e.startselected || (e.$element.removeClass("ui-selected"), e.selected = !1, e.$element.addClass("ui-unselecting"), e.unselecting = !0, o._trigger("unselecting", t, {
                        unselecting: e.element
                    })))))
                }), !1
            }
        },
        _mouseStop: function(t) {
            var i = this;
            return this.dragged = !1, n(".ui-unselecting", this.element[0]).each(function() {
                var r = n.data(this, "selectable-item");
                r.$element.removeClass("ui-unselecting");
                r.unselecting = !1;
                r.startselected = !1;
                i._trigger("unselected", t, {
                    unselected: r.element
                })
            }), n(".ui-selecting", this.element[0]).each(function() {
                var r = n.data(this, "selectable-item");
                r.$element.removeClass("ui-selecting").addClass("ui-selected");
                r.selecting = !1;
                r.selected = !0;
                r.startselected = !0;
                i._trigger("selected", t, {
                    selected: r.element
                })
            }), this._trigger("stop", t), this.helper.remove(), !1
        }
    })
}(jQuery),
function(n) {
    function t(n, t, i) {
        return n > t && t + i > n
    }

    function i(n) {
        return /left|right/.test(n.css("float")) || /inline|table-cell/.test(n.css("display"))
    }
    n.widget("ui.sortable", n.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _create: function() {
            var n = this.options;
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? "x" === n.axis || i(this.items[0].item) : !1;
            this.offset = this.element.offset();
            this._mouseInit();
            this.ready = !0
        },
        _destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled");
            this._mouseDestroy();
            for (var n = this.items.length - 1; n >= 0; n--) this.items[n].item.removeData(this.widgetName + "-item");
            return this
        },
        _setOption: function(t, i) {
            "disabled" === t ? (this.options[t] = i, this.widget().toggleClass("ui-sortable-disabled", !!i)) : n.Widget.prototype._setOption.apply(this, arguments)
        },
        _mouseCapture: function(t, i) {
            var r = null,
                f = !1,
                u = this;
            return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(t), n(t.target).parents().each(function() {
                return n.data(this, u.widgetName + "-item") === u ? (r = n(this), !1) : undefined
            }), n.data(t.target, u.widgetName + "-item") === u && (r = n(t.target)), r ? !this.options.handle || i || (n(this.options.handle, r).find("*").addBack().each(function() {
                this === t.target && (f = !0)
            }), f) ? (this.currentItem = r, this._removeCurrentsFromItems(), !0) : !1 : !1)
        },
        _mouseStart: function(t, i, r) {
            var f, e, u = this.options;
            if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(t), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                }, n.extend(this.offset, {
                    click: {
                        left: t.pageX - this.offset.left,
                        top: t.pageY - this.offset.top
                    },
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, u.cursorAt && this._adjustOffsetFromHelper(u.cursorAt), this.domPosition = {
                    prev: this.currentItem.prev()[0],
                    parent: this.currentItem.parent()[0]
                }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), u.containment && this._setContainment(), u.cursor && "auto" !== u.cursor && (e = this.document.find("body"), this.storedCursor = e.css("cursor"), e.css("cursor", u.cursor), this.storedStylesheet = n("<style>*{ cursor: " + u.cursor + " !important; }<\/style>").appendTo(e)), u.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", u.opacity)), u.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", u.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", t, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !r)
                for (f = this.containers.length - 1; f >= 0; f--) this.containers[f]._trigger("activate", t, this._uiHash(this));
            return n.ui.ddmanager && (n.ui.ddmanager.current = this), n.ui.ddmanager && !u.dropBehaviour && n.ui.ddmanager.prepareOffsets(this, t), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(t), !0
        },
        _mouseDrag: function(t) {
            var e, u, f, o, i = this.options,
                r = !1;
            for (this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < i.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + i.scrollSpeed : t.pageY - this.overflowOffset.top < i.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - i.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < i.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + i.scrollSpeed : t.pageX - this.overflowOffset.left < i.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - i.scrollSpeed)) : (t.pageY - n(document).scrollTop() < i.scrollSensitivity ? r = n(document).scrollTop(n(document).scrollTop() - i.scrollSpeed) : n(window).height() - (t.pageY - n(document).scrollTop()) < i.scrollSensitivity && (r = n(document).scrollTop(n(document).scrollTop() + i.scrollSpeed)), t.pageX - n(document).scrollLeft() < i.scrollSensitivity ? r = n(document).scrollLeft(n(document).scrollLeft() - i.scrollSpeed) : n(window).width() - (t.pageX - n(document).scrollLeft()) < i.scrollSensitivity && (r = n(document).scrollLeft(n(document).scrollLeft() + i.scrollSpeed))), r !== !1 && n.ui.ddmanager && !i.dropBehaviour && n.ui.ddmanager.prepareOffsets(this, t)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), e = this.items.length - 1; e >= 0; e--)
                if (u = this.items[e], f = u.item[0], o = this._intersectsWithPointer(u), o && u.instance === this.currentContainer && f !== this.currentItem[0] && this.placeholder[1 === o ? "next" : "prev"]()[0] !== f && !n.contains(this.placeholder[0], f) && ("semi-dynamic" === this.options.type ? !n.contains(this.element[0], f) : !0)) {
                    if (this.direction = 1 === o ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(u)) break;
                    this._rearrange(t, u);
                    this._trigger("change", t, this._uiHash());
                    break
                }
            return this._contactContainers(t), n.ui.ddmanager && n.ui.ddmanager.drag(this, t), this._trigger("sort", t, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
        },
        _mouseStop: function(t, i) {
            if (t) {
                if (n.ui.ddmanager && !this.options.dropBehaviour && n.ui.ddmanager.drop(this, t), this.options.revert) {
                    var e = this,
                        f = this.placeholder.offset(),
                        r = this.options.axis,
                        u = {};
                    r && "x" !== r || (u.left = f.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft));
                    r && "y" !== r || (u.top = f.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop));
                    this.reverting = !0;
                    n(this.helper).animate(u, parseInt(this.options.revert, 10) || 500, function() {
                        e._clear(t)
                    })
                } else this._clear(t, i);
                return !1
            }
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                });
                "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var t = this.containers.length - 1; t >= 0; t--) this.containers[t]._trigger("deactivate", null, this._uiHash(this)), this.containers[t].containerCache.over && (this.containers[t]._trigger("out", null, this._uiHash(this)), this.containers[t].containerCache.over = 0)
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), n.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }), this.domPosition.prev ? n(this.domPosition.prev).after(this.currentItem) : n(this.domPosition.parent).prepend(this.currentItem)), this
        },
        serialize: function(t) {
            var r = this._getItemsAsjQuery(t && t.connected),
                i = [];
            return t = t || {}, n(r).each(function() {
                var r = (n(t.item || this).attr(t.attribute || "id") || "").match(t.expression || /(.+)[\-=_](.+)/);
                r && i.push((t.key || r[1] + "[]") + "=" + (t.key && t.expression ? r[1] : r[2]))
            }), !i.length && t.key && i.push(t.key + "="), i.join("&")
        },
        toArray: function(t) {
            var r = this._getItemsAsjQuery(t && t.connected),
                i = [];
            return t = t || {}, r.each(function() {
                i.push(n(t.item || this).attr(t.attribute || "id") || "")
            }), i
        },
        _intersectsWith: function(n) {
            var t = this.positionAbs.left,
                h = t + this.helperProportions.width,
                i = this.positionAbs.top,
                c = i + this.helperProportions.height,
                r = n.left,
                f = r + n.width,
                u = n.top,
                e = u + n.height,
                o = this.offset.click.top,
                s = this.offset.click.left,
                l = "x" === this.options.axis || i + o > u && e > i + o,
                a = "y" === this.options.axis || t + s > r && f > t + s,
                v = l && a;
            return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > n[this.floating ? "width" : "height"] ? v : t + this.helperProportions.width / 2 > r && f > h - this.helperProportions.width / 2 && i + this.helperProportions.height / 2 > u && e > c - this.helperProportions.height / 2
        },
        _intersectsWithPointer: function(n) {
            var u = "x" === this.options.axis || t(this.positionAbs.top + this.offset.click.top, n.top, n.height),
                f = "y" === this.options.axis || t(this.positionAbs.left + this.offset.click.left, n.left, n.width),
                e = u && f,
                i = this._getDragVerticalDirection(),
                r = this._getDragHorizontalDirection();
            return e ? this.floating ? r && "right" === r || "down" === i ? 2 : 1 : i && ("down" === i ? 2 : 1) : !1
        },
        _intersectsWithSides: function(n) {
            var u = t(this.positionAbs.top + this.offset.click.top, n.top + n.height / 2, n.height),
                f = t(this.positionAbs.left + this.offset.click.left, n.left + n.width / 2, n.width),
                i = this._getDragVerticalDirection(),
                r = this._getDragHorizontalDirection();
            return this.floating && r ? "right" === r && f || "left" === r && !f : i && ("down" === i && u || "up" === i && !u)
        },
        _getDragVerticalDirection: function() {
            var n = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 !== n && (n > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function() {
            var n = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 !== n && (n > 0 ? "right" : "left")
        },
        refresh: function(n) {
            return this._refreshItems(n), this.refreshPositions(), this
        },
        _connectWith: function() {
            var n = this.options;
            return n.connectWith.constructor === String ? [n.connectWith] : n.connectWith
        },
        _getItemsAsjQuery: function(t) {
            var r, u, e, i, s = [],
                f = [],
                o = this._connectWith();
            if (o && t)
                for (r = o.length - 1; r >= 0; r--)
                    for (e = n(o[r]), u = e.length - 1; u >= 0; u--) i = n.data(e[u], this.widgetFullName), i && i !== this && !i.options.disabled && f.push([n.isFunction(i.options.items) ? i.options.items.call(i.element) : n(i.options.items, i.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), i]);
            for (f.push([n.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                    options: this.options,
                    item: this.currentItem
                }) : n(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), r = f.length - 1; r >= 0; r--) f[r][0].each(function() {
                s.push(this)
            });
            return n(s)
        },
        _removeCurrentsFromItems: function() {
            var t = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = n.grep(this.items, function(n) {
                for (var i = 0; t.length > i; i++)
                    if (t[i] === n.item[0]) return !1;
                return !0
            })
        },
        _refreshItems: function(t) {
            this.items = [];
            this.containers = [this];
            var r, u, e, i, o, s, h, l, a = this.items,
                f = [
                    [n.isFunction(this.options.items) ? this.options.items.call(this.element[0], t, {
                        item: this.currentItem
                    }) : n(this.options.items, this.element), this]
                ],
                c = this._connectWith();
            if (c && this.ready)
                for (r = c.length - 1; r >= 0; r--)
                    for (e = n(c[r]), u = e.length - 1; u >= 0; u--) i = n.data(e[u], this.widgetFullName), i && i !== this && !i.options.disabled && (f.push([n.isFunction(i.options.items) ? i.options.items.call(i.element[0], t, {
                        item: this.currentItem
                    }) : n(i.options.items, i.element), i]), this.containers.push(i));
            for (r = f.length - 1; r >= 0; r--)
                for (o = f[r][1], s = f[r][0], u = 0, l = s.length; l > u; u++) h = n(s[u]), h.data(this.widgetName + "-item", o), a.push({
                    item: h,
                    instance: o,
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0
                })
        },
        refreshPositions: function(t) {
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            for (var r, f, u, i = this.items.length - 1; i >= 0; i--) r = this.items[i], r.instance !== this.currentContainer && this.currentContainer && r.item[0] !== this.currentItem[0] || (f = this.options.toleranceElement ? n(this.options.toleranceElement, r.item) : r.item, t || (r.width = f.outerWidth(), r.height = f.outerHeight()), u = f.offset(), r.left = u.left, r.top = u.top);
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
            else
                for (i = this.containers.length - 1; i >= 0; i--) u = this.containers[i].element.offset(), this.containers[i].containerCache.left = u.left, this.containers[i].containerCache.top = u.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
            return this
        },
        _createPlaceholder: function(t) {
            t = t || this;
            var r, i = t.options;
            i.placeholder && i.placeholder.constructor !== String || (r = i.placeholder, i.placeholder = {
                element: function() {
                    var u = t.currentItem[0].nodeName.toLowerCase(),
                        i = n("<" + u + ">", t.document[0]).addClass(r || t.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                    return "tr" === u ? t.currentItem.children().each(function() {
                        n("<td>&#160;<\/td>", t.document[0]).attr("colspan", n(this).attr("colspan") || 1).appendTo(i)
                    }) : "img" === u && i.attr("src", t.currentItem.attr("src")), r || i.css("visibility", "hidden"), i
                },
                update: function(n, u) {
                    (!r || i.forcePlaceholderSize) && (u.height() || u.height(t.currentItem.innerHeight() - parseInt(t.currentItem.css("paddingTop") || 0, 10) - parseInt(t.currentItem.css("paddingBottom") || 0, 10)), u.width() || u.width(t.currentItem.innerWidth() - parseInt(t.currentItem.css("paddingLeft") || 0, 10) - parseInt(t.currentItem.css("paddingRight") || 0, 10)))
                }
            });
            t.placeholder = n(i.placeholder.element.call(t.element, t.currentItem));
            t.currentItem.after(t.placeholder);
            i.placeholder.update(t, t.placeholder)
        },
        _contactContainers: function(r) {
            for (var f, v, s, l, y, h, o, p, a, c = null, e = null, u = this.containers.length - 1; u >= 0; u--)
                if (!n.contains(this.currentItem[0], this.containers[u].element[0]))
                    if (this._intersectsWith(this.containers[u].containerCache)) {
                        if (c && n.contains(this.containers[u].element[0], c.element[0])) continue;
                        c = this.containers[u];
                        e = u
                    } else this.containers[u].containerCache.over && (this.containers[u]._trigger("out", r, this._uiHash(this)), this.containers[u].containerCache.over = 0);
            if (c)
                if (1 === this.containers.length) this.containers[e].containerCache.over || (this.containers[e]._trigger("over", r, this._uiHash(this)), this.containers[e].containerCache.over = 1);
                else {
                    for (v = 1e4, s = null, a = c.floating || i(this.currentItem), l = a ? "left" : "top", y = a ? "width" : "height", h = this.positionAbs[l] + this.offset.click[l], f = this.items.length - 1; f >= 0; f--) n.contains(this.containers[e].element[0], this.items[f].item[0]) && this.items[f].item[0] !== this.currentItem[0] && (!a || t(this.positionAbs.top + this.offset.click.top, this.items[f].top, this.items[f].height)) && (o = this.items[f].item.offset()[l], p = !1, Math.abs(o - h) > Math.abs(o + this.items[f][y] - h) && (p = !0, o += this.items[f][y]), v > Math.abs(o - h) && (v = Math.abs(o - h), s = this.items[f], this.direction = p ? "up" : "down"));
                    if (!s && !this.options.dropOnEmpty) return;
                    if (this.currentContainer === this.containers[e]) return;
                    s ? this._rearrange(r, s, null, !0) : this._rearrange(r, null, this.containers[e].element, !0);
                    this._trigger("change", r, this._uiHash());
                    this.containers[e]._trigger("change", r, this._uiHash(this));
                    this.currentContainer = this.containers[e];
                    this.options.placeholder.update(this.currentContainer, this.placeholder);
                    this.containers[e]._trigger("over", r, this._uiHash(this));
                    this.containers[e].containerCache.over = 1
                }
        },
        _createHelper: function(t) {
            var r = this.options,
                i = n.isFunction(r.helper) ? n(r.helper.apply(this.element[0], [t, this.currentItem])) : "clone" === r.helper ? this.currentItem.clone() : this.currentItem;
            return i.parents("body").length || n("parent" !== r.appendTo ? r.appendTo : this.currentItem[0].parentNode)[0].appendChild(i[0]), i[0] === this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }), (!i[0].style.width || r.forceHelperSize) && i.width(this.currentItem.width()), (!i[0].style.height || r.forceHelperSize) && i.height(this.currentItem.height()), i
        },
        _adjustOffsetFromHelper: function(t) {
            "string" == typeof t && (t = t.split(" "));
            n.isArray(t) && (t = {
                left: +t[0],
                top: +t[1] || 0
            });
            "left" in t && (this.offset.click.left = t.left + this.margins.left);
            "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left);
            "top" in t && (this.offset.click.top = t.top + this.margins.top);
            "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var t = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== document && n.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && n.ui.ie) && (t = {
                top: 0,
                left: 0
            }), {
                top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" === this.cssPosition) {
                var n = this.currentItem.position();
                return {
                    top: n.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: n.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var t, r, u, i = this.options;
            "parent" === i.containment && (i.containment = this.helper[0].parentNode);
            ("document" === i.containment || "window" === i.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, n("document" === i.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (n("document" === i.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]);
            /^(document|window|parent)$/.test(i.containment) || (t = n(i.containment)[0], r = n(i.containment).offset(), u = "hidden" !== n(t).css("overflow"), this.containment = [r.left + (parseInt(n(t).css("borderLeftWidth"), 10) || 0) + (parseInt(n(t).css("paddingLeft"), 10) || 0) - this.margins.left, r.top + (parseInt(n(t).css("borderTopWidth"), 10) || 0) + (parseInt(n(t).css("paddingTop"), 10) || 0) - this.margins.top, r.left + (u ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) - (parseInt(n(t).css("borderLeftWidth"), 10) || 0) - (parseInt(n(t).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, r.top + (u ? Math.max(t.scrollHeight, t.offsetHeight) : t.offsetHeight) - (parseInt(n(t).css("borderTopWidth"), 10) || 0) - (parseInt(n(t).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
        },
        _convertPositionTo: function(t, i) {
            i || (i = this.position);
            var r = "absolute" === t ? 1 : -1,
                u = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && n.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                f = /(html|body)/i.test(u[0].tagName);
            return {
                top: i.top + this.offset.relative.top * r + this.offset.parent.top * r - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : f ? 0 : u.scrollTop()) * r,
                left: i.left + this.offset.relative.left * r + this.offset.parent.left * r - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : f ? 0 : u.scrollLeft()) * r
            }
        },
        _generatePosition: function(t) {
            var r, u, i = this.options,
                f = t.pageX,
                e = t.pageY,
                o = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && n.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                s = /(html|body)/i.test(o[0].tagName);
            return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left), t.pageY - this.offset.click.top < this.containment[1] && (e = this.containment[1] + this.offset.click.top), t.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left), t.pageY - this.offset.click.top > this.containment[3] && (e = this.containment[3] + this.offset.click.top)), i.grid && (r = this.originalPageY + Math.round((e - this.originalPageY) / i.grid[1]) * i.grid[1], e = this.containment ? r - this.offset.click.top >= this.containment[1] && r - this.offset.click.top <= this.containment[3] ? r : r - this.offset.click.top >= this.containment[1] ? r - i.grid[1] : r + i.grid[1] : r, u = this.originalPageX + Math.round((f - this.originalPageX) / i.grid[0]) * i.grid[0], f = this.containment ? u - this.offset.click.left >= this.containment[0] && u - this.offset.click.left <= this.containment[2] ? u : u - this.offset.click.left >= this.containment[0] ? u - i.grid[0] : u + i.grid[0] : u)), {
                top: e - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : s ? 0 : o.scrollTop()),
                left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : s ? 0 : o.scrollLeft())
            }
        },
        _rearrange: function(n, t, i, r) {
            i ? i[0].appendChild(this.placeholder[0]) : t.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? t.item[0] : t.item[0].nextSibling);
            this.counter = this.counter ? ++this.counter : 1;
            var u = this.counter;
            this._delay(function() {
                u === this.counter && this.refreshPositions(!r)
            })
        },
        _clear: function(n, t) {
            this.reverting = !1;
            var i, r = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                for (i in this._storedCSS)("auto" === this._storedCSS[i] || "static" === this._storedCSS[i]) && (this._storedCSS[i] = "");
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else this.currentItem.show();
            for (this.fromOutside && !t && r.push(function(n) {
                    this._trigger("receive", n, this._uiHash(this.fromOutside))
                }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || t || r.push(function(n) {
                    this._trigger("update", n, this._uiHash())
                }), this !== this.currentContainer && (t || (r.push(function(n) {
                    this._trigger("remove", n, this._uiHash())
                }), r.push(function(n) {
                    return function(t) {
                        n._trigger("receive", t, this._uiHash(this))
                    }
                }.call(this, this.currentContainer)), r.push(function(n) {
                    return function(t) {
                        n._trigger("update", t, this._uiHash(this))
                    }
                }.call(this, this.currentContainer)))), i = this.containers.length - 1; i >= 0; i--) t || r.push(function(n) {
                return function(t) {
                    n._trigger("deactivate", t, this._uiHash(this))
                }
            }.call(this, this.containers[i])), this.containers[i].containerCache.over && (r.push(function(n) {
                return function(t) {
                    n._trigger("out", t, this._uiHash(this))
                }
            }.call(this, this.containers[i])), this.containers[i].containerCache.over = 0);
            if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
                if (!t) {
                    for (this._trigger("beforeStop", n, this._uiHash()), i = 0; r.length > i; i++) r[i].call(this, n);
                    this._trigger("stop", n, this._uiHash())
                }
                return this.fromOutside = !1, !1
            }
            if (t || this._trigger("beforeStop", n, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, !t) {
                for (i = 0; r.length > i; i++) r[i].call(this, n);
                this._trigger("stop", n, this._uiHash())
            }
            return this.fromOutside = !1, !0
        },
        _trigger: function() {
            n.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
        },
        _uiHash: function(t) {
            var i = t || this;
            return {
                helper: i.helper,
                placeholder: i.placeholder || n([]),
                position: i.position,
                originalPosition: i.originalPosition,
                offset: i.positionAbs,
                item: i.currentItem,
                sender: t ? t.element : null
            }
        }
    })
}(jQuery),
function(n) {
    var r = 0,
        t = {},
        i = {};
    t.height = t.paddingTop = t.paddingBottom = t.borderTopWidth = t.borderBottomWidth = "hide";
    i.height = i.paddingTop = i.paddingBottom = i.borderTopWidth = i.borderBottomWidth = "show";
    n.widget("ui.accordion", {
        version: "1.10.3",
        options: {
            active: 0,
            animate: {},
            collapsible: !1,
            event: "click",
            header: "> li > :first-child,> :not(li):even",
            heightStyle: "auto",
            icons: {
                activeHeader: "ui-icon-triangle-1-s",
                header: "ui-icon-triangle-1-e"
            },
            activate: null,
            beforeActivate: null
        },
        _create: function() {
            var t = this.options;
            this.prevShow = this.prevHide = n();
            this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist");
            t.collapsible || t.active !== !1 && null != t.active || (t.active = 0);
            this._processPanels();
            0 > t.active && (t.active += this.headers.length);
            this._refresh()
        },
        _getCreateEventData: function() {
            return {
                header: this.active,
                panel: this.active.length ? this.active.next() : n(),
                content: this.active.length ? this.active.next() : n()
            }
        },
        _createIcons: function() {
            var t = this.options.icons;
            t && (n("<span>").addClass("ui-accordion-header-icon ui-icon " + t.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(t.header).addClass(t.activeHeader), this.headers.addClass("ui-accordion-icons"))
        },
        _destroyIcons: function() {
            this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
        },
        _destroy: function() {
            var n;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");
            this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function() {
                /^ui-accordion/.test(this.id) && this.removeAttribute("id")
            });
            this._destroyIcons();
            n = this.headers.next().css("display", "").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function() {
                /^ui-accordion/.test(this.id) && this.removeAttribute("id")
            });
            "content" !== this.options.heightStyle && n.css("height", "")
        },
        _setOption: function(n, t) {
            return "active" === n ? (this._activate(t), undefined) : ("event" === n && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(t)), this._super(n, t), "collapsible" !== n || t || this.options.active !== !1 || this._activate(0), "icons" === n && (this._destroyIcons(), t && this._createIcons()), "disabled" === n && this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!t), undefined)
        },
        _keydown: function(t) {
            if (!t.altKey && !t.ctrlKey) {
                var i = n.ui.keyCode,
                    u = this.headers.length,
                    f = this.headers.index(t.target),
                    r = !1;
                switch (t.keyCode) {
                    case i.RIGHT:
                    case i.DOWN:
                        r = this.headers[(f + 1) % u];
                        break;
                    case i.LEFT:
                    case i.UP:
                        r = this.headers[(f - 1 + u) % u];
                        break;
                    case i.SPACE:
                    case i.ENTER:
                        this._eventHandler(t);
                        break;
                    case i.HOME:
                        r = this.headers[0];
                        break;
                    case i.END:
                        r = this.headers[u - 1]
                }
                r && (n(t.target).attr("tabIndex", -1), n(r).attr("tabIndex", 0), r.focus(), t.preventDefault())
            }
        },
        _panelKeyDown: function(t) {
            t.keyCode === n.ui.keyCode.UP && t.ctrlKey && n(t.currentTarget).prev().focus()
        },
        refresh: function() {
            var t = this.options;
            this._processPanels();
            t.active === !1 && t.collapsible === !0 || !this.headers.length ? (t.active = !1, this.active = n()) : t.active === !1 ? this._activate(0) : this.active.length && !n.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (t.active = !1, this.active = n()) : this._activate(Math.max(0, t.active - 1)) : t.active = this.headers.index(this.active);
            this._destroyIcons();
            this._refresh()
        },
        _processPanels: function() {
            this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all");
            this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide()
        },
        _refresh: function() {
            var t, i = this.options,
                u = i.heightStyle,
                e = this.element.parent(),
                f = this.accordionId = "ui-accordion-" + (this.element.attr("id") || ++r);
            this.active = this._findActive(i.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all");
            this.active.next().addClass("ui-accordion-content-active").show();
            this.headers.attr("role", "tab").each(function(t) {
                var i = n(this),
                    r = i.attr("id"),
                    e = i.next(),
                    u = e.attr("id");
                r || (r = f + "-header-" + t, i.attr("id", r));
                u || (u = f + "-panel-" + t, e.attr("id", u));
                i.attr("aria-controls", u);
                e.attr("aria-labelledby", r)
            }).next().attr("role", "tabpanel");
            this.headers.not(this.active).attr({
                "aria-selected": "false",
                tabIndex: -1
            }).next().attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }).hide();
            this.active.length ? this.active.attr({
                "aria-selected": "true",
                tabIndex: 0
            }).next().attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            }) : this.headers.eq(0).attr("tabIndex", 0);
            this._createIcons();
            this._setupEvents(i.event);
            "fill" === u ? (t = e.height(), this.element.siblings(":visible").each(function() {
                var i = n(this),
                    r = i.css("position");
                "absolute" !== r && "fixed" !== r && (t -= i.outerHeight(!0))
            }), this.headers.each(function() {
                t -= n(this).outerHeight(!0)
            }), this.headers.next().each(function() {
                n(this).height(Math.max(0, t - n(this).innerHeight() + n(this).height()))
            }).css("overflow", "auto")) : "auto" === u && (t = 0, this.headers.next().each(function() {
                t = Math.max(t, n(this).css("height", "").height())
            }).height(t))
        },
        _activate: function(t) {
            var i = this._findActive(t)[0];
            i !== this.active[0] && (i = i || this.active[0], this._eventHandler({
                target: i,
                currentTarget: i,
                preventDefault: n.noop
            }))
        },
        _findActive: function(t) {
            return "number" == typeof t ? this.headers.eq(t) : n()
        },
        _setupEvents: function(t) {
            var i = {
                keydown: "_keydown"
            };
            t && n.each(t.split(" "), function(n, t) {
                i[t] = "_eventHandler"
            });
            this._off(this.headers.add(this.headers.next()));
            this._on(this.headers, i);
            this._on(this.headers.next(), {
                keydown: "_panelKeyDown"
            });
            this._hoverable(this.headers);
            this._focusable(this.headers)
        },
        _eventHandler: function(t) {
            var i = this.options,
                u = this.active,
                r = n(t.currentTarget),
                f = r[0] === u[0],
                e = f && i.collapsible,
                s = e ? n() : r.next(),
                h = u.next(),
                o = {
                    oldHeader: u,
                    oldPanel: h,
                    newHeader: e ? n() : r,
                    newPanel: s
                };
            t.preventDefault();
            f && !i.collapsible || this._trigger("beforeActivate", t, o) === !1 || (i.active = e ? !1 : this.headers.index(r), this.active = f ? n() : r, this._toggle(o), u.removeClass("ui-accordion-header-active ui-state-active"), i.icons && u.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header), f || (r.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), i.icons && r.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader), r.next().addClass("ui-accordion-content-active")))
        },
        _toggle: function(t) {
            var r = t.newPanel,
                i = this.prevShow.length ? this.prevShow : t.oldPanel;
            this.prevShow.add(this.prevHide).stop(!0, !0);
            this.prevShow = r;
            this.prevHide = i;
            this.options.animate ? this._animate(r, i, t) : (i.hide(), r.show(), this._toggleComplete(t));
            i.attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            });
            i.prev().attr("aria-selected", "false");
            r.length && i.length ? i.prev().attr("tabIndex", -1) : r.length && this.headers.filter(function() {
                return 0 === n(this).attr("tabIndex")
            }).attr("tabIndex", -1);
            r.attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            }).prev().attr({
                "aria-selected": "true",
                tabIndex: 0
            })
        },
        _animate: function(n, r, u) {
            var l, f, e, a = this,
                h = 0,
                v = n.length && (!r.length || n.index() < r.index()),
                s = this.options.animate || {},
                o = v && s.down || s,
                c = function() {
                    a._toggleComplete(u)
                };
            return "number" == typeof o && (e = o), "string" == typeof o && (f = o), f = f || o.easing || s.easing, e = e || o.duration || s.duration, r.length ? n.length ? (l = n.show().outerHeight(), r.animate(t, {
                duration: e,
                easing: f,
                step: function(n, t) {
                    t.now = Math.round(n)
                }
            }), n.hide().animate(i, {
                duration: e,
                easing: f,
                complete: c,
                step: function(n, t) {
                    t.now = Math.round(n);
                    "height" !== t.prop ? h += t.now : "content" !== a.options.heightStyle && (t.now = Math.round(l - r.outerHeight() - h), h = 0)
                }
            }), undefined) : r.animate(t, e, f, c) : n.animate(i, e, f, c)
        },
        _toggleComplete: function(n) {
            var t = n.oldPanel;
            t.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all");
            t.length && (t.parent()[0].className = t.parent()[0].className);
            this._trigger("activate", null, n)
        }
    })
}(jQuery),
function(n) {
    var t = 0;
    n.widget("ui.autocomplete", {
        version: "1.10.3",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        pending: 0,
        _create: function() {
            var t, i, r, u = this.element[0].nodeName.toLowerCase(),
                f = "textarea" === u,
                e = "input" === u;
            this.isMultiLine = f ? !0 : e ? !1 : this.element.prop("isContentEditable");
            this.valueMethod = this.element[f || e ? "val" : "text"];
            this.isNewMenu = !0;
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off");
            this._on(this.element, {
                keydown: function(u) {
                    if (this.element.prop("readOnly")) return t = !0, r = !0, i = !0, undefined;
                    t = !1;
                    r = !1;
                    i = !1;
                    var f = n.ui.keyCode;
                    switch (u.keyCode) {
                        case f.PAGE_UP:
                            t = !0;
                            this._move("previousPage", u);
                            break;
                        case f.PAGE_DOWN:
                            t = !0;
                            this._move("nextPage", u);
                            break;
                        case f.UP:
                            t = !0;
                            this._keyEvent("previous", u);
                            break;
                        case f.DOWN:
                            t = !0;
                            this._keyEvent("next", u);
                            break;
                        case f.ENTER:
                        case f.NUMPAD_ENTER:
                            this.menu.active && (t = !0, u.preventDefault(), this.menu.select(u));
                            break;
                        case f.TAB:
                            this.menu.active && this.menu.select(u);
                            break;
                        case f.ESCAPE:
                            this.menu.element.is(":visible") && (this._value(this.term), this.close(u), u.preventDefault());
                            break;
                        default:
                            i = !0;
                            this._searchTimeout(u)
                    }
                },
                keypress: function(r) {
                    if (t) return t = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && r.preventDefault(), undefined;
                    if (!i) {
                        var u = n.ui.keyCode;
                        switch (r.keyCode) {
                            case u.PAGE_UP:
                                this._move("previousPage", r);
                                break;
                            case u.PAGE_DOWN:
                                this._move("nextPage", r);
                                break;
                            case u.UP:
                                this._keyEvent("previous", r);
                                break;
                            case u.DOWN:
                                this._keyEvent("next", r)
                        }
                    }
                },
                input: function(n) {
                    return r ? (r = !1, n.preventDefault(), undefined) : (this._searchTimeout(n), undefined)
                },
                focus: function() {
                    this.selectedItem = null;
                    this.previous = this._value()
                },
                blur: function(n) {
                    return this.cancelBlur ? (delete this.cancelBlur, undefined) : (clearTimeout(this.searching), this.close(n), this._change(n), undefined)
                }
            });
            this._initSource();
            this.menu = n("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                role: null
            }).hide().data("ui-menu");
            this._on(this.menu.element, {
                mousedown: function(t) {
                    t.preventDefault();
                    this.cancelBlur = !0;
                    this._delay(function() {
                        delete this.cancelBlur
                    });
                    var i = this.menu.element[0];
                    n(t.target).closest(".ui-menu-item").length || this._delay(function() {
                        var t = this;
                        this.document.one("mousedown", function(r) {
                            r.target === t.element[0] || r.target === i || n.contains(i, r.target) || t.close()
                        })
                    })
                },
                menufocus: function(t, i) {
                    if (this.isNewMenu && (this.isNewMenu = !1, t.originalEvent && /^mouse/.test(t.originalEvent.type))) return this.menu.blur(), this.document.one("mousemove", function() {
                        n(t.target).trigger(t.originalEvent)
                    }), undefined;
                    var r = i.item.data("ui-autocomplete-item");
                    !1 !== this._trigger("focus", t, {
                        item: r
                    }) ? t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(r.value) : this.liveRegion.text(r.value)
                },
                menuselect: function(n, t) {
                    var i = t.item.data("ui-autocomplete-item"),
                        r = this.previous;
                    this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = r, this._delay(function() {
                        this.previous = r;
                        this.selectedItem = i
                    }));
                    !1 !== this._trigger("select", n, {
                        item: i
                    }) && this._value(i.value);
                    this.term = this._value();
                    this.close(n);
                    this.selectedItem = i
                }
            });
            this.liveRegion = n("<span>", {
                role: "status",
                "aria-live": "polite"
            }).addClass("ui-helper-hidden-accessible").insertBefore(this.element);
            this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function() {
            clearTimeout(this.searching);
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete");
            this.menu.element.remove();
            this.liveRegion.remove()
        },
        _setOption: function(n, t) {
            this._super(n, t);
            "source" === n && this._initSource();
            "appendTo" === n && this.menu.element.appendTo(this._appendTo());
            "disabled" === n && t && this.xhr && this.xhr.abort()
        },
        _appendTo: function() {
            var t = this.options.appendTo;
            return t && (t = t.jquery || t.nodeType ? n(t) : this.document.find(t).eq(0)), t || (t = this.element.closest(".ui-front")), t.length || (t = this.document[0].body), t
        },
        _initSource: function() {
            var i, r, t = this;
            n.isArray(this.options.source) ? (i = this.options.source, this.source = function(t, r) {
                r(n.ui.autocomplete.filter(i, t.term))
            }) : "string" == typeof this.options.source ? (r = this.options.source, this.source = function(i, u) {
                t.xhr && t.xhr.abort();
                t.xhr = n.ajax({
                    url: r,
                    data: i,
                    dataType: "json",
                    success: function(n) {
                        u(n)
                    },
                    error: function() {
                        u([])
                    }
                })
            }) : this.source = this.options.source
        },
        _searchTimeout: function(n) {
            clearTimeout(this.searching);
            this.searching = this._delay(function() {
                this.term !== this._value() && (this.selectedItem = null, this.search(null, n))
            }, this.options.delay)
        },
        search: function(n, t) {
            return n = null != n ? n : this._value(), this.term = this._value(), n.length < this.options.minLength ? this.close(t) : this._trigger("search", t) !== !1 ? this._search(n) : undefined
        },
        _search: function(n) {
            this.pending++;
            this.element.addClass("ui-autocomplete-loading");
            this.cancelSearch = !1;
            this.source({
                term: n
            }, this._response())
        },
        _response: function() {
            var n = this,
                i = ++t;
            return function(r) {
                i === t && n.__response(r);
                n.pending--;
                n.pending || n.element.removeClass("ui-autocomplete-loading")
            }
        },
        __response: function(n) {
            n && (n = this._normalize(n));
            this._trigger("response", null, {
                content: n
            });
            !this.options.disabled && n && n.length && !this.cancelSearch ? (this._suggest(n), this._trigger("open")) : this._close()
        },
        close: function(n) {
            this.cancelSearch = !0;
            this._close(n)
        },
        _close: function(n) {
            this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", n))
        },
        _change: function(n) {
            this.previous !== this._value() && this._trigger("change", n, {
                item: this.selectedItem
            })
        },
        _normalize: function(t) {
            return t.length && t[0].label && t[0].value ? t : n.map(t, function(t) {
                return "string" == typeof t ? {
                    label: t,
                    value: t
                } : n.extend({
                    label: t.label || t.value,
                    value: t.value || t.label
                }, t)
            })
        },
        _suggest: function(t) {
            var i = this.menu.element.empty();
            this._renderMenu(i, t);
            this.isNewMenu = !0;
            this.menu.refresh();
            i.show();
            this._resizeMenu();
            i.position(n.extend({ of : this.element
            }, this.options.position));
            this.options.autoFocus && this.menu.next()
        },
        _resizeMenu: function() {
            var n = this.menu.element;
            n.outerWidth(Math.max(n.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function(t, i) {
            var r = this;
            n.each(i, function(n, i) {
                r._renderItemData(t, i)
            })
        },
        _renderItemData: function(n, t) {
            return this._renderItem(n, t).data("ui-autocomplete-item", t)
        },
        _renderItem: function(t, i) {
            return n("<li>").append(n("<a>").text(i.label)).appendTo(t)
        },
        _move: function(n, t) {
            return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(n) || this.menu.isLastItem() && /^next/.test(n) ? (this._value(this.term), this.menu.blur(), undefined) : (this.menu[n](t), undefined) : (this.search(null, t), undefined)
        },
        widget: function() {
            return this.menu.element
        },
        _value: function() {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function(n, t) {
            (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(n, t), t.preventDefault())
        }
    });
    n.extend(n.ui.autocomplete, {
        escapeRegex: function(n) {
            return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        },
        filter: function(t, i) {
            var r = RegExp(n.ui.autocomplete.escapeRegex(i), "i");
            return n.grep(t, function(n) {
                return r.test(n.label || n.value || n)
            })
        }
    });
    n.widget("ui.autocomplete", n.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function(n) {
                    return n + (n > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        },
        __response: function(n) {
            var t;
            this._superApply(arguments);
            this.options.disabled || this.cancelSearch || (t = n && n.length ? this.options.messages.results(n.length) : this.options.messages.noResults, this.liveRegion.text(t))
        }
    })
}(jQuery),
function(n) {
    var i, r, u, t, f = "ui-button ui-widget ui-state-default ui-corner-all",
        s = "ui-state-hover ui-state-active ",
        e = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
        h = function() {
            var t = n(this);
            setTimeout(function() {
                t.find(":ui-button").button("refresh")
            }, 1)
        },
        o = function(t) {
            var i = t.name,
                r = t.form,
                u = n([]);
            return i && (i = i.replace(/'/g, "\\'"), u = r ? n(r).find("[name='" + i + "']") : n("[name='" + i + "']", t.ownerDocument).filter(function() {
                return !this.form
            })), u
        };
    n.widget("ui.button", {
        version: "1.10.3",
        defaultElement: "<button>",
        options: {
            disabled: null,
            text: !0,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function() {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, h);
            "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled);
            this._determineButtonType();
            this.hasTitle = !!this.buttonElement.attr("title");
            var s = this,
                e = this.options,
                c = "checkbox" === this.type || "radio" === this.type,
                a = c ? "" : "ui-state-active",
                l = "ui-state-focus";
            null === e.label && (e.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html());
            this._hoverable(this.buttonElement);
            this.buttonElement.addClass(f).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
                e.disabled || this === i && n(this).addClass("ui-state-active")
            }).bind("mouseleave" + this.eventNamespace, function() {
                e.disabled || n(this).removeClass(a)
            }).bind("click" + this.eventNamespace, function(n) {
                e.disabled && (n.preventDefault(), n.stopImmediatePropagation())
            });
            this.element.bind("focus" + this.eventNamespace, function() {
                s.buttonElement.addClass(l)
            }).bind("blur" + this.eventNamespace, function() {
                s.buttonElement.removeClass(l)
            });
            c && (this.element.bind("change" + this.eventNamespace, function() {
                t || s.refresh()
            }), this.buttonElement.bind("mousedown" + this.eventNamespace, function(n) {
                e.disabled || (t = !1, r = n.pageX, u = n.pageY)
            }).bind("mouseup" + this.eventNamespace, function(n) {
                e.disabled || (r !== n.pageX || u !== n.pageY) && (t = !0)
            }));
            "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                return e.disabled || t ? !1 : undefined
            }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                if (e.disabled || t) return !1;
                n(this).addClass("ui-state-active");
                s.buttonElement.attr("aria-pressed", "true");
                var i = s.element[0];
                o(i).not(i).map(function() {
                    return n(this).button("widget")[0]
                }).removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
                return e.disabled ? !1 : (n(this).addClass("ui-state-active"), i = this, s.document.one("mouseup", function() {
                    i = null
                }), undefined)
            }).bind("mouseup" + this.eventNamespace, function() {
                return e.disabled ? !1 : (n(this).removeClass("ui-state-active"), undefined)
            }).bind("keydown" + this.eventNamespace, function(t) {
                return e.disabled ? !1 : ((t.keyCode === n.ui.keyCode.SPACE || t.keyCode === n.ui.keyCode.ENTER) && n(this).addClass("ui-state-active"), undefined)
            }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
                n(this).removeClass("ui-state-active")
            }), this.buttonElement.is("a") && this.buttonElement.keyup(function(t) {
                t.keyCode === n.ui.keyCode.SPACE && n(this).click()
            }));
            this._setOption("disabled", e.disabled);
            this._resetButton()
        },
        _determineButtonType: function() {
            var n, t, i;
            this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button";
            "checkbox" === this.type || "radio" === this.type ? (n = this.element.parents().last(), t = "label[for='" + this.element.attr("id") + "']", this.buttonElement = n.find(t), this.buttonElement.length || (n = n.length ? n.siblings() : this.element.siblings(), this.buttonElement = n.filter(t), this.buttonElement.length || (this.buttonElement = n.find(t))), this.element.addClass("ui-helper-hidden-accessible"), i = this.element.is(":checked"), i && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", i)) : this.buttonElement = this.element
        },
        widget: function() {
            return this.buttonElement
        },
        _destroy: function() {
            this.element.removeClass("ui-helper-hidden-accessible");
            this.buttonElement.removeClass(f + " " + s + " " + e).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
            this.hasTitle || this.buttonElement.removeAttr("title")
        },
        _setOption: function(n, t) {
            return this._super(n, t), "disabled" === n ? (t ? this.element.prop("disabled", !0) : this.element.prop("disabled", !1), undefined) : (this._resetButton(), undefined)
        },
        refresh: function() {
            var t = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            t !== this.options.disabled && this._setOption("disabled", t);
            "radio" === this.type ? o(this.element[0]).each(function() {
                n(this).is(":checked") ? n(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : n(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
        },
        _resetButton: function() {
            if ("input" === this.type) return this.options.label && this.element.val(this.options.label), undefined;
            var i = this.buttonElement.removeClass(e),
                f = n("<span><\/span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(i.empty()).text(),
                t = this.options.icons,
                u = t.primary && t.secondary,
                r = [];
            t.primary || t.secondary ? (this.options.text && r.push("ui-button-text-icon" + (u ? "s" : t.primary ? "-primary" : "-secondary")), t.primary && i.prepend("<span class='ui-button-icon-primary ui-icon " + t.primary + "'><\/span>"), t.secondary && i.append("<span class='ui-button-icon-secondary ui-icon " + t.secondary + "'><\/span>"), this.options.text || (r.push(u ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || i.attr("title", n.trim(f)))) : r.push("ui-button-text-only");
            i.addClass(r.join(" "))
        }
    });
    n.widget("ui.buttonset", {
        version: "1.10.3",
        options: {
            items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
        },
        _create: function() {
            this.element.addClass("ui-buttonset")
        },
        _init: function() {
            this.refresh()
        },
        _setOption: function(n, t) {
            "disabled" === n && this.buttons.button("option", n, t);
            this._super(n, t)
        },
        refresh: function() {
            var t = "rtl" === this.element.css("direction");
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
                return n(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(t ? "ui-corner-left" : "ui-corner-right").end().end()
        },
        _destroy: function() {
            this.element.removeClass("ui-buttonset");
            this.buttons.map(function() {
                return n(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
        }
    })
}(jQuery),
function(n, t) {
    function f() {
        this._curInst = null;
        this._keyEvent = !1;
        this._disabledInputs = [];
        this._datepickerShowing = !1;
        this._inDialog = !1;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        };
        n.extend(this._defaults, this.regional[""]);
        this.dpDiv = e(n("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'><\/div>"))
    }

    function e(t) {
        var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return t.delegate(i, "mouseout", function() {
            n(this).removeClass("ui-state-hover"); - 1 !== this.className.indexOf("ui-datepicker-prev") && n(this).removeClass("ui-datepicker-prev-hover"); - 1 !== this.className.indexOf("ui-datepicker-next") && n(this).removeClass("ui-datepicker-next-hover")
        }).delegate(i, "mouseover", function() {
            n.datepicker._isDisabledDatepicker(u.inline ? t.parent()[0] : u.input[0]) || (n(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), n(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && n(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && n(this).addClass("ui-datepicker-next-hover"))
        })
    }

    function r(t, i) {
        n.extend(t, i);
        for (var r in i) null == i[r] && (t[r] = i[r]);
        return t
    }
    n.extend(n.ui, {
        datepicker: {
            version: "1.10.3"
        }
    });
    var u, i = "datepicker";
    n.extend(f.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(n) {
            return r(this._defaults, n || {}), this
        },
        _attachDatepicker: function(t, i) {
            var r, f, u;
            r = t.nodeName.toLowerCase();
            f = "div" === r || "span" === r;
            t.id || (this.uuid += 1, t.id = "dp" + this.uuid);
            u = this._newInst(n(t), f);
            u.settings = n.extend({}, i || {});
            "input" === r ? this._connectDatepicker(t, u) : f && this._inlineDatepicker(t, u)
        },
        _newInst: function(t, i) {
            var r = t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: r,
                input: t,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: i,
                dpDiv: i ? e(n("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'><\/div>")) : this.dpDiv
            }
        },
        _connectDatepicker: function(t, r) {
            var u = n(t);
            r.append = n([]);
            r.trigger = n([]);
            u.hasClass(this.markerClassName) || (this._attachments(u, r), u.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(r), n.data(t, i, r), r.settings.disabled && this._disableDatepicker(t))
        },
        _attachments: function(t, i) {
            var u, r, f, e = this._get(i, "appendText"),
                o = this._get(i, "isRTL");
            i.append && i.append.remove();
            e && (i.append = n("<span class='" + this._appendClass + "'>" + e + "<\/span>"), t[o ? "before" : "after"](i.append));
            t.unbind("focus", this._showDatepicker);
            i.trigger && i.trigger.remove();
            u = this._get(i, "showOn");
            ("focus" === u || "both" === u) && t.focus(this._showDatepicker);
            ("button" === u || "both" === u) && (r = this._get(i, "buttonText"), f = this._get(i, "buttonImage"), i.trigger = n(this._get(i, "buttonImageOnly") ? n("<img/>").addClass(this._triggerClass).attr({
                src: f,
                alt: r,
                title: r
            }) : n("<button type='button'><\/button>").addClass(this._triggerClass).html(f ? n("<img/>").attr({
                src: f,
                alt: r,
                title: r
            }) : r)), t[o ? "before" : "after"](i.trigger), i.trigger.click(function() {
                return n.datepicker._datepickerShowing && n.datepicker._lastInput === t[0] ? n.datepicker._hideDatepicker() : n.datepicker._datepickerShowing && n.datepicker._lastInput !== t[0] ? (n.datepicker._hideDatepicker(), n.datepicker._showDatepicker(t[0])) : n.datepicker._showDatepicker(t[0]), !1
            }))
        },
        _autoSize: function(n) {
            if (this._get(n, "autoSize") && !n.inline) {
                var r, u, f, t, i = new Date(2009, 11, 20),
                    e = this._get(n, "dateFormat");
                e.match(/[DM]/) && (r = function(n) {
                    for (u = 0, f = 0, t = 0; n.length > t; t++) n[t].length > u && (u = n[t].length, f = t);
                    return f
                }, i.setMonth(r(this._get(n, e.match(/MM/) ? "monthNames" : "monthNamesShort"))), i.setDate(r(this._get(n, e.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - i.getDay()));
                n.input.attr("size", this._formatDate(n, i).length)
            }
        },
        _inlineDatepicker: function(t, r) {
            var u = n(t);
            u.hasClass(this.markerClassName) || (u.addClass(this.markerClassName).append(r.dpDiv), n.data(t, i, r), this._setDate(r, this._getDefaultDate(r), !0), this._updateDatepicker(r), this._updateAlternate(r), r.settings.disabled && this._disableDatepicker(t), r.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function(t, u, f, e, o) {
            var h, c, l, a, v, s = this._dialogInst;
            return s || (this.uuid += 1, h = "dp" + this.uuid, this._dialogInput = n("<input type='text' id='" + h + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), n("body").append(this._dialogInput), s = this._dialogInst = this._newInst(this._dialogInput, !1), s.settings = {}, n.data(this._dialogInput[0], i, s)), r(s.settings, e || {}), u = u && u.constructor === Date ? this._formatDate(s, u) : u, this._dialogInput.val(u), this._pos = o ? o.length ? o : [o.pageX, o.pageY] : null, this._pos || (c = document.documentElement.clientWidth, l = document.documentElement.clientHeight, a = document.documentElement.scrollLeft || document.body.scrollLeft, v = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [c / 2 - 100 + a, l / 2 - 150 + v]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), s.settings.onSelect = f, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), n.blockUI && n.blockUI(this.dpDiv), n.data(this._dialogInput[0], i, s), this
        },
        _destroyDatepicker: function(t) {
            var r, u = n(t),
                f = n.data(t, i);
            u.hasClass(this.markerClassName) && (r = t.nodeName.toLowerCase(), n.removeData(t, i), "input" === r ? (f.append.remove(), f.trigger.remove(), u.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === r || "span" === r) && u.removeClass(this.markerClassName).empty())
        },
        _enableDatepicker: function(t) {
            var r, u, f = n(t),
                e = n.data(t, i);
            f.hasClass(this.markerClassName) && (r = t.nodeName.toLowerCase(), "input" === r ? (t.disabled = !1, e.trigger.filter("button").each(function() {
                this.disabled = !1
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : ("div" === r || "span" === r) && (u = f.children("." + this._inlineClass), u.children().removeClass("ui-state-disabled"), u.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = n.map(this._disabledInputs, function(n) {
                return n === t ? null : n
            }))
        },
        _disableDatepicker: function(t) {
            var r, u, f = n(t),
                e = n.data(t, i);
            f.hasClass(this.markerClassName) && (r = t.nodeName.toLowerCase(), "input" === r ? (t.disabled = !0, e.trigger.filter("button").each(function() {
                this.disabled = !0
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : ("div" === r || "span" === r) && (u = f.children("." + this._inlineClass), u.children().addClass("ui-state-disabled"), u.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = n.map(this._disabledInputs, function(n) {
                return n === t ? null : n
            }), this._disabledInputs[this._disabledInputs.length] = t)
        },
        _isDisabledDatepicker: function(n) {
            if (!n) return !1;
            for (var t = 0; this._disabledInputs.length > t; t++)
                if (this._disabledInputs[t] === n) return !0;
            return !1
        },
        _getInst: function(t) {
            try {
                return n.data(t, i)
            } catch (r) {
                throw "Missing instance data for this datepicker";
            }
        },
        _optionDatepicker: function(i, u, f) {
            var o, c, s, h, e = this._getInst(i);
            return 2 === arguments.length && "string" == typeof u ? "defaults" === u ? n.extend({}, n.datepicker._defaults) : e ? "all" === u ? n.extend({}, e.settings) : this._get(e, u) : null : (o = u || {}, "string" == typeof u && (o = {}, o[u] = f), e && (this._curInst === e && this._hideDatepicker(), c = this._getDateDatepicker(i, !0), s = this._getMinMaxDate(e, "min"), h = this._getMinMaxDate(e, "max"), r(e.settings, o), null !== s && o.dateFormat !== t && o.minDate === t && (e.settings.minDate = this._formatDate(e, s)), null !== h && o.dateFormat !== t && o.maxDate === t && (e.settings.maxDate = this._formatDate(e, h)), "disabled" in o && (o.disabled ? this._disableDatepicker(i) : this._enableDatepicker(i)), this._attachments(n(i), e), this._autoSize(e), this._setDate(e, c), this._updateAlternate(e), this._updateDatepicker(e)), t)
        },
        _changeDatepicker: function(n, t, i) {
            this._optionDatepicker(n, t, i)
        },
        _refreshDatepicker: function(n) {
            var t = this._getInst(n);
            t && this._updateDatepicker(t)
        },
        _setDateDatepicker: function(n, t) {
            var i = this._getInst(n);
            i && (this._setDate(i, t), this._updateDatepicker(i), this._updateAlternate(i))
        },
        _getDateDatepicker: function(n, t) {
            var i = this._getInst(n);
            return i && !i.inline && this._setDateFromField(i, t), i ? this._getDate(i) : null
        },
        _doKeyDown: function(t) {
            var u, e, f, i = n.datepicker._getInst(t.target),
                r = !0,
                o = i.dpDiv.is(".ui-datepicker-rtl");
            if (i._keyEvent = !0, n.datepicker._datepickerShowing) switch (t.keyCode) {
                case 9:
                    n.datepicker._hideDatepicker();
                    r = !1;
                    break;
                case 13:
                    return f = n("td." + n.datepicker._dayOverClass + ":not(." + n.datepicker._currentClass + ")", i.dpDiv), f[0] && n.datepicker._selectDay(t.target, i.selectedMonth, i.selectedYear, f[0]), u = n.datepicker._get(i, "onSelect"), u ? (e = n.datepicker._formatDate(i), u.apply(i.input ? i.input[0] : null, [e, i])) : n.datepicker._hideDatepicker(), !1;
                case 27:
                    n.datepicker._hideDatepicker();
                    break;
                case 33:
                    n.datepicker._adjustDate(t.target, t.ctrlKey ? -n.datepicker._get(i, "stepBigMonths") : -n.datepicker._get(i, "stepMonths"), "M");
                    break;
                case 34:
                    n.datepicker._adjustDate(t.target, t.ctrlKey ? +n.datepicker._get(i, "stepBigMonths") : +n.datepicker._get(i, "stepMonths"), "M");
                    break;
                case 35:
                    (t.ctrlKey || t.metaKey) && n.datepicker._clearDate(t.target);
                    r = t.ctrlKey || t.metaKey;
                    break;
                case 36:
                    (t.ctrlKey || t.metaKey) && n.datepicker._gotoToday(t.target);
                    r = t.ctrlKey || t.metaKey;
                    break;
                case 37:
                    (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, o ? 1 : -1, "D");
                    r = t.ctrlKey || t.metaKey;
                    t.originalEvent.altKey && n.datepicker._adjustDate(t.target, t.ctrlKey ? -n.datepicker._get(i, "stepBigMonths") : -n.datepicker._get(i, "stepMonths"), "M");
                    break;
                case 38:
                    (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, -7, "D");
                    r = t.ctrlKey || t.metaKey;
                    break;
                case 39:
                    (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, o ? -1 : 1, "D");
                    r = t.ctrlKey || t.metaKey;
                    t.originalEvent.altKey && n.datepicker._adjustDate(t.target, t.ctrlKey ? +n.datepicker._get(i, "stepBigMonths") : +n.datepicker._get(i, "stepMonths"), "M");
                    break;
                case 40:
                    (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, 7, "D");
                    r = t.ctrlKey || t.metaKey;
                    break;
                default:
                    r = !1
            } else 36 === t.keyCode && t.ctrlKey ? n.datepicker._showDatepicker(this) : r = !1;
            r && (t.preventDefault(), t.stopPropagation())
        },
        _doKeyPress: function(i) {
            var r, u, f = n.datepicker._getInst(i.target);
            return n.datepicker._get(f, "constrainInput") ? (r = n.datepicker._possibleChars(n.datepicker._get(f, "dateFormat")), u = String.fromCharCode(null == i.charCode ? i.keyCode : i.charCode), i.ctrlKey || i.metaKey || " " > u || !r || r.indexOf(u) > -1) : t
        },
        _doKeyUp: function(t) {
            var r, i = n.datepicker._getInst(t.target);
            if (i.input.val() !== i.lastVal) try {
                r = n.datepicker.parseDate(n.datepicker._get(i, "dateFormat"), i.input ? i.input.val() : null, n.datepicker._getFormatConfig(i));
                r && (n.datepicker._setDateFromField(i), n.datepicker._updateAlternate(i), n.datepicker._updateDatepicker(i))
            } catch (u) {}
            return !0
        },
        _showDatepicker: function(t) {
            if (t = t.target || t, "input" !== t.nodeName.toLowerCase() && (t = n("input", t.parentNode)[0]), !n.datepicker._isDisabledDatepicker(t) && n.datepicker._lastInput !== t) {
                var i, o, s, u, f, e, h;
                i = n.datepicker._getInst(t);
                n.datepicker._curInst && n.datepicker._curInst !== i && (n.datepicker._curInst.dpDiv.stop(!0, !0), i && n.datepicker._datepickerShowing && n.datepicker._hideDatepicker(n.datepicker._curInst.input[0]));
                o = n.datepicker._get(i, "beforeShow");
                s = o ? o.apply(t, [t, i]) : {};
                s !== !1 && (r(i.settings, s), i.lastVal = null, n.datepicker._lastInput = t, n.datepicker._setDateFromField(i), n.datepicker._inDialog && (t.value = ""), n.datepicker._pos || (n.datepicker._pos = n.datepicker._findPos(t), n.datepicker._pos[1] += t.offsetHeight), u = !1, n(t).parents().each(function() {
                    return u |= "fixed" === n(this).css("position"), !u
                }), f = {
                    left: n.datepicker._pos[0],
                    top: n.datepicker._pos[1]
                }, n.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                }), n.datepicker._updateDatepicker(i), f = n.datepicker._checkOffset(i, f, u), i.dpDiv.css({
                    position: n.datepicker._inDialog && n.blockUI ? "static" : u ? "fixed" : "absolute",
                    display: "none",
                    left: f.left + "px",
                    top: f.top + "px"
                }), i.inline || (e = n.datepicker._get(i, "showAnim"), h = n.datepicker._get(i, "duration"), i.dpDiv.zIndex(n(t).zIndex() + 1), n.datepicker._datepickerShowing = !0, n.effects && n.effects.effect[e] ? i.dpDiv.show(e, n.datepicker._get(i, "showOptions"), h) : i.dpDiv[e || "show"](e ? h : null), n.datepicker._shouldFocusInput(i) && i.input.focus(), n.datepicker._curInst = i))
            }
        },
        _updateDatepicker: function(t) {
            this.maxRows = 4;
            u = t;
            t.dpDiv.empty().append(this._generateHTML(t));
            this._attachHandlers(t);
            t.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            var i, r = this._getNumberOfMonths(t),
                f = r[1];
            t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
            f > 1 && t.dpDiv.addClass("ui-datepicker-multi-" + f).css("width", 17 * f + "em");
            t.dpDiv[(1 !== r[0] || 1 !== r[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi");
            t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
            t === n.datepicker._curInst && n.datepicker._datepickerShowing && n.datepicker._shouldFocusInput(t) && t.input.focus();
            t.yearshtml && (i = t.yearshtml, setTimeout(function() {
                i === t.yearshtml && t.yearshtml && t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml);
                i = t.yearshtml = null
            }, 0))
        },
        _shouldFocusInput: function(n) {
            return n.input && n.input.is(":visible") && !n.input.is(":disabled") && !n.input.is(":focus")
        },
        _checkOffset: function(t, i, r) {
            var u = t.dpDiv.outerWidth(),
                f = t.dpDiv.outerHeight(),
                h = t.input ? t.input.outerWidth() : 0,
                o = t.input ? t.input.outerHeight() : 0,
                e = document.documentElement.clientWidth + (r ? 0 : n(document).scrollLeft()),
                s = document.documentElement.clientHeight + (r ? 0 : n(document).scrollTop());
            return i.left -= this._get(t, "isRTL") ? u - h : 0, i.left -= r && i.left === t.input.offset().left ? n(document).scrollLeft() : 0, i.top -= r && i.top === t.input.offset().top + o ? n(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + u > e && e > u ? Math.abs(i.left + u - e) : 0), i.top -= Math.min(i.top, i.top + f > s && s > f ? Math.abs(f + o) : 0), i
        },
        _findPos: function(t) {
            for (var i, r = this._getInst(t), u = this._get(r, "isRTL"); t && ("hidden" === t.type || 1 !== t.nodeType || n.expr.filters.hidden(t));) t = t[u ? "previousSibling" : "nextSibling"];
            return i = n(t).offset(), [i.left, i.top]
        },
        _hideDatepicker: function(t) {
            var u, e, f, o, r = this._curInst;
            !r || t && r !== n.data(t, i) || this._datepickerShowing && (u = this._get(r, "showAnim"), e = this._get(r, "duration"), f = function() {
                n.datepicker._tidyDialog(r)
            }, n.effects && (n.effects.effect[u] || n.effects[u]) ? r.dpDiv.hide(u, n.datepicker._get(r, "showOptions"), e, f) : r.dpDiv["slideDown" === u ? "slideUp" : "fadeIn" === u ? "fadeOut" : "hide"](u ? e : null, f), u || f(), this._datepickerShowing = !1, o = this._get(r, "onClose"), o && o.apply(r.input ? r.input[0] : null, [r.input ? r.input.val() : "", r]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }), n.blockUI && (n.unblockUI(), n("body").append(this.dpDiv))), this._inDialog = !1)
        },
        _tidyDialog: function(n) {
            n.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(t) {
            if (n.datepicker._curInst) {
                var i = n(t.target),
                    r = n.datepicker._getInst(i[0]);
                (i[0].id === n.datepicker._mainDivId || 0 !== i.parents("#" + n.datepicker._mainDivId).length || i.hasClass(n.datepicker.markerClassName) || i.closest("." + n.datepicker._triggerClass).length || !n.datepicker._datepickerShowing || n.datepicker._inDialog && n.blockUI) && (!i.hasClass(n.datepicker.markerClassName) || n.datepicker._curInst === r) || n.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(t, i, r) {
            var f = n(t),
                u = this._getInst(f[0]);
            this._isDisabledDatepicker(f[0]) || (this._adjustInstDate(u, i + ("M" === r ? this._get(u, "showCurrentAtPos") : 0), r), this._updateDatepicker(u))
        },
        _gotoToday: function(t) {
            var r, u = n(t),
                i = this._getInst(u[0]);
            this._get(i, "gotoCurrent") && i.currentDay ? (i.selectedDay = i.currentDay, i.drawMonth = i.selectedMonth = i.currentMonth, i.drawYear = i.selectedYear = i.currentYear) : (r = new Date, i.selectedDay = r.getDate(), i.drawMonth = i.selectedMonth = r.getMonth(), i.drawYear = i.selectedYear = r.getFullYear());
            this._notifyChange(i);
            this._adjustDate(u)
        },
        _selectMonthYear: function(t, i, r) {
            var f = n(t),
                u = this._getInst(f[0]);
            u["selected" + ("M" === r ? "Month" : "Year")] = u["draw" + ("M" === r ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10);
            this._notifyChange(u);
            this._adjustDate(f)
        },
        _selectDay: function(t, i, r, u) {
            var f, e = n(t);
            n(u).hasClass(this._unselectableClass) || this._isDisabledDatepicker(e[0]) || (f = this._getInst(e[0]), f.selectedDay = f.currentDay = n("a", u).html(), f.selectedMonth = f.currentMonth = i, f.selectedYear = f.currentYear = r, this._selectDate(t, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear)))
        },
        _clearDate: function(t) {
            var i = n(t);
            this._selectDate(i, "")
        },
        _selectDate: function(t, i) {
            var u, f = n(t),
                r = this._getInst(f[0]);
            i = null != i ? i : this._formatDate(r);
            r.input && r.input.val(i);
            this._updateAlternate(r);
            u = this._get(r, "onSelect");
            u ? u.apply(r.input ? r.input[0] : null, [i, r]) : r.input && r.input.trigger("change");
            r.inline ? this._updateDatepicker(r) : (this._hideDatepicker(), this._lastInput = r.input[0], "object" != typeof r.input[0] && r.input.focus(), this._lastInput = null)
        },
        _updateAlternate: function(t) {
            var i, r, u, f = this._get(t, "altField");
            f && (i = this._get(t, "altFormat") || this._get(t, "dateFormat"), r = this._getDate(t), u = this.formatDate(i, r, this._getFormatConfig(t)), n(f).each(function() {
                n(this).val(u)
            }))
        },
        noWeekends: function(n) {
            var t = n.getDay();
            return [t > 0 && 6 > t, ""]
        },
        iso8601Week: function(n) {
            var i, t = new Date(n.getTime());
            return t.setDate(t.getDate() + 4 - (t.getDay() || 7)), i = t.getTime(), t.setMonth(0), t.setDate(1), Math.floor(Math.round((i - t) / 864e5) / 7) + 1
        },
        parseDate: function(i, r, u) {
            if (null == i || null == r) throw "Invalid arguments";
            if (r = "object" == typeof r ? "" + r : r + "", "" === r) return null;
            for (var v, y, f, e = 0, p = (u ? u.shortYearCutoff : null) || this._defaults.shortYearCutoff, g = "string" != typeof p ? p : (new Date).getFullYear() % 100 + parseInt(p, 10), nt = (u ? u.dayNamesShort : null) || this._defaults.dayNamesShort, tt = (u ? u.dayNames : null) || this._defaults.dayNames, it = (u ? u.monthNamesShort : null) || this._defaults.monthNamesShort, rt = (u ? u.monthNames : null) || this._defaults.monthNames, o = -1, h = -1, c = -1, w = -1, b = !1, a = function(n) {
                    var t = i.length > s + 1 && i.charAt(s + 1) === n;
                    return t && s++, t
                }, l = function(n) {
                    var i = a(n),
                        u = "@" === n ? 14 : "!" === n ? 20 : "y" === n && i ? 4 : "o" === n ? 3 : 2,
                        f = RegExp("^\\d{1," + u + "}"),
                        t = r.substring(e).match(f);
                    if (!t) throw "Missing number at position " + e;
                    return e += t[0].length, parseInt(t[0], 10)
                }, d = function(i, u, f) {
                    var o = -1,
                        s = n.map(a(i) ? f : u, function(n, t) {
                            return [
                                [t, n]
                            ]
                        }).sort(function(n, t) {
                            return -(n[1].length - t[1].length)
                        });
                    if (n.each(s, function(n, i) {
                            var u = i[1];
                            return r.substr(e, u.length).toLowerCase() === u.toLowerCase() ? (o = i[0], e += u.length, !1) : t
                        }), -1 !== o) return o + 1;
                    throw "Unknown name at position " + e;
                }, k = function() {
                    if (r.charAt(e) !== i.charAt(s)) throw "Unexpected literal at position " + e;
                    e++
                }, s = 0; i.length > s; s++)
                if (b) "'" !== i.charAt(s) || a("'") ? k() : b = !1;
                else switch (i.charAt(s)) {
                    case "d":
                        c = l("d");
                        break;
                    case "D":
                        d("D", nt, tt);
                        break;
                    case "o":
                        w = l("o");
                        break;
                    case "m":
                        h = l("m");
                        break;
                    case "M":
                        h = d("M", it, rt);
                        break;
                    case "y":
                        o = l("y");
                        break;
                    case "@":
                        f = new Date(l("@"));
                        o = f.getFullYear();
                        h = f.getMonth() + 1;
                        c = f.getDate();
                        break;
                    case "!":
                        f = new Date((l("!") - this._ticksTo1970) / 1e4);
                        o = f.getFullYear();
                        h = f.getMonth() + 1;
                        c = f.getDate();
                        break;
                    case "'":
                        a("'") ? k() : b = !0;
                        break;
                    default:
                        k()
                }
            if (r.length > e && (y = r.substr(e), !/^\s+/.test(y))) throw "Extra/unparsed characters found in date: " + y;
            if (-1 === o ? o = (new Date).getFullYear() : 100 > o && (o += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (g >= o ? 0 : -100)), w > -1)
                for (h = 1, c = w;;) {
                    if (v = this._getDaysInMonth(o, h - 1), v >= c) break;
                    h++;
                    c -= v
                }
            if (f = this._daylightSavingAdjust(new Date(o, h - 1, c)), f.getFullYear() !== o || f.getMonth() + 1 !== h || f.getDate() !== c) throw "Invalid date";
            return f
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 864e9 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
        formatDate: function(n, t, i) {
            if (!t) return "";
            var u, h = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                c = (i ? i.dayNames : null) || this._defaults.dayNames,
                l = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                a = (i ? i.monthNames : null) || this._defaults.monthNames,
                f = function(t) {
                    var i = n.length > u + 1 && n.charAt(u + 1) === t;
                    return i && u++, i
                },
                e = function(n, t, i) {
                    var r = "" + t;
                    if (f(n))
                        for (; i > r.length;) r = "0" + r;
                    return r
                },
                s = function(n, t, i, r) {
                    return f(n) ? r[t] : i[t]
                },
                r = "",
                o = !1;
            if (t)
                for (u = 0; n.length > u; u++)
                    if (o) "'" !== n.charAt(u) || f("'") ? r += n.charAt(u) : o = !1;
                    else switch (n.charAt(u)) {
                        case "d":
                            r += e("d", t.getDate(), 2);
                            break;
                        case "D":
                            r += s("D", t.getDay(), h, c);
                            break;
                        case "o":
                            r += e("o", Math.round((new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() - new Date(t.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                            break;
                        case "m":
                            r += e("m", t.getMonth() + 1, 2);
                            break;
                        case "M":
                            r += s("M", t.getMonth(), l, a);
                            break;
                        case "y":
                            r += f("y") ? t.getFullYear() : (10 > t.getYear() % 100 ? "0" : "") + t.getYear() % 100;
                            break;
                        case "@":
                            r += t.getTime();
                            break;
                        case "!":
                            r += 1e4 * t.getTime() + this._ticksTo1970;
                            break;
                        case "'":
                            f("'") ? r += "'" : o = !0;
                            break;
                        default:
                            r += n.charAt(u)
                    }
            return r
        },
        _possibleChars: function(n) {
            for (var i = "", r = !1, u = function(i) {
                    var r = n.length > t + 1 && n.charAt(t + 1) === i;
                    return r && t++, r
                }, t = 0; n.length > t; t++)
                if (r) "'" !== n.charAt(t) || u("'") ? i += n.charAt(t) : r = !1;
                else switch (n.charAt(t)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        i += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        u("'") ? i += "'" : r = !0;
                        break;
                    default:
                        i += n.charAt(t)
                }
            return i
        },
        _get: function(n, i) {
            return n.settings[i] !== t ? n.settings[i] : this._defaults[i]
        },
        _setDateFromField: function(n, t) {
            if (n.input.val() !== n.lastVal) {
                var f = this._get(n, "dateFormat"),
                    r = n.lastVal = n.input ? n.input.val() : null,
                    u = this._getDefaultDate(n),
                    i = u,
                    e = this._getFormatConfig(n);
                try {
                    i = this.parseDate(f, r, e) || u
                } catch (o) {
                    r = t ? "" : r
                }
                n.selectedDay = i.getDate();
                n.drawMonth = n.selectedMonth = i.getMonth();
                n.drawYear = n.selectedYear = i.getFullYear();
                n.currentDay = r ? i.getDate() : 0;
                n.currentMonth = r ? i.getMonth() : 0;
                n.currentYear = r ? i.getFullYear() : 0;
                this._adjustInstDate(n)
            }
        },
        _getDefaultDate: function(n) {
            return this._restrictMinMax(n, this._determineDate(n, this._get(n, "defaultDate"), new Date))
        },
        _determineDate: function(t, i, r) {
            var f = function(n) {
                    var t = new Date;
                    return t.setDate(t.getDate() + n), t
                },
                e = function(i) {
                    try {
                        return n.datepicker.parseDate(n.datepicker._get(t, "dateFormat"), i, n.datepicker._getFormatConfig(t))
                    } catch (h) {}
                    for (var o = (i.toLowerCase().match(/^c/) ? n.datepicker._getDate(t) : null) || new Date, f = o.getFullYear(), e = o.getMonth(), r = o.getDate(), s = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, u = s.exec(i); u;) {
                        switch (u[2] || "d") {
                            case "d":
                            case "D":
                                r += parseInt(u[1], 10);
                                break;
                            case "w":
                            case "W":
                                r += 7 * parseInt(u[1], 10);
                                break;
                            case "m":
                            case "M":
                                e += parseInt(u[1], 10);
                                r = Math.min(r, n.datepicker._getDaysInMonth(f, e));
                                break;
                            case "y":
                            case "Y":
                                f += parseInt(u[1], 10);
                                r = Math.min(r, n.datepicker._getDaysInMonth(f, e))
                        }
                        u = s.exec(i)
                    }
                    return new Date(f, e, r)
                },
                u = null == i || "" === i ? r : "string" == typeof i ? e(i) : "number" == typeof i ? isNaN(i) ? r : f(i) : new Date(i.getTime());
            return u = u && "Invalid Date" == "" + u ? r : u, u && (u.setHours(0), u.setMinutes(0), u.setSeconds(0), u.setMilliseconds(0)), this._daylightSavingAdjust(u)
        },
        _daylightSavingAdjust: function(n) {
            return n ? (n.setHours(n.getHours() > 12 ? n.getHours() + 2 : 0), n) : null
        },
        _setDate: function(n, t, i) {
            var u = !t,
                f = n.selectedMonth,
                e = n.selectedYear,
                r = this._restrictMinMax(n, this._determineDate(n, t, new Date));
            n.selectedDay = n.currentDay = r.getDate();
            n.drawMonth = n.selectedMonth = n.currentMonth = r.getMonth();
            n.drawYear = n.selectedYear = n.currentYear = r.getFullYear();
            f === n.selectedMonth && e === n.selectedYear || i || this._notifyChange(n);
            this._adjustInstDate(n);
            n.input && n.input.val(u ? "" : this._formatDate(n))
        },
        _getDate: function(n) {
            return !n.currentYear || n.input && "" === n.input.val() ? null : this._daylightSavingAdjust(new Date(n.currentYear, n.currentMonth, n.currentDay))
        },
        _attachHandlers: function(t) {
            var r = this._get(t, "stepMonths"),
                i = "#" + t.id.replace(/\\\\/g, "\\");
            t.dpDiv.find("[data-handler]").map(function() {
                var t = {
                    prev: function() {
                        n.datepicker._adjustDate(i, -r, "M")
                    },
                    next: function() {
                        n.datepicker._adjustDate(i, +r, "M")
                    },
                    hide: function() {
                        n.datepicker._hideDatepicker()
                    },
                    today: function() {
                        n.datepicker._gotoToday(i)
                    },
                    selectDay: function() {
                        return n.datepicker._selectDay(i, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                    },
                    selectMonth: function() {
                        return n.datepicker._selectMonthYear(i, this, "M"), !1
                    },
                    selectYear: function() {
                        return n.datepicker._selectMonthYear(i, this, "Y"), !1
                    }
                };
                n(this).bind(this.getAttribute("data-event"), t[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function(n) {
            var b, s, rt, h, ut, k, ft, et, ri, c, ot, ui, fi, ei, oi, st, g, si, ht, nt, o, y, ct, p, lt, l, u, at, vt, yt, pt, tt, wt, i, bt, kt, d, a, it, dt = new Date,
                gt = this._daylightSavingAdjust(new Date(dt.getFullYear(), dt.getMonth(), dt.getDate())),
                f = this._get(n, "isRTL"),
                li = this._get(n, "showButtonPanel"),
                hi = this._get(n, "hideIfNoPrevNext"),
                ni = this._get(n, "navigationAsDateFormat"),
                e = this._getNumberOfMonths(n),
                ai = this._get(n, "showCurrentAtPos"),
                ci = this._get(n, "stepMonths"),
                ti = 1 !== e[0] || 1 !== e[1],
                ii = this._daylightSavingAdjust(n.currentDay ? new Date(n.currentYear, n.currentMonth, n.currentDay) : new Date(9999, 9, 9)),
                w = this._getMinMaxDate(n, "min"),
                v = this._getMinMaxDate(n, "max"),
                t = n.drawMonth - ai,
                r = n.drawYear;
            if (0 > t && (t += 12, r--), v)
                for (b = this._daylightSavingAdjust(new Date(v.getFullYear(), v.getMonth() - e[0] * e[1] + 1, v.getDate())), b = w && w > b ? w : b; this._daylightSavingAdjust(new Date(r, t, 1)) > b;) t--, 0 > t && (t = 11, r--);
            for (n.drawMonth = t, n.drawYear = r, s = this._get(n, "prevText"), s = ni ? this.formatDate(s, this._daylightSavingAdjust(new Date(r, t - ci, 1)), this._getFormatConfig(n)) : s, rt = this._canAdjustMonth(n, -1, r, t) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "e" : "w") + "'>" + s + "<\/span><\/a>" : hi ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "e" : "w") + "'>" + s + "<\/span><\/a>", h = this._get(n, "nextText"), h = ni ? this.formatDate(h, this._daylightSavingAdjust(new Date(r, t + ci, 1)), this._getFormatConfig(n)) : h, ut = this._canAdjustMonth(n, 1, r, t) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + h + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "w" : "e") + "'>" + h + "<\/span><\/a>" : hi ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + h + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "w" : "e") + "'>" + h + "<\/span><\/a>", k = this._get(n, "currentText"), ft = this._get(n, "gotoCurrent") && n.currentDay ? ii : gt, k = ni ? this.formatDate(k, ft, this._getFormatConfig(n)) : k, et = n.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(n, "closeText") + "<\/button>", ri = li ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (f ? et : "") + (this._isInRange(n, ft) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + k + "<\/button>" : "") + (f ? "" : et) + "<\/div>" : "", c = parseInt(this._get(n, "firstDay"), 10), c = isNaN(c) ? 0 : c, ot = this._get(n, "showWeek"), ui = this._get(n, "dayNames"), fi = this._get(n, "dayNamesMin"), ei = this._get(n, "monthNames"), oi = this._get(n, "monthNamesShort"), st = this._get(n, "beforeShowDay"), g = this._get(n, "showOtherMonths"), si = this._get(n, "selectOtherMonths"), ht = this._getDefaultDate(n), nt = "", y = 0; e[0] > y; y++) {
                for (ct = "", this.maxRows = 4, p = 0; e[1] > p; p++) {
                    if (lt = this._daylightSavingAdjust(new Date(r, t, n.selectedDay)), l = " ui-corner-all", u = "", ti) {
                        if (u += "<div class='ui-datepicker-group", e[1] > 1) switch (p) {
                            case 0:
                                u += " ui-datepicker-group-first";
                                l = " ui-corner-" + (f ? "right" : "left");
                                break;
                            case e[1] - 1:
                                u += " ui-datepicker-group-last";
                                l = " ui-corner-" + (f ? "left" : "right");
                                break;
                            default:
                                u += " ui-datepicker-group-middle";
                                l = ""
                        }
                        u += "'>"
                    }
                    for (u += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + l + "'>" + (/all|left/.test(l) && 0 === y ? f ? ut : rt : "") + (/all|right/.test(l) && 0 === y ? f ? rt : ut : "") + this._generateMonthYearHeader(n, t, r, w, v, y > 0 || p > 0, ei, oi) + "<\/div><table class='ui-datepicker-calendar'><thead><tr>", at = ot ? "<th class='ui-datepicker-week-col'>" + this._get(n, "weekHeader") + "<\/th>" : "", o = 0; 7 > o; o++) vt = (o + c) % 7, at += "<th" + ((o + c + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + ui[vt] + "'>" + fi[vt] + "<\/span><\/th>";
                    for (u += at + "<\/tr><\/thead><tbody>", yt = this._getDaysInMonth(r, t), r === n.selectedYear && t === n.selectedMonth && (n.selectedDay = Math.min(n.selectedDay, yt)), pt = (this._getFirstDayOfMonth(r, t) - c + 7) % 7, tt = Math.ceil((pt + yt) / 7), wt = ti ? this.maxRows > tt ? this.maxRows : tt : tt, this.maxRows = wt, i = this._daylightSavingAdjust(new Date(r, t, 1 - pt)), bt = 0; wt > bt; bt++) {
                        for (u += "<tr>", kt = ot ? "<td class='ui-datepicker-week-col'>" + this._get(n, "calculateWeek")(i) + "<\/td>" : "", o = 0; 7 > o; o++) d = st ? st.apply(n.input ? n.input[0] : null, [i]) : [!0, ""], a = i.getMonth() !== t, it = a && !si || !d[0] || w && w > i || v && i > v, kt += "<td class='" + ((o + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (a ? " ui-datepicker-other-month" : "") + (i.getTime() === lt.getTime() && t === n.selectedMonth && n._keyEvent || ht.getTime() === i.getTime() && ht.getTime() === lt.getTime() ? " " + this._dayOverClass : "") + (it ? " " + this._unselectableClass + " ui-state-disabled" : "") + (a && !g ? "" : " " + d[1] + (i.getTime() === ii.getTime() ? " " + this._currentClass : "") + (i.getTime() === gt.getTime() ? " ui-datepicker-today" : "")) + "'" + (a && !g || !d[2] ? "" : " title='" + d[2].replace(/'/g, "&#39;") + "'") + (it ? "" : " data-handler='selectDay' data-event='click' data-month='" + i.getMonth() + "' data-year='" + i.getFullYear() + "'") + ">" + (a && !g ? "&#xa0;" : it ? "<span class='ui-state-default'>" + i.getDate() + "<\/span>" : "<a class='ui-state-default" + (i.getTime() === gt.getTime() ? " ui-state-highlight" : "") + (i.getTime() === ii.getTime() ? " ui-state-active" : "") + (a ? " ui-priority-secondary" : "") + "' href='#'>" + i.getDate() + "<\/a>") + "<\/td>", i.setDate(i.getDate() + 1), i = this._daylightSavingAdjust(i);
                        u += kt + "<\/tr>"
                    }
                    t++;
                    t > 11 && (t = 0, r++);
                    u += "<\/tbody><\/table>" + (ti ? "<\/div>" + (e[0] > 0 && p === e[1] - 1 ? "<div class='ui-datepicker-row-break'><\/div>" : "") : "");
                    ct += u
                }
                nt += ct
            }
            return nt += ri, n._keyEvent = !1, nt
        },
        _generateMonthYearHeader: function(n, t, i, r, u, f, e, o) {
            var k, d, h, v, y, p, s, a, w = this._get(n, "changeMonth"),
                b = this._get(n, "changeYear"),
                g = this._get(n, "showMonthAfterYear"),
                c = "<div class='ui-datepicker-title'>",
                l = "";
            if (f || !w) l += "<span class='ui-datepicker-month'>" + e[t] + "<\/span>";
            else {
                for (k = r && r.getFullYear() === i, d = u && u.getFullYear() === i, l += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", h = 0; 12 > h; h++)(!k || h >= r.getMonth()) && (!d || u.getMonth() >= h) && (l += "<option value='" + h + "'" + (h === t ? " selected='selected'" : "") + ">" + o[h] + "<\/option>");
                l += "<\/select>"
            }
            if (g || (c += l + (!f && w && b ? "" : "&#xa0;")), !n.yearshtml)
                if (n.yearshtml = "", f || !b) c += "<span class='ui-datepicker-year'>" + i + "<\/span>";
                else {
                    for (v = this._get(n, "yearRange").split(":"), y = (new Date).getFullYear(), p = function(n) {
                            var t = n.match(/c[+\-].*/) ? i + parseInt(n.substring(1), 10) : n.match(/[+\-].*/) ? y + parseInt(n, 10) : parseInt(n, 10);
                            return isNaN(t) ? y : t
                        }, s = p(v[0]), a = Math.max(s, p(v[1] || "")), s = r ? Math.max(s, r.getFullYear()) : s, a = u ? Math.min(a, u.getFullYear()) : a, n.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; a >= s; s++) n.yearshtml += "<option value='" + s + "'" + (s === i ? " selected='selected'" : "") + ">" + s + "<\/option>";
                    n.yearshtml += "<\/select>";
                    c += n.yearshtml;
                    n.yearshtml = null
                }
            return c += this._get(n, "yearSuffix"), g && (c += (!f && w && b ? "" : "&#xa0;") + l), c + "<\/div>"
        },
        _adjustInstDate: function(n, t, i) {
            var u = n.drawYear + ("Y" === i ? t : 0),
                f = n.drawMonth + ("M" === i ? t : 0),
                e = Math.min(n.selectedDay, this._getDaysInMonth(u, f)) + ("D" === i ? t : 0),
                r = this._restrictMinMax(n, this._daylightSavingAdjust(new Date(u, f, e)));
            n.selectedDay = r.getDate();
            n.drawMonth = n.selectedMonth = r.getMonth();
            n.drawYear = n.selectedYear = r.getFullYear();
            ("M" === i || "Y" === i) && this._notifyChange(n)
        },
        _restrictMinMax: function(n, t) {
            var i = this._getMinMaxDate(n, "min"),
                r = this._getMinMaxDate(n, "max"),
                u = i && i > t ? i : t;
            return r && u > r ? r : u
        },
        _notifyChange: function(n) {
            var t = this._get(n, "onChangeMonthYear");
            t && t.apply(n.input ? n.input[0] : null, [n.selectedYear, n.selectedMonth + 1, n])
        },
        _getNumberOfMonths: function(n) {
            var t = this._get(n, "numberOfMonths");
            return null == t ? [1, 1] : "number" == typeof t ? [1, t] : t
        },
        _getMinMaxDate: function(n, t) {
            return this._determineDate(n, this._get(n, t + "Date"), null)
        },
        _getDaysInMonth: function(n, t) {
            return 32 - this._daylightSavingAdjust(new Date(n, t, 32)).getDate()
        },
        _getFirstDayOfMonth: function(n, t) {
            return new Date(n, t, 1).getDay()
        },
        _canAdjustMonth: function(n, t, i, r) {
            var f = this._getNumberOfMonths(n),
                u = this._daylightSavingAdjust(new Date(i, r + (0 > t ? t : f[0] * f[1]), 1));
            return 0 > t && u.setDate(this._getDaysInMonth(u.getFullYear(), u.getMonth())), this._isInRange(n, u)
        },
        _isInRange: function(n, t) {
            var i, f, e = this._getMinMaxDate(n, "min"),
                o = this._getMinMaxDate(n, "max"),
                r = null,
                u = null,
                s = this._get(n, "yearRange");
            return s && (i = s.split(":"), f = (new Date).getFullYear(), r = parseInt(i[0], 10), u = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (r += f), i[1].match(/[+\-].*/) && (u += f)), (!e || t.getTime() >= e.getTime()) && (!o || t.getTime() <= o.getTime()) && (!r || t.getFullYear() >= r) && (!u || u >= t.getFullYear())
        },
        _getFormatConfig: function(n) {
            var t = this._get(n, "shortYearCutoff");
            return t = "string" != typeof t ? t : (new Date).getFullYear() % 100 + parseInt(t, 10), {
                shortYearCutoff: t,
                dayNamesShort: this._get(n, "dayNamesShort"),
                dayNames: this._get(n, "dayNames"),
                monthNamesShort: this._get(n, "monthNamesShort"),
                monthNames: this._get(n, "monthNames")
            }
        },
        _formatDate: function(n, t, i, r) {
            t || (n.currentDay = n.selectedDay, n.currentMonth = n.selectedMonth, n.currentYear = n.selectedYear);
            var u = t ? "object" == typeof t ? t : this._daylightSavingAdjust(new Date(r, i, t)) : this._daylightSavingAdjust(new Date(n.currentYear, n.currentMonth, n.currentDay));
            return this.formatDate(this._get(n, "dateFormat"), u, this._getFormatConfig(n))
        }
    });
    n.fn.datepicker = function(t) {
        if (!this.length) return this;
        n.datepicker.initialized || (n(document).mousedown(n.datepicker._checkExternalClick), n.datepicker.initialized = !0);
        0 === n("#" + n.datepicker._mainDivId).length && n("body").append(n.datepicker.dpDiv);
        var i = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof t || "isDisabled" !== t && "getDate" !== t && "widget" !== t ? "option" === t && 2 === arguments.length && "string" == typeof arguments[1] ? n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this[0]].concat(i)) : this.each(function() {
            "string" == typeof t ? n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this].concat(i)) : n.datepicker._attachDatepicker(this, t)
        }) : n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this[0]].concat(i))
    };
    n.datepicker = new f;
    n.datepicker.initialized = !1;
    n.datepicker.uuid = (new Date).getTime();
    n.datepicker.version = "1.10.3"
}(jQuery),
function(n) {
    var t = {
            buttons: !0,
            height: !0,
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0,
            width: !0
        },
        i = {
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0
        };
    n.widget("ui.dialog", {
        version: "1.10.3",
        options: {
            appendTo: "body",
            autoOpen: !0,
            buttons: [],
            closeOnEscape: !0,
            closeText: "close",
            dialogClass: "",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: null,
            maxWidth: null,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center",
                at: "center",
                of : window,
                collision: "fit",
                using: function(t) {
                    var i = n(this).css(t).offset().top;
                    0 > i && n(this).css("top", t.top - i)
                }
            },
            resizable: !0,
            show: null,
            title: null,
            width: 300,
            beforeClose: null,
            close: null,
            drag: null,
            dragStart: null,
            dragStop: null,
            focus: null,
            open: null,
            resize: null,
            resizeStart: null,
            resizeStop: null
        },
        _create: function() {
            this.originalCss = {
                display: this.element[0].style.display,
                width: this.element[0].style.width,
                minHeight: this.element[0].style.minHeight,
                maxHeight: this.element[0].style.maxHeight,
                height: this.element[0].style.height
            };
            this.originalPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            };
            this.originalTitle = this.element.attr("title");
            this.options.title = this.options.title || this.originalTitle;
            this._createWrapper();
            this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog);
            this._createTitlebar();
            this._createButtonPane();
            this.options.draggable && n.fn.draggable && this._makeDraggable();
            this.options.resizable && n.fn.resizable && this._makeResizable();
            this._isOpen = !1
        },
        _init: function() {
            this.options.autoOpen && this.open()
        },
        _appendTo: function() {
            var t = this.options.appendTo;
            return t && (t.jquery || t.nodeType) ? n(t) : this.document.find(t || "body").eq(0)
        },
        _destroy: function() {
            var n, t = this.originalPosition;
            this._destroyOverlay();
            this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach();
            this.uiDialog.stop(!0, !0).remove();
            this.originalTitle && this.element.attr("title", this.originalTitle);
            n = t.parent.children().eq(t.index);
            n.length && n[0] !== this.element[0] ? n.before(this.element) : t.parent.append(this.element)
        },
        widget: function() {
            return this.uiDialog
        },
        disable: n.noop,
        enable: n.noop,
        close: function(t) {
            var i = this;
            this._isOpen && this._trigger("beforeClose", t) !== !1 && (this._isOpen = !1, this._destroyOverlay(), this.opener.filter(":focusable").focus().length || n(this.document[0].activeElement).blur(), this._hide(this.uiDialog, this.options.hide, function() {
                i._trigger("close", t)
            }))
        },
        isOpen: function() {
            return this._isOpen
        },
        moveToTop: function() {
            this._moveToTop()
        },
        _moveToTop: function(n, t) {
            var i = !!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;
            return i && !t && this._trigger("focus", n), i
        },
        open: function() {
            var t = this;
            return this._isOpen ? (this._moveToTop() && this._focusTabbable(), undefined) : (this._isOpen = !0, this.opener = n(this.document[0].activeElement), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this._show(this.uiDialog, this.options.show, function() {
                t._focusTabbable();
                t._trigger("focus")
            }), this._trigger("open"), undefined)
        },
        _focusTabbable: function() {
            var n = this.element.find("[autofocus]");
            n.length || (n = this.element.find(":tabbable"));
            n.length || (n = this.uiDialogButtonPane.find(":tabbable"));
            n.length || (n = this.uiDialogTitlebarClose.filter(":tabbable"));
            n.length || (n = this.uiDialog);
            n.eq(0).focus()
        },
        _keepFocus: function(t) {
            function i() {
                var t = this.document[0].activeElement,
                    i = this.uiDialog[0] === t || n.contains(this.uiDialog[0], t);
                i || this._focusTabbable()
            }
            t.preventDefault();
            i.call(this);
            this._delay(i)
        },
        _createWrapper: function() {
            this.uiDialog = n("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
                tabIndex: -1,
                role: "dialog"
            }).appendTo(this._appendTo());
            this._on(this.uiDialog, {
                keydown: function(t) {
                    if (this.options.closeOnEscape && !t.isDefaultPrevented() && t.keyCode && t.keyCode === n.ui.keyCode.ESCAPE) return t.preventDefault(), this.close(t), undefined;
                    if (t.keyCode === n.ui.keyCode.TAB) {
                        var i = this.uiDialog.find(":tabbable"),
                            r = i.filter(":first"),
                            u = i.filter(":last");
                        t.target !== u[0] && t.target !== this.uiDialog[0] || t.shiftKey ? t.target !== r[0] && t.target !== this.uiDialog[0] || !t.shiftKey || (u.focus(1), t.preventDefault()) : (r.focus(1), t.preventDefault())
                    }
                },
                mousedown: function(n) {
                    this._moveToTop(n) && this._focusTabbable()
                }
            });
            this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                "aria-describedby": this.element.uniqueId().attr("id")
            })
        },
        _createTitlebar: function() {
            var t;
            this.uiDialogTitlebar = n("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog);
            this._on(this.uiDialogTitlebar, {
                mousedown: function(t) {
                    n(t.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus()
                }
            });
            this.uiDialogTitlebarClose = n("<button><\/button>").button({
                label: this.options.closeText,
                icons: {
                    primary: "ui-icon-closethick"
                },
                text: !1
            }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar);
            this._on(this.uiDialogTitlebarClose, {
                click: function(n) {
                    n.preventDefault();
                    this.close(n)
                }
            });
            t = n("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar);
            this._title(t);
            this.uiDialog.attr({
                "aria-labelledby": t.attr("id")
            })
        },
        _title: function(n) {
            this.options.title || n.html("&#160;");
            n.text(this.options.title)
        },
        _createButtonPane: function() {
            this.uiDialogButtonPane = n("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");
            this.uiButtonSet = n("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane);
            this._createButtons()
        },
        _createButtons: function() {
            var i = this,
                t = this.options.buttons;
            return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), n.isEmptyObject(t) || n.isArray(t) && !t.length ? (this.uiDialog.removeClass("ui-dialog-buttons"), undefined) : (n.each(t, function(t, r) {
                var u, f;
                r = n.isFunction(r) ? {
                    click: r,
                    text: t
                } : r;
                r = n.extend({
                    type: "button"
                }, r);
                u = r.click;
                r.click = function() {
                    u.apply(i.element[0], arguments)
                };
                f = {
                    icons: r.icons,
                    text: r.showText
                };
                delete r.icons;
                delete r.showText;
                n("<button><\/button>", r).button(f).appendTo(i.uiButtonSet)
            }), this.uiDialog.addClass("ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog), undefined)
        },
        _makeDraggable: function() {
            function i(n) {
                return {
                    position: n.position,
                    offset: n.offset
                }
            }
            var t = this,
                r = this.options;
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function(r, u) {
                    n(this).addClass("ui-dialog-dragging");
                    t._blockFrames();
                    t._trigger("dragStart", r, i(u))
                },
                drag: function(n, r) {
                    t._trigger("drag", n, i(r))
                },
                stop: function(u, f) {
                    r.position = [f.position.left - t.document.scrollLeft(), f.position.top - t.document.scrollTop()];
                    n(this).removeClass("ui-dialog-dragging");
                    t._unblockFrames();
                    t._trigger("dragStop", u, i(f))
                }
            })
        },
        _makeResizable: function() {
            function r(n) {
                return {
                    originalPosition: n.originalPosition,
                    originalSize: n.originalSize,
                    position: n.position,
                    size: n.size
                }
            }
            var i = this,
                t = this.options,
                u = t.resizable,
                f = this.uiDialog.css("position"),
                e = "string" == typeof u ? u : "n,e,s,w,se,sw,ne,nw";
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: t.maxWidth,
                maxHeight: t.maxHeight,
                minWidth: t.minWidth,
                minHeight: this._minHeight(),
                handles: e,
                start: function(t, u) {
                    n(this).addClass("ui-dialog-resizing");
                    i._blockFrames();
                    i._trigger("resizeStart", t, r(u))
                },
                resize: function(n, t) {
                    i._trigger("resize", n, r(t))
                },
                stop: function(u, f) {
                    t.height = n(this).height();
                    t.width = n(this).width();
                    n(this).removeClass("ui-dialog-resizing");
                    i._unblockFrames();
                    i._trigger("resizeStop", u, r(f))
                }
            }).css("position", f)
        },
        _minHeight: function() {
            var n = this.options;
            return "auto" === n.height ? n.minHeight : Math.min(n.minHeight, n.height)
        },
        _position: function() {
            var n = this.uiDialog.is(":visible");
            n || this.uiDialog.show();
            this.uiDialog.position(this.options.position);
            n || this.uiDialog.hide()
        },
        _setOptions: function(r) {
            var e = this,
                u = !1,
                f = {};
            n.each(r, function(n, r) {
                e._setOption(n, r);
                n in t && (u = !0);
                n in i && (f[n] = r)
            });
            u && (this._size(), this._position());
            this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", f)
        },
        _setOption: function(n, t) {
            var u, r, i = this.uiDialog;
            "dialogClass" === n && i.removeClass(this.options.dialogClass).addClass(t);
            "disabled" !== n && (this._super(n, t), "appendTo" === n && this.uiDialog.appendTo(this._appendTo()), "buttons" === n && this._createButtons(), "closeText" === n && this.uiDialogTitlebarClose.button({
                label: "" + t
            }), "draggable" === n && (u = i.is(":data(ui-draggable)"), u && !t && i.draggable("destroy"), !u && t && this._makeDraggable()), "position" === n && this._position(), "resizable" === n && (r = i.is(":data(ui-resizable)"), r && !t && i.resizable("destroy"), r && "string" == typeof t && i.resizable("option", "handles", t), r || t === !1 || this._makeResizable()), "title" === n && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
        },
        _size: function() {
            var t, i, r, n = this.options;
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                maxHeight: "none",
                height: 0
            });
            n.minWidth > n.width && (n.width = n.minWidth);
            t = this.uiDialog.css({
                height: "auto",
                width: n.width
            }).outerHeight();
            i = Math.max(0, n.minHeight - t);
            r = "number" == typeof n.maxHeight ? Math.max(0, n.maxHeight - t) : "none";
            "auto" === n.height ? this.element.css({
                minHeight: i,
                maxHeight: r,
                height: "auto"
            }) : this.element.height(Math.max(0, n.height - t));
            this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        },
        _blockFrames: function() {
            this.iframeBlocks = this.document.find("iframe").map(function() {
                var t = n(this);
                return n("<div>").css({
                    position: "absolute",
                    width: t.outerWidth(),
                    height: t.outerHeight()
                }).appendTo(t.parent()).offset(t.offset())[0]
            })
        },
        _unblockFrames: function() {
            this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
        },
        _allowInteraction: function(t) {
            return n(t.target).closest(".ui-dialog").length ? !0 : !!n(t.target).closest(".ui-datepicker").length
        },
        _createOverlay: function() {
            if (this.options.modal) {
                var t = this,
                    i = this.widgetFullName;
                n.ui.dialog.overlayInstances || this._delay(function() {
                    n.ui.dialog.overlayInstances && this.document.bind("focusin.dialog", function(r) {
                        t._allowInteraction(r) || (r.preventDefault(), n(".ui-dialog:visible:last .ui-dialog-content").data(i)._focusTabbable())
                    })
                });
                this.overlay = n("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo());
                this._on(this.overlay, {
                    mousedown: "_keepFocus"
                });
                n.ui.dialog.overlayInstances++
            }
        },
        _destroyOverlay: function() {
            this.options.modal && this.overlay && (n.ui.dialog.overlayInstances--, n.ui.dialog.overlayInstances || this.document.unbind("focusin.dialog"), this.overlay.remove(), this.overlay = null)
        }
    });
    n.ui.dialog.overlayInstances = 0;
    n.uiBackCompat !== !1 && n.widget("ui.dialog", n.ui.dialog, {
        _position: function() {
            var u, t = this.options.position,
                i = [],
                r = [0, 0];
            t ? (("string" == typeof t || "object" == typeof t && "0" in t) && (i = t.split ? t.split(" ") : [t[0], t[1]], 1 === i.length && (i[1] = i[0]), n.each(["left", "top"], function(n, t) {
                +i[n] === i[n] && (r[n] = i[n], i[n] = t)
            }), t = {
                my: i[0] + (0 > r[0] ? r[0] : "+" + r[0]) + " " + i[1] + (0 > r[1] ? r[1] : "+" + r[1]),
                at: i.join(" ")
            }), t = n.extend({}, n.ui.dialog.prototype.options.position, t)) : t = n.ui.dialog.prototype.options.position;
            u = this.uiDialog.is(":visible");
            u || this.uiDialog.show();
            this.uiDialog.position(t);
            u || this.uiDialog.hide()
        }
    })
}(jQuery),
function(n) {
    n.widget("ui.menu", {
        version: "1.10.3",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-carat-1-e"
            },
            menus: "ul",
            position: {
                my: "left top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function() {
            this.activeMenu = this.element;
            this.mouseHandled = !1;
            this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            }).bind("click" + this.eventNamespace, n.proxy(function(n) {
                this.options.disabled && n.preventDefault()
            }, this));
            this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true");
            this._on({
                "mousedown .ui-menu-item > a": function(n) {
                    n.preventDefault()
                },
                "click .ui-state-disabled > a": function(n) {
                    n.preventDefault()
                },
                "click .ui-menu-item:has(a)": function(t) {
                    var i = n(t.target).closest(".ui-menu-item");
                    !this.mouseHandled && i.not(".ui-state-disabled").length && (this.mouseHandled = !0, this.select(t), i.has(".ui-menu").length ? this.expand(t) : this.element.is(":focus") || (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                },
                "mouseenter .ui-menu-item": function(t) {
                    var i = n(t.currentTarget);
                    i.siblings().children(".ui-state-active").removeClass("ui-state-active");
                    this.focus(t, i)
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function(n, t) {
                    var i = this.active || this.element.children(".ui-menu-item").eq(0);
                    t || this.focus(n, i)
                },
                blur: function(t) {
                    this._delay(function() {
                        n.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(t)
                    })
                },
                keydown: "_keydown"
            });
            this.refresh();
            this._on(this.document, {
                click: function(t) {
                    n(t.target).closest(".ui-menu").length || this.collapseAll(t);
                    this.mouseHandled = !1
                }
            })
        },
        _destroy: function() {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show();
            this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                var t = n(this);
                t.data("ui-menu-submenu-carat") && t.remove()
            });
            this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
        },
        _keydown: function(t) {
            function o(n) {
                return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            }
            var i, f, r, e, u, s = !0;
            switch (t.keyCode) {
                case n.ui.keyCode.PAGE_UP:
                    this.previousPage(t);
                    break;
                case n.ui.keyCode.PAGE_DOWN:
                    this.nextPage(t);
                    break;
                case n.ui.keyCode.HOME:
                    this._move("first", "first", t);
                    break;
                case n.ui.keyCode.END:
                    this._move("last", "last", t);
                    break;
                case n.ui.keyCode.UP:
                    this.previous(t);
                    break;
                case n.ui.keyCode.DOWN:
                    this.next(t);
                    break;
                case n.ui.keyCode.LEFT:
                    this.collapse(t);
                    break;
                case n.ui.keyCode.RIGHT:
                    this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
                    break;
                case n.ui.keyCode.ENTER:
                case n.ui.keyCode.SPACE:
                    this._activate(t);
                    break;
                case n.ui.keyCode.ESCAPE:
                    this.collapse(t);
                    break;
                default:
                    s = !1;
                    f = this.previousFilter || "";
                    r = String.fromCharCode(t.keyCode);
                    e = !1;
                    clearTimeout(this.filterTimer);
                    r === f ? e = !0 : r = f + r;
                    u = RegExp("^" + o(r), "i");
                    i = this.activeMenu.children(".ui-menu-item").filter(function() {
                        return u.test(n(this).children("a").text())
                    });
                    i = e && -1 !== i.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : i;
                    i.length || (r = String.fromCharCode(t.keyCode), u = RegExp("^" + o(r), "i"), i = this.activeMenu.children(".ui-menu-item").filter(function() {
                        return u.test(n(this).children("a").text())
                    }));
                    i.length ? (this.focus(t, i), i.length > 1 ? (this.previousFilter = r, this.filterTimer = this._delay(function() {
                        delete this.previousFilter
                    }, 1e3)) : delete this.previousFilter) : delete this.previousFilter
            }
            s && t.preventDefault()
        },
        _activate: function(n) {
            this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(n) : this.select(n))
        },
        refresh: function() {
            var t, r = this.options.icons.submenu,
                i = this.element.find(this.options.menus);
            i.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function() {
                var t = n(this),
                    i = t.prev("a"),
                    u = n("<span>").addClass("ui-menu-icon ui-icon " + r).data("ui-menu-submenu-carat", !0);
                i.attr("aria-haspopup", "true").prepend(u);
                t.attr("aria-labelledby", i.attr("id"))
            });
            t = i.add(this.element);
            t.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
                tabIndex: -1,
                role: this._itemRole()
            });
            t.children(":not(.ui-menu-item)").each(function() {
                var t = n(this);
                /[^\-\u2014\u2013\s]/.test(t.text()) || t.addClass("ui-widget-content ui-menu-divider")
            });
            t.children(".ui-state-disabled").attr("aria-disabled", "true");
            this.active && !n.contains(this.element[0], this.active[0]) && this.blur()
        },
        _itemRole: function() {
            return {
                menu: "menuitem",
                listbox: "option"
            }[this.options.role]
        },
        _setOption: function(n, t) {
            "icons" === n && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu);
            this._super(n, t)
        },
        focus: function(n, t) {
            var i, r;
            this.blur(n, n && "focus" === n.type);
            this._scrollIntoView(t);
            this.active = t.first();
            r = this.active.children("a").addClass("ui-state-focus");
            this.options.role && this.element.attr("aria-activedescendant", r.attr("id"));
            this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active");
            n && "keydown" === n.type ? this._close() : this.timer = this._delay(function() {
                this._close()
            }, this.delay);
            i = t.children(".ui-menu");
            i.length && /^mouse/.test(n.type) && this._startOpening(i);
            this.activeMenu = t.parent();
            this._trigger("focus", n, {
                item: t
            })
        },
        _scrollIntoView: function(t) {
            var e, o, i, r, u, f;
            this._hasScroll() && (e = parseFloat(n.css(this.activeMenu[0], "borderTopWidth")) || 0, o = parseFloat(n.css(this.activeMenu[0], "paddingTop")) || 0, i = t.offset().top - this.activeMenu.offset().top - e - o, r = this.activeMenu.scrollTop(), u = this.activeMenu.height(), f = t.height(), 0 > i ? this.activeMenu.scrollTop(r + i) : i + f > u && this.activeMenu.scrollTop(r + i - u + f))
        },
        blur: function(n, t) {
            t || clearTimeout(this.timer);
            this.active && (this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", n, {
                item: this.active
            }))
        },
        _startOpening: function(n) {
            clearTimeout(this.timer);
            "true" === n.attr("aria-hidden") && (this.timer = this._delay(function() {
                this._close();
                this._open(n)
            }, this.delay))
        },
        _open: function(t) {
            var i = n.extend({ of : this.active
            }, this.options.position);
            clearTimeout(this.timer);
            this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true");
            t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
        },
        collapseAll: function(t, i) {
            clearTimeout(this.timer);
            this.timer = this._delay(function() {
                var r = i ? this.element : n(t && t.target).closest(this.element.find(".ui-menu"));
                r.length || (r = this.element);
                this._close(r);
                this.blur(t);
                this.activeMenu = r
            }, this.delay)
        },
        _close: function(n) {
            n || (n = this.active ? this.active.parent() : this.element);
            n.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
        },
        collapse: function(n) {
            var t = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            t && t.length && (this._close(), this.focus(n, t))
        },
        expand: function(n) {
            var t = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
            t && t.length && (this._open(t.parent()), this._delay(function() {
                this.focus(n, t)
            }))
        },
        next: function(n) {
            this._move("next", "first", n)
        },
        previous: function(n) {
            this._move("prev", "last", n)
        },
        isFirstItem: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function(n, t, i) {
            var r;
            this.active && (r = "first" === n || "last" === n ? this.active["first" === n ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[n + "All"](".ui-menu-item").eq(0));
            r && r.length && this.active || (r = this.activeMenu.children(".ui-menu-item")[t]());
            this.focus(i, r)
        },
        nextPage: function(t) {
            var i, r, u;
            return this.active ? (this.isLastItem() || (this._hasScroll() ? (r = this.active.offset().top, u = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                return i = n(this), 0 > i.offset().top - r - u
            }), this.focus(t, i)) : this.focus(t, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]())), undefined) : (this.next(t), undefined)
        },
        previousPage: function(t) {
            var i, r, u;
            return this.active ? (this.isFirstItem() || (this._hasScroll() ? (r = this.active.offset().top, u = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                return i = n(this), i.offset().top - r + u > 0
            }), this.focus(t, i)) : this.focus(t, this.activeMenu.children(".ui-menu-item").first())), undefined) : (this.next(t), undefined)
        },
        _hasScroll: function() {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function(t) {
            this.active = this.active || n(t.target).closest(".ui-menu-item");
            var i = {
                item: this.active
            };
            this.active.has(".ui-menu").length || this.collapseAll(t, !0);
            this._trigger("select", t, i)
        }
    })
}(jQuery),
function(n, t) {
    n.widget("ui.progressbar", {
        version: "1.10.3",
        options: {
            max: 100,
            value: 0,
            change: null,
            complete: null
        },
        min: 0,
        _create: function() {
            this.oldValue = this.options.value = this._constrainedValue();
            this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min
            });
            this.valueDiv = n("<div class='ui-progressbar-value ui-widget-header ui-corner-left'><\/div>").appendTo(this.element);
            this._refreshValue()
        },
        _destroy: function() {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
            this.valueDiv.remove()
        },
        value: function(n) {
            return n === t ? this.options.value : (this.options.value = this._constrainedValue(n), this._refreshValue(), t)
        },
        _constrainedValue: function(n) {
            return n === t && (n = this.options.value), this.indeterminate = n === !1, "number" != typeof n && (n = 0), this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, n))
        },
        _setOptions: function(n) {
            var t = n.value;
            delete n.value;
            this._super(n);
            this.options.value = this._constrainedValue(t);
            this._refreshValue()
        },
        _setOption: function(n, t) {
            "max" === n && (t = Math.max(this.min, t));
            this._super(n, t)
        },
        _percentage: function() {
            return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
        },
        _refreshValue: function() {
            var t = this.options.value,
                i = this._percentage();
            this.valueDiv.toggle(this.indeterminate || t > this.min).toggleClass("ui-corner-right", t === this.options.max).width(i.toFixed(0) + "%");
            this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate);
            this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = n("<div class='ui-progressbar-overlay'><\/div>").appendTo(this.valueDiv))) : (this.element.attr({
                "aria-valuemax": this.options.max,
                "aria-valuenow": t
            }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null));
            this.oldValue !== t && (this.oldValue = t, this._trigger("change"));
            t === this.options.max && this._trigger("complete")
        }
    })
}(jQuery),
function(n) {
    var t = 5;
    n.widget("ui.slider", n.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        _create: function() {
            this._keySliding = !1;
            this._mouseSliding = !1;
            this._animateOff = !0;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all");
            this._refresh();
            this._setOption("disabled", this.options.disabled);
            this._animateOff = !1
        },
        _refresh: function() {
            this._createRange();
            this._createHandles();
            this._setupEvents();
            this._refreshValue()
        },
        _createHandles: function() {
            var r, i, u = this.options,
                t = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                f = [];
            for (i = u.values && u.values.length || 1, t.length > i && (t.slice(i).remove(), t = t.slice(0, i)), r = t.length; i > r; r++) f.push("<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'><\/a>");
            this.handles = t.add(n(f.join("")).appendTo(this.element));
            this.handle = this.handles.eq(0);
            this.handles.each(function(t) {
                n(this).data("ui-slider-handle-index", t)
            })
        },
        _createRange: function() {
            var t = this.options,
                i = "";
            t.range ? (t.range === !0 && (t.values ? t.values.length && 2 !== t.values.length ? t.values = [t.values[0], t.values[0]] : n.isArray(t.values) && (t.values = t.values.slice(0)) : t.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                left: "",
                bottom: ""
            }) : (this.range = n("<div><\/div>").appendTo(this.element), i = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(i + ("min" === t.range || "max" === t.range ? " ui-slider-range-" + t.range : ""))) : this.range = n([])
        },
        _setupEvents: function() {
            var n = this.handles.add(this.range).filter("a");
            this._off(n);
            this._on(n, this._handleEvents);
            this._hoverable(n);
            this._focusable(n)
        },
        _destroy: function() {
            this.handles.remove();
            this.range.remove();
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all");
            this._mouseDestroy()
        },
        _mouseCapture: function(t) {
            var s, f, r, i, u, h, e, c, o = this,
                l = this.options;
            return l.disabled ? !1 : (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, this.elementOffset = this.element.offset(), s = {
                x: t.pageX,
                y: t.pageY
            }, f = this._normValueFromMouse(s), r = this._valueMax() - this._valueMin() + 1, this.handles.each(function(t) {
                var e = Math.abs(f - o.values(t));
                (r > e || r === e && (t === o._lastChangedValue || o.values(t) === l.min)) && (r = e, i = n(this), u = t)
            }), h = this._start(t, u), h === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = u, i.addClass("ui-state-active").focus(), e = i.offset(), c = !n(t.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = c ? {
                left: 0,
                top: 0
            } : {
                left: t.pageX - e.left - i.width() / 2,
                top: t.pageY - e.top - i.height() / 2 - (parseInt(i.css("borderTopWidth"), 10) || 0) - (parseInt(i.css("borderBottomWidth"), 10) || 0) + (parseInt(i.css("marginTop"), 10) || 0)
            }, this.handles.hasClass("ui-state-hover") || this._slide(t, u, f), this._animateOff = !0, !0))
        },
        _mouseStart: function() {
            return !0
        },
        _mouseDrag: function(n) {
            var t = {
                    x: n.pageX,
                    y: n.pageY
                },
                i = this._normValueFromMouse(t);
            return this._slide(n, this._handleIndex, i), !1
        },
        _mouseStop: function(n) {
            return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(n, this._handleIndex), this._change(n, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
        },
        _detectOrientation: function() {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function(n) {
            var i, r, t, u, f;
            return "horizontal" === this.orientation ? (i = this.elementSize.width, r = n.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (i = this.elementSize.height, r = n.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), t = r / i, t > 1 && (t = 1), 0 > t && (t = 0), "vertical" === this.orientation && (t = 1 - t), u = this._valueMax() - this._valueMin(), f = this._valueMin() + t * u, this._trimAlignValue(f)
        },
        _start: function(n, t) {
            var i = {
                handle: this.handles[t],
                value: this.value()
            };
            return this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("start", n, i)
        },
        _slide: function(n, t, i) {
            var r, f, u;
            this.options.values && this.options.values.length ? (r = this.values(t ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === t && i > r || 1 === t && r > i) && (i = r), i !== this.values(t) && (f = this.values(), f[t] = i, u = this._trigger("slide", n, {
                handle: this.handles[t],
                value: i,
                values: f
            }), r = this.values(t ? 0 : 1), u !== !1 && this.values(t, i, !0))) : i !== this.value() && (u = this._trigger("slide", n, {
                handle: this.handles[t],
                value: i
            }), u !== !1 && this.value(i))
        },
        _stop: function(n, t) {
            var i = {
                handle: this.handles[t],
                value: this.value()
            };
            this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values());
            this._trigger("stop", n, i)
        },
        _change: function(n, t) {
            if (!this._keySliding && !this._mouseSliding) {
                var i = {
                    handle: this.handles[t],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values());
                this._lastChangedValue = t;
                this._trigger("change", n, i)
            }
        },
        value: function(n) {
            return arguments.length ? (this.options.value = this._trimAlignValue(n), this._refreshValue(), this._change(null, 0), undefined) : this._value()
        },
        values: function(t, i) {
            var u, f, r;
            if (arguments.length > 1) return this.options.values[t] = this._trimAlignValue(i), this._refreshValue(), this._change(null, t), undefined;
            if (!arguments.length) return this._values();
            if (!n.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(t) : this.value();
            for (u = this.options.values, f = arguments[0], r = 0; u.length > r; r += 1) u[r] = this._trimAlignValue(f[r]), this._change(null, r);
            this._refreshValue()
        },
        _setOption: function(t, i) {
            var r, u = 0;
            switch ("range" === t && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), n.isArray(this.options.values) && (u = this.options.values.length), n.Widget.prototype._setOption.apply(this, arguments), t) {
                case "orientation":
                    this._detectOrientation();
                    this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                    this._refreshValue();
                    break;
                case "value":
                    this._animateOff = !0;
                    this._refreshValue();
                    this._change(null, 0);
                    this._animateOff = !1;
                    break;
                case "values":
                    for (this._animateOff = !0, this._refreshValue(), r = 0; u > r; r += 1) this._change(null, r);
                    this._animateOff = !1;
                    break;
                case "min":
                case "max":
                    this._animateOff = !0;
                    this._refreshValue();
                    this._animateOff = !1;
                    break;
                case "range":
                    this._animateOff = !0;
                    this._refresh();
                    this._animateOff = !1
            }
        },
        _value: function() {
            var n = this.options.value;
            return this._trimAlignValue(n)
        },
        _values: function(n) {
            var r, t, i;
            if (arguments.length) return r = this.options.values[n], r = this._trimAlignValue(r);
            if (this.options.values && this.options.values.length) {
                for (t = this.options.values.slice(), i = 0; t.length > i; i += 1) t[i] = this._trimAlignValue(t[i]);
                return t
            }
            return []
        },
        _trimAlignValue: function(n) {
            if (this._valueMin() >= n) return this._valueMin();
            if (n >= this._valueMax()) return this._valueMax();
            var t = this.options.step > 0 ? this.options.step : 1,
                i = (n - this._valueMin()) % t,
                r = n - i;
            return 2 * Math.abs(i) >= t && (r += i > 0 ? t : -t), parseFloat(r.toFixed(5))
        },
        _valueMin: function() {
            return this.options.min
        },
        _valueMax: function() {
            return this.options.max
        },
        _refreshValue: function() {
            var s, t, c, f, h, e = this.options.range,
                i = this.options,
                r = this,
                u = this._animateOff ? !1 : i.animate,
                o = {};
            this.options.values && this.options.values.length ? this.handles.each(function(f) {
                t = 100 * ((r.values(f) - r._valueMin()) / (r._valueMax() - r._valueMin()));
                o["horizontal" === r.orientation ? "left" : "bottom"] = t + "%";
                n(this).stop(1, 1)[u ? "animate" : "css"](o, i.animate);
                r.options.range === !0 && ("horizontal" === r.orientation ? (0 === f && r.range.stop(1, 1)[u ? "animate" : "css"]({
                    left: t + "%"
                }, i.animate), 1 === f && r.range[u ? "animate" : "css"]({
                    width: t - s + "%"
                }, {
                    queue: !1,
                    duration: i.animate
                })) : (0 === f && r.range.stop(1, 1)[u ? "animate" : "css"]({
                    bottom: t + "%"
                }, i.animate), 1 === f && r.range[u ? "animate" : "css"]({
                    height: t - s + "%"
                }, {
                    queue: !1,
                    duration: i.animate
                })));
                s = t
            }) : (c = this.value(), f = this._valueMin(), h = this._valueMax(), t = h !== f ? 100 * ((c - f) / (h - f)) : 0, o["horizontal" === this.orientation ? "left" : "bottom"] = t + "%", this.handle.stop(1, 1)[u ? "animate" : "css"](o, i.animate), "min" === e && "horizontal" === this.orientation && this.range.stop(1, 1)[u ? "animate" : "css"]({
                width: t + "%"
            }, i.animate), "max" === e && "horizontal" === this.orientation && this.range[u ? "animate" : "css"]({
                width: 100 - t + "%"
            }, {
                queue: !1,
                duration: i.animate
            }), "min" === e && "vertical" === this.orientation && this.range.stop(1, 1)[u ? "animate" : "css"]({
                height: t + "%"
            }, i.animate), "max" === e && "vertical" === this.orientation && this.range[u ? "animate" : "css"]({
                height: 100 - t + "%"
            }, {
                queue: !1,
                duration: i.animate
            }))
        },
        _handleEvents: {
            keydown: function(i) {
                var o, u, r, f, e = n(i.target).data("ui-slider-handle-index");
                switch (i.keyCode) {
                    case n.ui.keyCode.HOME:
                    case n.ui.keyCode.END:
                    case n.ui.keyCode.PAGE_UP:
                    case n.ui.keyCode.PAGE_DOWN:
                    case n.ui.keyCode.UP:
                    case n.ui.keyCode.RIGHT:
                    case n.ui.keyCode.DOWN:
                    case n.ui.keyCode.LEFT:
                        if (i.preventDefault(), !this._keySliding && (this._keySliding = !0, n(i.target).addClass("ui-state-active"), o = this._start(i, e), o === !1)) return
                }
                switch (f = this.options.step, u = r = this.options.values && this.options.values.length ? this.values(e) : this.value(), i.keyCode) {
                    case n.ui.keyCode.HOME:
                        r = this._valueMin();
                        break;
                    case n.ui.keyCode.END:
                        r = this._valueMax();
                        break;
                    case n.ui.keyCode.PAGE_UP:
                        r = this._trimAlignValue(u + (this._valueMax() - this._valueMin()) / t);
                        break;
                    case n.ui.keyCode.PAGE_DOWN:
                        r = this._trimAlignValue(u - (this._valueMax() - this._valueMin()) / t);
                        break;
                    case n.ui.keyCode.UP:
                    case n.ui.keyCode.RIGHT:
                        if (u === this._valueMax()) return;
                        r = this._trimAlignValue(u + f);
                        break;
                    case n.ui.keyCode.DOWN:
                    case n.ui.keyCode.LEFT:
                        if (u === this._valueMin()) return;
                        r = this._trimAlignValue(u - f)
                }
                this._slide(i, e, r)
            },
            click: function(n) {
                n.preventDefault()
            },
            keyup: function(t) {
                var i = n(t.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1, this._stop(t, i), this._change(t, i), n(t.target).removeClass("ui-state-active"))
            }
        }
    })
}(jQuery),
function(n) {
    function t(n) {
        return function() {
            var t = this.element.val();
            n.apply(this, arguments);
            this._refresh();
            t !== this.element.val() && this._trigger("change")
        }
    }
    n.widget("ui.spinner", {
        version: "1.10.3",
        defaultElement: "<input>",
        widgetEventPrefix: "spin",
        options: {
            culture: null,
            icons: {
                down: "ui-icon-triangle-1-s",
                up: "ui-icon-triangle-1-n"
            },
            incremental: !0,
            max: null,
            min: null,
            numberFormat: null,
            page: 10,
            step: 1,
            change: null,
            spin: null,
            start: null,
            stop: null
        },
        _create: function() {
            this._setOption("max", this.options.max);
            this._setOption("min", this.options.min);
            this._setOption("step", this.options.step);
            this._value(this.element.val(), !0);
            this._draw();
            this._on(this._events);
            this._refresh();
            this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _getCreateOptions: function() {
            var t = {},
                i = this.element;
            return n.each(["min", "max", "step"], function(n, r) {
                var u = i.attr(r);
                void 0 !== u && u.length && (t[r] = u)
            }), t
        },
        _events: {
            keydown: function(n) {
                this._start(n) && this._keydown(n) && n.preventDefault()
            },
            keyup: "_stop",
            focus: function() {
                this.previous = this.element.val()
            },
            blur: function(n) {
                return this.cancelBlur ? (delete this.cancelBlur, void 0) : (this._stop(), this._refresh(), this.previous !== this.element.val() && this._trigger("change", n), void 0)
            },
            mousewheel: function(n, t) {
                if (t) {
                    if (!this.spinning && !this._start(n)) return !1;
                    this._spin((t > 0 ? 1 : -1) * this.options.step, n);
                    clearTimeout(this.mousewheelTimer);
                    this.mousewheelTimer = this._delay(function() {
                        this.spinning && this._stop(n)
                    }, 100);
                    n.preventDefault()
                }
            },
            "mousedown .ui-spinner-button": function(t) {
                function r() {
                    var n = this.element[0] === this.document[0].activeElement;
                    n || (this.element.focus(), this.previous = i, this._delay(function() {
                        this.previous = i
                    }))
                }
                var i;
                i = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val();
                t.preventDefault();
                r.call(this);
                this.cancelBlur = !0;
                this._delay(function() {
                    delete this.cancelBlur;
                    r.call(this)
                });
                this._start(t) !== !1 && this._repeat(null, n(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, t)
            },
            "mouseup .ui-spinner-button": "_stop",
            "mouseenter .ui-spinner-button": function(t) {
                if (n(t.currentTarget).hasClass("ui-state-active")) return this._start(t) === !1 ? !1 : (this._repeat(null, n(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, t), void 0)
            },
            "mouseleave .ui-spinner-button": "_stop"
        },
        _draw: function() {
            var n = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
            this.element.attr("role", "spinbutton");
            this.buttons = n.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all");
            this.buttons.height() > Math.ceil(.5 * n.height()) && n.height() > 0 && n.height(n.height());
            this.options.disabled && this.disable()
        },
        _keydown: function(t) {
            var r = this.options,
                i = n.ui.keyCode;
            switch (t.keyCode) {
                case i.UP:
                    return this._repeat(null, 1, t), !0;
                case i.DOWN:
                    return this._repeat(null, -1, t), !0;
                case i.PAGE_UP:
                    return this._repeat(null, r.page, t), !0;
                case i.PAGE_DOWN:
                    return this._repeat(null, -r.page, t), !0
            }
            return !1
        },
        _uiSpinnerHtml: function() {
            return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'><\/span>"
        },
        _buttonHtml: function() {
            return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;<\/span><\/a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " + this.options.icons.down + "'>&#9660;<\/span><\/a>"
        },
        _start: function(n) {
            return this.spinning || this._trigger("start", n) !== !1 ? (this.counter || (this.counter = 1), this.spinning = !0, !0) : !1
        },
        _repeat: function(n, t, i) {
            n = n || 500;
            clearTimeout(this.timer);
            this.timer = this._delay(function() {
                this._repeat(40, t, i)
            }, n);
            this._spin(t * this.options.step, i)
        },
        _spin: function(n, t) {
            var i = this.value() || 0;
            this.counter || (this.counter = 1);
            i = this._adjustValue(i + n * this._increment(this.counter));
            this.spinning && this._trigger("spin", t, {
                value: i
            }) === !1 || (this._value(i), this.counter++)
        },
        _increment: function(t) {
            var i = this.options.incremental;
            return i ? n.isFunction(i) ? i(t) : Math.floor(t * t * t / 5e4 - t * t / 500 + 17 * t / 200 + 1) : 1
        },
        _precision: function() {
            var n = this._precisionOf(this.options.step);
            return null !== this.options.min && (n = Math.max(n, this._precisionOf(this.options.min))), n
        },
        _precisionOf: function(n) {
            var t = "" + n,
                i = t.indexOf(".");
            return -1 === i ? 0 : t.length - i - 1
        },
        _adjustValue: function(n) {
            var r, i, t = this.options;
            return r = null !== t.min ? t.min : 0, i = n - r, i = Math.round(i / t.step) * t.step, n = r + i, n = parseFloat(n.toFixed(this._precision())), null !== t.max && n > t.max ? t.max : null !== t.min && t.min > n ? t.min : n
        },
        _stop: function(n) {
            this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", n))
        },
        _setOption: function(n, t) {
            if ("culture" === n || "numberFormat" === n) {
                var i = this._parse(this.element.val());
                return this.options[n] = t, this.element.val(this._format(i)), void 0
            }("max" === n || "min" === n || "step" === n) && "string" == typeof t && (t = this._parse(t));
            "icons" === n && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(t.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(t.down));
            this._super(n, t);
            "disabled" === n && (t ? (this.element.prop("disabled", !0), this.buttons.button("disable")) : (this.element.prop("disabled", !1), this.buttons.button("enable")))
        },
        _setOptions: t(function(n) {
            this._super(n);
            this._value(this.element.val())
        }),
        _parse: function(n) {
            return "string" == typeof n && "" !== n && (n = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(n, 10, this.options.culture) : +n), "" === n || isNaN(n) ? null : n
        },
        _format: function(n) {
            return "" === n ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(n, this.options.numberFormat, this.options.culture) : n
        },
        _refresh: function() {
            this.element.attr({
                "aria-valuemin": this.options.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._parse(this.element.val())
            })
        },
        _value: function(n, t) {
            var i;
            "" !== n && (i = this._parse(n), null !== i && (t || (i = this._adjustValue(i)), n = this._format(i)));
            this.element.val(n);
            this._refresh()
        },
        _destroy: function() {
            this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
            this.uiSpinner.replaceWith(this.element)
        },
        stepUp: t(function(n) {
            this._stepUp(n)
        }),
        _stepUp: function(n) {
            this._start() && (this._spin((n || 1) * this.options.step), this._stop())
        },
        stepDown: t(function(n) {
            this._stepDown(n)
        }),
        _stepDown: function(n) {
            this._start() && (this._spin((n || 1) * -this.options.step), this._stop())
        },
        pageUp: t(function(n) {
            this._stepUp((n || 1) * this.options.page)
        }),
        pageDown: t(function(n) {
            this._stepDown((n || 1) * this.options.page)
        }),
        value: function(n) {
            return arguments.length ? (t(this._value).call(this, n), void 0) : this._parse(this.element.val())
        },
        widget: function() {
            return this.uiSpinner
        }
    })
}(jQuery),
function(n, t) {
    function u() {
        return ++f
    }

    function i(n) {
        return n.hash.length > 1 && decodeURIComponent(n.href.replace(r, "")) === decodeURIComponent(location.href.replace(r, ""))
    }
    var f = 0,
        r = /#.*$/;
    n.widget("ui.tabs", {
        version: "1.10.3",
        delay: 300,
        options: {
            active: null,
            collapsible: !1,
            event: "click",
            heightStyle: "content",
            hide: null,
            show: null,
            activate: null,
            beforeActivate: null,
            beforeLoad: null,
            load: null
        },
        _create: function() {
            var i = this,
                t = this.options;
            this.running = !1;
            this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", t.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function(t) {
                n(this).is(".ui-state-disabled") && t.preventDefault()
            }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
                n(this).closest("li").is(".ui-state-disabled") && this.blur()
            });
            this._processTabs();
            t.active = this._initialActive();
            n.isArray(t.disabled) && (t.disabled = n.unique(t.disabled.concat(n.map(this.tabs.filter(".ui-state-disabled"), function(n) {
                return i.tabs.index(n)
            }))).sort());
            this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(t.active) : n();
            this._refresh();
            this.active.length && this.load(t.active)
        },
        _initialActive: function() {
            var i = this.options.active,
                r = this.options.collapsible,
                u = location.hash.substring(1);
            return null === i && (u && this.tabs.each(function(r, f) {
                return n(f).attr("aria-controls") === u ? (i = r, !1) : t
            }), null === i && (i = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === i || -1 === i) && (i = this.tabs.length ? 0 : !1)), i !== !1 && (i = this.tabs.index(this.tabs.eq(i)), -1 === i && (i = r ? !1 : 0)), !r && i === !1 && this.anchors.length && (i = 0), i
        },
        _getCreateEventData: function() {
            return {
                tab: this.active,
                panel: this.active.length ? this._getPanelForTab(this.active) : n()
            }
        },
        _tabKeydown: function(i) {
            var u = n(this.document[0].activeElement).closest("li"),
                r = this.tabs.index(u),
                f = !0;
            if (!this._handlePageNav(i)) {
                switch (i.keyCode) {
                    case n.ui.keyCode.RIGHT:
                    case n.ui.keyCode.DOWN:
                        r++;
                        break;
                    case n.ui.keyCode.UP:
                    case n.ui.keyCode.LEFT:
                        f = !1;
                        r--;
                        break;
                    case n.ui.keyCode.END:
                        r = this.anchors.length - 1;
                        break;
                    case n.ui.keyCode.HOME:
                        r = 0;
                        break;
                    case n.ui.keyCode.SPACE:
                        return i.preventDefault(), clearTimeout(this.activating), this._activate(r), t;
                    case n.ui.keyCode.ENTER:
                        return i.preventDefault(), clearTimeout(this.activating), this._activate(r === this.options.active ? !1 : r), t;
                    default:
                        return
                }
                i.preventDefault();
                clearTimeout(this.activating);
                r = this._focusNextTab(r, f);
                i.ctrlKey || (u.attr("aria-selected", "false"), this.tabs.eq(r).attr("aria-selected", "true"), this.activating = this._delay(function() {
                    this.option("active", r)
                }, this.delay))
            }
        },
        _panelKeydown: function(t) {
            this._handlePageNav(t) || t.ctrlKey && t.keyCode === n.ui.keyCode.UP && (t.preventDefault(), this.active.focus())
        },
        _handlePageNav: function(i) {
            return i.altKey && i.keyCode === n.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : i.altKey && i.keyCode === n.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : t
        },
        _findNextTab: function(t, i) {
            function u() {
                return t > r && (t = 0), 0 > t && (t = r), t
            }
            for (var r = this.tabs.length - 1; - 1 !== n.inArray(u(), this.options.disabled);) t = i ? t + 1 : t - 1;
            return t
        },
        _focusNextTab: function(n, t) {
            return n = this._findNextTab(n, t), this.tabs.eq(n).focus(), n
        },
        _setOption: function(n, i) {
            return "active" === n ? (this._activate(i), t) : "disabled" === n ? (this._setupDisabled(i), t) : (this._super(n, i), "collapsible" === n && (this.element.toggleClass("ui-tabs-collapsible", i), i || this.options.active !== !1 || this._activate(0)), "event" === n && this._setupEvents(i), "heightStyle" === n && this._setupHeightStyle(i), t)
        },
        _tabId: function(n) {
            return n.attr("aria-controls") || "ui-tabs-" + u()
        },
        _sanitizeSelector: function(n) {
            return n ? n.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
        },
        refresh: function() {
            var t = this.options,
                i = this.tablist.children(":has(a[href])");
            t.disabled = n.map(i.filter(".ui-state-disabled"), function(n) {
                return i.index(n)
            });
            this._processTabs();
            t.active !== !1 && this.anchors.length ? this.active.length && !n.contains(this.tablist[0], this.active[0]) ? this.tabs.length === t.disabled.length ? (t.active = !1, this.active = n()) : this._activate(this._findNextTab(Math.max(0, t.active - 1), !1)) : t.active = this.tabs.index(this.active) : (t.active = !1, this.active = n());
            this._refresh()
        },
        _refresh: function() {
            this._setupDisabled(this.options.disabled);
            this._setupEvents(this.options.event);
            this._setupHeightStyle(this.options.heightStyle);
            this.tabs.not(this.active).attr({
                "aria-selected": "false",
                tabIndex: -1
            });
            this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            });
            this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                "aria-selected": "true",
                tabIndex: 0
            }), this._getPanelForTab(this.active).show().attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            })) : this.tabs.eq(0).attr("tabIndex", 0)
        },
        _processTabs: function() {
            var t = this;
            this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist");
            this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                role: "tab",
                tabIndex: -1
            });
            this.anchors = this.tabs.map(function() {
                return n("a", this)[0]
            }).addClass("ui-tabs-anchor").attr({
                role: "presentation",
                tabIndex: -1
            });
            this.panels = n();
            this.anchors.each(function(r, u) {
                var e, f, s, h = n(u).uniqueId().attr("id"),
                    o = n(u).closest("li"),
                    c = o.attr("aria-controls");
                i(u) ? (e = u.hash, f = t.element.find(t._sanitizeSelector(e))) : (s = t._tabId(o), e = "#" + s, f = t.element.find(e), f.length || (f = t._createPanel(s), f.insertAfter(t.panels[r - 1] || t.tablist)), f.attr("aria-live", "polite"));
                f.length && (t.panels = t.panels.add(f));
                c && o.data("ui-tabs-aria-controls", c);
                o.attr({
                    "aria-controls": e.substring(1),
                    "aria-labelledby": h
                });
                f.attr("aria-labelledby", h)
            });
            this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel")
        },
        _getList: function() {
            return this.element.find("ol,ul").eq(0)
        },
        _createPanel: function(t) {
            return n("<div>").attr("id", t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
        },
        _setupDisabled: function(t) {
            n.isArray(t) && (t.length ? t.length === this.anchors.length && (t = !0) : t = !1);
            for (var i, r = 0; i = this.tabs[r]; r++) t === !0 || -1 !== n.inArray(r, t) ? n(i).addClass("ui-state-disabled").attr("aria-disabled", "true") : n(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");
            this.options.disabled = t
        },
        _setupEvents: function(t) {
            var i = {
                click: function(n) {
                    n.preventDefault()
                }
            };
            t && n.each(t.split(" "), function(n, t) {
                i[t] = "_eventHandler"
            });
            this._off(this.anchors.add(this.tabs).add(this.panels));
            this._on(this.anchors, i);
            this._on(this.tabs, {
                keydown: "_tabKeydown"
            });
            this._on(this.panels, {
                keydown: "_panelKeydown"
            });
            this._focusable(this.tabs);
            this._hoverable(this.tabs)
        },
        _setupHeightStyle: function(t) {
            var i, r = this.element.parent();
            "fill" === t ? (i = r.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
                var t = n(this),
                    r = t.css("position");
                "absolute" !== r && "fixed" !== r && (i -= t.outerHeight(!0))
            }), this.element.children().not(this.panels).each(function() {
                i -= n(this).outerHeight(!0)
            }), this.panels.each(function() {
                n(this).height(Math.max(0, i - n(this).innerHeight() + n(this).height()))
            }).css("overflow", "auto")) : "auto" === t && (i = 0, this.panels.each(function() {
                i = Math.max(i, n(this).height("").height())
            }).height(i))
        },
        _eventHandler: function(t) {
            var u = this.options,
                r = this.active,
                c = n(t.currentTarget),
                i = c.closest("li"),
                f = i[0] === r[0],
                e = f && u.collapsible,
                o = e ? n() : this._getPanelForTab(i),
                s = r.length ? this._getPanelForTab(r) : n(),
                h = {
                    oldTab: r,
                    oldPanel: s,
                    newTab: e ? n() : i,
                    newPanel: o
                };
            t.preventDefault();
            i.hasClass("ui-state-disabled") || i.hasClass("ui-tabs-loading") || this.running || f && !u.collapsible || this._trigger("beforeActivate", t, h) === !1 || (u.active = e ? !1 : this.tabs.index(i), this.active = f ? n() : i, this.xhr && this.xhr.abort(), s.length || o.length || n.error("jQuery UI Tabs: Mismatching fragment identifier."), o.length && this.load(this.tabs.index(i), t), this._toggle(t, h))
        },
        _toggle: function(t, i) {
            function e() {
                u.running = !1;
                u._trigger("activate", t, i)
            }

            function o() {
                i.newTab.closest("li").addClass("ui-tabs-active ui-state-active");
                r.length && u.options.show ? u._show(r, u.options.show, e) : (r.show(), e())
            }
            var u = this,
                r = i.newPanel,
                f = i.oldPanel;
            this.running = !0;
            f.length && this.options.hide ? this._hide(f, this.options.hide, function() {
                i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");
                o()
            }) : (i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), f.hide(), o());
            f.attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            });
            i.oldTab.attr("aria-selected", "false");
            r.length && f.length ? i.oldTab.attr("tabIndex", -1) : r.length && this.tabs.filter(function() {
                return 0 === n(this).attr("tabIndex")
            }).attr("tabIndex", -1);
            r.attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            });
            i.newTab.attr({
                "aria-selected": "true",
                tabIndex: 0
            })
        },
        _activate: function(t) {
            var r, i = this._findActive(t);
            i[0] !== this.active[0] && (i.length || (i = this.active), r = i.find(".ui-tabs-anchor")[0], this._eventHandler({
                target: r,
                currentTarget: r,
                preventDefault: n.noop
            }))
        },
        _findActive: function(t) {
            return t === !1 ? n() : this.tabs.eq(t)
        },
        _getIndex: function(n) {
            return "string" == typeof n && (n = this.anchors.index(this.anchors.filter("[href$='" + n + "']"))), n
        },
        _destroy: function() {
            this.xhr && this.xhr.abort();
            this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible");
            this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role");
            this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId();
            this.tabs.add(this.panels).each(function() {
                n.data(this, "ui-tabs-destroy") ? n(this).remove() : n(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
            });
            this.tabs.each(function() {
                var t = n(this),
                    i = t.data("ui-tabs-aria-controls");
                i ? t.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : t.removeAttr("aria-controls")
            });
            this.panels.show();
            "content" !== this.options.heightStyle && this.panels.css("height", "")
        },
        enable: function(i) {
            var r = this.options.disabled;
            r !== !1 && (i === t ? r = !1 : (i = this._getIndex(i), r = n.isArray(r) ? n.map(r, function(n) {
                return n !== i ? n : null
            }) : n.map(this.tabs, function(n, t) {
                return t !== i ? t : null
            })), this._setupDisabled(r))
        },
        disable: function(i) {
            var r = this.options.disabled;
            if (r !== !0) {
                if (i === t) r = !0;
                else {
                    if (i = this._getIndex(i), -1 !== n.inArray(i, r)) return;
                    r = n.isArray(r) ? n.merge([i], r).sort() : [i]
                }
                this._setupDisabled(r)
            }
        },
        load: function(t, r) {
            t = this._getIndex(t);
            var f = this,
                u = this.tabs.eq(t),
                o = u.find(".ui-tabs-anchor"),
                e = this._getPanelForTab(u),
                s = {
                    tab: u,
                    panel: e
                };
            i(o[0]) || (this.xhr = n.ajax(this._ajaxSettings(o, r, s)), this.xhr && "canceled" !== this.xhr.statusText && (u.addClass("ui-tabs-loading"), e.attr("aria-busy", "true"), this.xhr.success(function(n) {
                setTimeout(function() {
                    e.html(n);
                    f._trigger("load", r, s)
                }, 1)
            }).complete(function(n, t) {
                setTimeout(function() {
                    "abort" === t && f.panels.stop(!1, !0);
                    u.removeClass("ui-tabs-loading");
                    e.removeAttr("aria-busy");
                    n === f.xhr && delete f.xhr
                }, 1)
            })))
        },
        _ajaxSettings: function(t, i, r) {
            var u = this;
            return {
                url: t.attr("href"),
                beforeSend: function(t, f) {
                    return u._trigger("beforeLoad", i, n.extend({
                        jqXHR: t,
                        ajaxSettings: f
                    }, r))
                }
            }
        },
        _getPanelForTab: function(t) {
            var i = n(t).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + i))
        }
    })
}(jQuery),
function(n) {
    function t(t, i) {
        var r = (t.attr("aria-describedby") || "").split(/\s+/);
        r.push(i);
        t.data("ui-tooltip-id", i).attr("aria-describedby", n.trim(r.join(" ")))
    }

    function i(t) {
        var u = t.data("ui-tooltip-id"),
            i = (t.attr("aria-describedby") || "").split(/\s+/),
            r = n.inArray(u, i); - 1 !== r && i.splice(r, 1);
        t.removeData("ui-tooltip-id");
        i = n.trim(i.join(" "));
        i ? t.attr("aria-describedby", i) : t.removeAttr("aria-describedby")
    }
    var r = 0;
    n.widget("ui.tooltip", {
        version: "1.10.3",
        options: {
            content: function() {
                var t = n(this).attr("title") || "";
                return n("<a>").text(t).html()
            },
            hide: !0,
            items: "[title]:not([disabled])",
            position: {
                my: "left top+15",
                at: "left bottom",
                collision: "flipfit flip"
            },
            show: !0,
            tooltipClass: null,
            track: !1,
            close: null,
            open: null
        },
        _create: function() {
            this._on({
                mouseover: "open",
                focusin: "open"
            });
            this.tooltips = {};
            this.parents = {};
            this.options.disabled && this._disable()
        },
        _setOption: function(t, i) {
            var r = this;
            return "disabled" === t ? (this[i ? "_disable" : "_enable"](), this.options[t] = i, void 0) : (this._super(t, i), "content" === t && n.each(this.tooltips, function(n, t) {
                r._updateContent(t)
            }), void 0)
        },
        _disable: function() {
            var t = this;
            n.each(this.tooltips, function(i, r) {
                var u = n.Event("blur");
                u.target = u.currentTarget = r[0];
                t.close(u, !0)
            });
            this.element.find(this.options.items).addBack().each(function() {
                var t = n(this);
                t.is("[title]") && t.data("ui-tooltip-title", t.attr("title")).attr("title", "")
            })
        },
        _enable: function() {
            this.element.find(this.options.items).addBack().each(function() {
                var t = n(this);
                t.data("ui-tooltip-title") && t.attr("title", t.data("ui-tooltip-title"))
            })
        },
        open: function(t) {
            var r = this,
                i = n(t ? t.target : this.element).closest(this.options.items);
            i.length && !i.data("ui-tooltip-id") && (i.attr("title") && i.data("ui-tooltip-title", i.attr("title")), i.data("ui-tooltip-open", !0), t && "mouseover" === t.type && i.parents().each(function() {
                var i, t = n(this);
                t.data("ui-tooltip-open") && (i = n.Event("blur"), i.target = i.currentTarget = this, r.close(i, !0));
                t.attr("title") && (t.uniqueId(), r.parents[this.id] = {
                    element: this,
                    title: t.attr("title")
                }, t.attr("title", ""))
            }), this._updateContent(i, t))
        },
        _updateContent: function(n, t) {
            var i, r = this.options.content,
                u = this,
                f = t ? t.type : null;
            return "string" == typeof r ? this._open(t, n, r) : (i = r.call(n[0], function(i) {
                n.data("ui-tooltip-open") && u._delay(function() {
                    t && (t.type = f);
                    this._open(t, n, i)
                })
            }), i && this._open(t, n, i), void 0)
        },
        _open: function(i, r, u) {
            function o(n) {
                s.of = n;
                f.is(":hidden") || f.position(s)
            }
            var f, e, h, s = n.extend({}, this.options.position);
            if (u) {
                if (f = this._find(r), f.length) return f.find(".ui-tooltip-content").html(u), void 0;
                r.is("[title]") && (i && "mouseover" === i.type ? r.attr("title", "") : r.removeAttr("title"));
                f = this._tooltip(r);
                t(r, f.attr("id"));
                f.find(".ui-tooltip-content").html(u);
                this.options.track && i && /^mouse/.test(i.type) ? (this._on(this.document, {
                    mousemove: o
                }), o(i)) : f.position(n.extend({ of : r
                }, this.options.position));
                f.hide();
                this._show(f, this.options.show);
                this.options.show && this.options.show.delay && (h = this.delayedShow = setInterval(function() {
                    f.is(":visible") && (o(s.of), clearInterval(h))
                }, n.fx.interval));
                this._trigger("open", i, {
                    tooltip: f
                });
                e = {
                    keyup: function(t) {
                        if (t.keyCode === n.ui.keyCode.ESCAPE) {
                            var i = n.Event(t);
                            i.currentTarget = r[0];
                            this.close(i, !0)
                        }
                    },
                    remove: function() {
                        this._removeTooltip(f)
                    }
                };
                i && "mouseover" !== i.type || (e.mouseleave = "close");
                i && "focusin" !== i.type || (e.focusout = "close");
                this._on(!0, r, e)
            }
        },
        close: function(t) {
            var f = this,
                r = n(t ? t.currentTarget : this.element),
                u = this._find(r);
            this.closing || (clearInterval(this.delayedShow), r.data("ui-tooltip-title") && r.attr("title", r.data("ui-tooltip-title")), i(r), u.stop(!0), this._hide(u, this.options.hide, function() {
                f._removeTooltip(n(this))
            }), r.removeData("ui-tooltip-open"), this._off(r, "mouseleave focusout keyup"), r[0] !== this.element[0] && this._off(r, "remove"), this._off(this.document, "mousemove"), t && "mouseleave" === t.type && n.each(this.parents, function(t, i) {
                n(i.element).attr("title", i.title);
                delete f.parents[t]
            }), this.closing = !0, this._trigger("close", t, {
                tooltip: u
            }), this.closing = !1)
        },
        _tooltip: function(t) {
            var u = "ui-tooltip-" + r++,
                i = n("<div>").attr({
                    id: u,
                    role: "tooltip"
                }).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || ""));
            return n("<div>").addClass("ui-tooltip-content").appendTo(i), i.appendTo(this.document[0].body), this.tooltips[u] = t, i
        },
        _find: function(t) {
            var i = t.data("ui-tooltip-id");
            return i ? n("#" + i) : n()
        },
        _removeTooltip: function(n) {
            n.remove();
            delete this.tooltips[n.attr("id")]
        },
        _destroy: function() {
            var t = this;
            n.each(this.tooltips, function(i, r) {
                var u = n.Event("blur");
                u.target = u.currentTarget = r[0];
                t.close(u, !0);
                n("#" + i).remove();
                r.data("ui-tooltip-title") && (r.attr("title", r.data("ui-tooltip-title")), r.removeData("ui-tooltip-title"))
            })
        }
    })
}(jQuery),
function(n, t) {
    var i = "ui-effects-";
    n.effects = {
            effect: {}
        },
        function(n, t) {
            function f(n, t, i) {
                var r = h[t.type] || {};
                return null == n ? i || !t.def ? null : t.def : (n = r.floor ? ~~n : parseFloat(n), isNaN(n) ? t.def : r.mod ? (n + r.mod) % r.mod : 0 > n ? 0 : n > r.max ? r.max : n)
            }

            function s(f) {
                var o = i(),
                    s = o._rgba = [];
                return f = f.toLowerCase(), r(v, function(n, i) {
                    var r, h = i.re.exec(f),
                        c = h && i.parse(h),
                        e = i.space || "rgba";
                    return c ? (r = o[e](c), o[u[e].cache] = r[u[e].cache], s = o._rgba = r._rgba, !1) : t
                }), s.length ? ("0,0,0,0" === s.join() && n.extend(s, e.transparent), o) : e[f]
            }

            function o(n, t, i) {
                return i = (i + 1) % 1, 1 > 6 * i ? n + 6 * (t - n) * i : 1 > 2 * i ? t : 2 > 3 * i ? n + 6 * (t - n) * (2 / 3 - i) : n
            }
            var e, a = /^([\-+])=\s*(\d+\.?\d*)/,
                v = [{
                    re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    parse: function(n) {
                        return [n[1], n[2], n[3], n[4]]
                    }
                }, {
                    re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    parse: function(n) {
                        return [2.55 * n[1], 2.55 * n[2], 2.55 * n[3], n[4]]
                    }
                }, {
                    re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                    parse: function(n) {
                        return [parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16)]
                    }
                }, {
                    re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                    parse: function(n) {
                        return [parseInt(n[1] + n[1], 16), parseInt(n[2] + n[2], 16), parseInt(n[3] + n[3], 16)]
                    }
                }, {
                    re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    space: "hsla",
                    parse: function(n) {
                        return [n[1], n[2] / 100, n[3] / 100, n[4]]
                    }
                }],
                i = n.Color = function(t, i, r, u) {
                    return new n.Color.fn.parse(t, i, r, u)
                },
                u = {
                    rgba: {
                        props: {
                            red: {
                                idx: 0,
                                type: "byte"
                            },
                            green: {
                                idx: 1,
                                type: "byte"
                            },
                            blue: {
                                idx: 2,
                                type: "byte"
                            }
                        }
                    },
                    hsla: {
                        props: {
                            hue: {
                                idx: 0,
                                type: "degrees"
                            },
                            saturation: {
                                idx: 1,
                                type: "percent"
                            },
                            lightness: {
                                idx: 2,
                                type: "percent"
                            }
                        }
                    }
                },
                h = {
                    byte: {
                        floor: !0,
                        max: 255
                    },
                    percent: {
                        max: 1
                    },
                    degrees: {
                        mod: 360,
                        floor: !0
                    }
                },
                c = i.support = {},
                l = n("<p>")[0],
                r = n.each;
            l.style.cssText = "background-color:rgba(1,1,1,.5)";
            c.rgba = l.style.backgroundColor.indexOf("rgba") > -1;
            r(u, function(n, t) {
                t.cache = "_" + n;
                t.props.alpha = {
                    idx: 3,
                    type: "percent",
                    def: 1
                }
            });
            i.fn = n.extend(i.prototype, {
                parse: function(o, h, c, l) {
                    if (o === t) return this._rgba = [null, null, null, null], this;
                    (o.jquery || o.nodeType) && (o = n(o).css(h), h = t);
                    var a = this,
                        v = n.type(o),
                        y = this._rgba = [];
                    return h !== t && (o = [o, h, c, l], v = "array"), "string" === v ? this.parse(s(o) || e._default) : "array" === v ? (r(u.rgba.props, function(n, t) {
                        y[t.idx] = f(o[t.idx], t)
                    }), this) : "object" === v ? (o instanceof i ? r(u, function(n, t) {
                        o[t.cache] && (a[t.cache] = o[t.cache].slice())
                    }) : r(u, function(t, i) {
                        var u = i.cache;
                        r(i.props, function(n, t) {
                            if (!a[u] && i.to) {
                                if ("alpha" === n || null == o[n]) return;
                                a[u] = i.to(a._rgba)
                            }
                            a[u][t.idx] = f(o[n], t, !0)
                        });
                        a[u] && 0 > n.inArray(null, a[u].slice(0, 3)) && (a[u][3] = 1, i.from && (a._rgba = i.from(a[u])))
                    }), this) : t
                },
                is: function(n) {
                    var o = i(n),
                        f = !0,
                        e = this;
                    return r(u, function(n, i) {
                        var s, u = o[i.cache];
                        return u && (s = e[i.cache] || i.to && i.to(e._rgba) || [], r(i.props, function(n, i) {
                            return null != u[i.idx] ? f = u[i.idx] === s[i.idx] : t
                        })), f
                    }), f
                },
                _space: function() {
                    var n = [],
                        t = this;
                    return r(u, function(i, r) {
                        t[r.cache] && n.push(i)
                    }), n.pop()
                },
                transition: function(n, t) {
                    var e = i(n),
                        c = e._space(),
                        o = u[c],
                        l = 0 === this.alpha() ? i("transparent") : this,
                        a = l[o.cache] || o.to(l._rgba),
                        s = a.slice();
                    return e = e[o.cache], r(o.props, function(n, i) {
                        var c = i.idx,
                            r = a[c],
                            u = e[c],
                            o = h[i.type] || {};
                        null !== u && (null === r ? s[c] = u : (o.mod && (u - r > o.mod / 2 ? r += o.mod : r - u > o.mod / 2 && (r -= o.mod)), s[c] = f((u - r) * t + r, i)))
                    }), this[c](s)
                },
                blend: function(t) {
                    if (1 === this._rgba[3]) return this;
                    var r = this._rgba.slice(),
                        u = r.pop(),
                        f = i(t)._rgba;
                    return i(n.map(r, function(n, t) {
                        return (1 - u) * f[t] + u * n
                    }))
                },
                toRgbaString: function() {
                    var i = "rgba(",
                        t = n.map(this._rgba, function(n, t) {
                            return null == n ? t > 2 ? 1 : 0 : n
                        });
                    return 1 === t[3] && (t.pop(), i = "rgb("), i + t.join() + ")"
                },
                toHslaString: function() {
                    var i = "hsla(",
                        t = n.map(this.hsla(), function(n, t) {
                            return null == n && (n = t > 2 ? 1 : 0), t && 3 > t && (n = Math.round(100 * n) + "%"), n
                        });
                    return 1 === t[3] && (t.pop(), i = "hsl("), i + t.join() + ")"
                },
                toHexString: function(t) {
                    var i = this._rgba.slice(),
                        r = i.pop();
                    return t && i.push(~~(255 * r)), "#" + n.map(i, function(n) {
                        return n = (n || 0).toString(16), 1 === n.length ? "0" + n : n
                    }).join("")
                },
                toString: function() {
                    return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
                }
            });
            i.fn.parse.prototype = i.fn;
            u.hsla.to = function(n) {
                if (null == n[0] || null == n[1] || null == n[2]) return [null, null, null, n[3]];
                var s, h, i = n[0] / 255,
                    r = n[1] / 255,
                    f = n[2] / 255,
                    c = n[3],
                    u = Math.max(i, r, f),
                    e = Math.min(i, r, f),
                    t = u - e,
                    o = u + e,
                    l = .5 * o;
                return s = e === u ? 0 : i === u ? 60 * (r - f) / t + 360 : r === u ? 60 * (f - i) / t + 120 : 60 * (i - r) / t + 240, h = 0 === t ? 0 : .5 >= l ? t / o : t / (2 - o), [Math.round(s) % 360, h, l, null == c ? 1 : c]
            };
            u.hsla.from = function(n) {
                if (null == n[0] || null == n[1] || null == n[2]) return [null, null, null, n[3]];
                var r = n[0] / 360,
                    u = n[1],
                    t = n[2],
                    e = n[3],
                    i = .5 >= t ? t * (1 + u) : t + u - t * u,
                    f = 2 * t - i;
                return [Math.round(255 * o(f, i, r + 1 / 3)), Math.round(255 * o(f, i, r)), Math.round(255 * o(f, i, r - 1 / 3)), e]
            };
            r(u, function(u, e) {
                var s = e.props,
                    o = e.cache,
                    h = e.to,
                    c = e.from;
                i.fn[u] = function(u) {
                    if (h && !this[o] && (this[o] = h(this._rgba)), u === t) return this[o].slice();
                    var l, a = n.type(u),
                        v = "array" === a || "object" === a ? u : arguments,
                        e = this[o].slice();
                    return r(s, function(n, t) {
                        var i = v["object" === a ? n : t.idx];
                        null == i && (i = e[t.idx]);
                        e[t.idx] = f(i, t)
                    }), c ? (l = i(c(e)), l[o] = e, l) : i(e)
                };
                r(s, function(t, r) {
                    i.fn[t] || (i.fn[t] = function(i) {
                        var f, e = n.type(i),
                            h = "alpha" === t ? this._hsla ? "hsla" : "rgba" : u,
                            o = this[h](),
                            s = o[r.idx];
                        return "undefined" === e ? s : ("function" === e && (i = i.call(this, s), e = n.type(i)), null == i && r.empty ? this : ("string" === e && (f = a.exec(i), f && (i = s + parseFloat(f[2]) * ("+" === f[1] ? 1 : -1))), o[r.idx] = i, this[h](o)))
                    })
                })
            });
            i.hook = function(t) {
                var u = t.split(" ");
                r(u, function(t, r) {
                    n.cssHooks[r] = {
                        set: function(t, u) {
                            var o, f, e = "";
                            if ("transparent" !== u && ("string" !== n.type(u) || (o = s(u)))) {
                                if (u = i(o || u), !c.rgba && 1 !== u._rgba[3]) {
                                    for (f = "backgroundColor" === r ? t.parentNode : t;
                                        ("" === e || "transparent" === e) && f && f.style;) try {
                                        e = n.css(f, "backgroundColor");
                                        f = f.parentNode
                                    } catch (h) {}
                                    u = u.blend(e && "transparent" !== e ? e : "_default")
                                }
                                u = u.toRgbaString()
                            }
                            try {
                                t.style[r] = u
                            } catch (h) {}
                        }
                    };
                    n.fx.step[r] = function(t) {
                        t.colorInit || (t.start = i(t.elem, r), t.end = i(t.end), t.colorInit = !0);
                        n.cssHooks[r].set(t.elem, t.start.transition(t.end, t.pos))
                    }
                })
            };
            i.hook("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor");
            n.cssHooks.borderColor = {
                expand: function(n) {
                    var t = {};
                    return r(["Top", "Right", "Bottom", "Left"], function(i, r) {
                        t["border" + r + "Color"] = n
                    }), t
                }
            };
            e = n.Color.names = {
                aqua: "#00ffff",
                black: "#000000",
                blue: "#0000ff",
                fuchsia: "#ff00ff",
                gray: "#808080",
                green: "#008000",
                lime: "#00ff00",
                maroon: "#800000",
                navy: "#000080",
                olive: "#808000",
                purple: "#800080",
                red: "#ff0000",
                silver: "#c0c0c0",
                teal: "#008080",
                white: "#ffffff",
                yellow: "#ffff00",
                transparent: [null, null, null, 0],
                _default: "#ffffff"
            }
        }(jQuery),
        function() {
            function i(t) {
                var r, u, i = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle,
                    f = {};
                if (i && i.length && i[0] && i[i[0]])
                    for (u = i.length; u--;) r = i[u], "string" == typeof i[r] && (f[n.camelCase(r)] = i[r]);
                else
                    for (r in i) "string" == typeof i[r] && (f[r] = i[r]);
                return f
            }

            function r(t, i) {
                var r, u, e = {};
                for (r in i) u = i[r], t[r] !== u && (f[r] || (n.fx.step[r] || !isNaN(parseFloat(u))) && (e[r] = u));
                return e
            }
            var u = ["add", "remove", "toggle"],
                f = {
                    border: 1,
                    borderBottom: 1,
                    borderColor: 1,
                    borderLeft: 1,
                    borderRight: 1,
                    borderTop: 1,
                    borderWidth: 1,
                    margin: 1,
                    padding: 1
                };
            n.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(t, i) {
                n.fx.step[i] = function(n) {
                    ("none" === n.end || n.setAttr) && (1 !== n.pos || n.setAttr) || (jQuery.style(n.elem, i, n.end), n.setAttr = !0)
                }
            });
            n.fn.addBack || (n.fn.addBack = function(n) {
                return this.add(null == n ? this.prevObject : this.prevObject.filter(n))
            });
            n.effects.animateClass = function(t, f, e, o) {
                var s = n.speed(f, e, o);
                return this.queue(function() {
                    var o, e = n(this),
                        h = e.attr("class") || "",
                        f = s.children ? e.find("*").addBack() : e;
                    f = f.map(function() {
                        var t = n(this);
                        return {
                            el: t,
                            start: i(this)
                        }
                    });
                    o = function() {
                        n.each(u, function(n, i) {
                            t[i] && e[i + "Class"](t[i])
                        })
                    };
                    o();
                    f = f.map(function() {
                        return this.end = i(this.el[0]), this.diff = r(this.start, this.end), this
                    });
                    e.attr("class", h);
                    f = f.map(function() {
                        var i = this,
                            t = n.Deferred(),
                            r = n.extend({}, s, {
                                queue: !1,
                                complete: function() {
                                    t.resolve(i)
                                }
                            });
                        return this.el.animate(this.diff, r), t.promise()
                    });
                    n.when.apply(n, f.get()).done(function() {
                        o();
                        n.each(arguments, function() {
                            var t = this.el;
                            n.each(this.diff, function(n) {
                                t.css(n, "")
                            })
                        });
                        s.complete.call(e[0])
                    })
                })
            };
            n.fn.extend({
                addClass: function(t) {
                    return function(i, r, u, f) {
                        return r ? n.effects.animateClass.call(this, {
                            add: i
                        }, r, u, f) : t.apply(this, arguments)
                    }
                }(n.fn.addClass),
                removeClass: function(t) {
                    return function(i, r, u, f) {
                        return arguments.length > 1 ? n.effects.animateClass.call(this, {
                            remove: i
                        }, r, u, f) : t.apply(this, arguments)
                    }
                }(n.fn.removeClass),
                toggleClass: function(i) {
                    return function(r, u, f, e, o) {
                        return "boolean" == typeof u || u === t ? f ? n.effects.animateClass.call(this, u ? {
                            add: r
                        } : {
                            remove: r
                        }, f, e, o) : i.apply(this, arguments) : n.effects.animateClass.call(this, {
                            toggle: r
                        }, u, f, e)
                    }
                }(n.fn.toggleClass),
                switchClass: function(t, i, r, u, f) {
                    return n.effects.animateClass.call(this, {
                        add: i,
                        remove: t
                    }, r, u, f)
                }
            })
        }(),
        function() {
            function r(t, i, r, u) {
                return n.isPlainObject(t) && (i = t, t = t.effect), t = {
                    effect: t
                }, null == i && (i = {}), n.isFunction(i) && (u = i, r = null, i = {}), ("number" == typeof i || n.fx.speeds[i]) && (u = r, r = i, i = {}), n.isFunction(r) && (u = r, r = null), i && n.extend(t, i), r = r || i.duration, t.duration = n.fx.off ? 0 : "number" == typeof r ? r : r in n.fx.speeds ? n.fx.speeds[r] : n.fx.speeds._default, t.complete = u || i.complete, t
            }

            function u(t) {
                return !t || "number" == typeof t || n.fx.speeds[t] ? !0 : "string" != typeof t || n.effects.effect[t] ? n.isFunction(t) ? !0 : "object" != typeof t || t.effect ? !1 : !0 : !0
            }
            n.extend(n.effects, {
                version: "1.10.3",
                save: function(n, t) {
                    for (var r = 0; t.length > r; r++) null !== t[r] && n.data(i + t[r], n[0].style[t[r]])
                },
                restore: function(n, r) {
                    for (var f, u = 0; r.length > u; u++) null !== r[u] && (f = n.data(i + r[u]), f === t && (f = ""), n.css(r[u], f))
                },
                setMode: function(n, t) {
                    return "toggle" === t && (t = n.is(":hidden") ? "show" : "hide"), t
                },
                getBaseline: function(n, t) {
                    var i, r;
                    switch (n[0]) {
                        case "top":
                            i = 0;
                            break;
                        case "middle":
                            i = .5;
                            break;
                        case "bottom":
                            i = 1;
                            break;
                        default:
                            i = n[0] / t.height
                    }
                    switch (n[1]) {
                        case "left":
                            r = 0;
                            break;
                        case "center":
                            r = .5;
                            break;
                        case "right":
                            r = 1;
                            break;
                        default:
                            r = n[1] / t.width
                    }
                    return {
                        x: r,
                        y: i
                    }
                },
                createWrapper: function(t) {
                    if (t.parent().is(".ui-effects-wrapper")) return t.parent();
                    var i = {
                            width: t.outerWidth(!0),
                            height: t.outerHeight(!0),
                            float: t.css("float")
                        },
                        u = n("<div><\/div>").addClass("ui-effects-wrapper").css({
                            fontSize: "100%",
                            background: "transparent",
                            border: "none",
                            margin: 0,
                            padding: 0
                        }),
                        f = {
                            width: t.width(),
                            height: t.height()
                        },
                        r = document.activeElement;
                    try {
                        r.id
                    } catch (e) {
                        r = document.body
                    }
                    return t.wrap(u), (t[0] === r || n.contains(t[0], r)) && n(r).focus(), u = t.parent(), "static" === t.css("position") ? (u.css({
                        position: "relative"
                    }), t.css({
                        position: "relative"
                    })) : (n.extend(i, {
                        position: t.css("position"),
                        zIndex: t.css("z-index")
                    }), n.each(["top", "left", "bottom", "right"], function(n, r) {
                        i[r] = t.css(r);
                        isNaN(parseInt(i[r], 10)) && (i[r] = "auto")
                    }), t.css({
                        position: "relative",
                        top: 0,
                        left: 0,
                        right: "auto",
                        bottom: "auto"
                    })), t.css(f), u.css(i).show()
                },
                removeWrapper: function(t) {
                    var i = document.activeElement;
                    return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t), (t[0] === i || n.contains(t[0], i)) && n(i).focus()), t
                },
                setTransition: function(t, i, r, u) {
                    return u = u || {}, n.each(i, function(n, i) {
                        var f = t.cssUnit(i);
                        f[0] > 0 && (u[i] = f[0] * r + f[1])
                    }), u
                }
            });
            n.fn.extend({
                effect: function() {
                    function i(i) {
                        function f() {
                            n.isFunction(o) && o.call(r[0]);
                            n.isFunction(i) && i()
                        }
                        var r = n(this),
                            o = t.complete,
                            u = t.mode;
                        (r.is(":hidden") ? "hide" === u : "show" === u) ? (r[u](), f()) : e.call(r[0], t, f)
                    }
                    var t = r.apply(this, arguments),
                        u = t.mode,
                        f = t.queue,
                        e = n.effects.effect[t.effect];
                    return n.fx.off || !e ? u ? this[u](t.duration, t.complete) : this.each(function() {
                        t.complete && t.complete.call(this)
                    }) : f === !1 ? this.each(i) : this.queue(f || "fx", i)
                },
                show: function(n) {
                    return function(t) {
                        if (u(t)) return n.apply(this, arguments);
                        var i = r.apply(this, arguments);
                        return i.mode = "show", this.effect.call(this, i)
                    }
                }(n.fn.show),
                hide: function(n) {
                    return function(t) {
                        if (u(t)) return n.apply(this, arguments);
                        var i = r.apply(this, arguments);
                        return i.mode = "hide", this.effect.call(this, i)
                    }
                }(n.fn.hide),
                toggle: function(n) {
                    return function(t) {
                        if (u(t) || "boolean" == typeof t) return n.apply(this, arguments);
                        var i = r.apply(this, arguments);
                        return i.mode = "toggle", this.effect.call(this, i)
                    }
                }(n.fn.toggle),
                cssUnit: function(t) {
                    var i = this.css(t),
                        r = [];
                    return n.each(["em", "px", "%", "pt"], function(n, t) {
                        i.indexOf(t) > 0 && (r = [parseFloat(i), t])
                    }), r
                }
            })
        }(),
        function() {
            var t = {};
            n.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(n, i) {
                t[i] = function(t) {
                    return Math.pow(t, n + 2)
                }
            });
            n.extend(t, {
                Sine: function(n) {
                    return 1 - Math.cos(n * Math.PI / 2)
                },
                Circ: function(n) {
                    return 1 - Math.sqrt(1 - n * n)
                },
                Elastic: function(n) {
                    return 0 === n || 1 === n ? n : -Math.pow(2, 8 * (n - 1)) * Math.sin((80 * (n - 1) - 7.5) * Math.PI / 15)
                },
                Back: function(n) {
                    return n * n * (3 * n - 2)
                },
                Bounce: function(n) {
                    for (var t, i = 4;
                        ((t = Math.pow(2, --i)) - 1) / 11 > n;);
                    return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * t - 2) / 22 - n, 2)
                }
            });
            n.each(t, function(t, i) {
                n.easing["easeIn" + t] = i;
                n.easing["easeOut" + t] = function(n) {
                    return 1 - i(1 - n)
                };
                n.easing["easeInOut" + t] = function(n) {
                    return .5 > n ? i(2 * n) / 2 : 1 - i(-2 * n + 2) / 2
                }
            })
        }()
}(jQuery),
function(n) {
    var t = /up|down|vertical/,
        i = /up|left|vertical|horizontal/;
    n.effects.effect.blind = function(r, u) {
        var e, o, s, f = n(this),
            c = ["position", "top", "bottom", "left", "right", "height", "width"],
            p = n.effects.setMode(f, r.mode || "hide"),
            w = r.direction || "up",
            h = t.test(w),
            l = h ? "height" : "width",
            a = h ? "top" : "left",
            b = i.test(w),
            v = {},
            y = "show" === p;
        f.parent().is(".ui-effects-wrapper") ? n.effects.save(f.parent(), c) : n.effects.save(f, c);
        f.show();
        e = n.effects.createWrapper(f).css({
            overflow: "hidden"
        });
        o = e[l]();
        s = parseFloat(e.css(a)) || 0;
        v[l] = y ? o : 0;
        b || (f.css(h ? "bottom" : "right", 0).css(h ? "top" : "left", "auto").css({
            position: "absolute"
        }), v[a] = y ? s : o + s);
        y && (e.css(l, 0), b || e.css(a, s + o));
        e.animate(v, {
            duration: r.duration,
            easing: r.easing,
            queue: !1,
            complete: function() {
                "hide" === p && f.hide();
                n.effects.restore(f, c);
                n.effects.removeWrapper(f);
                u()
            }
        })
    }
}(jQuery),
function(n) {
    n.effects.effect.bounce = function(t, i) {
        var v, f, e, r = n(this),
            y = ["position", "top", "bottom", "left", "right", "height", "width"],
            k = n.effects.setMode(r, t.mode || "effect"),
            o = "hide" === k,
            p = "show" === k,
            h = t.direction || "up",
            u = t.distance,
            w = t.times || 5,
            d = 2 * w + (p || o ? 1 : 0),
            c = t.duration / d,
            l = t.easing,
            s = "up" === h || "down" === h ? "top" : "left",
            b = "up" === h || "left" === h,
            a = r.queue(),
            g = a.length;
        for ((p || o) && y.push("opacity"), n.effects.save(r, y), r.show(), n.effects.createWrapper(r), u || (u = r["top" === s ? "outerHeight" : "outerWidth"]() / 3), p && (e = {
                opacity: 1
            }, e[s] = 0, r.css("opacity", 0).css(s, b ? 2 * -u : 2 * u).animate(e, c, l)), o && (u /= Math.pow(2, w - 1)), e = {}, e[s] = 0, v = 0; w > v; v++) f = {}, f[s] = (b ? "-=" : "+=") + u, r.animate(f, c, l).animate(e, c, l), u = o ? 2 * u : u / 2;
        o && (f = {
            opacity: 0
        }, f[s] = (b ? "-=" : "+=") + u, r.animate(f, c, l));
        r.queue(function() {
            o && r.hide();
            n.effects.restore(r, y);
            n.effects.removeWrapper(r);
            i()
        });
        g > 1 && a.splice.apply(a, [1, 0].concat(a.splice(g, d + 1)));
        r.dequeue()
    }
}(jQuery),
function(n) {
    n.effects.effect.clip = function(t, i) {
        var h, u, f, r = n(this),
            c = ["position", "top", "bottom", "left", "right", "height", "width"],
            v = n.effects.setMode(r, t.mode || "hide"),
            e = "show" === v,
            y = t.direction || "vertical",
            l = "vertical" === y,
            o = l ? "height" : "width",
            a = l ? "top" : "left",
            s = {};
        n.effects.save(r, c);
        r.show();
        h = n.effects.createWrapper(r).css({
            overflow: "hidden"
        });
        u = "IMG" === r[0].tagName ? h : r;
        f = u[o]();
        e && (u.css(o, 0), u.css(a, f / 2));
        s[o] = e ? f : 0;
        s[a] = e ? 0 : f / 2;
        u.animate(s, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: function() {
                e || r.hide();
                n.effects.restore(r, c);
                n.effects.removeWrapper(r);
                i()
            }
        })
    }
}(jQuery),
function(n) {
    n.effects.effect.drop = function(t, i) {
        var u, r = n(this),
            h = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
            c = n.effects.setMode(r, t.mode || "hide"),
            e = "show" === c,
            f = t.direction || "left",
            o = "up" === f || "down" === f ? "top" : "left",
            s = "up" === f || "left" === f ? "pos" : "neg",
            l = {
                opacity: e ? 1 : 0
            };
        n.effects.save(r, h);
        r.show();
        n.effects.createWrapper(r);
        u = t.distance || r["top" === o ? "outerHeight" : "outerWidth"](!0) / 2;
        e && r.css("opacity", 0).css(o, "pos" === s ? -u : u);
        l[o] = (e ? "pos" === s ? "+=" : "-=" : "pos" === s ? "-=" : "+=") + u;
        r.animate(l, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: function() {
                "hide" === c && r.hide();
                n.effects.restore(r, h);
                n.effects.removeWrapper(r);
                i()
            }
        })
    }
}(jQuery),
function(n) {
    n.effects.effect.explode = function(t, i) {
        function b() {
            p.push(this);
            p.length === o * c && k()
        }

        function k() {
            r.css({
                visibility: "visible"
            });
            n(p).remove();
            u || r.hide();
            i()
        }
        for (var e, l, a, v, y, o = t.pieces ? Math.round(Math.sqrt(t.pieces)) : 3, c = o, r = n(this), d = n.effects.setMode(r, t.mode || "hide"), u = "show" === d, w = r.show().css("visibility", "hidden").offset(), s = Math.ceil(r.outerWidth() / c), h = Math.ceil(r.outerHeight() / o), p = [], f = 0; o > f; f++)
            for (a = w.top + f * h, y = f - (o - 1) / 2, e = 0; c > e; e++) l = w.left + e * s, v = e - (c - 1) / 2, r.clone().appendTo("body").wrap("<div><\/div>").css({
                position: "absolute",
                visibility: "visible",
                left: -e * s,
                top: -f * h
            }).parent().addClass("ui-effects-explode").css({
                position: "absolute",
                overflow: "hidden",
                width: s,
                height: h,
                left: l + (u ? v * s : 0),
                top: a + (u ? y * h : 0),
                opacity: u ? 0 : 1
            }).animate({
                left: l + (u ? 0 : v * s),
                top: a + (u ? 0 : y * h),
                opacity: u ? 1 : 0
            }, t.duration || 500, t.easing, b)
    }
}(jQuery),
function(n) {
    n.effects.effect.fade = function(t, i) {
        var r = n(this),
            u = n.effects.setMode(r, t.mode || "toggle");
        r.animate({
            opacity: u
        }, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: i
        })
    }
}(jQuery),
function(n) {
    n.effects.effect.fold = function(t, i) {
        var r, e, u = n(this),
            s = ["position", "top", "bottom", "left", "right", "height", "width"],
            h = n.effects.setMode(u, t.mode || "hide"),
            o = "show" === h,
            c = "hide" === h,
            f = t.size || 15,
            l = /([0-9]+)%/.exec(f),
            a = !!t.horizFirst,
            v = o !== a,
            y = v ? ["width", "height"] : ["height", "width"],
            p = t.duration / 2,
            w = {},
            b = {};
        n.effects.save(u, s);
        u.show();
        r = n.effects.createWrapper(u).css({
            overflow: "hidden"
        });
        e = v ? [r.width(), r.height()] : [r.height(), r.width()];
        l && (f = parseInt(l[1], 10) / 100 * e[c ? 0 : 1]);
        o && r.css(a ? {
            height: 0,
            width: f
        } : {
            height: f,
            width: 0
        });
        w[y[0]] = o ? e[0] : f;
        b[y[1]] = o ? e[1] : 0;
        r.animate(w, p, t.easing).animate(b, p, t.easing, function() {
            c && u.hide();
            n.effects.restore(u, s);
            n.effects.removeWrapper(u);
            i()
        })
    }
}(jQuery),
function(n) {
    n.effects.effect.highlight = function(t, i) {
        var r = n(this),
            u = ["backgroundImage", "backgroundColor", "opacity"],
            f = n.effects.setMode(r, t.mode || "show"),
            e = {
                backgroundColor: r.css("backgroundColor")
            };
        "hide" === f && (e.opacity = 0);
        n.effects.save(r, u);
        r.show().css({
            backgroundImage: "none",
            backgroundColor: t.color || "#ffff99"
        }).animate(e, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: function() {
                "hide" === f && r.hide();
                n.effects.restore(r, u);
                i()
            }
        })
    }
}(jQuery),
function(n) {
    n.effects.effect.pulsate = function(t, i) {
        var e, r = n(this),
            o = n.effects.setMode(r, t.mode || "show"),
            h = "show" === o,
            a = "hide" === o,
            v = h || "hide" === o,
            s = 2 * (t.times || 5) + (v ? 1 : 0),
            c = t.duration / s,
            u = 0,
            f = r.queue(),
            l = f.length;
        for ((h || !r.is(":visible")) && (r.css("opacity", 0).show(), u = 1), e = 1; s > e; e++) r.animate({
            opacity: u
        }, c, t.easing), u = 1 - u;
        r.animate({
            opacity: u
        }, c, t.easing);
        r.queue(function() {
            a && r.hide();
            i()
        });
        l > 1 && f.splice.apply(f, [1, 0].concat(f.splice(l, s + 1)));
        r.dequeue()
    }
}(jQuery),
function(n) {
    n.effects.effect.puff = function(t, i) {
        var r = n(this),
            e = n.effects.setMode(r, t.mode || "hide"),
            o = "hide" === e,
            s = parseInt(t.percent, 10) || 150,
            f = s / 100,
            u = {
                height: r.height(),
                width: r.width(),
                outerHeight: r.outerHeight(),
                outerWidth: r.outerWidth()
            };
        n.extend(t, {
            effect: "scale",
            queue: !1,
            fade: !0,
            mode: e,
            complete: i,
            percent: o ? s : 100,
            from: o ? u : {
                height: u.height * f,
                width: u.width * f,
                outerHeight: u.outerHeight * f,
                outerWidth: u.outerWidth * f
            }
        });
        r.effect(t)
    };
    n.effects.effect.scale = function(t, i) {
        var u = n(this),
            r = n.extend(!0, {}, t),
            f = n.effects.setMode(u, t.mode || "effect"),
            s = parseInt(t.percent, 10) || (0 === parseInt(t.percent, 10) ? 0 : "hide" === f ? 0 : 100),
            h = t.direction || "both",
            c = t.origin,
            e = {
                height: u.height(),
                width: u.width(),
                outerHeight: u.outerHeight(),
                outerWidth: u.outerWidth()
            },
            o = {
                y: "horizontal" !== h ? s / 100 : 1,
                x: "vertical" !== h ? s / 100 : 1
            };
        r.effect = "size";
        r.queue = !1;
        r.complete = i;
        "effect" !== f && (r.origin = c || ["middle", "center"], r.restore = !0);
        r.from = t.from || ("show" === f ? {
            height: 0,
            width: 0,
            outerHeight: 0,
            outerWidth: 0
        } : e);
        r.to = {
            height: e.height * o.y,
            width: e.width * o.x,
            outerHeight: e.outerHeight * o.y,
            outerWidth: e.outerWidth * o.x
        };
        r.fade && ("show" === f && (r.from.opacity = 0, r.to.opacity = 1), "hide" === f && (r.from.opacity = 1, r.to.opacity = 0));
        u.effect(r)
    };
    n.effects.effect.size = function(t, i) {
        var f, l, u, r = n(this),
            w = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
            a = ["width", "height", "overflow"],
            v = ["fontSize"],
            e = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
            o = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
            h = n.effects.setMode(r, t.mode || "effect"),
            y = t.restore || "effect" !== h,
            c = t.scale || "both",
            b = t.origin || ["middle", "center"],
            k = r.css("position"),
            s = y ? w : ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
            p = {
                height: 0,
                width: 0,
                outerHeight: 0,
                outerWidth: 0
            };
        "show" === h && r.show();
        f = {
            height: r.height(),
            width: r.width(),
            outerHeight: r.outerHeight(),
            outerWidth: r.outerWidth()
        };
        "toggle" === t.mode && "show" === h ? (r.from = t.to || p, r.to = t.from || f) : (r.from = t.from || ("show" === h ? p : f), r.to = t.to || ("hide" === h ? p : f));
        u = {
            from: {
                y: r.from.height / f.height,
                x: r.from.width / f.width
            },
            to: {
                y: r.to.height / f.height,
                x: r.to.width / f.width
            }
        };
        ("box" === c || "both" === c) && (u.from.y !== u.to.y && (s = s.concat(e), r.from = n.effects.setTransition(r, e, u.from.y, r.from), r.to = n.effects.setTransition(r, e, u.to.y, r.to)), u.from.x !== u.to.x && (s = s.concat(o), r.from = n.effects.setTransition(r, o, u.from.x, r.from), r.to = n.effects.setTransition(r, o, u.to.x, r.to)));
        ("content" === c || "both" === c) && u.from.y !== u.to.y && (s = s.concat(v).concat(a), r.from = n.effects.setTransition(r, v, u.from.y, r.from), r.to = n.effects.setTransition(r, v, u.to.y, r.to));
        n.effects.save(r, s);
        r.show();
        n.effects.createWrapper(r);
        r.css("overflow", "hidden").css(r.from);
        b && (l = n.effects.getBaseline(b, f), r.from.top = (f.outerHeight - r.outerHeight()) * l.y, r.from.left = (f.outerWidth - r.outerWidth()) * l.x, r.to.top = (f.outerHeight - r.to.outerHeight) * l.y, r.to.left = (f.outerWidth - r.to.outerWidth) * l.x);
        r.css(r.from);
        ("content" === c || "both" === c) && (e = e.concat(["marginTop", "marginBottom"]).concat(v), o = o.concat(["marginLeft", "marginRight"]), a = w.concat(e).concat(o), r.find("*[width]").each(function() {
            var i = n(this),
                r = {
                    height: i.height(),
                    width: i.width(),
                    outerHeight: i.outerHeight(),
                    outerWidth: i.outerWidth()
                };
            y && n.effects.save(i, a);
            i.from = {
                height: r.height * u.from.y,
                width: r.width * u.from.x,
                outerHeight: r.outerHeight * u.from.y,
                outerWidth: r.outerWidth * u.from.x
            };
            i.to = {
                height: r.height * u.to.y,
                width: r.width * u.to.x,
                outerHeight: r.height * u.to.y,
                outerWidth: r.width * u.to.x
            };
            u.from.y !== u.to.y && (i.from = n.effects.setTransition(i, e, u.from.y, i.from), i.to = n.effects.setTransition(i, e, u.to.y, i.to));
            u.from.x !== u.to.x && (i.from = n.effects.setTransition(i, o, u.from.x, i.from), i.to = n.effects.setTransition(i, o, u.to.x, i.to));
            i.css(i.from);
            i.animate(i.to, t.duration, t.easing, function() {
                y && n.effects.restore(i, a)
            })
        }));
        r.animate(r.to, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: function() {
                0 === r.to.opacity && r.css("opacity", r.from.opacity);
                "hide" === h && r.hide();
                n.effects.restore(r, s);
                y || ("static" === k ? r.css({
                    position: "relative",
                    top: r.to.top,
                    left: r.to.left
                }) : n.each(["top", "left"], function(n, t) {
                    r.css(t, function(t, i) {
                        var f = parseInt(i, 10),
                            u = n ? r.to.left : r.to.top;
                        return "auto" === i ? u + "px" : f + u + "px"
                    })
                }));
                n.effects.removeWrapper(r);
                i()
            }
        })
    }
}(jQuery),
function(n) {
    n.effects.effect.shake = function(t, i) {
        var o, r = n(this),
            v = ["position", "top", "bottom", "left", "right", "height", "width"],
            k = n.effects.setMode(r, t.mode || "effect"),
            f = t.direction || "left",
            s = t.distance || 20,
            y = t.times || 3,
            p = 2 * y + 1,
            u = Math.round(t.duration / p),
            h = "up" === f || "down" === f ? "top" : "left",
            c = "up" === f || "left" === f,
            l = {},
            a = {},
            w = {},
            e = r.queue(),
            b = e.length;
        for (n.effects.save(r, v), r.show(), n.effects.createWrapper(r), l[h] = (c ? "-=" : "+=") + s, a[h] = (c ? "+=" : "-=") + 2 * s, w[h] = (c ? "-=" : "+=") + 2 * s, r.animate(l, u, t.easing), o = 1; y > o; o++) r.animate(a, u, t.easing).animate(w, u, t.easing);
        r.animate(a, u, t.easing).animate(l, u / 2, t.easing).queue(function() {
            "hide" === k && r.hide();
            n.effects.restore(r, v);
            n.effects.removeWrapper(r);
            i()
        });
        b > 1 && e.splice.apply(e, [1, 0].concat(e.splice(b, p + 1)));
        r.dequeue()
    }
}(jQuery),
function(n) {
    n.effects.effect.slide = function(t, i) {
        var u, r = n(this),
            s = ["position", "top", "bottom", "left", "right", "width", "height"],
            h = n.effects.setMode(r, t.mode || "show"),
            c = "show" === h,
            f = t.direction || "left",
            e = "up" === f || "down" === f ? "top" : "left",
            o = "up" === f || "left" === f,
            l = {};
        n.effects.save(r, s);
        r.show();
        u = t.distance || r["top" === e ? "outerHeight" : "outerWidth"](!0);
        n.effects.createWrapper(r).css({
            overflow: "hidden"
        });
        c && r.css(e, o ? isNaN(u) ? "-" + u : -u : u);
        l[e] = (c ? o ? "+=" : "-=" : o ? "-=" : "+=") + u;
        r.animate(l, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: function() {
                "hide" === h && r.hide();
                n.effects.restore(r, s);
                n.effects.removeWrapper(r);
                i()
            }
        })
    }
}(jQuery),
function(n) {
    n.effects.effect.transfer = function(t, i) {
        var u = n(this),
            r = n(t.to),
            f = "fixed" === r.css("position"),
            e = n("body"),
            o = f ? e.scrollTop() : 0,
            s = f ? e.scrollLeft() : 0,
            h = r.offset(),
            l = {
                top: h.top - o,
                left: h.left - s,
                height: r.innerHeight(),
                width: r.innerWidth()
            },
            c = u.offset(),
            a = n("<div class='ui-effects-transfer'><\/div>").appendTo(document.body).addClass(t.className).css({
                top: c.top - o,
                left: c.left - s,
                height: u.innerHeight(),
                width: u.innerWidth(),
                position: f ? "fixed" : "absolute"
            }).animate(l, t.duration, t.easing, function() {
                a.remove();
                i()
            })
    }
}(jQuery);
/*! jQuery Migrate v1.2.1 | (c) 2005, 2013 jQuery Foundation, Inc. and other contributors | jquery.org/license */
jQuery.migrateMute === void 0 && (jQuery.migrateMute = !0),
    function(n, t, i) {
        function r(i) {
            var r = t.console;
            o[i] || (o[i] = !0, n.migrateWarnings.push(i), r && r.warn && !n.migrateMute && (r.warn("JQMIGRATE: " + i), n.migrateTrace && r.trace && r.trace()))
        }

        function e(t, u, f, e) {
            if (Object.defineProperty) try {
                return Object.defineProperty(t, u, {
                    configurable: !0,
                    enumerable: !0,
                    get: function() {
                        return r(e), f
                    },
                    set: function(n) {
                        r(e);
                        f = n
                    }
                }), i
            } catch (o) {}
            n._definePropertyBroken = !0;
            t[u] = f
        }
        var o = {},
            l, a, v;
        n.migrateWarnings = [];
        !n.migrateMute && t.console && t.console.log && t.console.log("JQMIGRATE: Logging is active");
        n.migrateTrace === i && (n.migrateTrace = !0);
        n.migrateReset = function() {
            o = {};
            n.migrateWarnings.length = 0
        };
        "BackCompat" === document.compatMode && r("jQuery is not compatible with Quirks Mode");
        var s = n("<input/>", {
                size: 1
            }).attr("size") && n.attrFn,
            h = n.attr,
            g = n.attrHooks.value && n.attrHooks.value.get || function() {
                return null
            },
            nt = n.attrHooks.value && n.attrHooks.value.set || function() {
                return i
            },
            tt = /^(?:input|button)$/i,
            it = /^[238]$/,
            rt = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
            ut = /^(?:checked|selected)$/i;
        e(n, "attrFn", s || {}, "jQuery.attrFn is deprecated");
        n.attr = function(t, u, f, e) {
            var o = u.toLowerCase(),
                c = t && t.nodeType;
            return e && (4 > h.length && r("jQuery.fn.attr( props, pass ) is deprecated"), t && !it.test(c) && (s ? u in s : n.isFunction(n.fn[u]))) ? n(t)[u](f) : ("type" === u && f !== i && tt.test(t.nodeName) && t.parentNode && r("Can't change the 'type' of an input or button in IE 6/7/8"), !n.attrHooks[o] && rt.test(o) && (n.attrHooks[o] = {
                get: function(t, r) {
                    var u, f = n.prop(t, r);
                    return f === !0 || "boolean" != typeof f && (u = t.getAttributeNode(r)) && u.nodeValue !== !1 ? r.toLowerCase() : i
                },
                set: function(t, i, r) {
                    var u;
                    return i === !1 ? n.removeAttr(t, r) : (u = n.propFix[r] || r, u in t && (t[u] = !0), t.setAttribute(r, r.toLowerCase())), r
                }
            }, ut.test(o) && r("jQuery.fn.attr('" + o + "') may use property instead of attribute")), h.call(n, t, u, f))
        };
        n.attrHooks.value = {
            get: function(n, t) {
                var i = (n.nodeName || "").toLowerCase();
                return "button" === i ? g.apply(this, arguments) : ("input" !== i && "option" !== i && r("jQuery.fn.attr('value') no longer gets properties"), t in n ? n.value : null)
            },
            set: function(n, t) {
                var u = (n.nodeName || "").toLowerCase();
                return "button" === u ? nt.apply(this, arguments) : ("input" !== u && "option" !== u && r("jQuery.fn.attr('value', val) no longer sets properties"), n.value = t, i)
            }
        };
        var f, u, c = n.fn.init,
            ft = n.parseJSON,
            et = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
        n.fn.init = function(t, i, u) {
            var f;
            return t && "string" == typeof t && !n.isPlainObject(i) && (f = et.exec(n.trim(t))) && f[0] && ("<" !== t.charAt(0) && r("$(html) HTML strings must start with '<' character"), f[3] && r("$(html) HTML text after last tag is ignored"), "#" === f[0].charAt(0) && (r("HTML string cannot start with a '#' character"), n.error("JQMIGRATE: Invalid selector string (XSS)")), i && i.context && (i = i.context), n.parseHTML) ? c.call(this, n.parseHTML(f[2], i, !0), i, u) : c.apply(this, arguments)
        };
        n.fn.init.prototype = n.fn;
        n.parseJSON = function(n) {
            return n || null === n ? ft.apply(this, arguments) : (r("jQuery.parseJSON requires a valid JSON string"), null)
        };
        n.uaMatch = function(n) {
            n = n.toLowerCase();
            var t = /(chrome)[ \/]([\w.]+)/.exec(n) || /(webkit)[ \/]([\w.]+)/.exec(n) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(n) || /(msie) ([\w.]+)/.exec(n) || 0 > n.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(n) || [];
            return {
                browser: t[1] || "",
                version: t[2] || "0"
            }
        };
        n.browser || (f = n.uaMatch(navigator.userAgent), u = {}, f.browser && (u[f.browser] = !0, u.version = f.version), u.chrome ? u.webkit = !0 : u.webkit && (u.safari = !0), n.browser = u);
        e(n, "browser", n.browser, "jQuery.browser is deprecated");
        n.sub = function() {
            function t(n, i) {
                return new t.fn.init(n, i)
            }
            n.extend(!0, t, this);
            t.superclass = this;
            t.fn = t.prototype = this();
            t.fn.constructor = t;
            t.sub = this.sub;
            t.fn.init = function(r, u) {
                return u && u instanceof n && !(u instanceof t) && (u = t(u)), n.fn.init.call(this, r, u, i)
            };
            t.fn.init.prototype = t.fn;
            var i = t(document);
            return r("jQuery.sub() is deprecated"), t
        };
        n.ajaxSetup({
            converters: {
                "text json": n.parseJSON
            }
        });
        l = n.fn.data;
        n.fn.data = function(t) {
            var f, u, e = this[0];
            return !e || "events" !== t || 1 !== arguments.length || (f = n.data(e, t), u = n._data(e, t), f !== i && f !== u || u === i) ? l.apply(this, arguments) : (r("Use of jQuery.fn.data('events') is deprecated"), u)
        };
        a = /\/(java|ecma)script/i;
        v = n.fn.andSelf || n.fn.addBack;
        n.fn.andSelf = function() {
            return r("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"), v.apply(this, arguments)
        };
        n.clean || (n.clean = function(t, u, f, e) {
            u = u || document;
            u = !u.nodeType && u[0] || u;
            u = u.ownerDocument || u;
            r("jQuery.clean() is deprecated");
            var s, o, c, l, h = [];
            if (n.merge(h, n.buildFragment(t, u).childNodes), f)
                for (c = function(n) {
                        return !n.type || a.test(n.type) ? e ? e.push(n.parentNode ? n.parentNode.removeChild(n) : n) : f.appendChild(n) : i
                    }, s = 0; null != (o = h[s]); s++) n.nodeName(o, "script") && c(o) || (f.appendChild(o), o.getElementsByTagName !== i && (l = n.grep(n.merge([], o.getElementsByTagName("script")), c), h.splice.apply(h, [s + 1, 0].concat(l)), s += l.length));
            return h
        });
        var ot = n.event.add,
            st = n.event.remove,
            ht = n.event.trigger,
            ct = n.fn.toggle,
            y = n.fn.live,
            p = n.fn.die,
            w = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
            b = RegExp("\\b(?:" + w + ")\\b"),
            k = /(?:^|\s)hover(\.\S+|)\b/,
            d = function(t) {
                return "string" != typeof t || n.event.special.hover ? t : (k.test(t) && r("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"), t && t.replace(k, "mouseenter$1 mouseleave$1"))
            };
        n.event.props && "attrChange" !== n.event.props[0] && n.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement");
        n.event.dispatch && e(n.event, "handle", n.event.dispatch, "jQuery.event.handle is undocumented and deprecated");
        n.event.add = function(n, t, i, u, f) {
            n !== document && b.test(t) && r("AJAX events should be attached to document: " + t);
            ot.call(this, n, d(t || ""), i, u, f)
        };
        n.event.remove = function(n, t, i, r, u) {
            st.call(this, n, d(t) || "", i, r, u)
        };
        n.fn.error = function() {
            var n = Array.prototype.slice.call(arguments, 0);
            return r("jQuery.fn.error() is deprecated"), n.splice(0, 0, "error"), arguments.length ? this.bind.apply(this, n) : (this.triggerHandler.apply(this, n), this)
        };
        n.fn.toggle = function(t, i) {
            if (!n.isFunction(t) || !n.isFunction(i)) return ct.apply(this, arguments);
            r("jQuery.fn.toggle(handler, handler...) is deprecated");
            var u = arguments,
                e = t.guid || n.guid++,
                f = 0,
                o = function(i) {
                    var r = (n._data(this, "lastToggle" + t.guid) || 0) % f;
                    return n._data(this, "lastToggle" + t.guid, r + 1), i.preventDefault(), u[r].apply(this, arguments) || !1
                };
            for (o.guid = e; u.length > f;) u[f++].guid = e;
            return this.click(o)
        };
        n.fn.live = function(t, i, u) {
            return r("jQuery.fn.live() is deprecated"), y ? y.apply(this, arguments) : (n(this.context).on(t, this.selector, i, u), this)
        };
        n.fn.die = function(t, i) {
            return r("jQuery.fn.die() is deprecated"), p ? p.apply(this, arguments) : (n(this.context).off(t, this.selector || "**", i), this)
        };
        n.event.trigger = function(n, t, i, u) {
            return i || b.test(n) || r("Global events are undocumented and deprecated"), ht.call(this, n, t, i || document, u)
        };
        n.each(w.split("|"), function(t, i) {
            n.event.special[i] = {
                setup: function() {
                    var t = this;
                    return t !== document && (n.event.add(document, i + "." + n.guid, function() {
                        n.event.trigger(i, null, t, !0)
                    }), n._data(this, i, n.guid++)), !1
                },
                teardown: function() {
                    return this !== document && n.event.remove(document, i + "." + n._data(this, i)), !1
                }
            }
        })
    }(jQuery, window);
AjaxCart = {
    loadWaiting: !1,
    usepopupnotifications: !1,
    topcartselector: "",
    topwishlistselector: "",
    flyoutcartselector: "",
    possibleShipmentSelector: "",
    orderSummaryCheckout: "",
    init: function(n, t, i, r, u, f) {
        this.loadWaiting = !1;
        this.usepopupnotifications = n;
        this.topcartselector = t;
        this.topwishlistselector = i;
        this.flyoutcartselector = r;
        this.possibleShipmentSelector = u;
        this.orderSummaryCheckout = f
    },
    setLoadWaiting: function(n) {
        displayAjaxLoading(n);
        this.loadWaiting = n
    },
    addproducttocart_catalog: function(n) {
        this.loadWaiting === !1 && (this.setLoadWaiting(!0), $.ajax({
            cache: !1,
            url: n,
            type: "post",
            success: this.success_process,
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        }))
    },
    addproducttocart_details: function(n, t) {
        this.loadWaiting === !1 && (this.setLoadWaiting(!0), $.ajax({
            cache: !1,
            url: n,
            data: $(t).serialize(),
            type: "post",
            success: this.success_process,
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        }))
    },
    removeShoppingCartItem: function(n) {
        if (this.loadWaiting === !1) {
            this.setLoadWaiting(!0);
            var t = window.location.pathname;
            $.ajax({
                cache: !1,
                url: n,
                data: {
                    pathName: t
                },
                type: "post",
                success: this.success_process,
                complete: this.resetLoadWaiting,
                error: this.ajaxFailure
            })
        }
    },
    enterdiscountcoupon: function(n) {
        var t = $("#discountcouponcode").val();
        this.loadWaiting === !1 && (this.setLoadWaiting(!0), $.ajax({
            cache: !1,
            url: n,
            data: {
                discountcouponcode: t,
                pathName: window.location.pathname
            },
            type: "post",
            success: this.success_process,
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        }))
    },
    removediscountcoupon: function(n) {
        this.loadWaiting === !1 && (this.setLoadWaiting(!0), $.ajax({
            cache: !1,
            url: n,
            type: "post",
            success: this.success_process,
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        }))
    },
    itemquantityupdate: function(n, t) {
        var r = t,
            i;
        this.loadWaiting === !1 && (this.setLoadWaiting(!0), i = window.location.pathname, $.ajax({
            cache: !1,
            url: n,
            data: {
                newQuantity: r,
                pathName: i
            },
            type: "post",
            success: this.success_process,
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        }))
    },
    addproducttocomparelist: function(n) {
        this.loadWaiting === !1 && (this.setLoadWaiting(!0), $.ajax({
            cache: !1,
            url: n,
            type: "post",
            success: this.success_process,
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        }))
    },
    success_process: function(n) {
        return (n.showquickview && api.viewProductDetails({
            data: {
                productId: n.productid
            }
        }), n.updatetopcartsectionhtml && ($(AjaxCart.topcartselector).html(n.updatetopcartsectionhtml), $("#toggleMiniCart .qty").html(n.updatetopcartsectionhtml)), n.updateCheckoutPossibleShippment && $(AjaxCart.possibleShipmentSelector).html(n.updateCheckoutPossibleShippment), n.updateCheckoutOrderSummary && $(AjaxCart.orderSummaryCheckout).html(n.updateCheckoutOrderSummary), n.updatetopwishlistsectionhtml && $(AjaxCart.topwishlistselector).html(n.updatetopwishlistsectionhtml), n.updateflyoutcartsectionhtml && ($(AjaxCart.flyoutcartselector).replaceWith(n.updateflyoutcartsectionhtml), n.ismobiledevice || $(AjaxCart.flyoutcartselector).addClass("active")), n.message) ? (n.success === !0 ? ($("#quick-view-modal").length > 0 && ($("#quick-view-modal").html(""), $("#quick-view-modal").magnificPopup("close")), AjaxCart.usepopupnotifications === !0 ? displayPopupNotification(n.message, "success", !0) : (displayBarNotification(n.message, "success", 3500), n.needlogin === !0 && $(".login_popup_open").click())) : (n.setlocation && (clickButton = !0, $(".shipping_popup_open").click()), AjaxCart.usepopupnotifications === !0 ? displayPopupNotification(n.message, "error", !0) : displayBarNotification(n.message, "error", 0)), !1) : n.redirect ? (location.href = n.redirect, !0) : !1
    },
    setChangedLocation: function(n, t) {
        $(".current-location-name").text(n);
        $(".current-location-id").val(t)
    },
    changeCurrentLocation: function(n, t, i) {
        AjaxCart.setLoadWaiting(!0);
        var r = {
            ProductId: i,
            StateProvinceId: n,
            LoadShippingCharge: t
        };
        return $.ajax({
            type: "POST",
            url: "/Customer/ChangeShippingLocation",
            data: r,
            dataType: "json",
            success: function(n) {
                if (n.invalid_location) {
                    displayBarNotification(n.message, "error", 3500);
                    return
                }
                currentStateProvinceId = n.state_id;
                AjaxCart.setChangedLocation(n.state_name, n.state_id);
                n.restricted_shipping ? ($("#home-delivery-" + i).hide(), $("#home-delivery1-" + i).hide(), $(".product-shipping-warning").show(), $(".product-shipping-warning").html(n.shipping_warning)) : t && ($("#delivery-charge-" + i).text(n.shipping_charge), $("#home-delivery-" + i).show(), $("#home-delivery1-" + i).show(), $(".product-shipping-warning").hide());
                notifyChangedLocation && !clickButton && displayBarNotification(n.message, "success", 3500);
                notifyChangedLocation = !0
            },
            complete: function() {
                AjaxCart.setLoadWaiting(!1)
            }
        })
    },
    resetLoadWaiting: function() {
        AjaxCart.setLoadWaiting(!1)
    },
    ajaxFailure: function() {
        alert("Failed to add the product. Please refresh the page and try one more time.")
    }
};
$(function() {});
HomeComponent = {
    historyLoaded: !1,
    slickCarousel: function() {
        $(".recomended-product-list").slick({
            dots: !1,
            autoplay: !0,
            infinite: !0,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 360,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        })
    },
    destroyCarousel: function() {
        $(".recomended-product-list").hasClass("slick-initialized") && $(".recomended-product-list").slick("destroy")
    },
    onload_recommended_product: function() {
        $.ajax({
            cache: !1,
            url: "/HomeComponent/OnLoadProduct",
            type: "get",
            success: function(n) {
                n.status && ($("#homepage-recommended-product").html(n.html), HomeComponent.slickCarousel(), HomeComponent.showQuickViewButtonHome())
            },
            error: function() {
                console.log("Cannot Load Recommended Products")
            }
        })
    },
    recently_viewed_products_block_forleft: function(n, t) {
        $.ajax({
            cache: !1,
            url: n,
            type: "get",
            success: function(i) {
                var u, r;
                if (i !== "") {
                    for (n === "/HomeComponent/RecentlyViewedProductsBlockForLeft" && $(".recentlyViewLi").css("display", "block"), HomeComponent.destroyCarousel(), u = "", r = 0; r < i.Data.length; r++) u = u + "<div class='item-box' style='width: 210px;'><div class='product-item' data-productid='" + i.Data[r].ProductId + "'><div class='picture bs-quick-view'><a href='" + i.Data[r].SeName + "' title='" + i.Data[r].PictureTitle + "'><img alt='" + i.Data[r].AlternateText + "' src='" + i.Data[r].ImageUrl + "' data-src='' title='" + i.Data[r].PictureTitle + "' /><\/a><\/div><\/div><\/div>";
                    $(t).empty();
                    $(t).html(u);
                    HomeComponent.slickCarousel();
                    HomeComponent.showQuickViewButtonHome()
                } else n === "/HomeComponent/RecentlyViewedProductsBlockForLeft" && $(".recentlyViewLi").css("display", "none"), setTimeout(function() {}, 1)
            },
            error: function() {}
        })
    },
    specialBlock: function(n, t) {
        $.ajax({
            cache: !0,
            url: n,
            type: "get",
            success: function(n) {
                n !== "" && ($("#imageLoaderSpecialCategory").css("display", "none"), $(t).empty(), $(t).html(n.Data))
            },
            error: function() {}
        })
    },
    showQuickViewButtonHome: function() {
        var n;
        $("body").append('<div id="quick-view-modal"><\/div>');
        $("body").append("<button id='quick-view-btn'>OpenQuickView<\/button>");
        n = $("div[data-productid]")[0];
        $("div[data-productid]").each(function() {
            for (var i = '<button data-product-id="' + $(this).data("productid") + '"type="button" class="quick-view-plugin-btn btn button-2" >QUICK VIEW<\/button>', t = ".bs-quick-view,.button,.overlay-content".split(","), n = 0; n < t.length; n++) $(this).find(t[n]).append(i)
        });
        $(".quick-view-plugin-btn.btn").on("click", function() {
            var n = $(this).data("product-id");
            api.viewProductDetails({
                data: {
                    productId: n
                }
            })
        })
    },
    homePageSliderDeskTop: function() {
        $.ajax({
            url: "WidgetsOthobaSlideShow/DesktopSlideShow",
            dataType: "json",
            success: function(n) {
                $("#homeSlideShow").empty();
                $("#homeSlideShow").html(n.Data)
            }
        })
    },
    homePageSliderMobile: function() {
        $.ajax({
            url: "WidgetsOthobaSlideShow/MobileSlideShow",
            dataType: "json",
            success: function(n) {
                $("#homeSlideShow").empty();
                $("#homeSlideShow").html(n.Data)
            }
        })
    },
    onload_recently_viewed_product_block: function() {
        HomeComponent.historyLoaded || $.ajax({
            method: "GET",
            url: "HomeComponent/OnLoadProductHistory"
        }).done(function(n) {
            HomeComponent.historyLoaded = !0;
            n.status && ($(".recently-viewed-recommendation").html(n.html), HomeComponent.destroyCarousel(), HomeComponent.slickCarousel())
        })
    }
};
EmiManager = {
        init: function() {
            $("#emiPopupClose").click(function() {
                EmiManager.close()
            });
            $("#viewPlans").click(function() {
                $(".banklist li[data-bankid]").click(function() {
                    if ($(".banklist li").removeClass("selected"), $(this).addClass("selected"), $("a#viewPlans[data-price]").length > 0) {
                        var n = $(this).find("a").html(),
                            t = $("a#viewPlans[data-price]").attr("data-price"),
                            i = $(this).attr("data-duration").split(",").map(function(n) {
                                return parseInt(n, 10)
                            }),
                            r = $(this).attr("data-interest").split(",").map(function(n) {
                                return parseFloat(n)
                            });
                        EmiManager.build(n, t, i, r)
                    }
                });
                EmiManager.show()
            })
        },
        build: function(n, t, i, r) {
            $(".emi-details").html("");
            var u = {
                bankName: n,
                tenure: {
                    duration: i,
                    interest: r
                },
                price: t,
                length: i.length > r.length ? r.length : i.length
            };
            $(".emi-details").html(tmpl("emi_tenure_tmpl", u))
        },
        close: function() {
            $("#emiPopup").removeClass("active");
            $("header").removeClass("headerHidden");
            $("html").removeClass("noscroll");
            $("body").css("overflow", "auto")
        },
        show: function() {
            $(".emi-plan ul li:nth(1)")[0].click();
            $("#emiPopup").addClass("active");
            $("header").addClass("headerHidden");
            $("html").addClass("noscroll");
            $("body").css("overflow", "hidden")
        },
        showDetails: function(n) {
            $(n).next().toggle();
            $(n).children("span.signp").toggle();
            $(n).children("span.signn").toggle()
        },
        popupNoCostEmi: function() {
            $(".nocost-emi-tc").append($(".nocost-emi-tc-text").html())
        },
        popupCostEmi: function() {
            $(".emi-tc").append($(".emi-tc-text").html())
        },
        hideNoCostEmitc: function() {
            $(".nocost-emi-css-wrp").hide()
        },
        hideCostEmitc: function() {
            $(".cost-emi-css-wrp").hide()
        }
    },
    function() {
        var n = {};
        this.tmpl = function t(i, r) {
            var u = /\W/.test(i) ? new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + i.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');") : n[i] = n[i] || t(document.getElementById(i).innerHTML);
            return r ? u(r) : u
        }
    }(),
    function(n) {
        "use strict";
        typeof define == "function" && define.amd ? define(["jquery"], n) : typeof exports != "undefined" ? module.exports = n(require("jquery")) : n(jQuery)
    }(function(n) {
        "use strict";
        var t = window.Slick || {};
        t = function() {
            function i(i, r) {
                var u = this,
                    f;
                u.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: n(i),
                    appendDots: n(i),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous<\/button>',
                    nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next<\/button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function(t, i) {
                        return n('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1)
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: .35,
                    fade: !1,
                    focusOnSelect: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnFocus: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    useTransform: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3
                };
                u.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1
                };
                n.extend(u, u.initials);
                u.activeBreakpoint = null;
                u.animType = null;
                u.animProp = null;
                u.breakpoints = [];
                u.breakpointSettings = [];
                u.cssTransitions = !1;
                u.focussed = !1;
                u.interrupted = !1;
                u.hidden = "hidden";
                u.paused = !0;
                u.positionProp = null;
                u.respondTo = null;
                u.rowCount = 1;
                u.shouldClick = !0;
                u.$slider = n(i);
                u.$slidesCache = null;
                u.transformType = null;
                u.transitionType = null;
                u.visibilityChange = "visibilitychange";
                u.windowWidth = 0;
                u.windowTimer = null;
                f = n(i).data("slick") || {};
                u.options = n.extend({}, u.defaults, r, f);
                u.currentSlide = u.options.initialSlide;
                u.originalSettings = u.options;
                typeof document.mozHidden != "undefined" ? (u.hidden = "mozHidden", u.visibilityChange = "mozvisibilitychange") : typeof document.webkitHidden != "undefined" && (u.hidden = "webkitHidden", u.visibilityChange = "webkitvisibilitychange");
                u.autoPlay = n.proxy(u.autoPlay, u);
                u.autoPlayClear = n.proxy(u.autoPlayClear, u);
                u.autoPlayIterator = n.proxy(u.autoPlayIterator, u);
                u.changeSlide = n.proxy(u.changeSlide, u);
                u.clickHandler = n.proxy(u.clickHandler, u);
                u.selectHandler = n.proxy(u.selectHandler, u);
                u.setPosition = n.proxy(u.setPosition, u);
                u.swipeHandler = n.proxy(u.swipeHandler, u);
                u.dragHandler = n.proxy(u.dragHandler, u);
                u.keyHandler = n.proxy(u.keyHandler, u);
                u.instanceUid = t++;
                u.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
                u.registerBreakpoints();
                u.init(!0)
            }
            var t = 0;
            return i
        }();
        t.prototype.activateADA = function() {
            var n = this;
            n.$slideTrack.find(".slick-active").attr({
                "aria-hidden": "false"
            }).find("a, input, button, select").attr({
                tabindex: "0"
            })
        };
        t.prototype.addSlide = t.prototype.slickAdd = function(t, i, r) {
            var u = this;
            if (typeof i == "boolean") r = i, i = null;
            else if (i < 0 || i >= u.slideCount) return !1;
            u.unload();
            typeof i == "number" ? i === 0 && u.$slides.length === 0 ? n(t).appendTo(u.$slideTrack) : r ? n(t).insertBefore(u.$slides.eq(i)) : n(t).insertAfter(u.$slides.eq(i)) : r === !0 ? n(t).prependTo(u.$slideTrack) : n(t).appendTo(u.$slideTrack);
            u.$slides = u.$slideTrack.children(this.options.slide);
            u.$slideTrack.children(this.options.slide).detach();
            u.$slideTrack.append(u.$slides);
            u.$slides.each(function(t, i) {
                n(i).attr("data-slick-index", t)
            });
            u.$slidesCache = u.$slides;
            u.reinit()
        };
        t.prototype.animateHeight = function() {
            var n = this,
                t;
            n.options.slidesToShow === 1 && n.options.adaptiveHeight === !0 && n.options.vertical === !1 && (t = n.$slides.eq(n.currentSlide).outerHeight(!0), n.$list.animate({
                height: t
            }, n.options.speed))
        };
        t.prototype.animateSlide = function(t, i) {
            var u = {},
                r = this;
            r.animateHeight();
            r.options.rtl === !0 && r.options.vertical === !1 && (t = -t);
            r.transformsEnabled === !1 ? r.options.vertical === !1 ? r.$slideTrack.animate({
                left: t
            }, r.options.speed, r.options.easing, i) : r.$slideTrack.animate({
                top: t
            }, r.options.speed, r.options.easing, i) : r.cssTransitions === !1 ? (r.options.rtl === !0 && (r.currentLeft = -r.currentLeft), n({
                animStart: r.currentLeft
            }).animate({
                animStart: t
            }, {
                duration: r.options.speed,
                easing: r.options.easing,
                step: function(n) {
                    n = Math.ceil(n);
                    r.options.vertical === !1 ? (u[r.animType] = "translate(" + n + "px, 0px)", r.$slideTrack.css(u)) : (u[r.animType] = "translate(0px," + n + "px)", r.$slideTrack.css(u))
                },
                complete: function() {
                    i && i.call()
                }
            })) : (r.applyTransition(), t = Math.ceil(t), u[r.animType] = r.options.vertical === !1 ? "translate3d(" + t + "px, 0px, 0px)" : "translate3d(0px," + t + "px, 0px)", r.$slideTrack.css(u), i && setTimeout(function() {
                r.disableTransition();
                i.call()
            }, r.options.speed))
        };
        t.prototype.getNavTarget = function() {
            var i = this,
                t = i.options.asNavFor;
            return t && t !== null && (t = n(t).not(i.$slider)), t
        };
        t.prototype.asNavFor = function(t) {
            var r = this,
                i = r.getNavTarget();
            i !== null && typeof i == "object" && i.each(function() {
                var i = n(this).slick("getSlick");
                i.unslicked || i.slideHandler(t, !0)
            })
        };
        t.prototype.applyTransition = function(n) {
            var t = this,
                i = {};
            i[t.transitionType] = t.options.fade === !1 ? t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : "opacity " + t.options.speed + "ms " + t.options.cssEase;
            t.options.fade === !1 ? t.$slideTrack.css(i) : t.$slides.eq(n).css(i)
        };
        t.prototype.autoPlay = function() {
            var n = this;
            n.autoPlayClear();
            n.slideCount > n.options.slidesToShow && (n.autoPlayTimer = setInterval(n.autoPlayIterator, n.options.autoplaySpeed))
        };
        t.prototype.autoPlayClear = function() {
            var n = this;
            n.autoPlayTimer && clearInterval(n.autoPlayTimer)
        };
        t.prototype.autoPlayIterator = function() {
            var n = this,
                t = n.currentSlide + n.options.slidesToScroll;
            n.paused || n.interrupted || n.focussed || (n.options.infinite === !1 && (n.direction === 1 && n.currentSlide + 1 === n.slideCount - 1 ? n.direction = 0 : n.direction === 0 && (t = n.currentSlide - n.options.slidesToScroll, n.currentSlide - 1 == 0 && (n.direction = 1))), n.slideHandler(t))
        };
        t.prototype.buildArrows = function() {
            var t = this;
            t.options.arrows === !0 && (t.$prevArrow = n(t.options.prevArrow).addClass("slick-arrow"), t.$nextArrow = n(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), t.options.infinite !== !0 && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1"
            }))
        };
        t.prototype.buildDots = function() {
            var t = this,
                i, r;
            if (t.options.dots === !0 && t.slideCount > t.options.slidesToShow) {
                for (t.$slider.addClass("slick-dotted"), r = n("<ul />").addClass(t.options.dotsClass), i = 0; i <= t.getDotCount(); i += 1) r.append(n("<li />").append(t.options.customPaging.call(this, t, i)));
                t.$dots = r.appendTo(t.options.appendDots);
                t.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
            }
        };
        t.prototype.buildOut = function() {
            var t = this;
            t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide");
            t.slideCount = t.$slides.length;
            t.$slides.each(function(t, i) {
                n(i).attr("data-slick-index", t).data("originalStyling", n(i).attr("style") || "")
            });
            t.$slider.addClass("slick-slider");
            t.$slideTrack = t.slideCount === 0 ? n('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent();
            t.$list = t.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent();
            t.$slideTrack.css("opacity", 0);
            (t.options.centerMode === !0 || t.options.swipeToSlide === !0) && (t.options.slidesToScroll = 1);
            n("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading");
            t.setupInfinite();
            t.buildArrows();
            t.buildDots();
            t.updateDots();
            t.setSlideClasses(typeof t.currentSlide == "number" ? t.currentSlide : 0);
            t.options.draggable === !0 && t.$list.addClass("draggable")
        };
        t.prototype.buildRows = function() {
            var n = this,
                t, i, r, f, c, u, e, o, s, h;
            if (f = document.createDocumentFragment(), u = n.$slider.children(), n.options.rows > 1) {
                for (e = n.options.slidesPerRow * n.options.rows, c = Math.ceil(u.length / e), t = 0; t < c; t++) {
                    for (o = document.createElement("div"), i = 0; i < n.options.rows; i++) {
                        for (s = document.createElement("div"), r = 0; r < n.options.slidesPerRow; r++) h = t * e + (i * n.options.slidesPerRow + r), u.get(h) && s.appendChild(u.get(h));
                        o.appendChild(s)
                    }
                    f.appendChild(o)
                }
                n.$slider.empty().append(f);
                n.$slider.children().children().children().css({
                    width: 100 / n.options.slidesPerRow + "%",
                    display: "inline-block"
                })
            }
        };
        t.prototype.checkResponsive = function(t, i) {
            var r = this,
                f, u, e, o = !1,
                s = r.$slider.width(),
                h = window.innerWidth || n(window).width();
            if (r.respondTo === "window" ? e = h : r.respondTo === "slider" ? e = s : r.respondTo === "min" && (e = Math.min(h, s)), r.options.responsive && r.options.responsive.length && r.options.responsive !== null) {
                u = null;
                for (f in r.breakpoints) r.breakpoints.hasOwnProperty(f) && (r.originalSettings.mobileFirst === !1 ? e < r.breakpoints[f] && (u = r.breakpoints[f]) : e > r.breakpoints[f] && (u = r.breakpoints[f]));
                u !== null ? r.activeBreakpoint !== null ? (u !== r.activeBreakpoint || i) && (r.activeBreakpoint = u, r.breakpointSettings[u] === "unslick" ? r.unslick(u) : (r.options = n.extend({}, r.originalSettings, r.breakpointSettings[u]), t === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(t)), o = u) : (r.activeBreakpoint = u, r.breakpointSettings[u] === "unslick" ? r.unslick(u) : (r.options = n.extend({}, r.originalSettings, r.breakpointSettings[u]), t === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(t)), o = u) : r.activeBreakpoint !== null && (r.activeBreakpoint = null, r.options = r.originalSettings, t === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(t), o = u);
                t || o === !1 || r.$slider.trigger("breakpoint", [r, o])
            }
        };
        t.prototype.changeSlide = function(t, i) {
            var r = this,
                u = n(t.currentTarget),
                f, e, o, s;
            u.is("a") && t.preventDefault();
            u.is("li") || (u = u.closest("li"));
            o = r.slideCount % r.options.slidesToScroll != 0;
            f = o ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll;
            switch (t.data.message) {
                case "previous":
                    e = f === 0 ? r.options.slidesToScroll : r.options.slidesToShow - f;
                    r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - e, !1, i);
                    break;
                case "next":
                    e = f === 0 ? r.options.slidesToScroll : f;
                    r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + e, !1, i);
                    break;
                case "index":
                    s = t.data.index === 0 ? 0 : t.data.index || u.index() * r.options.slidesToScroll;
                    r.slideHandler(r.checkNavigable(s), !1, i);
                    u.children().trigger("focus");
                    break;
                default:
                    return
            }
        };
        t.prototype.checkNavigable = function(n) {
            var u = this,
                t, i, r;
            if (t = u.getNavigableIndexes(), i = 0, n > t[t.length - 1]) n = t[t.length - 1];
            else
                for (r in t) {
                    if (n < t[r]) {
                        n = i;
                        break
                    }
                    i = t[r]
                }
            return n
        };
        t.prototype.cleanUpEvents = function() {
            var t = this;
            t.options.dots && t.$dots !== null && n("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", n.proxy(t.interrupt, t, !0)).off("mouseleave.slick", n.proxy(t.interrupt, t, !1));
            t.$slider.off("focus.slick blur.slick");
            t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide));
            t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler);
            t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler);
            t.$list.off("touchend.slick mouseup.slick", t.swipeHandler);
            t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler);
            t.$list.off("click.slick", t.clickHandler);
            n(document).off(t.visibilityChange, t.visibility);
            t.cleanUpSlideEvents();
            t.options.accessibility === !0 && t.$list.off("keydown.slick", t.keyHandler);
            t.options.focusOnSelect === !0 && n(t.$slideTrack).children().off("click.slick", t.selectHandler);
            n(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange);
            n(window).off("resize.slick.slick-" + t.instanceUid, t.resize);
            n("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault);
            n(window).off("load.slick.slick-" + t.instanceUid, t.setPosition);
            n(document).off("ready.slick.slick-" + t.instanceUid, t.setPosition)
        };
        t.prototype.cleanUpSlideEvents = function() {
            var t = this;
            t.$list.off("mouseenter.slick", n.proxy(t.interrupt, t, !0));
            t.$list.off("mouseleave.slick", n.proxy(t.interrupt, t, !1))
        };
        t.prototype.cleanUpRows = function() {
            var n = this,
                t;
            n.options.rows > 1 && (t = n.$slides.children().children(), t.removeAttr("style"), n.$slider.empty().append(t))
        };
        t.prototype.clickHandler = function(n) {
            var t = this;
            t.shouldClick === !1 && (n.stopImmediatePropagation(), n.stopPropagation(), n.preventDefault())
        };
        t.prototype.destroy = function(t) {
            var i = this;
            i.autoPlayClear();
            i.touchObject = {};
            i.cleanUpEvents();
            n(".slick-cloned", i.$slider).detach();
            i.$dots && i.$dots.remove();
            i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove());
            i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove());
            i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                n(this).attr("style", n(this).data("originalStyling"))
            }), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.detach(), i.$list.detach(), i.$slider.append(i.$slides));
            i.cleanUpRows();
            i.$slider.removeClass("slick-slider");
            i.$slider.removeClass("slick-initialized");
            i.$slider.removeClass("slick-dotted");
            i.unslicked = !0;
            t || i.$slider.trigger("destroy", [i])
        };
        t.prototype.disableTransition = function(n) {
            var t = this,
                i = {};
            i[t.transitionType] = "";
            t.options.fade === !1 ? t.$slideTrack.css(i) : t.$slides.eq(n).css(i)
        };
        t.prototype.fadeSlide = function(n, t) {
            var i = this;
            i.cssTransitions === !1 ? (i.$slides.eq(n).css({
                zIndex: i.options.zIndex
            }), i.$slides.eq(n).animate({
                opacity: 1
            }, i.options.speed, i.options.easing, t)) : (i.applyTransition(n), i.$slides.eq(n).css({
                opacity: 1,
                zIndex: i.options.zIndex
            }), t && setTimeout(function() {
                i.disableTransition(n);
                t.call()
            }, i.options.speed))
        };
        t.prototype.fadeSlideOut = function(n) {
            var t = this;
            t.cssTransitions === !1 ? t.$slides.eq(n).animate({
                opacity: 0,
                zIndex: t.options.zIndex - 2
            }, t.options.speed, t.options.easing) : (t.applyTransition(n), t.$slides.eq(n).css({
                opacity: 0,
                zIndex: t.options.zIndex - 2
            }))
        };
        t.prototype.filterSlides = t.prototype.slickFilter = function(n) {
            var t = this;
            n !== null && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(n).appendTo(t.$slideTrack), t.reinit())
        };
        t.prototype.focusHandler = function() {
            var t = this;
            t.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(i) {
                i.stopImmediatePropagation();
                var r = n(this);
                setTimeout(function() {
                    t.options.pauseOnFocus && (t.focussed = r.is(":focus"), t.autoPlay())
                }, 0)
            })
        };
        t.prototype.getCurrent = t.prototype.slickCurrentSlide = function() {
            var n = this;
            return n.currentSlide
        };
        t.prototype.getDotCount = function() {
            var n = this,
                i = 0,
                r = 0,
                t = 0;
            if (n.options.infinite === !0)
                while (i < n.slideCount) ++t, i = r + n.options.slidesToScroll, r += n.options.slidesToScroll <= n.options.slidesToShow ? n.options.slidesToScroll : n.options.slidesToShow;
            else if (n.options.centerMode === !0) t = n.slideCount;
            else if (n.options.asNavFor)
                while (i < n.slideCount) ++t, i = r + n.options.slidesToScroll, r += n.options.slidesToScroll <= n.options.slidesToShow ? n.options.slidesToScroll : n.options.slidesToShow;
            else t = 1 + Math.ceil((n.slideCount - n.options.slidesToShow) / n.options.slidesToScroll);
            return t - 1
        };
        t.prototype.getLeft = function(n) {
            var t = this,
                f, r, u = 0,
                i;
            return t.slideOffset = 0, r = t.$slides.first().outerHeight(!0), t.options.infinite === !0 ? (t.slideCount > t.options.slidesToShow && (t.slideOffset = t.slideWidth * t.options.slidesToShow * -1, u = r * t.options.slidesToShow * -1), t.slideCount % t.options.slidesToScroll != 0 && n + t.options.slidesToScroll > t.slideCount && t.slideCount > t.options.slidesToShow && (n > t.slideCount ? (t.slideOffset = (t.options.slidesToShow - (n - t.slideCount)) * t.slideWidth * -1, u = (t.options.slidesToShow - (n - t.slideCount)) * r * -1) : (t.slideOffset = t.slideCount % t.options.slidesToScroll * t.slideWidth * -1, u = t.slideCount % t.options.slidesToScroll * r * -1))) : n + t.options.slidesToShow > t.slideCount && (t.slideOffset = (n + t.options.slidesToShow - t.slideCount) * t.slideWidth, u = (n + t.options.slidesToShow - t.slideCount) * r), t.slideCount <= t.options.slidesToShow && (t.slideOffset = 0, u = 0), t.options.centerMode === !0 && t.options.infinite === !0 ? t.slideOffset += t.slideWidth * Math.floor(t.options.slidesToShow / 2) - t.slideWidth : t.options.centerMode === !0 && (t.slideOffset = 0, t.slideOffset += t.slideWidth * Math.floor(t.options.slidesToShow / 2)), f = t.options.vertical === !1 ? n * t.slideWidth * -1 + t.slideOffset : n * r * -1 + u, t.options.variableWidth === !0 && (i = t.slideCount <= t.options.slidesToShow || t.options.infinite === !1 ? t.$slideTrack.children(".slick-slide").eq(n) : t.$slideTrack.children(".slick-slide").eq(n + t.options.slidesToShow), f = t.options.rtl === !0 ? i[0] ? (t.$slideTrack.width() - i[0].offsetLeft - i.width()) * -1 : 0 : i[0] ? i[0].offsetLeft * -1 : 0, t.options.centerMode === !0 && (i = t.slideCount <= t.options.slidesToShow || t.options.infinite === !1 ? t.$slideTrack.children(".slick-slide").eq(n) : t.$slideTrack.children(".slick-slide").eq(n + t.options.slidesToShow + 1), f = (t.options.rtl === !0 ? i[0] ? (t.$slideTrack.width() - i[0].offsetLeft - i.width()) * -1 : 0 : i[0] ? i[0].offsetLeft * -1 : 0) + (t.$list.width() - i.outerWidth()) / 2)), f
        };
        t.prototype.getOption = t.prototype.slickGetOption = function(n) {
            var t = this;
            return t.options[n]
        };
        t.prototype.getNavigableIndexes = function() {
            var n = this,
                t = 0,
                i = 0,
                u = [],
                r;
            for (n.options.infinite === !1 ? r = n.slideCount : (t = n.options.slidesToScroll * -1, i = n.options.slidesToScroll * -1, r = n.slideCount * 2); t < r;) u.push(t), t = i + n.options.slidesToScroll, i += n.options.slidesToScroll <= n.options.slidesToShow ? n.options.slidesToScroll : n.options.slidesToShow;
            return u
        };
        t.prototype.getSlick = function() {
            return this
        };
        t.prototype.getSlideCount = function() {
            var t = this,
                i, r;
            return r = t.options.centerMode === !0 ? t.slideWidth * Math.floor(t.options.slidesToShow / 2) : 0, t.options.swipeToSlide === !0 ? (t.$slideTrack.find(".slick-slide").each(function(u, f) {
                if (f.offsetLeft - r + n(f).outerWidth() / 2 > t.swipeLeft * -1) return i = f, !1
            }), Math.abs(n(i).attr("data-slick-index") - t.currentSlide) || 1) : t.options.slidesToScroll
        };
        t.prototype.goTo = t.prototype.slickGoTo = function(n, t) {
            var i = this;
            i.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(n)
                }
            }, t)
        };
        t.prototype.init = function(t) {
            var i = this;
            n(i.$slider).hasClass("slick-initialized") || (n(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots(), i.checkResponsive(!0), i.focusHandler());
            t && i.$slider.trigger("init", [i]);
            i.options.accessibility === !0 && i.initADA();
            i.options.autoplay && (i.paused = !1, i.autoPlay())
        };
        t.prototype.initADA = function() {
            var t = this;
            t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
                "aria-hidden": "true",
                tabindex: "-1"
            }).find("a, input, button, select").attr({
                tabindex: "-1"
            });
            t.$slideTrack.attr("role", "listbox");
            t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function(i) {
                n(this).attr({
                    role: "option",
                    "aria-describedby": "slick-slide" + t.instanceUid + i + ""
                })
            });
            t.$dots !== null && t.$dots.attr("role", "tablist").find("li").each(function(i) {
                n(this).attr({
                    role: "presentation",
                    "aria-selected": "false",
                    "aria-controls": "navigation" + t.instanceUid + i + "",
                    id: "slick-slide" + t.instanceUid + i + ""
                })
            }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar");
            t.activateADA()
        };
        t.prototype.initArrowEvents = function() {
            var n = this;
            if (n.options.arrows === !0 && n.slideCount > n.options.slidesToShow) {
                n.$prevArrow.off("click.slick").on("click.slick", {
                    message: "previous"
                }, n.changeSlide);
                n.$nextArrow.off("click.slick").on("click.slick", {
                    message: "next"
                }, n.changeSlide)
            }
        };
        t.prototype.initDotEvents = function() {
            var t = this;
            if (t.options.dots === !0 && t.slideCount > t.options.slidesToShow) n("li", t.$dots).on("click.slick", {
                message: "index"
            }, t.changeSlide);
            if (t.options.dots === !0 && t.options.pauseOnDotsHover === !0) n("li", t.$dots).on("mouseenter.slick", n.proxy(t.interrupt, t, !0)).on("mouseleave.slick", n.proxy(t.interrupt, t, !1))
        };
        t.prototype.initSlideEvents = function() {
            var t = this;
            if (t.options.pauseOnHover) {
                t.$list.on("mouseenter.slick", n.proxy(t.interrupt, t, !0));
                t.$list.on("mouseleave.slick", n.proxy(t.interrupt, t, !1))
            }
        };
        t.prototype.initializeEvents = function() {
            var t = this;
            t.initArrowEvents();
            t.initDotEvents();
            t.initSlideEvents();
            t.$list.on("touchstart.slick mousedown.slick", {
                action: "start"
            }, t.swipeHandler);
            t.$list.on("touchmove.slick mousemove.slick", {
                action: "move"
            }, t.swipeHandler);
            t.$list.on("touchend.slick mouseup.slick", {
                action: "end"
            }, t.swipeHandler);
            t.$list.on("touchcancel.slick mouseleave.slick", {
                action: "end"
            }, t.swipeHandler);
            t.$list.on("click.slick", t.clickHandler);
            n(document).on(t.visibilityChange, n.proxy(t.visibility, t));
            if (t.options.accessibility === !0) t.$list.on("keydown.slick", t.keyHandler);
            if (t.options.focusOnSelect === !0) n(t.$slideTrack).children().on("click.slick", t.selectHandler);
            n(window).on("orientationchange.slick.slick-" + t.instanceUid, n.proxy(t.orientationChange, t));
            n(window).on("resize.slick.slick-" + t.instanceUid, n.proxy(t.resize, t));
            n("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault);
            n(window).on("load.slick.slick-" + t.instanceUid, t.setPosition);
            n(document).on("ready.slick.slick-" + t.instanceUid, t.setPosition)
        };
        t.prototype.initUI = function() {
            var n = this;
            n.options.arrows === !0 && n.slideCount > n.options.slidesToShow && (n.$prevArrow.show(), n.$nextArrow.show());
            n.options.dots === !0 && n.slideCount > n.options.slidesToShow && n.$dots.show()
        };
        t.prototype.keyHandler = function(n) {
            var t = this;
            n.target.tagName.match("TEXTAREA|INPUT|SELECT") || (n.keyCode === 37 && t.options.accessibility === !0 ? t.changeSlide({
                data: {
                    message: t.options.rtl === !0 ? "next" : "previous"
                }
            }) : n.keyCode === 39 && t.options.accessibility === !0 && t.changeSlide({
                data: {
                    message: t.options.rtl === !0 ? "previous" : "next"
                }
            }))
        };
        t.prototype.lazyLoad = function() {
            function f(i) {
                n("img[data-lazy]", i).each(function() {
                    var i = n(this),
                        r = n(this).attr("data-lazy"),
                        u = document.createElement("img");
                    u.onload = function() {
                        i.animate({
                            opacity: 0
                        }, 100, function() {
                            i.attr("src", r).animate({
                                opacity: 1
                            }, 200, function() {
                                i.removeAttr("data-lazy").removeClass("slick-loading")
                            });
                            t.$slider.trigger("lazyLoaded", [t, i, r])
                        })
                    };
                    u.onerror = function() {
                        i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error");
                        t.$slider.trigger("lazyLoadError", [t, i, r])
                    };
                    u.src = r
                })
            }
            var t = this,
                e, r, i, u;
            t.options.centerMode === !0 ? t.options.infinite === !0 ? (i = t.currentSlide + (t.options.slidesToShow / 2 + 1), u = i + t.options.slidesToShow + 2) : (i = Math.max(0, t.currentSlide - (t.options.slidesToShow / 2 + 1)), u = 2 + (t.options.slidesToShow / 2 + 1) + t.currentSlide) : (i = t.options.infinite ? t.options.slidesToShow + t.currentSlide : t.currentSlide, u = Math.ceil(i + t.options.slidesToShow), t.options.fade === !0 && (i > 0 && i--, u <= t.slideCount && u++));
            e = t.$slider.find(".slick-slide").slice(i, u);
            f(e);
            t.slideCount <= t.options.slidesToShow ? (r = t.$slider.find(".slick-slide"), f(r)) : t.currentSlide >= t.slideCount - t.options.slidesToShow ? (r = t.$slider.find(".slick-cloned").slice(0, t.options.slidesToShow), f(r)) : t.currentSlide === 0 && (r = t.$slider.find(".slick-cloned").slice(t.options.slidesToShow * -1), f(r))
        };
        t.prototype.loadSlider = function() {
            var n = this;
            n.setPosition();
            n.$slideTrack.css({
                opacity: 1
            });
            n.$slider.removeClass("slick-loading");
            n.initUI();
            n.options.lazyLoad === "progressive" && n.progressiveLazyLoad()
        };
        t.prototype.next = t.prototype.slickNext = function() {
            var n = this;
            n.changeSlide({
                data: {
                    message: "next"
                }
            })
        };
        t.prototype.orientationChange = function() {
            var n = this;
            n.checkResponsive();
            n.setPosition()
        };
        t.prototype.pause = t.prototype.slickPause = function() {
            var n = this;
            n.autoPlayClear();
            n.paused = !0
        };
        t.prototype.play = t.prototype.slickPlay = function() {
            var n = this;
            n.autoPlay();
            n.options.autoplay = !0;
            n.paused = !1;
            n.focussed = !1;
            n.interrupted = !1
        };
        t.prototype.postSlide = function(n) {
            var t = this;
            t.unslicked || (t.$slider.trigger("afterChange", [t, n]), t.animating = !1, t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), t.options.accessibility === !0 && t.initADA())
        };
        t.prototype.prev = t.prototype.slickPrev = function() {
            var n = this;
            n.changeSlide({
                data: {
                    message: "previous"
                }
            })
        };
        t.prototype.preventDefault = function(n) {
            n.preventDefault()
        };
        t.prototype.progressiveLazyLoad = function(t) {
            t = t || 1;
            var i = this,
                e = n("img[data-lazy]", i.$slider),
                r, u, f;
            e.length ? (r = e.first(), u = r.attr("data-lazy"), f = document.createElement("img"), f.onload = function() {
                r.attr("src", u).removeAttr("data-lazy").removeClass("slick-loading");
                i.options.adaptiveHeight === !0 && i.setPosition();
                i.$slider.trigger("lazyLoaded", [i, r, u]);
                i.progressiveLazyLoad()
            }, f.onerror = function() {
                t < 3 ? setTimeout(function() {
                    i.progressiveLazyLoad(t + 1)
                }, 500) : (r.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), i.$slider.trigger("lazyLoadError", [i, r, u]), i.progressiveLazyLoad())
            }, f.src = u) : i.$slider.trigger("allImagesLoaded", [i])
        };
        t.prototype.refresh = function(t) {
            var i = this,
                r, u;
            u = i.slideCount - i.options.slidesToShow;
            !i.options.infinite && i.currentSlide > u && (i.currentSlide = u);
            i.slideCount <= i.options.slidesToShow && (i.currentSlide = 0);
            r = i.currentSlide;
            i.destroy(!0);
            n.extend(i, i.initials, {
                currentSlide: r
            });
            i.init();
            t || i.changeSlide({
                data: {
                    message: "index",
                    index: r
                }
            }, !1)
        };
        t.prototype.registerBreakpoints = function() {
            var t = this,
                u, f, i, r = t.options.responsive || null;
            if (n.type(r) === "array" && r.length) {
                t.respondTo = t.options.respondTo || "window";
                for (u in r)
                    if (i = t.breakpoints.length - 1, f = r[u].breakpoint, r.hasOwnProperty(u)) {
                        while (i >= 0) t.breakpoints[i] && t.breakpoints[i] === f && t.breakpoints.splice(i, 1), i--;
                        t.breakpoints.push(f);
                        t.breakpointSettings[f] = r[u].settings
                    }
                t.breakpoints.sort(function(n, i) {
                    return t.options.mobileFirst ? n - i : i - n
                })
            }
        };
        t.prototype.reinit = function() {
            var t = this;
            if (t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >= t.slideCount && t.currentSlide !== 0 && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.registerBreakpoints(), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.cleanUpSlideEvents(), t.initSlideEvents(), t.checkResponsive(!1, !0), t.options.focusOnSelect === !0) n(t.$slideTrack).children().on("click.slick", t.selectHandler);
            t.setSlideClasses(typeof t.currentSlide == "number" ? t.currentSlide : 0);
            t.setPosition();
            t.focusHandler();
            t.paused = !t.options.autoplay;
            t.autoPlay();
            t.$slider.trigger("reInit", [t])
        };
        t.prototype.resize = function() {
            var t = this;
            n(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function() {
                t.windowWidth = n(window).width();
                t.checkResponsive();
                t.unslicked || t.setPosition()
            }, 50))
        };
        t.prototype.removeSlide = t.prototype.slickRemove = function(n, t, i) {
            var r = this;
            if (typeof n == "boolean" ? (t = n, n = t === !0 ? 0 : r.slideCount - 1) : n = t === !0 ? --n : n, r.slideCount < 1 || n < 0 || n > r.slideCount - 1) return !1;
            r.unload();
            i === !0 ? r.$slideTrack.children().remove() : r.$slideTrack.children(this.options.slide).eq(n).remove();
            r.$slides = r.$slideTrack.children(this.options.slide);
            r.$slideTrack.children(this.options.slide).detach();
            r.$slideTrack.append(r.$slides);
            r.$slidesCache = r.$slides;
            r.reinit()
        };
        t.prototype.setCSS = function(n) {
            var t = this,
                i = {},
                r, u;
            t.options.rtl === !0 && (n = -n);
            r = t.positionProp == "left" ? Math.ceil(n) + "px" : "0px";
            u = t.positionProp == "top" ? Math.ceil(n) + "px" : "0px";
            i[t.positionProp] = n;
            t.transformsEnabled === !1 ? t.$slideTrack.css(i) : (i = {}, t.cssTransitions === !1 ? (i[t.animType] = "translate(" + r + ", " + u + ")", t.$slideTrack.css(i)) : (i[t.animType] = "translate3d(" + r + ", " + u + ", 0px)", t.$slideTrack.css(i)))
        };
        t.prototype.setDimensions = function() {
            var n = this,
                t;
            n.options.vertical === !1 ? n.options.centerMode === !0 && n.$list.css({
                padding: "0px " + n.options.centerPadding
            }) : (n.$list.height(n.$slides.first().outerHeight(!0) * n.options.slidesToShow), n.options.centerMode === !0 && n.$list.css({
                padding: n.options.centerPadding + " 0px"
            }));
            n.listWidth = n.$list.width();
            n.listHeight = n.$list.height();
            n.options.vertical === !1 && n.options.variableWidth === !1 ? (n.slideWidth = Math.ceil(n.listWidth / n.options.slidesToShow), n.$slideTrack.width(Math.ceil(n.slideWidth * n.$slideTrack.children(".slick-slide").length))) : n.options.variableWidth === !0 ? n.$slideTrack.width(5e3 * n.slideCount) : (n.slideWidth = Math.ceil(n.listWidth), n.$slideTrack.height(Math.ceil(n.$slides.first().outerHeight(!0) * n.$slideTrack.children(".slick-slide").length)));
            t = n.$slides.first().outerWidth(!0) - n.$slides.first().width();
            n.options.variableWidth === !1 && n.$slideTrack.children(".slick-slide").width(n.slideWidth - t)
        };
        t.prototype.setFade = function() {
            var t = this,
                i;
            t.$slides.each(function(r, u) {
                i = t.slideWidth * r * -1;
                t.options.rtl === !0 ? n(u).css({
                    position: "relative",
                    right: i,
                    top: 0,
                    zIndex: t.options.zIndex - 2,
                    opacity: 0
                }) : n(u).css({
                    position: "relative",
                    left: i,
                    top: 0,
                    zIndex: t.options.zIndex - 2,
                    opacity: 0
                })
            });
            t.$slides.eq(t.currentSlide).css({
                zIndex: t.options.zIndex - 1,
                opacity: 1
            })
        };
        t.prototype.setHeight = function() {
            var n = this,
                t;
            n.options.slidesToShow === 1 && n.options.adaptiveHeight === !0 && n.options.vertical === !1 && (t = n.$slides.eq(n.currentSlide).outerHeight(!0), n.$list.css("height", t))
        };
        t.prototype.setOption = t.prototype.slickSetOption = function() {
            var t = this,
                u, f, e, i, o = !1,
                r;
            if (n.type(arguments[0]) === "object" ? (e = arguments[0], o = arguments[1], r = "multiple") : n.type(arguments[0]) === "string" && (e = arguments[0], i = arguments[1], o = arguments[2], arguments[0] === "responsive" && n.type(arguments[1]) === "array" ? r = "responsive" : typeof arguments[1] != "undefined" && (r = "single")), r === "single") t.options[e] = i;
            else if (r === "multiple") n.each(e, function(n, i) {
                t.options[n] = i
            });
            else if (r === "responsive")
                for (f in i)
                    if (n.type(t.options.responsive) !== "array") t.options.responsive = [i[f]];
                    else {
                        for (u = t.options.responsive.length - 1; u >= 0;) t.options.responsive[u].breakpoint === i[f].breakpoint && t.options.responsive.splice(u, 1), u--;
                        t.options.responsive.push(i[f])
                    }
            o && (t.unload(), t.reinit())
        };
        t.prototype.setPosition = function() {
            var n = this;
            n.setDimensions();
            n.setHeight();
            n.options.fade === !1 ? n.setCSS(n.getLeft(n.currentSlide)) : n.setFade();
            n.$slider.trigger("setPosition", [n])
        };
        t.prototype.setProps = function() {
            var n = this,
                t = document.body.style;
            n.positionProp = n.options.vertical === !0 ? "top" : "left";
            n.positionProp === "top" ? n.$slider.addClass("slick-vertical") : n.$slider.removeClass("slick-vertical");
            (t.WebkitTransition !== undefined || t.MozTransition !== undefined || t.msTransition !== undefined) && n.options.useCSS === !0 && (n.cssTransitions = !0);
            n.options.fade && (typeof n.options.zIndex == "number" ? n.options.zIndex < 3 && (n.options.zIndex = 3) : n.options.zIndex = n.defaults.zIndex);
            t.OTransform !== undefined && (n.animType = "OTransform", n.transformType = "-o-transform", n.transitionType = "OTransition", t.perspectiveProperty === undefined && t.webkitPerspective === undefined && (n.animType = !1));
            t.MozTransform !== undefined && (n.animType = "MozTransform", n.transformType = "-moz-transform", n.transitionType = "MozTransition", t.perspectiveProperty === undefined && t.MozPerspective === undefined && (n.animType = !1));
            t.webkitTransform !== undefined && (n.animType = "webkitTransform", n.transformType = "-webkit-transform", n.transitionType = "webkitTransition", t.perspectiveProperty === undefined && t.webkitPerspective === undefined && (n.animType = !1));
            t.msTransform !== undefined && (n.animType = "msTransform", n.transformType = "-ms-transform", n.transitionType = "msTransition", t.msTransform === undefined && (n.animType = !1));
            t.transform !== undefined && n.animType !== !1 && (n.animType = "transform", n.transformType = "transform", n.transitionType = "transition");
            n.transformsEnabled = n.options.useTransform && n.animType !== null && n.animType !== !1
        };
        t.prototype.setSlideClasses = function(n) {
            var t = this,
                u, i, r, f;
            i = t.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true");
            t.$slides.eq(n).addClass("slick-current");
            t.options.centerMode === !0 ? (u = Math.floor(t.options.slidesToShow / 2), t.options.infinite === !0 && (n >= u && n <= t.slideCount - 1 - u ? t.$slides.slice(n - u, n + u + 1).addClass("slick-active").attr("aria-hidden", "false") : (r = t.options.slidesToShow + n, i.slice(r - u + 1, r + u + 2).addClass("slick-active").attr("aria-hidden", "false")), n === 0 ? i.eq(i.length - 1 - t.options.slidesToShow).addClass("slick-center") : n === t.slideCount - 1 && i.eq(t.options.slidesToShow).addClass("slick-center")), t.$slides.eq(n).addClass("slick-center")) : n >= 0 && n <= t.slideCount - t.options.slidesToShow ? t.$slides.slice(n, n + t.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= t.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (f = t.slideCount % t.options.slidesToShow, r = t.options.infinite === !0 ? t.options.slidesToShow + n : n, t.options.slidesToShow == t.options.slidesToScroll && t.slideCount - n < t.options.slidesToShow ? i.slice(r - (t.options.slidesToShow - f), r + f).addClass("slick-active").attr("aria-hidden", "false") : i.slice(r, r + t.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
            t.options.lazyLoad === "ondemand" && t.lazyLoad()
        };
        t.prototype.setupInfinite = function() {
            var t = this,
                i, r, u;
            if (t.options.fade === !0 && (t.options.centerMode = !1), t.options.infinite === !0 && t.options.fade === !1 && (r = null, t.slideCount > t.options.slidesToShow)) {
                for (u = t.options.centerMode === !0 ? t.options.slidesToShow + 1 : t.options.slidesToShow, i = t.slideCount; i > t.slideCount - u; i -= 1) r = i - 1, n(t.$slides[r]).clone(!0).attr("id", "").attr("data-slick-index", r - t.slideCount).prependTo(t.$slideTrack).addClass("slick-cloned");
                for (i = 0; i < u; i += 1) r = i, n(t.$slides[r]).clone(!0).attr("id", "").attr("data-slick-index", r + t.slideCount).appendTo(t.$slideTrack).addClass("slick-cloned");
                t.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    n(this).attr("id", "")
                })
            }
        };
        t.prototype.interrupt = function(n) {
            var t = this;
            n || t.autoPlay();
            t.interrupted = n
        };
        t.prototype.selectHandler = function(t) {
            var i = this,
                u = n(t.target).is(".slick-slide") ? n(t.target) : n(t.target).parents(".slick-slide"),
                r = parseInt(u.attr("data-slick-index"));
            if (r || (r = 0), i.slideCount <= i.options.slidesToShow) {
                i.setSlideClasses(r);
                i.asNavFor(r);
                return
            }
            i.slideHandler(r)
        };
        t.prototype.slideHandler = function(n, t, i) {
            var u, f, s, o, h = null,
                r = this,
                e;
            if ((t = t || !1, r.animating !== !0 || r.options.waitForAnimate !== !0) && (r.options.fade !== !0 || r.currentSlide !== n) && !(r.slideCount <= r.options.slidesToShow)) {
                if (t === !1 && r.asNavFor(n), u = n, h = r.getLeft(u), o = r.getLeft(r.currentSlide), r.currentLeft = r.swipeLeft === null ? o : r.swipeLeft, r.options.infinite === !1 && r.options.centerMode === !1 && (n < 0 || n > r.getDotCount() * r.options.slidesToScroll)) {
                    r.options.fade === !1 && (u = r.currentSlide, i !== !0 ? r.animateSlide(o, function() {
                        r.postSlide(u)
                    }) : r.postSlide(u));
                    return
                }
                if (r.options.infinite === !1 && r.options.centerMode === !0 && (n < 0 || n > r.slideCount - r.options.slidesToScroll)) {
                    r.options.fade === !1 && (u = r.currentSlide, i !== !0 ? r.animateSlide(o, function() {
                        r.postSlide(u)
                    }) : r.postSlide(u));
                    return
                }
                if (r.options.autoplay && clearInterval(r.autoPlayTimer), f = u < 0 ? r.slideCount % r.options.slidesToScroll != 0 ? r.slideCount - r.slideCount % r.options.slidesToScroll : r.slideCount + u : u >= r.slideCount ? r.slideCount % r.options.slidesToScroll != 0 ? 0 : u - r.slideCount : u, r.animating = !0, r.$slider.trigger("beforeChange", [r, r.currentSlide, f]), s = r.currentSlide, r.currentSlide = f, r.setSlideClasses(r.currentSlide), r.options.asNavFor && (e = r.getNavTarget(), e = e.slick("getSlick"), e.slideCount <= e.options.slidesToShow && e.setSlideClasses(r.currentSlide)), r.updateDots(), r.updateArrows(), r.options.fade === !0) {
                    i !== !0 ? (r.fadeSlideOut(s), r.fadeSlide(f, function() {
                        r.postSlide(f)
                    })) : r.postSlide(f);
                    r.animateHeight();
                    return
                }
                i !== !0 ? r.animateSlide(h, function() {
                    r.postSlide(f)
                }) : r.postSlide(f)
            }
        };
        t.prototype.startLoad = function() {
            var n = this;
            n.options.arrows === !0 && n.slideCount > n.options.slidesToShow && (n.$prevArrow.hide(), n.$nextArrow.hide());
            n.options.dots === !0 && n.slideCount > n.options.slidesToShow && n.$dots.hide();
            n.$slider.addClass("slick-loading")
        };
        t.prototype.swipeDirection = function() {
            var i, r, u, n, t = this;
            return (i = t.touchObject.startX - t.touchObject.curX, r = t.touchObject.startY - t.touchObject.curY, u = Math.atan2(r, i), n = Math.round(u * 180 / Math.PI), n < 0 && (n = 360 - Math.abs(n)), n <= 45 && n >= 0) ? t.options.rtl === !1 ? "left" : "right" : n <= 360 && n >= 315 ? t.options.rtl === !1 ? "left" : "right" : n >= 135 && n <= 225 ? t.options.rtl === !1 ? "right" : "left" : t.options.verticalSwiping === !0 ? n >= 35 && n <= 135 ? "down" : "up" : "vertical"
        };
        t.prototype.swipeEnd = function() {
            var n = this,
                i, t;
            if (n.dragging = !1, n.interrupted = !1, n.shouldClick = n.touchObject.swipeLength > 10 ? !1 : !0, n.touchObject.curX === undefined) return !1;
            if (n.touchObject.edgeHit === !0 && n.$slider.trigger("edge", [n, n.swipeDirection()]), n.touchObject.swipeLength >= n.touchObject.minSwipe) {
                t = n.swipeDirection();
                switch (t) {
                    case "left":
                    case "down":
                        i = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide + n.getSlideCount()) : n.currentSlide + n.getSlideCount();
                        n.currentDirection = 0;
                        break;
                    case "right":
                    case "up":
                        i = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide - n.getSlideCount()) : n.currentSlide - n.getSlideCount();
                        n.currentDirection = 1
                }
                t != "vertical" && (n.slideHandler(i), n.touchObject = {}, n.$slider.trigger("swipe", [n, t]))
            } else n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(n.currentSlide), n.touchObject = {})
        };
        t.prototype.swipeHandler = function(n) {
            var t = this;
            if (t.options.swipe !== !1 && (!("ontouchend" in document) || t.options.swipe !== !1) && (t.options.draggable !== !1 || n.type.indexOf("mouse") === -1)) {
                t.touchObject.fingerCount = n.originalEvent && n.originalEvent.touches !== undefined ? n.originalEvent.touches.length : 1;
                t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold;
                t.options.verticalSwiping === !0 && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold);
                switch (n.data.action) {
                    case "start":
                        t.swipeStart(n);
                        break;
                    case "move":
                        t.swipeMove(n);
                        break;
                    case "end":
                        t.swipeEnd(n)
                }
            }
        };
        t.prototype.swipeMove = function(n) {
            var t = this,
                f, e, r, u, i;
            if (i = n.originalEvent !== undefined ? n.originalEvent.touches : null, !t.dragging || i && i.length !== 1) return !1;
            if (f = t.getLeft(t.currentSlide), t.touchObject.curX = i !== undefined ? i[0].pageX : n.clientX, t.touchObject.curY = i !== undefined ? i[0].pageY : n.clientY, t.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(t.touchObject.curX - t.touchObject.startX, 2))), t.options.verticalSwiping === !0 && (t.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(t.touchObject.curY - t.touchObject.startY, 2)))), e = t.swipeDirection(), e !== "vertical") {
                if (n.originalEvent !== undefined && t.touchObject.swipeLength > 4 && n.preventDefault(), u = (t.options.rtl === !1 ? 1 : -1) * (t.touchObject.curX > t.touchObject.startX ? 1 : -1), t.options.verticalSwiping === !0 && (u = t.touchObject.curY > t.touchObject.startY ? 1 : -1), r = t.touchObject.swipeLength, t.touchObject.edgeHit = !1, t.options.infinite === !1 && (t.currentSlide === 0 && e === "right" || t.currentSlide >= t.getDotCount() && e === "left") && (r = t.touchObject.swipeLength * t.options.edgeFriction, t.touchObject.edgeHit = !0), t.swipeLeft = t.options.vertical === !1 ? f + r * u : f + r * (t.$list.height() / t.listWidth) * u, t.options.verticalSwiping === !0 && (t.swipeLeft = f + r * u), t.options.fade === !0 || t.options.touchMove === !1) return !1;
                if (t.animating === !0) return t.swipeLeft = null, !1;
                t.setCSS(t.swipeLeft)
            }
        };
        t.prototype.swipeStart = function(n) {
            var t = this,
                i;
            if (t.interrupted = !0, t.touchObject.fingerCount !== 1 || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1;
            n.originalEvent !== undefined && n.originalEvent.touches !== undefined && (i = n.originalEvent.touches[0]);
            t.touchObject.startX = t.touchObject.curX = i !== undefined ? i.pageX : n.clientX;
            t.touchObject.startY = t.touchObject.curY = i !== undefined ? i.pageY : n.clientY;
            t.dragging = !0
        };
        t.prototype.unfilterSlides = t.prototype.slickUnfilter = function() {
            var n = this;
            n.$slidesCache !== null && (n.unload(), n.$slideTrack.children(this.options.slide).detach(), n.$slidesCache.appendTo(n.$slideTrack), n.reinit())
        };
        t.prototype.unload = function() {
            var t = this;
            n(".slick-cloned", t.$slider).remove();
            t.$dots && t.$dots.remove();
            t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove();
            t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove();
            t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        };
        t.prototype.unslick = function(n) {
            var t = this;
            t.$slider.trigger("unslick", [t, n]);
            t.destroy()
        };
        t.prototype.updateArrows = function() {
            var n = this,
                t;
            t = Math.floor(n.options.slidesToShow / 2);
            n.options.arrows === !0 && n.slideCount > n.options.slidesToShow && !n.options.infinite && (n.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), n.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), n.currentSlide === 0 ? (n.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), n.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : n.currentSlide >= n.slideCount - n.options.slidesToShow && n.options.centerMode === !1 ? (n.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), n.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : n.currentSlide >= n.slideCount - 1 && n.options.centerMode === !0 && (n.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), n.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
        };
        t.prototype.updateDots = function() {
            var n = this;
            n.$dots !== null && (n.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), n.$dots.find("li").eq(Math.floor(n.currentSlide / n.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
        };
        t.prototype.visibility = function() {
            var n = this;
            n.options.autoplay && (n.interrupted = document[n.hidden] ? !0 : !1)
        };
        n.fn.slick = function() {
            for (var i = this, r = arguments[0], f = Array.prototype.slice.call(arguments, 1), e = i.length, u, n = 0; n < e; n++)
                if (typeof r == "object" || typeof r == "undefined" ? i[n].slick = new t(i[n], r) : u = i[n].slick[r].apply(i[n].slick, f), typeof u != "undefined") return u;
            return i
        }
    });
/*!
 * jQuery Popup Overlay
 *
 * @version 1.7.13
 * @requires jQuery v1.7.1+
 * @link http://vast-engineering.github.com/jquery-popup-overlay/
 */
(function(n) {
    var u = n(window),
        o = {},
        f = [],
        e = [],
        h, s = null,
        c = "_open",
        v = "_close",
        i = [],
        l = null,
        a, y = /(iPad|iPhone|iPod)/g.test(navigator.userAgent),
        p = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]",
        t = {
            _init: function(i) {
                var r = n(i),
                    u = r.data("popupoptions");
                e[i.id] = !1;
                f[i.id] = 0;
                r.data("popup-initialized") || (r.attr("data-popup-initialized", "true"), t._initonce(i));
                u.autoopen && setTimeout(function() {
                    t.show(i, 0)
                }, 0)
            },
            _initonce: function(i) {
                var u = n(i),
                    v = n("body"),
                    f, r = u.data("popupoptions"),
                    o, p, w, a, e;
                if (s = parseInt(v.css("margin-right"), 10), l = document.body.style.webkitTransition !== undefined || document.body.style.MozTransition !== undefined || document.body.style.msTransition !== undefined || document.body.style.OTransition !== undefined || document.body.style.transition !== undefined, r.type == "tooltip" && (r.background = !1, r.scrolllock = !1), r.backgroundactive && (r.background = !1, r.blur = !1, r.scrolllock = !1), r.scrolllock && typeof h == "undefined" && (p = n('<div style="width:50px;height:50px;overflow:auto"><div/><\/div>').appendTo("body"), w = p.children(), h = w.innerWidth() - w.height(99).innerWidth(), p.remove()), u.attr("id") || u.attr("id", "j-popup-" + parseInt(Math.random() * 1e8, 10)), u.addClass("popup_content"), r.background && !n("#" + i.id + "_background").length && (v.append('<div id="' + i.id + '_background" class="popup_background"><\/div>'), a = n("#" + i.id + "_background"), a.css({
                        opacity: 0,
                        visibility: "hidden",
                        backgroundColor: r.color,
                        position: "fixed",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }), r.setzindex && !r.autozindex && a.css("z-index", "100000"), r.transition && a.css("transition", r.transition)), v.append(i), u.wrap('<div id="' + i.id + '_wrapper" class="popup_wrapper" />'), f = n("#" + i.id + "_wrapper"), f.css({
                        opacity: 0,
                        visibility: "hidden",
                        position: "absolute"
                    }), y && f.css("cursor", "pointer"), r.type == "overlay" && f.css("overflow", "auto"), u.css({
                        opacity: 0,
                        visibility: "hidden",
                        display: "inline-block"
                    }), r.setzindex && !r.autozindex && f.css("z-index", "100001"), r.outline || u.css("outline", "none"), r.transition && (u.css("transition", r.transition), f.css("transition", r.transition)), u.attr("aria-hidden", !0), r.type == "overlay" && (u.css({
                        textAlign: "left",
                        position: "relative",
                        verticalAlign: "middle"
                    }), o = {
                        position: "fixed",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0,
                        textAlign: "center"
                    }, r.backgroundactive && (o.position = "absolute", o.height = "0", o.overflow = "visible"), f.css(o), f.append('<div class="popup_align" />'), n(".popup_align").css({
                        display: "inline-block",
                        verticalAlign: "middle",
                        height: "100%"
                    })), u.attr("role", "dialog"), e = r.openelement ? r.openelement : "." + i.id + c, n(e).each(function(t, i) {
                        n(i).attr("data-popup-ordinal", t);
                        i.id || n(i).attr("id", "open_" + parseInt(Math.random() * 1e8, 10))
                    }), u.attr("aria-labelledby") || u.attr("aria-label") || u.attr("aria-labelledby", n(e).attr("id")), r.action == "hover") {
                    r.keepfocus = !1;
                    n(e).on("mouseenter", function() {
                        t.show(i, n(this).data("popup-ordinal"))
                    });
                    n(e).on("mouseleave", function() {
                        t.hide(i)
                    })
                } else n(document).on("click", e, function(r) {
                    r.preventDefault();
                    var u = n(this).data("popup-ordinal");
                    setTimeout(function() {
                        t.show(i, u)
                    }, 0)
                });
                r.closebutton && t.addclosebutton(i);
                r.detach ? u.hide().detach() : f.hide()
            },
            show: function(o, c) {
                var p = n(o),
                    k, b;
                if (!p.data("popup-visible")) {
                    p.data("popup-initialized") || t._init(o);
                    p.attr("data-popup-initialized", "true");
                    var d = n("body"),
                        y = p.data("popupoptions"),
                        w = n("#" + o.id + "_wrapper"),
                        nt = n("#" + o.id + "_background");
                    if (r(o, c, y.beforeopen), e[o.id] = c, setTimeout(function() {
                            i.push(o.id)
                        }, 0), y.autozindex) {
                        var tt = document.getElementsByTagName("*"),
                            it = tt.length,
                            g = 0;
                        for (k = 0; k < it; k++) b = n(tt[k]).css("z-index"), b !== "auto" && (b = parseInt(b, 10), g < b && (g = b));
                        f[o.id] = g;
                        y.background && f[o.id] > 0 && n("#" + o.id + "_background").css({
                            zIndex: f[o.id] + 1
                        });
                        f[o.id] > 0 && w.css({
                            zIndex: f[o.id] + 2
                        })
                    }
                    if (y.detach ? (w.prepend(o), p.show()) : w.show(), a = setTimeout(function() {
                            w.css({
                                visibility: "visible",
                                opacity: 1
                            });
                            n("html").addClass("popup_visible").addClass("popup_visible_" + o.id);
                            w.addClass("popup_wrapper_visible")
                        }, 20), y.scrolllock && (d.css("overflow", "hidden"), d.height() > u.height() && d.css("margin-right", s + h)), y.backgroundactive && p.css({
                            top: (u.height() - (p.get(0).offsetHeight + parseInt(p.css("margin-top"), 10) + parseInt(p.css("margin-bottom"), 10))) / 2 + "px"
                        }), p.css({
                            visibility: "visible",
                            opacity: 1
                        }), y.background && (nt.css({
                            visibility: "visible",
                            opacity: y.opacity
                        }), setTimeout(function() {
                            nt.css({
                                opacity: y.opacity
                            })
                        }, 0)), p.data("popup-visible", !0), t.reposition(o, c), p.data("focusedelementbeforepopup", document.activeElement), y.keepfocus && (p.attr("tabindex", -1), setTimeout(function() {
                            y.focuselement === "closebutton" ? n("#" + o.id + " ." + o.id + v + ":first").focus() : y.focuselement ? n(y.focuselement).focus() : p.focus()
                        }, y.focusdelay)), n(y.pagecontainer).attr("aria-hidden", !0), p.attr("aria-hidden", !1), r(o, c, y.onopen), l) w.one("transitionend", function() {
                        r(o, c, y.opentransitionend)
                    });
                    else r(o, c, y.opentransitionend);
                    if (y.type == "tooltip") n(window).on("resize." + o.id, function() {
                        t.reposition(o, c)
                    })
                }
            },
            hide: function(t, u) {
                var c = n.inArray(t.id, i);
                if (c !== -1) {
                    a && clearTimeout(a);
                    var v = n("body"),
                        f = n(t),
                        o = f.data("popupoptions"),
                        h = n("#" + t.id + "_wrapper"),
                        y = n("#" + t.id + "_background");
                    if (f.data("popup-visible", !1), i.length === 1 ? n("html").removeClass("popup_visible").removeClass("popup_visible_" + t.id) : n("html").hasClass("popup_visible_" + t.id) && n("html").removeClass("popup_visible_" + t.id), i.splice(c, 1), h.hasClass("popup_wrapper_visible") && h.removeClass("popup_wrapper_visible"), o.keepfocus && !u && setTimeout(function() {
                            n(f.data("focusedelementbeforepopup")).is(":visible") && f.data("focusedelementbeforepopup").focus()
                        }, 0), h.css({
                            visibility: "hidden",
                            opacity: 0
                        }), f.css({
                            visibility: "hidden",
                            opacity: 0
                        }), o.background && y.css({
                            visibility: "hidden",
                            opacity: 0
                        }), n(o.pagecontainer).attr("aria-hidden", !1), f.attr("aria-hidden", !0), r(t, e[t.id], o.onclose), l && f.css("transition-duration") !== "0s") f.one("transitionend", function() {
                        f.data("popup-visible") || (o.detach ? f.hide().detach() : h.hide());
                        o.scrolllock && setTimeout(function() {
                            v.css({
                                overflow: "visible",
                                "margin-right": s
                            })
                        }, 10);
                        r(t, e[t.id], o.closetransitionend)
                    });
                    else o.detach ? f.hide().detach() : h.hide(), o.scrolllock && setTimeout(function() {
                        v.css({
                            overflow: "visible",
                            "margin-right": s
                        })
                    }, 10), r(t, e[t.id], o.closetransitionend);
                    o.type == "tooltip" && n(window).off("resize." + t.id)
                }
            },
            toggle: function(i, r) {
                n(i).data("popup-visible") ? t.hide(i) : setTimeout(function() {
                    t.show(i, r)
                }, 0)
            },
            reposition: function(t, i) {
                var s = n(t),
                    r = s.data("popupoptions"),
                    f = n("#" + t.id + "_wrapper"),
                    h = n("#" + t.id + "_background"),
                    o, e;
                i = i || 0;
                r.type == "tooltip" ? (f.css({
                    position: "absolute"
                }), o = r.tooltipanchor ? n(r.tooltipanchor) : r.openelement ? n(r.openelement).filter('[data-popup-ordinal="' + i + '"]') : n("." + t.id + c + '[data-popup-ordinal="' + i + '"]'), e = o.offset(), r.horizontal == "right" ? f.css("left", e.left + o.outerWidth() + r.offsetleft) : r.horizontal == "leftedge" ? f.css("left", e.left + o.outerWidth() - o.outerWidth() + r.offsetleft) : r.horizontal == "left" ? f.css("right", u.width() - e.left - r.offsetleft) : r.horizontal == "rightedge" ? f.css("right", u.width() - e.left - o.outerWidth() - r.offsetleft) : f.css("left", e.left + o.outerWidth() / 2 - s.outerWidth() / 2 - parseFloat(s.css("marginLeft")) + r.offsetleft), r.vertical == "bottom" ? f.css("top", e.top + o.outerHeight() + r.offsettop) : r.vertical == "bottomedge" ? f.css("top", e.top + o.outerHeight() - s.outerHeight() + r.offsettop) : r.vertical == "top" ? f.css("bottom", u.height() - e.top - r.offsettop) : r.vertical == "topedge" ? f.css("bottom", u.height() - e.top - s.outerHeight() - r.offsettop) : f.css("top", e.top + o.outerHeight() / 2 - s.outerHeight() / 2 - parseFloat(s.css("marginTop")) + r.offsettop)) : r.type == "overlay" && (r.horizontal ? f.css("text-align", r.horizontal) : f.css("text-align", "center"), r.vertical ? s.css("vertical-align", r.vertical) : s.css("vertical-align", "middle"))
            },
            addclosebutton: function(t) {
                var i;
                i = n(t).data("popupoptions").closebuttonmarkup ? n(o.closebuttonmarkup).addClass(t.id + "_close") : '<button class="popup_close ' + t.id + '_close" title="Close" aria-label="Close"><span aria-hidden="true">Ã—<\/span><\/button>';
                n(t).data("popup-initialized") && n(t).append(i)
            }
        },
        r = function(t, i, r) {
            var u = n(t).data("popupoptions"),
                f = u.openelement ? u.openelement : "." + t.id + c,
                e = n(f + '[data-popup-ordinal="' + i + '"]');
            typeof r == "function" && r.call(n(t), t, e)
        };
    n(document).on("keydown", function(r) {
        if (i.length) {
            var f = i[i.length - 1],
                u = document.getElementById(f);
            n(u).data("popupoptions").escape && r.keyCode == 27 && t.hide(u)
        }
    });
    n(document).on("click", function(r) {
        if (i.length) {
            var f = i[i.length - 1],
                u = document.getElementById(f),
                e = n(u).data("popupoptions").closeelement ? n(u).data("popupoptions").closeelement : "." + u.id + v;
            n(r.target).closest(e).length && (r.preventDefault(), t.hide(u));
            n(u).data("popupoptions").blur && !n(r.target).closest("#" + f).length && r.which !== 2 && n(r.target).is(":visible") && (n(u).data("popupoptions").background ? (t.hide(u), r.preventDefault()) : t.hide(u, !0))
        }
    });
    n(document).on("keydown", function(t) {
        if (i.length && t.which == 9) {
            var o = i[i.length - 1],
                f = document.getElementById(o),
                s = n(f).find("*"),
                r = s.filter(p).filter(":visible"),
                h = n(":focus"),
                u = r.length,
                e = r.index(h);
            u === 0 ? (n(f).focus(), t.preventDefault()) : t.shiftKey ? e === 0 && (r.get(u - 1).focus(), t.preventDefault()) : e == u - 1 && (r.get(0).focus(), t.preventDefault())
        }
    });
    n.fn.popup = function(i) {
        return this.each(function() {
            var r = n(this),
                u;
            typeof i == "object" ? (u = n.extend({}, n.fn.popup.defaults, r.data("popupoptions"), i), r.data("popupoptions", u), o = r.data("popupoptions"), t._init(this)) : typeof i == "string" ? (r.data("popupoptions") || (r.data("popupoptions", n.fn.popup.defaults), o = r.data("popupoptions")), t[i].call(this, this)) : (r.data("popupoptions") || (r.data("popupoptions", n.fn.popup.defaults), o = r.data("popupoptions")), t._init(this))
        })
    };
    n.fn.popup.defaults = {
        type: "overlay",
        autoopen: !1,
        background: !0,
        backgroundactive: !1,
        color: "black",
        opacity: "0.5",
        horizontal: "center",
        vertical: "middle",
        offsettop: 0,
        offsetleft: 0,
        escape: !0,
        blur: !0,
        setzindex: !0,
        autozindex: !1,
        scrolllock: !1,
        closebutton: !1,
        closebuttonmarkup: null,
        keepfocus: !0,
        focuselement: null,
        focusdelay: 50,
        outline: !1,
        pagecontainer: null,
        detach: !1,
        openelement: null,
        closeelement: null,
        transition: null,
        tooltipanchor: null,
        beforeopen: null,
        onclose: null,
        onopen: null,
        opentransitionend: null,
        closetransitionend: null
    }
})(jQuery);
/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.7
 *
 */
(function(n) {
    n.fn.extend({
        slimScroll: function(i) {
            var r = n.extend({
                width: "auto",
                height: "250px",
                size: "7px",
                color: "#000",
                position: "right",
                distance: "1px",
                start: "top",
                opacity: .4,
                alwaysVisible: !1,
                disableFadeOut: !1,
                railVisible: !1,
                railColor: "#333",
                railOpacity: .2,
                railDraggable: !0,
                railClass: "slimScrollRail",
                barClass: "slimScrollBar",
                wrapperClass: "slimScrollDiv",
                allowPageScroll: !1,
                wheelStep: 20,
                touchScrollStep: 200,
                borderRadius: "7px",
                railBorderRadius: "7px"
            }, i);
            return this.each(function() {
                function g(t) {
                    var t, i, f;
                    l && (t = t || window.event, i = 0, t.wheelDelta && (i = -t.wheelDelta / 120), t.detail && (i = t.detail / 3), f = t.target || t.srcTarget || t.srcElement, n(f).closest("." + r.wrapperClass).is(u.parent()) && h(i, !0), t.preventDefault && !o && t.preventDefault(), o || (t.returnValue = !1))
                }

                function h(n, t, i) {
                    var s, l, h;
                    o = !1;
                    s = n;
                    l = u.outerHeight() - f.outerHeight();
                    t && (s = parseInt(f.css("top")) + n * parseInt(r.wheelStep) / 100 * f.outerHeight(), s = Math.min(Math.max(s, 0), l), s = n > 0 ? Math.ceil(s) : Math.floor(s), f.css({
                        top: s + "px"
                    }));
                    e = parseInt(f.css("top")) / (u.outerHeight() - f.outerHeight());
                    s = e * (u[0].scrollHeight - u.outerHeight());
                    i && (s = n, h = s / u[0].scrollHeight * u.outerHeight(), h = Math.min(Math.max(h, 0), l), f.css({
                        top: h + "px"
                    }));
                    u.scrollTop(s);
                    u.trigger("slimscrolling", ~~s);
                    tt();
                    c()
                }

                function ot(n) {
                    window.addEventListener ? (n.addEventListener("DOMMouseScroll", g, !1), n.addEventListener("mousewheel", g, !1)) : document.attachEvent("onmousewheel", g)
                }

                function nt() {
                    a = Math.max(u.outerHeight() / u[0].scrollHeight * u.outerHeight(), et);
                    f.css({
                        height: a + "px"
                    });
                    var n = a == u.outerHeight() ? "none" : "block";
                    f.css({
                        display: n
                    })
                }

                function tt() {
                    if (nt(), clearTimeout(it), e == ~~e) {
                        if (o = r.allowPageScroll, rt != e) {
                            var n = ~~e == 0 ? "top" : "bottom";
                            u.trigger("slimscroll", n)
                        }
                    } else o = !1;
                    if (rt = e, a >= u.outerHeight()) {
                        o = !0;
                        return
                    }
                    f.stop(!0, !0).fadeIn("fast");
                    r.railVisible && s.stop(!0, !0).fadeIn("fast")
                }

                function c() {
                    r.alwaysVisible || (it = setTimeout(function() {
                        r.disableFadeOut && l || y || p || (f.fadeOut("slow"), s.fadeOut("slow"))
                    }, 1e3))
                }
                var l, y, p, it, w, a, e, rt, b = "<div><\/div>",
                    et = 30,
                    o = !1,
                    u = n(this),
                    v, k, d, ut;
                if (u.parent().hasClass(r.wrapperClass)) {
                    if (v = u.scrollTop(), f = u.siblings("." + r.barClass), s = u.siblings("." + r.railClass), nt(), n.isPlainObject(i)) {
                        if ("height" in i && i.height == "auto" ? (u.parent().css("height", "auto"), u.css("height", "auto"), k = u.parent().parent().height(), u.parent().css("height", k), u.css("height", k)) : "height" in i && (d = i.height, u.parent().css("height", d), u.css("height", d)), "scrollTo" in i) v = parseInt(r.scrollTo);
                        else if ("scrollBy" in i) v += parseInt(r.scrollBy);
                        else if ("destroy" in i) {
                            f.remove();
                            s.remove();
                            u.unwrap();
                            return
                        }
                        h(v, !1, !0)
                    }
                    return
                }
                if (!n.isPlainObject(i) || !("destroy" in i)) {
                    r.height = r.height == "auto" ? u.parent().height() : r.height;
                    ut = n(b).addClass(r.wrapperClass).css({
                        position: "relative",
                        overflow: "hidden",
                        width: r.width,
                        height: r.height
                    });
                    u.css({
                        overflow: "hidden",
                        width: r.width,
                        height: r.height
                    });
                    var s = n(b).addClass(r.railClass).css({
                            width: r.size,
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            display: r.alwaysVisible && r.railVisible ? "block" : "none",
                            "border-radius": r.railBorderRadius,
                            background: r.railColor,
                            opacity: r.railOpacity,
                            zIndex: 90
                        }),
                        f = n(b).addClass(r.barClass).css({
                            background: r.color,
                            width: r.size,
                            position: "absolute",
                            top: 0,
                            opacity: r.opacity,
                            display: r.alwaysVisible ? "block" : "none",
                            "border-radius": r.borderRadius,
                            BorderRadius: r.borderRadius,
                            MozBorderRadius: r.borderRadius,
                            WebkitBorderRadius: r.borderRadius,
                            zIndex: 99
                        }),
                        ft = r.position == "right" ? {
                            right: r.distance
                        } : {
                            left: r.distance
                        };
                    s.css(ft);
                    f.css(ft);
                    u.wrap(ut);
                    u.parent().append(f);
                    u.parent().append(s);
                    r.railDraggable && f.bind("mousedown", function(i) {
                        var r = n(document);
                        return p = !0, t = parseFloat(f.css("top")), pageY = i.pageY, r.bind("mousemove.slimscroll", function(n) {
                            currTop = t + n.pageY - pageY;
                            f.css("top", currTop);
                            h(0, f.position().top, !1)
                        }), r.bind("mouseup.slimscroll", function() {
                            p = !1;
                            c();
                            r.unbind(".slimscroll")
                        }), !1
                    }).bind("selectstart.slimscroll", function(n) {
                        return n.stopPropagation(), n.preventDefault(), !1
                    });
                    s.hover(function() {
                        tt()
                    }, function() {
                        c()
                    });
                    f.hover(function() {
                        y = !0
                    }, function() {
                        y = !1
                    });
                    u.hover(function() {
                        l = !0;
                        tt();
                        c()
                    }, function() {
                        l = !1;
                        c()
                    });
                    u.bind("touchstart", function(n) {
                        n.originalEvent.touches.length && (w = n.originalEvent.touches[0].pageY)
                    });
                    u.bind("touchmove", function(n) {
                        if (o || n.originalEvent.preventDefault(), n.originalEvent.touches.length) {
                            var t = (w - n.originalEvent.touches[0].pageY) / r.touchScrollStep;
                            h(t, !0);
                            w = n.originalEvent.touches[0].pageY
                        }
                    });
                    nt();
                    r.start === "bottom" ? (f.css({
                        top: u.outerHeight() - f.outerHeight()
                    }), h(0, !0)) : r.start !== "top" && (h(n(r.start).position().top, null, !0), r.alwaysVisible || f.hide());
                    ot(this)
                }
            }), this
        }
    });
    n.fn.extend({
        slimscroll: n.fn.slimScroll
    })
})(jQuery);
/*!
 * jquery.inputmask.bundle.js
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2017 Robin Herbots
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 * Version: 3.3.11
 */
! function(n) {
    function t(r) {
        if (i[r]) return i[r].exports;
        var u = i[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return n[r].call(u.exports, u, u.exports, t), u.l = !0, u.exports
    }
    var i = {};
    t.m = n;
    t.c = i;
    t.d = function(n, i, r) {
        t.o(n, i) || Object.defineProperty(n, i, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    };
    t.n = function(n) {
        var i = n && n.__esModule ? function() {
            return n.default
        } : function() {
            return n
        };
        return t.d(i, "a", i), i
    };
    t.o = function(n, t) {
        return Object.prototype.hasOwnProperty.call(n, t)
    };
    t.p = "";
    t(t.s = 3)
}([function(n, t, i) {
    "use strict";
    var r, u, f;
    "function" == typeof Symbol && Symbol.iterator;
    ! function(e) {
        u = [i(2)];
        void 0 !== (f = "function" == typeof(r = e) ? r.apply(t, u) : r) && (n.exports = f)
    }(function(n) {
        return n
    })
}, function(n, t, i) {
    "use strict";
    var r, u, f, e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
        return typeof n
    } : function(n) {
        return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
    };
    ! function(e) {
        u = [i(0), i(10), i(11)];
        void 0 !== (f = "function" == typeof(r = e) ? r.apply(t, u) : r) && (n.exports = f)
    }(function(n, t, i, r) {
        function u(t, i, f) {
            if (!(this instanceof u)) return new u(t, i, f);
            this.el = r;
            this.events = {};
            this.maskset = r;
            this.refreshValue = !1;
            !0 !== f && (n.isPlainObject(t) ? i = t : (i = i || {}).alias = t, this.opts = n.extend(!0, {}, this.defaults, i), this.noMasksCache = i && i.definitions !== r, this.userOptions = i || {}, this.isRTL = this.opts.numericInput, c(this.opts.alias, i, this.opts))
        }

        function c(t, i, f) {
            var e = u.prototype.aliases[t];
            return e ? (e.alias && c(e.alias, r, f), n.extend(!0, f, e), n.extend(!0, f, i), !0) : (null === f.mask && (f.mask = t), !1)
        }

        function o(t, i) {
            function e(t, f, e) {
                var h = !1,
                    c, o, s;
                return (null !== t && "" !== t || ((h = null !== e.regex) ? t = (t = e.regex).replace(/^(\^)(.*)(\$)$/, "$2") : (h = !0, t = ".*")), 1 === t.length && !1 === e.greedy && 0 !== e.repeat && (e.placeholder = ""), e.repeat > 0 || "*" === e.repeat || "+" === e.repeat) && (c = "*" === e.repeat ? 0 : "+" === e.repeat ? 1 : e.repeat, t = e.groupmarker.start + t + e.groupmarker.end + e.quantifiermarker.start + c + "," + e.repeat + e.quantifiermarker.end), s = h ? "regex_" + e.regex : e.numericInput ? t.split("").reverse().join("") : t, u.prototype.masksCache[s] === r || !0 === i ? (o = {
                    mask: t,
                    maskToken: u.prototype.analyseMask(t, h, e),
                    validPositions: {},
                    _buffer: r,
                    buffer: r,
                    tests: {},
                    metadata: f,
                    maskLength: r
                }, !0 !== i && (u.prototype.masksCache[s] = o, o = n.extend(!0, {}, u.prototype.masksCache[s]))) : o = n.extend(!0, {}, u.prototype.masksCache[s]), o
            }
            if (n.isFunction(t.mask) && (t.mask = t.mask(t)), n.isArray(t.mask)) {
                if (t.mask.length > 1) {
                    t.keepStatic = null === t.keepStatic || t.keepStatic;
                    var f = t.groupmarker.start;
                    return n.each(t.numericInput ? t.mask.reverse() : t.mask, function(i, u) {
                        f.length > 1 && (f += t.groupmarker.end + t.alternatormarker + t.groupmarker.start);
                        f += u.mask === r || n.isFunction(u.mask) ? u : u.mask
                    }), f += t.groupmarker.end, e(f, t.mask, t)
                }
                t.mask = t.mask.pop()
            }
            return t.mask && t.mask.mask !== r && !n.isFunction(t.mask.mask) ? e(t.mask.mask, t.mask, t) : e(t.mask, t.mask, t)
        }

        function f(o, s, c) {
            function ti(n, t, i) {
                t = t || 0;
                var s, f, o, e = [],
                    u = 0,
                    h = b();
                do !0 === n && y().validPositions[u] ? (f = (o = y().validPositions[u]).match, s = o.locator.slice(), e.push(!0 === i ? o.input : !1 === i ? f.nativeDef : it(u, f))) : (f = (o = ct(u, s, u - 1)).match, s = o.locator.slice(), (!1 === c.jitMasking || u < h || "number" == typeof c.jitMasking && isFinite(c.jitMasking) && c.jitMasking > u) && e.push(!1 === i ? f.nativeDef : it(u, f))), u++; while ((yt === r || u < yt) && (null !== f.fn || "" !== f.def) || t > u);
                return "" === e[e.length - 1] && e.pop(), y().maskLength = u + 1, e
            }

            function y() {
                return s
            }

            function rt(n) {
                var t = y();
                t.buffer = r;
                !0 !== n && (t.validPositions = {}, t.p = 0)
            }

            function b(n, t, i) {
                var f = -1,
                    e = -1,
                    o = i || y().validPositions,
                    s, u;
                n === r && (n = -1);
                for (s in o) u = parseInt(s), o[u] && (t || !0 !== o[u].generatedInput) && (u <= n && (f = u), u >= n && (e = u));
                return -1 !== f && n - f > 1 || e < n ? f : e
            }

            function pi(t, i, u, f) {
                var e, o = t,
                    h = n.extend(!0, {}, y().validPositions),
                    l = !1,
                    s;
                for (y().p = t, e = i - 1; e >= o; e--) y().validPositions[e] !== r && (!0 !== u && (!y().validPositions[e].match.optionality && function(n) {
                    var t = y().validPositions[n],
                        i, u;
                    return t !== r && null === t.match.fn ? (i = y().validPositions[n - 1], u = y().validPositions[n + 1], i !== r && u !== r) : !1
                }(e) || !1 === c.canClearPosition(y(), e, b(), f, c)) || delete y().validPositions[e]);
                for (rt(!0), e = o + 1; e <= b();) {
                    for (; y().validPositions[o] !== r;) o++;
                    (e < o && (e = o + 1), y().validPositions[e] === r && ft(e)) ? e++ : (s = ct(e), !1 === l && h[o] && h[o].match.def === s.match.def ? (y().validPositions[o] = n.extend(!0, {}, h[o]), y().validPositions[o].input = s.input, delete y().validPositions[e], e++) : wi(o, s.match.def) ? !1 !== lt(o, s.input || it(e), !0) && (delete y().validPositions[e], e++, l = !0) : ft(e) || (e++, o--), o++)
                }
                rt(!0)
            }

            function pt(n, t) {
                for (var i, e = n, o = b(), u = y().validPositions[o] || et(0)[0], s = u.alternation !== r ? u.locator[u.alternation].toString().split(",") : [], f = 0; f < e.length && (!((i = e[f]).match && (c.greedy && !0 !== i.match.optionalQuantifier || (!1 === i.match.optionality || !1 === i.match.newBlockMarker) && !0 !== i.match.optionalQuantifier) && (u.alternation === r || u.alternation !== i.alternation || i.locator[u.alternation] !== r && oi(i.locator[u.alternation].toString().split(","), s))) || !0 === t && (null !== i.match.fn || /[0-9a-bA-Z]/.test(i.match.def))); f++);
                return i
            }

            function ct(n, t, i) {
                return y().validPositions[n] || pt(et(n, t ? t.slice() : t, i))
            }

            function vt(n) {
                return y().validPositions[n] ? y().validPositions[n] : et(n)[0]
            }

            function wi(n, t) {
                for (var u = !1, r = et(n), i = 0; i < r.length; i++)
                    if (r[i].match && r[i].match.def === t) {
                        u = !0;
                        break
                    }
                return u
            }

            function et(t, i, u) {
                function p(i, u, o, h) {
                    function l(o, h, w) {
                        function lt(t, i) {
                            var r = 0 === n.inArray(t, i.matches);
                            return r || n.each(i.matches, function(n, u) {
                                if (!0 === u.isQuantifier && (r = lt(t, i.matches[n - 1]))) return !1
                            }), r
                        }

                        function vt(t, i, u) {
                            var f, o;
                            if (y().validPositions[t - 1] && u && y().tests[t])
                                for (var s = y().validPositions[t - 1].locator, h = y().tests[t][0].locator, e = 0; e < u; e++)
                                    if (s[e] !== h[e]) return s.slice(u + 1);
                            return (y().tests[t] || y().validPositions[t]) && n.each(y().tests[t] || [y().validPositions[t]], function(n, t) {
                                var s = u !== r ? u : t.alternation,
                                    e = t.locator[s] !== r ? t.locator[s].toString().indexOf(i) : -1;
                                (o === r || e < o) && -1 !== e && (f = t, o = e)
                            }), f ? f.locator.slice((u !== r ? u : f.alternation) + 1) : u !== r ? vt(t, i) : r
                        }
                        var yt, ot, ut, st, b, ft, ht, k, rt, it, ct;
                        if (e > 1e4) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + y().mask;
                        if (e === t && o.matches === r) return f.push({
                            match: o,
                            locator: h.reverse(),
                            cd: v
                        }), !0;
                        if (o.matches !== r) {
                            if (o.isGroup && w !== o) {
                                if (o = l(i.matches[n.inArray(o, i.matches) + 1], h)) return !0
                            } else if (o.isOptional) {
                                if (yt = o, o = p(o, u, h, w)) {
                                    if (s = f[f.length - 1].match, !lt(s, yt)) return !0;
                                    a = !0;
                                    e = t
                                }
                            } else if (o.isAlternator) {
                                var at, et = o,
                                    d = [],
                                    bt = f.slice(),
                                    pt = h.length,
                                    g = u.length > 0 ? u.shift() : -1;
                                if (-1 === g || "string" == typeof g) {
                                    var nt, kt = e,
                                        wt = u.slice(),
                                        tt = [];
                                    if ("string" == typeof g) tt = g.split(",");
                                    else
                                        for (nt = 0; nt < et.matches.length; nt++) tt.push(nt);
                                    for (ot = 0; ot < tt.length; ot++)
                                        for ((nt = parseInt(tt[ot]), f = [], u = vt(e, nt, pt) || wt.slice(), !0 !== (o = l(et.matches[nt] || i.matches[nt], [nt].concat(h), w) || o) && o !== r && tt[tt.length - 1] < et.matches.length) && (ut = n.inArray(o, i.matches) + 1, i.matches.length > ut && (o = l(i.matches[ut], [ut].concat(h.slice(1, h.length)), w)) && (tt.push(ut.toString()), n.each(f, function(n, t) {
                                                t.alternation = h.length - 1
                                            }))), at = f.slice(), e = kt, f = [], st = 0; st < at.length; st++) {
                                            for (b = at[st], ft = !1, b.alternation = b.alternation || pt, ht = 0; ht < d.length; ht++)
                                                if (k = d[ht], "string" != typeof g || -1 !== n.inArray(b.locator[b.alternation].toString(), tt)) {
                                                    if (function(n, t) {
                                                            return n.match.nativeDef === t.match.nativeDef || n.match.def === t.match.nativeDef || n.match.nativeDef === t.match.def
                                                        }(b, k)) {
                                                        ft = !0;
                                                        b.alternation === k.alternation && -1 === k.locator[k.alternation].toString().indexOf(b.locator[b.alternation]) && (k.locator[k.alternation] = k.locator[k.alternation] + "," + b.locator[b.alternation], k.alternation = b.alternation);
                                                        b.match.nativeDef === k.match.def && (b.locator[b.alternation] = k.locator[k.alternation], d.splice(d.indexOf(k), 1, b));
                                                        break
                                                    }
                                                    if (b.match.def === k.match.def) {
                                                        ft = !1;
                                                        break
                                                    }
                                                    if (function(n, i) {
                                                            return null === n.match.fn && null !== i.match.fn && i.match.fn.test(n.match.def, y(), t, !1, c, !1)
                                                        }(b, k) || function(n, i) {
                                                            return null !== n.match.fn && null !== i.match.fn && i.match.fn.test(n.match.def.replace(/[\[\]]/g, ""), y(), t, !1, c, !1)
                                                        }(b, k)) {
                                                        b.alternation === k.alternation && -1 === b.locator[b.alternation].toString().indexOf(k.locator[k.alternation].toString().split("")[0]) && (b.na = b.na || b.locator[b.alternation].toString(), -1 === b.na.indexOf(b.locator[b.alternation].toString().split("")[0]) && (b.na = b.na + "," + b.locator[k.alternation].toString().split("")[0]), ft = !0, b.locator[b.alternation] = k.locator[k.alternation].toString().split("")[0] + "," + b.locator[b.alternation], d.splice(d.indexOf(k), 0, b));
                                                        break
                                                    }
                                                }
                                            ft || d.push(b)
                                        }
                                    "string" == typeof g && (d = n.map(d, function(t, i) {
                                        var u, e, f;
                                        if (isFinite(i)) {
                                            for (u = t.alternation, e = t.locator[u].toString().split(","), t.locator[u] = r, t.alternation = r, f = 0; f < e.length; f++) - 1 !== n.inArray(e[f], tt) && (t.locator[u] !== r ? (t.locator[u] += ",", t.locator[u] += e[f]) : t.locator[u] = parseInt(e[f]), t.alternation = u);
                                            if (t.locator[u] !== r) return t
                                        }
                                    }));
                                    f = bt.concat(d);
                                    e = t;
                                    a = f.length > 0;
                                    o = d.length > 0;
                                    u = wt.slice()
                                } else o = l(et.matches[g] || i.matches[g], [g].concat(h), w);
                                if (o) return !0
                            } else if (o.isQuantifier && w !== i.matches[n.inArray(o, i.matches) - 1]) {
                                for (rt = o, it = u.length > 0 ? u.shift() : 0; it < (isNaN(rt.quantifier.max) ? it + 1 : rt.quantifier.max) && e <= t; it++)
                                    if (ct = i.matches[n.inArray(rt, i.matches) - 1], o = l(ct, [it].concat(h), ct)) {
                                        if (s = f[f.length - 1].match, s.optionalQuantifier = it > rt.quantifier.min - 1, lt(s, ct)) {
                                            if (it > rt.quantifier.min - 1) {
                                                a = !0;
                                                e = t;
                                                break
                                            }
                                            return !0
                                        }
                                        return !0
                                    }
                            } else if (o = p(o, u, h, w)) return !0
                        } else e++
                    }
                    for (var b, w = u.length > 0 ? u.shift() : 0; w < i.matches.length; w++)
                        if (!0 !== i.matches[w].isQuantifier) {
                            if (b = l(i.matches[w], [w].concat(o), h), b && e === t) return b;
                            if (e > t) break
                        }
                }

                function w(n) {
                    if (c.keepStatic && t > 0 && n.length > 1 + ("" === n[n.length - 1].match.def ? 1 : 0) && !0 !== n[0].match.optionality && !0 !== n[0].match.optionalQuantifier && null === n[0].match.fn && !/[0-9a-bA-Z]/.test(n[0].match.def)) {
                        if (y().validPositions[t - 1] === r) return [pt(n)];
                        if (y().validPositions[t - 1].alternation === n[0].alternation) return [pt(n)];
                        if (y().validPositions[t - 1]) return [pt(n)]
                    }
                    return n
                }
                var s, k = y().maskToken,
                    e = i ? u : 0,
                    l = i ? i.slice() : [0],
                    f = [],
                    a = !1,
                    v = i ? i.join("") : "",
                    b, o, h;
                if (t > -1) {
                    if (i === r) {
                        for (o = t - 1;
                            (b = y().validPositions[o] || y().tests[o]) === r && o > -1;) o--;
                        b !== r && o > -1 && (l = function(t) {
                            var i = [];
                            return n.isArray(t) || (t = [t]), t.length > 0 && (t[0].alternation === r ? 0 === (i = pt(t.slice()).locator.slice()).length && (i = t[0].locator.slice()) : n.each(t, function(n, t) {
                                if ("" !== t.def)
                                    if (0 === i.length) i = t.locator.slice();
                                    else
                                        for (var r = 0; r < i.length; r++) t.locator[r] && -1 === i[r].toString().indexOf(t.locator[r]) && (i[r] += "," + t.locator[r])
                            })), i
                        }(b), v = l.join(""), e = o)
                    }
                    if (y().tests[t] && y().tests[t][0].cd === v) return w(y().tests[t]);
                    for (h = l.shift(); h < k.length && !(p(k[h], l, [h]) && e === t || e > t); h++);
                }
                return (0 === f.length || a) && f.push({
                    match: {
                        fn: null,
                        cardinality: 0,
                        optionality: !0,
                        casing: null,
                        def: "",
                        placeholder: ""
                    },
                    locator: [],
                    cd: v
                }), i !== r && y().tests[t] ? w(n.extend(!0, [], f)) : (y().tests[t] = n.extend(!0, [], f), w(y().tests[t]))
            }

            function ut() {
                return y()._buffer === r && (y()._buffer = ti(!1, 1), y().buffer === r && (y().buffer = y()._buffer.slice())), y()._buffer
            }

            function w(n) {
                return y().buffer !== r && !0 !== n || (y().buffer = ti(!0, b(), !0)), y().buffer
            }

            function gt(n, t, i) {
                var u, e, f;
                if (!0 === n) rt(), n = 0, t = i.length;
                else
                    for (u = n; u < t; u++) delete y().validPositions[u];
                for (e = n, u = n; u < t; u++)(rt(!0), i[u] !== c.skipOptionalPartCharacter) && (f = lt(e, i[u], !0, !0), !1 !== f && (rt(!0), e = f.caret !== r ? f.caret : f.pos + 1))
            }

            function di(t, i, r) {
                var f, e;
                switch (c.casing || i.casing) {
                    case "upper":
                        t = t.toUpperCase();
                        break;
                    case "lower":
                        t = t.toLowerCase();
                        break;
                    case "title":
                        f = y().validPositions[r - 1];
                        t = 0 === r || f && f.input === String.fromCharCode(u.keyCode.SPACE) ? t.toUpperCase() : t.toLowerCase();
                        break;
                    default:
                        n.isFunction(c.casing) && (e = Array.prototype.slice.call(arguments), e.push(y().validPositions), t = c.casing.apply(this, e))
                }
                return t
            }

            function oi(t, i, u) {
                for (var f, o, l = c.greedy ? i : i.slice(0, 1), s = !1, h = u !== r ? u.split(",") : [], e = 0; e < h.length; e++) - 1 !== (o = t.indexOf(h[e])) && t.splice(o, 1);
                for (f = 0; f < t.length; f++)
                    if (-1 !== n.inArray(t[f], l)) {
                        s = !0;
                        break
                    }
                return s
            }

            function lt(t, i, f, e, o, s) {
                function p(n) {
                    var t = nt ? n.begin - n.end > 1 || n.begin - n.end == 1 : n.end - n.begin > 1 || n.end - n.begin == 1;
                    return t && 0 === n.begin && n.end === y().maskLength ? "full" : t
                }

                function d(i, u, f) {
                    var o = !1;
                    return n.each(et(i), function(s, h) {
                        for (var v, a, nt, k, l = h.match, tt = u ? 1 : 0, d = "", g = l.cardinality; g > tt; g--) d += gi(i - (g - 1));
                        if (u && (d += u), w(!0), !1 !== (o = null != l.fn ? l.fn.test(d, y(), i, f, c, p(t)) : (u === l.def || u === c.skipOptionalPartCharacter) && "" !== l.def && {
                                c: it(i, l, !0) || l.def,
                                pos: i
                            })) {
                            if (v = o.c !== r ? o.c : u, v = v === c.skipOptionalPartCharacter && null === l.fn ? it(i, l, !0) || l.def : v, a = i, nt = w(), o.remove !== r && (n.isArray(o.remove) || (o.remove = [o.remove]), n.each(o.remove.sort(function(n, t) {
                                    return t - n
                                }), function(n, t) {
                                    pi(t, t + 1, !0)
                                })), o.insert !== r && (n.isArray(o.insert) || (o.insert = [o.insert]), n.each(o.insert.sort(function(n, t) {
                                    return n - t
                                }), function(n, t) {
                                    lt(t.pos, t.c, !0, e)
                                })), o.refreshFromBuffer) {
                                if (k = o.refreshFromBuffer, gt(!0 === k ? k : k.start, k.end, nt), o.pos === r && o.c === r) return o.pos = b(), !1;
                                if ((a = o.pos !== r ? o.pos : i) !== i) return o = n.extend(o, lt(a, v, !0, e)), !1
                            } else if (!0 !== o && o.pos !== r && o.pos !== i && (a = o.pos, gt(i, a, w().slice()), a !== i)) return o = n.extend(o, lt(a, v, !0)), !1;
                            return (!0 === o || o.pos !== r || o.c !== r) && (s > 0 && rt(!0), ut(a, n.extend({}, h, {
                                input: di(v, l, a)
                            }), e, p(t)) || (o = !1), !1)
                        }
                    }), o
                }

                function ut(t, i, u, f) {
                    var o, h, p, s, e, v;
                    if (f || c.insertMode && y().validPositions[t] !== r && u === r) {
                        for (h = n.extend(!0, {}, y().validPositions), p = b(r, !0), o = t; o <= p; o++) delete y().validPositions[o];
                        y().validPositions[t] = n.extend(!0, {}, i);
                        var a, l = !0,
                            w = y().validPositions,
                            k = !1,
                            d = y().maskLength;
                        for (o = a = t; o <= p; o++) {
                            if (s = h[o], s !== r)
                                for (e = a; e < y().maskLength && (null === s.match.fn && w[o] && (!0 === w[o].match.optionalQuantifier || !0 === w[o].match.optionality) || null != s.match.fn);) {
                                    if (e++, !1 === k && h[e] && h[e].match.def === s.match.def) y().validPositions[e] = n.extend(!0, {}, h[e]), y().validPositions[e].input = s.input, ot(e), a = e, l = !0;
                                    else if (wi(e, s.match.def)) v = lt(e, s.input, !0, !0), l = !1 !== v, a = v.caret || v.insert ? b() : e, k = !0;
                                    else if (!(l = !0 === s.generatedInput) && e >= y().maskLength - 1) break;
                                    if (y().maskLength < d && (y().maskLength = d), l) break
                                }
                            if (!l) break
                        }
                        if (!l) return y().validPositions = n.extend(!0, {}, h), rt(!0), !1
                    } else y().validPositions[t] = n.extend(!0, {}, i);
                    return rt(!0), !0
                }

                function ot(t) {
                    for (var u, f, i = t - 1; i > -1 && !y().validPositions[i]; i--);
                    for (i++; i < t; i++) y().validPositions[i] === r && (!1 === c.jitMasking || c.jitMasking > i) && ("" === (f = et(i, ct(i - 1).locator, i - 1).slice())[f.length - 1].match.def && f.pop(), (u = pt(f)) && (u.match.def === c.radixPointDefinitionSymbol || !ft(i, !0) || n.inArray(c.radixPoint, w()) < i && u.match.fn && u.match.fn.test(it(i), y(), i, !1, c)) && !1 !== (h = d(i, it(i, u.match, !0) || (null == u.match.fn ? u.match.def : "" !== it(i) ? it(i) : w()[i]), !0)) && (y().validPositions[h.pos || i].generatedInput = !0))
                }
                var l, h, st, tt, v, ht, a, k;
                if (f = !0 === f, l = t, t.begin !== r && (l = nt && !p(t) ? t.end : t.begin), h = !0, st = n.extend(!0, {}, y().validPositions), n.isFunction(c.preValidation) && !f && !0 !== e && !0 !== s && (h = c.preValidation(w(), l, i, p(t), c)), !0 === h) {
                    if (ot(l), p(t) && (hi(r, u.keyCode.DELETE, t, !0, !0), l = y().p), l < y().maskLength && (yt === r || l < yt) && (h = d(l, i, f), (!f || !0 === e) && !1 === h && !0 !== s))
                        if (tt = y().validPositions[l], tt && null === tt.match.fn && (tt.match.def === i || i === c.skipOptionalPartCharacter)) h = {
                            caret: g(l)
                        };
                        else if ((c.insertMode || y().validPositions[g(l)] === r) && !ft(l, !0))
                        for (v = l + 1, ht = g(l); v <= ht; v++)
                            if (!1 !== (h = d(v, i, f))) {
                                ! function(t, i) {
                                    var o = y().validPositions[i];
                                    if (o)
                                        for (var s = o.locator, c = s.length, f = t; f < i; f++)
                                            if (y().validPositions[f] === r && !ft(f, !0)) {
                                                var e = et(f).slice(),
                                                    u = pt(e, !0),
                                                    h = -1;
                                                "" === e[e.length - 1].match.def && e.pop();
                                                n.each(e, function(n, t) {
                                                    for (var i = 0; i < c; i++) {
                                                        if (t.locator[i] === r || !oi(t.locator[i].toString().split(","), s[i].toString().split(","), t.na)) {
                                                            var f = s[i],
                                                                e = u.locator[i],
                                                                o = t.locator[i];
                                                            f - e > Math.abs(f - o) && (u = t);
                                                            break
                                                        }
                                                        h < i && (h = i, u = t)
                                                    }
                                                });
                                                (u = n.extend({}, u, {
                                                    input: it(f, u.match, !0) || u.match.def
                                                })).generatedInput = !0;
                                                ut(f, u, !0);
                                                y().validPositions[i] = r;
                                                d(i, o.input, !0)
                                            }
                                }(l, h.pos !== r ? h.pos : v);
                                l = v;
                                break
                            }!1 === h && c.keepStatic && !f && !0 !== o && (h = function(t, i, u) {
                        for (var g, s, a, o, v, l, f, tt = n.extend(!0, {}, y().validPositions), p = !1, k = b(), w, d, nt, h = y().validPositions[k]; k >= 0; k--)
                            if ((a = y().validPositions[k]) && a.alternation !== r) {
                                if (g = k, s = y().validPositions[g].alternation, h.locator[a.alternation] !== a.locator[a.alternation]) break;
                                h = a
                            }
                        return s !== r && (f = parseInt(g), w = h.locator[h.alternation || s] !== r ? h.locator[h.alternation || s] : l[0], w.length > 0 && (w = w.split(",")[0]), d = y().validPositions[f], nt = y().validPositions[f - 1], n.each(et(f, nt ? nt.locator : r, f - 1), function(h, a) {
                            var k, ot, ut, ft;
                            for (l = a.locator[s] ? a.locator[s].toString().split(",") : [], k = 0; k < l.length; k++) {
                                var g = [],
                                    it = 0,
                                    nt = 0,
                                    et = !1;
                                if (w < l[k] && (a.na === r || -1 === n.inArray(l[k], a.na.split(",")) || -1 === n.inArray(w.toString(), l))) {
                                    for (y().validPositions[f] = n.extend(!0, {}, a), ot = y().validPositions[f].locator, y().validPositions[f].locator[s] = parseInt(l[k]), null == a.match.fn ? (d.input !== a.match.def && (et = !0, !0 !== d.generatedInput && g.push(d.input)), nt++, y().validPositions[f].generatedInput = !/[0-9a-bA-Z]/.test(a.match.def), y().validPositions[f].input = a.match.def) : y().validPositions[f].input = d.input, o = f + 1; o < b(r, !0) + 1; o++)(v = y().validPositions[o]) && !0 !== v.generatedInput && /[0-9a-bA-Z]/.test(v.input) ? g.push(v.input) : o < t && it++, delete y().validPositions[o];
                                    for (et && g[0] === a.match.def && g.shift(), rt(!0), p = !0; g.length > 0;)
                                        if (ut = g.shift(), ut !== c.skipOptionalPartCharacter && !(p = lt(b(r, !0) + 1, ut, !1, e, !0))) break;
                                    if (p) {
                                        for (y().validPositions[f].locator = ot, ft = b(t) + 1, o = f + 1; o < b() + 1; o++)((v = y().validPositions[o]) === r || null == v.match.fn) && o < t + (nt - it) && nt++;
                                        p = lt((t += nt - it) > ft ? ft : t, i, u, e, !0)
                                    }
                                    if (p) return !1;
                                    rt();
                                    y().validPositions = n.extend(!0, {}, tt)
                                }
                            }
                        })), p
                    }(l, i, f));
                    !0 === h && (h = {
                        pos: l
                    })
                }
                return n.isFunction(c.postValidation) && !1 !== h && !f && !0 !== e && !0 !== s && (a = c.postValidation(w(!0), h, c), a.refreshFromBuffer && a.buffer && (k = a.refreshFromBuffer, gt(!0 === k ? k : k.start, k.end, a.buffer)), h = !0 === a ? h : a), h && h.pos === r && (h.pos = l), !1 !== h && !0 !== s || (rt(!0), y().validPositions = n.extend(!0, {}, st)), h
            }

            function ft(n, t) {
                var i = ct(n).match,
                    r;
                return ("" === i.def && (i = vt(n).match), null != i.fn) ? i.fn : !0 !== t && n > -1 ? (r = et(n), r.length > 1 + ("" === r[r.length - 1].match.def ? 1 : 0)) : !1
            }

            function g(n, t) {
                var i = y().maskLength,
                    r;
                if (n >= i) return i;
                for (r = n, et(i + 1).length > 1 && (ti(!0, i + 1, !0), i = y().maskLength); ++r < i && (!0 === t && (!0 !== vt(r).match.newBlockMarker || !ft(r)) || !0 !== t && !ft(r)););
                return r
            }

            function wt(n, t) {
                var r, i = n;
                if (i <= 0) return 0;
                for (; --i > 0 && (!0 === t && !0 !== vt(i).match.newBlockMarker || !0 !== t && !ft(i) && ((r = et(i)).length < 2 || 2 === r.length && "" === r[1].match.def)););
                return i
            }

            function gi(n) {
                return y().validPositions[n] === r ? it(n) : y().validPositions[n].input
            }

            function ot(t, i, u, f, e) {
                var o, s;
                f && n.isFunction(c.onBeforeWrite) && (o = c.onBeforeWrite.call(at, f, i, u, c), o && (o.refreshFromBuffer && (s = o.refreshFromBuffer, gt(!0 === s ? s : s.start, s.end, o.buffer || i), i = w(!0)), u !== r && (u = o.caret !== r ? o.caret : u)));
                t !== r && (t.inputmask._valueSet(i.join("")), u === r || f !== r && "blur" === f.type ? ci(t, u, 0 === i.length) : l && f && "input" === f.type ? setTimeout(function() {
                    k(t, u)
                }, 0) : k(t, u), !0 === e && (ri = !0, n(t).trigger("input")))
            }

            function it(t, i, u) {
                var s, f, o, e;
                if ((i = i || vt(t).match).placeholder !== r || !0 === u) return n.isFunction(i.placeholder) ? i.placeholder(c) : i.placeholder;
                if (null === i.fn) {
                    if (t > -1 && y().validPositions[t] === r && (f = et(t), o = [], f.length > 1 + ("" === f[f.length - 1].match.def ? 1 : 0)))
                        for (e = 0; e < f.length; e++)
                            if (!0 !== f[e].match.optionality && !0 !== f[e].match.optionalQuantifier && (null === f[e].match.fn || s === r || !1 !== f[e].match.fn.test(s.match.def, y(), t, !0, c)) && (o.push(f[e]), null === f[e].match.fn && (s = f[e]), o.length > 1 && /[0-9a-bA-Z]/.test(o[0].match.def))) return c.placeholder.charAt(t % c.placeholder.length);
                    return i.def
                }
                return c.placeholder.charAt(t % c.placeholder.length)
            }

            function bt(t, f, e, o, s) {
                function nt(n, t) {
                    return -1 !== ut().slice(n, g(n)).join("").indexOf(t) && !ft(n) && vt(n).match.nativeDef === t.charAt(t.length - 1)
                }
                var a = o.slice(),
                    p = "",
                    l = -1,
                    h = r,
                    k, v, d;
                (rt(), e || !0 === c.autoUnmask) ? l = g(l): (k = ut().slice(0, g(-1)).join(""), v = a.join("").match(new RegExp("^" + u.escapeRegex(k), "g")), v && v.length > 0 && (a.splice(0, v.length * k.length), l = g(l)));
                (-1 === l ? (y().p = g(l), l = 0) : y().p = l, n.each(a, function(i, u) {
                    var o, v, g, s;
                    if (u !== r)
                        if (y().validPositions[i] === r && a[i] === it(i) && ft(i, !0) && !1 === lt(i, a[i], !0, r, r, !0)) y().p++;
                        else {
                            o = new n.Event("_checkval");
                            o.which = u.charCodeAt(0);
                            p += u;
                            var f = b(r, !0),
                                k = y().validPositions[f],
                                d = ct(f + 1, k ? k.locator.slice() : r, f);
                            !nt(l, p) || e || c.autoUnmask ? (v = e ? i : null == d.match.fn && d.match.optionality && f + 1 < y().p ? f + 1 : y().p, h = tt.keypressEvent.call(t, o, !0, !1, e, v), l = v + 1, p = "") : h = tt.keypressEvent.call(t, o, !0, !1, !0, f + 1);
                            !1 !== h && !e && n.isFunction(c.onBeforeWrite) && (g = h, (h = c.onBeforeWrite.call(at, o, w(), h.forwardPosition, c), (h = n.extend(g, h)) && h.refreshFromBuffer) && (s = h.refreshFromBuffer, gt(!0 === s ? s : s.start, s.end, h.buffer), rt(!0), h.caret && (y().p = h.caret, h.forwardPosition = h.caret)))
                        }
                }), f) && (d = r, i.activeElement === t && h && (d = c.numericInput ? wt(h.forwardPosition) : h.forwardPosition), ot(t, w(), d, s || new n.Event("checkval"), s && "input" === s.type))
            }

            function bi(t) {
                var i, u, f, e, o;
                if (t) {
                    if (t.inputmask === r) return t.value;
                    t.inputmask && t.inputmask.refreshValue && tt.setValueEvent.call(t)
                }
                i = [];
                u = y().validPositions;
                for (f in u) u[f].match && null != u[f].match.fn && i.push(u[f].input);
                return e = 0 === i.length ? "" : (nt ? i.reverse() : i).join(""), n.isFunction(c.onUnMask) && (o = (nt ? w().slice().reverse() : w()).join(""), e = c.onUnMask.call(at, o, e, c)), e
            }

            function k(n, u, f, e) {
                function s(n) {
                    return !0 === e || !nt || "number" != typeof n || c.greedy && "" === c.placeholder || (n = w().join("").length - n), n
                }
                var o, h, a, l;
                if (u === r) return n.setSelectionRange ? (u = n.selectionStart, f = n.selectionEnd) : t.getSelection ? (o = t.getSelection().getRangeAt(0)).commonAncestorContainer.parentNode !== n && o.commonAncestorContainer !== n || (u = o.startOffset, f = o.endOffset) : i.selection && i.selection.createRange && (f = (u = 0 - (o = i.selection.createRange()).duplicate().moveStart("character", -n.inputmask._valueGet().length)) + o.text.length), {
                    begin: s(u),
                    end: s(f)
                };
                (u.begin !== r && (f = u.end, u = u.begin), "number" == typeof u) && (u = s(u), f = "number" == typeof(f = s(f)) ? f : u, h = parseInt(((n.ownerDocument.defaultView || t).getComputedStyle ? (n.ownerDocument.defaultView || t).getComputedStyle(n, null) : n.currentStyle).fontSize) * f, (n.scrollLeft = h > n.scrollWidth ? h : 0, v || !1 !== c.insertMode || u !== f || f++, n.setSelectionRange) ? (n.selectionStart = u, n.selectionEnd = f) : t.getSelection ? ((o = i.createRange(), n.firstChild === r || null === n.firstChild) && (a = i.createTextNode(""), n.appendChild(a)), o.setStart(n.firstChild, u < n.inputmask._valueGet().length ? u : n.inputmask._valueGet().length), o.setEnd(n.firstChild, f < n.inputmask._valueGet().length ? f : n.inputmask._valueGet().length), o.collapse(!0), l = t.getSelection(), l.removeAllRanges(), l.addRange(o)) : n.createTextRange && ((o = n.createTextRange()).collapse(!0), o.moveEnd("character", f), o.moveStart("character", u), o.select()), ci(n, {
                    begin: u,
                    end: f
                }))
            }

            function si(t) {
                for (var u, h = w(), e = h.length, c = b(), o = {}, f = y().validPositions[c], l = f !== r ? f.locator.slice() : r, s, i = c + 1; i < h.length; i++) l = (u = ct(i, l, i - 1)).locator.slice(), o[i] = n.extend(!0, {}, u);
                for (s = f && f.alternation !== r ? f.locator[f.alternation] : r, i = e - 1; i > c && ((u = o[i]).match.optionality || u.match.optionalQuantifier && u.match.newBlockMarker || s && (s !== o[i].locator[f.alternation] && null != u.match.fn || null === u.match.fn && u.locator[f.alternation] && oi(u.locator[f.alternation].toString().split(","), s.toString().split(",")) && "" !== et(i)[0].def)) && h[i] === it(i, u.match); i--) e--;
                return t ? {
                    l: e,
                    def: o[e] ? o[e].match : r
                } : e
            }

            function ni(n) {
                for (var i, t = si(), f = n.length, u = y().validPositions[b()]; t < f && !ft(t, !0) && (i = u !== r ? ct(t, u.locator.slice(""), u) : vt(t)) && !0 !== i.match.optionality && (!0 !== i.match.optionalQuantifier && !0 !== i.match.newBlockMarker || t + 1 === f && "" === (u !== r ? ct(t + 1, u.locator.slice(""), u) : vt(t + 1)).match.def);) t++;
                for (;
                    (i = y().validPositions[t - 1]) && i && i.match.optionality && i.input === c.skipOptionalPartCharacter;) t--;
                return n.splice(t), n
            }

            function kt(t) {
                var i, u;
                if (n.isFunction(c.isComplete)) return c.isComplete(t, c);
                if ("*" === c.repeat) return r;
                var e = !1,
                    f = si(!0),
                    o = wt(f.l);
                if (f.def === r || f.def.newBlockMarker || f.def.optionality || f.def.optionalQuantifier)
                    for (e = !0, i = 0; i <= o; i++)
                        if (u = ct(i).match, null !== u.fn && y().validPositions[i] === r && !0 !== u.optionality && !0 !== u.optionalQuantifier || null === u.fn && t[i] !== it(i, u)) {
                            e = !1;
                            break
                        }
                return e
            }

            function hi(t, i, f, e, o) {
                var h, s;
                if ((c.numericInput || nt) && (i === u.keyCode.BACKSPACE ? i = u.keyCode.DELETE : i === u.keyCode.DELETE && (i = u.keyCode.BACKSPACE), nt) && (h = f.end, f.end = f.begin, f.begin = h), i === u.keyCode.BACKSPACE && (f.end - f.begin < 1 || !1 === c.insertMode) ? (f.begin = wt(f.begin), y().validPositions[f.begin] !== r && y().validPositions[f.begin].input === c.groupSeparator && f.begin--) : i === u.keyCode.DELETE && f.begin === f.end && (f.end = ft(f.end, !0) && y().validPositions[f.end] && y().validPositions[f.end].input !== c.radixPoint ? f.end + 1 : g(f.end) + 1, y().validPositions[f.begin] !== r && y().validPositions[f.begin].input === c.groupSeparator && f.end++), pi(f.begin, f.end, !1, e), !0 !== e && function() {
                        var i, e;
                        if (c.keepStatic) {
                            for (var f = [], u = b(-1, !0), s = n.extend(!0, {}, y().validPositions), o = y().validPositions[u]; u >= 0; u--)
                                if (i = y().validPositions[u], i) {
                                    if (!0 !== i.generatedInput && /[0-9a-bA-Z]/.test(i.input) && f.push(i.input), delete y().validPositions[u], i.alternation !== r && i.locator[i.alternation] !== o.locator[i.alternation]) break;
                                    o = i
                                }
                            if (u > -1)
                                for (y().p = g(b(-1, !0)); f.length > 0;) e = new n.Event("keypress"), e.which = f.pop().charCodeAt(0), tt.keypressEvent.call(t, e, !0, !1, !1, y().p);
                            else y().validPositions = n.extend(!0, {}, s)
                        }
                    }(), s = b(f.begin, !0), s < f.begin) y().p = g(s);
                else if (!0 !== e && (y().p = f.begin, !0 !== o))
                    for (; y().p < s && y().validPositions[y().p] === r;) y().p++
            }

            function ki(r) {
                function e(n) {
                    var f, t = i.createElement("span"),
                        e, h, o, s, c, l;
                    for (e in u) isNaN(e) && -1 !== e.indexOf("font") && (t.style[e] = u[e]);
                    for (t.style.textTransform = u.textTransform, t.style.letterSpacing = u.letterSpacing, t.style.position = "absolute", t.style.height = "auto", t.style.width = "auto", t.style.visibility = "hidden", t.style.whiteSpace = "nowrap", i.body.appendChild(t), o = r.inputmask._valueGet(), s = 0, f = 0, h = o.length; f <= h; f++) {
                        if (t.innerHTML += o.charAt(f) || "_", t.offsetWidth >= n) {
                            c = n - s;
                            l = t.offsetWidth - n;
                            t.innerHTML = o.charAt(f);
                            f = (c -= t.offsetWidth / 3) < l ? f - 1 : f;
                            break
                        }
                        s = t.offsetWidth
                    }
                    return i.body.removeChild(t), f
                }
                var u = (r.ownerDocument.defaultView || t).getComputedStyle(r, null),
                    f = i.createElement("div");
                f.style.width = u.width;
                f.style.textAlign = u.textAlign;
                (dt = i.createElement("div")).className = "im-colormask";
                r.parentNode.insertBefore(dt, r);
                r.parentNode.removeChild(r);
                dt.appendChild(f);
                dt.appendChild(r);
                r.style.left = f.offsetLeft + "px";
                n(r).on("click", function(n) {
                    return k(r, e(n.clientX)), tt.clickEvent.call(r, [n])
                });
                n(r).on("keydown", function(n) {
                    n.shiftKey || !1 === c.insertMode || setTimeout(function() {
                        ci(r)
                    }, 0)
                })
            }

            function ci(n, t, u) {
                function l() {
                    h || null !== e.fn && o.input !== r ? h && (null !== e.fn && o.input !== r || "" === e.def) && (h = !1, s += "<\/span>") : (h = !0, s += "<span class='im-static'>")
                }

                function d(r) {
                    !0 !== r && f !== t.begin || i.activeElement !== n || (s += "<span class='im-caret' style='border-right-width: 1px;border-right-style: solid;'><\/span>")
                }
                var e, o, a, s = "",
                    h = !1,
                    f = 0,
                    g, v, p;
                if (dt !== r) {
                    if (g = w(), t === r ? t = k(n) : t.begin === r && (t = {
                            begin: t,
                            end: t
                        }), !0 !== u) {
                        v = b();
                        do d(), y().validPositions[f] ? (o = y().validPositions[f], e = o.match, a = o.locator.slice(), l(), s += g[f]) : (o = ct(f, a, f - 1), e = o.match, a = o.locator.slice(), (!1 === c.jitMasking || f < v || "number" == typeof c.jitMasking && isFinite(c.jitMasking) && c.jitMasking > f) && (l(), s += it(f, e))), f++; while ((yt === r || f < yt) && (null !== e.fn || "" !== e.def) || v > f || h); - 1 === s.indexOf("im-caret") && d(!0);
                        h && l()
                    }
                    p = dt.getElementsByTagName("div")[0];
                    p.innerHTML = s;
                    n.inputmask.positionColorMask(n, p)
                }
            }
            var st, ei;
            s = s || this.maskset;
            c = c || this.opts;
            var ht, ii, yt, dt, at = this,
                p = this.el,
                nt = this.isRTL,
                li = !1,
                ri = !1,
                ai = !1,
                ui = !1,
                d = {
                    on: function(t, i, f) {
                        var e = function(t) {
                            var i, o, s, e;
                            if (this.inputmask === r && "FORM" !== this.nodeName) i = n.data(this, "_inputmask_opts"), i ? new u(i).mask(this) : d.off(this);
                            else {
                                if ("setvalue" === t.type || "FORM" === this.nodeName || !(this.disabled || this.readOnly && !("keydown" === t.type && t.ctrlKey && 67 === t.keyCode || !1 === c.tabThrough && t.keyCode === u.keyCode.TAB))) {
                                    switch (t.type) {
                                        case "input":
                                            if (!0 === ri) return ri = !1, t.preventDefault();
                                            break;
                                        case "keydown":
                                            li = !1;
                                            ri = !1;
                                            break;
                                        case "keypress":
                                            if (!0 === li) return t.preventDefault();
                                            li = !0;
                                            break;
                                        case "click":
                                            if (h || a) return o = this, s = arguments, setTimeout(function() {
                                                f.apply(o, s)
                                            }, 0), !1
                                    }
                                    return e = f.apply(this, arguments), !1 === e && (t.preventDefault(), t.stopPropagation()), e
                                }
                                t.preventDefault()
                            }
                        };
                        t.inputmask.events[i] = t.inputmask.events[i] || [];
                        t.inputmask.events[i].push(e); - 1 !== n.inArray(i, ["submit", "reset"]) ? null !== t.form && n(t.form).on(i, e) : n(t).on(i, e)
                    },
                    off: function(t, i) {
                        if (t.inputmask && t.inputmask.events) {
                            var r;
                            i ? (r = [])[i] = t.inputmask.events[i] : r = t.inputmask.events;
                            n.each(r, function(i, r) {
                                for (; r.length > 0;) {
                                    var u = r.pop(); - 1 !== n.inArray(i, ["submit", "reset"]) ? null !== t.form && n(t.form).off(i, u) : n(t).off(i, u)
                                }
                                delete t.inputmask.events[i]
                            })
                        }
                    }
                },
                tt = {
                    keydownEvent: function(t) {
                        var f = this,
                            s = n(f),
                            e = t.keyCode,
                            r = k(f),
                            o;
                        e === u.keyCode.BACKSPACE || e === u.keyCode.DELETE || a && e === u.keyCode.BACKSPACE_SAFARI || t.ctrlKey && e === u.keyCode.X && ! function(n) {
                            var t = i.createElement("input"),
                                r = "on" + n,
                                u = r in t;
                            return u || (t.setAttribute(r, "return;"), u = "function" == typeof t[r]), t = null, u
                        }("cut") ? (t.preventDefault(), hi(f, e, r), ot(f, w(!0), y().p, t, f.inputmask._valueGet() !== w().join("")), f.inputmask._valueGet() === ut().join("") ? s.trigger("cleared") : !0 === kt(w()) && s.trigger("complete")) : e === u.keyCode.END || e === u.keyCode.PAGE_DOWN ? (t.preventDefault(), o = g(b()), c.insertMode || o !== y().maskLength || t.shiftKey || o--, k(f, t.shiftKey ? r.begin : o, o, !0)) : e === u.keyCode.HOME && !t.shiftKey || e === u.keyCode.PAGE_UP ? (t.preventDefault(), k(f, 0, t.shiftKey ? r.begin : 0, !0)) : (c.undoOnEscape && e === u.keyCode.ESCAPE || 90 === e && t.ctrlKey) && !0 !== t.altKey ? (bt(f, !0, !1, ht.split("")), s.trigger("click")) : e !== u.keyCode.INSERT || t.shiftKey || t.ctrlKey ? !0 === c.tabThrough && e === u.keyCode.TAB ? (!0 === t.shiftKey ? (null === vt(r.begin).match.fn && (r.begin = g(r.begin)), r.end = wt(r.begin, !0), r.begin = wt(r.end, !0)) : (r.begin = g(r.begin, !0), r.end = g(r.begin, !0), r.end < y().maskLength && r.end--), r.begin < y().maskLength && (t.preventDefault(), k(f, r.begin, r.end))) : t.shiftKey || !1 === c.insertMode && (e === u.keyCode.RIGHT ? setTimeout(function() {
                            var n = k(f);
                            k(f, n.begin)
                        }, 0) : e === u.keyCode.LEFT && setTimeout(function() {
                            var n = k(f);
                            k(f, nt ? n.begin + 1 : n.begin - 1)
                        }, 0)) : (c.insertMode = !c.insertMode, k(f, c.insertMode || r.begin !== y().maskLength ? r.begin : r.begin - 1));
                        c.onKeyDown.call(this, t, w(), k(f).begin, c);
                        ai = -1 !== n.inArray(e, c.ignorables)
                    },
                    keypressEvent: function(t, i, f, e, o) {
                        var a = this,
                            p = n(a),
                            h = t.which || t.charCode || t.keyCode,
                            l, b, d, s, v;
                        return !(!0 === i || t.ctrlKey && t.altKey) && (t.ctrlKey || t.metaKey || ai) ? (h === u.keyCode.ENTER && ht !== w().join("") && (ht = w().join(""), setTimeout(function() {
                            p.trigger("change")
                        }, 0)), !0) : h && (46 === h && !1 === t.shiftKey && "" !== c.radixPoint && (h = c.radixPoint.charCodeAt(0)), b = i ? {
                            begin: o,
                            end: o
                        } : k(a), d = String.fromCharCode(h), y().writeOutBuffer = !0, s = lt(b, d, e), (!1 !== s && (rt(!0), l = s.caret !== r ? s.caret : i ? s.pos + 1 : g(s.pos), y().p = l), !1 !== f && (setTimeout(function() {
                            c.onKeyValidation.call(a, h, s, c)
                        }, 0), y().writeOutBuffer && !1 !== s)) && (v = w(), ot(a, v, c.numericInput && s.caret === r ? wt(l) : l, t, !0 !== i), !0 !== i && setTimeout(function() {
                            !0 === kt(v) && p.trigger("complete")
                        }, 0)), t.preventDefault(), i) ? (!1 !== s && (s.forwardPosition = l), s) : void 0
                    },
                    pasteEvent: function(i) {
                        var h, s = this,
                            l = i.originalEvent || i,
                            a = n(s),
                            r = s.inputmask._valueGet(!0),
                            u = k(s),
                            f, e, o;
                        if (nt && (h = u.end, u.end = u.begin, u.begin = h), f = r.substr(0, u.begin), e = r.substr(u.end, r.length), f === (nt ? ut().reverse() : ut()).slice(0, u.begin).join("") && (f = ""), e === (nt ? ut().reverse() : ut()).slice(u.end).join("") && (e = ""), nt && (h = f, f = e, e = h), t.clipboardData && t.clipboardData.getData) r = f + t.clipboardData.getData("Text") + e;
                        else {
                            if (!l.clipboardData || !l.clipboardData.getData) return !0;
                            r = f + l.clipboardData.getData("text/plain") + e
                        }
                        if (o = r, n.isFunction(c.onBeforePaste)) {
                            if (!1 === (o = c.onBeforePaste.call(at, r, c))) return i.preventDefault();
                            o || (o = r)
                        }
                        return bt(s, !1, !1, nt ? o.split("").reverse() : o.toString().split("")), ot(s, w(), g(b()), i, ht !== w().join("")), !0 === kt(w()) && a.trigger("complete"), i.preventDefault()
                    },
                    inputFallBackEvent: function(t) {
                        var r = this,
                            e = r.inputmask._valueGet(),
                            f, g, a;
                        if (w().join("") !== e) {
                            if ((f = k(r), !1 === function(t, i, r) {
                                    if ("." === i.charAt(r.begin - 1) && "" !== c.radixPoint && ((i = i.split(""))[r.begin - 1] = c.radixPoint.charAt(0), i = i.join("")), i.charAt(r.begin - 1) === c.radixPoint && i.length > w().length) {
                                        var u = new n.Event("keypress");
                                        return u.which = c.radixPoint.charCodeAt(0), tt.keypressEvent.call(t, u, !0, !0, !1, r.begin - 1), !1
                                    }
                                }(r, e, f)) || (e = e.replace(new RegExp("(" + u.escapeRegex(ut().join("")) + ")*"), ""), !1 === function(t, i, r) {
                                    var u, f;
                                    if (h && (u = i.replace(w().join(""), ""), 1 === u.length)) return f = new n.Event("keypress"), f.which = u.charCodeAt(0), tt.keypressEvent.call(t, f, !0, !0, !1, y().validPositions[r.begin - 1] ? r.begin : r.begin - 1), !1
                                }(r, e, f))) return !1;
                            f.begin > e.length && (k(r, e.length), f = k(r));
                            var d = w().join(""),
                                o = e.substr(0, f.begin),
                                s = e.substr(f.begin),
                                v = d.substr(0, f.begin),
                                l = d.substr(f.begin),
                                i = f,
                                p = "",
                                b = !1;
                            if (o !== v) {
                                for (i.begin = 0, g = (b = o.length >= v.length) ? o.length : v.length, a = 0; o.charAt(a) === v.charAt(a) && a < g; a++) i.begin++;
                                b && (p += o.slice(i.begin, i.end))
                            }
                            s !== l && (s.length > l.length ? b && (i.end = i.begin) : s.length < l.length ? i.end += l.length - s.length : s.charAt(0) !== l.charAt(0) && i.end++);
                            ot(r, w(), i);
                            p.length > 0 ? n.each(p.split(""), function(t, i) {
                                var u = new n.Event("keypress");
                                u.which = i.charCodeAt(0);
                                ai = !1;
                                tt.keypressEvent.call(r, u)
                            }) : (i.begin === i.end - 1 && k(r, wt(i.begin + 1), i.end), t.keyCode = u.keyCode.DELETE, tt.keydownEvent.call(r, t));
                            t.preventDefault()
                        }
                    },
                    setValueEvent: function() {
                        this.inputmask.refreshValue = !1;
                        var i = this,
                            t = i.inputmask._valueGet(!0);
                        n.isFunction(c.onBeforeMask) && (t = c.onBeforeMask.call(at, t, c) || t);
                        t = t.split("");
                        bt(i, !0, !1, nt ? t.reverse() : t);
                        ht = w().join("");
                        (c.clearMaskOnLostFocus || c.clearIncomplete) && i.inputmask._valueGet() === ut().join("") && i.inputmask._valueSet("")
                    },
                    focusEvent: function(n) {
                        var t = this,
                            i = t.inputmask._valueGet();
                        c.showMaskOnFocus && (!c.showMaskOnHover || c.showMaskOnHover && "" === i) && (t.inputmask._valueGet() !== w().join("") ? ot(t, w(), g(b())) : !1 === ui && k(t, g(b())));
                        !0 === c.positionCaretOnTab && !1 === ui && "" !== i && (ot(t, w(), k(t)), tt.clickEvent.apply(t, [n, !0]));
                        ht = w().join("")
                    },
                    mouseleaveEvent: function() {
                        var n = this,
                            t, r;
                        (ui = !1, c.clearMaskOnLostFocus && i.activeElement !== n) && (t = w().slice(), r = n.inputmask._valueGet(), r !== n.getAttribute("placeholder") && "" !== r && (-1 === b() && r === ut().join("") ? t = [] : ni(t), ot(n, t)))
                    },
                    clickEvent: function(t, u) {
                        function e(t) {
                            var i, f, u;
                            if ("" !== c.radixPoint && (i = y().validPositions, i[t] === r || i[t].input === it(t))) {
                                if (t < g(-1)) return !0;
                                if (f = n.inArray(c.radixPoint, w()), -1 !== f) {
                                    for (u in i)
                                        if (f < u && i[u].input !== it(u)) return !1;
                                    return !0
                                }
                            }
                            return !1
                        }
                        var f = this;
                        setTimeout(function() {
                            var n, h, v;
                            if (i.activeElement === f && (n = k(f), u && (nt ? n.end = n.begin : n.begin = n.end), n.begin === n.end)) switch (c.positionCaretOnClick) {
                                case "none":
                                    break;
                                case "radixFocus":
                                    if (e(n.begin)) {
                                        h = w().join("").indexOf(c.radixPoint);
                                        k(f, c.numericInput ? g(h) : h);
                                        break
                                    }
                                default:
                                    var o = n.begin,
                                        p = b(o, !0),
                                        t = g(p);
                                    if (o < t) k(f, ft(o, !0) || ft(o - 1, !0) ? o : g(o));
                                    else {
                                        var l = y().validPositions[p],
                                            s = ct(t, l ? l.match.locator : r, l),
                                            a = it(t, s.match);
                                        ("" === a || w()[t] === a || !0 === s.match.optionalQuantifier || !0 === s.match.newBlockMarker) && (ft(t, !0) || s.match.def !== a) || (v = g(t), (o >= v || o === t) && (t = v));
                                        k(f, t)
                                    }
                            }
                        }, 0)
                    },
                    dblclickEvent: function() {
                        var n = this;
                        setTimeout(function() {
                            k(n, 0, g(b()))
                        }, 0)
                    },
                    cutEvent: function(r) {
                        var f = this,
                            s = n(f),
                            e = k(f),
                            h = r.originalEvent || r,
                            c = t.clipboardData || h.clipboardData,
                            o = nt ? w().slice(e.end, e.begin) : w().slice(e.begin, e.end);
                        c.setData("text", nt ? o.reverse().join("") : o.join(""));
                        i.execCommand && i.execCommand("copy");
                        hi(f, u.keyCode.DELETE, e);
                        ot(f, w(), y().p, r, ht !== w().join(""));
                        f.inputmask._valueGet() === ut().join("") && s.trigger("cleared")
                    },
                    blurEvent: function(t) {
                        var e = n(this),
                            u = this,
                            f, i;
                        u.inputmask && (f = u.inputmask._valueGet(), i = w().slice(), "" !== f && (c.clearMaskOnLostFocus && (-1 === b() && f === ut().join("") ? i = [] : ni(i)), !1 === kt(i) && (setTimeout(function() {
                            e.trigger("incomplete")
                        }, 0), c.clearIncomplete && (rt(), i = c.clearMaskOnLostFocus ? [] : ut().slice())), ot(u, i, r, t)), ht !== w().join("") && (ht = i.join(""), e.trigger("change")))
                    },
                    mouseenterEvent: function() {
                        var n = this;
                        ui = !0;
                        i.activeElement !== n && c.showMaskOnHover && n.inputmask._valueGet() !== w().join("") && ot(n, w())
                    },
                    submitEvent: function() {
                        ht !== w().join("") && ii.trigger("change");
                        c.clearMaskOnLostFocus && -1 === b() && p.inputmask._valueGet && p.inputmask._valueGet() === ut().join("") && p.inputmask._valueSet("");
                        c.removeMaskOnSubmit && (p.inputmask._valueSet(p.inputmask.unmaskedvalue(), !0), setTimeout(function() {
                            ot(p, w())
                        }, 0))
                    },
                    resetEvent: function() {
                        p.inputmask.refreshValue = !0;
                        setTimeout(function() {
                            ii.trigger("setvalue")
                        }, 0)
                    }
                };
            if (u.prototype.positionColorMask = function(n, t) {
                    n.style.left = t.offsetLeft + "px"
                }, o !== r) switch (o.action) {
                case "isComplete":
                    return p = o.el, kt(w());
                case "unmaskedvalue":
                    return p !== r && o.value === r || (st = o.value, st = (n.isFunction(c.onBeforeMask) ? c.onBeforeMask.call(at, st, c) || st : st).split(""), bt(r, !1, !1, nt ? st.reverse() : st), n.isFunction(c.onBeforeWrite) && c.onBeforeWrite.call(at, r, w(), 0, c)), bi(p);
                case "mask":
                    ! function(t) {
                        var o, f, u;
                        d.off(t);
                        o = function(t, u) {
                            var s = t.getAttribute("type"),
                                f = "INPUT" === t.tagName && -1 !== n.inArray(s, u.supportsInputType) || t.isContentEditable || "TEXTAREA" === t.tagName,
                                o;
                            return f || ("INPUT" === t.tagName ? (o = i.createElement("input"), o.setAttribute("type", s), f = "text" === o.type, o = null) : f = "partial"), !1 !== f ? function(t) {
                                function h() {
                                    return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== b() || !0 !== u.nullable ? i.activeElement === this && u.clearMaskOnLostFocus ? (nt ? ni(w().slice()).reverse() : ni(w().slice())).join("") : f.call(this) : "" : f.call(this)
                                }

                                function c(t) {
                                    o.call(this, t);
                                    this.inputmask && n(this).trigger("setvalue")
                                }
                                var f, o, s;
                                t.inputmask.__valueGet || (!0 !== u.noValuePatching && (Object.getOwnPropertyDescriptor ? ("function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" === e("test".__proto__) ? function(n) {
                                    return n.__proto__
                                } : function(n) {
                                    return n.constructor.prototype
                                }), s = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(t), "value") : r, s && s.get && s.set ? (f = s.get, o = s.set, Object.defineProperty(t, "value", {
                                    get: h,
                                    set: c,
                                    configurable: !0
                                })) : "INPUT" !== t.tagName && (f = function() {
                                    return this.textContent
                                }, o = function(n) {
                                    this.textContent = n
                                }, Object.defineProperty(t, "value", {
                                    get: h,
                                    set: c,
                                    configurable: !0
                                }))) : i.__lookupGetter__ && t.__lookupGetter__("value") && (f = t.__lookupGetter__("value"), o = t.__lookupSetter__("value"), t.__defineGetter__("value", h), t.__defineSetter__("value", c)), t.inputmask.__valueGet = f, t.inputmask.__valueSet = o), t.inputmask._valueGet = function(n) {
                                    return nt && !0 !== n ? f.call(this.el).split("").reverse().join("") : f.call(this.el)
                                }, t.inputmask._valueSet = function(n, t) {
                                    o.call(this.el, null === n || n === r ? "" : !0 !== t && nt ? n.split("").reverse().join("") : n)
                                }, f === r && (f = function() {
                                    return this.value
                                }, o = function(n) {
                                    this.value = n
                                }, function(t) {
                                    if (n.valHooks && (n.valHooks[t] === r || !0 !== n.valHooks[t].inputmaskpatch)) {
                                        var i = n.valHooks[t] && n.valHooks[t].get ? n.valHooks[t].get : function(n) {
                                                return n.value
                                            },
                                            f = n.valHooks[t] && n.valHooks[t].set ? n.valHooks[t].set : function(n, t) {
                                                return n.value = t, n
                                            };
                                        n.valHooks[t] = {
                                            get: function(n) {
                                                if (n.inputmask) {
                                                    if (n.inputmask.opts.autoUnmask) return n.inputmask.unmaskedvalue();
                                                    var t = i(n);
                                                    return -1 !== b(r, r, n.inputmask.maskset.validPositions) || !0 !== u.nullable ? t : ""
                                                }
                                                return i(n)
                                            },
                                            set: function(t, i) {
                                                var r, u = n(t);
                                                return r = f(t, i), t.inputmask && u.trigger("setvalue"), r
                                            },
                                            inputmaskpatch: !0
                                        }
                                    }
                                }(t.type), function(t) {
                                    d.on(t, "mouseenter", function() {
                                        var t = n(this);
                                        this.inputmask._valueGet() !== w().join("") && t.trigger("setvalue")
                                    })
                                }(t)))
                            }(t) : t.inputmask = r, f
                        }(t, c);
                        !1 !== o && (p = t, ii = n(p), -1 === (yt = p !== r ? p.maxLength : r) && (yt = r), !0 === c.colorMask && ki(p), l && (p.hasOwnProperty("inputmode") && (p.inputmode = c.inputmode, p.setAttribute("inputmode", c.inputmode)), "rtfm" === c.androidHack && (!0 !== c.colorMask && ki(p), p.type = "password")), !0 === o && (d.on(p, "submit", tt.submitEvent), d.on(p, "reset", tt.resetEvent), d.on(p, "mouseenter", tt.mouseenterEvent), d.on(p, "blur", tt.blurEvent), d.on(p, "focus", tt.focusEvent), d.on(p, "mouseleave", tt.mouseleaveEvent), !0 !== c.colorMask && d.on(p, "click", tt.clickEvent), d.on(p, "dblclick", tt.dblclickEvent), d.on(p, "paste", tt.pasteEvent), d.on(p, "dragdrop", tt.pasteEvent), d.on(p, "drop", tt.pasteEvent), d.on(p, "cut", tt.cutEvent), d.on(p, "complete", c.oncomplete), d.on(p, "incomplete", c.onincomplete), d.on(p, "cleared", c.oncleared), l || !0 === c.inputEventOnly ? p.removeAttribute("maxLength") : (d.on(p, "keydown", tt.keydownEvent), d.on(p, "keypress", tt.keypressEvent)), d.on(p, "compositionstart", n.noop), d.on(p, "compositionupdate", n.noop), d.on(p, "compositionend", n.noop), d.on(p, "keyup", n.noop), d.on(p, "input", tt.inputFallBackEvent), d.on(p, "beforeinput", n.noop)), d.on(p, "setvalue", tt.setValueEvent), ht = ut().join(""), "" !== p.inputmask._valueGet(!0) || !1 === c.clearMaskOnLostFocus || i.activeElement === p) && (f = n.isFunction(c.onBeforeMask) ? c.onBeforeMask.call(at, p.inputmask._valueGet(!0), c) || p.inputmask._valueGet(!0) : p.inputmask._valueGet(!0), "" !== f && bt(p, !0, !1, nt ? f.split("").reverse() : f.split("")), u = w().slice(), ht = u.join(""), !1 === kt(u) && c.clearIncomplete && rt(), c.clearMaskOnLostFocus && i.activeElement !== p && (-1 === b() ? u = [] : ni(u)), ot(p, u), i.activeElement === p && k(p, g(b())))
                    }(p);
                    break;
                case "format":
                    return st = (n.isFunction(c.onBeforeMask) ? c.onBeforeMask.call(at, o.value, c) || o.value : o.value).split(""), bt(r, !0, !1, nt ? st.reverse() : st), o.metadata ? {
                        value: nt ? w().slice().reverse().join("") : w().join(""),
                        metadata: f.call(this, {
                            action: "getmetadata"
                        }, s, c)
                    } : nt ? w().slice().reverse().join("") : w().join("");
                case "isValid":
                    o.value ? (st = o.value.split(""), bt(r, !0, !0, nt ? st.reverse() : st)) : o.value = w().join("");
                    for (var vi = w(), yi = si(), fi = vi.length - 1; fi > yi && !ft(fi); fi--);
                    return vi.splice(yi, fi + 1 - yi), kt(vi) && o.value === w().join("");
                case "getemptymask":
                    return ut().join("");
                case "remove":
                    return p && p.inputmask && (ii = n(p), p.inputmask._valueSet(c.autoUnmask ? bi(p) : p.inputmask._valueGet(!0)), d.off(p), Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(p), "value") && p.inputmask.__valueGet && Object.defineProperty(p, "value", {
                        get: p.inputmask.__valueGet,
                        set: p.inputmask.__valueSet,
                        configurable: !0
                    }) : i.__lookupGetter__ && p.__lookupGetter__("value") && p.inputmask.__valueGet && (p.__defineGetter__("value", p.inputmask.__valueGet), p.__defineSetter__("value", p.inputmask.__valueSet)), p.inputmask = r), p;
                case "getmetadata":
                    return n.isArray(s.metadata) ? (ei = ti(!0, 0, !1).join(""), n.each(s.metadata, function(n, t) {
                        if (t.mask === ei) return ei = t, !1
                    }), ei) : s.metadata
            }
        }
        var s = navigator.userAgent,
            v = /mobile/i.test(s),
            h = /iemobile/i.test(s),
            a = /iphone/i.test(s) && !h,
            l = /android/i.test(s) && !h;
        return u.prototype = {
            dataAttribute: "data-inputmask",
            defaults: {
                placeholder: "_",
                optionalmarker: {
                    start: "[",
                    end: "]"
                },
                quantifiermarker: {
                    start: "{",
                    end: "}"
                },
                groupmarker: {
                    start: "(",
                    end: ")"
                },
                alternatormarker: "|",
                escapeChar: "\\",
                mask: null,
                regex: null,
                oncomplete: n.noop,
                onincomplete: n.noop,
                oncleared: n.noop,
                repeat: 0,
                greedy: !0,
                autoUnmask: !1,
                removeMaskOnSubmit: !1,
                clearMaskOnLostFocus: !0,
                insertMode: !0,
                clearIncomplete: !1,
                alias: null,
                onKeyDown: n.noop,
                onBeforeMask: null,
                onBeforePaste: function(t, i) {
                    return n.isFunction(i.onBeforeMask) ? i.onBeforeMask.call(this, t, i) : t
                },
                onBeforeWrite: null,
                onUnMask: null,
                showMaskOnFocus: !0,
                showMaskOnHover: !0,
                onKeyValidation: n.noop,
                skipOptionalPartCharacter: " ",
                numericInput: !1,
                rightAlign: !1,
                undoOnEscape: !0,
                radixPoint: "",
                radixPointDefinitionSymbol: r,
                groupSeparator: "",
                keepStatic: null,
                positionCaretOnTab: !0,
                tabThrough: !1,
                supportsInputType: ["text", "tel", "password"],
                ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229],
                isComplete: null,
                canClearPosition: n.noop,
                preValidation: null,
                postValidation: null,
                staticDefinitionSymbol: r,
                jitMasking: !1,
                nullable: !0,
                inputEventOnly: !1,
                noValuePatching: !1,
                positionCaretOnClick: "lvp",
                casing: null,
                inputmode: "verbatim",
                colorMask: !1,
                androidHack: !1,
                importDataAttributes: !0
            },
            definitions: {
                "9": {
                    validator: "[0-9ï¼‘-ï¼™]",
                    cardinality: 1,
                    definitionSymbol: "*"
                },
                a: {
                    validator: "[A-Za-zÐ-ÑÐÑ‘Ã€-Ã¿Âµ]",
                    cardinality: 1,
                    definitionSymbol: "*"
                },
                "*": {
                    validator: "[0-9ï¼‘-ï¼™A-Za-zÐ-ÑÐÑ‘Ã€-Ã¿Âµ]",
                    cardinality: 1
                }
            },
            aliases: {},
            masksCache: {},
            mask: function(e) {
                function h(i, u, f, e) {
                    if (!0 === u.importDataAttributes) {
                        var a, o, s, h, v = function(n, u) {
                                null !== (u = u !== r ? u : i.getAttribute(e + "-" + n)) && ("string" == typeof u && (0 === n.indexOf("on") ? u = t[u] : "false" === u ? u = !1 : "true" === u && (u = !0)), f[n] = u)
                            },
                            l = i.getAttribute(e);
                        if (l && "" !== l && (l = l.replace(new RegExp("'", "g"), '"'), o = JSON.parse("{" + l + "}")), o) {
                            s = r;
                            for (h in o)
                                if ("alias" === h.toLowerCase()) {
                                    s = o[h];
                                    break
                                }
                        }
                        v("alias", s);
                        f.alias && c(f.alias, f, u);
                        for (a in u) {
                            if (o) {
                                s = r;
                                for (h in o)
                                    if (h.toLowerCase() === a.toLowerCase()) {
                                        s = o[h];
                                        break
                                    }
                            }
                            v(a, s)
                        }
                    }
                    return n.extend(!0, u, f), ("rtl" === i.dir || u.rightAlign) && (i.style.textAlign = "right"), ("rtl" === i.dir || u.numericInput) && (i.dir = "ltr", i.removeAttribute("dir"), u.isRTL = !0), u
                }
                var s = this;
                return "string" == typeof e && (e = i.getElementById(e) || i.querySelectorAll(e)), e = e.nodeName ? [e] : e, n.each(e, function(t, i) {
                    var e = n.extend(!0, {}, s.opts),
                        c;
                    h(i, e, n.extend(!0, {}, s.userOptions), s.dataAttribute);
                    c = o(e, s.noMasksCache);
                    c !== r && (i.inputmask !== r && (i.inputmask.opts.autoUnmask = !0, i.inputmask.remove()), i.inputmask = new u(r, r, !0), i.inputmask.opts = e, i.inputmask.noMasksCache = s.noMasksCache, i.inputmask.userOptions = n.extend(!0, {}, s.userOptions), i.inputmask.isRTL = e.isRTL || e.numericInput, i.inputmask.el = i, i.inputmask.maskset = c, n.data(i, "_inputmask_opts", e), f.call(i.inputmask, {
                        action: "mask"
                    }))
                }), e && e[0] ? e[0].inputmask || this : this
            },
            option: function(t, i) {
                return "string" == typeof t ? this.opts[t] : "object" === (void 0 === t ? "undefined" : e(t)) ? (n.extend(this.userOptions, t), this.el && !0 !== i && this.mask(this.el), this) : void 0
            },
            unmaskedvalue: function(n) {
                return this.maskset = this.maskset || o(this.opts, this.noMasksCache), f.call(this, {
                    action: "unmaskedvalue",
                    value: n
                })
            },
            remove: function() {
                return f.call(this, {
                    action: "remove"
                })
            },
            getemptymask: function() {
                return this.maskset = this.maskset || o(this.opts, this.noMasksCache), f.call(this, {
                    action: "getemptymask"
                })
            },
            hasMaskedValue: function() {
                return !this.opts.autoUnmask
            },
            isComplete: function() {
                return this.maskset = this.maskset || o(this.opts, this.noMasksCache), f.call(this, {
                    action: "isComplete"
                })
            },
            getmetadata: function() {
                return this.maskset = this.maskset || o(this.opts, this.noMasksCache), f.call(this, {
                    action: "getmetadata"
                })
            },
            isValid: function(n) {
                return this.maskset = this.maskset || o(this.opts, this.noMasksCache), f.call(this, {
                    action: "isValid",
                    value: n
                })
            },
            format: function(n, t) {
                return this.maskset = this.maskset || o(this.opts, this.noMasksCache), f.call(this, {
                    action: "format",
                    value: n,
                    metadata: t
                })
            },
            analyseMask: function(t, i, f) {
                function v(n, t, i, r) {
                    this.matches = [];
                    this.openGroup = n || !1;
                    this.alternatorGroup = !1;
                    this.isGroup = n || !1;
                    this.isOptional = t || !1;
                    this.isQuantifier = i || !1;
                    this.isAlternator = r || !1;
                    this.quantifier = {
                        min: 1,
                        max: 1
                    }
                }

                function k(t, e, o) {
                    var h, s;
                    if (o = o !== r ? o : t.matches.length, h = t.matches[o - 1], i) 0 === e.indexOf("[") || p && /\\d|\\s|\\w]/i.test(e) || "." === e ? t.matches.splice(o++, 0, {
                        fn: new RegExp(e, f.casing ? "i" : ""),
                        cardinality: 1,
                        optionality: t.isOptional,
                        newBlockMarker: h === r || h.def !== e,
                        casing: null,
                        def: e,
                        placeholder: r,
                        nativeDef: e
                    }) : (p && (e = e[e.length - 1]), n.each(e.split(""), function(n, i) {
                        h = t.matches[o - 1];
                        t.matches.splice(o++, 0, {
                            fn: null,
                            cardinality: 0,
                            optionality: t.isOptional,
                            newBlockMarker: h === r || h.def !== i && null !== h.fn,
                            casing: null,
                            def: f.staticDefinitionSymbol || i,
                            placeholder: f.staticDefinitionSymbol !== r ? i : r,
                            nativeDef: i
                        })
                    })), p = !1;
                    else if (s = (f.definitions ? f.definitions[e] : r) || u.prototype.definitions[e], s && !p) {
                        for (var a = s.prevalidator, y = a ? a.length : 0, c = 1; c < s.cardinality; c++) {
                            var v = y >= c ? a[c - 1] : [],
                                l = v.validator,
                                w = v.cardinality;
                            t.matches.splice(o++, 0, {
                                fn: l ? "string" == typeof l ? new RegExp(l, f.casing ? "i" : "") : new function() {
                                    this.test = l
                                } : new RegExp("."),
                                cardinality: w || 1,
                                optionality: t.isOptional,
                                newBlockMarker: h === r || h.def !== (s.definitionSymbol || e),
                                casing: s.casing,
                                def: s.definitionSymbol || e,
                                placeholder: s.placeholder,
                                nativeDef: e
                            });
                            h = t.matches[o - 1]
                        }
                        t.matches.splice(o++, 0, {
                            fn: s.validator ? "string" == typeof s.validator ? new RegExp(s.validator, f.casing ? "i" : "") : new function() {
                                this.test = s.validator
                            } : new RegExp("."),
                            cardinality: s.cardinality,
                            optionality: t.isOptional,
                            newBlockMarker: h === r || h.def !== (s.definitionSymbol || e),
                            casing: s.casing,
                            def: s.definitionSymbol || e,
                            placeholder: s.placeholder,
                            nativeDef: e
                        })
                    } else t.matches.splice(o++, 0, {
                        fn: null,
                        cardinality: 0,
                        optionality: t.isOptional,
                        newBlockMarker: h === r || h.def !== e && null !== h.fn,
                        casing: null,
                        def: f.staticDefinitionSymbol || e,
                        placeholder: f.staticDefinitionSymbol !== r ? e : r,
                        nativeDef: e
                    }), p = !1
                }

                function ot(t) {
                    t && t.matches && n.each(t.matches, function(n, u) {
                        var e = t.matches[n + 1];
                        (e === r || e.matches === r || !1 === e.isQuantifier) && u && u.isGroup && (u.isGroup = !1, i || (k(u, f.groupmarker.start, 0), !0 !== u.openGroup && k(u, f.groupmarker.end)));
                        ot(u)
                    })
                }

                function d() {
                    if (e.length > 0) {
                        if (c = e[e.length - 1], k(c, l), c.isAlternator) {
                            o = e.pop();
                            for (var n = 0; n < o.matches.length; n++) o.matches[n].isGroup = !1;
                            e.length > 0 ? (c = e[e.length - 1]).matches.push(o) : h.matches.push(o)
                        }
                    } else k(h, l)
                }

                function st(n) {
                    var t, i, u;
                    n.matches = n.matches.reverse();
                    for (t in n.matches) n.matches.hasOwnProperty(t) && (i = parseInt(t), n.matches[t].isQuantifier && n.matches[i + 1] && n.matches[i + 1].isGroup && (u = n.matches[t], n.matches.splice(t, 1), n.matches.splice(i + 1, 0, u)), n.matches[t] = n.matches[t].matches !== r ? st(n.matches[t]) : function(n) {
                        return n === f.optionalmarker.start ? n = f.optionalmarker.end : n === f.optionalmarker.end ? n = f.optionalmarker.start : n === f.groupmarker.start ? n = f.groupmarker.end : n === f.groupmarker.end && (n = f.groupmarker.start), n
                    }(n.matches[t]));
                    return n
                }
                var s, l, y, c, o, a, g, ht = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g,
                    ct = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
                    p = !1,
                    h = new v,
                    e = [],
                    rt = [],
                    b, tt, it, et;
                for (i && (f.optionalmarker.start = r, f.optionalmarker.end = r); s = i ? ct.exec(t) : ht.exec(t);) {
                    if (l = s[0], i) switch (l.charAt(0)) {
                        case "?":
                            l = "{0,1}";
                            break;
                        case "+":
                        case "*":
                            l = "{" + l + "}"
                    }
                    if (p) d();
                    else switch (l.charAt(0)) {
                        case f.escapeChar:
                            p = !0;
                            i && d();
                            break;
                        case f.optionalmarker.end:
                        case f.groupmarker.end:
                            if (y = e.pop(), y.openGroup = !1, y !== r)
                                if (e.length > 0) {
                                    if ((c = e[e.length - 1]).matches.push(y), c.isAlternator) {
                                        for (o = e.pop(), b = 0; b < o.matches.length; b++) o.matches[b].isGroup = !1, o.matches[b].alternatorGroup = !1;
                                        e.length > 0 ? (c = e[e.length - 1]).matches.push(o) : h.matches.push(o)
                                    }
                                } else h.matches.push(y);
                            else d();
                            break;
                        case f.optionalmarker.start:
                            e.push(new v(!1, !0));
                            break;
                        case f.groupmarker.start:
                            e.push(new v(!0));
                            break;
                        case f.quantifiermarker.start:
                            var ut = new v(!1, !1, !0),
                                w = (l = l.replace(/[{}]/g, "")).split(","),
                                ft = isNaN(w[0]) ? w[0] : parseInt(w[0]),
                                nt = 1 === w.length ? ft : isNaN(w[1]) ? w[1] : parseInt(w[1]);
                            ("*" !== nt && "+" !== nt || (ft = "*" === nt ? 0 : 1), ut.quantifier = {
                                min: ft,
                                max: nt
                            }, e.length > 0) ? (tt = e[e.length - 1].matches, (s = tt.pop()).isGroup || ((g = new v(!0)).matches.push(s), s = g), tt.push(s), tt.push(ut)) : ((s = h.matches.pop()).isGroup || (i && null === s.fn && "." === s.def && (s.fn = new RegExp(s.def, f.casing ? "i" : "")), (g = new v(!0)).matches.push(s), s = g), h.matches.push(s), h.matches.push(ut));
                            break;
                        case f.alternatormarker:
                            e.length > 0 ? (it = (c = e[e.length - 1]).matches[c.matches.length - 1], a = c.openGroup && (it.matches === r || !1 === it.isGroup && !1 === it.isAlternator) ? e.pop() : c.matches.pop()) : a = h.matches.pop();
                            a.isAlternator ? e.push(a) : (a.alternatorGroup ? (o = e.pop(), a.alternatorGroup = !1) : o = new v(!1, !1, !1, !0), o.matches.push(a), e.push(o), a.openGroup) && (a.openGroup = !1, et = new v(!0), et.alternatorGroup = !0, e.push(et));
                            break;
                        default:
                            d()
                    }
                }
                for (; e.length > 0;) y = e.pop(), h.matches.push(y);
                return h.matches.length > 0 && (ot(h), rt.push(h)), (f.numericInput || f.isRTL) && st(rt[0]), rt
            }
        }, u.extendDefaults = function(t) {
            n.extend(!0, u.prototype.defaults, t)
        }, u.extendDefinitions = function(t) {
            n.extend(!0, u.prototype.definitions, t)
        }, u.extendAliases = function(t) {
            n.extend(!0, u.prototype.aliases, t)
        }, u.format = function(n, t, i) {
            return u(t).format(n, i)
        }, u.unmask = function(n, t) {
            return u(t).unmaskedvalue(n)
        }, u.isValid = function(n, t) {
            return u(t).isValid(n)
        }, u.remove = function(t) {
            n.each(t, function(n, t) {
                t.inputmask && t.inputmask.remove()
            })
        }, u.escapeRegex = function(n) {
            return n.replace(new RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^)", "gim"), "\\$1")
        }, u.keyCode = {
            ALT: 18,
            BACKSPACE: 8,
            BACKSPACE_SAFARI: 127,
            CAPS_LOCK: 20,
            COMMA: 188,
            COMMAND: 91,
            COMMAND_LEFT: 91,
            COMMAND_RIGHT: 93,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            MENU: 93,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            WINDOWS: 91,
            X: 88
        }, u
    })
}, function(n) {
    n.exports = jQuery
}, function(n, t, i) {
    "use strict";

    function r(n) {
        return n && n.__esModule ? n : {
            "default": n
        }
    }
    i(4);
    i(9);
    i(12);
    i(13);
    i(14);
    i(15);
    var u = r(i(1)),
        f = r(i(0)),
        e = r(i(2));
    f.default === e.default && i(16);
    window.Inputmask = u.default
}, function(n, t, i) {
    var r = i(5),
        u;
    "string" == typeof r && (r = [
        [n.i, r, ""]
    ]);
    u = {
        hmr: !0
    };
    u.transform = void 0;
    i(7)(r, u);
    r.locals && (n.exports = r.locals)
}, function(n, t, i) {
    (n.exports = i(6)(void 0)).push([n.i, "span.im-caret {\r\n    -webkit-animation: 1s blink step-end infinite;\r\n    animation: 1s blink step-end infinite;\r\n}\r\n\r\n@keyframes blink {\r\n    from, to {\r\n        border-right-color: black;\r\n    }\r\n    50% {\r\n        border-right-color: transparent;\r\n    }\r\n}\r\n\r\n@-webkit-keyframes blink {\r\n    from, to {\r\n        border-right-color: black;\r\n    }\r\n    50% {\r\n        border-right-color: transparent;\r\n    }\r\n}\r\n\r\nspan.im-static {\r\n    color: grey;\r\n}\r\n\r\ndiv.im-colormask {\r\n    display: inline-block;\r\n    border-style: inset;\r\n    border-width: 2px;\r\n    -webkit-appearance: textfield;\r\n    -moz-appearance: textfield;\r\n    appearance: textfield;\r\n}\r\n\r\ndiv.im-colormask > input {\r\n    position: absolute;\r\n    display: inline-block;\r\n    background-color: transparent;\r\n    color: transparent;\r\n    -webkit-appearance: caret;\r\n    -moz-appearance: caret;\r\n    appearance: caret;\r\n    border-style: none;\r\n    left: 0; /*calculated*/\r\n}\r\n\r\ndiv.im-colormask > input:focus {\r\n    outline: none;\r\n}\r\n\r\ndiv.im-colormask > input::-moz-selection{\r\n    background: none;\r\n}\r\n\r\ndiv.im-colormask > input::selection{\r\n    background: none;\r\n}\r\ndiv.im-colormask > input::-moz-selection{\r\n    background: none;\r\n}\r\n\r\ndiv.im-colormask > div {\r\n    color: black;\r\n    display: inline-block;\r\n    width: 100px; /*calculated*/\r\n}", ""])
}, function(n) {
    function t(n, t) {
        var u = n[1] || "",
            r = n[3],
            f, e;
        return r ? t && "function" == typeof btoa ? (f = i(r), e = r.sources.map(function(n) {
            return "/*# sourceURL=" + r.sourceRoot + n + " */"
        }), [u].concat(e).concat([f]).join("\n")) : [u].join("\n") : u
    }

    function i(n) {
        return "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(n)))) + " */"
    }
    n.exports = function(n) {
        var i = [];
        return i.toString = function() {
            return this.map(function(i) {
                var r = t(i, n);
                return i[2] ? "@media " + i[2] + "{" + r + "}" : r
            }).join("")
        }, i.i = function(n, t) {
            var f, r, e, u;
            for ("string" == typeof n && (n = [
                    [null, n, ""]
                ]), f = {}, r = 0; r < this.length; r++) e = this[r][0], "number" == typeof e && (f[e] = !0);
            for (r = 0; r < n.length; r++) u = n[r], "number" == typeof u[0] && f[u[0]] || (t && !u[2] ? u[2] = t : t && (u[2] = "(" + u[2] + ") and (" + t + ")"), i.push(u))
        }, i
    }
}, function(n, t, i) {
    function f(n, t) {
        for (var r, f, o, i, e = 0; e < n.length; e++)
            if (r = n[e], f = u[r.id], f) {
                for (f.refs++, i = 0; i < f.parts.length; i++) f.parts[i](r.parts[i]);
                for (; i < r.parts.length; i++) f.parts.push(l(r.parts[i], t))
            } else {
                for (o = [], i = 0; i < r.parts.length; i++) o.push(l(r.parts[i], t));
                u[r.id] = {
                    id: r.id,
                    refs: 1,
                    parts: o
                }
            }
    }

    function e(n, t) {
        for (var e = [], u = {}, f = 0; f < n.length; f++) {
            var i = n[f],
                r = t.base ? i[0] + t.base : i[0],
                o = {
                    css: i[1],
                    media: i[2],
                    sourceMap: i[3]
                };
            u[r] ? u[r].parts.push(o) : e.push(u[r] = {
                id: r,
                parts: [o]
            })
        }
        return e
    }

    function o(n, t) {
        var i = v(n.insertInto),
            u, f;
        if (!i) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
        if (u = r[r.length - 1], "top" === n.insertAt) u ? u.nextSibling ? i.insertBefore(t, u.nextSibling) : i.appendChild(t) : i.insertBefore(t, i.firstChild), r.push(t);
        else if ("bottom" === n.insertAt) i.appendChild(t);
        else {
            if ("object" != typeof n.insertAt || !n.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
            f = v(n.insertInto + " " + n.insertAt.before);
            i.insertBefore(t, f)
        }
    }

    function s(n) {
        if (null === n.parentNode) return !1;
        n.parentNode.removeChild(n);
        var t = r.indexOf(n);
        t >= 0 && r.splice(t, 1)
    }

    function h(n) {
        var t = document.createElement("style");
        return n.attrs.type = "text/css", c(t, n.attrs), o(n, t), t
    }

    function w(n) {
        var t = document.createElement("link");
        return n.attrs.type = "text/css", n.attrs.rel = "stylesheet", c(t, n.attrs), o(n, t), t
    }

    function c(n, t) {
        Object.keys(t).forEach(function(i) {
            n.setAttribute(i, t[i])
        })
    }

    function l(n, t) {
        var i, r, u, e, f;
        if (t.transform && n.css) {
            if (!(e = t.transform(n.css))) return function() {};
            n.css = e
        }
        return t.singleton ? (f = g++, i = y || (y = h(t)), r = a.bind(null, i, f, !1), u = a.bind(null, i, f, !0)) : n.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (i = w(t), r = k.bind(null, i, t), u = function() {
                s(i);
                i.href && URL.revokeObjectURL(i.href)
            }) : (i = h(t), r = b.bind(null, i), u = function() {
                s(i)
            }), r(n),
            function(t) {
                if (t) {
                    if (t.css === n.css && t.media === n.media && t.sourceMap === n.sourceMap) return;
                    r(n = t)
                } else u()
            }
    }

    function a(n, t, i, r) {
        var e = i ? "" : r.css,
            f, u;
        n.styleSheet ? n.styleSheet.cssText = p(t, e) : (f = document.createTextNode(e), u = n.childNodes, u[t] && n.removeChild(u[t]), u.length ? n.insertBefore(f, u[t]) : n.appendChild(f))
    }

    function b(n, t) {
        var i = t.css,
            r = t.media;
        if (r && n.setAttribute("media", r), n.styleSheet) n.styleSheet.cssText = i;
        else {
            for (; n.firstChild;) n.removeChild(n.firstChild);
            n.appendChild(document.createTextNode(i))
        }
    }

    function k(n, t, i) {
        var r = i.css,
            u = i.sourceMap,
            o = void 0 === t.convertToAbsoluteUrls && u,
            e, f;
        (t.convertToAbsoluteUrls || o) && (r = nt(r));
        u && (r += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(u)))) + " */");
        e = new Blob([r], {
            type: "text/css"
        });
        f = n.href;
        n.href = URL.createObjectURL(e);
        f && URL.revokeObjectURL(f)
    }
    var u = {},
        d = function(n) {
            var t;
            return function() {
                return void 0 === t && (t = n.apply(this, arguments)), t
            }
        }(function() {
            return window && document && document.all && !window.atob
        }),
        v = function(n) {
            var t = {};
            return function(i) {
                if (void 0 === t[i]) {
                    var r = n.call(this, i);
                    if (r instanceof window.HTMLIFrameElement) try {
                        r = r.contentDocument.head
                    } catch (u) {
                        r = null
                    }
                    t[i] = r
                }
                return t[i]
            }
        }(function(n) {
            return document.querySelector(n)
        }),
        y = null,
        g = 0,
        r = [],
        nt = i(8),
        p;
    n.exports = function(n, t) {
        if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
        (t = t || {}).attrs = "object" == typeof t.attrs ? t.attrs : {};
        t.singleton || (t.singleton = d());
        t.insertInto || (t.insertInto = "head");
        t.insertAt || (t.insertAt = "bottom");
        var i = e(n, t);
        return f(i, t),
            function(n) {
                for (var c, o, h, s = [], r = 0; r < i.length; r++) c = i[r], (o = u[c.id]).refs--, s.push(o);
                for (n && f(e(n, t), t), r = 0; r < s.length; r++)
                    if (o = s[r], 0 === o.refs) {
                        for (h = 0; h < o.parts.length; h++) o.parts[h]();
                        delete u[o.id]
                    }
            }
    };
    p = function() {
        var n = [];
        return function(t, i) {
            return n[t] = i, n.filter(Boolean).join("\n")
        }
    }()
}, function(n) {
    n.exports = function(n) {
        var t = "undefined" != typeof window && window.location,
            i, r;
        if (!t) throw new Error("fixUrls requires window.location");
        return !n || "string" != typeof n ? n : (i = t.protocol + "//" + t.host, r = i + t.pathname.replace(/\/[^\/]*$/, "/"), n.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(n, t) {
            var u = t.trim().replace(/^"(.*)"$/, function(n, t) {
                    return t
                }).replace(/^'(.*)'$/, function(n, t) {
                    return t
                }),
                f;
            return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(u) ? n : (f = 0 === u.indexOf("//") ? u : 0 === u.indexOf("/") ? i + u : r + u.replace(/^\.\//, ""), "url(" + JSON.stringify(f) + ")")
        }))
    }
}, function(n, t, i) {
    "use strict";
    var r, u, f;
    "function" == typeof Symbol && Symbol.iterator;
    ! function(e) {
        u = [i(0), i(1)];
        void 0 !== (f = "function" == typeof(r = e) ? r.apply(t, u) : r) && (n.exports = f)
    }(function(n, t) {
        function i(n) {
            return isNaN(n) || 29 === new Date(n, 2, 0).getDate()
        }
        return t.extendAliases({
            "dd/mm/yyyy": {
                mask: "1/2/y",
                placeholder: "dd/mm/yyyy",
                regex: {
                    val1pre: new RegExp("[0-3]"),
                    val1: new RegExp("0[1-9]|[12][0-9]|3[01]"),
                    val2pre: function(n) {
                        var i = t.escapeRegex.call(this, n);
                        return new RegExp("((0[1-9]|[12][0-9]|3[01])" + i + "[01])")
                    },
                    val2: function(n) {
                        var i = t.escapeRegex.call(this, n);
                        return new RegExp("((0[1-9]|[12][0-9])" + i + "(0[1-9]|1[012]))|(30" + i + "(0[13-9]|1[012]))|(31" + i + "(0[13578]|1[02]))")
                    }
                },
                leapday: "29/02/",
                separator: "/",
                yearrange: {
                    minyear: 1900,
                    maxyear: 2099
                },
                isInYearRange: function(n, t, i) {
                    if (isNaN(n)) return !1;
                    var r = parseInt(n.concat(t.toString().slice(n.length))),
                        u = parseInt(n.concat(i.toString().slice(n.length)));
                    return !isNaN(r) && t <= r && r <= i || !isNaN(u) && t <= u && u <= i
                },
                determinebaseyear: function(n, t, i) {
                    var r = (new Date).getFullYear(),
                        u, s, e, f, o;
                    if (n > r) return n;
                    if (t < r) {
                        for (u = t.toString().slice(0, 2), s = t.toString().slice(2, 4); t < u + i;) u--;
                        return e = u + s, n > e ? n : e
                    }
                    if (n <= r && r <= t) {
                        for (f = r.toString().slice(0, 2); t < f + i;) f--;
                        return o = f + i, o < n ? n : o
                    }
                    return r
                },
                onKeyDown: function(i) {
                    var u = n(this),
                        r;
                    i.ctrlKey && i.keyCode === t.keyCode.RIGHT && (r = new Date, u.val(r.getDate().toString() + (r.getMonth() + 1).toString() + r.getFullYear().toString()), u.trigger("setvalue"))
                },
                getFrontValue: function(n, t, i) {
                    for (var f, e = 0, r = 0, u = 0; u < n.length && "2" !== n.charAt(u); u++) f = i.definitions[n.charAt(u)], f ? (e += r, r = f.cardinality) : r++;
                    return t.join("").substr(e, r)
                },
                postValidation: function(n, t, r) {
                    var f, e, u = n.join("");
                    return 0 === r.mask.indexOf("y") ? (e = u.substr(0, 4), f = u.substring(4, 10)) : (e = u.substring(6, 10), f = u.substr(0, 6)), t && (f !== r.leapday || i(e))
                },
                definitions: {
                    "1": {
                        validator: function(n, t, i, r, u) {
                            var f = u.regex.val1.test(n);
                            return r || f || n.charAt(1) !== u.separator && -1 === "-./".indexOf(n.charAt(1)) || !(f = u.regex.val1.test("0" + n.charAt(0))) ? f : (t.buffer[i - 1] = "0", {
                                refreshFromBuffer: {
                                    start: i - 1,
                                    end: i
                                },
                                pos: i,
                                c: n.charAt(0)
                            })
                        },
                        cardinality: 2,
                        prevalidator: [{
                            validator: function(n, t, i, r, u) {
                                var e = n,
                                    f;
                                if (isNaN(t.buffer[i + 1]) || (e += t.buffer[i + 1]), f = 1 === e.length ? u.regex.val1pre.test(e) : u.regex.val1.test(e), f && t.validPositions[i] && (u.regex.val2(u.separator).test(n + t.validPositions[i].input) || (t.validPositions[i].input = "0" === n ? "1" : "0")), !r && !f) {
                                    if (f = u.regex.val1.test(n + "0")) return t.buffer[i] = n, t.buffer[++i] = "0", {
                                        pos: i,
                                        c: "0"
                                    };
                                    if (f = u.regex.val1.test("0" + n)) return t.buffer[i] = "0", i++, {
                                        pos: i
                                    }
                                }
                                return f
                            },
                            cardinality: 1
                        }]
                    },
                    "2": {
                        validator: function(n, t, i, r, u) {
                            var f = u.getFrontValue(t.mask, t.buffer, u),
                                e;
                            return -1 !== f.indexOf(u.placeholder[0]) && (f = "01" + u.separator), e = u.regex.val2(u.separator).test(f + n), r || e || n.charAt(1) !== u.separator && -1 === "-./".indexOf(n.charAt(1)) || !(e = u.regex.val2(u.separator).test(f + "0" + n.charAt(0))) ? e : (t.buffer[i - 1] = "0", {
                                refreshFromBuffer: {
                                    start: i - 1,
                                    end: i
                                },
                                pos: i,
                                c: n.charAt(0)
                            })
                        },
                        cardinality: 2,
                        prevalidator: [{
                            validator: function(n, t, i, r, u) {
                                var f, e;
                                return isNaN(t.buffer[i + 1]) || (n += t.buffer[i + 1]), f = u.getFrontValue(t.mask, t.buffer, u), -1 !== f.indexOf(u.placeholder[0]) && (f = "01" + u.separator), e = 1 === n.length ? u.regex.val2pre(u.separator).test(f + n) : u.regex.val2(u.separator).test(f + n), e && t.validPositions[i] && (u.regex.val2(u.separator).test(n + t.validPositions[i].input) || (t.validPositions[i].input = "0" === n ? "1" : "0")), r || e || !(e = u.regex.val2(u.separator).test(f + "0" + n)) ? e : (t.buffer[i] = "0", i++, {
                                    pos: i
                                })
                            },
                            cardinality: 1
                        }]
                    },
                    y: {
                        validator: function(n, t, i, r, u) {
                            return u.isInYearRange(n, u.yearrange.minyear, u.yearrange.maxyear)
                        },
                        cardinality: 4,
                        prevalidator: [{
                            validator: function(n, t, i, r, u) {
                                var e = u.isInYearRange(n, u.yearrange.minyear, u.yearrange.maxyear),
                                    f;
                                if (!r && !e) {
                                    if (f = u.determinebaseyear(u.yearrange.minyear, u.yearrange.maxyear, n + "0").toString().slice(0, 1), e = u.isInYearRange(f + n, u.yearrange.minyear, u.yearrange.maxyear)) return t.buffer[i++] = f.charAt(0), {
                                        pos: i
                                    };
                                    if (f = u.determinebaseyear(u.yearrange.minyear, u.yearrange.maxyear, n + "0").toString().slice(0, 2), e = u.isInYearRange(f + n, u.yearrange.minyear, u.yearrange.maxyear)) return t.buffer[i++] = f.charAt(0), t.buffer[i++] = f.charAt(1), {
                                        pos: i
                                    }
                                }
                                return e
                            },
                            cardinality: 1
                        }, {
                            validator: function(n, t, i, r, u) {
                                var e = u.isInYearRange(n, u.yearrange.minyear, u.yearrange.maxyear),
                                    f;
                                if (!r && !e) {
                                    if (f = u.determinebaseyear(u.yearrange.minyear, u.yearrange.maxyear, n).toString().slice(0, 2), e = u.isInYearRange(n[0] + f[1] + n[1], u.yearrange.minyear, u.yearrange.maxyear)) return t.buffer[i++] = f.charAt(1), {
                                        pos: i
                                    };
                                    if (f = u.determinebaseyear(u.yearrange.minyear, u.yearrange.maxyear, n).toString().slice(0, 2), e = u.isInYearRange(f + n, u.yearrange.minyear, u.yearrange.maxyear)) return t.buffer[i - 1] = f.charAt(0), t.buffer[i++] = f.charAt(1), t.buffer[i++] = n.charAt(0), {
                                        refreshFromBuffer: {
                                            start: i - 3,
                                            end: i
                                        },
                                        pos: i
                                    }
                                }
                                return e
                            },
                            cardinality: 2
                        }, {
                            validator: function(n, t, i, r, u) {
                                return u.isInYearRange(n, u.yearrange.minyear, u.yearrange.maxyear)
                            },
                            cardinality: 3
                        }]
                    }
                },
                insertMode: !1,
                autoUnmask: !1
            },
            "mm/dd/yyyy": {
                placeholder: "mm/dd/yyyy",
                alias: "dd/mm/yyyy",
                regex: {
                    val2pre: function(n) {
                        var i = t.escapeRegex.call(this, n);
                        return new RegExp("((0[13-9]|1[012])" + i + "[0-3])|(02" + i + "[0-2])")
                    },
                    val2: function(n) {
                        var i = t.escapeRegex.call(this, n);
                        return new RegExp("((0[1-9]|1[012])" + i + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + i + "30)|((0[13578]|1[02])" + i + "31)")
                    },
                    val1pre: new RegExp("[01]"),
                    val1: new RegExp("0[1-9]|1[012]")
                },
                leapday: "02/29/",
                onKeyDown: function(i) {
                    var u = n(this),
                        r;
                    i.ctrlKey && i.keyCode === t.keyCode.RIGHT && (r = new Date, u.val((r.getMonth() + 1).toString() + r.getDate().toString() + r.getFullYear().toString()), u.trigger("setvalue"))
                }
            },
            "yyyy/mm/dd": {
                mask: "y/1/2",
                placeholder: "yyyy/mm/dd",
                alias: "mm/dd/yyyy",
                leapday: "/02/29",
                onKeyDown: function(i) {
                    var u = n(this),
                        r;
                    i.ctrlKey && i.keyCode === t.keyCode.RIGHT && (r = new Date, u.val(r.getFullYear().toString() + (r.getMonth() + 1).toString() + r.getDate().toString()), u.trigger("setvalue"))
                }
            },
            "dd.mm.yyyy": {
                mask: "1.2.y",
                placeholder: "dd.mm.yyyy",
                leapday: "29.02.",
                separator: ".",
                alias: "dd/mm/yyyy"
            },
            "dd-mm-yyyy": {
                mask: "1-2-y",
                placeholder: "dd-mm-yyyy",
                leapday: "29-02-",
                separator: "-",
                alias: "dd/mm/yyyy"
            },
            "mm.dd.yyyy": {
                mask: "1.2.y",
                placeholder: "mm.dd.yyyy",
                leapday: "02.29.",
                separator: ".",
                alias: "mm/dd/yyyy"
            },
            "mm-dd-yyyy": {
                mask: "1-2-y",
                placeholder: "mm-dd-yyyy",
                leapday: "02-29-",
                separator: "-",
                alias: "mm/dd/yyyy"
            },
            "yyyy.mm.dd": {
                mask: "y.1.2",
                placeholder: "yyyy.mm.dd",
                leapday: ".02.29",
                separator: ".",
                alias: "yyyy/mm/dd"
            },
            "yyyy-mm-dd": {
                mask: "y-1-2",
                placeholder: "yyyy-mm-dd",
                leapday: "-02-29",
                separator: "-",
                alias: "yyyy/mm/dd"
            },
            datetime: {
                mask: "1/2/y h:s",
                placeholder: "dd/mm/yyyy hh:mm",
                alias: "dd/mm/yyyy",
                regex: {
                    hrspre: new RegExp("[012]"),
                    hrs24: new RegExp("2[0-4]|1[3-9]"),
                    hrs: new RegExp("[01][0-9]|2[0-4]"),
                    ampm: new RegExp("^[a|p|A|P][m|M]"),
                    mspre: new RegExp("[0-5]"),
                    ms: new RegExp("[0-5][0-9]")
                },
                timeseparator: ":",
                hourFormat: "24",
                definitions: {
                    h: {
                        validator: function(n, t, i, r, u) {
                            var e, f;
                            return "24" === u.hourFormat && 24 === parseInt(n, 10) ? (t.buffer[i - 1] = "0", t.buffer[i] = "0", {
                                refreshFromBuffer: {
                                    start: i - 1,
                                    end: i
                                },
                                c: "0"
                            }) : (e = u.regex.hrs.test(n), !r && !e && (n.charAt(1) === u.timeseparator || -1 !== "-.:".indexOf(n.charAt(1))) && (e = u.regex.hrs.test("0" + n.charAt(0)))) ? (t.buffer[i - 1] = "0", t.buffer[i] = n.charAt(0), i++, {
                                refreshFromBuffer: {
                                    start: i - 2,
                                    end: i
                                },
                                pos: i,
                                c: u.timeseparator
                            }) : e && "24" !== u.hourFormat && u.regex.hrs24.test(n) ? (f = parseInt(n, 10), 24 === f ? (t.buffer[i + 5] = "a", t.buffer[i + 6] = "m") : (t.buffer[i + 5] = "p", t.buffer[i + 6] = "m"), (f -= 12) < 10 ? (t.buffer[i] = f.toString(), t.buffer[i - 1] = "0") : (t.buffer[i] = f.toString().charAt(1), t.buffer[i - 1] = f.toString().charAt(0)), {
                                refreshFromBuffer: {
                                    start: i - 1,
                                    end: i + 6
                                },
                                c: t.buffer[i]
                            }) : e
                        },
                        cardinality: 2,
                        prevalidator: [{
                            validator: function(n, t, i, r, u) {
                                var f = u.regex.hrspre.test(n);
                                return r || f || !(f = u.regex.hrs.test("0" + n)) ? f : (t.buffer[i] = "0", i++, {
                                    pos: i
                                })
                            },
                            cardinality: 1
                        }]
                    },
                    s: {
                        validator: "[0-5][0-9]",
                        cardinality: 2,
                        prevalidator: [{
                            validator: function(n, t, i, r, u) {
                                var f = u.regex.mspre.test(n);
                                return r || f || !(f = u.regex.ms.test("0" + n)) ? f : (t.buffer[i] = "0", i++, {
                                    pos: i
                                })
                            },
                            cardinality: 1
                        }]
                    },
                    t: {
                        validator: function(n, t, i, r, u) {
                            return u.regex.ampm.test(n + "m")
                        },
                        casing: "lower",
                        cardinality: 1
                    }
                },
                insertMode: !1,
                autoUnmask: !1
            },
            datetime12: {
                mask: "1/2/y h:s t\\m",
                placeholder: "dd/mm/yyyy hh:mm xm",
                alias: "datetime",
                hourFormat: "12"
            },
            "mm/dd/yyyy hh:mm xm": {
                mask: "1/2/y h:s t\\m",
                placeholder: "mm/dd/yyyy hh:mm xm",
                alias: "datetime12",
                regex: {
                    val2pre: function(n) {
                        var i = t.escapeRegex.call(this, n);
                        return new RegExp("((0[13-9]|1[012])" + i + "[0-3])|(02" + i + "[0-2])")
                    },
                    val2: function(n) {
                        var i = t.escapeRegex.call(this, n);
                        return new RegExp("((0[1-9]|1[012])" + i + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + i + "30)|((0[13578]|1[02])" + i + "31)")
                    },
                    val1pre: new RegExp("[01]"),
                    val1: new RegExp("0[1-9]|1[012]")
                },
                leapday: "02/29/",
                onKeyDown: function(i) {
                    var u = n(this),
                        r;
                    i.ctrlKey && i.keyCode === t.keyCode.RIGHT && (r = new Date, u.val((r.getMonth() + 1).toString() + r.getDate().toString() + r.getFullYear().toString()), u.trigger("setvalue"))
                }
            },
            "hh:mm t": {
                mask: "h:s t\\m",
                placeholder: "hh:mm xm",
                alias: "datetime",
                hourFormat: "12"
            },
            "h:s t": {
                mask: "h:s t\\m",
                placeholder: "hh:mm xm",
                alias: "datetime",
                hourFormat: "12"
            },
            "hh:mm:ss": {
                mask: "h:s:s",
                placeholder: "hh:mm:ss",
                alias: "datetime",
                autoUnmask: !1
            },
            "hh:mm": {
                mask: "h:s",
                placeholder: "hh:mm",
                alias: "datetime",
                autoUnmask: !1
            },
            date: {
                alias: "dd/mm/yyyy"
            },
            "mm/yyyy": {
                mask: "1/y",
                placeholder: "mm/yyyy",
                leapday: "donotuse",
                separator: "/",
                alias: "mm/dd/yyyy"
            },
            shamsi: {
                regex: {
                    val2pre: function(n) {
                        var i = t.escapeRegex.call(this, n);
                        return new RegExp("((0[1-9]|1[012])" + i + "[0-3])")
                    },
                    val2: function(n) {
                        var i = t.escapeRegex.call(this, n);
                        return new RegExp("((0[1-9]|1[012])" + i + "(0[1-9]|[12][0-9]))|((0[1-9]|1[012])" + i + "30)|((0[1-6])" + i + "31)")
                    },
                    val1pre: new RegExp("[01]"),
                    val1: new RegExp("0[1-9]|1[012]")
                },
                yearrange: {
                    minyear: 1300,
                    maxyear: 1499
                },
                mask: "y/1/2",
                leapday: "/12/30",
                placeholder: "yyyy/mm/dd",
                alias: "mm/dd/yyyy",
                clearIncomplete: !0
            },
            "yyyy-mm-dd hh:mm:ss": {
                mask: "y-1-2 h:s:s",
                placeholder: "yyyy-mm-dd hh:mm:ss",
                alias: "datetime",
                separator: "-",
                leapday: "-02-29",
                regex: {
                    val2pre: function(n) {
                        var i = t.escapeRegex.call(this, n);
                        return new RegExp("((0[13-9]|1[012])" + i + "[0-3])|(02" + i + "[0-2])")
                    },
                    val2: function(n) {
                        var i = t.escapeRegex.call(this, n);
                        return new RegExp("((0[1-9]|1[012])" + i + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + i + "30)|((0[13578]|1[02])" + i + "31)")
                    },
                    val1pre: new RegExp("[01]"),
                    val1: new RegExp("0[1-9]|1[012]")
                },
                onKeyDown: function() {}
            }
        }), t
    })
}, function(n, t, i) {
    "use strict";
    var r;
    "function" == typeof Symbol && Symbol.iterator;
    void 0 !== (r = function() {
        return window
    }.call(t, i, t, n)) && (n.exports = r)
}, function(n, t, i) {
    "use strict";
    var r;
    "function" == typeof Symbol && Symbol.iterator;
    void 0 !== (r = function() {
        return document
    }.call(t, i, t, n)) && (n.exports = r)
}, function(n, t, i) {
    "use strict";
    var r, u, f;
    "function" == typeof Symbol && Symbol.iterator;
    ! function(e) {
        u = [i(0), i(1)];
        void 0 !== (f = "function" == typeof(r = e) ? r.apply(t, u) : r) && (n.exports = f)
    }(function(n, t) {
        return t.extendDefinitions({
            A: {
                validator: "[A-Za-zÐ-ÑÐÑ‘Ã€-Ã¿Âµ]",
                cardinality: 1,
                casing: "upper"
            },
            "&": {
                validator: "[0-9A-Za-zÐ-ÑÐÑ‘Ã€-Ã¿Âµ]",
                cardinality: 1,
                casing: "upper"
            },
            "#": {
                validator: "[0-9A-Fa-f]",
                cardinality: 1,
                casing: "upper"
            }
        }), t.extendAliases({
            url: {
                definitions: {
                    i: {
                        validator: ".",
                        cardinality: 1
                    }
                },
                mask: "(\\http://)|(\\http\\s://)|(ftp://)|(ftp\\s://)i{+}",
                insertMode: !1,
                autoUnmask: !1,
                inputmode: "url"
            },
            ip: {
                mask: "i[i[i]].i[i[i]].i[i[i]].i[i[i]]",
                definitions: {
                    i: {
                        validator: function(n, t, i) {
                            return i - 1 > -1 && "." !== t.buffer[i - 1] ? (n = t.buffer[i - 1] + n, n = i - 2 > -1 && "." !== t.buffer[i - 2] ? t.buffer[i - 2] + n : "0" + n) : n = "00" + n, new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(n)
                        },
                        cardinality: 1
                    }
                },
                onUnMask: function(n) {
                    return n
                },
                inputmode: "numeric"
            },
            email: {
                mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
                greedy: !1,
                onBeforePaste: function(n) {
                    return (n = n.toLowerCase()).replace("mailto:", "")
                },
                definitions: {
                    "*": {
                        validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
                        cardinality: 1,
                        casing: "lower"
                    },
                    "-": {
                        validator: "[0-9A-Za-z-]",
                        cardinality: 1,
                        casing: "lower"
                    }
                },
                onUnMask: function(n) {
                    return n
                },
                inputmode: "email"
            },
            mac: {
                mask: "##:##:##:##:##:##"
            },
            vin: {
                mask: "V{13}9{4}",
                definitions: {
                    V: {
                        validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
                        cardinality: 1,
                        casing: "upper"
                    }
                },
                clearIncomplete: !0,
                autoUnmask: !0
            }
        }), t
    })
}, function(n, t, i) {
    "use strict";
    var r, u, f;
    "function" == typeof Symbol && Symbol.iterator;
    ! function(e) {
        u = [i(0), i(1)];
        void 0 !== (f = "function" == typeof(r = e) ? r.apply(t, u) : r) && (n.exports = f)
    }(function(n, t, i) {
        function r(n, i) {
            for (var u = "", r = 0; r < n.length; r++) u += t.prototype.definitions[n.charAt(r)] || i.definitions[n.charAt(r)] || i.optionalmarker.start === n.charAt(r) || i.optionalmarker.end === n.charAt(r) || i.quantifiermarker.start === n.charAt(r) || i.quantifiermarker.end === n.charAt(r) || i.groupmarker.start === n.charAt(r) || i.groupmarker.end === n.charAt(r) || i.alternatormarker === n.charAt(r) ? "\\" + n.charAt(r) : n.charAt(r);
            return u
        }
        return t.extendAliases({
            numeric: {
                mask: function(n) {
                    var f, e, t, u;
                    return (0 !== n.repeat && isNaN(n.integerDigits) && (n.integerDigits = n.repeat), n.repeat = 0, n.groupSeparator === n.radixPoint && (n.groupSeparator = "." === n.radixPoint ? "," : "," === n.radixPoint ? "." : ""), " " === n.groupSeparator && (n.skipOptionalPartCharacter = i), n.autoGroup = n.autoGroup && "" !== n.groupSeparator, n.autoGroup && ("string" == typeof n.groupSize && isFinite(n.groupSize) && (n.groupSize = parseInt(n.groupSize)), isFinite(n.integerDigits))) && (f = Math.floor(n.integerDigits / n.groupSize), e = n.integerDigits % n.groupSize, n.integerDigits = parseInt(n.integerDigits) + (0 === e ? f - 1 : f), n.integerDigits < 1 && (n.integerDigits = "*")), n.placeholder.length > 1 && (n.placeholder = n.placeholder.charAt(0)), "radixFocus" === n.positionCaretOnClick && "" === n.placeholder && !1 === n.integerOptional && (n.positionCaretOnClick = "lvp"), n.definitions[";"] = n.definitions["~"], n.definitions[";"].definitionSymbol = "~", !0 === n.numericInput && (n.positionCaretOnClick = "radixFocus" === n.positionCaretOnClick ? "lvp" : n.positionCaretOnClick, n.digitsOptional = !1, isNaN(n.digits) && (n.digits = 2), n.decimalProtect = !1), t = "[+]", (t += r(n.prefix, n), t += !0 === n.integerOptional ? "~{1," + n.integerDigits + "}" : "~{" + n.integerDigits + "}", n.digits !== i) && (n.radixPointDefinitionSymbol = n.decimalProtect ? ":" : n.radixPoint, u = n.digits.toString().split(","), isFinite(u[0] && u[1] && isFinite(u[1])) ? t += n.radixPointDefinitionSymbol + ";{" + n.digits + "}" : (isNaN(n.digits) || parseInt(n.digits) > 0) && (t += n.digitsOptional ? "[" + n.radixPointDefinitionSymbol + ";{1," + n.digits + "}]" : n.radixPointDefinitionSymbol + ";{" + n.digits + "}")), t += r(n.suffix, n), t += "[-]", n.greedy = !1, t
                },
                placeholder: "",
                greedy: !1,
                digits: "*",
                digitsOptional: !0,
                enforceDigitsOnBlur: !1,
                radixPoint: ".",
                positionCaretOnClick: "radixFocus",
                groupSize: 3,
                groupSeparator: "",
                autoGroup: !1,
                allowMinus: !0,
                negationSymbol: {
                    front: "-",
                    back: ""
                },
                integerDigits: "+",
                integerOptional: !0,
                prefix: "",
                suffix: "",
                rightAlign: !0,
                decimalProtect: !0,
                min: null,
                max: null,
                step: 1,
                insertMode: !0,
                autoUnmask: !1,
                unmaskAsNumber: !1,
                inputmode: "numeric",
                preValidation: function(t, r, u, f, e) {
                    if ("-" === u || u === e.negationSymbol.front) return !0 === e.allowMinus && (e.isNegative = e.isNegative === i || !e.isNegative, "" === t.join("") || {
                        caret: r,
                        dopost: !0
                    });
                    if (!1 === f && u === e.radixPoint && e.digits !== i && (isNaN(e.digits) || parseInt(e.digits) > 0)) {
                        var o = n.inArray(e.radixPoint, t);
                        if (-1 !== o) return !0 === e.numericInput ? r === o : {
                            caret: o + 1
                        }
                    }
                    return !0
                },
                postValidation: function(r, u, f) {
                    var a = f.suffix.split(""),
                        v = f.prefix.split(""),
                        o, h, s, e, l, y, c, b, p, w;
                    if (u.pos === i && u.caret !== i && !0 !== u.dopost || (o = u.caret !== i ? u.caret : u.pos, h = r.slice(), f.numericInput && (o = h.length - o - 1, h = h.reverse()), s = h[o], s === f.groupSeparator && (s = h[o += 1]), o === h.length - f.suffix.length - 1 && s === f.radixPoint)) return u;
                    if (s !== i && s !== f.radixPoint && s !== f.negationSymbol.front && s !== f.negationSymbol.back && (h[o] = "?", f.prefix.length > 0 && o >= (!1 === f.isNegative ? 1 : 0) && o < f.prefix.length - 1 + (!1 === f.isNegative ? 1 : 0) ? v[o - (!1 === f.isNegative ? 1 : 0)] = "?" : f.suffix.length > 0 && o >= h.length - f.suffix.length - (!1 === f.isNegative ? 1 : 0) && (a[o - (h.length - f.suffix.length - (!1 === f.isNegative ? 1 : 0))] = "?")), v = v.join(""), a = a.join(""), e = h.join("").replace(v, ""), e = e.replace(a, ""), e = e.replace(new RegExp(t.escapeRegex(f.groupSeparator), "g"), ""), e = e.replace(new RegExp("[-" + t.escapeRegex(f.negationSymbol.front) + "]", "g"), ""), e = e.replace(new RegExp(t.escapeRegex(f.negationSymbol.back) + "$"), ""), isNaN(f.placeholder) && (e = e.replace(new RegExp(t.escapeRegex(f.placeholder), "g"), "")), e.length > 1 && 1 !== e.indexOf(f.radixPoint) && ("0" === s && (e = e.replace(/^\?/g, "")), e = e.replace(/^0/g, "")), e.charAt(0) === f.radixPoint && "" !== f.radixPoint && !0 !== f.numericInput && (e = "0" + e), "" !== e) {
                        if (e = e.split(""), (!f.digitsOptional || f.enforceDigitsOnBlur && "blur" === u.event) && isFinite(f.digits))
                            for (l = n.inArray(f.radixPoint, e), y = n.inArray(f.radixPoint, h), -1 === l && (e.push(f.radixPoint), l = e.length - 1), c = 1; c <= f.digits; c++) f.digitsOptional && (!f.enforceDigitsOnBlur || "blur" !== u.event) || e[l + c] !== i && e[l + c] !== f.placeholder.charAt(0) ? -1 !== y && h[y + c] !== i && (e[l + c] = e[l + c] || h[y + c]) : e[l + c] = u.placeholder || f.placeholder.charAt(0);
                        !0 === f.autoGroup && "" !== f.groupSeparator && (s !== f.radixPoint || u.pos !== i || u.dopost) ? (b = e[e.length - 1] === f.radixPoint && u.c === f.radixPoint, e = t(function(n, t) {
                            var i = "",
                                r;
                            return (i += "(" + t.groupSeparator + "*{" + t.groupSize + "}){*}", "" !== t.radixPoint) && (r = n.join("").split(t.radixPoint), r[1] && (i += t.radixPoint + "*{" + r[1].match(/^\d*\??\d*/)[0].length + "}")), i
                        }(e, f), {
                            numericInput: !0,
                            jitMasking: !0,
                            definitions: {
                                "*": {
                                    validator: "[0-9?]",
                                    cardinality: 1
                                }
                            }
                        }).format(e.join("")), b && (e += f.radixPoint), e.charAt(0) === f.groupSeparator && e.substr(1)) : e = e.join("")
                    }
                    return (f.isNegative && "blur" === u.event && (f.isNegative = "0" !== e), e = v + e, e += a, f.isNegative && (e = f.negationSymbol.front + e, e += f.negationSymbol.back), e = e.split(""), s !== i) && (s !== f.radixPoint && s !== f.negationSymbol.front && s !== f.negationSymbol.back ? (o = n.inArray("?", e)) > -1 ? e[o] = s : o = u.caret || 0 : (s === f.radixPoint || s === f.negationSymbol.front || s === f.negationSymbol.back) && (p = n.inArray(s, e), -1 !== p && (o = p))), f.numericInput && (o = e.length - o - 1, e = e.reverse()), w = {
                        caret: s === i || u.pos !== i ? o + (f.numericInput ? -1 : 1) : o,
                        buffer: e,
                        refreshFromBuffer: u.dopost || r.join("") !== e.join("")
                    }, w.refreshFromBuffer ? w : u
                },
                onBeforeWrite: function(r, u, f, e) {
                    if (r) switch (r.type) {
                        case "keydown":
                            return e.postValidation(u, {
                                caret: f,
                                dopost: !0
                            }, e);
                        case "blur":
                        case "checkval":
                            var o;
                            if (function(n) {
                                    n.parseMinMaxOptions === i && (null !== n.min && (n.min = n.min.toString().replace(new RegExp(t.escapeRegex(n.groupSeparator), "g"), ""), "," === n.radixPoint && (n.min = n.min.replace(n.radixPoint, ".")), n.min = isFinite(n.min) ? parseFloat(n.min) : NaN, isNaN(n.min) && (n.min = Number.MIN_VALUE)), null !== n.max && (n.max = n.max.toString().replace(new RegExp(t.escapeRegex(n.groupSeparator), "g"), ""), "," === n.radixPoint && (n.max = n.max.replace(n.radixPoint, ".")), n.max = isFinite(n.max) ? parseFloat(n.max) : NaN, isNaN(n.max) && (n.max = Number.MAX_VALUE)), n.parseMinMaxOptions = "done")
                                }(e), null !== e.min || null !== e.max) {
                                if (o = e.onUnMask(u.join(""), i, n.extend({}, e, {
                                        unmaskAsNumber: !0
                                    })), null !== e.min && o < e.min) return e.isNegative = e.min < 0, e.postValidation(e.min.toString().replace(".", e.radixPoint).split(""), {
                                    caret: f,
                                    dopost: !0,
                                    placeholder: "0"
                                }, e);
                                if (null !== e.max && o > e.max) return e.isNegative = e.max < 0, e.postValidation(e.max.toString().replace(".", e.radixPoint).split(""), {
                                    caret: f,
                                    dopost: !0,
                                    placeholder: "0"
                                }, e)
                            }
                            return e.postValidation(u, {
                                caret: f,
                                placeholder: "0",
                                event: "blur"
                            }, e);
                        case "_checkval":
                            return {
                                caret: f
                            }
                    }
                },
                regex: {
                    integerPart: function(n, i) {
                        return i ? new RegExp("[" + t.escapeRegex(n.negationSymbol.front) + "+]?") : new RegExp("[" + t.escapeRegex(n.negationSymbol.front) + "+]?\\d+")
                    },
                    integerNPart: function(n) {
                        return new RegExp("[\\d" + t.escapeRegex(n.groupSeparator) + t.escapeRegex(n.placeholder.charAt(0)) + "]+")
                    }
                },
                definitions: {
                    "~": {
                        validator: function(n, r, u, f, e, o) {
                            var l = f ? new RegExp("[0-9" + t.escapeRegex(e.groupSeparator) + "]").test(n) : new RegExp("[0-9]").test(n),
                                s, h, c;
                            if (!0 === l) {
                                if (!0 !== e.numericInput && r.validPositions[u] !== i && "~" === r.validPositions[u].match.def && !o) {
                                    for (s = r.buffer.join(""), h = (s = (s = s.replace(new RegExp("[-" + t.escapeRegex(e.negationSymbol.front) + "]", "g"), "")).replace(new RegExp(t.escapeRegex(e.negationSymbol.back) + "$"), "")).split(e.radixPoint), h.length > 1 && (h[1] = h[1].replace(/0/g, e.placeholder.charAt(0))), "0" === h[0] && (h[0] = h[0].replace(/0/g, e.placeholder.charAt(0))), s = h[0] + e.radixPoint + h[1] || "", c = r._buffer.join(""), s === e.radixPoint && (s = c); null === s.match(t.escapeRegex(c) + "$");) c = c.slice(1);
                                    l = (s = (s = s.replace(c, "")).split(""))[u] === i ? {
                                        pos: u,
                                        remove: u
                                    } : {
                                        pos: u
                                    }
                                }
                            } else f || n !== e.radixPoint || r.validPositions[u - 1] !== i || (r.buffer[u] = "0", l = {
                                pos: u + 1
                            });
                            return l
                        },
                        cardinality: 1
                    },
                    "+": {
                        validator: function(n, t, i, r, u) {
                            return u.allowMinus && ("-" === n || n === u.negationSymbol.front)
                        },
                        cardinality: 1,
                        placeholder: ""
                    },
                    "-": {
                        validator: function(n, t, i, r, u) {
                            return u.allowMinus && n === u.negationSymbol.back
                        },
                        cardinality: 1,
                        placeholder: ""
                    },
                    ":": {
                        validator: function(n, i, r, u, f) {
                            var o = "[" + t.escapeRegex(f.radixPoint) + "]",
                                e = new RegExp(o).test(n);
                            return e && i.validPositions[r] && i.validPositions[r].match.placeholder === f.radixPoint && (e = {
                                caret: r + 1
                            }), e
                        },
                        cardinality: 1,
                        placeholder: function(n) {
                            return n.radixPoint
                        }
                    }
                },
                onUnMask: function(n, i, r) {
                    if ("" === i && !0 === r.nullable) return i;
                    var u = n.replace(r.prefix, "");
                    return u = u.replace(r.suffix, ""), u = u.replace(new RegExp(t.escapeRegex(r.groupSeparator), "g"), ""), "" !== r.placeholder.charAt(0) && (u = u.replace(new RegExp(r.placeholder.charAt(0), "g"), "0")), r.unmaskAsNumber ? ("" !== r.radixPoint && -1 !== u.indexOf(r.radixPoint) && (u = u.replace(t.escapeRegex.call(this, r.radixPoint), ".")), u = u.replace(new RegExp("^" + t.escapeRegex(r.negationSymbol.front)), "-"), u = u.replace(new RegExp(t.escapeRegex(r.negationSymbol.back) + "$"), ""), Number(u)) : u
                },
                isComplete: function(n, i) {
                    var u = n.join(""),
                        r;
                    return n.slice().join("") !== u ? !1 : (r = u.replace(i.prefix, ""), r = r.replace(i.suffix, ""), r = r.replace(new RegExp(t.escapeRegex(i.groupSeparator), "g"), ""), "," === i.radixPoint && (r = r.replace(t.escapeRegex(i.radixPoint), ".")), isFinite(r))
                },
                onBeforeMask: function(n, r) {
                    var u, f, e, o, h, s;
                    return (r.isNegative = i, n = n.toString().charAt(n.length - 1) === r.radixPoint ? n.toString().substr(0, n.length - 1) : n.toString(), "" !== r.radixPoint && isFinite(n)) && (u = n.split("."), f = "" !== r.groupSeparator ? parseInt(r.groupSize) : 0, 2 === u.length && (u[0].length > f || u[1].length > f || u[0].length <= f && u[1].length < f) && (n = n.replace(".", r.radixPoint))), e = n.match(/,/g), o = n.match(/\./g), (n = o && e ? o.length > e.length ? (n = n.replace(/\./g, "")).replace(",", r.radixPoint) : e.length > o.length ? (n = n.replace(/,/g, "")).replace(".", r.radixPoint) : n.indexOf(".") < n.indexOf(",") ? n.replace(/\./g, "") : n.replace(/,/g, "") : n.replace(new RegExp(t.escapeRegex(r.groupSeparator), "g"), ""), 0 === r.digits && (-1 !== n.indexOf(".") ? n = n.substring(0, n.indexOf(".")) : -1 !== n.indexOf(",") && (n = n.substring(0, n.indexOf(",")))), "" !== r.radixPoint && isFinite(r.digits) && -1 !== n.indexOf(r.radixPoint)) && (h = n.split(r.radixPoint)[1].match(new RegExp("\\d*"))[0], parseInt(r.digits) < h.toString().length && (s = Math.pow(10, parseInt(r.digits)), n = n.replace(t.escapeRegex(r.radixPoint), "."), n = (n = Math.round(parseFloat(n) * s) / s).toString().replace(".", r.radixPoint))), n
                },
                canClearPosition: function(n, t, i, r, u) {
                    var f = n.validPositions[t],
                        e = f.input !== u.radixPoint || null !== n.validPositions[t].match.fn && !1 === u.decimalProtect || f.input === u.radixPoint && n.validPositions[t + 1] && null === n.validPositions[t + 1].match.fn || isFinite(f.input) || t === i || f.input === u.groupSeparator || f.input === u.negationSymbol.front || f.input === u.negationSymbol.back;
                    return !e || "+" !== f.match.nativeDef && "-" !== f.match.nativeDef || (u.isNegative = !1), e
                },
                onKeyDown: function(i, r, u, f) {
                    var e = n(this);
                    if (i.ctrlKey) switch (i.keyCode) {
                        case t.keyCode.UP:
                            e.val(parseFloat(this.inputmask.unmaskedvalue()) + parseInt(f.step));
                            e.trigger("setvalue");
                            break;
                        case t.keyCode.DOWN:
                            e.val(parseFloat(this.inputmask.unmaskedvalue()) - parseInt(f.step));
                            e.trigger("setvalue")
                    }
                }
            },
            currency: {
                prefix: "$ ",
                groupSeparator: ",",
                alias: "numeric",
                placeholder: "0",
                autoGroup: !0,
                digits: 2,
                digitsOptional: !1,
                clearMaskOnLostFocus: !1
            },
            decimal: {
                alias: "numeric"
            },
            integer: {
                alias: "numeric",
                digits: 0,
                radixPoint: ""
            },
            percentage: {
                alias: "numeric",
                digits: 2,
                digitsOptional: !0,
                radixPoint: ".",
                placeholder: "0",
                autoGroup: !1,
                min: 0,
                max: 100,
                suffix: " %",
                allowMinus: !1
            }
        }), t
    })
}, function(n, t, i) {
    "use strict";
    var r, u, f;
    "function" == typeof Symbol && Symbol.iterator;
    ! function(e) {
        u = [i(0), i(1)];
        void 0 !== (f = "function" == typeof(r = e) ? r.apply(t, u) : r) && (n.exports = f)
    }(function(n, t) {
        function i(n, t) {
            var u = (n.mask || n).replace(/#/g, "9").replace(/\)/, "9").replace(/[+()#-]/g, ""),
                f = (t.mask || t).replace(/#/g, "9").replace(/\)/, "9").replace(/[+()#-]/g, ""),
                i = (n.mask || n).split("#")[0],
                r = (t.mask || t).split("#")[0];
            return 0 === r.indexOf(i) ? -1 : 0 === i.indexOf(r) ? 1 : u.localeCompare(f)
        }
        var r = t.prototype.analyseMask;
        return t.prototype.analyseMask = function(t, i, u) {
            function f(n, i, r) {
                var s;
                i = i || "";
                r = r || o;
                "" !== i && (r[i] = {});
                for (var h = "", u = r[i] || r, e = n.length - 1; e >= 0; e--) u[h = (t = n[e].mask || n[e]).substr(0, 1)] = u[h] || [], u[h].unshift(t.substr(1)), n.splice(e, 1);
                for (s in u) u[s].length > 500 && f(u[s].slice(), s, u)
            }

            function e(t) {
                var f = "",
                    r = [];
                for (var i in t) n.isArray(t[i]) ? 1 === t[i].length ? r.push(i + t[i]) : r.push(i + u.groupmarker.start + t[i].join(u.groupmarker.end + u.alternatormarker + u.groupmarker.start) + u.groupmarker.end) : r.push(i + e(t[i]));
                return f += 1 === r.length ? r[0] : u.groupmarker.start + r.join(u.groupmarker.end + u.alternatormarker + u.groupmarker.start) + u.groupmarker.end, f
            }
            var o = {};
            return u.phoneCodes && (u.phoneCodes && u.phoneCodes.length > 1e3 && (f((t = t.substr(1, t.length - 2)).split(u.groupmarker.end + u.alternatormarker + u.groupmarker.start)), t = e(o)), t = t.replace(/9/g, "\\9")), r.call(this, t, i, u)
        }, t.extendAliases({
            abstractphone: {
                groupmarker: {
                    start: "<",
                    end: ">"
                },
                countrycode: "",
                phoneCodes: [],
                mask: function(n) {
                    return n.definitions = {
                        "#": t.prototype.definitions[9]
                    }, n.phoneCodes.sort(i)
                },
                keepStatic: !0,
                onBeforeMask: function(n, t) {
                    var i = n.replace(/^0{1,2}/, "").replace(/[\s]/g, "");
                    return (i.indexOf(t.countrycode) > 1 || -1 === i.indexOf(t.countrycode)) && (i = "+" + t.countrycode + i), i
                },
                onUnMask: function(n) {
                    return n.replace(/[()#-]/g, "")
                },
                inputmode: "tel"
            }
        }), t
    })
}, function(n, t, i) {
    "use strict";
    var r, u, f;
    "function" == typeof Symbol && Symbol.iterator;
    ! function(e) {
        u = [i(0), i(1)];
        void 0 !== (f = "function" == typeof(r = e) ? r.apply(t, u) : r) && (n.exports = f)
    }(function(n, t) {
        return t.extendAliases({
            Regex: {
                mask: "r",
                greedy: !1,
                repeat: "*",
                regex: null,
                regexTokens: null,
                tokenizer: /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
                quantifierFilter: /[0-9]+[^,]/,
                isComplete: function(n, t) {
                    return new RegExp(t.regex, t.casing ? "i" : "").test(n.join(""))
                },
                definitions: {
                    r: {
                        validator: function(t, i, r, u, f) {
                            function h(n, t) {
                                this.matches = [];
                                this.isGroup = n || !1;
                                this.isQuantifier = t || !1;
                                this.quantifier = {
                                    min: 1,
                                    max: 1
                                };
                                this.repeaterPart = void 0
                            }

                            function s(t, i) {
                                var u = !1,
                                    v, r, w, d, y, o, l, g, h, b;
                                for (i && (e += "(", c++), v = 0; v < t.matches.length; v++) {
                                    if (r = t.matches[v], !0 === r.isGroup) u = s(r, !0);
                                    else if (!0 === r.isQuantifier) {
                                        var nt = n.inArray(r, t.matches),
                                            p = t.matches[nt - 1],
                                            k = e;
                                        if (isNaN(r.quantifier.max)) {
                                            for (; r.repeaterPart && r.repeaterPart !== e && r.repeaterPart.length > e.length && !(u = s(p, !0)););
                                            (u = u || s(p, !0)) && (r.repeaterPart = e);
                                            e = k + r.quantifier.max
                                        } else {
                                            for (w = 0, d = r.quantifier.max - 1; w < d && !(u = s(p, !0)); w++);
                                            e = k + "{" + r.quantifier.min + "," + r.quantifier.max + "}"
                                        }
                                    } else if (void 0 !== r.matches)
                                        for (y = 0; y < r.length && !(u = s(r[y], i)); y++);
                                    else {
                                        if ("[" == r.charAt(0)) {
                                            for (o = e, o += r, h = 0; h < c; h++) o += ")";
                                            u = (b = new RegExp("^(" + o + ")$", f.casing ? "i" : "")).test(a)
                                        } else
                                            for (l = 0, g = r.length; l < g; l++)
                                                if ("\\" !== r.charAt(l)) {
                                                    for (o = e, o = (o += r.substr(0, l + 1)).replace(/\|$/, ""), h = 0; h < c; h++) o += ")";
                                                    if (b = new RegExp("^(" + o + ")$", f.casing ? "i" : ""), u = b.test(a)) break
                                                }
                                        e += r
                                    }
                                    if (u) break
                                }
                                return i && (e += ")", c--), u
                            }
                            var a, o, y = i.buffer.slice(),
                                e = "",
                                p = !1,
                                c = 0,
                                l, v;
                            for (null === f.regexTokens && function() {
                                    var t, u, i = new h,
                                        n = [],
                                        e;
                                    for (f.regexTokens = []; t = f.tokenizer.exec(f.regex);) switch ((u = t[0]).charAt(0)) {
                                        case "(":
                                            n.push(new h(!0));
                                            break;
                                        case ")":
                                            o = n.pop();
                                            n.length > 0 ? n[n.length - 1].matches.push(o) : i.matches.push(o);
                                            break;
                                        case "{":
                                        case "+":
                                        case "*":
                                            var s = new h(!1, !0),
                                                r = (u = u.replace(/[{}]/g, "")).split(","),
                                                c = isNaN(r[0]) ? r[0] : parseInt(r[0]),
                                                l = 1 === r.length ? c : isNaN(r[1]) ? r[1] : parseInt(r[1]);
                                            (s.quantifier = {
                                                min: c,
                                                max: l
                                            }, n.length > 0) ? (e = n[n.length - 1].matches, (t = e.pop()).isGroup || ((o = new h(!0)).matches.push(t), t = o), e.push(t), e.push(s)) : ((t = i.matches.pop()).isGroup || ((o = new h(!0)).matches.push(t), t = o), i.matches.push(t), i.matches.push(s));
                                            break;
                                        default:
                                            n.length > 0 ? n[n.length - 1].matches.push(u) : i.matches.push(u)
                                    }
                                    i.matches.length > 0 && f.regexTokens.push(i)
                                }(), y.splice(r, 0, t), a = y.join(""), l = 0; l < f.regexTokens.length; l++)
                                if (v = f.regexTokens[l], p = s(v, v.isGroup)) break;
                            return p
                        },
                        cardinality: 1
                    }
                }
            }
        }), t
    })
}, function(n, t, i) {
    "use strict";
    var r, u, f, e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
        return typeof n
    } : function(n) {
        return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
    };
    ! function(e) {
        u = [i(2), i(1)];
        void 0 !== (f = "function" == typeof(r = e) ? r.apply(t, u) : r) && (n.exports = f)
    }(function(n, t) {
        return void 0 === n.fn.inputmask && (n.fn.inputmask = function(i, r) {
            var f, u = this[0];
            if (void 0 === r && (r = {}), "string" == typeof i) switch (i) {
                case "unmaskedvalue":
                    return u && u.inputmask ? u.inputmask.unmaskedvalue() : n(u).val();
                case "remove":
                    return this.each(function() {
                        this.inputmask && this.inputmask.remove()
                    });
                case "getemptymask":
                    return u && u.inputmask ? u.inputmask.getemptymask() : "";
                case "hasMaskedValue":
                    return !(!u || !u.inputmask) && u.inputmask.hasMaskedValue();
                case "isComplete":
                    return !u || !u.inputmask || u.inputmask.isComplete();
                case "getmetadata":
                    return u && u.inputmask ? u.inputmask.getmetadata() : void 0;
                case "setvalue":
                    n(u).val(r);
                    u && void 0 === u.inputmask && n(u).triggerHandler("setvalue");
                    break;
                case "option":
                    if ("string" != typeof r) return this.each(function() {
                        if (void 0 !== this.inputmask) return this.inputmask.option(r)
                    });
                    if (u && void 0 !== u.inputmask) return u.inputmask.option(r);
                    break;
                default:
                    return r.alias = i, f = new t(r), this.each(function() {
                        f.mask(this)
                    })
            } else {
                if ("object" == (void 0 === i ? "undefined" : e(i))) return f = new t(i), void 0 === i.mask && void 0 === i.alias ? this.each(function() {
                    if (void 0 !== this.inputmask) return this.inputmask.option(i);
                    f.mask(this)
                }) : this.each(function() {
                    f.mask(this)
                });
                if (void 0 === i) return this.each(function() {
                    (f = new t(r)).mask(this)
                })
            }
        }), n.fn.inputmask
    })
}]);
/*!
 * Isotope PACKAGED v3.0.6
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * https://isotope.metafizzy.co
 * Copyright 2010-2018 Metafizzy
 */
! function(n, t) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) {
        return t(n, i)
    }) : "object" == typeof module && module.exports ? module.exports = t(n, require("jquery")) : n.jQueryBridget = t(n, n.jQuery)
}(window, function(n, t) {
    "use strict";

    function i(i, u, o) {
        function s(n, t, r) {
            var u, e = "$()." + i + '("' + t + '")';
            return n.each(function(n, s) {
                var h = o.data(s, i),
                    c, l;
                if (!h) return void f(i + " not initialized. Cannot call methods, i.e. " + e);
                if (c = h[t], !c || "_" == t.charAt(0)) return void f(e + " is not a valid method");
                l = c.apply(h, r);
                u = void 0 === u ? l : u
            }), void 0 !== u ? u : n
        }

        function h(n, t) {
            n.each(function(n, r) {
                var f = o.data(r, i);
                f ? (f.option(t), f._init()) : (f = new u(r, t), o.data(r, i, f))
            })
        }
        o = o || t || n.jQuery;
        o && (u.prototype.option || (u.prototype.option = function(n) {
            o.isPlainObject(n) && (this.options = o.extend(!0, this.options, n))
        }), o.fn[i] = function(n) {
            if ("string" == typeof n) {
                var t = e.call(arguments, 1);
                return s(this, n, t)
            }
            return h(this, n), this
        }, r(o))
    }

    function r(n) {
        !n || n && n.bridget || (n.bridget = i)
    }
    var e = Array.prototype.slice,
        u = n.console,
        f = "undefined" == typeof u ? function() {} : function(n) {
            u.error(n)
        };
    return r(t || n.jQuery), i
}),
function(n, t) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : n.EvEmitter = t()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var n = t.prototype;
    return n.on = function(n, t) {
        if (n && t) {
            var i = this._events = this._events || {},
                r = i[n] = i[n] || [];
            return r.indexOf(t) == -1 && r.push(t), this
        }
    }, n.once = function(n, t) {
        if (n && t) {
            this.on(n, t);
            var i = this._onceEvents = this._onceEvents || {},
                r = i[n] = i[n] || {};
            return r[t] = !0, this
        }
    }, n.off = function(n, t) {
        var i = this._events && this._events[n],
            r;
        if (i && i.length) return r = i.indexOf(t), r != -1 && i.splice(r, 1), this
    }, n.emitEvent = function(n, t) {
        var i = this._events && this._events[n],
            u, f, r, e;
        if (i && i.length) {
            for (i = i.slice(0), t = t || [], u = this._onceEvents && this._onceEvents[n], f = 0; f < i.length; f++) r = i[f], e = u && u[r], e && (this.off(n, r), delete u[r]), r.apply(this, t);
            return this
        }
    }, n.allOff = function() {
        delete this._events;
        delete this._onceEvents
    }, t
}),
function(n, t) {
    "function" == typeof define && define.amd ? define("get-size/get-size", t) : "object" == typeof module && module.exports ? module.exports = t() : n.getSize = t()
}(window, function() {
    "use strict";

    function n(n) {
        var t = parseFloat(n),
            i = n.indexOf("%") == -1 && !isNaN(t);
        return i && t
    }

    function o() {}

    function s() {
        for (var r, t = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            }, n = 0; n < f; n++) r = i[n], t[r] = 0;
        return t
    }

    function r(n) {
        var t = getComputedStyle(n);
        return t || c("Style returned " + t + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), t
    }

    function h() {
        var i, f, o;
        e || (e = !0, i = document.createElement("div"), i.style.width = "200px", i.style.padding = "1px 2px 3px 4px", i.style.borderStyle = "solid", i.style.borderWidth = "1px 2px 3px 4px", i.style.boxSizing = "border-box", f = document.body || document.documentElement, f.appendChild(i), o = r(i), t = 200 == Math.round(n(o.width)), u.isBoxSizeOuter = t, f.removeChild(i))
    }

    function u(u) {
        var o, e, a, c, l;
        if (h(), "string" == typeof u && (u = document.querySelector(u)), u && "object" == typeof u && u.nodeType) {
            if (o = r(u), "none" == o.display) return s();
            for (e = {}, e.width = u.offsetWidth, e.height = u.offsetHeight, a = e.isBorderBox = "border-box" == o.boxSizing, c = 0; c < f; c++) {
                var v = i[c],
                    nt = o[v],
                    y = parseFloat(nt);
                e[v] = isNaN(y) ? 0 : y
            }
            var p = e.paddingLeft + e.paddingRight,
                w = e.paddingTop + e.paddingBottom,
                tt = e.marginLeft + e.marginRight,
                it = e.marginTop + e.marginBottom,
                b = e.borderLeftWidth + e.borderRightWidth,
                k = e.borderTopWidth + e.borderBottomWidth,
                d = a && t,
                g = n(o.width);
            return g !== !1 && (e.width = g + (d ? 0 : p + b)), l = n(o.height), l !== !1 && (e.height = l + (d ? 0 : w + k)), e.innerWidth = e.width - (p + b), e.innerHeight = e.height - (w + k), e.outerWidth = e.width + tt, e.outerHeight = e.height + it, e
        }
    }
    var t, c = "undefined" == typeof console ? o : function(n) {
            console.error(n)
        },
        i = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        f = i.length,
        e = !1;
    return u
}),
function(n, t) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", t) : "object" == typeof module && module.exports ? module.exports = t() : n.matchesSelector = t()
}(window, function() {
    "use strict";
    var n = function() {
        var t = window.Element.prototype,
            i, n, u, r;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (i = ["webkit", "moz", "ms", "o"], n = 0; n < i.length; n++)
            if (u = i[n], r = u + "MatchesSelector", t[r]) return r
    }();
    return function(t, i) {
        return t[n](i)
    }
}),
function(n, t) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(i) {
        return t(n, i)
    }) : "object" == typeof module && module.exports ? module.exports = t(n, require("desandro-matches-selector")) : n.fizzyUIUtils = t(n, n.matchesSelector)
}(window, function(n, t) {
    var i = {},
        u, r;
    return i.extend = function(n, t) {
        for (var i in t) n[i] = t[i];
        return n
    }, i.modulo = function(n, t) {
        return (n % t + t) % t
    }, u = Array.prototype.slice, i.makeArray = function(n) {
        if (Array.isArray(n)) return n;
        if (null === n || void 0 === n) return [];
        var t = "object" == typeof n && "number" == typeof n.length;
        return t ? u.call(n) : [n]
    }, i.removeFrom = function(n, t) {
        var i = n.indexOf(t);
        i != -1 && n.splice(i, 1)
    }, i.getParent = function(n, i) {
        for (; n.parentNode && n != document.body;)
            if (n = n.parentNode, t(n, i)) return n
    }, i.getQueryElement = function(n) {
        return "string" == typeof n ? document.querySelector(n) : n
    }, i.handleEvent = function(n) {
        var t = "on" + n.type;
        this[t] && this[t](n)
    }, i.filterFindElements = function(n, r) {
        n = i.makeArray(n);
        var u = [];
        return n.forEach(function(n) {
            if (n instanceof HTMLElement) {
                if (!r) return void u.push(n);
                t(n, r) && u.push(n);
                for (var f = n.querySelectorAll(r), i = 0; i < f.length; i++) u.push(f[i])
            }
        }), u
    }, i.debounceMethod = function(n, t, i) {
        i = i || 100;
        var u = n.prototype[t],
            r = t + "Timeout";
        n.prototype[t] = function() {
            var f = this[r],
                t, n;
            clearTimeout(f);
            t = arguments;
            n = this;
            this[r] = setTimeout(function() {
                u.apply(n, t);
                delete n[r]
            }, i)
        }
    }, i.docReady = function(n) {
        var t = document.readyState;
        "complete" == t || "interactive" == t ? setTimeout(n) : document.addEventListener("DOMContentLoaded", n)
    }, i.toDashed = function(n) {
        return n.replace(/(.)([A-Z])/g, function(n, t, i) {
            return t + "-" + i
        }).toLowerCase()
    }, r = n.console, i.htmlInit = function(t, u) {
        i.docReady(function() {
            var e = i.toDashed(u),
                f = "data-" + e,
                s = document.querySelectorAll("[" + f + "]"),
                h = document.querySelectorAll(".js-" + e),
                c = i.makeArray(s).concat(i.makeArray(h)),
                l = f + "-options",
                o = n.jQuery;
            c.forEach(function(n) {
                var i, e = n.getAttribute(f) || n.getAttribute(l),
                    s;
                try {
                    i = e && JSON.parse(e)
                } catch (h) {
                    return void(r && r.error("Error parsing " + f + " on " + n.className + ": " + h))
                }
                s = new t(n, i);
                o && o.data(n, u, s)
            })
        })
    }, i
}),
function(n, t) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], t) : "object" == typeof module && module.exports ? module.exports = t(require("ev-emitter"), require("get-size")) : (n.Outlayer = {}, n.Outlayer.Item = t(n.EvEmitter, n.getSize))
}(window, function(n, t) {
    "use strict";

    function l(n) {
        for (var t in n) return !1;
        return t = null, !0
    }

    function u(n, t) {
        n && (this.element = n, this.layout = t, this.position = {
            x: 0,
            y: 0
        }, this._create())
    }

    function a(n) {
        return n.replace(/([A-Z])/g, function(n) {
            return "-" + n.toLowerCase()
        })
    }
    var f = document.documentElement.style,
        r = "string" == typeof f.transition ? "transition" : "WebkitTransition",
        e = "string" == typeof f.transform ? "transform" : "WebkitTransform",
        o = {
            WebkitTransition: "webkitTransitionEnd",
            transition: "transitionend"
        }[r],
        v = {
            transform: e,
            transition: r,
            transitionDuration: r + "Duration",
            transitionProperty: r + "Property",
            transitionDelay: r + "Delay"
        },
        i = u.prototype = Object.create(n.prototype),
        s, h, c;
    return i.constructor = u, i._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        };
        this.css({
            position: "absolute"
        })
    }, i.handleEvent = function(n) {
        var t = "on" + n.type;
        this[t] && this[t](n)
    }, i.getSize = function() {
        this.size = t(this.element)
    }, i.css = function(n) {
        var r = this.element.style,
            t, i;
        for (t in n) i = v[t] || t, r[i] = n[t]
    }, i.getPosition = function() {
        var r = getComputedStyle(this.element),
            u = this.layout._getOption("originLeft"),
            f = this.layout._getOption("originTop"),
            e = r[u ? "left" : "right"],
            o = r[f ? "top" : "bottom"],
            n = parseFloat(e),
            t = parseFloat(o),
            i = this.layout.size;
        e.indexOf("%") != -1 && (n = n / 100 * i.width);
        o.indexOf("%") != -1 && (t = t / 100 * i.height);
        n = isNaN(n) ? 0 : n;
        t = isNaN(t) ? 0 : t;
        n -= u ? i.paddingLeft : i.paddingRight;
        t -= f ? i.paddingTop : i.paddingBottom;
        this.position.x = n;
        this.position.y = t
    }, i.layoutPosition = function() {
        var r = this.layout.size,
            n = {},
            t = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"),
            u = t ? "paddingLeft" : "paddingRight",
            f = t ? "left" : "right",
            e = t ? "right" : "left",
            o = this.position.x + r[u];
        n[f] = this.getXValue(o);
        n[e] = "";
        var s = i ? "paddingTop" : "paddingBottom",
            h = i ? "top" : "bottom",
            c = i ? "bottom" : "top",
            l = this.position.y + r[s];
        n[h] = this.getYValue(l);
        n[c] = "";
        this.css(n);
        this.emitEvent("layout", [this])
    }, i.getXValue = function(n) {
        var t = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !t ? n / this.layout.size.width * 100 + "%" : n + "px"
    }, i.getYValue = function(n) {
        var t = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && t ? n / this.layout.size.height * 100 + "%" : n + "px"
    }, i._transitionTo = function(n, t) {
        this.getPosition();
        var r = this.position.x,
            u = this.position.y,
            f = n == this.position.x && t == this.position.y;
        if (this.setPosition(n, t), f && !this.isTransitioning) return void this.layoutPosition();
        var e = n - r,
            o = t - u,
            i = {};
        i.transform = this.getTranslate(e, o);
        this.transition({
            to: i,
            onTransitionEnd: {
                transform: this.layoutPosition
            },
            isCleaning: !0
        })
    }, i.getTranslate = function(n, t) {
        var i = this.layout._getOption("originLeft"),
            r = this.layout._getOption("originTop");
        return n = i ? n : -n, t = r ? t : -t, "translate3d(" + n + "px, " + t + "px, 0)"
    }, i.goTo = function(n, t) {
        this.setPosition(n, t);
        this.layoutPosition()
    }, i.moveTo = i._transitionTo, i.setPosition = function(n, t) {
        this.position.x = parseFloat(n);
        this.position.y = parseFloat(t)
    }, i._nonTransition = function(n) {
        this.css(n.to);
        n.isCleaning && this._removeStyles(n.to);
        for (var t in n.onTransitionEnd) n.onTransitionEnd[t].call(this)
    }, i.transition = function(n) {
        var i, t, r;
        if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(n);
        i = this._transn;
        for (t in n.onTransitionEnd) i.onEnd[t] = n.onTransitionEnd[t];
        for (t in n.to) i.ingProperties[t] = !0, n.isCleaning && (i.clean[t] = !0);
        n.from && (this.css(n.from), r = this.element.offsetHeight, r = null);
        this.enableTransition(n.to);
        this.css(n.to);
        this.isTransitioning = !0
    }, s = "opacity," + a(e), i.enableTransition = function() {
        if (!this.isTransitioning) {
            var n = this.layout.options.transitionDuration;
            n = "number" == typeof n ? n + "ms" : n;
            this.css({
                transitionProperty: s,
                transitionDuration: n,
                transitionDelay: this.staggerDelay || 0
            });
            this.element.addEventListener(o, this, !1)
        }
    }, i.onwebkitTransitionEnd = function(n) {
        this.ontransitionend(n)
    }, i.onotransitionend = function(n) {
        this.ontransitionend(n)
    }, h = {
        "-webkit-transform": "transform"
    }, i.ontransitionend = function(n) {
        var t, i, r;
        n.target === this.element && (t = this._transn, i = h[n.propertyName] || n.propertyName, (delete t.ingProperties[i], l(t.ingProperties) && this.disableTransition(), i in t.clean && (this.element.style[n.propertyName] = "", delete t.clean[i]), i in t.onEnd) && (r = t.onEnd[i], r.call(this), delete t.onEnd[i]), this.emitEvent("transitionEnd", [this]))
    }, i.disableTransition = function() {
        this.removeTransitionStyles();
        this.element.removeEventListener(o, this, !1);
        this.isTransitioning = !1
    }, i._removeStyles = function(n) {
        var t = {};
        for (var i in n) t[i] = "";
        this.css(t)
    }, c = {
        transitionProperty: "",
        transitionDuration: "",
        transitionDelay: ""
    }, i.removeTransitionStyles = function() {
        this.css(c)
    }, i.stagger = function(n) {
        n = isNaN(n) ? 0 : n;
        this.staggerDelay = n + "ms"
    }, i.removeElem = function() {
        this.element.parentNode.removeChild(this.element);
        this.css({
            display: ""
        });
        this.emitEvent("remove", [this])
    }, i.remove = function() {
        return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
            this.removeElem()
        }), void this.hide()) : void this.removeElem()
    }, i.reveal = function() {
        delete this.isHidden;
        this.css({
            display: ""
        });
        var n = this.layout.options,
            t = {},
            i = this.getHideRevealTransitionEndProperty("visibleStyle");
        t[i] = this.onRevealTransitionEnd;
        this.transition({
            from: n.hiddenStyle,
            to: n.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: t
        })
    }, i.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent("reveal")
    }, i.getHideRevealTransitionEndProperty = function(n) {
        var t = this.layout.options[n],
            i;
        if (t.opacity) return "opacity";
        for (i in t) return i
    }, i.hide = function() {
        this.isHidden = !0;
        this.css({
            display: ""
        });
        var n = this.layout.options,
            t = {},
            i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        t[i] = this.onHideTransitionEnd;
        this.transition({
            from: n.visibleStyle,
            to: n.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: t
        })
    }, i.onHideTransitionEnd = function() {
        this.isHidden && (this.css({
            display: "none"
        }), this.emitEvent("hide"))
    }, i.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        })
    }, u
}),
function(n, t) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(i, r, u, f) {
        return t(n, i, r, u, f)
    }) : "object" == typeof module && module.exports ? module.exports = t(n, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : n.Outlayer = t(n, n.EvEmitter, n.getSize, n.fizzyUIUtils, n.Outlayer.Item)
}(window, function(n, t, i, r, u) {
    "use strict";

    function e(n, t) {
        var i = r.getQueryElement(n),
            u, f;
        if (!i) return void(c && c.error("Bad element for " + this.constructor.namespace + ": " + (i || n)));
        this.element = i;
        o && (this.$element = o(this.element));
        this.options = r.extend({}, this.constructor.defaults);
        this.option(t);
        u = ++y;
        this.element.outlayerGUID = u;
        s[u] = this;
        this._create();
        f = this._getOption("initLayout");
        f && this.layout()
    }

    function h(n) {
        function t() {
            n.apply(this, arguments)
        }
        return t.prototype = Object.create(n.prototype), t.prototype.constructor = t, t
    }

    function v(n) {
        var r;
        if ("number" == typeof n) return n;
        var t = n.match(/(^\d*\.?\d*)(\w*)/),
            i = t && t[1],
            u = t && t[2];
        return i.length ? (i = parseFloat(i), r = a[u] || 1, i * r) : 0
    }
    var c = n.console,
        o = n.jQuery,
        l = function() {},
        y = 0,
        s = {},
        f, a;
    return e.namespace = "outlayer", e.Item = u, e.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    }, f = e.prototype, r.extend(f, t.prototype), f.option = function(n) {
        r.extend(this.options, n)
    }, f._getOption = function(n) {
        var t = this.constructor.compatOptions[n];
        return t && void 0 !== this.options[t] ? this.options[t] : this.options[n]
    }, e.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, f._create = function() {
        this.reloadItems();
        this.stamps = [];
        this.stamp(this.options.stamp);
        r.extend(this.element.style, this.options.containerStyle);
        var n = this._getOption("resize");
        n && this.bindResize()
    }, f.reloadItems = function() {
        this.items = this._itemize(this.element.children)
    }, f._itemize = function(n) {
        for (var u, f, i = this._filterFindItemElements(n), e = this.constructor.Item, r = [], t = 0; t < i.length; t++) u = i[t], f = new e(u, this), r.push(f);
        return r
    }, f._filterFindItemElements = function(n) {
        return r.filterFindElements(n, this.options.itemSelector)
    }, f.getItemElements = function() {
        return this.items.map(function(n) {
            return n.element
        })
    }, f.layout = function() {
        this._resetLayout();
        this._manageStamps();
        var n = this._getOption("layoutInstant"),
            t = void 0 !== n ? n : !this._isLayoutInited;
        this.layoutItems(this.items, t);
        this._isLayoutInited = !0
    }, f._init = f.layout, f._resetLayout = function() {
        this.getSize()
    }, f.getSize = function() {
        this.size = i(this.element)
    }, f._getMeasurement = function(n, t) {
        var u, r = this.options[n];
        r ? ("string" == typeof r ? u = this.element.querySelector(r) : r instanceof HTMLElement && (u = r), this[n] = u ? i(u)[t] : r) : this[n] = 0
    }, f.layoutItems = function(n, t) {
        n = this._getItemsForLayout(n);
        this._layoutItems(n, t);
        this._postLayout()
    }, f._getItemsForLayout = function(n) {
        return n.filter(function(n) {
            return !n.isIgnored
        })
    }, f._layoutItems = function(n, t) {
        if (this._emitCompleteOnItems("layout", n), n && n.length) {
            var i = [];
            n.forEach(function(n) {
                var r = this._getItemLayoutPosition(n);
                r.item = n;
                r.isInstant = t || n.isLayoutInstant;
                i.push(r)
            }, this);
            this._processLayoutQueue(i)
        }
    }, f._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        }
    }, f._processLayoutQueue = function(n) {
        this.updateStagger();
        n.forEach(function(n, t) {
            this._positionItem(n.item, n.x, n.y, n.isInstant, t)
        }, this)
    }, f.updateStagger = function() {
        var n = this.options.stagger;
        return null === n || void 0 === n ? void(this.stagger = 0) : (this.stagger = v(n), this.stagger)
    }, f._positionItem = function(n, t, i, r, u) {
        r ? n.goTo(t, i) : (n.stagger(u * this.stagger), n.moveTo(t, i))
    }, f._postLayout = function() {
        this.resizeContainer()
    }, f.resizeContainer = function() {
        var t = this._getOption("resizeContainer"),
            n;
        t && (n = this._getContainerSize(), n && (this._setContainerMeasure(n.width, !0), this._setContainerMeasure(n.height, !1)))
    }, f._getContainerSize = l, f._setContainerMeasure = function(n, t) {
        if (void 0 !== n) {
            var i = this.size;
            i.isBorderBox && (n += t ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth);
            n = Math.max(n, 0);
            this.element.style[t ? "width" : "height"] = n + "px"
        }
    }, f._emitCompleteOnItems = function(n, t) {
        function r() {
            e.dispatchEvent(n + "Complete", null, [t])
        }

        function f() {
            i++;
            i == u && r()
        }
        var e = this,
            u = t.length,
            i;
        if (!t || !u) return void r();
        i = 0;
        t.forEach(function(t) {
            t.once(n, f)
        })
    }, f.dispatchEvent = function(n, t, i) {
        var u = t ? [t].concat(i) : i,
            r;
        (this.emitEvent(n, u), o) && ((this.$element = this.$element || o(this.element), t) ? (r = o.Event(t), r.type = n, this.$element.trigger(r, i)) : this.$element.trigger(n, i))
    }, f.ignore = function(n) {
        var t = this.getItem(n);
        t && (t.isIgnored = !0)
    }, f.unignore = function(n) {
        var t = this.getItem(n);
        t && delete t.isIgnored
    }, f.stamp = function(n) {
        n = this._find(n);
        n && (this.stamps = this.stamps.concat(n), n.forEach(this.ignore, this))
    }, f.unstamp = function(n) {
        n = this._find(n);
        n && n.forEach(function(n) {
            r.removeFrom(this.stamps, n);
            this.unignore(n)
        }, this)
    }, f._find = function(n) {
        if (n) return "string" == typeof n && (n = this.element.querySelectorAll(n)), n = r.makeArray(n)
    }, f._manageStamps = function() {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, f._getBoundingRect = function() {
        var t = this.element.getBoundingClientRect(),
            n = this.size;
        this._boundingRect = {
            left: t.left + n.paddingLeft + n.borderLeftWidth,
            top: t.top + n.paddingTop + n.borderTopWidth,
            right: t.right - (n.paddingRight + n.borderRightWidth),
            bottom: t.bottom - (n.paddingBottom + n.borderBottomWidth)
        }
    }, f._manageStamp = l, f._getElementOffset = function(n) {
        var t = n.getBoundingClientRect(),
            r = this._boundingRect,
            u = i(n);
        return {
            left: t.left - r.left - u.marginLeft,
            top: t.top - r.top - u.marginTop,
            right: r.right - t.right - u.marginRight,
            bottom: r.bottom - t.bottom - u.marginBottom
        }
    }, f.handleEvent = r.handleEvent, f.bindResize = function() {
        n.addEventListener("resize", this);
        this.isResizeBound = !0
    }, f.unbindResize = function() {
        n.removeEventListener("resize", this);
        this.isResizeBound = !1
    }, f.onresize = function() {
        this.resize()
    }, r.debounceMethod(e, "onresize", 100), f.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, f.needsResizeLayout = function() {
        var n = i(this.element),
            t = this.size && n;
        return t && n.innerWidth !== this.size.innerWidth
    }, f.addItems = function(n) {
        var t = this._itemize(n);
        return t.length && (this.items = this.items.concat(t)), t
    }, f.appended = function(n) {
        var t = this.addItems(n);
        t.length && (this.layoutItems(t, !0), this.reveal(t))
    }, f.prepended = function(n) {
        var t = this._itemize(n),
            i;
        t.length && (i = this.items.slice(0), this.items = t.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(t, !0), this.reveal(t), this.layoutItems(i))
    }, f.reveal = function(n) {
        if (this._emitCompleteOnItems("reveal", n), n && n.length) {
            var t = this.updateStagger();
            n.forEach(function(n, i) {
                n.stagger(i * t);
                n.reveal()
            })
        }
    }, f.hide = function(n) {
        if (this._emitCompleteOnItems("hide", n), n && n.length) {
            var t = this.updateStagger();
            n.forEach(function(n, i) {
                n.stagger(i * t);
                n.hide()
            })
        }
    }, f.revealItemElements = function(n) {
        var t = this.getItems(n);
        this.reveal(t)
    }, f.hideItemElements = function(n) {
        var t = this.getItems(n);
        this.hide(t)
    }, f.getItem = function(n) {
        for (var i, t = 0; t < this.items.length; t++)
            if (i = this.items[t], i.element == n) return i
    }, f.getItems = function(n) {
        n = r.makeArray(n);
        var t = [];
        return n.forEach(function(n) {
            var i = this.getItem(n);
            i && t.push(i)
        }, this), t
    }, f.remove = function(n) {
        var t = this.getItems(n);
        this._emitCompleteOnItems("remove", t);
        t && t.length && t.forEach(function(n) {
            n.remove();
            r.removeFrom(this.items, n)
        }, this)
    }, f.destroy = function() {
        var n = this.element.style,
            t;
        n.height = "";
        n.position = "";
        n.width = "";
        this.items.forEach(function(n) {
            n.destroy()
        });
        this.unbindResize();
        t = this.element.outlayerGUID;
        delete s[t];
        delete this.element.outlayerGUID;
        o && o.removeData(this.element, this.constructor.namespace)
    }, e.data = function(n) {
        n = r.getQueryElement(n);
        var t = n && n.outlayerGUID;
        return t && s[t]
    }, e.create = function(n, t) {
        var i = h(e);
        return i.defaults = r.extend({}, e.defaults), r.extend(i.defaults, t), i.compatOptions = r.extend({}, e.compatOptions), i.namespace = n, i.data = e.data, i.Item = h(u), r.htmlInit(i, n), o && o.bridget && o.bridget(n, i), i
    }, a = {
        ms: 1,
        s: 1e3
    }, e.Item = u, e
}),
function(n, t) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/item", ["outlayer/outlayer"], t) : "object" == typeof module && module.exports ? module.exports = t(require("outlayer")) : (n.Isotope = n.Isotope || {}, n.Isotope.Item = t(n.Outlayer))
}(window, function(n) {
    "use strict";

    function i() {
        n.Item.apply(this, arguments)
    }
    var t = i.prototype = Object.create(n.Item.prototype),
        u = t._create,
        r;
    return t._create = function() {
        this.id = this.layout.itemGUID++;
        u.call(this);
        this.sortData = {}
    }, t.updateSortData = function() {
        var t, i, n, r;
        if (!this.isIgnored) {
            this.sortData.id = this.id;
            this.sortData["original-order"] = this.id;
            this.sortData.random = Math.random();
            t = this.layout.options.getSortData;
            i = this.layout._sorters;
            for (n in t) r = i[n], this.sortData[n] = r(this.element, this)
        }
    }, r = t.destroy, t.destroy = function() {
        r.apply(this, arguments);
        this.css({
            display: ""
        })
    }, i
}),
function(n, t) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], t) : "object" == typeof module && module.exports ? module.exports = t(require("get-size"), require("outlayer")) : (n.Isotope = n.Isotope || {}, n.Isotope.LayoutMode = t(n.getSize, n.Outlayer))
}(window, function(n, t) {
    "use strict";

    function r(n) {
        this.isotope = n;
        n && (this.options = n.options[this.namespace], this.element = n.element, this.items = n.filteredItems, this.size = n.size)
    }
    var i = r.prototype;
    return ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"].forEach(function(n) {
        i[n] = function() {
            return t.prototype[n].apply(this.isotope, arguments)
        }
    }), i.needsVerticalResizeLayout = function() {
        var t = n(this.isotope.element),
            i = this.isotope.size && t;
        return i && t.innerHeight != this.isotope.size.innerHeight
    }, i._getMeasurement = function() {
        this.isotope._getMeasurement.apply(this, arguments)
    }, i.getColumnWidth = function() {
        this.getSegmentSize("column", "Width")
    }, i.getRowHeight = function() {
        this.getSegmentSize("row", "Height")
    }, i.getSegmentSize = function(n, t) {
        var i = n + t,
            u = "outer" + t,
            r;
        (this._getMeasurement(i, u), this[i]) || (r = this.getFirstItemSize(), this[i] = r && r[u] || this.isotope.size["inner" + t])
    }, i.getFirstItemSize = function() {
        var t = this.isotope.filteredItems[0];
        return t && t.element && n(t.element)
    }, i.layout = function() {
        this.isotope.layout.apply(this.isotope, arguments)
    }, i.getSize = function() {
        this.isotope.getSize();
        this.size = this.isotope.size
    }, r.modes = {}, r.create = function(n, t) {
        function u() {
            r.apply(this, arguments)
        }
        return u.prototype = Object.create(i), u.prototype.constructor = u, t && (u.options = t), u.prototype.namespace = n, r.modes[n] = u, u
    }, r
}),
function(n, t) {
    "function" == typeof define && define.amd ? define("masonry-layout/masonry", ["outlayer/outlayer", "get-size/get-size"], t) : "object" == typeof module && module.exports ? module.exports = t(require("outlayer"), require("get-size")) : n.Masonry = t(n.Outlayer, n.getSize)
}(window, function(n, t) {
    var r = n.create("masonry"),
        i;
    return r.compatOptions.fitWidth = "isFitWidth", i = r.prototype, i._resetLayout = function() {
        this.getSize();
        this._getMeasurement("columnWidth", "outerWidth");
        this._getMeasurement("gutter", "outerWidth");
        this.measureColumns();
        this.colYs = [];
        for (var n = 0; n < this.cols; n++) this.colYs.push(0);
        this.maxY = 0;
        this.horizontalColIndex = 0
    }, i.measureColumns = function() {
        var n, i;
        (this.getContainerWidth(), this.columnWidth) || (n = this.items[0], i = n && n.element, this.columnWidth = i && t(i).outerWidth || this.containerWidth);
        var r = this.columnWidth += this.gutter,
            f = this.containerWidth + this.gutter,
            u = f / r,
            e = r - f % r,
            o = e && e < 1 ? "round" : "floor";
        u = Math[o](u);
        this.cols = Math.max(u, 1)
    }, i.getContainerWidth = function() {
        var i = this._getOption("fitWidth"),
            r = i ? this.element.parentNode : this.element,
            n = t(r);
        this.containerWidth = n && n.innerWidth
    }, i._getItemLayoutPosition = function(n) {
        n.getSize();
        var u = n.size.outerWidth % this.columnWidth,
            f = u && u < 1 ? "round" : "ceil",
            i = Math[f](n.size.outerWidth / this.columnWidth);
        i = Math.min(i, this.cols);
        for (var e = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", t = this[e](i, n), o = {
                x: this.columnWidth * t.col,
                y: t.y
            }, s = t.y + n.size.outerHeight, h = i + t.col, r = t.col; r < h; r++) this.colYs[r] = s;
        return o
    }, i._getTopColPosition = function(n) {
        var t = this._getTopColGroup(n),
            i = Math.min.apply(Math, t);
        return {
            col: t.indexOf(i),
            y: i
        }
    }, i._getTopColGroup = function(n) {
        if (n < 2) return this.colYs;
        for (var i = [], r = this.cols + 1 - n, t = 0; t < r; t++) i[t] = this._getColGroupY(t, n);
        return i
    }, i._getColGroupY = function(n, t) {
        if (t < 2) return this.colYs[n];
        var i = this.colYs.slice(n, n + t);
        return Math.max.apply(Math, i)
    }, i._getHorizontalColPosition = function(n, t) {
        var i = this.horizontalColIndex % this.cols,
            u = n > 1 && i + n > this.cols,
            r;
        return i = u ? 0 : i, r = t.size.outerWidth && t.size.outerHeight, this.horizontalColIndex = r ? i + n : this.horizontalColIndex, {
            col: i,
            y: this._getColGroupY(i, n)
        }
    }, i._manageStamp = function(n) {
        var e = t(n),
            r = this._getElementOffset(n),
            h = this._getOption("originLeft"),
            o = h ? r.left : r.right,
            s = o + e.outerWidth,
            f = Math.floor(o / this.columnWidth),
            i;
        f = Math.max(0, f);
        i = Math.floor(s / this.columnWidth);
        i -= s % this.columnWidth ? 0 : 1;
        i = Math.min(this.cols - 1, i);
        for (var c = this._getOption("originTop"), l = (c ? r.top : r.bottom) + e.outerHeight, u = f; u <= i; u++) this.colYs[u] = Math.max(l, this.colYs[u])
    }, i._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var n = {
            height: this.maxY
        };
        return this._getOption("fitWidth") && (n.width = this._getContainerFitWidth()), n
    }, i._getContainerFitWidth = function() {
        for (var n = 0, t = this.cols; --t && 0 === this.colYs[t];) n++;
        return (this.cols - n) * this.columnWidth - this.gutter
    }, i.needsResizeLayout = function() {
        var n = this.containerWidth;
        return this.getContainerWidth(), n != this.containerWidth
    }, r
}),
function(n, t) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/masonry", ["../layout-mode", "masonry-layout/masonry"], t) : "object" == typeof module && module.exports ? module.exports = t(require("../layout-mode"), require("masonry-layout")) : t(n.Isotope.LayoutMode, n.Masonry)
}(window, function(n, t) {
    "use strict";
    var u = n.create("masonry"),
        i = u.prototype,
        o = {
            _getElementOffset: !0,
            layout: !0,
            _getMeasurement: !0
        },
        r, f, e;
    for (r in t.prototype) o[r] || (i[r] = t.prototype[r]);
    return f = i.measureColumns, i.measureColumns = function() {
        this.items = this.isotope.filteredItems;
        f.call(this)
    }, e = i._getOption, i._getOption = function(n) {
        return "fitWidth" == n ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : e.apply(this.isotope, arguments)
    }, u
}),
function(n, t) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/fit-rows", ["../layout-mode"], t) : "object" == typeof exports ? module.exports = t(require("../layout-mode")) : t(n.Isotope.LayoutMode)
}(window, function(n) {
    "use strict";
    var i = n.create("fitRows"),
        t = i.prototype;
    return t._resetLayout = function() {
        this.x = 0;
        this.y = 0;
        this.maxY = 0;
        this._getMeasurement("gutter", "outerWidth")
    }, t._getItemLayoutPosition = function(n) {
        var t, i, r;
        return n.getSize(), t = n.size.outerWidth + this.gutter, i = this.isotope.size.innerWidth + this.gutter, 0 !== this.x && t + this.x > i && (this.x = 0, this.y = this.maxY), r = {
            x: this.x,
            y: this.y
        }, this.maxY = Math.max(this.maxY, this.y + n.size.outerHeight), this.x += t, r
    }, t._getContainerSize = function() {
        return {
            height: this.maxY
        }
    }, i
}),
function(n, t) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/vertical", ["../layout-mode"], t) : "object" == typeof module && module.exports ? module.exports = t(require("../layout-mode")) : t(n.Isotope.LayoutMode)
}(window, function(n) {
    "use strict";
    var i = n.create("vertical", {
            horizontalAlignment: 0
        }),
        t = i.prototype;
    return t._resetLayout = function() {
        this.y = 0
    }, t._getItemLayoutPosition = function(n) {
        n.getSize();
        var t = (this.isotope.size.innerWidth - n.size.outerWidth) * this.options.horizontalAlignment,
            i = this.y;
        return this.y += n.size.outerHeight, {
            x: t,
            y: i
        }
    }, t._getContainerSize = function() {
        return {
            height: this.y
        }
    }, i
}),
function(n, t) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope-layout/js/item", "isotope-layout/js/layout-mode", "isotope-layout/js/layout-modes/masonry", "isotope-layout/js/layout-modes/fit-rows", "isotope-layout/js/layout-modes/vertical"], function(i, r, u, f, e, o) {
        return t(n, i, r, u, f, e, o)
    }) : "object" == typeof module && module.exports ? module.exports = t(n, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope-layout/js/item"), require("isotope-layout/js/layout-mode"), require("isotope-layout/js/layout-modes/masonry"), require("isotope-layout/js/layout-modes/fit-rows"), require("isotope-layout/js/layout-modes/vertical")) : n.Isotope = t(n, n.Outlayer, n.getSize, n.matchesSelector, n.fizzyUIUtils, n.Isotope.Item, n.Isotope.LayoutMode)
}(window, function(n, t, i, r, u, f, e) {
    function a(n, t) {
        return function(i, r) {
            for (var s, h, u = 0; u < n.length; u++) {
                var f = n[u],
                    e = i.sortData[f],
                    o = r.sortData[f];
                if (e > o || e < o) return s = void 0 !== t[f] ? t[f] : t, h = s ? 1 : -1, (e > o ? 1 : -1) * h
            }
            return 0
        }
    }
    var h = n.jQuery,
        v = String.prototype.trim ? function(n) {
            return n.trim()
        } : function(n) {
            return n.replace(/^\s+|\s+$/g, "")
        },
        s = t.create("isotope", {
            layoutMode: "masonry",
            isJQueryFiltering: !0,
            sortAscending: !0
        }),
        o, c, l;
    return s.Item = f, s.LayoutMode = e, o = s.prototype, o._create = function() {
        this.itemGUID = 0;
        this._sorters = {};
        this._getSorters();
        t.prototype._create.call(this);
        this.modes = {};
        this.filteredItems = this.items;
        this.sortHistory = ["original-order"];
        for (var n in e.modes) this._initLayoutMode(n)
    }, o.reloadItems = function() {
        this.itemGUID = 0;
        t.prototype.reloadItems.call(this)
    }, o._itemize = function() {
        for (var r, n = t.prototype._itemize.apply(this, arguments), i = 0; i < n.length; i++) r = n[i], r.id = this.itemGUID++;
        return this._updateItemsSortData(n), n
    }, o._initLayoutMode = function(n) {
        var t = e.modes[n],
            i = this.options[n] || {};
        this.options[n] = t.options ? u.extend(t.options, i) : i;
        this.modes[n] = new t(this)
    }, o.layout = function() {
        return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout()
    }, o._layout = function() {
        var n = this._getIsInstant();
        this._resetLayout();
        this._manageStamps();
        this.layoutItems(this.filteredItems, n);
        this._isLayoutInited = !0
    }, o.arrange = function(n) {
        this.option(n);
        this._getIsInstant();
        var t = this._filter(this.items);
        this.filteredItems = t.matches;
        this._bindArrangeComplete();
        this._isInstant ? this._noTransition(this._hideReveal, [t]) : this._hideReveal(t);
        this._sort();
        this._layout()
    }, o._init = o.arrange, o._hideReveal = function(n) {
        this.reveal(n.needReveal);
        this.hide(n.needHide)
    }, o._getIsInstant = function() {
        var n = this._getOption("layoutInstant"),
            t = void 0 !== n ? n : !this._isLayoutInited;
        return this._isInstant = t, t
    }, o._bindArrangeComplete = function() {
        function n() {
            t && i && r && u.dispatchEvent("arrangeComplete", null, [u.filteredItems])
        }
        var t, i, r, u = this;
        this.once("layoutComplete", function() {
            t = !0;
            n()
        });
        this.once("hideComplete", function() {
            i = !0;
            n()
        });
        this.once("revealComplete", function() {
            r = !0;
            n()
        })
    }, o._filter = function(n) {
        var r = this.options.filter,
            t, i;
        r = r || "*";
        for (var f = [], e = [], o = [], s = this._getFilterTest(r), u = 0; u < n.length; u++) t = n[u], t.isIgnored || (i = s(t), i && f.push(t), i && t.isHidden ? e.push(t) : i || t.isHidden || o.push(t));
        return {
            matches: f,
            needReveal: e,
            needHide: o
        }
    }, o._getFilterTest = function(n) {
        return h && this.options.isJQueryFiltering ? function(t) {
            return h(t.element).is(n)
        } : "function" == typeof n ? function(t) {
            return n(t.element)
        } : function(t) {
            return r(t.element, n)
        }
    }, o.updateSortData = function(n) {
        var t;
        n ? (n = u.makeArray(n), t = this.getItems(n)) : t = this.items;
        this._getSorters();
        this._updateItemsSortData(t)
    }, o._getSorters = function() {
        var t = this.options.getSortData,
            n, i;
        for (n in t) i = t[n], this._sorters[n] = c(i)
    }, o._updateItemsSortData = function(n) {
        for (var r, i = n && n.length, t = 0; i && t < i; t++) r = n[t], r.updateSortData()
    }, c = function() {
        function n(n) {
            if ("string" != typeof n) return n;
            var i = v(n).split(" "),
                r = i[0],
                u = r.match(/^\[(.+)\]$/),
                o = u && u[1],
                f = t(o, r),
                e = s.sortDataParsers[i[1]];
            return e ? function(n) {
                return n && e(f(n))
            } : function(n) {
                return n && f(n)
            }
        }

        function t(n, t) {
            return n ? function(t) {
                return t.getAttribute(n)
            } : function(n) {
                var i = n.querySelector(t);
                return i && i.textContent
            }
        }
        return n
    }(), s.sortDataParsers = {
        parseInt: function(n) {
            return parseInt(n, 10)
        },
        parseFloat: function(n) {
            return parseFloat(n)
        }
    }, o._sort = function() {
        var n, t;
        this.options.sortBy && (n = u.makeArray(this.options.sortBy), this._getIsSameSortBy(n) || (this.sortHistory = n.concat(this.sortHistory)), t = a(this.sortHistory, this.options.sortAscending), this.filteredItems.sort(t))
    }, o._getIsSameSortBy = function(n) {
        for (var t = 0; t < n.length; t++)
            if (n[t] != this.sortHistory[t]) return !1;
        return !0
    }, o._mode = function() {
        var n = this.options.layoutMode,
            t = this.modes[n];
        if (!t) throw new Error("No layout mode: " + n);
        return t.options = this.options[n], t
    }, o._resetLayout = function() {
        t.prototype._resetLayout.call(this);
        this._mode()._resetLayout()
    }, o._getItemLayoutPosition = function(n) {
        return this._mode()._getItemLayoutPosition(n)
    }, o._manageStamp = function(n) {
        this._mode()._manageStamp(n)
    }, o._getContainerSize = function() {
        return this._mode()._getContainerSize()
    }, o.needsResizeLayout = function() {
        return this._mode().needsResizeLayout()
    }, o.appended = function(n) {
        var t = this.addItems(n),
            i;
        t.length && (i = this._filterRevealAdded(t), this.filteredItems = this.filteredItems.concat(i))
    }, o.prepended = function(n) {
        var t = this._itemize(n),
            i;
        t.length && (this._resetLayout(), this._manageStamps(), i = this._filterRevealAdded(t), this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = t.concat(this.items))
    }, o._filterRevealAdded = function(n) {
        var t = this._filter(n);
        return this.hide(t.needHide), this.reveal(t.matches), this.layoutItems(t.matches, !0), t.matches
    }, o.insert = function(n) {
        var i = this.addItems(n),
            t, u, r, f;
        if (i.length) {
            for (r = i.length, t = 0; t < r; t++) u = i[t], this.element.appendChild(u.element);
            for (f = this._filter(i).matches, t = 0; t < r; t++) i[t].isLayoutInstant = !0;
            for (this.arrange(), t = 0; t < r; t++) delete i[t].isLayoutInstant;
            this.reveal(f)
        }
    }, l = o.remove, o.remove = function(n) {
        var t, r, i, f;
        for (n = u.makeArray(n), t = this.getItems(n), l.call(this, n), r = t && t.length, i = 0; r && i < r; i++) f = t[i], u.removeFrom(this.filteredItems, f)
    }, o.shuffle = function() {
        for (var t, n = 0; n < this.items.length; n++) t = this.items[n], t.sortData.random = Math.random();
        this.options.sortBy = "random";
        this._sort();
        this._layout()
    }, o._noTransition = function(n, t) {
        var r = this.options.transitionDuration,
            i;
        return this.options.transitionDuration = 0, i = n.apply(this, t), this.options.transitionDuration = r, i
    }, o.getFilteredItemElements = function() {
        return this.filteredItems.map(function(n) {
            return n.element
        })
    }, s
});
$(".slider").not(".slick-initialized").slick();
$(window).scroll(function() {
    $(window).scrollTop() >= 1 ? $("header").addClass("fixed-header") : $("header").removeClass("fixed-header")
});
$(window).load(function() {
    var n = $('header[class*="header"]').height();
    $('header[class*="header"]').wrap('<div class="header-wrap"><\/div>');
    $(".header-wrap").css("height", n);
    $("body").css("margin-top", "0")
});
$(".show-sublist").click(function() {
    $(this).siblings(".sublist").addClass("active")
});
$(".hide-sublist").click(function() {
    $(this).closest(".sublist").removeClass("active")
});
$(".price-range-filter > .filter-title").click(function() {
    $(".price-range-filter > .filter-content").toggle("slow")
});
$(".product-spec-filter > .filter-title").click(function() {
    $(".product-spec-filter > .filter-content").toggle("slow")
});
$(".ico-cart").click(function() {
    $(".dropdown-topcartlink .dropdown-cart").show()
});
$(".mini-shopping-cart .cart-title button").click(function() {
    $(".dropdown-topcartlink .dropdown-cart").hide()
});
$(".checkbox-readonly").attr("disabled", !0);
$("#checkbox-emi-True").prop("checked", !0);
$(document).on("click", "#ShowFlyoutShoppingCart, #toggleShoppingCart, #toggleMiniCart", function() {
    $("#flyout-cart").toggleClass("active");
    $("#headerMenu").removeClass("active");
    $("#menuOverlay").removeClass("active");
    $("body").removeClass("noscroll")
});
$(".toggleMyAccount").click(function() {
    $("#MobileMyAccountFlyout").toggleClass("active")
});
$("document").ready(function() {
    $(".back-to-previous").attr("href", "javascript:history.back()");
    $(".dvCategorylnk .cl-1[href='#']").click(function(n) {
        n.preventDefault()
    });
    $(".full-description table").wrap("<div class='table-responsive'><\/div>");
    var n = $(".back-top");
    $(window).scroll(function() {
        $(window).scrollTop() > 300 ? n.css("display", "flex") : n.css("display", "none")
    });
    n.on("click", function(n) {
        n.preventDefault();
        $("html, body").animate({
            scrollTop: 0
        }, "300")
    });
    $(window).on("load , resize", function() {
        if ($(window).width() > 768 && $(".page").hasClass("category-page")) {
            $("#sideBar2").wrap('<div class="sidebar-wrapper"><\/div>');
            var n = $("#sideBar2").width() + 15,
                t = $("#sideBar2").height();
            $(".sidebar-wrapper").css({
                "min-width": n,
                height: "100%",
                margin: "0 auto 15px"
            });
            $(window).scroll(function() {
                var n, t;
                if ($("#sideBar2").height() > 500 && $("#sideBar2").height() < $(".center-2.right-content .page-body").height()) n = $(".footer").offset().top + 10 - $(window).height(), t = $("#sideBar2").height() + 93 - $(window).height(), $(window).scrollTop() >= n ? $("#sideBar2").css({
                    position: "absolute",
                    bottom: "0"
                }) : $(window).scrollTop() >= t ? $("#sideBar2").css({
                    position: "fixed",
                    bottom: "0",
                    background: "#fff"
                }) : $("#sideBar2").removeAttr("style");
                else if ($("#sideBar2").height() < 500 && $("#sideBar2").height() < $(".center-2.right-content .page-body").height()) {
                    var i = $(".common-header").height(),
                        n = $(".footer").offset().top + 10 - $(window).height(),
                        t = $("#sideBar2").height() + 93 - $(window).height();
                    $(window).scrollTop() >= n ? $("#sideBar2").css({
                        position: "absolute",
                        top: "0"
                    }) : $(window).scrollTop() >= t ? $("#sideBar2").css({
                        position: "fixed",
                        top: i + "px",
                        background: "#fff"
                    }) : $("#sideBar2").removeAttr("style")
                } else $("#sideBar2").removeAttr("style")
            })
        }
        $(window).width() < 768 && $(".page").hasClass("category-page") && $(window).scroll(function() {
            $(".common-header").hasClass("fixed-header") ? $("#sideBar2 , #divSort").css({
                height: "calc(100% - 56px)",
                top: "56px"
            }) : $("#sideBar2 , #divSort").removeAttr("style")
        })
    })
});
_extends = Object.assign || function(n) {
    for (var i, r, t = 1; t < arguments.length; t++) {
        i = arguments[t];
        for (r in i) Object.prototype.hasOwnProperty.call(i, r) && (n[r] = i[r])
    }
    return n
};
_typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
        return typeof n
    } : function(n) {
        return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
    },
    function(n, t) {
        (typeof exports == "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module != "undefined" ? module.exports = t() : typeof define == "function" && define.amd ? define(t) : n.LazyLoad = t()
    }(this, function() {
        "use strict";
        var y = {
                elements_selector: "img",
                container: document,
                threshold: 300,
                data_src: "src",
                data_srcset: "srcset",
                class_loading: "loading",
                class_loaded: "loaded",
                class_error: "error",
                callback_load: null,
                callback_error: null,
                callback_set: null
            },
            u = "data-",
            n = function(n, t) {
                return n.getAttribute(u + t)
            },
            p = function(n, t, i) {
                return n.setAttribute(u + t, i)
            },
            t = function(t) {
                return t.filter(function(t) {
                    return !n(t, "was-processed")
                })
            },
            f = function(n, t) {
                var i = new n(t),
                    r = new CustomEvent("LazyLoad::Initialized", {
                        detail: {
                            instance: i
                        }
                    });
                window.dispatchEvent(r)
            },
            w = function(n, t) {
                if (t.length)
                    for (var i = 0, r; r = t[i]; i += 1) f(n, r);
                else f(n, t)
            },
            b = function(t, i) {
                var o = i.data_srcset,
                    e = t.parentElement,
                    u, r, f;
                if (e.tagName === "PICTURE")
                    for (u = 0; r = e.children[u]; u += 1) r.tagName === "SOURCE" && (f = n(r, o), f && r.setAttribute("srcset", f))
            },
            k = function(t, i) {
                var e = i.data_src,
                    o = i.data_srcset,
                    f = t.tagName,
                    r = n(t, e),
                    u;
                if (f === "IMG") {
                    b(t, i);
                    u = n(t, o);
                    u && t.setAttribute("srcset", u);
                    r && t.setAttribute("src", r);
                    return
                }
                if (f === "IFRAME") {
                    r && t.setAttribute("src", r);
                    return
                }
                r && (t.style.backgroundImage = 'url("' + r + '")')
            },
            e = "classList" in document.createElement("p"),
            o = function(n, t) {
                if (e) {
                    n.classList.add(t);
                    return
                }
                n.className += (n.className ? " " : "") + t
            },
            d = function(n, t) {
                if (e) {
                    n.classList.remove(t);
                    return
                }
                n.className = n.className.replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "")
            },
            s = function(n, t) {
                n && n(t)
            },
            h = "load",
            c = "error",
            l = function(n, t, i) {
                n.removeEventListener(h, t);
                n.removeEventListener(c, i)
            },
            g = function(n, t) {
                var i = function i(u) {
                        a(u, !0, t);
                        l(n, i, r)
                    },
                    r = function r(u) {
                        a(u, !1, t);
                        l(n, i, r)
                    };
                n.addEventListener(h, i);
                n.addEventListener(c, r)
            },
            a = function(n, t, i) {
                var r = n.target;
                d(r, i.class_loading);
                o(r, t ? i.class_loaded : i.class_error);
                s(t ? i.callback_load : i.callback_error, r)
            },
            v = function(n, t) {
                ["IMG", "IFRAME"].indexOf(n.tagName) > -1 && (g(n, t), o(n, t.class_loading));
                k(n, t);
                p(n, "was-processed", !0);
                s(t.callback_set, n)
            },
            i = function(n, t) {
                this._settings = _extends({}, y, n);
                this._setObserver();
                this.update(t)
            },
            r;
        return i.prototype = {
            _setObserver: function() {
                var i = this,
                    n, r;
                "IntersectionObserver" in window && (n = this._settings, r = function(r) {
                    r.forEach(function(t) {
                        if (t.intersectionRatio > 0) {
                            var r = t.target;
                            v(r, n);
                            i._observer.unobserve(r)
                        }
                    });
                    i._elements = t(i._elements)
                }, this._observer = new IntersectionObserver(r, {
                    root: n.container === document ? null : n.container,
                    rootMargin: n.threshold + "px"
                }))
            },
            update: function(n) {
                var r = this,
                    i = this._settings,
                    u = n || i.container.querySelectorAll(i.elements_selector);
                if (this._elements = t(Array.prototype.slice.call(u)), this._observer) {
                    this._elements.forEach(function(n) {
                        r._observer.observe(n)
                    });
                    return
                }
                this._elements.forEach(function(n) {
                    v(n, i)
                });
                this._elements = t(this._elements)
            },
            destroy: function() {
                var n = this;
                this._observer && (t(this._elements).forEach(function(t) {
                    n._observer.unobserve(t)
                }), this._observer = null);
                this._elements = null;
                this._settings = null
            }
        }, r = window.lazyLoadOptions, r && w(i, r), i
    });
/*! Magnific Popup - v1.0.0 - 2015-01-03
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2015 Dmitry Semenov; */
! function(n) {
    "function" == typeof define && define.amd ? define(["jquery"], n) : n("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function(n) {
    var t, it, o, p, h, pt, c = "Close",
        wt = "BeforeClose",
        ti = "AfterClose",
        ii = "BeforeAppend",
        rt = "MarkupParse",
        ut = "Open",
        bt = "Change",
        ft = "mfp",
        u = "." + ft,
        w = "mfp-ready",
        kt = "mfp-removing",
        et = "mfp-prevent-close",
        b = function() {},
        ot = !!window.jQuery,
        f = n(window),
        r = function(n, i) {
            t.ev.on(ft + n + u, i)
        },
        e = function(t, i, r, u) {
            var f = document.createElement("div");
            return f.className = "mfp-" + t, r && (f.innerHTML = r), u ? i && i.appendChild(f) : (f = n(f), i && f.appendTo(i)), f
        },
        i = function(i, r) {
            t.ev.triggerHandler(ft + i, r);
            t.st.callbacks && (i = i.charAt(0).toLowerCase() + i.slice(1), t.st.callbacks[i] && t.st.callbacks[i].apply(t, n.isArray(r) ? r : [r]))
        },
        st = function(i) {
            return i === pt && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = n(t.st.closeMarkup.replace("%title%", t.st.tClose)), pt = i), t.currTemplate.closeBtn
        },
        ht = function() {
            n.magnificPopup.instance || (t = new b, t.init(), n.magnificPopup.instance = t)
        },
        ri = function() {
            var n = document.createElement("p").style,
                t = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== n.transition) return !0;
            for (; t.length;)
                if (t.pop() + "Transition" in n) return !0;
            return !1
        },
        a, k, d, g, ct, s, gt, at, ni, nt, yt, tt;
    b.prototype = {
        constructor: b,
        init: function() {
            var i = navigator.appVersion;
            t.isIE7 = -1 !== i.indexOf("MSIE 7.");
            t.isIE8 = -1 !== i.indexOf("MSIE 8.");
            t.isLowIE = t.isIE7 || t.isIE8;
            t.isAndroid = /android/gi.test(i);
            t.isIOS = /iphone|ipad|ipod/gi.test(i);
            t.supportsTransition = ri();
            t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent);
            o = n(document);
            t.popupsCache = {}
        },
        open: function(s) {
            var c, l, p, b, a, k, v, d, y;
            if (s.isObj === !1) {
                for (t.items = s.items.toArray(), t.index = 0, p = s.items, c = 0; c < p.length; c++)
                    if (l = p[c], l.parsed && (l = l.el[0]), l === s.el[0]) {
                        t.index = c;
                        break
                    }
            } else t.items = n.isArray(s.items) ? s.items : [s.items], t.index = s.index || 0;
            if (t.isOpen) return void t.updateItemHTML();
            for (t.types = [], h = "", t.ev = s.mainEl && s.mainEl.length ? s.mainEl.eq(0) : o, s.key ? (t.popupsCache[s.key] || (t.popupsCache[s.key] = {}), t.currTemplate = t.popupsCache[s.key]) : t.currTemplate = {}, t.st = n.extend(!0, {}, n.magnificPopup.defaults, s), t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos, t.st.modal && (t.st.closeOnContentClick = !1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !1, t.st.enableEscapeKey = !1), t.bgOverlay || (t.bgOverlay = e("bg").on("click" + u, function() {
                    t.close()
                }), t.wrap = e("wrap").attr("tabindex", -1).on("click" + u, function(n) {
                    t._checkIfClose(n.target) && t.close()
                }), t.container = e("container", t.wrap)), t.contentContainer = e("content"), t.st.preloader && (t.preloader = e("preloader", t.container, t.st.tLoading)), b = n.magnificPopup.modules, c = 0; c < b.length; c++) a = b[c], a = a.charAt(0).toUpperCase() + a.slice(1), t["init" + a].call(t);
            return i("BeforeOpen"), t.st.showCloseBtn && (t.st.closeBtnInside ? (r(rt, function(n, t, i, r) {
                i.close_replaceWith = st(r.type)
            }), h += " mfp-close-btn-in") : t.wrap.append(st())), t.st.alignTop && (h += " mfp-align-top"), t.wrap.css(t.fixedContentPos ? {
                overflow: t.st.overflowY,
                overflowX: "hidden",
                overflowY: t.st.overflowY
            } : {
                top: f.scrollTop(),
                position: "absolute"
            }), (t.st.fixedBgPos === !1 || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
                height: o.height(),
                position: "absolute"
            }), t.st.enableEscapeKey && o.on("keyup" + u, function(n) {
                27 === n.keyCode && t.close()
            }), f.on("resize" + u, function() {
                t.updateSize()
            }), t.st.closeOnContentClick || (h += " mfp-auto-cursor"), h && t.wrap.addClass(h), k = t.wH = f.height(), v = {}, t.fixedContentPos && t._hasScrollBar(k) && (d = t._getScrollbarSize(), d && (v.marginRight = d)), t.fixedContentPos && (t.isIE7 ? n("body, html").css("overflow", "hidden") : v.overflow = "hidden"), y = t.st.mainClass, t.isIE7 && (y += " mfp-ie7"), y && t._addClassToMFP(y), t.updateItemHTML(), i("BuildControls"), n("html").css(v), t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || n(document.body)), t._lastFocusedEl = document.activeElement, setTimeout(function() {
                t.content ? (t._addClassToMFP(w), t._setFocus()) : t.bgOverlay.addClass(w);
                o.on("focusin" + u, t._onFocusIn)
            }, 16), t.isOpen = !0, t.updateSize(k), i(ut), s
        },
        close: function() {
            t.isOpen && (i(wt), t.isOpen = !1, t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(kt), setTimeout(function() {
                t._close()
            }, t.st.removalDelay)) : t._close())
        },
        _close: function() {
            var r, f;
            i(c);
            r = kt + " " + w + " ";
            (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (r += t.st.mainClass + " "), t._removeClassFromMFP(r), t.fixedContentPos) && (f = {
                marginRight: ""
            }, t.isIE7 ? n("body, html").css("overflow", "") : f.overflow = "", n("html").css(f));
            o.off("keyup" + u + " focusin" + u);
            t.ev.off(u);
            t.wrap.attr("class", "mfp-wrap").removeAttr("style");
            t.bgOverlay.attr("class", "mfp-bg");
            t.container.attr("class", "mfp-container");
            !t.st.showCloseBtn || t.st.closeBtnInside && t.currTemplate[t.currItem.type] !== !0 || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach();
            t._lastFocusedEl && n(t._lastFocusedEl).focus();
            t.currItem = null;
            t.content = null;
            t.currTemplate = null;
            t.prevHeight = 0;
            i(ti)
        },
        updateSize: function(n) {
            if (t.isIOS) {
                var u = document.documentElement.clientWidth / window.innerWidth,
                    r = window.innerHeight * u;
                t.wrap.css("height", r);
                t.wH = r
            } else t.wH = n || f.height();
            t.fixedContentPos || t.wrap.css("height", t.wH);
            i("Resize")
        },
        updateItemHTML: function() {
            var u = t.items[t.index],
                r, f, e;
            t.contentContainer.detach();
            t.content && t.content.detach();
            u.parsed || (u = t.parseEl(t.index));
            r = u.type;
            (i("BeforeChange", [t.currItem ? t.currItem.type : "", r]), t.currItem = u, t.currTemplate[r]) || (f = t.st[r] ? t.st[r].markup : !1, i("FirstMarkupParse", f), t.currTemplate[r] = f ? n(f) : !0);
            p && p !== u.type && t.container.removeClass("mfp-" + p + "-holder");
            e = t["get" + r.charAt(0).toUpperCase() + r.slice(1)](u, t.currTemplate[r]);
            t.appendContent(e, r);
            u.preloaded = !0;
            i(bt, u);
            p = u.type;
            t.container.prepend(t.contentContainer);
            i("AfterChange")
        },
        appendContent: function(n, r) {
            t.content = n;
            n ? t.st.showCloseBtn && t.st.closeBtnInside && t.currTemplate[r] === !0 ? t.content.find(".mfp-close").length || t.content.append(st()) : t.content = n : t.content = "";
            i(ii);
            t.container.addClass("mfp-" + r + "-holder");
            t.contentContainer.append(t.content)
        },
        parseEl: function(r) {
            var o, u = t.items[r],
                e, f;
            if (u.tagName ? u = {
                    el: n(u)
                } : (o = u.type, u = {
                    data: u,
                    src: u.src
                }), u.el) {
                for (e = t.types, f = 0; f < e.length; f++)
                    if (u.el.hasClass("mfp-" + e[f])) {
                        o = e[f];
                        break
                    }
                u.src = u.el.attr("data-mfp-src");
                u.src || (u.src = u.el.attr("href"))
            }
            return u.type = o || t.st.type || "inline", u.index = r, u.parsed = !0, t.items[r] = u, i("ElementParse", u), t.items[r]
        },
        addGroup: function(n, i) {
            var u = function(r) {
                    r.mfpEl = this;
                    t._openClick(r, n, i)
                },
                r;
            i || (i = {});
            r = "click.magnificPopup";
            i.mainEl = n;
            i.items ? (i.isObj = !0, n.off(r).on(r, u)) : (i.isObj = !1, i.delegate ? n.off(r).on(r, i.delegate, u) : (i.items = n, n.off(r).on(r, u)))
        },
        _openClick: function(i, r, u) {
            var o = void 0 !== u.midClick ? u.midClick : n.magnificPopup.defaults.midClick,
                e;
            if (o || 2 !== i.which && !i.ctrlKey && !i.metaKey) {
                if (e = void 0 !== u.disableOn ? u.disableOn : n.magnificPopup.defaults.disableOn, e)
                    if (n.isFunction(e)) {
                        if (!e.call(t)) return !0
                    } else if (f.width() < e) return !0;
                i.type && (i.preventDefault(), t.isOpen && i.stopPropagation());
                u.el = n(i.mfpEl);
                u.delegate && (u.items = r.find(u.delegate));
                t.open(u)
            }
        },
        updateStatus: function(n, r) {
            if (t.preloader) {
                it !== n && t.container.removeClass("mfp-s-" + it);
                r || "loading" !== n || (r = t.st.tLoading);
                var u = {
                    status: n,
                    text: r
                };
                i("UpdateStatus", u);
                n = u.status;
                r = u.text;
                t.preloader.html(r);
                t.preloader.find("a").on("click", function(n) {
                    n.stopImmediatePropagation()
                });
                t.container.addClass("mfp-s-" + n);
                it = n
            }
        },
        _checkIfClose: function(i) {
            if (!n(i).hasClass(et)) {
                var r = t.st.closeOnContentClick,
                    u = t.st.closeOnBgClick;
                if (r && u || !t.content || n(i).hasClass("mfp-close") || t.preloader && i === t.preloader[0]) return !0;
                if (i === t.content[0] || n.contains(t.content[0], i)) {
                    if (r) return !0
                } else if (u && n.contains(document, i)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(n) {
            t.bgOverlay.addClass(n);
            t.wrap.addClass(n)
        },
        _removeClassFromMFP: function(n) {
            this.bgOverlay.removeClass(n);
            t.wrap.removeClass(n)
        },
        _hasScrollBar: function(n) {
            return (t.isIE7 ? o.height() : document.body.scrollHeight) > (n || f.height())
        },
        _setFocus: function() {
            (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
        },
        _onFocusIn: function(i) {
            if (i.target !== t.wrap[0] && !n.contains(t.wrap[0], i.target)) return (t._setFocus(), !1)
        },
        _parseMarkup: function(t, r, f) {
            var e;
            f.data && (r = n.extend(f.data, r));
            i(rt, [t, r, f]);
            n.each(r, function(n, i) {
                var r, f;
                if (void 0 === i || i === !1) return !0;
                (e = n.split("_"), e.length > 1) ? (r = t.find(u + "-" + e[0]), r.length > 0 && (f = e[1], "replaceWith" === f ? r[0] !== i[0] && r.replaceWith(i) : "img" === f ? r.is("img") ? r.attr("src", i) : r.replaceWith('<img src="' + i + '" class="' + r.attr("class") + '" />') : r.attr(e[1], i))) : t.find(u + "-" + n).html(i)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === t.scrollbarSize) {
                var n = document.createElement("div");
                n.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;";
                document.body.appendChild(n);
                t.scrollbarSize = n.offsetWidth - n.clientWidth;
                document.body.removeChild(n)
            }
            return t.scrollbarSize
        }
    };
    n.magnificPopup = {
        instance: null,
        proto: b.prototype,
        modules: [],
        open: function(t, i) {
            return ht(), t = t ? n.extend(!0, {}, t) : {}, t.isObj = !0, t.index = i || 0, this.instance.open(t)
        },
        close: function() {
            return n.magnificPopup.instance && n.magnificPopup.instance.close()
        },
        registerModule: function(t, i) {
            i.options && (n.magnificPopup.defaults[t] = i.options);
            n.extend(this.proto, i.proto);
            this.modules.push(t)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;<\/button>',
            tClose: "Close (Esc)",
            tLoading: "Loading..."
        }
    };
    n.fn.magnificPopup = function(i) {
        var r, u, f, e;
        return ht(), r = n(this), "string" == typeof i ? "open" === i ? (f = ot ? r.data("magnificPopup") : r[0].magnificPopup, e = parseInt(arguments[1], 10) || 0, f.items ? u = f.items[e] : (u = r, f.delegate && (u = u.find(f.delegate)), u = u.eq(e)), t._openClick({
            mfpEl: u
        }, r, f)) : t.isOpen && t[i].apply(t, Array.prototype.slice.call(arguments, 1)) : (i = n.extend(!0, {}, i), ot ? r.data("magnificPopup", i) : r[0].magnificPopup = i, t.addGroup(r, i)), r
    };
    g = "inline";
    ct = function() {
        d && (k.after(d.addClass(a)).detach(), d = null)
    };
    n.magnificPopup.registerModule(g, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                t.types.push(g);
                r(c + "." + g, function() {
                    ct()
                })
            },
            getInline: function(i, r) {
                var f, u, o;
                return (ct(), i.src) ? (f = t.st.inline, u = n(i.src), u.length ? (o = u[0].parentNode, o && o.tagName && (k || (a = f.hiddenClass, k = e(a), a = "mfp-" + a), d = u.after(k).detach().removeClass(a)), t.updateStatus("ready")) : (t.updateStatus("error", f.tNotFound), u = n("<div>")), i.inlineElement = u, u) : (t.updateStatus("ready"), t._parseMarkup(r, {}, i), r)
            }
        }
    });
    var v, y = "ajax",
        lt = function() {
            v && n(document.body).removeClass(v)
        },
        dt = function() {
            lt();
            t.req && t.req.abort()
        };
    n.magnificPopup.registerModule(y, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content<\/a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                t.types.push(y);
                v = t.st.ajax.cursor;
                r(c + "." + y, dt);
                r("BeforeChange." + y, dt)
            },
            getAjax: function(r) {
                v && n(document.body).addClass(v);
                t.updateStatus("loading");
                var u = n.extend({
                    url: r.src,
                    success: function(u, f, e) {
                        var o = {
                            data: u,
                            xhr: e
                        };
                        i("ParseAjax", o);
                        t.appendContent(n(o.data), y);
                        r.finished = !0;
                        lt();
                        t._setFocus();
                        setTimeout(function() {
                            t.wrap.addClass(w)
                        }, 16);
                        t.updateStatus("ready");
                        i("AjaxContentAdded")
                    },
                    error: function() {
                        lt();
                        r.finished = r.loadError = !0;
                        t.updateStatus("error", t.st.ajax.tError.replace("%url%", r.src))
                    }
                }, t.st.ajax.settings);
                return t.req = n.ajax(u), ""
            }
        }
    });
    gt = function(i) {
        if (i.data && void 0 !== i.data.title) return i.data.title;
        var r = t.st.image.titleSrc;
        if (r) {
            if (n.isFunction(r)) return r.call(t, i);
            if (i.el) return i.el.attr(r) || ""
        }
        return ""
    };
    n.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"><\/div><figure><div class="mfp-img"><\/div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"><\/div><div class="mfp-counter"><\/div><\/div><\/figcaption><\/figure><\/div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image<\/a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var i = t.st.image,
                    e = ".image";
                t.types.push("image");
                r(ut + e, function() {
                    "image" === t.currItem.type && i.cursor && n(document.body).addClass(i.cursor)
                });
                r(c + e, function() {
                    i.cursor && n(document.body).removeClass(i.cursor);
                    f.off("resize" + u)
                });
                r("Resize" + e, t.resizeImage);
                t.isLowIE && r("AfterChange", t.resizeImage)
            },
            resizeImage: function() {
                var n = t.currItem,
                    i;
                n && n.img && t.st.image.verticalFit && (i = 0, t.isLowIE && (i = parseInt(n.img.css("padding-top"), 10) + parseInt(n.img.css("padding-bottom"), 10)), n.img.css("max-height", t.wH - i))
            },
            _onImageHasSize: function(n) {
                n.img && (n.hasSize = !0, s && clearInterval(s), n.isCheckingImgSize = !1, i("ImageHasSize", n), n.imgHidden && (t.content && t.content.removeClass("mfp-loading"), n.imgHidden = !1))
            },
            findImageSize: function(n) {
                var i = 0,
                    u = n.img[0],
                    r = function(f) {
                        s && clearInterval(s);
                        s = setInterval(function() {
                            return u.naturalWidth > 0 ? void t._onImageHasSize(n) : (i > 200 && clearInterval(s), i++, void(3 === i ? r(10) : 40 === i ? r(50) : 100 === i && r(500)))
                        }, f)
                    };
                r(1)
            },
            getImage: function(r, u) {
                var e = 0,
                    o = function() {
                        r && (r.img[0].complete ? (r.img.off(".mfploader"), r === t.currItem && (t._onImageHasSize(r), t.updateStatus("ready")), r.hasSize = !0, r.loaded = !0, i("ImageLoadComplete")) : (e++, 200 > e ? setTimeout(o, 100) : h()))
                    },
                    h = function() {
                        r && (r.img.off(".mfploader"), r === t.currItem && (t._onImageHasSize(r), t.updateStatus("error", c.tError.replace("%url%", r.src))), r.hasSize = !0, r.loaded = !0, r.loadError = !0)
                    },
                    c = t.st.image,
                    l = u.find(".mfp-img"),
                    f;
                return l.length && (f = document.createElement("img"), f.className = "mfp-img", r.el && r.el.find("img").length && (f.alt = r.el.find("img").attr("alt")), r.img = n(f).on("load.mfploader", o).on("error.mfploader", h), f.src = r.src, l.is("img") && (r.img = r.img.clone()), f = r.img[0], f.naturalWidth > 0 ? r.hasSize = !0 : f.width || (r.hasSize = !1)), t._parseMarkup(u, {
                    title: gt(r),
                    img_replaceWith: r.img
                }, r), t.resizeImage(), r.hasSize ? (s && clearInterval(s), r.loadError ? (u.addClass("mfp-loading"), t.updateStatus("error", c.tError.replace("%url%", r.src))) : (u.removeClass("mfp-loading"), t.updateStatus("ready")), u) : (t.updateStatus("loading"), r.loading = !0, r.hasSize || (r.imgHidden = !0, u.addClass("mfp-loading"), t.findImageSize(r)), u)
            }
        }
    });
    ni = function() {
        return void 0 === at && (at = void 0 !== document.createElement("p").style.MozTransform), at
    };
    n.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(n) {
                return n.is("img") ? n : n.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var u, f = t.st.zoom,
                    o = ".zoom";
                if (f.enabled && t.supportsTransition) {
                    var e, n, h = f.duration,
                        l = function(n) {
                            var r = n.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                u = "all " + f.duration / 1e3 + "s " + f.easing,
                                t = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                i = "transition";
                            return t["-webkit-" + i] = t["-moz-" + i] = t["-o-" + i] = t[i] = u, r.css(t), r
                        },
                        s = function() {
                            t.content.css("visibility", "visible")
                        };
                    r("BuildControls" + o, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(e), t.content.css("visibility", "hidden"), u = t._getItemToZoom(), !u) return void s();
                            n = l(u);
                            n.css(t._getOffset());
                            t.wrap.append(n);
                            e = setTimeout(function() {
                                n.css(t._getOffset(!0));
                                e = setTimeout(function() {
                                    s();
                                    setTimeout(function() {
                                        n.remove();
                                        u = n = null;
                                        i("ZoomAnimationEnded")
                                    }, 16)
                                }, h)
                            }, 16)
                        }
                    });
                    r(wt + o, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(e), t.st.removalDelay = h, !u) {
                                if (u = t._getItemToZoom(), !u) return;
                                n = l(u)
                            }
                            n.css(t._getOffset(!0));
                            t.wrap.append(n);
                            t.content.css("visibility", "hidden");
                            setTimeout(function() {
                                n.css(t._getOffset())
                            }, 16)
                        }
                    });
                    r(c + o, function() {
                        t._allowZoom() && (s(), n && n.remove(), u = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === t.currItem.type
            },
            _getItemToZoom: function() {
                return t.currItem.hasSize ? t.currItem.img : !1
            },
            _getOffset: function(i) {
                var r, u;
                r = i ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem);
                var f = r.offset(),
                    e = parseInt(r.css("padding-top"), 10),
                    o = parseInt(r.css("padding-bottom"), 10);
                return f.top -= n(window).scrollTop() - e, u = {
                    width: r.width(),
                    height: (ot ? r.innerHeight() : r[0].offsetHeight) - o - e
                }, ni() ? u["-moz-transform"] = u.transform = "translate(" + f.left + "px," + f.top + "px)" : (u.left = f.left, u.top = f.top), u
            }
        }
    });
    var l = "iframe",
        ui = "//about:blank",
        vt = function(n) {
            if (t.currTemplate[l]) {
                var i = t.currTemplate[l].find("iframe");
                i.length && (n || (i[0].src = ui), t.isIE8 && i.css("display", n ? "block" : "none"))
            }
        };
    n.magnificPopup.registerModule(l, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"><\/div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen><\/iframe><\/div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                t.types.push(l);
                r("BeforeChange", function(n, t, i) {
                    t !== i && (t === l ? vt() : i === l && vt(!0))
                });
                r(c + "." + l, function() {
                    vt()
                })
            },
            getIframe: function(i, r) {
                var u = i.src,
                    f = t.st.iframe,
                    e;
                return n.each(f.patterns, function() {
                    if (u.indexOf(this.index) > -1) return (this.id && (u = "string" == typeof this.id ? u.substr(u.lastIndexOf(this.id) + this.id.length, u.length) : this.id.call(this, u)), u = this.src.replace("%id%", u), !1)
                }), e = {}, f.srcAction && (e[f.srcAction] = u), t._parseMarkup(r, e, i), t.updateStatus("ready"), r
            }
        }
    });
    nt = function(n) {
        var i = t.items.length;
        return n > i - 1 ? n - i : 0 > n ? i + n : n
    };
    yt = function(n, t, i) {
        return n.replace(/%curr%/gi, t + 1).replace(/%total%/gi, i)
    };
    n.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"><\/button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var u = t.st.gallery,
                    i = ".mfp-gallery",
                    f = Boolean(n.fn.mfpFastClick);
                return t.direction = !0, u && u.enabled ? (h += " mfp-gallery", r(ut + i, function() {
                    u.navigateByImgClick && t.wrap.on("click" + i, ".mfp-img", function() {
                        if (t.items.length > 1) return (t.next(), !1)
                    });
                    o.on("keydown" + i, function(n) {
                        37 === n.keyCode ? t.prev() : 39 === n.keyCode && t.next()
                    })
                }), r("UpdateStatus" + i, function(n, i) {
                    i.text && (i.text = yt(i.text, t.currItem.index, t.items.length))
                }), r(rt + i, function(n, i, r, f) {
                    var e = t.items.length;
                    r.counter = e > 1 ? yt(u.tCounter, f.index, e) : ""
                }), r("BuildControls" + i, function() {
                    if (t.items.length > 1 && u.arrows && !t.arrowLeft) {
                        var o = u.arrowMarkup,
                            i = t.arrowLeft = n(o.replace(/%title%/gi, u.tPrev).replace(/%dir%/gi, "left")).addClass(et),
                            r = t.arrowRight = n(o.replace(/%title%/gi, u.tNext).replace(/%dir%/gi, "right")).addClass(et),
                            s = f ? "mfpFastClick" : "click";
                        i[s](function() {
                            t.prev()
                        });
                        r[s](function() {
                            t.next()
                        });
                        t.isIE7 && (e("b", i[0], !1, !0), e("a", i[0], !1, !0), e("b", r[0], !1, !0), e("a", r[0], !1, !0));
                        t.container.append(i.add(r))
                    }
                }), r(bt + i, function() {
                    t._preloadTimeout && clearTimeout(t._preloadTimeout);
                    t._preloadTimeout = setTimeout(function() {
                        t.preloadNearbyImages();
                        t._preloadTimeout = null
                    }, 16)
                }), void r(c + i, function() {
                    o.off(i);
                    t.wrap.off("click" + i);
                    t.arrowLeft && f && t.arrowLeft.add(t.arrowRight).destroyMfpFastClick();
                    t.arrowRight = t.arrowLeft = null
                })) : !1
            },
            next: function() {
                t.direction = !0;
                t.index = nt(t.index + 1);
                t.updateItemHTML()
            },
            prev: function() {
                t.direction = !1;
                t.index = nt(t.index - 1);
                t.updateItemHTML()
            },
            goTo: function(n) {
                t.direction = n >= t.index;
                t.index = n;
                t.updateItemHTML()
            },
            preloadNearbyImages: function() {
                for (var i = t.st.gallery.preload, r = Math.min(i[0], t.items.length), u = Math.min(i[1], t.items.length), n = 1; n <= (t.direction ? u : r); n++) t._preloadItem(t.index + n);
                for (n = 1; n <= (t.direction ? r : u); n++) t._preloadItem(t.index - n)
            },
            _preloadItem: function(r) {
                if (r = nt(r), !t.items[r].preloaded) {
                    var u = t.items[r];
                    u.parsed || (u = t.parseEl(r));
                    i("LazyLoad", u);
                    "image" === u.type && (u.img = n('<img class="mfp-img" />').on("load.mfploader", function() {
                        u.hasSize = !0
                    }).on("error.mfploader", function() {
                        u.hasSize = !0;
                        u.loadError = !0;
                        i("LazyLoadError", u)
                    }).attr("src", u.src));
                    u.preloaded = !0
                }
            }
        }
    });
    tt = "retina";
    n.magnificPopup.registerModule(tt, {
            options: {
                replaceSrc: function(n) {
                    return n.src.replace(/\.\w+$/, function(n) {
                        return "@2x" + n
                    })
                },
                ratio: 1
            },
            proto: {
                initRetina: function() {
                    if (window.devicePixelRatio > 1) {
                        var i = t.st.retina,
                            n = i.ratio;
                        n = isNaN(n) ? n() : n;
                        n > 1 && (r("ImageHasSize." + tt, function(t, i) {
                            i.img.css({
                                "max-width": i.img[0].naturalWidth / n,
                                width: "100%"
                            })
                        }), r("ElementParse." + tt, function(t, r) {
                            r.src = i.replaceSrc(r, n)
                        }))
                    }
                }
            }
        }),
        function() {
            var u = 1e3,
                i = "ontouchstart" in window,
                r = function() {
                    f.off("touchmove" + t + " touchend" + t)
                },
                t = ".mfpFastClick";
            n.fn.mfpFastClick = function(e) {
                return n(this).each(function() {
                    var s, l = n(this),
                        a, v, y, h, o, c;
                    if (i) l.on("touchstart" + t, function(n) {
                        h = !1;
                        c = 1;
                        o = n.originalEvent ? n.originalEvent.touches[0] : n.touches[0];
                        v = o.clientX;
                        y = o.clientY;
                        f.on("touchmove" + t, function(n) {
                            o = n.originalEvent ? n.originalEvent.touches : n.touches;
                            c = o.length;
                            o = o[0];
                            (Math.abs(o.clientX - v) > 10 || Math.abs(o.clientY - y) > 10) && (h = !0, r())
                        }).on("touchend" + t, function(n) {
                            r();
                            h || c > 1 || (s = !0, n.preventDefault(), clearTimeout(a), a = setTimeout(function() {
                                s = !1
                            }, u), e())
                        })
                    });
                    l.on("click" + t, function() {
                        s || e()
                    })
                })
            };
            n.fn.destroyMfpFastClick = function() {
                n(this).off("touchstart" + t + " click" + t);
                i && f.off("touchmove" + t + " touchend" + t)
            }
        }();
    ht()
}),
function(n) {
    n.fn.mediaPreview = function(t) {
        var t = n.extend({
            offset: 10,
            flvplayer: "flvplayer.swf",
            loading_text: "Loading, please wait..."
        }, t);
        return n("body").append('<div id="mediaPreviewWrapper"><\/div>'), n("#mediaPreviewWrapper").append('<h2 id="mediaPreviewTitle"><\/h2>'), n("#mediaPreviewWrapper").append('<div id="mediaPreviewBody"><\/div>'), this.each(function() {
            function l(t, i, f, e, s, c) {
                var l = '<img id="mediaPreviewImage" height="' + c + '" width="' + s + '" src="' + e + '" alt=""/>' + h;
                i.innerHTML = f;
                f ? n("#mediaPreviewTitle").css("display", "block") : n("#mediaPreviewTitle").css("display", "none");
                document.getElementById("mediaPreviewBody").innerHTML = l;
                r = document.getElementById("mediaPreviewProgBar");
                u = document.getElementById("mediaPreviewImage");
                u.onload = function() {
                    r.style.display = "none"
                };
                o = setTimeout(function() {
                    t.display = "block"
                }, 250)
            }

            function a(i, r, u, f, e, s) {
                var h = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" style="display:block" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" id="flvPlayer" name="flvPlayer" width="' + e + '" height="' + s + '"><param name="allowScriptAccess" value="sameDomain" /><param name="allowFullScreen" value="true" /><param name="quality" value="high"><param name="menu" value="false"><param id="nameValueFLV" name="movie" value="' + t.flvplayer + "?titleVideo=" + f + '" /><param name="quality" value="high" /><param name="bgcolor" value="#010101" /><embed src="' + t.flvplayer + "?titleVideo=" + f + '" quality="high" menu="false" bgcolor="#010101" width="' + e + '" height="' + s + '" name="video" align="middle" allowScriptAccess="sameDomain" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /><\/embed><\/object>',
                    c = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" style="display:block" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" id="swfPlayer" name="swfPlayer" width="' + e + '" height="' + s + '"><param name="allowScriptAccess" value="sameDomain" /><param name="allowFullScreen" value="true" /><param name="quality" value="high"><param name="menu" value="false"><param id="nameValueSWF" name="movie" value="' + f + '" /><param name="quality" value="high" /><param name="bgcolor" value="#010101" /><embed src="' + f + '" quality="high" menu="false" bgcolor="#010101" width="' + e + '" height="' + s + '" name="video" align="middle" allowScriptAccess="sameDomain" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /><\/embed><\/object>',
                    l = f.substr(f.length - 4, 4).toLowerCase();
                switch (l) {
                    case ".flv":
                        n("#mediaPreviewBody").prepend(h);
                        break;
                    case ".swf":
                        n("#mediaPreviewBody").prepend(c)
                }
                n("#mediaPreviewProgBar").css("display", "none");
                r.innerHTML = u;
                u ? n("#mediaPreviewTitle").css("display", "block") : n("#mediaPreviewTitle").css("display", "none");
                o = setTimeout(function() {
                    i.display = "block"
                }, 250)
            }

            function v(t) {
                clearTimeout(o);
                n("#mediaPreviewBody").empty();
                t.display = "none"
            }

            function y(n, i, r, u, f, e, o) {
                pageX = n.pageX;
                pageY = n.pageY;
                previewOffsetTop = (e - u) / 2;
                previewOffsetLeft = (f - r) / 2;
                correctedTopOffset = previewOffsetTop + o;
                centered = !1;
                e > u ? pageY < correctedTopOffset - t.offset ? pageY = pageY + t.offset : pageY > correctedTopOffset + u + t.offset ? pageY = pageY - t.offset - u : (pageY = correctedTopOffset, centered = !0) : (pageY = o, centered = !0);
                centered ? pageX < f / 2 ? pageX += t.offset : pageX = pageX - r - t.offset : pageX = pageX < previewOffsetLeft - t.offset ? pageX + t.offset : pageX > previewOffsetLeft + r + t.offset ? pageX - r - t.offset : previewOffsetLeft;
                i.left = pageX + "px";
                i.top = pageY + "px"
            }
            var c = n(this),
                o;
            if (c.length < 1) return !1;
            var r, u, i = {},
                f = n(window),
                e = document.getElementById("mediaPreviewWrapper").style,
                s = document.getElementById("mediaPreviewTitle"),
                h = '<div id="mediaPreviewProgBar">' + t.loading_text + "<\/div>";
            i.width = f.width();
            i.height = f.height();
            i.scrollTop = f.scrollTop();
            f.resize(function() {
                i.width = n(this).width();
                i.height = n(this).height()
            }).scroll(function() {
                i.scrollTop = n(this).scrollTop()
            });
            c.each(function() {
                var f = n(this),
                    c = 32,
                    p = 53,
                    o, t = {};
                t.img = f.attr("data-src");
                t.width = parseInt(f.attr("data-width"));
                t.height = parseInt(f.attr("data-height"));
                t.title = f.attr("title");
                t.width > 0 && f.hover(function() {
                    var f = t.img.substr(t.img.length - 4, 4).toLowerCase();
                    switch (f) {
                        case ".flv":
                        case ".swf":
                            n("#mediaPreviewBody").html(h);
                            r = document.getElementById("mediaPreviewProgBar");
                            break;
                        default:
                            n("#mediaPreviewBody").html('<img id="mediaPreviewImage" height="" width="" src="" alt=""/>' + h);
                            r = document.getElementById("mediaPreviewProgBar");
                            u = document.getElementById("mediaPreviewImage");
                            u.onload = function() {
                                r.style.display = "none"
                            }
                    }
                    if (r.style.display = "block", previewWidth = t.width + c, previewHeight = t.height + p, o = i.width > previewWidth ? !0 : !1, o) switch (f) {
                        case ".flv":
                        case ".swf":
                            a(e, s, t.title, t.img, t.width, t.height);
                            break;
                        default:
                            l(e, s, t.title, t.img, t.width, t.height)
                    }
                }, function() {
                    v(e, s)
                }).mousemove(function(n) {
                    o && y(n, e, previewWidth, previewHeight, i.width, i.height, i.scrollTop)
                })
            })
        })
    }
}(jQuery);
quickViewApi = function() {};
quickViewApi.prototype.viewProductDetails = function(n) {
    var t = $.extend({
        data: {},
        success: function() {},
        error: function() {}
    }, n);
    $(".ajax-loading-block-window").show();
    $.apiCall({
        type: "POST",
        data: t.data,
        url: "/BsQuickView/ProductDetails",
        success: function(n) {
            $("#quick-view-modal").html(n.html);
            $(document).trigger("hide-ajax-loading");
            $("#quick-view-btn").magnificPopup({
                items: {
                    src: "#quick-view-modal",
                    type: "inline"
                },
                callbacks: {
                    open: function() {
                        $(".thumbnails img").on("click", function() {
                            $(".thumbnails img").removeClass("active");
                            $(this).addClass("active");
                            $(".largeImg").attr("src", $(this).attr("data-src"))
                        });
                        $(".quickViewPictureThumbSlider").slick({
                            speed: 500,
                            dots: !1,
                            autoplay: !0,
                            infinite: !0,
                            slidesToShow: 4,
                            slidesToScroll: 4
                        });
                        $(".accepted-bank-list").slick({
                            speed: 500,
                            dots: !1,
                            infinite: !0,
                            autoplay: !0,
                            slidesToShow: 5,
                            slidesToScroll: 5
                        })
                    }
                },
                preloader: !0
            });
            $(".mfp-close").on("click", function() {
                $("#quick-view-modal").html("")
            });
            $("#quick-view-btn").click()
        }
    });
    $(".ajax-loading-block-window").hide()
};
api = new quickViewApi,
    function(n) {
        n.apiCall = function(t) {
            var i = n.extend({
                type: "POST",
                data: {},
                contentType: "application/x-www-form-urlencoded",
                success: function() {},
                error: function() {}
            }, t);
            n.ajax({
                type: i.type,
                url: i.url,
                contentType: i.contentType,
                data: i.data,
                success: function(n) {
                    i.success(n)
                },
                error: function(n) {
                    i.error(n);
                    displayAjaxLoading(!1)
                }
            })
        }
    }(jQuery);
miniShoppingCart = {
    toggleCuponPanel: function() {
        $("#CouponDeals").toggleClass("isShow")
    },
    hideFlyoutShoppingCart: function() {
        $("#flyout-cart").removeClass("active")
    }
};