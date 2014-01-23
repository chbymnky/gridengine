/**
 * @fileOverview
 * Grid Layout Engine for custom grid css creation
 *
 * @author Myron R Schippers Jr
 * @version 1.0
 */

var gridEng = function ($thisElm, complexitySet) {
    // $thisElm - should be the jQuery Selector for the .js-gridSettings container
    // complexitySet - potential options are: simple, complex, ninja 
    //      (value will come through as boolean false if no selection is made)
    // containers and markers for hide show
    this.$gridCont = $thisElm;
    this.$gridSimple = $thisElm.find('.js-gridSimple');
    this.$gridComplex = $thisElm.find('.js-gridComplex');
    // measurement inputs
    this.$gridUnits = $thisElm.find('.js-gridUnits');
    this.$columnCount = $thisElm.find('.js-columnCount');
    this.$columnWidth = $thisElm.find('.js-columnWidth');
    this.$columnLrg = $thisElm.find('.js-columnLrg');
    this.$columnSml = $thisElm.find('.js-columnSml');
    this.$columnMargin = $thisElm.find('.js-columnMargin');
    this.$contGutter = $thisElm.find('.js-contGutter');
    // completion buttons
    this.$btn = $thisElm.find('.js-btn');
    // default settings
    this.$contGutter = $thisElm.find('.js-contGutter');
    
    // default grid width values
    var unitsD = "px"; /* potential values: px, em, pct, */
    var swidthD = 1000;
    var smarginD = 10;
    var cwidthD = 20;
    var cmarginD = 10;
    var lrgwidthD = 670;
    var smlwidthD = 300;
    
    this.gsettings = {
        complexity: complexitySet,
        units: unitsD,
        swidth: swidthD,
        smargin: smarginD,
        cwidth: cwidthD,
        cmargin: cmarginD,
        lrgwidth: lrgwidthD,
        smlwidth: smlwidthD
    }
};

gridEng.prototype = {
    init: function () {
        if (this.gsettings.complexity === 'simple') {
            // show customization and simple fields
            this.$gridCont.removeClass('isHidden');
            this.$gridSimple.removeClass('isHidden');
            // hide complex / ninja fields
            this.$gridComplex.addClass('isHidden');
        } else if (this.gsettings.complexity === 'complex' || this.gsettings.complexity === 'simple') {
            // show customization and simple fields
            this.$gridCont.removeClass('isHidden');
            this.$gridComplex.removeClass('isHidden');
            // hide complex / ninja fields
            this.$gridSimple.addClass('isHidden');
        } else {
            // in this case nothing is selected and
            // everything needs to be hidden
            this.$gridCont.addClass('isHidden');
        }
        
        this.$btn.on( "click", function (e) {
            var $elm = $(this);
            var elmData = $elm.data();
            
            e.preventDefault();
            
            if (elmData.btnis === 'sample') {
            } else if (elmData.btnis === 'css') {
            }
        });
        this.$gridUnits.change(function () {
            var $field = $(this);
        });
        this.$columnCount.change(function () {
            var $field = $(this);
        });
        this.$columnWidth.change(function () {
            var $field = $(this);
        });
        this.$columnLrg.change(function () {
            var $field = $(this);
        });
        this.$columnSml.change(function () {
            var $field = $(this);
        });
        this.$columnMargin.change(function () {
            var $field = $(this);
        });
        this.$contGutter.change(function () {
            var $field = $(this);
        });
    },
    getWidths: function (elm) {
    },
    calcUnits: function () {
    },
    calcGrid: function () {
    },
    buildGrid: function () {
    }
};

$('.js-btn[data-btnis="gtype"]').on("click", function (e) {
    e.preventDefault();
    
    var $gsettings = $('.js-gridSettings');
    var $elm = $(this);
    var $gridSettings = $('js-gridSettings');
    var slct = $elm.hasClass('btn_isSelected');
    var elmData = $elm.data();
    var settings = $gridSettings.css('display');
    var $gtype = $('.js-btn[data-btnis="gtype"]').not('[data-comp="'+elmData.comp+'"]');
    
    if (slct) {
        $gtype.removeClass('btn_isSelected');
        $elm.addClass('btn_isSelected');
    
        var engine = new gridEng($gsettings, elmData.comp);
        engine.init();
    } else {
        $gtype.removeClass('btn_isSelected');
        $elm.removeClass('btn_isSelected');
    
        var engine = new gridEng($gsettings, false);
        engine.init();
    }
});

